import { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { buildCraft, collectTargets, isVisible, planCraft } from './build';
import { installLeave } from './leave';
import { craftEnabled, releasePending, setCraftOn, claimHeader, releaseHeader, waitFonts, fontsReady, onLateFonts } from './env';

gsap.registerPlugin(ScrollTrigger);

const PX = 280; // 1 « seconde » d'animation = 280 px de défilement
const DIST = 1600; // px de molette pour parcourir tout le hero quand le scroll prend la main

/* Nav : plan mesuré dans le repère de l'écran (l'en-tête est fixe), construit sans hâte */
export const planHeader = (start = 0.15, step = 0.22) => {
  const header = document.querySelector('.header');
  if (!header || !isVisible(header)) return null;
  const items = [];
  const logo = header.querySelector('.nav__logo');
  if (logo && isVisible(logo)) items.push({ el: logo, effect: 'type', at: start });
  let t = start + 0.3;
  header.querySelectorAll('.nav__item, .nav__theme, .nav__toggle').forEach((el) => {
    if (!isVisible(el)) return;
    items.push({ el, effect: el.matches('.nav__item') ? 'type' : 'radial', at: t });
    t += step;
  });
  return items.length ? planCraft(header, items, { fixed: true }) : null;
};

const q = (root, sel) => root.querySelector(sel);

/* Accueil : le hero se construit tout seul ; dès que l'utilisateur fait défiler, il suit
   le rythme exact du scroll (dans les deux sens). Les sections se construisent au fil
   du défilement, réversibles. */
export default function useHomeCraft() {
  const navigate = useNavigate();
  /* Ref : l'identité de navigate peut changer avec l'URL (ancre), sans devoir tout reconstruire */
  const navRef = useRef(navigate);
  useLayoutEffect(() => { navRef.current = navigate; });

  useLayoutEffect(() => {
    if (!craftEnabled()) { setCraftOn(false); releasePending(); return undefined; }
    setCraftOn(true);
    let alive = true;
    const cleanups = [];
    const headerMine = claimHeader();

    const start = () => {
      if (!alive) return;
      releasePending();
      const home = document.getElementById('home');
      if (!home) return;
      let settled = false;
      let settle = () => {};

      /* ─── Mesures du hero et de la nav, d'un seul bloc ─── */
      const navPlan = headerMine ? planHeader() : null;
      const title = q(home, '.home__layer--solid .home__title');
      const outline = q(home, '.home__layer--outline .home__title');
      const hero = [
        [title, 'type', 0.9, outline ? [outline] : []],
        [q(home, '.home__greeting'), 'type', 1.5],
        [q(home, '.home__subtitle'), 'type', 1.85],
        [q(home, '.home__scroll'), 'radial', 2.2],
        [q(home, '.home__description'), 'type', 2.4],
        ...[...home.querySelectorAll('.home__cta > *')].map((el, i) => [el, i ? 'wire' : 'resize', 2.9 + i * 0.25]),
        [q(home, '.home__social'), 'assemble', 3.4],
      ];
      const items = [];
      hero.forEach(([el, effect, at, w]) => { if (el && isVisible(el)) items.push({ el, effect, at, with: w }); });
      const heroPlan = planCraft(home, items);

      const heroTl = gsap.timeline({ paused: true });
      const heroCraft = buildCraft(heroTl, { plan: heroPlan, k: 1, lanes: 4, tone: 'dark', frame: 'Hero' });
      const navCraft = navPlan ? buildCraft(heroTl, { plan: navPlan, k: 1, lanes: 2, tone: 'dark', frame: 'Nav' }) : null;
      const finishHero = () => { heroCraft.finish(); navCraft?.finish(); };
      heroTl.eventCallback('onComplete', finishHero);
      heroTl.eventCallback('onUpdate', () => { if (heroTl.progress() < 1) { heroCraft.rearm(); navCraft?.rearm(); } });

      /* Lecture auto : environ 6 s, rythme posé */
      let mode = 'auto';
      let target = 0;
      const prog = () => (mode === 'scroll' ? target : heroTl.progress());
      const complete = () => {
        gsap.killTweensOf(heroTl);
        mode = 'scroll';
        target = 1;
        heroTl.progress(1);
      };
      if (window.location.hash) complete();
      else heroTl.timeScale(Math.max(1, heroTl.duration() / 6)).play();

      /* Après un redimensionnement, les mesures du hero sont périmées : on le termine et on ne le défait plus */
      let heroStale = false;
      const heroW = window.innerWidth;
      const onHeroResize = () => {
        if (heroStale || Math.abs(window.innerWidth - heroW) < 40) return;
        heroStale = true;
        complete();
      };
      /* Bas : on construit tant que le hero n'est pas fini. Haut : on défait seulement tout en haut. */
      const wants = (dir) => !heroStale && !settled && (dir > 0 ? prog() < 1 : window.scrollY <= 0 && prog() > 0);
      const drive = (delta) => {
        if (mode === 'auto') { mode = 'scroll'; heroTl.pause(); target = heroTl.progress(); }
        target = Math.max(0, Math.min(1, target + delta / DIST));
        gsap.to(heroTl, { progress: target, duration: 0.5, ease: 'power2.out', overwrite: true });
      };
      /* Molette ou doigt dans une zone qui défile elle-même : on la laisse faire */
      const ownScroll = (el, dir) => {
        for (let n = el instanceof Element ? el : null; n && n !== document.body; n = n.parentElement) {
          const oy = getComputedStyle(n).overflowY;
          if ((oy === 'auto' || oy === 'scroll') && n.scrollHeight > n.clientHeight + 1) {
            if (dir > 0 ? n.scrollTop + n.clientHeight < n.scrollHeight - 1 : n.scrollTop > 0) return true;
          }
        }
        return false;
      };
      const onWheel = (e) => {
        if (e.ctrlKey) return; // zoom navigateur ou pincement du trackpad
        const dir = Math.sign(e.deltaY);
        if (!dir || !wants(dir) || ownScroll(e.target, dir)) return;
        if (e.cancelable) e.preventDefault();
        const d = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
        drive(Math.max(-240, Math.min(240, d)));
      };
      let ty = null;
      const onTouchStart = (e) => { ty = e.touches[0]?.clientY ?? null; };
      const onTouchMove = (e) => {
        if (e.touches.length !== 1) { ty = null; return; } // pincement : zoom natif
        const y = e.touches[0].clientY;
        if (ty == null) { ty = y; return; }
        const dy = ty - y;
        ty = y; // toujours à jour : pas de saut quand le pilotage reprend
        const dir = Math.sign(dy);
        if (!dir || !wants(dir) || ownScroll(e.target, dir)) return;
        if (e.cancelable) e.preventDefault();
        drive(dy * 2.2);
      };
      const KEYS = { ArrowDown: 1, PageDown: 3, ' ': 3, End: 10, ArrowUp: -1, PageUp: -3, Home: -10 };
      const OWN_KEYS = 'input,textarea,select,button,a,[contenteditable],[role="menu"],[role="dialog"],[role="listbox"],[role="combobox"]';
      const onKey = (e) => {
        if (e.key === 'Tab') { settle(); return; }
        const n = KEYS[e.key];
        if (!n || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;
        if (!wants(Math.sign(n)) || e.target.closest?.(OWN_KEYS)) return;
        e.preventDefault();
        drive(n * DIST * 0.06);
      };
      /* Saut direct (lien d'ancre, barre de défilement) : le hero se termine aussitôt */
      const onScroll = () => { if (window.scrollY > 4 && prog() < 1) complete(); };
      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('keydown', onKey);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onHeroResize);
      cleanups.push(() => {
        window.removeEventListener('resize', onHeroResize);
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('scroll', onScroll);
        if (headerMine && heroTl.progress() < 1) releaseHeader();
        gsap.killTweensOf(heroTl);
        heroTl.progress(1);
        finishHero();
        heroCraft.dispose();
        navCraft?.dispose();
        heroTl.kill();
      });

      /* ─── Sections : construites par le scroll ─── */
      const roots = [...document.querySelectorAll('main .section:not(.home)'), document.querySelector('.footer')].filter(Boolean);
      const crafts = new Map();
      const maxScroll = () => ScrollTrigger.maxScroll(window);

      /* Une section est mesurée et construite seulement quand elle approche de l'écran :
         ses mesures portent sur la mise en page réelle du moment (polices, images, données
         chargées), pas sur celle du chargement. D'ici là, son contenu reste masqué. */
      const plan = (root) => planCraft(root, collectTargets(root).map((t) => ({ ...t, at: (r) => Math.max(0, r.y) * 0.85 })));

      const build = (root, p) => {
        const tl = gsap.timeline({ paused: true });
        const n = p.items.length;
        const craft = buildCraft(tl, { plan: p, k: PX, lanes: Math.min(10, Math.max(4, Math.ceil(n / 4))), frame: root.id || 'footer' });
        /* Distance de construction : proportionnelle à la section, jamais plus longue qu'elle */
        const L = Math.max(200, Math.min(tl.duration(), p.R.h * 0.85 + window.innerHeight * 0.25));
        const startAt = () => {
          const vh = window.innerHeight;
          const s = root.getBoundingClientRect().top + window.scrollY - vh * 0.88;
          const m = maxScroll();
          if (s + L <= m) return Math.max(0, s);
          return Math.max(0, Math.min(s, m - Math.min(L, vh * 0.7)));
        };
        const st = ScrollTrigger.create({
          trigger: root,
          start: startAt,
          end: () => Math.min(startAt() + L, maxScroll()),
          animation: tl,
          scrub: 0.6,
          invalidateOnRefresh: false,
          onRefresh: () => craft.reposition(),
        });
        /* Fin atteinte (même via le lissage du scrub) : le DOM retrouve son CSS d'origine */
        tl.eventCallback('onComplete', craft.finish);
        tl.eventCallback('onUpdate', () => { if (tl.progress() < 1) craft.rearm(); });
        crafts.set(root, { tl, st, craft, h: root.offsetHeight, w: root.offsetWidth });
      };

      const destroy = (root) => {
        const c = crafts.get(root);
        if (!c) return;
        c.st.kill();
        c.tl.progress(1);
        c.craft.finish();
        c.craft.dispose();
        c.tl.kill();
        crafts.delete(root);
      };

      const buildAll = (list) => {
        list.forEach((root) => root.classList.remove('craft-wait'));
        /* Lecture d'abord (toutes les sections du lot), écriture ensuite */
        const plans = list.map((root) => [root, plan(root)]);
        plans.forEach(([root, p]) => build(root, p));
        ScrollTrigger.refresh();
        list.forEach((root) => {
          const c = crafts.get(root);
          if (c) { c.tl.progress(c.st.progress); c.st.getTween()?.progress(1); }
        });
      };

      roots.forEach((r) => r.classList.add('craft-wait'));
      const queue = new Set();
      let raf = 0;
      const flush = () => {
        raf = 0;
        if (!alive || settled || !queue.size) return;
        const list = roots.filter((r) => queue.has(r));
        queue.clear();
        buildAll(list);
      };
      /* Marge large dans les deux sens : rien n'est encore masqué quand on y arrive */
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || crafts.has(e.target)) return;
          io.unobserve(e.target);
          queue.add(e.target);
        });
        if (queue.size && !raf) raf = requestAnimationFrame(flush);
      }, { rootMargin: '100% 0px 150% 0px' });
      roots.forEach((r) => io.observe(r));

      /* Contenu qui change de taille (données GitHub, images, ajout d'un projet) : la section
         est remesurée et reconstruite, comme un squelette qui suit son contenu */
      let timer = 0;
      const dirty = new Set();
      const rebuild = () => {
        if (!alive || settled) return;
        const list = [...dirty].filter((r) => crafts.has(r));
        dirty.clear();
        if (!list.length) return;
        list.forEach(destroy);
        buildAll(list);
      };
      const later = (ms) => { clearTimeout(timer); timer = setTimeout(rebuild, ms); };
      const ro = new ResizeObserver((entries) => {
        entries.forEach((e) => {
          const c = crafts.get(e.target);
          if (c && (Math.abs(e.target.offsetHeight - c.h) > 1 || Math.abs(e.target.offsetWidth - c.w) > 1)) dirty.add(e.target);
        });
        if (dirty.size) later(200);
      });
      roots.forEach((r) => ro.observe(r));
      /* Police arrivée après les mesures : les cadres de texte sont faux, on remesure */
      const offFonts = onLateFonts(() => { crafts.forEach((_, r) => dirty.add(r)); later(120); });
      cleanups.push(() => {
        clearTimeout(timer);
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        offFonts();
        roots.forEach((r) => r.classList.remove('craft-wait'));
        [...crafts.keys()].forEach(destroy);
      });

      /* Départ ou clavier : hero et sections terminés, le contenu devient atteignable et stable */
      settle = () => {
        settled = true;
        if (prog() < 1) complete();
        io.disconnect();
        roots.forEach((r) => r.classList.remove('craft-wait'));
        [...crafts.keys()].forEach(destroy);
      };
      cleanups.push(installLeave((to) => navRef.current(to), () => settle()));
    };

    if (fontsReady()) start();
    else waitFonts().then(start);

    return () => {
      alive = false;
      if (headerMine && !cleanups.length) releaseHeader();
      cleanups.reverse().forEach((fn) => fn());
    };
  }, []);
}
