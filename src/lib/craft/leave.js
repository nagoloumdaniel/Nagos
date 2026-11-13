import gsap from 'gsap';
import { buildCraft, collectTargets, planCraft } from './build';
import { planHeader } from './useHomeCraft';
import { holdNext, releaseHeader } from './env';

const LEAVE = 1.5; // durée du « dé-craft » en secondes

/* Page active : sa fonction de départ. Une navigation faite par le code (menu,
   terminal de la 404) passe par leaveTo() et se défait comme un clic sur un lien. */
let active = null;
export const leaveTo = (dest, navigate) => {
  if (active) active(dest);
  else navigate(dest);
};

/* En quittant la page par un lien interne : ce qui est à l'écran se défait
   (sélections, particules, frappe à l'envers), puis la navigation a lieu.
   Un second clic accélère, un troisième part tout de suite.
   settle() termine d'abord le craft en cours : deux timelines ne pilotent jamais les mêmes éléments. */
export function installLeave(navigate, settle) {
  let tl = null;
  let craft = null;
  let clicks = 0;
  let dest = '';
  let gone = false;
  let navOut = false;

  const go = () => {
    if (gone) return;
    gone = true;
    /* Nav défaite : la page suivante la reconstruit, et tout reste masqué jusque-là */
    if (navOut) { releaseHeader(); holdNext(); }
    navigate(dest);
  };

  const run = () => {
    settle?.();
    const main = document.querySelector('main');
    if (!main) return false;
    const vh = window.innerHeight;
    const roots = [...main.children].filter((el) => {
      const b = el.getBoundingClientRect();
      return b.bottom > 0 && b.top < vh && b.height > 2;
    });
    /* Toutes les mesures d'abord, puis la construction */
    const plans = roots.map((root) => {
      const items = collectTargets(root, { max: 80 })
        .map((t) => ({ ...t, b: t.el.getBoundingClientRect() }))
        .filter((t) => t.b.bottom > 0 && t.b.top < vh)
        .slice(0, 28)
        .map(({ b, ...t }) => ({ ...t, at: Math.max(0, b.top) / vh * 0.9 }));
      return items.length ? planCraft(root, items) : null;
    }).filter(Boolean);
    /* La nav part aussi, en dernier (timeline jouée à l'envers) */
    const navPlan = planHeader(0, 0.05);
    if (!plans.length && !navPlan) return false;
    tl = gsap.timeline({ paused: true });
    const parts = plans.map((plan) => buildCraft(tl, { plan, k: 1, lanes: 4, frame: false }));
    if (navPlan) { parts.push(buildCraft(tl, { plan: navPlan, k: 1, lanes: 2, frame: false })); navOut = true; }
    craft = {
      finish: () => parts.forEach((p) => p.finish()),
      dispose: () => parts.forEach((p) => p.dispose()),
    };
    tl.progress(1, true);
    tl.timeScale(Math.max(1, tl.duration() / LEAVE));
    tl.eventCallback('onReverseComplete', go);
    tl.reverse();
    return true;
  };

  const start = (to) => {
    if (gone) return;
    dest = to;
    clicks += 1;
    if (tl) {
      if (clicks >= 3) go();
      else tl.timeScale(tl.timeScale() * 3);
      return;
    }
    if (!run()) go();
  };

  const onClick = (e) => {
    if (gone || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
    if (!a || a.hasAttribute('download') || (a.target && a.target !== '_self')) return;
    const url = new URL(a.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
    e.preventDefault();
    start(url.pathname + url.search + url.hash);
  };

  document.addEventListener('click', onClick, true);
  active = start;
  /* Le démontage de la page (après navigation) nettoie le calque et rend au DOM son CSS */
  return () => {
    document.removeEventListener('click', onClick, true);
    if (active === start) active = null;
    if (tl) {
      tl.kill();
      craft.finish();
      craft.dispose();
    }
  };
}
