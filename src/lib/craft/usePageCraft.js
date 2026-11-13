import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { buildCraft, collectTargets, isVisible } from './build';
import { headerItems } from './useHomeCraft';
import { craftEnabled, releasePending, setCraftOn, claimHeader, releaseHeader, waitFonts, fontsReady } from './env';

/* Pages Portfolio, Blog et leurs sous-pages : une construction automatique, jouée une fois
   au chargement. Seul ce qui est à l'écran (ou juste dessous) est animé. */
export default function usePageCraft(rootRef) {
  const { pathname } = useLocation();

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

      const limit = window.innerHeight * 1.25;
      const items = headerMine ? headerItems(0.1, 0.07) : [];
      const offset = items.length ? 0.55 : 0.1;
      const near = collectTargets(root, { max: 40 })
        .map((t) => ({ ...t, top: t.el.getBoundingClientRect().top }))
        .filter((t) => t.top < limit)
        .sort((a, b) => a.top - b.top);
      near.forEach((t, i) => items.push({ el: t.el, effect: t.effect, at: offset + i * 0.08 }));
      const footer = document.querySelector('.footer');
      if (footer && footer.getBoundingClientRect().top < limit) {
        collectTargets(footer, { max: 6 }).forEach((t, i) => {
          if (isVisible(t.el)) items.push({ ...t, at: offset + near.length * 0.08 + i * 0.08 });
        });
      }
      if (!items.length) { if (headerMine) releaseHeader(); return; }

      const tl = gsap.timeline({ paused: true });
      const craft = buildCraft(tl, { root, items, k: 1, lanes: Math.min(12, Math.max(5, Math.ceil(items.length / 4))), frame: pathname.split('/')[1] || 'page' });
      tl.eventCallback('onComplete', () => { craft.finish(); craft.dispose(); });
      /* Durée totale bornée : beaucoup d'éléments = curseurs plus rapides, pas d'attente */
      tl.timeScale(Math.max(1, tl.duration() / 2.8));
      tl.play();

      /* Toute action de l'utilisateur accélère la fin : on ne bloque jamais la lecture */
      const hurry = () => { if (tl.progress() < 1) tl.timeScale(Math.max(tl.timeScale(), tl.duration() / 0.8)); };
      const evs = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
      evs.forEach((e) => window.addEventListener(e, hurry, { passive: true }));

      stop = () => {
        evs.forEach((e) => window.removeEventListener(e, hurry));
        if (headerMine && tl.progress() < 1) releaseHeader();
        tl.progress(1);
        craft.finish();
        craft.dispose();
        tl.kill();
      };
    };

    if (fontsReady()) start();
    else waitFonts().then(start);

    return () => {
      alive = false;
      if (stop) stop();
      else if (headerMine) releaseHeader();
    };
  }, [pathname, rootRef]);
}
