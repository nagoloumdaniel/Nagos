import gsap from 'gsap';
import { getWorld, addNano, removeNano, markDirty } from './overlay';

/* ─── Sélection automatique des éléments à « designer » ──────
   Parcours de haut en bas : un composant (carte, panneau…) est assemblé d'un bloc,
   un titre ou paragraphe est tapé, un bouton passe par un wireframe, un visuel
   naît de particules. `data-craft="type|wire|nano|assemble|skip"` force un choix. */

const TEXT = 'h1,h2,h3,h4,h5,h6,p,blockquote,figcaption,dt,dd,label,time,.section__subtitle';
const WIRE = 'a.button,button,.button,input,textarea,select,[role="tab"],a[class]';
const MEDIA = 'img,svg,canvas,video,picture,iframe';
const COMP = '.glass,[class*="card"]:not([class*="card__"]),[class*="__box"],[class*="panel"],[class*="__content"],form';

export const isVisible = (el) => {
  const r = el.getBoundingClientRect();
  if (r.width < 2 || r.height < 2) return false;
  if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
  return true;
};

const visibleKids = (el) => Array.from(el.children).filter(isVisible);

export const collectTargets = (root, { max = 60 } = {}) => {
  const out = [];
  let comps = 0;
  const walk = (node) => {
    for (const el of node.children) {
      if (out.length >= max) return;
      if (el.matches('script,style,template,dialog,.craft-layer')) continue;
      const forced = el.getAttribute('data-craft');
      if (forced === 'skip') continue;
      if (!isVisible(el)) continue;
      if (forced) { out.push({ el, effect: forced }); continue; }
      if (el.matches(COMP) && visibleKids(el).length >= 2) {
        comps += 1;
        out.push({ el, effect: comps % 3 === 0 ? 'nano' : 'assemble' });
      } else if (el.matches(MEDIA)) out.push({ el, effect: 'nano' });
      else if (el.matches(WIRE)) out.push({ el, effect: 'wire' });
      else if (el.matches(TEXT)) out.push({ el, effect: 'type' });
      else if (el.children.length) walk(el);
      else if (el.textContent.trim()) out.push({ el, effect: 'type' });
    }
  };
  walk(root);
  return out;
};

/* ─── Construction de la timeline ─────────────────────────── */

const NAMES = ['Layout', 'Type', 'Grid', 'Motion', 'Copy', 'A11y', 'Assets', 'QA'];
const CURSOR_SVG =
  '<svg class="craft-cursor__arrow" width="18" height="20" viewBox="0 0 18 20" aria-hidden="true">' +
  '<path d="M1.2 1.2v15l4.1-3.8 2.8 6.2 2.6-1.1-2.7-6.1h5.7z"/></svg>';

const wireLabel = (el) => {
  if (el.matches('input,textarea,select')) return 'Input';
  if (el.matches('[role="tab"]')) return 'Tab';
  if (el.matches('button,.button')) return 'Button';
  if (el.matches('a')) return 'Link';
  return 'Component';
};

const frameName = (root) =>
  root.id || (root.className && String(root.className).split(' ')[0]) || 'frame';

/**
 * Remplit `tl` avec la construction des `items` ({ el, effect, at }).
 * `k` convertit les durées : 1 = secondes (lecture auto), ~300 = pixels de scroll.
 */
