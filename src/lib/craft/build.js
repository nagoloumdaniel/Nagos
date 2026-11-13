import gsap from 'gsap';
import { getWorld, getFixedWorld, addNano, removeNano, markDirty } from './overlay';

/* ─── Sélection automatique des éléments à « designer » ──────
   Parcours de haut en bas : un composant (carte, panneau…) est assemblé, glissé ou
   imprimé en particules, un titre ou paragraphe est tapé, un bouton passe par un
   wireframe, un visuel naît de particules ou est étiré depuis sa poignée, un terminal
   ouvre sa fenêtre puis tape ses lignes, un conteneur peint (fond, bordure, ombre) se
   dessine avant son contenu. `data-craft="<effet>|skip"` force un choix. */

const TEXT = 'h1,h2,h3,h4,h5,h6,p,blockquote,figcaption,dt,dd,label,time,.section__subtitle';
const WIRE = 'a.button,button,.button,input,textarea,select,[role="tab"],a[class]';
const MEDIA = 'img,svg,canvas,video,picture,iframe';
const COMP = '.glass,[class*="card"]:not([class*="card__"]),[class*="__box"],[class*="panel"],[class*="__content"],form';
const TERM = '.ide-win';
const TERM_LINES = '.ide-term__line,.ide-line,.ide-term__form,.ide-term__quick';
const TERM_BAR = '.ide-win__dots > i,.ide-tab,.ide-win__title';

export const isVisible = (el) => {
  const r = el.getBoundingClientRect();
  if (r.width < 2 || r.height < 2) return false;
  if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
  return true;
};

const visibleKids = (el) => Array.from(el.children).filter(isVisible);

/* Conteneur qui a une apparence propre : il doit se dessiner, pas seulement son contenu */
const painted = (el) => {
  const cs = getComputedStyle(el);
  const bg = cs.backgroundColor;
  const hasBg = (bg && bg !== 'transparent' && !/rgba\([^)]*,\s*0\)$/.test(bg)) || cs.backgroundImage !== 'none';
  const hasBorder = ['Top', 'Right', 'Bottom', 'Left'].some((s) => parseFloat(cs[`border${s}Width`]) > 0 && cs[`border${s}Style`] !== 'none');
  return hasBg || hasBorder || cs.boxShadow !== 'none';
};

export const collectTargets = (root, { max = 60 } = {}) => {
  const out = [];
  const rb = root.getBoundingClientRect();
  let comps = 0;
  let media = 0;
  const walk = (node) => {
    for (const el of node.children) {
      if (out.length >= max) return;
      if (el.matches('script,style,template,dialog,.craft-layer')) continue;
      const forced = el.getAttribute('data-craft');
      if (forced === 'skip') continue;
      if (!isVisible(el)) continue;
      if (forced) { out.push({ el, effect: forced }); continue; }
      if (el.matches(TERM)) { out.push({ el, effect: 'terminal' }); continue; }
      if (el.matches(COMP) && visibleKids(el).length >= 2) {
        comps += 1;
        out.push({ el, effect: ['assemble', 'drag', 'nano'][comps % 3] });
      } else if (el.matches(MEDIA)) {
        const b = el.getBoundingClientRect();
        if (el.matches('svg') && b.width < 72 && b.height < 72) out.push({ el, effect: 'radial' });
        else { media += 1; out.push({ el, effect: media % 2 ? 'nano' : 'resize' }); }
      } else if (el.matches(WIRE)) out.push({ el, effect: 'wire' });
      else if (el.matches(TEXT)) out.push({ el, effect: 'type' });
      else if (el.children.length) {
        const b = el.getBoundingClientRect();
        /* Un fond de section entier n'est pas un composant : on ne le dessine pas */
        const whole = b.width >= rb.width * 0.96 && b.height >= rb.height * 0.9;
        if (!whole && b.height > 24 && painted(el)) out.push({ el, effect: 'shell' });
        walk(el);
      } else if (el.textContent.trim()) out.push({ el, effect: 'type' });
    }
  };
  walk(root);
  return out;
};

/* Boîte de l'« encre » : union des lignes de texte réelles et des icônes, pas la boîte
   CSS (un titre en largeur fixe, un paragraphe centré ou un lien en bloc ont une boîte
   bien plus large que leur texte). Le cadre et le curseur de saisie collent ainsi au texte,
   quelle que soit la mise en page future. */
