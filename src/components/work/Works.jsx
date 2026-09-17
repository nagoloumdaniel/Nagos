import React, { useEffect, useMemo, useRef, useState } from 'react';
import { projectsData, projectsNav } from './Data';
import Workitems from './Workitems';

/* Pagination réservée aux écrans laptop et plus (grille à 2 ou 3 colonnes) */
const DESKTOP_QUERY = '(min-width: 993px)';
const PER_PAGE = 6;

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
};

const Works = () => {
  const [active, setActive] = useState('Tous');
  const [page, setPage] = useState(1);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const topRef = useRef(null);

  const projects = useMemo(
    () => (active === 'Tous' ? projectsData : projectsData.filter(p => p.category === active)),
    [active]
  );

  const pageCount = isDesktop ? Math.max(1, Math.ceil(projects.length / PER_PAGE)) : 1;
  const currentPage = Math.min(page, pageCount);
  const visible = isDesktop
    ? projects.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
    : projects;

  const selectFilter = (name) => {
    setActive(name);
    setPage(1);
  };

  const goTo = (next) => {
    if (next < 1 || next > pageCount || next === currentPage) return;
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={topRef} className="work__wrapper">
      <div className="work__filters" role="group" aria-label="Filtrer les projets">
        {projectsNav.map(({ name }) => (
          <button
            key={name}
            type="button"
            aria-pressed={active === name}
            onClick={() => selectFilter(name)}
            className={`${active === name ? 'active-work' : ''} work__item`}
          >{name}</button>
        ))}
      </div>

      <div className="work__container container grid">
        {visible.map(project => <Workitems item={project} key={project.id} />)}
      </div>

      {pageCount > 1 && (
        <nav className="work__pagination" aria-label="Pagination des projets">
          <button
            type="button"
            className="work__page work__page--arrow"
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Page précédente"
          >
            <i className="uil uil-angle-left" aria-hidden="true" />
          </button>

          {Array.from({ length: pageCount }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              type="button"
              className={`work__page${n === currentPage ? ' work__page--active' : ''}`}
              onClick={() => goTo(n)}
              aria-label={`Page ${n}`}
              aria-current={n === currentPage ? 'page' : undefined}
            >
              {n}
            </button>
          ))}

          <button
            type="button"
            className="work__page work__page--arrow"
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === pageCount}
            aria-label="Page suivante"
          >
            <i className="uil uil-angle-right" aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  );
};
export default Works;
