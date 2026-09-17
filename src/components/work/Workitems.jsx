import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

/* Libellé court d'un lien dans la carte : « GitHub Frontend » → « Frontend » */
const shortLabel = (link) => {
  if (link.kind === 'demo') return 'Démo';
  const rest = link.label.replace(/^GitHub\s*/, '');
  return rest || 'Code';
};

/* ─── COMPOSANT : ProjectLogo ─────────────────────────────── */
const ProjectLogo = ({ item, variant }) => {
  const className = [
    'work__logo',
    `work__logo--${variant}`,
    item.logoCover ? 'work__logo--cover' : '',
    !item.logo ? 'work__logo--monogram' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={className} style={item.logoBg ? { background: item.logoBg } : undefined}>
      {item.logo ? (
        <img src={item.logo} alt={`Logo ${item.title}`} loading="lazy" decoding="async" />
      ) : (
        <span aria-hidden="true">{item.initials}</span>
      )}
    </div>
  );
};

/* ─── COMPOSANT : ProjectModal ────────────────────────────── */
const ProjectModal = ({ item, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!item) return;

    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      // Garde le focus clavier à l'intérieur de la modal
      const focusables = dialogRef.current.querySelectorAll('a[href], button:not([disabled])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const titleId = `project-title-${item.id}`;
  const demo = item.links.filter(l => l.kind === 'demo');
  const repos = item.links.filter(l => l.kind === 'github');

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        className="modal-content modal-detail project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fermer" autoFocus>
          <i className="uil uil-times" />
        </button>

        <header className="project-modal__head">
          <ProjectLogo item={item} variant="modal" />
          <div className="project-modal__heading">
            <div className="work__meta">
              <span className="work__category-tag">{item.category}</span>
              {item.status && <span className="work__status-tag">{item.status}</span>}
            </div>
            <h3 id={titleId} className="modal-info__title">{item.title}</h3>
          </div>
        </header>

        <div className="modal-info">
          <p className="modal-info__desc">{item.description}</p>

          {item.features?.length > 0 && (
            <section className="project-modal__section">
              <h4 className="project-modal__label">Fonctionnalités</h4>
              <ul className="project-modal__features">
                {item.features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </section>
          )}

          <section className="project-modal__section">
            <h4 className="project-modal__label">Technologies</h4>
            <div className="work__tech">
              {item.tech.map(t => <span key={t} className="work__tech-tag">{t}</span>)}
            </div>
          </section>

          {item.private && (
            <p className="project-modal__note">
              <i className="uil uil-lock" aria-hidden="true" /> Dépôt privé : le code source n'est pas public.
            </p>
          )}

          <div className="modal-info__actions">
            {demo.map(l => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="button button--accent button--flex">
                <i className="uil uil-external-link-alt" /> {l.label}
              </a>
            ))}
            {repos.map(l => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="button button--ghost button--flex">
                <i className="uil uil-github-alt" /> {l.label}
              </a>
            ))}
            {item.links.length === 0 && (
              <Link to="/#contact" onClick={onClose} className="button button--ghost button--flex">
                <i className="uil uil-message" /> En parler avec moi
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ─── COMPOSANT PRINCIPAL : Workitems ─────────────────────── */
const Workitems = ({ item }) => {
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef(null);
  // À la fermeture, le focus clavier revient sur la carte d'origine
  const close = useCallback(() => {
    setOpen(false);
    openButtonRef.current?.focus();
  }, []);

  return (
    <>
      <article className="work__card reveal-scale">
        <div className="work__head">
          <ProjectLogo item={item} variant="card" />
          <div className="work__head-text">
            {/* Le bouton s'étend sur toute la carte : un clic n'importe où ouvre les détails */}
            <h3 className="work__title">
              <button
                ref={openButtonRef}
                type="button"
                className="work__open"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
              >
                {item.title}
              </button>
            </h3>
            <div className="work__meta">
              <span className="work__category-tag">{item.category}</span>
              {item.status && <span className="work__status-tag">{item.status}</span>}
            </div>
          </div>
        </div>

        <p className="work__desc">{item.summary}</p>

        <div className="work__tech">
          {item.tech.slice(0, 3).map(t => (
            <span key={t} className="work__tech-tag">{t}</span>
          ))}
          {item.tech.length > 3 && (
            <span className="work__tech-tag work__tech-tag--more">+{item.tech.length - 3}</span>
          )}
        </div>

        <div className="work__footer">
          <div className="work__links">
            {item.links.map(l => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="work__link"
                aria-label={`${l.label} : ${item.title}`}
              >
                <i className={`uil ${l.kind === 'demo' ? 'uil-external-link-alt' : 'uil-github-alt'}`} aria-hidden="true" />
                {shortLabel(l)}
              </a>
            ))}
            {item.private && (
              <span className="work__private">
                <i className="uil uil-lock" aria-hidden="true" /> Dépôt privé
              </span>
            )}
          </div>
          {/* Visuel seulement : toute la carte ouvre déjà les détails */}
          <span className="work__plus" aria-hidden="true">
            <i className="uil uil-plus" />
          </span>
        </div>
      </article>

      <ProjectModal item={open ? item : null} onClose={close} />
    </>
  );
};

export default Workitems;
