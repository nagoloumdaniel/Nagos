/* Plan latéral et points par défaut d'un article. Les articles eux-mêmes viennent de /content/blog (voir src/lib/contenu/blog.js). */
/* Un paragraphe commence par un intertitre en gras : '**Intertitre.** Texte…' */
const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* Découpe les paragraphes en sections {id, title, paras} pour le plan latéral. */
export const getSections = (post) => {
  const sections = [];
  post.paragraphs.forEach((para, i) => {
    const m = para.match(/^\*\*(.+?)\*\*\s*([\s\S]*)$/);
    if (m) sections.push({ id: `${slugify(m[1]) || 'section'}-${i}`, title: m[1].replace(/[.:]$/, ''), paras: m[2] ? [m[2]] : [] });
    else if (sections.length === 0) sections.push({ id: 'introduction', title: 'Introduction', paras: [para] });
    else sections[sections.length - 1].paras.push(para);
  });
  return sections;
};

/* Points par défaut, identiques pour tous les articles. */
export const defaultPoints = [
  'Un point de vue personnel, pas une vérité absolue.',
  "Aucun chiffre n'est avancé sans source.",
  "Les faits techniques des retours d'expérience sont vérifiables dans le projet concerné.",
  'Les limites et les erreurs sont écrites, pas cachées.',
  'Une remarque ou une correction ? Le formulaire de contact est ouvert.',
];
