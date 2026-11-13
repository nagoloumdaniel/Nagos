import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { buildCraft, collectTargets, isVisible } from './build';
import { craftEnabled, releasePending, setCraftOn, claimHeader, releaseHeader, waitFonts, fontsReady } from './env';

gsap.registerPlugin(ScrollTrigger);

const PX = 280; // 1 « seconde » d'animation = 280 px de défilement

/* Éléments de l'en-tête, dans l'ordre de construction (logo, liens, boutons) */
export const headerItems = (start = 0.15, step = 0.1) => {
  const list = [];
  const logo = document.querySelector('.nav__logo');
  if (logo && isVisible(logo)) list.push({ el: logo, effect: 'type', at: start });
  let t = start + 0.25;
  document.querySelectorAll('.nav__item, .nav__theme, .nav__toggle').forEach((el) => {
    if (!isVisible(el)) return;
    list.push({ el, effect: 'wire', at: t });
    t += step;
  });
  return list;
};

const q = (root, sel) => root.querySelector(sel);

/* Accueil : le hero se construit tout seul (le scroll accélère ou rembobine),
   puis chaque section se construit au fil du défilement, réversible. */
export default function useHomeCraft() {
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

      /* ─── Hero ─── */
      const items = headerMine ? headerItems() : [];
      const title = q(home, '.home__layer--solid .home__title');
      const outline = q(home, '.home__layer--outline .home__title');
      const hero = [
        [title, 'type', 1.05, outline ? [outline] : []],
        [q(home, '.home__greeting'), 'type', 1.55],
        [q(home, '.home__subtitle'), 'type', 1.8],
        [q(home, '.home__scroll'), 'wire', 2.05],
        [q(home, '.home__description'), 'type', 2.3],
        ...[...home.querySelectorAll('.home__cta > *')].map((el, i) => [el, 'wire', 2.75 + i * 0.15]),
        [q(home, '.home__social'), 'assemble', 3.1],
      ];
      hero.forEach(([el, effect, at, w]) => { if (el && isVisible(el)) items.push({ el, effect, at, with: w }); });

      const heroTl = gsap.timeline({ paused: true });
      const heroCraft = buildCraft(heroTl, { root: home, items, k: 1, lanes: 5, tone: 'dark', frame: 'Hero' });
      heroTl.eventCallback('onComplete', () => heroCraft.finish());
      const heroIncomplete = () => heroTl.progress() < 1;

      const heroScale = Math.max(1, heroTl.duration() / 4.6);
      if (window.location.hash) heroTl.progress(1);
      else heroTl.timeScale(heroScale).play();

      /* Pendant la construction, la page reste en haut : bas = accélère, haut = rembobine */
      /* Après un redimensionnement, les mesures du hero sont périmées : on le termine et on ne le défait plus */
      let heroStale = false;
      const heroW = window.innerWidth;
      const onHeroResize = () => {
        if (heroStale || Math.abs(window.innerWidth - heroW) < 40) return;
        heroStale = true;
        heroTl.timeScale(1).progress(1);
      };
      const locked = () => !heroStale && (heroIncomplete() || window.scrollY <= 0);
      /* Molette ou doigt dans une zone qui défile elle-même : on la laisse faire */
      const ownScroll = (target, dir) => {
        for (let n = target instanceof Element ? target : null; n && n !== document.body; n = n.parentElement) {
          const oy = getComputedStyle(n).overflowY;
          if ((oy === 'auto' || oy === 'scroll') && n.scrollHeight > n.clientHeight + 1) {
            if (dir > 0 ? n.scrollTop + n.clientHeight < n.scrollHeight - 1 : n.scrollTop > 0) return true;
          }
        }
        return false;
      };
      const push = (dir) => {
        if (dir > 0) {
          if (!heroIncomplete()) return false;
          heroTl.timeScale(heroScale * 5).play();
          return true;
        }
        if (window.scrollY > 1) return false;
        if (heroTl.progress() <= 0) return true;
        heroTl.timeScale(heroScale * 2.5).reverse();
        return true;
      };
      const onWheel = (e) => {
        if (!locked() || Math.abs(e.deltaY) < 1 || ownScroll(e.target, Math.sign(e.deltaY))) return;
        if (push(Math.sign(e.deltaY)) && e.cancelable) e.preventDefault();
      };
      let ty = null;
      const onTouchStart = (e) => { ty = e.touches[0]?.clientY ?? null; };
      const onTouchMove = (e) => {
        if (ty == null || !locked()) return;
        const dy = ty - (e.touches[0]?.clientY ?? ty);
        if (Math.abs(dy) < 6 || ownScroll(e.target, Math.sign(dy))) return;
        if (push(Math.sign(dy)) && e.cancelable) e.preventDefault();
      };
      const KEYS = { ArrowDown: 1, PageDown: 1, ' ': 1, End: 1, ArrowUp: -1, PageUp: -1, Home: -1 };
      const onKey = (e) => {
        const dir = KEYS[e.key];
        if (!dir || !locked() || e.target.closest?.('input,textarea,select,[contenteditable]')) return;
        if (push(dir)) e.preventDefault();
      };
      /* Saut direct (lien d'ancre, barre de défilement) : le hero se termine aussitôt */
      const onScroll = () => { if (window.scrollY > 4 && heroIncomplete()) heroTl.timeScale(1).progress(1); };
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
        if (headerMine && heroIncomplete()) releaseHeader();
        heroTl.progress(1);
        heroCraft.finish();
        heroCraft.dispose();
        heroTl.kill();
      });

      /* ─── Sections : construites par le scroll ─── */
      const roots = [...document.querySelectorAll('main .section:not(.home)'), document.querySelector('.footer')].filter(Boolean);
      const crafts = new Map();

      const build = (root) => {
        const tl = gsap.timeline({ paused: true });
        const top = root.getBoundingClientRect().top;
        const targets = collectTargets(root).map((t) => ({
          ...t,
          at: Math.max(0, t.el.getBoundingClientRect().top - top) * 0.85,
        }));
        const craft = buildCraft(tl, { root, items: targets, k: PX, lanes: Math.min(10, Math.max(4, Math.ceil(targets.length / 4))), frame: root.id || 'footer' });
        /* Distance de construction : proportionnelle à la section, jamais plus longue qu'elle */
        const L = Math.max(200, Math.min(tl.duration(), root.offsetHeight * 0.85 + window.innerHeight * 0.25));
        const maxScroll = () => ScrollTrigger.maxScroll(window);
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
        crafts.set(root, { tl, st, craft, h: root.offsetHeight });
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

      roots.forEach(build);
      ScrollTrigger.refresh();
      crafts.forEach(({ tl, st }) => { tl.progress(st.progress); st.getTween()?.progress(1); });

      /* Contenu qui change de taille (données GitHub, images) : on reconstruit la section */
      let timer = 0;
      const dirty = new Set();
      const rebuild = () => {
        if (!alive) return;
        dirty.forEach((root) => { destroy(root); build(root); });
        dirty.clear();
        ScrollTrigger.refresh();
        crafts.forEach(({ tl, st }) => { tl.progress(st.progress); st.getTween()?.progress(1); });
      };
      const ro = new ResizeObserver((entries) => {
        entries.forEach((e) => {
          const c = crafts.get(e.target);
          if (c && Math.abs(e.target.offsetHeight - c.h) > 40) dirty.add(e.target);
        });
        if (dirty.size) { clearTimeout(timer); timer = setTimeout(rebuild, 250); }
      });
      roots.forEach((r) => ro.observe(r));
      let lastW = window.innerWidth;
      const onResize = () => {
        if (Math.abs(window.innerWidth - lastW) < 40) return;
        lastW = window.innerWidth;
        roots.forEach((r) => dirty.add(r));
        clearTimeout(timer);
        timer = setTimeout(rebuild, 300);
      };
      window.addEventListener('resize', onResize);
      cleanups.push(() => {
        clearTimeout(timer);
        ro.disconnect();
        window.removeEventListener('resize', onResize);
        [...crafts.keys()].forEach(destroy);
      });
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
