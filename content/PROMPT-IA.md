# Prompt à donner à une IA (dans le dépôt d'un projet quelconque)

Copier tout ce qui suit, le coller dans l'IA (Claude Code, Cursor, ChatGPT avec accès au code...) ouverte
sur le projet à présenter. Elle crée un dossier prêt à glisser dans `content/projets/` du portfolio.

---

````text
Tu vas lire ce projet (code, README, docs, package.json, schémas, tests, historique git) et produire un dossier
de présentation pour mon portfolio. Écris tout en français, ton naturel et concret, sans jargon creux, sans tirets
cadratins, sans formules marketing (booster, révolutionner, propulser, "sans effort"). N'invente RIEN : chaque chiffre,
fonctionnalité ou choix technique doit être vérifiable dans le code ou la documentation. Si une information est
introuvable, omets le fichier ou le champ correspondant au lieu de l'inventer. N'écris jamais de numéro de version de
techno ("React", pas "React 19"). Aucun secret, clé, e-mail ou donnée personnelle.

Crée le dossier `<nom-du-projet>/` (minuscules, tirets, sans accent) avec cette structure. Tous les fichiers sont
facultatifs : un fichier absent masque la section sur le site.

<nom-du-projet>/
├── infos.json
├── statut.txt
├── depot.txt
├── liens.txt
├── description.md
├── situation.md
├── chiffres.json
├── fonctionnement.json
├── fonctionnalites.json
├── architecture.json
├── modelisation.json
├── stack.json
├── defis.json
├── defis-interface.json
├── logo.(png|webp|svg)     <- ne le crée pas, dis-moi s'il existe dans le dépôt et où
└── galerie/                <- ne crée pas d'images, liste-moi les écrans à capturer (nom de fichier proposé)

Contenu de chaque fichier :

infos.json (objet, tous champs facultatifs) :
{ "titre": "", "categorie": "Full-Stack | Mobile | Frontend | Backend | IA | Outil...", "etiquette": "courte ligne
techno · statut · dépôt", "resume": "1 à 2 phrases pour la carte", "role": "mon rôle en une phrase", "ordre": 1,
"monogramme": "2 lettres si pas de logo", "pays": "", "langues": [""], "periode": "", "equipe": "", "deploiement": "" }

statut.txt : une seule ligne parmi  en-cours | termine | brouillon
depot.txt : une seule ligne parmi  public | prive
liens.txt : une ligne par lien vérifié, format  type | libellé | adresse   (type = demo ou github), exemple :
  demo | Voir le site | https://exemple.com
  github | GitHub | https://github.com/utilisateur/depot
  Lignes commençant par # = commentaire. Dépôt privé : aucun lien github. Ne mets que des liens réels.
description.md : présentation longue, 1 à 3 paragraphes (quoi, pour qui, état réel du projet).
situation.md : exactement trois titres :
  ## Mise en situation
  ## Problème
  ## Solution
chiffres.json : [{ "valeur": "505", "libelle": "endpoints API" }]  (4 chiffres max, comptés dans le code)
fonctionnement.json : [{ "titre": "", "texte": "" }]  (étapes dans l'ordre)
fonctionnalites.json : [{ "icone": "uil-...", "titre": "", "texte": "" }]  (icônes Unicons, ex. uil-shield-check)
architecture.json : [{ "icone": "uil-...", "libelle": "API", "texte": "technos et rôle de la brique" }]
modelisation.json : { "intro": "", "entites": [{ "nom": "", "texte": "" }] }  (seulement s'il y a une base de données)
stack.json : [{ "groupe": "Front", "elements": ["", ""] }]
defis.json : [{ "titre": "", "texte": "" }]  (vraies difficultés techniques rencontrées et comment elles ont été résolues)
defis-interface.json : [{ "icone": "uil-...", "titre": "", "texte": "" }]  (uniquement s'il y a une interface)

Contraintes de forme : JSON valide (guillemets doubles, pas de virgule finale, UTF-8), fichiers texte en UTF-8.
Phrases courtes, un fait par phrase.

Quand tu as fini, réponds avec : 1) l'arborescence créée, 2) la liste des fichiers volontairement omis et pourquoi,
3) la liste des captures d'écran à faire (nom de fichier = légende affichée, format "01 - Titre de la capture.webp",
1600 px de large max), 4) les informations que seul moi peux fournir.
````

---

## Version pour un article de blog

````text
À partir du sujet suivant : <SUJET OU PROJET>, crée le dossier `<nom-de-l-article>/` (minuscules, tirets, sans accent)
pour mon blog, en français, ton naturel et personnel, sans tirets cadratins ni formules d'IA. Aucun chiffre non
vérifiable, et si l'article parle d'un projet, chaque fait doit être vérifiable dans son code.

<nom-de-l-article>/
├── infos.json   { "titre": "", "categorie": "Pensée critique | Philosophie | Retour d'expérience | Actualité...",
│                  "date": "Novembre 2026", "dureeLecture": "5 min", "resume": "2 phrases", "tags": ["", ""],
│                  "icone": "uil-...", "ordre": 1 }
├── statut.txt   publie  (ou brouillon)
├── article.md   5 à 7 paragraphes séparés par une ligne vide. Chaque paragraphe sauf le premier commence par un
│                intertitre en gras suivi du texte : **Mon intertitre.** Le texte du paragraphe.
└── points.md    facultatif : une puce "- " par ligne, remplace la liste "À retenir" par défaut

Termine par : l'arborescence créée et les points que seul moi peux vérifier.
````

## Version pour une étude, une expérience ou une certification

````text
Crée le dossier `<nom>/` (minuscules, tirets, sans accent) pour la frise de mon portfolio, à partir des
informations réelles que je te donne ou du document joint. N'invente aucune date, aucun établissement, aucune
adresse de vérification : si une info manque, omets le champ et dis-le moi. Français naturel, sans tirets cadratins.

<nom>/
├── infos.json   { "titre": "Intitulé exact", "details": "Établissement ou entreprise - précision",
│                  "dates": "2025 / 2026", "ordre": 1,
│                  "dateCourte": "sept. 2026",                       (expériences seulement)
│                  "verification": "https://adresse-de-verification" (certifications seulement, si elle existe) }
└── <fichier>.pdf   (certifications : le certificat; ne le crée pas, dis-moi où le déposer)

Le dossier va dans content/etudes/, content/experiences/ ou content/certifications/. "ordre" 1 = en haut de la frise.
Termine par l'arborescence créée et ce que seul moi peux fournir.
````
