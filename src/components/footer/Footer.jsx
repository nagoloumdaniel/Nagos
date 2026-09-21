import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const socials = [
  { href: 'mailto:nagoloumtalladanielparfait@gmail.com', icon: 'uil-envelope',   label: 'Email'    },
  { href: 'tel:+33625839007',                            icon: 'uil-phone',      label: 'Tél'      },
  { href: 'https://www.linkedin.com/in/nagoloum', icon: 'uil-linkedin-alt', label: 'LinkedIn' },
  { href: 'https://wa.me/33625839007',                   icon: 'uil-whatsapp',   label: 'WhatsApp' },
  { href: 'https://github.com/nagoloumdaniel',                 icon: 'uil-github-alt', label: 'GitHub'   },
];

const navItems = [
  { to: '/#about',        label: 'À propos'    },
  { to: '/#skills',       label: 'Compétences' },
  { to: '/#contact',      label: 'Contact'     },
  { to: '/portfolio',     label: 'Portfolio'   },
  { to: '/blog',          label: 'Blog'        },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer__container container">
      <Link to="/" className="footer__logo">Nagoloum<span className="footer__logo-dot" /></Link>
      <ul className="footer__list">
        {navItems.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} className="footer__link">{label}</Link>
          </li>
        ))}
      </ul>
      <div className="footer__social">
        {socials.map(({ href, icon, label }) => (
          <a key={href} href={href} target="_blank" rel="noreferrer" className="footer__social-link" aria-label={label}>
            <i className={`uil ${icon}`} />
          </a>
        ))}
      </div>
      <span className="footer__copy">© <span>{new Date().getFullYear()}</span> Daniel Nagoloum Talla · Tous droits réservés</span>
    </div>
  </footer>
);
export default Footer;
