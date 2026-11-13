import React, { useRef } from 'react';
import usePageCraft from '../lib/craft/usePageCraft';
import Blog from '../components/blog/Blog';
import usePageMeta from '../hooks/usePageMeta';

const BlogPage = () => {
  const ref = useRef(null);
  usePageCraft(ref);
  usePageMeta({
    title: 'Blog - Daniel NAGOLOUM TALLA | Actualité, idées et regards critiques sur la tech',
    description: "Blog de Daniel NAGOLOUM TALLA : actualité tech, pensée critique et philosophique (IA, vie privée, logiciel libre, attention), divers et retours d'expérience sur ses projets.",
    path: '/blog',
  });
  return (
    <div className="page" ref={ref}>
      <Blog />
    </div>
  );
};

export default BlogPage;
