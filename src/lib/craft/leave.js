import gsap from 'gsap';
import { buildCraft, collectTargets, planCraft } from './build';

const LEAVE = 1.5; // durée du « dé-craft » en secondes

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

  const go = () => {
    if (gone) return;
    gone = true;
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
    if (!roots.length) return false;
    /* Toutes les mesures d'abord, puis la construction */
    const plans = roots.map((root) => {
      const items = collectTargets(root, { max: 80 })
        .map((t) => ({ ...t, b: t.el.getBoundingClientRect() }))
        .filter((t) => t.b.bottom > 0 && t.b.top < vh)
        .slice(0, 28)
        .map(({ b, ...t }) => ({ ...t, at: Math.max(0, b.top) / vh * 0.9 }));
      return items.length ? planCraft(root, items) : null;
    }).filter(Boolean);
    if (!plans.length) return false;
    tl = gsap.timeline({ paused: true });
    const parts = plans.map((plan) => buildCraft(tl, { plan, k: 1, lanes: 4, frame: false }));
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

  const onClick = (e) => {
    if (gone || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target instanceof Element ? e.target.closest('a[href]') : null;
    if (!a || a.hasAttribute('download') || (a.target && a.target !== '_self')) return;
    const url = new URL(a.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
    e.preventDefault();
    dest = url.pathname + url.search + url.hash;
    clicks += 1;
    if (tl) {
      if (clicks >= 3) go();
      else tl.timeScale(tl.timeScale() * 3);
      return;
    }
    if (!run()) go();
  };

  document.addEventListener('click', onClick, true);
  /* Le démontage de la page (après navigation) nettoie le calque et rend au DOM son CSS */
  return () => {
    document.removeEventListener('click', onClick, true);
    if (tl) {
      tl.kill();
      craft.finish();
      craft.dispose();
    }
  };
}
