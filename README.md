# Portfolio - Daniel Nagoloum Talla

Portfolio personnel de **Daniel Nagoloum Talla**, développeur Full-Stack · Data · IA.
Diplômé d'un Bachelor Développement / Data (INGETIS Paris), en Mastère Développement Logiciel,
disponible en **alternance de 24 mois dès septembre 2026** (3 semaines entreprise / 1 semaine formation).

---

## 🚀 Stack technique

| Couche | Technologie |
|---|---|
| Framework | React 19 + Vite 7 + react-router-dom 7 |
| 3D / animation | Three.js (sphère de particules) + GSAP, chargés à la demande |
| Styles | CSS Variables (design tokens) + un fichier CSS par composant |
| Icons | Unicons Line + Boxicons (CDN) |
| Email | EmailJS (`@emailjs/browser`) |
| Fonts | Syne (titres) · DM Sans (texte) via Google Fonts |
| Hébergement | Vercel (`vercel.json` : réécriture SPA) |

---

## 📁 Structure du projet

```
public/
├── og-image.png             # Image de partage 1200×630 (Open Graph / Twitter)
├── robots.txt · sitemap.xml
src/
├── assets/                  # Images WebP + CV (Mon_CV_Dev.pdf)
│   └── logos/               # Logos des projets, récupérés dans leurs dépôts
├── components/
│   ├── about/               # « À propos » + bouton de téléchargement du CV
│   ├── blog/                # Articles avec filtres et modal
│   ├── contact/             # Formulaire EmailJS + moyens de contact
│   ├── cursor/              # Curseur personnalisé (desktop)
│   ├── footer/
│   ├── header/              # Nav fixe (desktop) / bottom sheet (mobile)
│   ├── home/                # Hero, réseaux sociaux, bascule de thème
│   ├── particles/           # Sphère de particules Three.js
│   ├── qualifications/      # Timeline formation / expérience / certifications
│   ├── scrollup/            # Bouton retour en haut
│   ├── services/            # Domaines d'expertise avec modal détail
│   ├── skills/              # Compétences classées par catégorie (tags)
│   └── work/                # Projets : filtres, cartes et modal
├── hooks/
│   ├── usePageMeta.js       # Titre / description / canonical / OG par page
│   └── useScrollReveal.js   # Animations d'apparition au scroll
├── pages/                   # HomePage, PortfolioPage, BlogPage, NotFoundPage (404)
├── App.jsx                  # Layout + routes (pages secondaires en lazy loading)
├── App.css                  # Design tokens, styles globaux, fond aurora
└── main.jsx
```

---

## ⚙️ Installation & démarrage

```bash
git clone https://github.com/Nagoloum/Nagos.git
cd Nagos
npm install
npm run dev       # développement
npm run lint      # ESLint
npm run build     # build de production
npm run preview   # prévisualiser le build
```

---

## 🧭 Routes

| Route | Page |
|---|---|
| `/` | Accueil : hero, à propos, compétences, services, qualifications, contact (`#contact`) |
| `/portfolio` | Projets |
| `/blog` | Articles |
| `/contact` | Redirection vers `/#contact` (anciens liens) |
| `*` | Page 404 (`noindex`) |

Ordre de la navigation : Accueil · À propos · Compétences · Services · Contact · Portfolio · Blog.

Sur Vercel, `vercel.json` renvoie toutes les URL vers `index.html` : sans lui, un rechargement
de `/blog` ou `/portfolio` renvoie une 404 serveur.

---

## 🎨 Système de design

Tous les tokens sont définis dans `src/App.css` sous `:root` (accent `#7B61FF`, couleurs, typographie,
rayons, ombres, z-index). Le **thème sombre** redéfinit les variables sous `body.dark-theme`.

- Choix persisté dans `localStorage` (clé `theme`), appliqué **avant le rendu** par un script inline
  dans `index.html` (pas de flash, et thème correct sur toutes les pages).
- Animation « wave » circulaire depuis le point de clic (`ThemeToggle.jsx`).

---

## 🪟 Modals

`BlogModal`, `ServiceModal` et `ProjectModal` sont rendues via `createPortal(…, document.body)` pour
échapper au stacking context de `<main>`. Chacune bloque le scroll, se ferme avec `Escape` ou au clic
sur l'overlay, et place le focus sur le bouton de fermeture à l'ouverture.

`ProjectModal` garde en plus le focus clavier à l'intérieur de la modal et le rend à la carte
d'origine à la fermeture.

---

## 🗂️ Projets

Les données sont dans `src/components/work/Data.jsx` : une carte par produit, même quand il a plusieurs
dépôts (liens « GitHub Frontend » / « GitHub Backend » dans la même carte).

- **Logo** : récupéré dans le dépôt du projet et converti en WebP dans `src/assets/logos/`. Sans logo
  dans le dépôt, la carte affiche un monogramme (`initials`).
- **Liens** : uniquement des liens vérifiés. Un dépôt privé (`private: true`) n'a jamais de lien vers
  son code.
- **Carte cliquable** : le titre est un bouton dont la zone s'étend à toute la carte (`.work__open::after`) ;
  les liens de la carte passent au-dessus et restent utilisables séparément.

---

## 📜 Scroll Reveal

`useScrollReveal.js` (IntersectionObserver) ajoute `.revealed` une seule fois par élément :

| Classe | Effet |
|---|---|
| `.reveal` | Fondu + glissement vers le haut |
| `.reveal-left` / `.reveal-right` | Glissement latéral |
| `.reveal-scale` | Zoom in |

Délais : `.d1` à `.d6` (0,1 s à 0,6 s).

---

## ✉️ Formulaire de contact

EmailJS, avec état d'envoi (bouton désactivé) et toast de confirmation. Les identifiants EmailJS sont
publics par conception ; ils peuvent être surchargés par des variables d'environnement Vite :

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

---

## 🔍 SEO

- Métadonnées de base, Open Graph, Twitter Card (`summary_large_image`) et JSON-LD `Person` dans `index.html`.
- `usePageMeta` met à jour titre, description, canonical et balises OG à chaque changement de page.
- Pour régénérer `public/og-image.png`, faire une capture 1200×630 d'une page HTML dédiée
  (ex. Edge/Chrome headless : `--headless=new --window-size=1200,630 --screenshot=…`).

---

## ⚡ Performance

- Pages secondaires et sphère 3D (Three.js + GSAP) chargées en lazy loading : bundle initial ≈ 250 kB.
- Images en WebP redimensionnées (≈ 5 Mo → 0,6 Mo).
- La sphère ne réalloue aucun objet par frame et se met en pause hors écran.

---

## 📄 CV

Le CV téléchargeable est `src/assets/Mon_CV_Dev.pdf` (importé par `About.jsx`, proposé au
téléchargement sous le nom `CV_Daniel_Nagoloum_Talla_Fullstack.pdf`). Pour le mettre à jour,
remplacer ce fichier par le nouveau PDF en gardant le même nom.

> ⚠️ `cv/generate_cv.py` génère l'**ancienne** version du CV : l'exécuter écraserait le CV actuel.

---

## 🔗 Liens

- **Portfolio :** https://nagoloum.vercel.app
- **LinkedIn :** [linkedin.com/in/nagoloum](https://www.linkedin.com/in/nagoloum)
- **GitHub :** [github.com/Nagoloum](https://github.com/Nagoloum)
- **Contact :** nagoloumtalladanielparfait@gmail.com · 06 25 83 90 07

---

© 2026 Daniel Nagoloum Talla · Tous droits réservés
