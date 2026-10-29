import React from 'react';
import Blog from '../components/blog/Blog';
import usePageMeta from '../hooks/usePageMeta';

const BlogPage = () => {
  usePageMeta({
    title: 'Blog - Daniel NAGOLOUM TALLA | Retours d’expérience tech',
    description: "Articles de Daniel NAGOLOUM TALLA : moteur d'envoi de Campaign Mailer, audit d'Allibuy, IA et backtesting sur NexaGold, stage chez DATALIA, sécurité JWT et travail avec Claude Code.",
    path: '/blog',
  });
  return (
    <div className="page">
      <Blog />
    </div>
  );
};

export default BlogPage;
