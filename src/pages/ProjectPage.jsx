import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projectsData } from '../components/work/Data';
import { ProjectLogo } from '../components/work/Workitems';
import NotFoundPage from './NotFoundPage';
import { TerminalWindow } from '../components/ide/Ide';
import RepoActivity from '../components/github/RepoActivity';
import usePageMeta from '../hooks/usePageMeta';
import useSectionNav from '../hooks/useSectionNav';
import '../components/work/Work.css';
import './ProjectPage.css';

/* Une carte « premium » : verre dépoli, repères d'angle, libellé mono. */
const Card = ({ className = '', children, ...rest }) => (
  <div className={`pj-card ${className}`} {...rest}>
    <span className="pj-card__tick" aria-hidden="true" />
    {children}
  </div>
);

const Prose = ({ text }) => (
  <>{String(text).split('\n\n').map((p, i) => <p key={i} className="pj-text">{p}</p>)}</>
);

/*
  Registre des sections. `has` décide si la section s'affiche pour ce projet :
  la barre latérale et le contenu sont construits depuis la même liste, donc ils
  ne peuvent pas se désynchroniser.
*/
const SECTIONS = [
  {
    id: 'apercu',
    icon: 'uil-apps',
    title: 'Aperçu',
    has: p => p.figures?.length || p.meta,
    render: p => (
      <>
        {p.figures?.length > 0 && (
          <ul className="pj-figures">
            {p.figures.map(f => (
              <li key={f.label} className="pj-figure">
                <span className="pj-figure__value">{f.value}</span>
                <span className="pj-figure__label">{f.label}</span>
              </li>
            ))}
          </ul>
        )}
        {p.meta && (
          <dl className="pj-meta">
            {[
              ['uil-map-marker', 'Pays / marché', p.meta.country],
              ['uil-globe', 'Langues', p.meta.languages?.join(', ')],
              ['uil-calendar-alt', 'Période', p.meta.period],
              ['uil-users-alt', 'Équipe', p.meta.team],
              ['uil-processor', 'Déploiement', p.meta.hosting],
            ].filter(([, , value]) => value).map(([icon, label, value]) => (
              <div key={label} className="pj-meta__row">
                <dt className="pj-label"><i className={`uil ${icon}`} aria-hidden="true" /> {label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </>
    ),
  },
  {
    id: 'github',
    icon: 'uil-github-alt',
    title: 'Activité GitHub',
    has: p => p.repos?.length || p.private,
    render: p => (p.repos?.length
      ? <Card className="pj-card--flush"><RepoActivity repos={p.repos} /></Card>
      : <p className="gh-note">Dépôt privé : commits, branches et contributeurs ne sont pas publics.</p>),
  },
  {
    id: 'situation',
    icon: 'uil-compass',
    title: 'Situation, problème, solution',
    has: p => p.situation,
    render: p => (
      <div className="pj-sps">
        {[
          ['uil-map-marker-question', 'Mise en situation', p.situation.context],
          ['uil-exclamation-triangle', 'Problème', p.situation.problem],
          ['uil-check-circle', 'Solution', p.situation.solution],
        ].filter(([, , text]) => text).map(([icon, label, text], i) => (
          <Card key={label} className={`pj-sps__item pj-sps__item--${i}`}>
            <span className="pj-label"><i className={`uil ${icon}`} aria-hidden="true" /> {label}</span>
            <Prose text={text} />
          </Card>
        ))}
      </div>
    ),
  },
  {
    id: 'fonctionnement',
    icon: 'uil-process',
    title: 'Fonctionnement',
    has: p => p.howItWorks?.length,
    render: p => (
      <ol className="pj-steps">
        {p.howItWorks.map((s, i) => (
          <li key={s.title}>
            <Card className="pj-step">
              <span className="pj-step__no">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: 'fonctionnalites',
    icon: 'uil-layer-group',
    title: 'Fonctionnalités',
    has: p => p.features?.length,
    render: p => (
      <ul className="pj-features">
        {p.features.map(f => (
          <li key={f.title}>
            <Card className="pj-feature">
              <i className={`uil ${f.icon} pj-feature__icon`} aria-hidden="true" />
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Card>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'architecture',
    icon: 'uil-sitemap',
    title: 'Architecture',
    has: p => p.architecture?.length,
    render: p => (
      <>
        <ul className="pj-arch">
          {p.architecture.map(a => (
            <li key={a.label}>
              <Card className="pj-arch__item">
                <i className={`uil ${a.icon}`} aria-hidden="true" />
                <div>
                  <span className="pj-label">{a.label}</span>
                  <p>{a.text}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
        <TerminalWindow
          title={`${p.id} : tree`}
          className="ide-win--flow pj-tree"
          lines={[
            { k: 'cmd', t: `tree ${p.id}/` },
            { k: 'out', parts: [{ t: `${p.id}/`, c: 'dir' }] },
            ...p.architecture.map((a, i, arr) => ({
              k: 'out',
              parts: [
                { t: i === arr.length - 1 ? '└── ' : '├── ', c: 'dim' },
                { t: a.label, c: 'dir' },
                { t: `  ${a.text}`, c: 'dim' },
              ],
            })),
            { k: 'ok', t: `${p.architecture.length} briques` },
          ]}
        />
      </>
    ),
  },
  {
    id: 'modelisation',
    icon: 'uil-database',
    title: 'Modélisation des données',
    has: p => p.modeling?.entities?.length,
    render: p => (
      <>
        {p.modeling.intro && <Prose text={p.modeling.intro} />}
        <ul className="pj-models">
          {p.modeling.entities.map(e => (
            <li key={e.name}>
              <Card className="pj-model">
                <code className="pj-model__name">{e.name}</code>
                <p>{e.text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: 'stack',
    icon: 'uil-layers-alt',
    title: 'Stack technique',
    has: p => p.stack?.length,
    render: p => (
      <div className="pj-stack">
        {p.stack.map(g => (
          <Card key={g.label} className="pj-stack__group">
            <span className="pj-label">{g.label}</span>
            <div className="pj-chips">
              {g.items.map(t => <span key={t} className="pj-chip">{t}</span>)}
            </div>
          </Card>
        ))}
      </div>
    ),
  },
  {
    id: 'defis',
    icon: 'uil-bolt-alt',
    title: 'Difficultés rencontrées',
    has: p => p.challenges?.length,
    render: p => (
      <ol className="pj-challenges">
        {p.challenges.map((c, i) => (
          <li key={c.title}>
            <Card className="pj-challenge">
              <span className="pj-challenge__no">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{c.title}</h3>
                <Prose text={c.text} />
              </div>
            </Card>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: 'interface',
    icon: 'uil-palette',
    title: "Défis d'interface",
    has: p => p.uiChallenges?.length,
    render: p => (
      <ul className="pj-features pj-features--ui">
        {p.uiChallenges.map(c => (
          <li key={c.title}>
            <Card className="pj-feature">
              <i className={`uil ${c.icon || 'uil-brush-alt'} pj-feature__icon`} aria-hidden="true" />
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Card>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'liens',
    icon: 'uil-link-h',
    title: 'Liens',
    has: p => p.links?.length,
    render: p => (
      <ul className="pj-links">
        {p.links.map(l => (
          <li key={l.url}>
            <a href={l.url} target="_blank" rel="noreferrer" className="pj-link">
              <i className={`uil ${l.kind === 'demo' ? 'uil-external-link-alt' : 'uil-github-alt'}`} aria-hidden="true" />
              <span>
                <strong>{l.label}</strong>
                <em>{l.url.replace(/^https?:\/\//, '')}</em>
              </span>
              <i className="uil uil-arrow-up-right pj-link__go" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    ),
  },
];

const ProjectDetail = ({ project, prev, next }) => {
  usePageMeta({
    title: `${project.title} - Projet | Daniel NAGOLOUM TALLA`,
    description: `${project.title} : ${project.summary}`,
    path: `/portfolio/${project.id}`,
  });

  const sections = useMemo(() => SECTIONS.filter(s => s.has(project)), [project]);
  const ids = useMemo(() => sections.map(s => s.id), [sections]);
  const active = useSectionNav(ids);

  const demo = project.links.filter(l => l.kind === 'demo');
  const repos = project.links.filter(l => l.kind === 'github');

  return (
    <div className="page project">
      <div className="pj container">
        <nav className="pj-crumbs" aria-label="Fil d'Ariane">
          <Link to="/portfolio"><i className="uil uil-arrow-left" aria-hidden="true" /> Portfolio</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>

        <header className="pj-head glass">
          <ProjectLogo item={project} variant="modal" />
          <div className="pj-head__text">
            <div className="pj-head__meta">
              <span className="pj-tag"><i className="uil uil-brackets-curly" aria-hidden="true" /> {project.category}</span>
              <span className="pj-tag">{project.status}</span>
              {project.wip && (
                <span className="pj-tag pj-tag--wip"><i className="pj-dot" aria-hidden="true" /> En cours de développement</span>
              )}
            </div>
            <h1 className="pj-head__title">{project.title}</h1>
            <p className="pj-head__summary">{project.summary}</p>
            {project.overview && <p className="pj-head__overview">{project.overview}</p>}
            <div className="pj-head__actions">
              {demo.map(l => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="button button--flex">
                  <i className="uil uil-external-link-alt" aria-hidden="true" /> {l.label}
                </a>
              ))}
              {repos.map(l => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="button button--ghost button--flex">
                  <i className="uil uil-github-alt" aria-hidden="true" /> {l.label}
                </a>
              ))}
              {project.private && (
                <span className="pj-private"><i className="uil uil-lock" aria-hidden="true" /> Dépôt privé</span>
              )}
              {project.links.length === 0 && (
                <Link to="/#contact" className="button button--ghost button--flex">
                  <i className="uil uil-message" aria-hidden="true" /> En parler avec moi
                </Link>
              )}
            </div>
          </div>
        </header>

        <div className="pj-body">
          <nav className="pj-nav" aria-label="Sections du projet">
            <span className="pj-nav__title">Sur cette page</span>
            <ol className="pj-nav__list">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`pj-nav__link${active === s.id ? ' is-active' : ''}`}
                    aria-current={active === s.id ? 'true' : undefined}
                  >
                    <span className="pj-nav__no">{String(i + 1).padStart(2, '0')}</span>
                    <i className={`uil ${s.icon}`} aria-hidden="true" />
                    <span className="pj-nav__text">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
            {project.role && (
              <div className="pj-nav__role">
                <span className="pj-label"><i className="uil uil-user-check" aria-hidden="true" /> Mon rôle</span>
                <p>{project.role}</p>
              </div>
            )}
          </nav>

          <main className="pj-main">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="pj-section">
                <h2 className="pj-section__title">
                  <span className="pj-section__no">{String(i + 1).padStart(2, '0')}</span>
                  <i className={`uil ${s.icon}`} aria-hidden="true" />
                  {s.title}
                </h2>
                {s.render(project)}
              </section>
            ))}
          </main>
        </div>

        <nav className="pj-pager" aria-label="Autres projets">
          <Link to={`/portfolio/${prev.id}`} className="pj-pager__link glass">
            <span className="pj-label"><i className="uil uil-arrow-left" aria-hidden="true" /> Précédent</span>
            <strong>{prev.title}</strong>
          </Link>
          <Link to={`/portfolio/${next.id}`} className="pj-pager__link pj-pager__link--next glass">
            <span className="pj-label">Suivant <i className="uil uil-arrow-right" aria-hidden="true" /></span>
            <strong>{next.title}</strong>
          </Link>
        </nav>
      </div>
    </div>
  );
};

const ProjectPage = () => {
  const { id } = useParams();
  const i = projectsData.findIndex(p => p.id === id);
  if (i === -1) return <NotFoundPage />;
  const prev = projectsData[(i - 1 + projectsData.length) % projectsData.length];
  const next = projectsData[(i + 1) % projectsData.length];
  return <ProjectDetail key={id} project={projectsData[i]} prev={prev} next={next} />;
};

export default ProjectPage;
