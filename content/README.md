# Contenu du portfolio

Tout ce qui s'affiche (projets, articles, CV) vient de ce dossier. Il n'y a aucune liste à tenir à jour :
**un dossier = un projet ou un article**, détecté automatiquement. En `npm run dev`, le site se recharge
dès qu'un fichier change ; en production, on pousse sur GitHub et Vercel redéploie.

```
content/
├── cv/                          Le PDF du CV. Remplacer le fichier suffit.
├── etudes/<nom>/infos.json      Une ligne de la frise « Éducation »
├── experiences/<nom>/infos.json Une ligne de la frise « Expérience »
├── certifications/<nom>/        infos.json + le PDF du certificat
├── _modele-projet/              Modèle à copier (12 dossiers, ignoré par le site)
├── _modele-article/             Modèle à copier (4 dossiers, ignoré par le site)
├── projets/<nom-du-projet>/
│   ├── 01-apercu/               infos.json, statut.txt, description.md, chiffres.json, logo
│   ├── 02-github/               depot.txt
│   ├── 03-situation/            situation.md
│   ├── 04-galerie/              8 images maximum (+ alt.json facultatif)
│   ├── 05-fonctionnement/       fonctionnement.json
│   ├── 06-fonctionnalites/      fonctionnalites.json
│   ├── 07-architecture/         architecture.json
│   ├── 08-modelisation/         modelisation.json
│   ├── 09-stack/                stack.json
│   ├── 10-defis/                defis.json
│   ├── 11-interface/            defis-interface.json
│   └── 12-liens/                liens.txt
└── blog/<nom-de-l-article>/
    ├── 01-infos/                infos.json, statut.txt
    ├── 02-couverture/           une image facultative
    ├── 03-article/              article.md
    └── 04-points/               points.md (facultatif)
```

Chaque dossier numéroté correspond à une section de la page projet (ou de l'article). Un dossier vide ou un
fichier absent masque la section. Le plus simple : copier `_modele-projet/` ou `_modele-article/`, il contient un
`LISEZ-MOI.md` par dossier avec le format et un exemple.

Règles de contenu :
- **Titre** : toujours une majuscule au début (appliquée automatiquement à l'affichage).
- **Plusieurs entrées** : fonctionnement, fonctionnalités, architecture, stack, défis et défis d'interface
  sont des listes, avec autant d'entrées que nécessaire.
- **Galerie** : 8 images au maximum, uniquement les écrans importants (au-delà, les suivantes sont ignorées).
- **Aucune version de techno** ("React", pas "React 19").

## Projets

`01-apercu/infos.json` (tout est facultatif) :

```json
{
  "titre": "Allibuy",
  "categorie": "Full-Stack",
  "etiquette": "Flutter · NestJS · dépôt privé",
  "resume": "Une phrase pour la carte du portfolio.",
  "role": "Conception et développement en solo.",
  "ordre": 1,
  "monogramme": "AB",
  "logoRecadre": false,
  "pays": "France",
  "langues": ["Français", "Anglais"],
  "periode": "2026",
  "equipe": "Solo",
  "deploiement": "Vercel"
}
```

- **Nom du dossier** = adresse de la page (`/portfolio/<nom>`). Minuscules et tirets, sans accent.
- **statut.txt** (`01-apercu`) : `en-cours`, `termine` ou `brouillon` (masqué, et absent du sitemap).
- **ordre** : numéro d'affichage (1 en premier). Sans ordre, le projet passe en fin de liste.
- **Galerie** (`04-galerie`) : la **légende est le nom du fichier** : `02 - Acheter.webp` donne « Acheter ».
  Le préfixe numérique sert à l'ordre. Formats : webp, png, jpg, avif, gif, svg (1600 px de large maximum,
  jamais de donnée personnelle ni de secret). Texte alternatif : `alt.json` → `{ "02 - Acheter.webp": "Description" }`.
- **Liens** (`12-liens/liens.txt`) : `demo` ou `github`. L'activité GitHub est lue depuis ces liens,
  uniquement si `02-github/depot.txt` vaut `public`. Dépôt privé : `prive` et aucun lien GitHub.
- **Icônes** : noms Unicons (`uil-server`, `uil-shield-check`…).

## Articles

- **Nom du dossier** = adresse (`/blog/<nom>`).
- **03-article/article.md** : un paragraphe peut commencer par un intertitre en gras (`**Mon intertitre.** Le texte…`) ;
  les intertitres alimentent le plan latéral.
- **02-couverture** : une image facultative, affichée sur la carte et en tête de l'article.
- **ordre** (facultatif) : sans ordre, un nouvel article apparaît en tête de liste.
- `dureeLecture` absent = calculée. `resume` absent = début de l'article.

## Sitemap

`public/sitemap.xml` est généré par `scripts/generate-sitemap.mjs` (automatiquement avant `npm run build`,
ou à la main avec `npm run sitemap`) : une URL par projet et par article publié, brouillons exclus.

## CV

Remplacer le PDF dans `cv/`. Si plusieurs PDF s'y trouvent, le dernier par ordre alphabétique est pris
(`CV_2026-11.pdf` l'emporte sur `CV_2026-03.pdf`). Le nom du fichier est celui du téléchargement.

## Études, expériences, certifications

Un dossier par ligne de la frise « Mon parcours ». Une rubrique sans dossier disparaît (l'onglet aussi).

```json
{
  "titre": "Bachelor Développement Logiciel",
  "details": "INGETIS, Paris - diplôme obtenu",
  "dates": "2025 / 2026",
  "ordre": 2
}
```

- **ordre** : 1 en haut de la frise. Le côté gauche/droite alterne tout seul.
- **Expériences** : `dateCourte` (facultatif) sert à la ligne « git log » du terminal ; sinon `dates`.
- **Certifications** : déposer le PDF dans le dossier (téléchargement automatique, sous le nom du fichier)
  et, si le certificat est vérifiable en ligne, ajouter `"verification": "https://..."` dans `infos.json`
  (bouton « Vérifier »). Sans PDF, pas de bouton Télécharger. Le bloc `certifications.json` du faux
  éditeur est généré depuis ces dossiers.

## Pour générer un nouveau projet avec une IA

Voir [PROMPT-IA.md](PROMPT-IA.md) : un prompt à copier-coller dans n'importe quel projet.
