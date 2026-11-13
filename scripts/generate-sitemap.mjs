/* Génère public/sitemap.xml depuis le dossier content/ : une URL par projet et par article publié.
   Lancé automatiquement avant `npm run build` (prebuild). La date vient du dernier commit du dossier. */
import { readdirSync, readFileSync, existsSync, writeFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://nagoloum.dev';

const flag = (file) => existsSync(file)
  ? readFileSync(file, 'utf8').split(/\r?\n/)[0].trim().toLowerCase().normalize('NFD').replace(/\p{M}/gu, '') : '';

const lastmod = (dir) => {
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cs', '--', dir], { cwd: root, encoding: 'utf8' }).trim();
    if (d) return d;
  } catch { /* hors dépôt git */ }
  return statSync(dir).mtime.toISOString().slice(0, 10);
};

const folders = (base) => {
  const dir = join(root, 'content', base);
  return existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory() && !e.name.startsWith('_')).map(e => e.name).sort()
    : [];
};

const urls = [{ path: '/', freq: 'weekly', prio: '1.0' }, { path: '/portfolio', freq: 'monthly', prio: '0.9' }, { path: '/blog', freq: 'monthly', prio: '0.7' }];
for (const slug of folders('projets')) {
  const dir = join(root, 'content/projets', slug);
  if (flag(join(dir, '01-apercu/statut.txt')) === 'brouillon') continue;
  urls.push({ path: `/portfolio/${slug}`, freq: 'monthly', prio: '0.8', dir });
}
for (const slug of folders('blog')) {
  const dir = join(root, 'content/blog', slug);
  if (flag(join(dir, '01-infos/statut.txt')) === 'brouillon' || !existsSync(join(dir, '03-article/article.md'))) continue;
  urls.push({ path: `/blog/${slug}`, freq: 'monthly', prio: '0.7', dir });
}

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${SITE}${u.path}</loc>
    <lastmod>${u.dir ? lastmod(u.dir) : today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.prio}</priority>
  </url>`).join('\n')}
</urlset>
`;
writeFileSync(join(root, 'public/sitemap.xml'), xml);
console.log(`sitemap.xml : ${urls.length} URL`);
