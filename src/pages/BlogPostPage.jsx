import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { posts, getSections } from '../components/blog/posts';
import NotFoundPage from './NotFoundPage';
import usePageMeta from '../hooks/usePageMeta';
import useSectionNav from '../hooks/useSectionNav';
import '../components/work/Work.css';
import './ProjectPage.css';

const PostDetail = ({ post, prev, next }) => {
  usePageMeta({
    title: `${post.title} | Blog - Daniel NAGOLOUM TALLA`,
    description: post.excerpt,
    path: `/blog/${post.id}`,
  });

  const sections = useMemo(() => getSections(post), [post]);
  const active = useSectionNav(useMemo(() => sections.map(s => s.id), [sections]));

  return (
    <div className="page project">
      <div className="pj container">
        <nav className="pj-crumbs" aria-label="Fil d'Ariane">
          <Link to="/blog"><i className="uil uil-arrow-left" aria-hidden="true" /> Blog</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{post.title}</span>
        </nav>

        <header className="pj-head glass">
          <div className="pj-head__text">
            <div className="pj-head__meta">
              <span className="pj-tag"><i className={`uil ${post.icon}`} aria-hidden="true" /> {post.category}</span>
              <span className="pj-tag"><i className="uil uil-calendar-alt" aria-hidden="true" /> {post.date}</span>
              <span className="pj-tag"><i className="uil uil-clock" aria-hidden="true" /> {post.readTime}</span>
            </div>
            <h1 className="pj-head__title">{post.title}</h1>
            <p className="pj-head__summary">{post.excerpt}</p>
            <div className="pj-head__actions">
              {post.tags.map(tag => <span key={tag} className="pj-tag">{tag}</span>)}
            </div>
          </div>
        </header>

        <div className="pj-body">
          <nav className="pj-nav" aria-label="Plan de l'article">
            <span className="pj-nav__title">Dans cet article</span>
            <ol className="pj-nav__list">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`pj-nav__link${active === s.id ? ' is-active' : ''}`}
                    aria-current={active === s.id ? 'true' : undefined}
                  >
                    <span className="pj-nav__no">{String(i + 1).padStart(2, '0')}</span>
                    <span className="pj-nav__text">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <main className="pj-main">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="pj-section">
                <h2 className="pj-section__title">
                  <span className="pj-section__no">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                {s.paras.map((t, k) => <p key={k} className="pj-prose">{t}</p>)}
              </section>
            ))}
          </main>
        </div>

        <nav className="pj-pager" aria-label="Autres articles">
          <Link to={`/blog/${prev.id}`} className="pj-pager__link glass">
            <span className="pj-label"><i className="uil uil-arrow-left" aria-hidden="true" /> Précédent</span>
            <strong>{prev.title}</strong>
          </Link>
          <Link to={`/blog/${next.id}`} className="pj-pager__link pj-pager__link--next glass">
            <span className="pj-label">Suivant <i className="uil uil-arrow-right" aria-hidden="true" /></span>
            <strong>{next.title}</strong>
          </Link>
        </nav>
      </div>
    </div>
  );
};

const BlogPostPage = () => {
  const { id } = useParams();
  const i = posts.findIndex(p => p.id === id);
  if (i === -1) return <NotFoundPage />;
  const prev = posts[(i - 1 + posts.length) % posts.length];
  const next = posts[(i + 1) % posts.length];
  return <PostDetail key={id} post={posts[i]} prev={prev} next={next} />;
};

export default BlogPostPage;
