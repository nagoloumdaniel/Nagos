import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import landing from '../../assets/landing.webp';
import Social from './Social';
import ScrollDown from './ScrollDown';

const CV_URL = '/CV_Daniel_NAGOLOUM_TALLA.pdf';

const Home = () => (
  <section className="home" id="home">
    {/* Fond photo + vignette */}
    <div className="home__stage" aria-hidden="true">
      <img className="home__photo" src={landing} alt="" width="1640" height="656" fetchPriority="high" decoding="async" />
    </div>

    {/* Nom géant : plein hors du visage, contour sur le visage (même texte, deux masques) */}
    <div className="home__layer home__layer--solid">
      <h1 className="home__title">
        <span className="home__first">Daniel</span>
        <span className="home__last">NAGOLOUM</span>
        <span className="home__tail">TALLA</span>
      </h1>
    </div>
    <div className="home__layer home__layer--outline" aria-hidden="true">
      <p className="home__title">
        <span className="home__first">Daniel</span>
        <span className="home__last">NAGOLOUM</span>
        <span className="home__tail">TALLA</span>
      </p>
    </div>

    <div className="home__inner container">
      <div className="home__top">
        <div className="home__intro">
          <span className="home__greeting">
            <i className="uil uil-smile" /> Bonjour, je suis
          </span>
          <p className="home__subtitle">Développeur Full-Stack + IA</p>
        </div>
        <ScrollDown />
      </div>

      <div className="home__bottom">
        <div className="home__about">
          <p className="home__description">
            Développeur Full-Stack récemment diplômé d'un Bachelor Développement Logiciel
            (INGETIS Paris) et intégrant un Mastère Développement Logiciel. Je conçois des
            applications web complètes, de l'interface au back-end, en passant par la gestion
            des données.
          </p>
        </div>

        <div className="home__actions">
          <div className="home__cta">
            <a href={CV_URL} download="CV_Daniel_NAGOLOUM_TALLA.pdf" className="button button--flex">
              Télécharger mon CV
              <i className="uil uil-import button__icon" />
            </a>
            <Link to="/portfolio" className="button button--ghost button--flex">
              Voir mon travail <i className="uil uil-arrow-right button__icon" />
            </Link>
          </div>
          <Social />
        </div>
      </div>
    </div>
  </section>
);

export default Home;
