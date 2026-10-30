import { useCallback, useEffect, useRef, useState } from 'react';

/* Charge `load(force)` au montage, puis toutes les `every` ms et au retour sur l'onglet.
   Renvoie { data, status: 'loading' | 'ready' | 'error' }. Garde les données précédentes pendant un rafraîchissement. */
const useAsyncData = (load, every = 5 * 60 * 1000) => {
  const [state, setState] = useState({ data: null, status: 'loading' });
  const loadRef = useRef(load);
  loadRef.current = load;

  const run = useCallback((force) => {
    let alive = true;
    loadRef.current(force)
      .then(data => { if (alive) setState({ data, status: 'ready' }); })
      .catch(() => { if (alive) setState(s => (s.data ? s : { data: null, status: 'error' })); });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const cancel = run(false);
    const timer = setInterval(() => run(true), every);
    const onVisible = () => { if (document.visibilityState === 'visible') run(false); };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancel();
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [run, every]);

  return state;
};
export default useAsyncData;