export function buildCraft(tl, { root, items, k = 1, lanes = 4, tone = '', frame = true, offset = 0 }) {
  const world = getWorld();
  const nodes = [];
  const nanos = [];
  const touched = new Map();
  const sx = window.scrollX;
  const sy = window.scrollY;
  const rootBox = root.getBoundingClientRect();
  const group = { ox: rootBox.left + sx, oy: rootBox.top + sy };

  const g = document.createElement('div');
  g.className = `craft-group${tone ? ` craft--${tone}` : ''}`;
  world.appendChild(g);
  nodes.push(g);
  const place = () => { g.style.transform = `translate3d(${group.ox}px, ${group.oy}px, 0)`; };
  place();

  const mk = (cls, html = '') => {
    const n = document.createElement('div');
    n.className = `craft-${cls}`;
    if (html) n.innerHTML = html;
    g.appendChild(n);
    return n;
  };
  const box = (n, r) => gsap.set(n, { left: r.x, top: r.y, width: r.w, height: r.h, autoAlpha: 0 });
  const rel = (el) => {
    const b = el.getBoundingClientRect();
    return { x: b.left + sx - group.ox, y: b.top + sy - group.oy, w: b.width, h: b.height };
  };
  /* Styles inline d'origine, restaurés tels quels à la fin (React ou le code existant peuvent en poser) */
  const STYLE_KEYS = ['opacity', 'visibility', 'clip-path', 'transform', 'translate', 'rotate', 'scale'];
  const original = new Map();
  const touch = (el, props) => {
    if (!original.has(el)) original.set(el, STYLE_KEYS.map((key) => [key, el.style.getPropertyValue(key)]));
    const set = touched.get(el) || new Set();
    props.forEach((p) => set.add(p));
    touched.set(el, set);
  };
  const D = { move: 0.34 * k, draw: 0.3 * k, out: 0.2 * k };
  const R = { w: rootBox.width, h: rootBox.height };

  /* Cadre façon outil de design autour de la zone : nom + dimensions */
  if (frame) {
    const f = mk('frame', '<span class="craft-frame__name"></span><span class="craft-frame__dim"></span>');
    /* Le nom peut venir de l'URL : texte brut, jamais interprété comme du HTML */
    f.firstChild.textContent = typeof frame === 'string' ? frame : frameName(root);
    f.lastChild.textContent = `${Math.round(R.w)} × ${Math.round(R.h)}`;
    box(f, { x: 0, y: 0, w: R.w, h: R.h });
    tl.set(f, { autoAlpha: 1 }, offset);
    tl.fromTo(f, { clipPath: `inset(-28px ${R.w + 8}px ${R.h + 8}px -8px)` },
      { clipPath: 'inset(-28px -8px -8px -8px)', duration: 0.5 * k, ease: 'power2.out' }, offset);
    nodes.push(f);
    tl.__craftFrame = f;
  }

  /* Curseurs : chacun a sa « voie » et enchaîne ses tâches */
  const sorted = [...items].sort((a, b) => a.at - b.at);
  const nL = Math.max(1, Math.min(lanes, sorted.length));
  const vw = window.innerWidth;
  const cursors = Array.from({ length: nL }, (_, i) => {
    const c = mk('cursor', `${CURSOR_SVG}<span class="craft-cursor__tag">${NAMES[(i + Math.round(group.oy / 97)) % NAMES.length]}</span>`);
    const left = i % 2 === 0;
    const x = left ? -group.ox - 40 : vw - group.ox + 30;
    const y = 30 + i * 64 + (sorted[i] ? rel(sorted[i].el).y * 0.5 : 0);
    gsap.set(c, { x, y, autoAlpha: 0 });
    return { el: c, x, y, free: -Infinity, used: false, last: 0 };
  });

  const moveCursor = (cur, x, y, at, dur, ease = 'power2.inOut') => {
    tl.fromTo(cur.el, { x: cur.x, y: cur.y }, { x, y, duration: dur, ease, immediateRender: false }, at);
    cur.x = x; cur.y = y;
  };

  sorted.forEach((item, idx) => {
    const { el, effect } = item;
    const els = [el, ...(item.with || [])];
    const cur = cursors.reduce((a, b) => (b.free < a.free ? b : a));
    let t = Math.max(item.at, cur.free);
    const r = rel(el);
    if (!cur.used) {
      tl.fromTo(cur.el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 * k, immediateRender: false }, t);
      cur.used = true;
    }
    moveCursor(cur, r.x, r.y, t, D.move);
    t += D.move;

    /* Cadre de sélection tiré par le curseur */
    const sel = mk('sel', `<i></i><i></i><i></i><i></i><span class="craft-sel__dim">${Math.round(r.w)} × ${Math.round(r.h)}</span>`);
    box(sel, r);
    tl.set(sel, { autoAlpha: 1 }, t);
    tl.fromTo(sel, { clipPath: `inset(-2px ${r.w + 2}px ${r.h + 2}px -2px)` },
      { clipPath: 'inset(-6px -6px -26px -6px)', duration: D.draw, ease: 'power2.inOut' }, t);
    moveCursor(cur, r.x + r.w, r.y + r.h, t, D.draw);
    t += D.draw * 0.7;

    let end = t;
    const color = getComputedStyle(el).color;

    if (effect === 'type') {
      const cs = getComputedStyle(el);
      const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.3 || r.h;
      const lines = Math.max(1, Math.round(r.h / lh));
      const chars = Math.max(6, Math.min(48, el.textContent.trim().length));
      const mv = Math.max(12, r.h * 0.5);
      const mh = 14;
      const dur = Math.min(1.1, 0.35 + chars * 0.018 + (lines - 1) * 0.08) * k;
      els.forEach((e) => touch(e, ['opacity', 'visibility', 'clipPath']));
      tl.from(els, { autoAlpha: 0, duration: 0.001 }, t);
      const caret = mk('caret');
      if (lines === 1) {
        tl.fromTo(els, { clipPath: `inset(-${mv}px ${r.w + mh}px -${mv}px -${mh}px)` },
          { clipPath: `inset(-${mv}px -${mh}px -${mv}px -${mh}px)`, duration: dur, ease: `steps(${chars})` }, t);
        box(caret, { x: r.x, y: r.y, w: 2, h: r.h });
        tl.set(caret, { autoAlpha: 1 }, t);
        tl.fromTo(caret, { x: 0 }, { x: r.w, duration: dur, ease: `steps(${chars})`, immediateRender: false }, t);
        moveCursor(cur, r.x + r.w + 8, r.y + r.h * 0.65, t, dur, `steps(${chars})`);
      } else {
        tl.fromTo(els, { clipPath: `inset(-${mh}px -${mh}px ${r.h + mh}px -${mh}px)` },
          { clipPath: `inset(-${mh}px -${mh}px -${mh}px -${mh}px)`, duration: dur, ease: `steps(${lines})` }, t);
        caret.classList.add('craft-caret--scan');
        box(caret, { x: r.x, y: r.y, w: r.w, h: 1 });
        tl.set(caret, { autoAlpha: 1 }, t);
        tl.fromTo(caret, { y: 0 }, { y: r.h, duration: dur, ease: `steps(${lines})`, immediateRender: false }, t);
        moveCursor(cur, r.x - 10, r.y + r.h, t, dur, `steps(${lines})`);
      }
      tl.set(caret, { autoAlpha: 0 }, t + dur + 0.05 * k);
      /* Guide pointillé sous les titres, comme un repère d'alignement */
      if (/^H[1-3]$/.test(el.tagName)) {
        const gd = mk('guide');
        box(gd, { x: 0, y: r.y + r.h, w: R.w, h: 1 });
        tl.set(gd, { autoAlpha: 1 }, t);
        tl.fromTo(gd, { scaleX: 0 }, { scaleX: 1, duration: 0.4 * k, ease: 'power3.out' }, t);
        tl.to(gd, { autoAlpha: 0, duration: 0.3 * k }, t + dur);
      }
      end = t + dur;
    } else if (effect === 'wire') {
      const gh = mk('ghost', `<span>${wireLabel(el)}</span>`);
      box(gh, r);
      tl.set(gh, { autoAlpha: 1 }, t);
      tl.fromTo(gh, { clipPath: `inset(0px ${r.w}px ${r.h}px 0px)` },
        { clipPath: 'inset(-22px -4px -4px -4px)', duration: 0.25 * k, ease: 'power2.out' }, t);
      touch(el, ['opacity', 'visibility', 'clipPath']);
      tl.from(el, { autoAlpha: 0, duration: 0.001 }, t + 0.22 * k);
      tl.fromTo(el, { clipPath: `inset(${r.h / 2}px ${r.w / 2}px ${r.h / 2}px ${r.w / 2}px)` },
        { clipPath: 'inset(-8px -8px -8px -8px)', duration: 0.4 * k, ease: 'expo.out' }, t + 0.22 * k);
      moveCursor(cur, r.x + r.w * 0.5, r.y + r.h * 0.5, t + 0.1 * k, 0.25 * k);
      tl.to(gh, { autoAlpha: 0, duration: 0.2 * k }, t + 0.5 * k);
      end = t + 0.62 * k;
    } else if (effect === 'nano') {
      const job = addNano({ group, rect: r, from: { x: cur.x, y: cur.y }, color, seed: idx + 1 + Math.round(group.oy) });
      nanos.push(job);
      const dur = Math.min(1.5, 0.9 + (r.w * r.h) / 400000) * k;
      tl.fromTo(job, { p: 0 }, { p: 1, duration: dur, ease: 'none', onUpdate: markDirty, immediateRender: false }, t);
      touch(el, ['opacity', 'visibility', 'clipPath']);
      tl.from(el, { autoAlpha: 0, duration: 0.001 }, t + dur * 0.55);
      tl.fromTo(el, { clipPath: `inset(-6px -6px ${r.h + 6}px -6px)` },
        { clipPath: 'inset(-6px -6px -6px -6px)', duration: dur * 0.4, ease: 'power1.inOut' }, t + dur * 0.55);
      moveCursor(cur, r.x + r.w * 0.5, r.y + r.h * 0.5, t, dur * 0.5, 'sine.inOut');
      end = t + dur;
    } else {
      /* assemble : coins qui se posent, puis les pièces arrivent et s'emboîtent */
      const fr = mk('bracket', '<i></i><i></i><i></i><i></i>');
      box(fr, r);
      tl.set(fr, { autoAlpha: 1 }, t);
      tl.fromTo(fr, { scale: 1.08 }, { scale: 1, duration: 0.3 * k, ease: 'back.out(2)' }, t);
      touch(el, ['opacity', 'visibility']);
      tl.from(el, { autoAlpha: 0, duration: 0.3 * k }, t + 0.12 * k);
      const kids = visibleKids(el).slice(0, 14);
      const rr = (n, i) => ((Math.sin((i + 1) * 12.9898 + n * 78.233) * 43758.5453) % 1);
      kids.forEach((kid) => touch(kid, ['opacity', 'visibility', 'transform']));
      if (kids.length) {
        tl.from(kids, {
          autoAlpha: 0,
          x: (i) => rr(1, i) * 46,
          y: (i) => 26 + Math.abs(rr(2, i)) * 34,
          rotation: (i) => rr(3, i) * 7,
          duration: 0.55 * k,
          ease: 'back.out(1.5)',
          stagger: Math.min(0.08, 0.5 / kids.length) * k,
        }, t + 0.2 * k);
      }
      moveCursor(cur, r.x + r.w - 4, r.y + 4, t + 0.1 * k, 0.4 * k, 'sine.inOut');
      const asm = 0.2 * k + 0.55 * k + Math.min(0.08, 0.5 / Math.max(1, kids.length)) * k * kids.length;
      tl.to(fr, { autoAlpha: 0, duration: 0.2 * k }, t + asm);
      end = t + asm + 0.1 * k;
    }

    tl.to(sel, { autoAlpha: 0, duration: D.out }, end - D.out * 0.5);
    cur.free = end - 0.15 * k;
    cur.last = end;
  });

  /* Les curseurs quittent la zone une fois leur travail fini */
  cursors.forEach((cur, i) => {
    if (!cur.used) return;
    const exitX = i % 2 === 0 ? cur.x - 120 : cur.x + 120;
    tl.to(cur.el, { x: exitX, y: cur.y + 40, autoAlpha: 0, duration: 0.35 * k, ease: 'power2.in' }, cur.last);
  });
  if (tl.__craftFrame) {
    tl.to(tl.__craftFrame, { autoAlpha: 0, duration: 0.3 * k }, Math.max(offset, tl.duration() - 0.3 * k));
    delete tl.__craftFrame;
  }

  /* Fin de construction : le site redevient 100 % piloté par son CSS */
  const finish = () => {
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
    nodes.forEach((n) => n.remove());
  };

  const reposition = () => {
    const b = root.getBoundingClientRect();
    group.ox = b.left + window.scrollX;
    group.oy = b.top + window.scrollY;
    place();
  };

  return { finish, dispose, reposition };
}
