import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import useModalDismiss from '../../hooks/useModalDismiss';
import './Services.css';

const servicesData = [
  {
    id: 1,
    icon: 'uil-monitor',
    color: '#7B61FF',
    title: 'Développement Web Full Stack',
    desc: 'Applications web complètes, de l\'interface utilisateur à l\'API, déploiement inclus.',
    modalDesc: 'Une trentaine de projets personnels et académiques (marketplaces, SaaS, dashboards) et un stage front-end chez DATALIA. Je prends en charge tout le cycle : interface, API, données et déploiement.',
    items: [
      { icon: 'uil-react',    text: 'Interfaces modernes et réactives avec React, Next.js, TypeScript.' },
      { icon: 'uil-server',   text: 'API REST robustes et documentées (Swagger) avec NestJS, Express, Fastify.' },
      { icon: 'uil-database', text: 'Bases de données SQL et NoSQL : PostgreSQL, MySQL, MongoDB, Redis, avec Prisma et Drizzle.' },
      { icon: 'uil-rocket',   text: 'Déploiement avec Docker, Vercel et Render ; code SOLID, Clean Architecture et revues de code.' },
    ],
  },
  {
    id: 2,
    icon: 'uil-layers-alt',
    color: '#F59E0B',
    title: 'UI/UX Design & Intégration',
    desc: 'Interfaces modernes pixel-perfect, expérience utilisateur optimisée, prototypes interactifs.',
    modalDesc: 'Conception centrée utilisateur avec un fort sens du détail visuel. Je crée des maquettes et les intègre avec précision.',
    items: [
      { icon: 'uil-vector-square', text: 'Maquettes Figma et prototypes interactifs haute fidélité.' },
      { icon: 'uil-paint-tool',    text: 'Intégration responsive HTML5 / CSS3 / TailwindCSS pixel-perfect.' },
      { icon: 'uil-star',          text: 'Micro-animations et transitions fluides (Framer Motion).' },
      { icon: 'uil-search-alt',    text: 'Audit UX et amélioration d\'interfaces existantes.' },
    ],
  },
  {
    id: 3,
    icon: 'uil-chart-line',
    color: '#10B981',
    title: 'Data & IA',
    desc: 'Intégration de modèles d\'IA, scoring algorithmique, dashboards data et automatisation en Python.',
    modalDesc: 'J\'intègre la Data et l\'IA dans des applications concrètes : de l\'appel d\'API de modèles au scoring et à la visualisation.',
    items: [
      { icon: 'uil-robot',     text: 'Intégration d\'API de modèles d\'IA : Claude, Gemini, GPT.' },
      { icon: 'uil-analytics', text: 'Scoring algorithmique et stratégies de trading : Fundatrade (TypeScript), NexaGold (Python).' },
      { icon: 'uil-graph-bar', text: 'Analyse et dashboards de données avec pandas et Streamlit.' },
      { icon: 'uil-cog',       text: 'Scripts d\'automatisation et pipelines de données.' },
    ],
  },
];

/* ── Modal component ── */
const ServiceModal = ({ service, onClose }) => {
  // Escape + page de fond verrouillée
  useModalDismiss(Boolean(service), onClose);

  if (!service) return null;

  return createPortal(
    <div
      className="svc-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="svc-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header band */}
        <div className="svc-modal__header" style={{ '--svc-color': service.color }}>
          <i className={`uil ${service.icon} svc-modal__icon`} />
          <button
            type="button"
            className="svc-modal__close"
            onClick={onClose}
            autoFocus
            aria-label="Fermer"
          >
            <i className="uil uil-times" />
          </button>
        </div>

        {/* Body */}
        <div className="svc-modal__body">
          <h3 className="svc-modal__title">{service.title}</h3>
          <p className="svc-modal__desc">{service.modalDesc}</p>

          <ul className="svc-modal__list">
            {service.items.map((item, i) => (
              <li key={i} className="svc-modal__item">
                <span className="svc-modal__item-icon" style={{ '--svc-color': service.color }}>
                  <i className={`uil ${item.icon}`} />
                </span>
                <span className="svc-modal__item-text">{item.text}</span>
              </li>
            ))}
          </ul>

          <Link to="/#contact" onClick={onClose} className="button button--accent button--flex" style={{ marginTop: '1.5rem' }}>
            Me contacter <i className="uil uil-message button__icon" />
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Services = () => {
  const [activeService, setActiveService] = useState(null);

  return (
    <section className="services section" id="services">
      <span className="section__subtitle">Ce que j'offre</span>
      <h2 className="section__title reveal">Mes Services</h2>

      <div className="services__container container grid">
        {servicesData.map((service, i) => {
          const { id, icon, color, title, desc } = service;
          const open = () => setActiveService(service);
          return (
            <div
              key={id}
              className={`services__card reveal d${i + 1}`}
              role="button"
              tabIndex={0}
              aria-label={`Voir le détail : ${title}`}
              onClick={open}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
              }}
            >
              {/* Top color bar */}
              <div className="services__card-bar" style={{ background: color }} />

              <div className="services__card-body">
                <span className="services__card-icon" style={{ '--svc-color': color }}>
                  <i className={`uil ${icon}`} />
                </span>
                <h3 className="services__card-title">{title}</h3>
                <p className="services__card-desc">{desc}</p>

                <span className="services__card-btn" aria-hidden="true">
                  Voir plus <i className="uil uil-arrow-right" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <ServiceModal
        service={activeService}
        onClose={() => setActiveService(null)}
      />
    </section>
  );
};

export default Services;
