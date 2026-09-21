import { useEffect, useState } from 'react';

/* Grand écran : à partir de 993px (mise en page à plusieurs colonnes) */
export const DESKTOP_QUERY = '(min-width: 993px)';

/* Suit une media query et se met à jour quand la fenêtre change de taille */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;
