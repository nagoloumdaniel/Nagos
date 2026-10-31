import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from './posts';
import './Blog.css';



const BlogCard = ({ post }) => (
  <Link
    to={`/blog/${post.id}`}
    className="blog__card reveal-scale"
    aria-label={`Lire l'article : ${post.title}`}
  >
    <div className="blog__card-header">
      <span className="blog__card-category">{post.category}</span>
      <i className={`uil ${post.icon} blog__card-icon`} aria-hidden="true" />
    </div>
    <div className="blog__card-body">
      <div className="blog__card-meta">
        <span><i className="uil uil-calendar-alt" aria-hidden="true" /> {post.date}</span>
        <span><i className="uil uil-clock" aria-hidden="true" /> {post.readTime}</span>
      </div>
      <h3 className="blog__card-title">{post.title}</h3>
      <p className="blog__card-excerpt">{post.excerpt}</p>
      <div className="blog__card-tags">
        {post.tags.map(tag => <span key={tag} className="blog__tag">{tag}</span>)}
      </div>
      <span className="blog__read-btn" aria-hidden="true">Lire l'article <i className="uil uil-arrow-right" /></span>
    </div>
  </Link>
);

const Blog = () => {
  return (
    <section className="blog section" id="blog">
      <span className="section__subtitle">Aventures & Apprentissages</span>
      <h2 className="section__title reveal">Mon Blog</h2>


      <div className="blog__grid container">
        {posts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <div className="blog__cta reveal d3">
        <p className="blog__cta-text">Tu as une question, un projet ou tu veux échanger sur la tech ?</p>
        <Link to="/#contact" className="button button--accent button--flex">
          Me contacter <i className="uil uil-message button__icon" />
        </Link>
      </div>
    </section>
  );
};

export default Blog;
