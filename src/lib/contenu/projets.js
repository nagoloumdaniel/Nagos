/* Projets du portfolio, lus dans le dossier /content/projets/<nom-du-projet>/ .
   Un dossier = un projet : aucune liste à tenir à jour. Fichiers reconnus : content/README.md */
import {
  parseJson, groupByFolder, slugToTitle, fileToCaption, byNaturalName,
  readFlag, parseLinks, parseSituation, sortBy,
} from './lecteurs';

const BASE = '../../../content/projets/';

const texts = groupByFolder(
  import.meta.glob('../../../content/projets/*/*.{json,md,txt}', { query: '?raw', import: 'default', eager: true }),
  BASE,
);
const altTexts = import.meta.glob('../../../content/projets/*/galerie/alt.json', { query: '?raw', import: 'default', eager: true });
const logos = groupByFolder(
  import.meta.glob('../../../content/projets/*/logo.{webp,png,jpg,jpeg,avif,svg}', { query: '?url', import: 'default', eager: true }),
  BASE,
);
const shots = groupByFolder(
  import.meta.glob('../../../content/projets/*/galerie/*.{webp,png,jpg,jpeg,avif,gif,svg}', { query: '?url', import: 'default', eager: true }),
  BASE,
);

const list = (v) => (Array.isArray(v) && v.length ? v : undefined);
const mapList = (arr, fn) => list(arr)?.map(fn);

const build = (slug) => {
  const f = texts[slug] || {};
  const where = (name) => `${BASE}${slug}/${name}`;
  const json = (name) => parseJson(f[name], where(name));
  const infos = json('infos.json') || {};

  const statut = readFlag(f['statut.txt']) || 'termine';
  if (statut === 'brouillon') return null;

  const links = parseLinks(f['liens.txt']);
  const depot = readFlag(f['depot.txt']) || (links.some(l => l.kind === 'github') ? 'public' : 'prive');
  const isPrivate = depot === 'prive';

  const names = Object.keys(shots[slug] || {}).map(k => k.replace(/^galerie\//, '')).sort(byNaturalName);
  const alts = parseJson(altTexts[`${BASE}${slug}/galerie/alt.json`], where('galerie/alt.json')) || {};
  const gallery = names.map(name => {
    const caption = fileToCaption(name);
    return { src: shots[slug][`galerie/${name}`], alt: alts[name] || caption, caption };
  });

  const meta = {
    country: infos.pays, languages: list(infos.langues), period: infos.periode,
    team: infos.equipe, hosting: infos.deploiement,
  };
  const modelisation = json('modelisation.json');

  return {
    id: slug,
    order: Number.isFinite(infos.ordre) ? infos.ordre : 9999,
    title: infos.titre || slugToTitle(slug),
    category: infos.categorie || 'Projet',
    status: infos.etiquette,
    wip: statut === 'en-cours',
    private: isPrivate,
    repos: isPrivate ? [] : links.filter(l => l.kind === 'github').map(l => l.url.replace(/\/+$/, '').split('/').pop()),
    summary: infos.resume || '',
    overview: f['description.md']?.trim() || undefined,
    role: infos.role,
    monogram: infos.monogramme,
    logo: Object.values(logos[slug] || {})[0],
    logoCover: Boolean(infos.logoRecadre),
    meta: Object.values(meta).some(Boolean) ? meta : undefined,
    figures: mapList(json('chiffres.json'), x => ({ value: x.valeur, label: x.libelle })),
    situation: parseSituation(f['situation.md']),
    howItWorks: mapList(json('fonctionnement.json'), x => ({ title: x.titre, text: x.texte })),
    features: mapList(json('fonctionnalites.json'), x => ({ icon: x.icone || 'uil-check-circle', title: x.titre, text: x.texte })),
    architecture: mapList(json('architecture.json'), x => ({ icon: x.icone || 'uil-cube', label: x.libelle, text: x.texte })),
    modeling: list(modelisation?.entites)
      ? { intro: modelisation.intro, entities: modelisation.entites.map(e => ({ name: e.nom, text: e.texte })) }
      : undefined,
    stack: mapList(json('stack.json'), x => ({ label: x.groupe, items: x.elements || [] })) || [],
    challenges: mapList(json('defis.json'), x => ({ title: x.titre, text: x.texte })),
    uiChallenges: mapList(json('defis-interface.json'), x => ({ icon: x.icone, title: x.titre, text: x.texte })),
    gallery: list(gallery),
    links,
  };
};

export const projectsData = sortBy(
  Object.keys(texts).map(build).filter(Boolean),
  p => p.order,
  p => p.title,
);

export const projectsNav = [{ name: 'Tous' }];
