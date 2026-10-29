import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import './About.css';
const CV_URL = '/CV_Daniel_NAGOLOUM_TALLA.pdf';
import useMediaQuery, { DESKTOP_QUERY } from '../../hooks/useMediaQuery';

/* Three.js + GSAP chargés à part pour alléger le bundle initial */
const SphereStage = lazy(() => import('../particles/SphereStage'));

/* Cartes de chiffres : titre, grand nombre, grosse icône.
   Projets et Expérience comptent jusqu'à leur valeur avec une bordure de chargement ; Alternance scintille. */
const boxes = [
  { title: 'Projets',    icon: 'uil-rocket',        kind: 'count', value: 30, prefix: '+', unit: '' },
  { title: 'Expérience', icon: 'uil-briefcase-alt', kind: 'count', value: 18, prefix: '+', unit: 'mois' },
  { title: 'Alternance', icon: 'uil-sync',          kind: 'live',  text: 'En cours' },
];

const COUNT_MS = 3200;

/* Compte de 0 à la valeur une fois la carte visible (immédiat si « réduire les animations ») */
const useCountUp = (target, start) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setV(target); return undefined; }
    let raf; const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / COUNT_MS);
      setV(Math.round(target * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);
  return v;
};

const StatCard = ({ title, icon, kind, value, prefix = '', unit = '', text, index }) => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const n = useCountUp(value ?? 0, started && kind === 'count');
  const isCount = kind === 'count';

  return (
    <div
      ref={ref}
      /* className statique : l'état « started » passe par un attribut, sinon React effacerait la classe `revealed` posée au scroll */
      className={`about__box ${isCount ? 'about__box--count' : 'about__box--live'} reveal d${index + 2}`}
      data-started={started ? 'true' : undefined}
    >
      {/* Bordure de chargement carrée, tracée pendant le décompte */}
      {isCount && (
        <svg className="about__ring" aria-hidden="true" focusable="false">
          <rect x="1" y="1" pathLength="100" />
        </svg>
      )}
      <i className={`uil ${icon} about__glyph`} aria-hidden="true" />
      <h3 className="about__title">{title}</h3>
      <span className="about__value">
        <span className="about__sr">{isCount ? `${prefix}${value} ${unit}` : text}</span>
        <span aria-hidden="true">
          {isCount ? <>{prefix}{n}{unit && <small className="about__unit">{unit}</small>}</> : text}
        </span>
      </span>
    </div>
  );
};

/* Charge Three.js + GSAP seulement quand la section approche de l'écran (et jamais sur mobile) */
const useNearViewport = (ref, margin = '600px') => {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, near, margin]);
  return near;
};

const About = () => {
  const sphereRef = useRef(null);
  const sphereNear = useNearViewport(sphereRef);
  // Sphère 3D sur grand écran uniquement : en dessous de 993px elle n'est ni affichée
  // ni téléchargée (Three.js + GSAP restent hors du chargement mobile / tablette)
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  return (
    <section className="about section" id="about">
      <span className="section__subtitle">Qui suis-je ?</span>
      <h2 className="section__title reveal d1">À propos de moi</h2>
      <div className="about__container container grid">

        {/* ── 3D Particle Sphere ── */}
        {isDesktop && (
          <div className="about__sphere-wrap reveal-left d2" ref={sphereRef}>
            {sphereNear
              ? (
                <Suspense fallback={<div className="sphere-stage" />}>
                  <SphereStage />
                </Suspense>
              )
              : <div className="sphere-stage" aria-hidden="true" />}
          </div>
        )}

        {/* ── Text data ── */}
        <div className="about__data reveal-right d2">
          <div className="about__info grid">
            {boxes.map((box, i) => <StatCard key={box.title} index={i} {...box} />)}
          </div>

          <p className="about__description">
            Développeur Full-Stack récemment diplômé d'un <strong>Bachelor Développement Logiciel
            (INGETIS Paris)</strong> et intégrant un <strong>Mastère Développement Logiciel</strong>.
            Je conçois des applications web complètes, de l'interface au back-end, en passant par la
            gestion des données. Ayant fait mes preuves lors d'un <strong>stage front-end chez DATALIA</strong> et
            sur des projets SaaS collaboratifs, je recherche une alternance pour la rentrée de
            septembre 2026 afin de poursuivre mon évolution technique.
          </p>

          <a href={CV_URL} download="CV_Daniel_NAGOLOUM_TALLA.pdf" className="button button--flex">
            Télécharger mon CV <i className="uil uil-import button__icon" />
          </a>
        </div>

      </div>

    </section>
  );
};

export default About;
