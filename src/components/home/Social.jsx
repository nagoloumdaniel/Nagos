import React from 'react';

const socialLinks = [
  { href: 'https://www.linkedin.com/in/nagoloum', icon: 'uil-linkedin-alt', label: 'LinkedIn' },
  { href: 'https://wa.me/33625839007?text=Salut%20Nagoloum', icon: 'uil-whatsapp', label: 'WhatsApp' },
  { href: 'mailto:nagoloumtalladanielparfait@gmail.com', icon: 'uil-envelope', label: 'Email' },
  { href: 'https://github.com/nagoloumdaniel', icon: 'uil-github-alt', label: 'GitHub' },
  { href: 'tel:+33625839007', icon: 'uil-phone', label: 'Téléphone' },
];

const Social = () => (
  <div className="home__social">
    {socialLinks.map(({ href, icon, label }) => (
      <a key={href} href={href} target="_blank" rel="noreferrer" className="home__social-icon" aria-label={label}>
        <i className={`uil ${icon}`} />
      </a>
    ))}
  </div>
);
export default Social;
