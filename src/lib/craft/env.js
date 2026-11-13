/* État partagé du crafting : préférence de mouvement, masquage initial, en-tête. */

export const reducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const craftEnabled = () => typeof window !== 'undefined' && !reducedMotion();

const root = () => document.documentElement;

/* `craft-pending` masque le site (sauf la photo du hero) jusqu'à ce que le moteur prenne la main */
export const holdPending = () => root().classList.add('craft-pending');
export const releasePending = () => root().classList.remove('craft-pending', 'craft-hold');
/* Entre deux crafts (page quittée, remontage) : le contenu reste masqué, jamais plus de 1,5 s */
let holdTimer = 0;
export const holdPage = () => {
  root().classList.add('craft-hold');
  clearTimeout(holdTimer);
  holdTimer = setTimeout(() => root().classList.remove('craft-hold'), 1500);
};
/* Départ avec la nav défaite : tout le site reste masqué jusqu'au craft suivant (3 s max) */
export const holdNext = () => {
  root().classList.add('craft-pending');
  clearTimeout(holdTimer);
  holdTimer = setTimeout(() => root().classList.remove('craft-pending', 'craft-hold'), 3000);
};
export const setCraftOn = (on) => root().classList.toggle('craft-on', on);

/* L'en-tête ne se construit qu'au premier chargement complet de la page */
let headerClaimed = false;
export const claimHeader = () => {
  if (headerClaimed) return false;
  headerClaimed = true;
  return true;
};
export const releaseHeader = () => { headerClaimed = false; };

/* Polices : les feuilles Google Fonts et Unicons arrivent en différé (media="print" puis
   "all"). Tant qu'elles ne sont pas appliquées, document.fonts se dit « loaded » alors
   qu'aucune police du site n'est déclarée : toute mesure serait faite avec la police de
   secours, et les cadres du craft ne colleraient plus au texte une fois la police chargée. */
const FONT_SHEETS = 'link[rel="stylesheet"][href*="fonts.googleapis"],link[rel="stylesheet"][href*="unicons"]';
const pendingSheets = () => [...document.querySelectorAll(FONT_SHEETS)].filter((l) => l.media === 'print' || !l.sheet);
export const fontsReady = () =>
  !pendingSheets().length && (!document.fonts || document.fonts.status === 'loaded');

/* Attend feuilles + polices réellement utilisées, sans jamais bloquer plus de `max` ms */
export const waitFonts = (max = 2500) =>
  new Promise((resolve) => {
    let done = false;
    const end = () => { if (!done) { done = true; clearTimeout(t); resolve(); } };
    const t = setTimeout(end, max);
    const sheets = pendingSheets().map((l) => new Promise((ok) => {
      /* L'attribut media passe à "all" dans le onload inline : on attend ce basculement */
      const check = () => { if (l.media !== 'print' && l.sheet) ok(); else requestAnimationFrame(check); };
      l.addEventListener('load', () => requestAnimationFrame(check), { once: true });
      l.addEventListener('error', ok, { once: true });
      check();
    }));
    Promise.all(sheets).then(() => {
      if (!document.fonts) { end(); return; }
      /* Un calcul de style déclenche le chargement des polices utilisées par la page */
      void document.body.offsetHeight;
      requestAnimationFrame(() => document.fonts.ready.then(end));
    });
  });

/* Une police arrivée après coup (cache vidé, réseau lent) : `fn` remesure */
export const onLateFonts = (fn) => {
  if (!document.fonts?.addEventListener) return () => {};
  const h = () => fn();
  document.fonts.addEventListener('loadingdone', h);
  return () => document.fonts.removeEventListener('loadingdone', h);
};
