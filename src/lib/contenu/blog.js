/* Articles du blog, lus dans le dossier /content/blog/<nom-de-l-article>/ .
   Un dossier = un article. Fichiers reconnus : content/README.md */
import { parseJson, groupByFolder, slugToTitle, readFlag, sortBy } from './lecteurs';

const BASE = '../../../content/blog/';

const texts = groupByFolder(
  import.meta.glob('../../../content/blog/*/*.{json,md,txt}', { query: '?raw', import: 'default', eager: true }),
  BASE,
);

const bullets = (raw) => String(raw ?? '').split(/\r?\n/)
  .map(l => l.replace(/^\s*[-*]\s+/, '').trim()).filter(Boolean);

const build = (slug) => {
  const f = texts[slug] || {};
  if (readFlag(f['statut.txt']) === 'brouillon') return null;
  const infos = parseJson(f['infos.json'], `${BASE}${slug}/infos.json`) || {};
  const paragraphs = String(f['article.md'] ?? '').split(/\r?\n\s*\r?\n/).map(p => p.trim()).filter(Boolean);
  if (!paragraphs.length) return null;
  const words = paragraphs.join(' ').split(/\s+/).length;
  const points = bullets(f['points.md']);
  return {
    id: slug,
    order: Number.isFinite(infos.ordre) ? infos.ordre : 0, // sans « ordre » : en tête de liste
    title: infos.titre || slugToTitle(slug),
    category: infos.categorie || 'Article',
    date: infos.date || '',
    readTime: infos.dureeLecture || `${Math.max(1, Math.round(words / 200))} min`,
    excerpt: infos.resume || paragraphs[0].replace(/\*\*/g, '').slice(0, 180),
    tags: Array.isArray(infos.tags) ? infos.tags : [],
    icon: infos.icone || 'uil-file-alt',
    paragraphs,
    points: points.length ? points : undefined,
  };
};

export const posts = sortBy(Object.keys(texts).map(build).filter(Boolean), p => p.order, p => p.id);
