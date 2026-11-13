/* État partagé du crafting : préférence de mouvement, masquage initial, en-tête. */

export const reducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const craftEnabled = () => typeof window !== 'undefined' && !reducedMotion();

const root = () => document.documentElement;

/* `craft-pending` masque le site (sauf la photo du hero) jusqu'à ce que le moteur prenne la main */
export const holdPending = () => root().classList.add('craft-pending');
export const releasePending = () => root().classList.remove('craft-pending');
export const setCraftOn = (on) => root().classList.toggle('craft-on', on);

/* L'en-tête ne se construit qu'au premier chargement complet de la page */
let headerClaimed = false;
export const claimHeader = () => {
  if (headerClaimed) return false;
  headerClaimed = true;
  return true;
};
export const releaseHeader = () => { headerClaimed = false; };

/* Attend les polices (mesures exactes), sans jamais bloquer plus de `max` ms */
export const fontsReady = () => !document.fonts || document.fonts.status === 'loaded';
export const waitFonts = (max = 700) =>
  new Promise((resolve) => {
    if (fontsReady()) { resolve(); return; }
    const t = setTimeout(resolve, max);
    document.fonts.ready.then(() => { clearTimeout(t); resolve(); });
  });
