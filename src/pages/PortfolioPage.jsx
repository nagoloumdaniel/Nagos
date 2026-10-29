import React from 'react';
import Work from '../components/work/Work';
import usePageMeta from '../hooks/usePageMeta';

const PortfolioPage = () => {
  usePageMeta({
    title: 'Projets - Daniel NAGOLOUM TALLA | Portfolio Full-Stack',
    description: 'Projets de Daniel NAGOLOUM TALLA : Allibuy (marketplace multi-vendeurs), Cyna (SaaS de cybersécurité) et CampaignMailer (campagnes mail).',
    path: '/portfolio',
  });
  return (
    <div className="page">
      <Work />
    </div>
  );
};

export default PortfolioPage;
