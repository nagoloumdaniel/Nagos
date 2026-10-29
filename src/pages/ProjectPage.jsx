import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { projectsData } from '../components/work/Data';
import { ProjectLogo } from '../components/work/Workitems';
import NotFoundPage from './NotFoundPage';
import { TerminalWindow } from '../components/ide/Ide';
import usePageMeta from '../hooks/usePageMeta';
import '../components/work/Work.css';
import './ProjectPage.css';

const Section = ({ index, icon, title, children }) => (
  <section className="pj-section">
    <h2 className="pj-section__title">
      <span className="pj-section__no">{String(index).padStart(2, '0')}</span>
      <i className={`uil ${icon}`} aria-hidden="true" />
      {title}
    </h2>
    {children}
  </section>
);

const ProjectDetail = ({ project, prev, next }) => {
  usePageMeta({
    title: `${project.title} - Projet | Daniel NAGOLOUM TALLA`,
    description: `${project.title} : ${project.summary}`,
    path: `/portfolio/${project.id}`,
  });

  const demo = project.links.filter(l => l.kind === 'demo');
  const repos = project.links.filter(l => l.kind === 'github');
  let n = 0;

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
            </div>
            <h1 className="pj-head__title">{project.title}</h1>
            <p className="pj-head__summary">{project.summary}</p>
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

        <ul className="pj-figures">
          {project.figures.map(f => (
            <li key={f.label} className="pj-figure glass">
              <span className="pj-figure__value">{f.value}</span>
              <span className="pj-figure__label">{f.label}</span>
            </li>
          ))}
        </ul>

        <Section index={++n} icon="uil-info-circle" title="Contexte">
          <div className="pj-context">
            <p className="pj-text">{project.overview}</p>
            {project.role && (
              <div className="pj-role glass">
                <span className="pj-label"><i className="uil uil-user-check" aria-hidden="true" /> Mon rôle</span>
                <p>{project.role}</p>
              </div>
            )}
          </div>
        </Section>

        <Section index={++n} icon="uil-apps" title="Fonctionnalités">
          <ul className="pj-features">
            {project.features.map(f => (
              <li key={f.title} className="pj-feature glass">
                <i className={`uil ${f.icon} pj-feature__icon`} aria-hidden="true" />
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section index={++n} icon="uil-sitemap" title="Architecture">
          <ul className="pj-arch">
            {project.architecture.map(a => (
              <li key={a.label} className="pj-arch__item glass">
                <i className={`uil ${a.icon}`} aria-hidden="true" />
                <div>
                  <span className="pj-label">{a.label}</span>
                  <p>{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <TerminalWindow
          title={`${project.id} : tree`}
          className="ide-win--flow pj-tree"
          lines={[
            { k: 'cmd', t: `tree ${project.id}/` },
            { k: 'out', parts: [{ t: `${project.id}/`, c: 'dir' }] },
            ...project.architecture.map((a, i, arr) => ({
              k: 'out',
              parts: [
                { t: i === arr.length - 1 ? '└── ' : '├── ', c: 'dim' },
                { t: a.label, c: 'dir' },
                { t: `  ${a.text}`, c: 'dim' },
              ],
            })),
            { k: 'ok', t: `${project.architecture.length} briques` },
          ]}
        />

        <Section index={++n} icon="uil-bolt-alt" title="Défis techniques">
          <ol className="pj-challenges">
            {project.challenges.map((c, i) => (
              <li key={c.title} className="pj-challenge glass">
                <span className="pj-challenge__no">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section index={++n} icon="uil-layers-alt" title="Stack technique">
          <div className="pj-stack">
            {project.stack.map(g => (
              <div key={g.label} className="pj-stack__group glass">
                <span className="pj-label">{g.label}</span>
                <div className="pj-chips">
                  {g.items.map(t => <span key={t} className="pj-chip">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

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
