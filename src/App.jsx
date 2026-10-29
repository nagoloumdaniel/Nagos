import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Header          from './components/header/Header';
import Footer          from './components/footer/Footer';
import Scrollup        from './components/scrollup/Scrollup';
import HomePage        from './pages/HomePage';
import useScrollReveal from './hooks/useScrollReveal';

/* Pages secondaires chargées à la demande (code-splitting) */
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const BlogPage      = lazy(() => import('./pages/BlogPage'));
const ProjectPage   = lazy(() => import('./pages/ProjectPage'));
const NotFoundPage  = lazy(() => import('./pages/NotFoundPage'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
}

function App() {
  useScrollReveal();
  return (
    <>
      {/* Fond : grille de points + repères pointillés */}
      <div className="bg-grid" aria-hidden="true">
        <span className="bg-grid__line bg-grid__line--l" />
        <span className="bg-grid__line bg-grid__line--r" />
      </div>

      <Header />
      <ScrollToTop />

      <main className="main">
        <Suspense fallback={<div className="page" />}>
          <Routes>
            <Route path="/"          element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:id" element={<ProjectPage />} />
            <Route path="/blog" element={<BlogPage />} />
            {/* Ancienne page : redirige vers la section Contact de l'accueil */}
            <Route path="/contact"   element={<Navigate to="/#contact" replace />} />
            <Route path="*"          element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <Scrollup />
    </>
  );
}

export default App;
