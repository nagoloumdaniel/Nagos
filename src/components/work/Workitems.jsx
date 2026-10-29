import React from 'react';
import { Link } from 'react-router-dom';

/* Libellé court d'un lien dans la carte : « GitHub Frontend » → « Frontend » */
const shortLabel = (link) => {
  if (link.kind === 'demo') return 'Démo';
  const rest = link.label.replace(/^GitHub\s*/, '');
  return rest || 'Code';
};

/* Logo du projet (pastille claire : les logos sont pensés pour un fond clair) */
export const ProjectLogo = ({ item, variant }) => (
  <div className={`work__logo work__logo--${variant}`}>
    <img src={item.logo} alt={`Logo ${item.title}`} loading="lazy" decoding="async" />
  </div>
);

/* Carte projet : toute la carte mène à la page détail */
const Workitems = ({ item }) => {
  const techShown = item.stack.flatMap(g => g.items);
  return (
    <article className="work__card reveal-scale">
      <header className="work__bar">
        <span className="work__category-tag"><i className="uil uil-brackets-curly" aria-hidden="true" /> {item.category}</span>
        {item.status && <span className="work__status-tag">{item.status}</span>}
      </header>

      <div className="work__body">
        <div className="work__text">
          <h3 className="work__title">
            {/* Le lien s'étend sur toute la carte */}
            <Link to={`/portfolio/${item.id}`} className="work__open" aria-label={`${item.title} : voir le détail du projet`}>
              {item.title}
            </Link>
          </h3>
          <p className="work__desc">{item.summary}</p>
        </div>
        <ProjectLogo item={item} variant="card" />
      </div>

      <div className="work__tech">
        {techShown.slice(0, 3).map(t => (
          <span key={t} className="work__tech-tag">{t}</span>
        ))}
        {techShown.length > 3 && (
          <span className="work__tech-tag work__tech-tag--more">+{techShown.length - 3}</span>
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
        <span className="work__plus" aria-hidden="true">
          <i className="uil uil-arrow-up-right" />
        </span>
      </div>
    </article>
  );
};

export default Workitems;
