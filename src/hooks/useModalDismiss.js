import { useEffect } from 'react';

/*
  Comportement commun à toutes les modals du site :
  - fermeture avec Escape (le clic sur l'overlay est géré par chaque composant) ;
  - page de fond verrouillée tant que la modal est ouverte.

  `overflow: hidden` sur <body> seul ne suffit pas : c'est <html> qui défile,
  donc les deux sont verrouillés. La largeur de la barre de défilement est
  compensée par un padding, sinon la page saute d'une dizaine de pixels à
  l'ouverture. Plusieurs modals ouvertes à la suite sont comptées, pour que la
  dernière fermeture seule rende le scroll.
*/

let openCount = 0;
let savedStyles = null;

const lock = () => {
  openCount += 1;
  if (openCount > 1) return;

  const { documentElement: html, body } = document;
  const scrollbar = window.innerWidth - html.clientWidth;
  savedStyles = {
    htmlOverflow: html.style.overflow,
    bodyOverflow: body.style.overflow,
    bodyPaddingRight: body.style.paddingRight,
  };
  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';
  if (scrollbar > 0) {
    const current = parseFloat(getComputedStyle(body).paddingRight) || 0;
    body.style.paddingRight = `${current + scrollbar}px`;
  }
};

const unlock = () => {
  openCount = Math.max(0, openCount - 1);
  if (openCount > 0 || !savedStyles) return;

  const { documentElement: html, body } = document;
  html.style.overflow = savedStyles.htmlOverflow;
  body.style.overflow = savedStyles.bodyOverflow;
  body.style.paddingRight = savedStyles.bodyPaddingRight;
  savedStyles = null;
};

const useModalDismiss = (isOpen, onClose) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    lock();

    return () => {
      document.removeEventListener('keydown', onKey);
      unlock();
    };
  }, [isOpen, onClose]);
};

export default useModalDismiss;
