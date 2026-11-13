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

Crée le dossier `<nom-du-projet>/` (minuscules, tirets, sans accent) avec EXACTEMENT ces 12 sous-dossiers
numérotés, même ceux qui resteront vides (mets un fichier `.gitkeep` dans un dossier vide). Un dossier vide ou un
fichier absent masque la section sur le site.

<nom-du-projet>/
├── 01-apercu/             infos.json, statut.txt, description.md, chiffres.json, logo.(png|webp|svg)
├── 02-github/             depot.txt
├── 03-situation/          situation.md
├── 04-galerie/            images (10 max)
├── 05-fonctionnement/     fonctionnement.json
├── 06-fonctionnalites/    fonctionnalites.json
├── 07-architecture/       architecture.json
├── 08-modelisation/       modelisation.json
├── 09-stack/              stack.json
├── 10-defis/              defis.json
├── 11-interface/          defis-interface.json
└── 12-liens/              liens.txt

Règles de contenu : le titre du projet commence par une majuscule. Si le dépôt est privé, seuls le code source (aucun lien github) et les données sensibles sont exclus : galerie, fonctionnement, architecture et tout le reste se remplissent normalement. Pour un dépôt privé, ne lis, ne recopie et n'écris JAMAIS de lien GitHub ni de donnée sensible (secret, e-mail, URL interne), même si je les ai saisis par erreur dans une consigne ou un fichier. Les listes (fonctionnement, fonctionnalites,
architecture, stack, defis, defis-interface) contiennent PLUSIEURS entrées, toutes réelles. La galerie contient 10
images au maximum, uniquement les écrans importants (la 11e n'est jamais lue). Chaque projet a un logo : ne le crée
pas, ne l'invente pas. Dis-moi s'il existe dans le dépôt et où, sinon demande-le-moi. Ne crée pas d'images : liste-moi les écrans à capturer.

Contenu de chaque fichier :

01-apercu/infos.json (objet, tous champs facultatifs) :
{ "titre": "", "categorie": "Full-Stack | Mobile | Frontend | Backend | IA | Outil...", "etiquette": "courte ligne
techno · statut · dépôt", "resume": "1 à 2 phrases pour la carte", "role": "mon rôle en une phrase", "ordre": 1,
"monogramme": "2 lettres si pas de logo", "pays": "", "langues": [""], "periode": "", "equipe": "", "deploiement": "" }
01-apercu/statut.txt : une seule ligne parmi  en-cours | termine | brouillon
01-apercu/description.md : présentation longue, 1 à 3 paragraphes (quoi, pour qui, état réel du projet).
01-apercu/chiffres.json : [{ "valeur": "505", "libelle": "endpoints API" }]  (4 chiffres max, comptés dans le code)
02-github/depot.txt : une seule ligne parmi  public | prive
03-situation/situation.md : exactement trois titres :
  ## Mise en situation
  ## Problème
  ## Solution
05-fonctionnement/fonctionnement.json : [{ "titre": "", "texte": "" }]  (étapes dans l'ordre)
06-fonctionnalites/fonctionnalites.json : [{ "icone": "uil-...", "titre": "", "texte": "" }]  (icônes Unicons)
07-architecture/architecture.json : [{ "icone": "uil-...", "libelle": "API", "texte": "technos et rôle de la brique" }]
08-modelisation/modelisation.json : { "intro": "", "entites": [{ "nom": "", "texte": "" }] }  (seulement s'il y a une base de données)
09-stack/stack.json : [{ "groupe": "Front", "elements": ["", ""] }]
10-defis/defis.json : [{ "titre": "", "texte": "" }]  (vraies difficultés techniques et comment elles ont été résolues)
11-interface/defis-interface.json : [{ "icone": "uil-...", "titre": "", "texte": "" }]  (uniquement s'il y a une interface)
12-liens/liens.txt : une ligne par lien vérifié, format  type | libellé | adresse   (type = demo ou github), exemple :
  demo | Voir le site | https://exemple.com
  github | GitHub | https://github.com/utilisateur/depot
  Lignes commençant par # = commentaire. Dépôt privé : aucun lien github. Ne mets que des liens réels.

Contraintes de forme : JSON valide (guillemets doubles, pas de virgule finale, UTF-8), fichiers texte en UTF-8.
Phrases courtes, un fait par phrase.

Quand tu as fini, réponds avec : 1) l'arborescence créée, 2) la liste des fichiers volontairement omis et pourquoi,
3) la liste des 10 captures d'écran au maximum les plus importantes à faire (dossier 04-galerie, nom de fichier = légende affichée,
format "01 - Titre de la capture.webp", 1600 px de large max), 4) les informations que seul moi peux fournir.
````

---

## Version pour un article de blog

````text
À partir du sujet suivant : <SUJET OU PROJET>, crée le dossier `<nom-de-l-article>/` (minuscules, tirets, sans accent)
pour mon blog, en français, ton naturel et personnel, sans tirets cadratins ni formules d'IA. Aucun chiffre non
vérifiable, et si l'article parle d'un projet, chaque fait doit être vérifiable dans son code.

<nom-de-l-article>/   (4 sous-dossiers, même vides, avec un `.gitkeep` si vide)
├── 01-infos/        infos.json { "titre": "", "categorie": "Pensée critique | Philosophie | Retour d'expérience | Actualité...",
│                    "date": "Novembre 2026", "dureeLecture": "5 min", "resume": "2 phrases", "tags": ["", ""],
│                    "icone": "uil-...", "ordre": 1 }  +  statut.txt : publie  (ou brouillon)
├── 02-couverture/   une image facultative (ne la crée pas, dis-moi quelle image conviendrait)
├── 03-article/      article.md : 5 à 7 paragraphes séparés par une ligne vide. Chaque paragraphe sauf le premier
│                    commence par un intertitre en gras suivi du texte : **Mon intertitre.** Le texte du paragraphe.
└── 04-points/       points.md facultatif : une puce "- " par ligne, remplace la liste "À retenir" par défaut

Le titre commence par une majuscule.

Termine par : l'arborescence créée et les points que seul moi peux vérifier.
````

## Version pour une étude, une expérience ou une certification

````text
Crée le dossier `<nom>/` (minuscules, tirets, sans accent) pour la frise de mon portfolio, à partir des
informations réelles que je te donne ou du document joint. N'invente aucune date, aucun établissement, aucune
adresse de vérification : si une info manque, omets le champ et dis-le moi. Français naturel, sans tirets cadratins.

<nom>/
├── 01-infos/infos.json   { "titre": "Intitulé exact", "details": "Établissement ou entreprise - précision",
│                  "dates": "2025 / 2026", "ordre": 1,
│                  "dateCourte": "sept. 2026",                       (expériences seulement)
│                  "verification": "https://adresse-de-verification" (certifications seulement, si elle existe) }
└── 02-certificat/<fichier>.pdf   (certifications : le certificat; ne le crée pas, dis-moi où le déposer)

Un dossier privé n'est pas une raison de cacher du contenu : seuls le code source et les données sensibles sont exclus (pas de lien github, pas de secret). Le dossier va dans content/etudes/, content/experiences/ ou content/certifications/. "ordre" 1 = en haut de la frise.
Termine par l'arborescence créée et ce que seul moi peux fournir.
````
