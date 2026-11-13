import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { buildCraft, collectTargets, planCraft } from './build';
import { planHeader } from './useHomeCraft';
import { installLeave } from './leave';
import { craftEnabled, releasePending, holdPage, setCraftOn, claimHeader, releaseHeader, waitFonts, fontsReady } from './env';

gsap.registerPlugin(ScrollTrigger);

const WAVE = 2.4; // s pour que la vague de construction descende d'un écran
const MAX_DUR = 9; // la construction de l'écran dure au plus ~9 s

/* Pages Portfolio, Blog et leurs sous-pages : l'écran visible se construit tout seul,
   lentement ; le reste se construit par bandes, quand il arrive à l'écran. */
export default function usePageCraft(rootRef) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(navigate);
  useLayoutEffect(() => { navRef.current = navigate; });

  useLayoutEffect(() => {
    if (!craftEnabled()) { setCraftOn(false); releasePending(); return undefined; }
    setCraftOn(true);
    let alive = true;
    let stop = null;
    const headerMine = claimHeader();

    const start = () => {
      if (!alive) return;
      releasePending();
      const root = rootRef.current;
      if (!root) { if (headerMine) releaseHeader(); return; }

      /* ─── Lecture : tout est mesuré avant la moindre écriture ─── */
      const vh = window.innerHeight;
      const limit = vh * 1.1;
      const navPlan = headerMine ? planHeader(0.1, 0.12) : null;
      const footer = document.querySelector('.footer');
      const all = [
        ...collectTargets(root, { max: 140 }),
        ...(footer ? collectTargets(footer, { max: 12 }) : []),
      ].map((t) => ({ ...t, top: t.el.getBoundingClientRect().top + window.scrollY }))
        .sort((a, b) => a.top - b.top);
      const sy = window.scrollY;
      const near = all.filter((t) => t.top - sy < limit);
      const far = all.filter((t) => t.top - sy >= limit);
      /* Chaque UI démarre selon sa hauteur à l'écran, sans attendre les autres : tout se
         construit en parallèle, de haut en bas, la nav en même temps que le contenu */
      const at = (y, i) => 0.15 + Math.max(0, y) / vh * WAVE + (i % 3) * 0.08;
      const mainPlan = near.length
        ? planCraft(root, near.map((t, i) => ({ el: t.el, effect: t.effect, at: at(t.top - sy, i) })))
        : null;
      /* Bandes d'environ 0,6 écran sous la ligne de flottaison */
      const bands = [];
      far.forEach(({ top, el, effect }) => {
        const t = { el, effect, top };
        const last = bands[bands.length - 1];
        if (last && top - last.top < vh * 0.6) last.items.push(t);
        else bands.push({ top, items: [t] });
      });
      const bandPlans = bands.map((b) => ({
        top: b.top,
        plan: planCraft(root, b.items.map(({ top, ...t }, i) => ({ ...t, at: at(top - b.top, i) - 0.15 }))),
      }));
      if (!mainPlan && !navPlan && !bandPlans.length) { if (headerMine) releaseHeader(); return; }

      /* ─── Écriture ─── */
      const parts = [];
      const tl = gsap.timeline({ paused: true });
      if (mainPlan) parts.push(buildCraft(tl, { plan: mainPlan, k: 1, lanes: Math.min(12, Math.max(5, Math.ceil(near.length / 3))), frame: pathname.split('/')[1] || 'page' }));
      if (navPlan) parts.push(buildCraft(tl, { plan: navPlan, k: 1, lanes: 2, frame: 'Nav' }));
      const finishMain = () => parts.forEach((p) => p.finish());
      tl.eventCallback('onComplete', () => { finishMain(); parts.forEach((p) => p.dispose()); });
      tl.timeScale(Math.max(1, tl.duration() / MAX_DUR));
      tl.play();

      const bandCrafts = bandPlans.map(({ plan, top }) => {
        const btl = gsap.timeline({ paused: true });
        const craft = buildCraft(btl, { plan, k: 1, lanes: Math.min(8, Math.max(3, Math.ceil(plan.items.length / 3))), frame: false });
        btl.timeScale(Math.max(1, btl.duration() / 4));
        btl.eventCallback('onComplete', () => { craft.finish(); craft.dispose(); });
        /* Départ borné au scroll maximal : un bloc tout en bas de page se construit quand même */
        const st = ScrollTrigger.create({
          start: () => Math.min(Math.max(0, top - vh * 0.88), Math.max(0, ScrollTrigger.maxScroll(window) - 2)),
          end: () => ScrollTrigger.maxScroll(window) + 1,
          once: true,
          onEnter: () => btl.play(),
        });
        return { btl, craft, st };
      });

      /* Termine tout de suite (bandes comprises, ou seulement celles déjà commencées) */
      const settle = (all) => {
        if (tl.progress() < 1) tl.progress(1);
        bandCrafts.forEach(({ btl, st }) => {
          if (all || btl.progress() > 0) { st.kill(); btl.progress(1); }
        });
      };
      /* Filet : en bas de page (page raccourcie après mesure), tout ce qui reste se construit */
      const onBottom = () => {
        if (window.scrollY < ScrollTrigger.maxScroll(window) - 2) return;
        bandCrafts.forEach(({ btl, st }) => { if (btl.progress() === 0 && !btl.isActive()) { st.kill(); btl.play(); } });
      };
      /* Clavier (Tab) : le contenu masqué serait inatteignable, on termine tout */
      const onTab = (e) => { if (e.key === 'Tab') settle(true); };

      /* Une action de l'utilisateur accélère un peu la fin, sans casser le rythme */
      const hurry = () => { if (tl.progress() < 1) tl.timeScale(Math.max(tl.timeScale(), tl.duration() / 3)); };
      const evs = ['wheel', 'touchstart', 'keydown'];
      evs.forEach((e) => window.addEventListener(e, hurry, { passive: true }));
      window.addEventListener('scroll', onBottom, { passive: true });
      window.addEventListener('keydown', onTab);
      const leave = installLeave((to) => navRef.current(to), () => settle(false));

      stop = () => {
        leave();
        evs.forEach((e) => window.removeEventListener(e, hurry));
        window.removeEventListener('scroll', onBottom);
        window.removeEventListener('keydown', onTab);
        if (headerMine && tl.progress() < 1) releaseHeader();
        tl.progress(1);
        finishMain();
        parts.forEach((p) => p.dispose());
        tl.kill();
        bandCrafts.forEach(({ btl, craft, st }) => {
          st.kill();
          btl.progress(1);
          craft.finish();
          craft.dispose();
          btl.kill();
        });
      };
    };

    if (fontsReady()) start();
    else waitFonts().then(start);

    return () => {
      alive = false;
      /* Le contenu rendu visible par stop() ne doit pas clignoter avant le craft suivant */
      if (stop) { holdPage(); stop(); }
      else if (headerMine) releaseHeader();
    };
  }, [pathname, rootRef]);
}
