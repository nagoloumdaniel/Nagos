import { useEffect } from 'react';

const SITE_URL = 'https://nagoloum.dev';

const upsertMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/* Titre, description, canonical et Open Graph propres à chaque page */
const usePageMeta = ({ title, description, path = '/', noindex = false }) => {
  useEffect(() => {
    const url = SITE_URL + path;
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', url);
  }, [title, description, path, noindex]);
};

export default usePageMeta;
