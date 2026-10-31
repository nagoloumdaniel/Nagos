import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Gallery.css';

/* Galerie + visionneuse. <dialog> natif : piège à focus, Échap et retour du focus gérés par le navigateur. */
const Gallery = ({ items, title }) => {
  const [open, setOpen] = useState(null);
  const dialogRef = useRef(null);
  const count = items.length;

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(d => setOpen(i => (i === null ? i : (i + d + count) % count)), [count]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return undefined;
    if (open !== null && !dlg.open) {
      dlg.showModal();
      document.documentElement.classList.add('gal-lock');
    }
    if (open === null && dlg.open) dlg.close();
    if (open === null) document.documentElement.classList.remove('gal-lock');
    return undefined;
  }, [open]);

  useEffect(() => () => document.documentElement.classList.remove('gal-lock'), []);

  const onKey = e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };

  const current = open !== null ? items[open] : null;

  return (
    <>
      <ul className="gal">
        {items.map((it, i) => (
          <li key={it.src} className="gal__item">
            <button
              type="button"
              className="gal__thumb"
              onClick={() => setOpen(i)}
              aria-label={`Agrandir : ${it.caption || it.alt}`}
              aria-haspopup="dialog"
            >
              <img src={it.src} alt={it.alt} width="1600" height="1000" loading="lazy" decoding="async" />
              <span className="gal__zoom" aria-hidden="true"><i className="uil uil-search-plus" /></span>
            </button>
            {it.caption && <p className="gal__cap">{it.caption}</p>}
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="gal-box"
        aria-label={`Galerie : ${title}`}
        onClose={close}
        onKeyDown={onKey}
        onClick={e => { if (e.target === dialogRef.current) close(); }}
      >
        {current && (
          <div className="gal-box__inner">
            <div className="gal-box__bar">
              <span className="gal-box__count" aria-live="polite">{open + 1} / {count}</span>
              <button type="button" className="gal-box__btn" onClick={close} aria-label="Fermer la galerie" autoFocus>
                <i className="uil uil-times" aria-hidden="true" />
              </button>
            </div>
            <div className="gal-box__stage">
              {count > 1 && (
                <button type="button" className="gal-box__btn gal-box__nav" onClick={() => go(-1)} aria-label="Image précédente">
                  <i className="uil uil-angle-left" aria-hidden="true" />
                </button>
              )}
              <img className="gal-box__img" src={current.src} alt={current.alt} />
              {count > 1 && (
                <button type="button" className="gal-box__btn gal-box__nav" onClick={() => go(1)} aria-label="Image suivante">
                  <i className="uil uil-angle-right" aria-hidden="true" />
                </button>
              )}
            </div>
            {current.caption && <p className="gal-box__cap">{current.caption}</p>}
          </div>
        )}
      </dialog>
    </>
  );
};

export default Gallery;
