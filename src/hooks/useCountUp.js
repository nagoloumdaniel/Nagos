import { useEffect, useRef, useState } from 'react';

/* Compte jusqu'à `target` quand l'élément devient visible. Respecte prefers-reduced-motion. */
const useCountUp = (target, duration = 1200) => {
  const ref = useRef(null);
  const from = useRef(0);
  const [value, setValue] = useState(0);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      from.current = target;
      setValue(target);
      return undefined;
    }
    const origin = from.current;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(origin + (target - origin) * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, seen, duration]);

  return [value, ref];
};
export default useCountUp;
