import React, { useEffect, useState } from 'react';
import './Scrollup.css';

const Scrollup = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; setVisible(window.scrollY >= 560); });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a
      href="#home"
      onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      className={`scrollup${visible ? ' show-scroll' : ''}`}
      aria-label="Remonter"
    >
      <i className="uil uil-arrow-up" />
    </a>
  );
};
export default Scrollup;
