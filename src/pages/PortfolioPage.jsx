import React, { useRef } from 'react';
import usePageCraft from '../lib/craft/usePageCraft';
import Work from '../components/work/Work';
import usePageMeta from '../hooks/usePageMeta';

const PortfolioPage = () => {
  const ref = useRef(null);
  usePageCraft(ref);
  usePageMeta({
    title: 'Projets - Daniel NAGOLOUM TALLA | Portfolio Full-Stack',
    description: 'Projets de Daniel NAGOLOUM TALLA : Allibuy (marketplace multi-vendeurs), Cyna (SaaS de cybersécurité) et CampaignMailer (campagnes mail).',
    path: '/portfolio',
  });
  return (
    <div className="page" ref={ref}>
      <Work />
    </div>
  );
};

export default PortfolioPage;
