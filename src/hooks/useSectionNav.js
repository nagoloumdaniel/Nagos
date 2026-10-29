import { useEffect, useState } from 'react';

/* Suit la section visible parmi `ids` et renvoie l'identifiant actif.
   On garde la section la plus haute qui croise la zone de lecture, sous l'en-tête. */
const useSectionNav = (ids) => {
  const [active, setActive] = useState(ids[0] ?? null);

  useEffect(() => {
    if (ids.length === 0) return undefined;
    const nodes = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (nodes.length === 0) return undefined;

    const visible = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => visible.set(e.target.id, e.isIntersecting ? e.boundingClientRect.top : null));
      const current = ids
        .filter(id => visible.get(id) !== null && visible.get(id) !== undefined)
        .sort((a, b) => visible.get(a) - visible.get(b))[0];
      if (current) setActive(current);
    }, { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.2, 1] });

    nodes.forEach(n => observer.observe(n));
    return () => observer.disconnect();
  }, [ids.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
};

export default useSectionNav;
