import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './Gallery.css';

const GAP = 8;
const DEFAULT_RATIO = 1.6;
const clampRatio = r => Math.min(2.4, Math.max(0.65, r));

const useMediaQuery = (query) => {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
};

/* Largeur du conteneur, suivie en continu */
const useWidth = (ref) => {
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return w;
};

/* Ratio réel de chaque image (inconnu au premier rendu : ratio par défaut, puis mise à jour) */
const useRatios = (items) => {
  const [ratios, setRatios] = useState({});
  useEffect(() => {
    let alive = true;
    items.forEach(it => {
      const img = new Image();
      img.onload = () => {
        if (alive && img.naturalWidth) {
          setRatios(r => (r[it.src] ? r : { ...r, [it.src]: img.naturalWidth / img.naturalHeight }));
        }
      };
      img.src = it.src;
    });
    return () => { alive = false; };
  }, [items]);
  return ratios;
};

/* Rangées justifiées (comme Google Photos) : chaque rangée remplit la largeur, la hauteur suit les
   proportions des images, quel que soit leur nombre ou leur taille. Dernière rangée incomplète : hauteur cible. */
const justify = (ratios, width, target) => {
  const rows = [];
  let cur = [];
  let sum = 0;
  const finish = (last) => {
    const gaps = GAP * (cur.length - 1);
    const natural = (width - gaps) / sum;
    const alone = last && rows.length === 0;
    const h = !last || alone || sum * target + gaps >= width * 0.7 ? Math.min(natural, target * 1.5) : target;
    rows.push(cur.map(c => ({ ...c, w: Math.floor(c.r * h), h: Math.round(h) })));
    cur = [];
    sum = 0;
  };
  ratios.forEach((r, i) => {
    cur.push({ i, r });
    sum += r;
    if (sum * target + GAP * (cur.length - 1) >= width) finish(false);
  });
  if (cur.length) finish(true);
  return rows;
};

/* Petit écran : un seul cadre qui regroupe les photos (4 vignettes max, « +N » sur la dernière) */
const MobileCollage = ({ items, onOpen }) => {
  const shown = items.slice(0, 4);
  const extra = items.length - shown.length;
  return (
    <div className={`gal-mob gal-mob--${shown.length}`} role="list">
      {shown.map((it, i) => {
        const more = extra > 0 && i === shown.length - 1;
        return (
          <div key={it.src} role="listitem" className="gal-mob__cell">
            <button
              type="button"
              className="gal-mob__btn"
              onClick={() => onOpen(i)}
              aria-label={more ? `Voir les ${items.length} photos` : `Agrandir : ${it.caption || it.alt}`}
              aria-haspopup="dialog"
            >
              <img src={it.src} alt={it.alt} loading="lazy" decoding="async" />
              {more && (
                <span className="gal-mob__more" aria-hidden="true">
                  <i className="uil uil-plus" />{extra}
                </span>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

/* Galerie + visionneuse. <dialog> natif : piège à focus, Échap et retour du focus gérés par le navigateur. */
const Gallery = ({ items, title }) => {
  const [open, setOpen] = useState(null);
  const dialogRef = useRef(null);
  const wrapRef = useRef(null);
  const touchX = useRef(null);
  const count = items.length;
  const compact = useMediaQuery('(max-width: 639px)');
  const width = useWidth(wrapRef);
  const ratios = useRatios(items);
  const target = width >= 900 ? 240 : 190;
  const rows = useMemo(
    () => (width ? justify(items.map(it => clampRatio(ratios[it.src] || DEFAULT_RATIO)), width, target) : []),
    [items, ratios, width, target],
  );

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
  const onTouchStart = e => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = e => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  const current = open !== null ? items[open] : null;

  return (
    <>
      <div ref={wrapRef} className="gal-wrap">
        {compact ? (
          <MobileCollage items={items} onOpen={setOpen} />
        ) : (
          <div className="gal" role="list">
            {rows.map((row, ri) => (
              <div key={ri} className="gal__row" role="presentation">
                {row.map(c => {
                  const it = items[c.i];
                  return (
                    <div key={it.src} role="listitem" className="gal__item" style={{ width: c.w, height: c.h }}>
                      <button
                        type="button"
                        className="gal__thumb"
                        onClick={() => setOpen(c.i)}
                        aria-label={`Agrandir : ${it.caption || it.alt}`}
                        aria-haspopup="dialog"
                      >
                        <img src={it.src} alt={it.alt} loading="lazy" decoding="async" />
                        {it.caption && <span className="gal__cap">{it.caption}</span>}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

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
            <div className="gal-box__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              {count > 1 && (
                <button type="button" className="gal-box__btn gal-box__nav" onClick={() => go(-1)} aria-label="Image précédente">
                  <i className="uil uil-angle-left" aria-hidden="true" />
                </button>
              )}
              <img className="gal-box__img" src={current.src} alt={current.alt} decoding="async" />
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
