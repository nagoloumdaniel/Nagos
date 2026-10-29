import { useEffect } from 'react';

const SELECTOR = '.reveal:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed), .reveal-scale:not(.revealed)';

/* Révèle les éléments .reveal* quand ils entrent à l'écran.
   Les nouveaux nœuds du DOM sont traités par lots (une fois par frame), en ne regardant
   que les nœuds ajoutés : le terminal qui « tape » ou les routes ne relancent plus un balayage complet. */
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const watch = (root) => {
      if (root.nodeType !== 1) return;
      if (root.matches(SELECTOR)) observer.observe(root);
      root.querySelectorAll(SELECTOR).forEach(el => observer.observe(el));
    };
    watch(document.body);

    let queue = [];
    let scheduled = false;
    const flush = () => {
      scheduled = false;
      const nodes = queue; queue = [];
      nodes.forEach(n => { if (n.isConnected) watch(n); });
    };
    const mutation = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach(n => { if (n.nodeType === 1 && !n.closest?.('.ide-win')) queue.push(n); });
      if (queue.length && !scheduled) { scheduled = true; requestAnimationFrame(flush); }
    });
    mutation.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutation.disconnect(); };
  }, []);
};
export default useScrollReveal;
