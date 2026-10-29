import React from 'react';
import './Footer.css';

const socials = [
  { href: 'mailto:nagoloumtalladanielparfait@gmail.com', icon: 'uil-envelope',    label: 'Email'    },
  { href: 'tel:+33625839007',                            icon: 'uil-phone',       label: 'Tél'      },
  { href: 'https://www.linkedin.com/in/nagoloum',        icon: 'uil-linkedin-alt', label: 'LinkedIn' },
  { href: 'https://wa.me/33625839007',                   icon: 'uil-whatsapp',    label: 'WhatsApp' },
  { href: 'https://github.com/nagoloumdaniel',          icon: 'uil-github-alt',  label: 'GitHub'   },
];

/* Le nom géant est décoratif : le texte lisible est le copyright (le nom est aussi dans l'en-tête). */
const Footer = () => (
  <footer className="footer">
    <div className="footer__container container">
      <div className="footer__social">
        {socials.map(({ href, icon, label }) => (
          <a key={href} href={href} target="_blank" rel="noreferrer" className="footer__social-link" aria-label={label}>
            <i className={`uil ${icon}`} />
          </a>
        ))}
      </div>
      <span className="footer__copy">© <span>{new Date().getFullYear()}</span> Daniel NAGOLOUM TALLA · Tous droits réservés</span>
    </div>

    <div className="footer__name" aria-hidden="true">NAGOLOUM</div>
  </footer>
);
export default Footer;
