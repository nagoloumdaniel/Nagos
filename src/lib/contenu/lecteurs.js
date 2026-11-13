/* Petits lecteurs partagés par les chargeurs de contenu (projets, blog, CV).
   Règle commune : un fichier absent ou illisible ne casse jamais le site, la section est simplement masquée. */

export const parseJson = (raw, where) => {
  if (raw == null) return undefined;
  try { return JSON.parse(raw); } catch (e) {
    console.warn(`[contenu] JSON invalide dans ${where} : ${e.message}`);
    return undefined;
  }
};

/* Regroupe les fichiers d'un glob par dossier :
   { slug: { 'infos.json': contenu, 'galerie/x.webp': url } } */
export const groupByFolder = (modules, base) => {
  const out = {};
  for (const [path, value] of Object.entries(modules)) {
    const [slug, ...rest] = path.slice(base.length).split('/');
    (out[slug] ||= {})[rest.join('/')] = value;
  }
  return out;
};

export const slugToTitle = (slug) => slug.replace(/[-_]+/g, ' ').replace(/^./, c => c.toUpperCase());

/* Nom de fichier → légende : « 01 - Écran de bienvenue.webp » → « Écran de bienvenue ».
   Le préfixe numérique ne sert qu'à l'ordre ; sans espace, les - et _ deviennent des espaces. */
export const fileToCaption = (fileName) => {
  let s = fileName.replace(/\.[^.]+$/, '').replace(/^\d+(\s*[-_.]\s*|\s+)/, '').trim();
  if (!/\s/.test(s)) s = s.replace(/[-_]+/g, ' ');
  return s.replace(/^./, c => c.toUpperCase());
};

export const byNaturalName = (a, b) => a.localeCompare(b, 'fr', { numeric: true, sensitivity: 'base' });

/* statut.txt / depot.txt : première ligne, sans accents ni casse ; « en cours » = « en-cours ». */
export const readFlag = (raw) => String(raw ?? '').split(/\r?\n/)[0].trim().toLowerCase()
  .normalize('NFD').replace(/\p{M}/gu, '').replace(/[\s_]+/g, '-');

/* liens.txt : « type | libellé | adresse », une ligne par lien, # pour un commentaire.
   « demo | adresse » ou une simple adresse sont acceptés (github.com = lien GitHub, sinon démo). */
export const parseLinks = (raw) => String(raw ?? '').split(/\r?\n/)
  .map(l => l.trim()).filter(l => l && !l.startsWith('#'))
  .map(line => {
    const parts = line.split('|').map(p => p.trim());
    const url = parts[parts.length - 1];
    if (!/^https?:\/\//i.test(url)) return null;
    const isGithub = /^https?:\/\/(www\.)?github\.com\//i.test(url);
    const kind = parts.length > 1 && /^(demo|github)$/i.test(parts[0]) ? parts[0].toLowerCase() : (isGithub ? 'github' : 'demo');
    const label = parts.length === 3 ? parts[1] : (kind === 'demo' ? 'Voir le site' : 'GitHub');
    return { kind, label, url };
  }).filter(Boolean);

/* situation.md : trois titres « ## Mise en situation », « ## Problème », « ## Solution ». */
export const parseSituation = (raw) => {
  if (!raw) return undefined;
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
  const keys = { 'mise en situation': 'context', contexte: 'context', probleme: 'problem', solution: 'solution' };
  const out = {};
  raw.split(/^##\s+/m).slice(1).forEach(block => {
    const [title, ...body] = block.split(/\r?\n/);
    const key = keys[norm(title.trim())];
    const text = body.join('\n').trim();
    if (key && text) out[key] = text;
  });
  return Object.keys(out).length ? out : undefined;
};

export const sortBy = (list, orderOf, labelOf) => [...list].sort(
  (a, b) => (orderOf(a) - orderOf(b)) || byNaturalName(labelOf(a), labelOf(b)),
);
