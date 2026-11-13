# Contenu du portfolio

Tout ce qui s'affiche (projets, articles, CV) vient de ce dossier. Il n'y a aucune liste à tenir à jour :
**un dossier = un projet ou un article**, détecté automatiquement. En `npm run dev`, le site se recharge
dès qu'un fichier change ; en production, on pousse sur GitHub et Vercel redéploie.

```
content/
├── cv/                      Le PDF du CV. Remplacer le fichier suffit (un seul PDF).
├── etudes/<nom>/infos.json          Une ligne de la frise « Éducation »
├── experiences/<nom>/infos.json     Une ligne de la frise « Expérience »
├── certifications/<nom>/            infos.json + le PDF du certificat (n'importe quel nom)
├── projets/<nom-du-projet>/
│   ├── infos.json           Identité du projet (voir plus bas)
│   ├── statut.txt           en-cours | termine | brouillon (brouillon = masqué)
│   ├── depot.txt            public | prive
│   ├── liens.txt            Une ligne par lien : demo | Voir le site | https://...
│   ├── description.md       Présentation longue
│   ├── situation.md         Trois titres : ## Mise en situation, ## Problème, ## Solution
│   ├── chiffres.json        [{ "valeur": "505", "libelle": "endpoints API" }]
│   ├── fonctionnement.json  [{ "titre", "texte" }]
│   ├── fonctionnalites.json [{ "icone", "titre", "texte" }]
│   ├── architecture.json    [{ "icone", "libelle", "texte" }]
│   ├── modelisation.json    { "intro", "entites": [{ "nom", "texte" }] }
│   ├── stack.json           [{ "groupe": "Back", "elements": ["NestJS", "Prisma"] }]
│   ├── defis.json           [{ "titre", "texte" }]
│   ├── defis-interface.json [{ "icone", "titre", "texte" }]
│   ├── logo.png|webp|svg    Logo (sans logo : monogramme)
│   └── galerie/             Captures d'écran, chargées toutes seules
└── blog/<nom-de-l-article>/
    ├── infos.json           titre, categorie, date, dureeLecture, resume, tags, icone, ordre
    ├── statut.txt           publie | brouillon
    ├── article.md           Le texte : paragraphes séparés par une ligne vide
    └── points.md            Facultatif : remplace la liste « À retenir sur ce blog »
```

**Règle générale : un fichier absent = la section n'apparaît pas.** Aucun fichier n'est obligatoire,
sauf le dossier lui-même (et `article.md` pour un article).

## Projets

`infos.json` (tout est facultatif) :

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
- **ordre** : numéro d'affichage (1 en premier). Sans ordre, le projet passe en fin de liste.
- **Galerie** : déposer une image dans `galerie/`. La **légende est le nom du fichier** : `02 - Acheter.webp`
  donne « Acheter ». Le préfixe numérique sert seulement à l'ordre et disparaît de la légende. Formats :
  webp, png, jpg, avif, gif, svg (1600 px de large maximum, jamais de donnée personnelle ni de secret).
  Texte alternatif détaillé facultatif : `galerie/alt.json` → `{ "02 - Acheter.webp": "Description pour lecteur d'écran" }`.
- **Liens** : `demo` ou `github`. Une adresse github.com seule est reconnue comme dépôt. L'activité GitHub
  du projet est lue depuis ces liens (uniquement si `depot.txt` vaut `public`).
- **Dépôt privé** : `depot.txt` = `prive`, et aucun lien GitHub.
- **Icônes** : noms Unicons (`uil-server`, `uil-shield-check`…).

## Articles

- **Nom du dossier** = adresse (`/blog/<nom>`).
- **article.md** : un paragraphe peut commencer par un intertitre en gras (`**Mon intertitre.** Le texte…`) ;
  les intertitres alimentent le plan latéral.
- **ordre** (facultatif) : sans ordre, un nouvel article apparaît en tête de liste.
- `dureeLecture` absent = calculée. `resume` absent = début de l'article.

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
