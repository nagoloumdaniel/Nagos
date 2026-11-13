/* Projets du portfolio, lus dans /content/projets/<nom-du-projet>/ .
   Un dossier = un projet, avec 12 sous-dossiers numérotés qui suivent les 12 sections de la page projet
   (01-apercu … 12-liens). Aucune liste à tenir à jour. Fichiers reconnus : content/README.md */
import {
  parseJson, groupByFolder, slugToTitle, fileToCaption, byNaturalName,
  readFlag, parseLinks, parseSituation, sortBy,
} from './lecteurs';

const BASE = '../../../content/projets/';

const MAX_GALLERY = 8; // seules les images importantes sont gardées

const texts = groupByFolder(
  import.meta.glob('../../../content/projets/*/*/*.{json,md,txt}', { query: '?raw', import: 'default', eager: true }),
  BASE,
);
const logos = groupByFolder(
  import.meta.glob('../../../content/projets/*/01-apercu/logo.{webp,png,jpg,jpeg,avif,svg}', { query: '?url', import: 'default', eager: true }),
  BASE,
);
const shots = groupByFolder(
  import.meta.glob('../../../content/projets/*/04-galerie/*.{webp,png,jpg,jpeg,avif,gif,svg}', { query: '?url', import: 'default', eager: true }),
  BASE,
);

const cap = (t) => String(t).replace(/^./, c => c.toUpperCase()); // un projet commence toujours par une majuscule
const list = (v) => (Array.isArray(v) && v.length ? v : undefined);
const mapList = (arr, fn) => list(arr)?.map(fn);

const build = (slug) => {
  const f = texts[slug] || {};
  const where = (name) => `${BASE}${slug}/${name}`;
  const json = (name) => parseJson(f[name], where(name));
  const infos = json('01-apercu/infos.json') || {};

  const statut = readFlag(f['01-apercu/statut.txt']) || 'termine';
  if (statut === 'brouillon') return null;

  const links = parseLinks(f['12-liens/liens.txt']);
  const depot = readFlag(f['02-github/depot.txt']) || (links.some(l => l.kind === 'github') ? 'public' : 'prive');
  const isPrivate = depot === 'prive';

  const allNames = Object.keys(shots[slug] || {}).map(k => k.replace(/^04-galerie\//, '')).sort(byNaturalName);
  if (allNames.length > MAX_GALLERY) {
    console.warn(`[contenu] ${slug} : ${allNames.length} images dans 04-galerie, seules les ${MAX_GALLERY} premières sont affichées.`);
  }
  const alts = json('04-galerie/alt.json') || {};
  const gallery = allNames.slice(0, MAX_GALLERY).map(name => {
    const caption = fileToCaption(name);
    return { src: shots[slug][`04-galerie/${name}`], alt: alts[name] || caption, caption };
  });

  const meta = {
    country: infos.pays, languages: list(infos.langues), period: infos.periode,
    team: infos.equipe, hosting: infos.deploiement,
  };
  const modelisation = json('08-modelisation/modelisation.json');

  return {
    id: slug,
    order: Number.isFinite(infos.ordre) ? infos.ordre : 9999,
    title: cap(infos.titre || slugToTitle(slug)),
    category: infos.categorie || 'Projet',
    status: infos.etiquette,
    wip: statut === 'en-cours',
    private: isPrivate,
    repos: isPrivate ? [] : links.filter(l => l.kind === 'github').map(l => l.url.replace(/\/+$/, '').split('/').pop()),
    summary: infos.resume || '',
    overview: f['01-apercu/description.md']?.trim() || undefined,
    role: infos.role,
    monogram: infos.monogramme,
    logo: Object.values(logos[slug] || {})[0],
    logoCover: Boolean(infos.logoRecadre),
    meta: Object.values(meta).some(Boolean) ? meta : undefined,
    figures: mapList(json('01-apercu/chiffres.json'), x => ({ value: x.valeur, label: x.libelle })),
    situation: parseSituation(f['03-situation/situation.md']),
    howItWorks: mapList(json('05-fonctionnement/fonctionnement.json'), x => ({ title: x.titre, text: x.texte })),
    features: mapList(json('06-fonctionnalites/fonctionnalites.json'), x => ({ icon: x.icone || 'uil-check-circle', title: x.titre, text: x.texte })),
    architecture: mapList(json('07-architecture/architecture.json'), x => ({ icon: x.icone || 'uil-cube', label: x.libelle, text: x.texte })),
    modeling: list(modelisation?.entites)
      ? { intro: modelisation.intro, entities: modelisation.entites.map(e => ({ name: e.nom, text: e.texte })) }
      : undefined,
    stack: mapList(json('09-stack/stack.json'), x => ({ label: x.groupe, items: x.elements || [] })) || [],
    challenges: mapList(json('10-defis/defis.json'), x => ({ title: x.titre, text: x.texte })),
    uiChallenges: mapList(json('11-interface/defis-interface.json'), x => ({ icon: x.icone, title: x.titre, text: x.texte })),
    gallery: list(gallery),
    links,
  };
};

export const projectsData = sortBy(
  Object.keys(texts).filter(slug => !slug.startsWith('_')).map(build).filter(Boolean),
  p => p.order,
  p => p.title,
);

export const projectsNav = [{ name: 'Tous' }];
