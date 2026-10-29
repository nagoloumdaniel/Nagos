import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import ThemeToggle from '../home/ThemeToggle';

const navLinks = [
  { to: '/',         hash: '#home',         icon: 'uil-estate',         label: 'Accueil'     },
  { to: '/',         hash: '#about',        icon: 'uil-user',           label: 'À propos'    },
  { to: '/',         hash: '#skills',       icon: 'uil-brackets-curly', label: 'Compétences' },
  { to: '/',         hash: '#services',     icon: 'uil-briefcase-alt',  label: 'Services'    },
  { to: '/',         hash: '#contact',      icon: 'uil-message',        label: 'Contact'     },
  { to: '/portfolio',hash: '',              icon: 'uil-scenery',        label: 'Portfolio'   },
  { to: '/blog',     hash: '',              icon: 'uil-newspaper',      label: 'Blog'        },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeHash,  setActiveHash]  = useState('#home');
  const [scrolled,    setScrolled]    = useState(false);

  /* Active section on scroll (only on home) */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY >= 80);
      if (location.pathname !== '/') return;
      const sectionIds = navLinks.filter(l => l.to === '/' && l.hash).map(l => l.hash.slice(1));
      /* En bas de page, la dernière section (Contact) ne peut pas atteindre le haut : on la force */
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && window.scrollY > 0) {
        setActiveHash(`#${sectionIds[sectionIds.length - 1]}`);
        return;
      }
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        /* Section active = dernière dont le haut a passé 40 % de la hauteur d'écran */
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          setActiveHash(`#${sectionIds[i]}`);
          break;
        }
      }
    };
    onScroll();
    /* Au plus un calcul par frame (le scroll émet bien plus d'évènements) */
    let ticking = false;
    const onScrollRaf = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; onScroll(); });
    };
    window.addEventListener('scroll', onScrollRaf, { passive: true });
    return () => window.removeEventListener('scroll', onScrollRaf);
  }, [location.pathname]);

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const openMenu  = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  const isActive = (link) => {
    if (link.to === '/portfolio') return location.pathname.startsWith('/portfolio');
    if (link.to === '/blog')      return location.pathname === '/blog';
    return location.pathname === '/' && activeHash === link.hash;
  };

  const handleSectionClick = (e, hash) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname === '/') {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveHash(hash);
    } else {
      navigate(`/${hash}`);
    }
  };

  return (
    <>
      {menuOpen && (
        <div
          className="nav__overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <header className={`header${scrolled ? ' scroll-header' : ''}${!scrolled && !location.pathname.startsWith('/portfolio') && location.pathname !== '/blog' ? ' header--on-hero' : ''}`}>
        <nav className="nav container">

          <Link to="/" className="nav__logo" onClick={closeMenu}>
            NAGOLOUM
          </Link>

          <div id="nav-menu" className={`nav__menu${menuOpen ? ' show-menu nav__menuf' : ''}`}>


            <ul className="nav__list">
              {navLinks.map((link) => {
                const active = isActive(link);
                const className = `nav__link${active ? ' active-link' : ''}`;
                const iconEl = <i className={`uil ${link.icon} nav__icon`} />;
                const labelEl = <span className="nav__label">{link.label}</span>;

                if (link.hash) {
                  // Section anchor on home
                  return (
                    <li key={link.label} className="nav__item">
                      <a
                        href={`${link.to === '/' ? '' : link.to}${link.hash}`}
                        onClick={(e) => handleSectionClick(e, link.hash)}
                        className={className}
                      >
                        {iconEl}{labelEl}
                      </a>
                    </li>
                  );
                }

                // Dedicated route (Portfolio)
                return (
                  <li key={link.label} className="nav__item">
                    <Link
                      to={link.to}
                      onClick={closeMenu}
                      className={className}
                    >
                      {iconEl}{labelEl}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desktop : thème après « Portfolio » · Mobile : thème à côté du bouton menu */}
          <div className="nav__actions">
            <ThemeToggle className="nav__theme" />
            <button
              type="button"
              className="nav__toggle"
              onClick={menuOpen ? closeMenu : openMenu}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              aria-controls="nav-menu"
            >
              <i className={`uil ${menuOpen ? 'uil-times' : 'uil-apps'} nav__toggle-icon`} />
            </button>
          </div>

        </nav>
      </header>
    </>
  );
};

export default Header;