const LEAF = 'i,svg,img,canvas,video,picture,input,textarea,select';
export const inkRect = (el) => {
  let l = Infinity; let t = Infinity; let r = -Infinity; let b = -Infinity;
  const add = (q) => {
    if (q.width < 0.5 || q.height < 0.5) return;
    l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom);
  };
  const range = document.createRange();
  const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      if (n.nodeType === 3) return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      if (n.getAttribute('aria-hidden') === 'true' && !n.matches(LEAF)) return NodeFilter.FILTER_SKIP;
      return n.matches(LEAF) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  for (let n = tw.nextNode(); n; n = tw.nextNode()) {
    if (n.nodeType === 3) {
      range.selectNodeContents(n);
      for (const q of range.getClientRects()) add(q);
    } else {
      add(n.getBoundingClientRect());
      // Une icône peut contenir du texte (ligatures) : inutile de descendre
    }
  }
  if (!Number.isFinite(l)) return el.getBoundingClientRect();
  return { left: l, top: t, width: r - l, height: b - t, right: r, bottom: b };
};

/* ─── Mesures : une seule passe de lecture, avant toute écriture ───
   Lire puis écrire en alternance force un recalcul de mise en page à chaque élément
   (saccades au chargement des grandes sections). Tout est donc mesuré ici, d'un coup. */

export function planCraft(root, items, { fixed = false } = {}) {
  const sx = fixed ? 0 : window.scrollX;
  const sy = fixed ? 0 : window.scrollY;
  const rb = root.getBoundingClientRect();
  const origin = { ox: rb.left + sx, oy: rb.top + sy, fixed };
  const rel = (b) => ({ x: b.left + sx - origin.ox, y: b.top + sy - origin.oy, w: b.width, h: b.height });
  /* Ancêtre sticky ou fixed : il bouge avec le défilement, ses cadres devront le suivre */
  const pins = new Map();
  const pinOf = (el) => {
    if (fixed) return null;
    const chain = [];
    let found = null;
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      if (pins.has(n)) { found = pins.get(n); break; }
      chain.push(n);
      const pos = getComputedStyle(n).position;
      if (pos === 'sticky' || pos === 'fixed') { found = n; break; }
    }
    chain.forEach((n) => pins.set(n, found));
    return found;
  };
  const measured = items.map((item) => {
    const { el } = item;
    const cs = getComputedStyle(el);
    const eb = rel(el.getBoundingClientRect());
    /* Texte : cadre sur l'encre ; composant : cadre sur la boîte CSS */
    const r = item.effect === 'type' ? rel(inkRect(el)) : eb;
    const pin = pinOf(el);
    const m = {
      ...item,
      r,
      eb,
      pin,
      pinAt: pin ? rel(pin.getBoundingClientRect()) : null,
      radius: cs.borderRadius,
      at: typeof item.at === 'function' ? item.at(r) : (item.at || 0),
      color: cs.color,
      lh: parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.3 || r.h,
      chars: Math.max(6, Math.min(48, el.textContent.trim().length)),
      heading: /^H[1-3]$/.test(el.tagName),
      label: el.matches('input,textarea,select') ? 'Input'
        : el.matches('[role="tab"]') ? 'Tab'
          : el.matches('button,.button') ? 'Button'
            : el.matches('a') ? 'Link' : 'Component',
    };
    if (m.effect === 'assemble' || m.effect === 'drag') m.kids = visibleKids(el).slice(0, 14);
    if (m.effect === 'terminal') {
      const bar = el.querySelector('.ide-win__bar');
      m.barH = bar ? bar.getBoundingClientRect().height : 32;
      m.bar = [...el.querySelectorAll(TERM_BAR)].filter(isVisible);
      const all = [...el.querySelectorAll(TERM_LINES)];
      const box = el.getBoundingClientRect();
      m.lines = [];
      m.rest = [];
      all.forEach((ln) => {
        const b = ln.getBoundingClientRect();
        const inside = b.height > 1 && b.bottom > box.top + m.barH && b.top < box.bottom;
        if (inside && m.lines.length < 18) {
          m.lines.push({ el: ln, r: rel(b), eb: rel(b), chars: Math.max(4, Math.min(60, ln.textContent.trim().length)) });
        } else if (inside) m.rest.push(ln);
      });
      const status = el.querySelector('.ide-win__status');
      m.status = status && isVisible(status) ? status : null;
    }
    return m;
  });
  /* Opacité de repos de chaque élément révélé, lue avant toute écriture : la révélation
     finit exactement sur cette valeur (0 lu = élément pas encore stable, on vise 1) */
  const alpha = new Map();
  const readAlpha = (el) => {
    if (!el || alpha.has(el)) return;
    const o = parseFloat(getComputedStyle(el).opacity);
    alpha.set(el, o > 0.05 ? o : 1);
  };
  measured.forEach((m) => {
    [m.el, ...(m.with || []), ...(m.kids || []), ...(m.bar || []), ...(m.rest || []), m.status,
      ...(m.lines || []).map((l) => l.el)].forEach(readAlpha);
  });
  return { root, origin, R: { w: rb.width, h: rb.height }, items: measured, alpha, vw: window.innerWidth };
}

