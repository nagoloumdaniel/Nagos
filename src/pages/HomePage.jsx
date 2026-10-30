import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home           from '../components/home/Home';
import About          from '../components/about/About';
import Skills         from '../components/skills/Skills';
import GithubActivity from '../components/github/GithubActivity';
import Services       from '../components/services/Services';
import Qualifications from '../components/qualifications/Qualifications';
import Contact        from '../components/contact/Contact';
import usePageMeta    from '../hooks/usePageMeta';

const HomePage = () => {
  const { hash } = useLocation();

  usePageMeta({
    title: 'Daniel NAGOLOUM TALLA - Développeur Full-Stack + IA | Portfolio',
    description: "Développeur Full-Stack + IA, diplômé d'un Bachelor Développement Logiciel (INGETIS Paris) et intégrant un Mastère Développement Logiciel. React, Next.js, NestJS, PostgreSQL. Recherche d'alternance de 24 mois dès septembre 2026 en Île-de-France.",
    path: '/',
  });

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [hash]);

  return (
    <>
      <Home />
      <About />
      <Skills />
      <GithubActivity />
      <Services />
      <Qualifications />
      <Contact />
    </>
  );
};

export default HomePage;
