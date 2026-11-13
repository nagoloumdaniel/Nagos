/* Parcours : études, expériences et certifications, lues dans /content/<etudes|experiences|certifications>/<dossier>/ .
   Un dossier = une ligne de la frise. Fichiers reconnus : content/README.md */
import { parseJson, groupByFolder, slugToTitle, sortBy } from './lecteurs';

const load = (texts, pdfs, base) => {
  const t = groupByFolder(texts, base);
  const p = groupByFolder(pdfs, base);
  const items = Object.keys(t).map(slug => {
    const infos = parseJson(t[slug]['infos.json'], `${base}${slug}/infos.json`) || {};
    const pdf = Object.keys(p[slug] || {}).sort().pop();
    return {
      id: slug,
      order: Number.isFinite(infos.ordre) ? infos.ordre : 9999,
      title: infos.titre || slugToTitle(slug),
      sub: infos.details || '',
      dates: infos.dates || '',
      shortDate: infos.dateCourte || infos.dates || '',
      file: pdf ? p[slug][pdf] : undefined,
      fileName: pdf,
      verify: /^https?:\/\//i.test(infos.verification || '') ? infos.verification : undefined,
    };
  });
  /* Alternance gauche / droite de la frise selon l'ordre d'affichage */
  return sortBy(items, i => i.order, i => i.title).map((it, n) => ({ ...it, side: n % 2 === 0 ? 'left' : 'right' }));
};

export const etudes = load(
  import.meta.glob('../../../content/etudes/*/*.json', { query: '?raw', import: 'default', eager: true }),
  {}, '../../../content/etudes/');

export const experiences = load(
  import.meta.glob('../../../content/experiences/*/*.json', { query: '?raw', import: 'default', eager: true }),
  {}, '../../../content/experiences/');

export const certifications = load(
  import.meta.glob('../../../content/certifications/*/*.json', { query: '?raw', import: 'default', eager: true }),
  import.meta.glob('../../../content/certifications/*/*.pdf', { query: '?url', import: 'default', eager: true }),
  '../../../content/certifications/');