/* ─── Construction de la timeline (écritures seulement) ───── */

const NAMES = ['Layout', 'Type', 'Grid', 'Motion', 'Copy', 'A11y', 'Assets', 'QA'];
const CURSOR_SVG =
  '<svg class="craft-cursor__arrow" width="18" height="20" viewBox="0 0 18 20" aria-hidden="true">' +
  '<path d="M1.2 1.2v15l4.1-3.8 2.8 6.2 2.6-1.1-2.7-6.1h5.7z"/></svg>';

/* « Pas de découpe » sans le mot-clé none : GSAP lirait alors le style calculé */
const NOCLIP = 'inset(-9999px)';

const frameName = (root) =>
  root.id || (root.className && String(root.className).split(' ')[0]) || 'frame';

/**
 * Remplit `tl` avec la construction d'un plan (voir planCraft) ou de `root` + `items`.
 * `k` convertit les durées : 1 = secondes (lecture auto), ~300 = pixels de scroll.
 */
export function buildCraft(tl, { plan, root, items, k = 1, lanes = 4, tone = '', frame = true, offset = 0 }) {
  const P = plan || planCraft(root, items);
  const { origin: group, R } = P;
  /* Transforms lues une fois, toutes avant la première écriture : GSAP les met en cache
     et ne relance plus getComputedStyle (un recalcul de style forcé par élément sinon) */
  P.items.forEach((m) => {
    const list = [...(m.kids || []), ...(m.bar || [])];
    if (m.effect === 'drag') list.push(m.el);
    list.forEach((el) => gsap.getProperty(el, 'x'));
  });
  const world = group.fixed ? getFixedWorld() : getWorld();
  const nodes = [];
  const nanos = [];
  const touched = new Map();

  const g = document.createElement('div');
  g.className = `craft-group${tone ? ` craft--${tone}` : ''}`;
  world.appendChild(g);
  nodes.push(g);
  const place = () => { g.style.transform = `translate3d(${group.ox}px, ${group.oy}px, 0)`; };
  place();

  /* Cadres d'un élément sticky ou fixed : sous-calque décalé du déplacement réel de
     l'élément épinglé depuis la mesure, recalculé à chaque défilement */
  let host = g;
  const subs = new Map();
  const syncSubs = () => {
    subs.forEach((sub, pin) => {
      const b = pin.getBoundingClientRect();
      const dx = b.left + window.scrollX - group.ox - sub.at.x;
      const dy = b.top + window.scrollY - group.oy - sub.at.y;
      sub.el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    });
  };
  const subFor = (m) => {
    if (!m.pin) return g;
    if (!subs.has(m.pin)) {
      const el = document.createElement('div');
      el.className = 'craft-group';
      g.appendChild(el);
      subs.set(m.pin, { el, at: m.pinAt });
    }
    return subs.get(m.pin).el;
  };
  const mk = (cls, html = '') => {
    const n = document.createElement('div');
    n.className = `craft-${cls}`;
    if (html) n.innerHTML = html;
    host.appendChild(n);
    return n;
  };
  /* Écriture directe : un gsap.set relirait le style calculé d'un nœud tout neuf */
  const box = (n, r) => {
    n.style.cssText += `left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px;opacity:0;visibility:hidden;clip-path:${NOCLIP}`;
  };
  /* Styles inline d'origine, restaurés tels quels à la fin (React ou le code existant peuvent en poser) */
  const STYLE_KEYS = ['opacity', 'visibility', 'clip-path', 'transform', 'translate', 'rotate', 'scale', 'transition'];
  const original = new Map();
  const touch = (list, props) => {
    (Array.isArray(list) ? list : [list]).forEach((el) => {
      if (!original.has(el)) {
        original.set(el, STYLE_KEYS.map((key) => [key, el.style.getPropertyValue(key)]));
        /* Une transition CSS (opacité, transform) retarderait chaque image de la timeline */
        el.style.setProperty('transition', 'none');
      }
      const set = touched.get(el) || new Set();
      /* Valeur inline de départ : GSAP la lit au lieu du style calculé (pas de recalcul forcé) */
      props.forEach((p) => {
        set.add(p);
        if (p === 'opacity' && !el.style.opacity) el.style.opacity = String(P.alpha?.get(el) ?? 1);
        else if (p === 'visibility' && !el.style.visibility) el.style.visibility = 'inherit';
        else if (p === 'clipPath' && !el.style.clipPath) el.style.clipPath = NOCLIP;
      });
      touched.set(el, set);
    });
  };
  /* Valeurs de fin explicites : un tl.from relirait l'état courant, parfois déjà masqué */
  const A = (i, el) => P.alpha?.get(el) ?? 1;
  const hide = (els, at) => {
    touch(els, ['opacity', 'visibility']);
    tl.fromTo(els, { autoAlpha: 0 }, { autoAlpha: A, duration: 0.001, immediateRender: true }, at);
  };
  const D = { move: 0.38 * k, draw: 0.34 * k, out: 0.22 * k };

  /* Ligne de mesure façon « redline » : écart entre le bord de la zone et l'élément */
  const redline = (r, at) => {
    if (r.x < 24) return;
    const rl = mk('redline', '<span></span>');
    rl.firstChild.textContent = `${Math.round(r.x)}`;
    box(rl, { x: 0, y: r.y + Math.min(r.h / 2, 40), w: r.x, h: 1 });
    tl.set(rl, { autoAlpha: 1 }, at);
    tl.fromTo(rl, { width: 0 }, { width: r.x, duration: 0.3 * k, ease: 'power2.out' }, at);
    tl.to(rl, { autoAlpha: 0, duration: 0.25 * k }, at + 0.6 * k);
  };
  /* Repères d'alignement qui s'allument quand un élément « s'aimante » à sa place */
  const snapGuides = (r, at) => {
    const v = mk('snap craft-snap--v');
    box(v, { x: r.x, y: 0, w: 1, h: R.h });
    const h = mk('snap craft-snap--h');
    box(h, { x: 0, y: r.y, w: R.w, h: 1 });
    tl.set([v, h], { autoAlpha: 1 }, at);
    tl.to([v, h], { autoAlpha: 0, duration: 0.3 * k }, at + 0.35 * k);
  };

  /* Cadre façon outil de design autour de la zone : nom + dimensions */
  let frameEl = null;
  if (frame) {
    frameEl = mk('frame', '<span class="craft-frame__name"></span><span class="craft-frame__dim"></span>');
    /* Le nom peut venir de l'URL : texte brut, jamais interprété comme du HTML */
    frameEl.firstChild.textContent = typeof frame === 'string' ? frame : frameName(P.root);
    frameEl.lastChild.textContent = `${Math.round(R.w)} × ${Math.round(R.h)}`;
    box(frameEl, { x: 0, y: 0, w: R.w, h: R.h });
    tl.set(frameEl, { autoAlpha: 1 }, offset);
    tl.fromTo(frameEl, { clipPath: `inset(-28px ${R.w + 8}px ${R.h + 8}px -8px)` },
      { clipPath: 'inset(-28px -8px -8px -8px)', duration: 0.6 * k, ease: 'power2.out' }, offset);
  }

  /* Curseurs : chacun a sa « voie » et enchaîne ses tâches */
  const sorted = [...P.items].sort((a, b) => a.at - b.at);
  const nL = Math.max(1, Math.min(lanes, sorted.length));
  const cursors = Array.from({ length: nL }, (_, i) => {
    const c = mk('cursor', `${CURSOR_SVG}<span class="craft-cursor__tag">${NAMES[(i + Math.round(group.oy / 97)) % NAMES.length]}</span>`);
    const left = i % 2 === 0;
    const x = left ? -group.ox - 40 : P.vw - group.ox + 30;
    const y = 30 + i * 64 + (sorted[i] ? sorted[i].r.y * 0.5 : 0);
    c.style.opacity = '0';
    c.style.visibility = 'hidden';
    gsap.set(c, { x, y });
    return { el: c, x, y, free: -Infinity, used: false, last: 0 };
  });

  const moveCursor = (cur, x, y, at, dur, ease = 'power2.inOut') => {
    tl.fromTo(cur.el, { x: cur.x, y: cur.y }, { x, y, duration: dur, ease, immediateRender: false }, at);
    cur.x = x; cur.y = y;
  };

  /* Frappe : ligne par ligne (ou caractère par caractère) avec curseur de saisie */
  const typeIn = (els, r, chars, lines, at, cur, maxDur = 1.3, eb = r) => {
    const mv = Math.max(12, r.h * 0.5);
    const mh = 14;
    const dur = Math.min(maxDur, 0.4 + chars * 0.02 + (lines - 1) * 0.1) * k;
    /* Le clip s'exprime dans la boîte de l'élément ; il balaie exactement l'encre r */
    const fromR = eb.x + eb.w - r.x;
    const toR = eb.x + eb.w - (r.x + r.w);
    const fromB = eb.y + eb.h - r.y;
    const toB = eb.y + eb.h - (r.y + r.h);
    hide(els, at);
    touch(els, ['clipPath']);
    const caret = mk('caret');
    if (lines === 1) {
      tl.fromTo(els, { clipPath: `inset(-${mv}px ${fromR}px -${mv}px -${mh}px)` },
        { clipPath: `inset(-${mv}px ${toR - mh}px -${mv}px -${mh}px)`, duration: dur, ease: `steps(${chars})` }, at);
      box(caret, { x: r.x, y: r.y, w: 2, h: r.h });
      tl.set(caret, { autoAlpha: 1 }, at);
      tl.fromTo(caret, { left: r.x }, { left: r.x + r.w, duration: dur, ease: `steps(${chars})`, immediateRender: false }, at);
      if (cur) moveCursor(cur, r.x + r.w + 8, r.y + r.h * 0.65, at, dur, `steps(${chars})`);
    } else {
      tl.fromTo(els, { clipPath: `inset(-${mh}px -${mh}px ${fromB}px -${mh}px)` },
        { clipPath: `inset(-${mh}px -${mh}px ${toB - mh}px -${mh}px)`, duration: dur, ease: `steps(${lines})` }, at);
      caret.classList.add('craft-caret--scan');
      box(caret, { x: r.x, y: r.y, w: r.w, h: 1 });
      tl.set(caret, { autoAlpha: 1 }, at);
      tl.fromTo(caret, { top: r.y }, { top: r.y + r.h, duration: dur, ease: `steps(${lines})`, immediateRender: false }, at);
      if (cur) moveCursor(cur, r.x - 10, r.y + r.h, at, dur, `steps(${lines})`);
    }
    tl.set(caret, { autoAlpha: 0 }, at + dur + 0.05 * k);
    return dur;
  };

  sorted.forEach((m, idx) => {
    const { el, effect, r } = m;
    host = subFor(m);
    const els = [el, ...(m.with || [])];
    /* Chaque UI démarre à son heure, sans attendre un curseur libre : les constructions
       se chevauchent. Un curseur libre vient l'accompagner, sinon elle se construit seule. */
    const free = cursors.filter((c) => c.free <= m.at + 0.05 * k);
    const cur = free.length ? free.reduce((a, b) => (b.free < a.free ? b : a)) : null;
    const mc = (...a) => { if (cur) moveCursor(cur, ...a); };
    let t = m.at;
    if (cur && !cur.used) {
      tl.fromTo(cur.el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 * k, immediateRender: false }, t);
      cur.used = true;
    }
    mc(r.x, r.y, t, D.move);
    t += cur ? D.move : 0.12 * k;

    /* Cadre de sélection tiré par le curseur */
    const sel = mk('sel', '<i></i><i></i><i></i><i></i><span class="craft-sel__dim"></span>');
    sel.lastChild.textContent = `${Math.round(r.w)} × ${Math.round(r.h)}`;
    box(sel, r);
    if (effect !== 'type' && m.radius && m.radius !== '0px') sel.style.borderRadius = m.radius;
    tl.set(sel, { autoAlpha: 1 }, t);
    tl.fromTo(sel, { clipPath: `inset(-2px ${r.w + 2}px ${r.h + 2}px -2px)` },
      { clipPath: 'inset(-6px -6px -26px -6px)', duration: D.draw, ease: 'power2.inOut' }, t);
    mc(r.x + r.w, r.y + r.h, t, D.draw);
    t += D.draw * 0.7;

    let end = t;

    if (effect === 'type') {
      const lines = Math.max(1, Math.round(r.h / m.lh));
      const dur = typeIn(els, r, m.chars, lines, t, cur, 1.3, m.eb);
      /* Guide pointillé sous les titres, comme un repère d'alignement */
      if (m.heading) {
        const gd = mk('guide');
        box(gd, { x: 0, y: r.y + r.h, w: R.w, h: 1 });
        tl.set(gd, { autoAlpha: 1 }, t);
        tl.fromTo(gd, { width: 0 }, { width: R.w, duration: 0.45 * k, ease: 'power3.out' }, t);
        tl.to(gd, { autoAlpha: 0, duration: 0.3 * k }, t + dur);
        redline(r, t);
      }
      end = t + dur;
    } else if (effect === 'wire') {
      const gh = mk('ghost', '<span></span>');
      gh.firstChild.textContent = m.label;
      box(gh, r);
      if (m.radius) gh.style.borderRadius = m.radius;
      tl.set(gh, { autoAlpha: 1 }, t);
      tl.fromTo(gh, { clipPath: `inset(0px ${r.w}px ${r.h}px 0px)` },
        { clipPath: 'inset(-22px -4px -4px -4px)', duration: 0.3 * k, ease: 'power2.out' }, t);
      hide(el, t + 0.26 * k);
      touch(el, ['clipPath']);
      tl.fromTo(el, { clipPath: `inset(${r.h / 2}px ${r.w / 2}px ${r.h / 2}px ${r.w / 2}px)` },
        { clipPath: 'inset(-8px -8px -8px -8px)', duration: 0.45 * k, ease: 'expo.out' }, t + 0.26 * k);
      mc(r.x + r.w * 0.5, r.y + r.h * 0.5, t + 0.1 * k, 0.28 * k);
      tl.to(gh, { autoAlpha: 0, duration: 0.2 * k }, t + 0.6 * k);
      end = t + 0.72 * k;
    } else if (effect === 'nano') {
      const job = addNano({ group, rect: r, from: cur ? { x: cur.x, y: cur.y } : { x: r.x + r.w * 0.5, y: r.y - 60 }, color: m.color, seed: idx + 1 + Math.round(group.oy) });
      nanos.push(job);
      const dur = Math.min(1.7, 1 + (r.w * r.h) / 400000) * k;
      tl.fromTo(job, { p: 0 }, { p: 1, duration: dur, ease: 'none', onUpdate: markDirty, immediateRender: false }, t);
      hide(el, t + dur * 0.55);
      touch(el, ['clipPath']);
      tl.fromTo(el, { clipPath: `inset(-6px -6px ${r.h + 6}px -6px)` },
        { clipPath: 'inset(-6px -6px -6px -6px)', duration: dur * 0.4, ease: 'power1.inOut' }, t + dur * 0.55);
      mc(r.x + r.w * 0.5, r.y + r.h * 0.5, t, dur * 0.5, 'sine.inOut');
      end = t + dur;
    } else if (effect === 'resize') {
      /* Le visuel est étiré depuis sa poignée en bas à droite */
      const dur = 0.75 * k;
      const s = Math.min(28, r.w, r.h);
      hide(el, t);
      touch(el, ['clipPath']);
      tl.fromTo(el, { clipPath: `inset(0px ${r.w - s}px ${r.h - s}px 0px)` },
        { clipPath: 'inset(0px 0px 0px 0px)', duration: dur, ease: 'power3.inOut' }, t);
      mc(r.x + s, r.y + s, t - 0.12 * k, 0.12 * k);
      mc(r.x + r.w, r.y + r.h, t, dur, 'power3.inOut');
      tl.set(el, { clipPath: 'none' }, t + dur);
      end = t + dur + 0.05 * k;
    } else if (effect === 'radial') {
      /* Icône tracée au stylet : révélation circulaire depuis le centre */
      const dur = 0.5 * k;
      hide(el, t);
      touch(el, ['clipPath']);
      tl.fromTo(el, { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', duration: dur, ease: 'power2.out' }, t);
      mc(r.x + r.w * 0.5, r.y + r.h * 0.5, t, dur * 0.6, 'sine.inOut');
      tl.set(el, { clipPath: 'none' }, t + dur);
      end = t + dur;
    } else if (effect === 'shell') {
      /* Conteneur peint : sa boîte se dessine en diagonale, son contenu suit */
      const dur = 0.55 * k;
      hide(el, t);
      touch(el, ['clipPath']);
      tl.fromTo(el, { clipPath: `inset(0px ${r.w}px ${r.h}px 0px)` },
        { clipPath: 'inset(0px 0px 0px 0px)', duration: dur, ease: 'power2.inOut' }, t);
      tl.set(el, { clipPath: 'none' }, t + dur);
      redline(r, t);
      end = t + dur * 0.6;
    } else if (effect === 'drag') {
      /* Le composant est attrapé hors de sa place, glissé, puis aimanté aux repères */
      const dx = (idx % 2 ? 1 : -1) * Math.min(90, 30 + r.w * 0.12);
      const dy = 36;
      const dur = 0.7 * k;
      hide(el, t);
      touch(el, ['transform']);
      tl.fromTo(el, { opacity: 0.4, x: dx, y: dy }, { opacity: A, x: 0, y: 0, duration: dur, ease: 'power3.out', immediateRender: false }, t + 0.001);
      mc(r.x + r.w * 0.5 + dx, r.y + 18 + dy, t - 0.15 * k, 0.15 * k);
      mc(r.x + r.w * 0.5, r.y + 18, t, dur, 'power3.out');
      snapGuides(r, t + dur * 0.75);
      redline(r, t + dur * 0.75);
      const kids = m.kids || [];
      if (kids.length) {
        touch(kids, ['opacity', 'visibility', 'transform']);
        tl.fromTo(kids, { autoAlpha: 0, y: 14 }, { autoAlpha: A, y: 0, duration: 0.4 * k, ease: 'power2.out', stagger: Math.min(0.07, 0.45 / kids.length) * k, immediateRender: true }, t + dur * 0.6);
      }
      end = t + dur + 0.1 * k;
    } else if (effect === 'terminal') {
      /* Fenêtre de terminal : la barre s'ouvre, les pastilles et onglets se posent,
         puis chaque ligne est tapée, la fenêtre s'agrandit avec elles */
      const bh = Math.min(m.barH, r.h);
      hide(el, t);
      touch(el, ['clipPath']);
      tl.fromTo(el, { clipPath: `inset(0px ${r.w}px ${r.h - bh}px 0px)` },
        { clipPath: `inset(0px 0px ${r.h - bh}px 0px)`, duration: 0.45 * k, ease: 'power2.inOut' }, t);
      mc(r.x + r.w - 20, r.y + bh * 0.5, t, 0.45 * k);
      if (m.bar.length) {
        touch(m.bar, ['opacity', 'visibility', 'transform']);
        tl.fromTo(m.bar, { autoAlpha: 0, scale: 0.4 }, { autoAlpha: A, scale: 1, duration: 0.3 * k, ease: 'back.out(2.4)', stagger: 0.06 * k, immediateRender: true }, t + 0.3 * k);
      }
      let lt = t + 0.5 * k + m.bar.length * 0.06 * k;
      m.lines.forEach((ln) => {
        const d = typeIn(ln.el, ln.r, ln.chars, 1, lt, null, 0.7, ln.eb) * 0.75;
        lt += d;
      });
      const bodyDur = Math.max(0.35 * k, lt - (t + 0.5 * k));
      tl.to(el, { clipPath: 'inset(0px 0px 0px 0px)', duration: bodyDur, ease: 'none' }, t + 0.5 * k);
      const last = m.lines[m.lines.length - 1];
      if (last) mc(last.r.x + Math.min(last.r.w, 220), last.r.y + last.r.h, t + 0.5 * k, bodyDur, 'sine.inOut');
      if (m.rest.length) hide(m.rest, lt);
      if (m.status) {
        hide(m.status, lt);
        touch(m.status, ['clipPath']);
        tl.fromTo(m.status, { clipPath: 'inset(0px 100% 0px 0px)' }, { clipPath: 'inset(0px 0% 0px 0px)', duration: 0.35 * k, ease: 'power2.out' }, lt);
        lt += 0.35 * k;
      }
      tl.set(el, { clipPath: 'none' }, lt);
      end = lt + 0.05 * k;
    } else {
      /* assemble : coins qui se posent, puis les pièces arrivent et s'emboîtent */
      const fr = mk('bracket', '<i></i><i></i><i></i><i></i>');
      box(fr, r);
      tl.set(fr, { autoAlpha: 1 }, t);
      tl.fromTo(fr, { scale: 1.08 }, { scale: 1, duration: 0.35 * k, ease: 'back.out(2)' }, t);
      touch(el, ['opacity', 'visibility']);
      tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: A, duration: 0.3 * k, immediateRender: true }, t + 0.12 * k);
      const kids = m.kids || [];
      const rr = (n, i) => ((Math.sin((i + 1) * 12.9898 + n * 78.233) * 43758.5453) % 1);
      const stg = Math.min(0.09, 0.6 / Math.max(1, kids.length)) * k;
      if (kids.length) {
        touch(kids, ['opacity', 'visibility', 'transform']);
        tl.fromTo(kids, {
          autoAlpha: 0,
          x: (i) => rr(1, i) * 46,
          y: (i) => 26 + Math.abs(rr(2, i)) * 34,
          rotation: (i) => rr(3, i) * 7,
        }, {
          autoAlpha: A,
          x: 0,
          y: 0,
          rotation: 0,
          immediateRender: true,
          duration: 0.6 * k,
          ease: 'back.out(1.5)',
          stagger: stg,
        }, t + 0.2 * k);
      }
      mc(r.x + r.w - 4, r.y + 4, t + 0.1 * k, 0.4 * k, 'sine.inOut');
      const asm = 0.2 * k + 0.6 * k + stg * kids.length;
      tl.to(fr, { autoAlpha: 0, duration: 0.2 * k }, t + asm);
      end = t + asm + 0.1 * k;
    }

    /* La sélection disparaît au moment exact où l'élément est entier */
    tl.to(sel, { autoAlpha: 0, duration: D.out }, end);
    if (cur) { cur.free = end - 0.15 * k; cur.last = end; }
  });

  host = g;
  syncSubs();
  /* Zone déplacée après la mesure (image, données, contenu chargé au-dessus) :
     le calque la suit à chaque défilement */
  const follow = () => { if (!group.fixed) reposition(); else syncSubs(); };
  window.addEventListener('scroll', follow, { passive: true });

  /* Les curseurs quittent la zone une fois leur travail fini */
  cursors.forEach((cur, i) => {
    if (!cur.used) return;
    const exitX = i % 2 === 0 ? cur.x - 120 : cur.x + 120;
    tl.to(cur.el, { x: exitX, y: cur.y + 40, autoAlpha: 0, duration: 0.35 * k, ease: 'power2.in' }, cur.last);
  });
  if (frameEl) {
    const last = Math.max(offset, ...cursors.map((c) => c.last));
    tl.to(frameEl, { autoAlpha: 0, duration: 0.3 * k }, last);
  }

  /* Fin de construction : le site redevient 100 % piloté par son CSS */
  let done = false;
  /* Retour en arrière après finish() (scroll réversible) : on recoupe les transitions CSS */
  const rearm = () => {
    if (!done) return;
    done = false;
    original.forEach((_, el) => el.style.setProperty('transition', 'none'));
  };
  const finish = () => {
    done = true;
    touched.forEach((props, el) => {
      if (props.has('transform')) gsap.set(el, { clearProps: 'transform' });
      original.get(el).forEach(([key, value]) => {
        if (value) el.style.setProperty(key, value);
        else el.style.removeProperty(key);
      });
    });
  };

  const dispose = () => {
    nanos.forEach(removeNano);
    window.removeEventListener('scroll', follow);
    nodes.forEach((n) => n.remove());
  };

  /* Après un rafraîchissement de ScrollTrigger : réaligne le groupe sur sa zone */
  function reposition() {
    const b = P.root.getBoundingClientRect();
    group.ox = b.left + (group.fixed ? 0 : window.scrollX);
    group.oy = b.top + (group.fixed ? 0 : window.scrollY);
    place();
    syncSubs();
  }

  return { finish, rearm, dispose, reposition };
}
