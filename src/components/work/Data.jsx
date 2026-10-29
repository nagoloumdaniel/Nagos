import allibuyLogo  from '../../assets/logos/allibuy.webp';
import campaignLogo from '../../assets/logos/campaign-mailer.svg';
import cynaLogo     from '../../assets/logos/cyna.webp';

/*
  Projets détaillés d'après les dépôts et les cahiers des charges.
  Chaque champ est facultatif : la page projet n'affiche une section que si
  son champ est renseigné (voir SECTIONS dans ProjectPage.jsx).
  - `private`      : dépôt privé, aucun lien vers le code, pas de statistiques GitHub.
  - `wip`          : projet en cours de développement (badge « En cours »).
  - `repos`        : noms des dépôts GitHub dont on agrège commits / branches / contributeurs.
  - `monogram`     : initiales affichées quand il n'y a pas de logo.
  - `meta`         : pays, langues, période, équipe, déploiement.
  - `figures`      : chiffres clés (valeur + libellé).
  - `situation`    : mise en situation, problème, solution.
  - `howItWorks`   : fonctionnement, étape par étape.
  - `features`     : fonctionnalités, avec icône Unicons.
  - `architecture` : briques du projet.
  - `modeling`     : modélisation des données (intro + entités).
  - `stack`        : technologies groupées.
  - `challenges`   : difficultés rencontrées pendant le développement.
  - `uiChallenges` : défis d'interface.
  - `links`        : liens vérifiés. `kind` = 'demo' | 'github'.
*/
export const projectsData = [
  /* ───────────────────────── ALLIBUY ───────────────────────── */
  {
    id: 'allibuy',
    title: 'Allibuy',
    category: 'Full-Stack',
    status: 'Web & Mobile · dépôt privé',
    private: true,
    logo: allibuyLogo,
    summary: "Marketplace multi-vendeurs internationale, semblable à Amazon ou Alibaba, adaptée au marché africain.",
    overview: "Allibuy est une marketplace multi-vendeurs pensée pour l'international (FCFA, EUR, USD, numéros de tous pays) et adaptée au marché africain, comme le seraient Amazon ou Alibaba. Tout vit dans un monorepo : une API NestJS, un site Next.js, quatre applications Expo (acheteur, vendeur, livreur, administration) et des paquets partagés pour les types et les validateurs Zod.",
    role: null,
    meta: {
      country: 'International, pensé pour le marché africain',
      languages: ['Français', 'Anglais'],
      hosting: 'Monorepo : API, web, mobile',
    },
    figures: [
      { value: '100+', label: 'modèles Prisma' },
      { value: '870+', label: 'tests backend' },
      { value: '4', label: 'applications Expo' },
      { value: '3', label: 'devises (FCFA, EUR, USD)' },
    ],
    features: [
      { icon: 'uil-users-alt', title: 'Quatre rôles', text: 'Acheteur, vendeur, livreur et administration, avec un RBAC stocké en base.' },
      { icon: 'uil-shield-check', title: 'Sécurité côté base', text: "Row-level security PostgreSQL, triggers et journal d'audit." },
      { icon: 'uil-wallet', title: 'Escrow et wallet', text: 'Escrow des paiements et wallet vendeur.' },
      { icon: 'uil-search-alt', title: 'Recherche et temps réel', text: 'Recherche Meilisearch, files de tâches Redis / BullMQ, temps réel Socket.io.' },
      { icon: 'uil-sitemap', title: 'Types partagés', text: "Types et schémas Zod partagés entre le web, le mobile et l'API." },
      { icon: 'uil-mobile-android', title: 'Mobile money', text: "Paiement mobile money en cours d'intégration (adaptateur verrouillé jusqu'à validation en bac à sable)." },
    ],
    architecture: [
      { icon: 'uil-server', label: 'API', text: 'NestJS, Prisma, PostgreSQL' },
      { icon: 'uil-desktop', label: 'Web', text: 'Next.js 15, React 19' },
      { icon: 'uil-mobile-android-alt', label: 'Mobile', text: 'Quatre applications Expo (acheteur, vendeur, livreur, administration)' },
      { icon: 'uil-package', label: 'Paquets partagés', text: 'Types et validateurs Zod communs' },
    ],
    challenges: [
      { title: 'Autorisations fiables', text: "Les droits ne reposent pas seulement sur l'API : le RBAC est stocké en base et renforcé par la row-level security PostgreSQL, les triggers et un journal d'audit." },
      { title: 'Un contrat unique', text: "Web, mobile et API partagent les mêmes types et schémas Zod dans un seul monorepo." },
      { title: 'Paiements prudents', text: "Escrow des paiements, et adaptateur mobile money verrouillé jusqu'à validation en bac à sable." },
    ],
    stack: [
      { label: 'Front', items: ['Next.js 15', 'React 19', 'Expo (React Native)'] },
      { label: 'Back', items: ['NestJS', 'Prisma', 'PostgreSQL'] },
      { label: 'Services', items: ['Redis / BullMQ', 'Meilisearch', 'Socket.io', 'Docker'] },
    ],
    links: [],
  },

  /* ───────────────────────── ZOLYA ───────────────────────── */
  {
    id: 'zolya',
    title: 'Zolya',
    category: 'Mobile',
    status: 'Flutter · NestJS · dépôt privé',
    private: true,
    wip: true,
    monogram: 'Z',
    summary: "Marketplace de vêtements de seconde main entre particuliers au Cameroun, avec paiement Mobile Money sécurisé par séquestre et livraison dédiée.",
    overview: "Zolya met en relation vendeurs et acheteurs de vêtements d'occasion à Douala et Yaoundé. L'argent de l'acheteur reste bloqué en séquestre jusqu'à la réception de l'article, et une application dédiée aux livreurs (Zolya Delivery) assure le dernier kilomètre. Le code est quasiment complet ; l'application se prépare à la publication et n'est pas encore sur les stores.",
    role: "Projet personnel de bout en bout : produit, architecture, API, applications mobiles et administration web. Développé en solo, avec l'assistance de Claude.",
    repos: ['Zolya'],
    meta: {
      country: 'Cameroun (Douala, Yaoundé)',
      languages: ['Français', 'Anglais'],
      period: 'Depuis mai 2026',
      team: 'Solo, assisté par IA',
      hosting: 'En préparation à la publication (pas encore sur les stores)',
    },
    figures: [
      { value: '2', label: 'applications Flutter' },
      { value: '52', label: 'modèles Prisma' },
      { value: '~143', label: 'endpoints REST' },
      { value: '350+', label: 'tests (backend et Flutter)' },
    ],
    situation: {
      context: "Au Cameroun, la seconde main se vend surtout sur des groupes de réseaux sociaux et par messagerie. Les deux parties se connaissent rarement, on paie souvent à l'avance par Mobile Money (MTN, Orange), et la livraison se négocie à la main.",
      problem: "Un acheteur qui paie d'avance risque de ne rien recevoir, un vendeur qui expédie d'abord risque de ne pas être payé. La confiance repose sur la réputation de chacun, la livraison n'est ni suivie ni garantie, et il n'existe pas de catalogue fiable pour comparer les annonces.",
      solution: "Zolya bloque le paiement en séquestre et ne le libère qu'à la réception, confirmée par un code. Les annonces sont structurées (catégories, tailles, état, photos), la livraison est organisée et suivie par des livreurs partenaires, et un back-office traite litiges, retraits et modération.",
    },
    howItWorks: [
      { title: "Publication d'une annonce", text: "Le vendeur photographie son article, renseigne catégorie, taille et état, et fixe son prix. Les photos partent dans Supabase Storage." },
      { title: 'Achat et séquestre', text: "L'acheteur paie par Mobile Money via Campay. Le montant est inscrit dans un grand livre à double entrée immuable et reste bloqué." },
      { title: 'Livraison par paliers', text: "Quatre paliers de livraison selon la distance. Une offre est proposée séquentiellement aux livreurs, avec un repli après 20 minutes." },
      { title: 'Codes de remise', text: "Le code de collecte (vendeur → livreur) et le code de réception (livreur → acheteur) sont hachés en base et vérifiés côté serveur." },
      { title: 'Libération des fonds', text: "À la réception confirmée, la commission est prélevée (10 % + 500 XAF jusqu'à 10 000 XAF, puis 5 % + 500 XAF) et le reste va au portefeuille du vendeur. Sans action sous 48 h, la commande s'annule automatiquement." },
    ],
    features: [
      { icon: 'uil-lock-alt', title: 'Paiement en séquestre', text: "Mobile Money MTN et Orange via Campay, grand livre à double entrée immuable." },
      { icon: 'uil-truck', title: 'Zolya Delivery', text: "Application livreur dédiée : offres séquentielles, repli automatique, preuves de remise par code." },
      { icon: 'uil-shield-check', title: "Administration web", text: "Back-office Next.js avec RBAC (26 permissions), 2FA TOTP, litiges, retraits et modération." },
      { icon: 'uil-bell', title: 'Notifications', text: 'Push FCM et SMS Twilio, files de tâches BullMQ pour les envois.' },
      { icon: 'uil-globe', title: 'Bilingue', text: 'Interface en français et en anglais, avec libellés centralisés.' },
      { icon: 'uil-moon', title: 'Clair et sombre', text: "Thème clair et sombre, cibles tactiles de 44 px minimum, contrastes visés WCAG AA." },
    ],
    architecture: [
      { icon: 'uil-mobile-android-alt', label: 'apps/marketplace', text: 'Application Flutter acheteur / vendeur' },
      { icon: 'uil-truck', label: 'apps/delivery', text: 'Application Flutter livreur' },
      { icon: 'uil-desktop', label: 'apps/admin-web', text: 'Administration Next.js 15' },
      { icon: 'uil-package', label: 'packages', text: 'zolya_core, zolya_api_client, zolya_design (partagés entre les apps)' },
      { icon: 'uil-server', label: 'backend', text: 'NestJS 10, Prisma, PostgreSQL 16, BullMQ / Redis' },
    ],
    modeling: {
      intro: "Le schéma Prisma compte 52 modèles, 21 enums et 12 migrations. Le point central est le grand livre : chaque mouvement d'argent est une écriture, jamais une mise à jour de solde.",
      entities: [
        { name: 'User / Profile', text: "Comptes, rôles et profils vendeur, acheteur, livreur." },
        { name: 'Listing', text: "Annonces : catégorie, taille, état, prix, photos." },
        { name: 'Order', text: "Commande et machine d'états (paiement, collecte, livraison, réception, annulation)." },
        { name: 'LedgerEntry', text: "Écritures du grand livre à double entrée, immuables." },
        { name: 'DeliveryOffer', text: "Offres envoyées aux livreurs, avec délai et repli." },
        { name: 'Dispute / Payout', text: "Litiges ouverts par les parties et retraits des vendeurs." },
      ],
    },
    stack: [
      { label: 'Mobile', items: ['Flutter 3.41', 'Dart 3.11', 'BLoC', 'Clean architecture'] },
      { label: 'Web admin', items: ['Next.js 15'] },
      { label: 'Back', items: ['NestJS 10', 'Prisma 5', 'PostgreSQL 16', 'BullMQ', 'Redis 7'] },
      { label: 'Services', items: ['Campay (Mobile Money)', 'Supabase Storage', 'Firebase FCM', 'Twilio'] },
    ],
    challenges: [
      { title: "Un argent qui ne se perd jamais", text: "Les soldes ne se modifient pas : chaque mouvement est une écriture immuable dans un grand livre à double entrée. On peut ainsi rejouer l'historique et prouver un solde." },
      { title: 'Des codes qui ne fuient pas', text: "Les codes de collecte et de réception sont hachés et vérifiés côté serveur, pour qu'une base copiée ne permette pas de valider une livraison." },
      { title: "Une livraison sans disponibilité garantie", text: "Les offres sont proposées l'une après l'autre avec un repli après 20 minutes, puis une annulation automatique après 48 h si rien n'avance." },
      { title: "CI bloquée au niveau du compte", text: "GitHub Actions est désactivé sur le compte. La vérification passe par un script local, avec GitLab CI et Codemagic comme solutions de repli." },
      { title: "Dette de documentation", text: "Plusieurs documents internes ont vieilli par rapport au code (nombre de modèles, guide d'interfaces). Le code et les migrations font foi." },
    ],
    uiChallenges: [
      { icon: 'uil-palette', title: 'Identité or et noir', text: "Dégradés or sur fond noir, effets de verre, icônes Lucide, avec une migration vers un système de design partagé (zolya_design)." },
      { icon: 'uil-eye', title: 'Accessibilité', text: "Correction de contraste (texte secondaire), cibles tactiles de 44 px, 31 libellés anglais codés en dur traduits." },
      { icon: 'uil-shield-exclamation', title: 'Interface honnête', text: "Un faux assistant de support a été remplacé par un vrai chat, pour ne pas laisser croire à un humain." },
    ],
    links: [],
  },

  /* ───────────────────────── FINDIT ───────────────────────── */
  {
    id: 'findit',
    title: 'Findit',
    category: 'Full-Stack',
    status: 'Web · en production',
    wip: true,
    monogram: 'FI',
    summary: "Agent autonome qui découvre, collecte, déduplique et publie des offres d'emploi partout en France, avec un espace candidat (CV, matching, lettres).",
    overview: "Findit lit le web comme un candidat le ferait, mais à grande échelle : un orchestrateur LLM décide quoi chercher, des outils déterministes collectent et extraient, puis les offres dédupliquées sont publiées sur un site public. Les candidats déposent leur CV, obtiennent un matching et génèrent CV et lettres adaptés.",
    role: "Projet personnel de bout en bout : produit, agent, API, web et déploiement. Développé en solo, avec l'assistance de Claude.",
    repos: ['Findit'],
    meta: {
      country: 'France entière',
      languages: ['Français'],
      period: 'Depuis juillet 2026',
      team: 'Solo, assisté par IA',
      hosting: 'Vercel (web et API), Railway (worker)',
    },
    figures: [
      { value: '284', label: 'commits en 3 mois' },
      { value: '38', label: 'modèles Prisma' },
      { value: '6', label: 'types de contrat' },
      { value: '19', label: 'paquets dans le monorepo' },
    ],
    situation: {
      context: "Chercher une alternance, un stage ou un CDI oblige à parcourir une dizaine de sites : jobboards, pages carrières, agrégateurs d'ATS. Les mêmes offres reviennent partout, parfois périmées, et chaque site a ses propres filtres.",
      problem: "Aucune source ne couvre tout, les doublons noient le signal, et un agrégateur « tout automatique » coûte vite cher en appels LLM et pose des questions juridiques sur ce qu'on a le droit de lire.",
      solution: "Un agent mixte : le LLM orchestre et décide, mais les outils sont déterministes (API France Travail, flux d'ATS, JSON-LD, Cheerio, Playwright). Un registre de conformité en base dit quelles sources sont autorisées, un garde-fou de budget plafonne les coûts, et le robots.txt est respecté.",
    },
    howItWorks: [
      { title: 'Découverte', text: "L'orchestrateur planifie des recherches (Brave Search, Apify, API France Travail) et repère des sources d'offres par métier et par zone." },
      { title: 'Collecte', text: "Les files BullMQ lancent des extracteurs : JSON-LD en cascade, ATS agrégés, Cheerio, puis Playwright en dernier recours." },
      { title: 'Normalisation et dédoublonnage', text: "Chaque offre est ramenée à un modèle commun (contrat, lieu, entreprise) puis comparée aux offres déjà connues." },
      { title: 'Publication', text: "Les offres validées apparaissent sur le site public, filtrables par type de contrat." },
      { title: 'Espace candidat', text: "Le candidat dépose son CV, reçoit un score de correspondance et peut générer un CV et une lettre au format PDF ou Word." },
    ],
    features: [
      { icon: 'uil-search-alt', title: 'Six types de contrat', text: 'Alternance, stage, CDI, CDD, intérim et job étudiant.' },
      { icon: 'uil-robot', title: 'Orchestrateur LLM', text: "DeepSeek décide du plan, des outils déterministes exécutent." },
      { icon: 'uil-balance-scale', title: 'Conformité en base', text: "Un registre indique le statut d'accès de chaque source, et le robots.txt est respecté." },
      { icon: 'uil-dollar-alt', title: 'Garde-fou de budget', text: "Plafonds de coût par exécution, mesurés en micro-dollars." },
      { icon: 'uil-file-alt', title: 'CV et lettres', text: "Génération en PDF (@react-pdf/renderer) et en Word (docx)." },
      { icon: 'uil-chart-growth', title: 'Tableau de bord agent', text: "Suivi des exécutions, des coûts et des sources." },
    ],
    architecture: [
      { icon: 'uil-desktop', label: 'apps/web', text: 'Next.js 16, React 19' },
      { icon: 'uil-server', label: 'apps/api', text: 'NestJS 11 sur Fastify 5' },
      { icon: 'uil-processor', label: 'apps/worker', text: 'Agent et files BullMQ (Railway)' },
      { icon: 'uil-package', label: 'packages', text: '19 paquets partagés (domaine, extracteurs, outils, UI)' },
      { icon: 'uil-database', label: 'Données', text: 'Neon PostgreSQL via Prisma 7, Redis' },
    ],
    modeling: {
      intro: "38 modèles Prisma et 33 migrations. Le modèle sépare ce que l'agent découvre (sources, exécutions) de ce qui est publié (offres) et de ce qui appartient au candidat (profils, CV).",
      entities: [
        { name: 'Source / SourceAccessStatus', text: "Source d'offres et statut de conformité d'accès, consulté avant toute collecte." },
        { name: 'AgentRun', text: "Une exécution de l'agent : plan, outils appelés, coût en micro-dollars." },
        { name: 'JobOffer', text: "Offre normalisée : contrat, lieu, entreprise, empreinte de déduplication." },
        { name: 'Company', text: "Entreprise rattachée à plusieurs offres." },
        { name: 'CandidateProfile / Cv', text: "Profil du candidat, CV importés et générés." },
        { name: 'Match', text: "Score de correspondance entre un profil et une offre." },
      ],
    },
    stack: [
      { label: 'Front', items: ['Next.js 16', 'React 19'] },
      { label: 'Back', items: ['NestJS 11', 'Fastify 5', 'BullMQ 5', 'Prisma 7'] },
      { label: 'Données', items: ['Neon PostgreSQL', 'Redis'] },
      { label: 'Agent', items: ['DeepSeek', 'Brave Search', 'Apify', 'API France Travail', 'Cheerio', 'Playwright'] },
      { label: 'Outillage', items: ['TypeScript', 'Turborepo', 'pnpm', 'Vitest', 'Playwright'] },
    ],
    challenges: [
      { title: "Coût de l'agent", text: "Les premières exécutions coûtaient plusieurs milliers de micro-dollars. Après plan plus court et outils déterministes, le coût d'une exécution est passé de 5 419 à 782 µ$." },
      { title: "Boucles de planification", text: "L'orchestrateur pouvait replanifier en boucle. Il a fallu borner les itérations et rendre les décisions vérifiables." },
      { title: 'Routage sur Vercel', text: "Le routage à segment unique de Vercel a imposé des fichiers de relais pour exposer l'API proprement." },
      { title: "Agrégateurs d'ATS", text: "Les offres d'un même ATS vivent sous des sous-domaines clients différents : il a fallu énumérer les tenants plutôt que de scraper chaque site." },
      { title: 'Tableau de bord ouvert', text: "Le tableau de bord de l'agent était accessible sans authentification. Il est maintenant protégé par un proxy d'authentification." },
      { title: 'Fuite de clé', text: "Une clé a été exposée par erreur. Elle a été révoquée et remplacée, et la procédure de gestion des secrets a été durcie." },
    ],
    uiChallenges: [
      { icon: 'uil-filter', title: 'Filtres lisibles', text: "Six types de contrat, des lieux et des dates à combiner sans noyer l'utilisateur." },
      { icon: 'uil-file-edit-alt', title: 'Génération de documents', text: "Un même contenu doit sortir proprement en PDF et en Word." },
    ],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://finditfr.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/Findit' },
    ],
  },

  /* ───────────────────────── TRADINGAGENT ───────────────────────── */
  {
    id: 'tradingagent',
    title: 'TradingAgent',
    category: 'Full-Stack',
    status: 'Python · open source · démo uniquement',
    wip: true,
    monogram: 'TA',
    summary: "Plateforme de trading algorithmique sur XAUUSD et BTCUSD : recherche de stratégies, backtests, garde-fous de risque et tableau de bord, sur compte de démonstration.",
    overview: "TradingAgent (tableau de bord « NexaGold ») est un laboratoire de stratégies. L'IA y cherche et améliore des stratégies ; elle ne décide pas de chaque trade et ne peut que rejeter. Une chaîne de portes de promotion et de contrôles de risque sépare une idée d'un ordre. Le projet est en pré-production : compte de démonstration MetaTrader 5 uniquement, mode réel non activé, conformité non vérifiée.",
    role: "Projet personnel de bout en bout. Développé en solo, avec l'assistance de Claude.",
    repos: ['TradingAgent'],
    meta: {
      country: 'France (opérateur résident en France)',
      languages: ['Français (docs et interface)', 'Anglais (code)'],
      period: 'Depuis octobre 2026',
      team: 'Solo, assisté par IA',
      hosting: 'Site vitrine sur Vercel ; application locale sous Windows',
    },
    figures: [
      { value: '2 789', label: 'tests réussis (rapport du 10 oct.)' },
      { value: '23', label: 'tables, 9 migrations' },
      { value: '17', label: 'contrôles de risque' },
      { value: '9', label: 'portes de promotion' },
    ],
    situation: {
      context: "Tester une idée de trading prend vite l'allure d'un pari : un backtest flatteur, quelques trades gagnants, et la conviction d'avoir trouvé un edge. Les erreurs classiques sont le sur-ajustement, le biais de sélection et l'absence de garde-fous quand l'argent est réel.",
      problem: "Comment explorer des stratégies sans se mentir ? Il faut des résultats reproductibles, un contrôle du risque indépendant du modèle, et une IA qui aide à chercher sans pouvoir déclencher des ordres de son propre chef.",
      solution: "Une chaîne stricte : recherche et amélioration par l'IA, backtests, validation hors échantillon, jeu de test scellé, puis portes de promotion. Les contrôles de risque s'appliquent avant tout ordre, et l'IA ne peut que rejeter une proposition. Les résultats sont publiés tels quels, y compris les échecs.",
    },
    howItWorks: [
      { title: 'Recherche', text: "L'IA propose et améliore des stratégies à partir de la bibliothèque (trois stratégies) et de l'historique de marché." },
      { title: 'Backtest et validation', text: "Backtest sur historique, puis validation hors échantillon, puis jeu de test scellé jamais utilisé pour l'optimisation." },
      { title: 'Portes de promotion', text: "Neuf portes décident si une version peut passer en démonstration : facteur de profit minimal de 1,20, volume d'échantillon, stabilité." },
      { title: 'Contrôles de risque', text: "17 contrôles s'appliquent avant chaque ordre (exposition, perte journalière, spread, horaires…). L'IA ne peut que rejeter." },
      { title: 'Exécution et suivi', text: "Ordres sur compte de démonstration MetaTrader 5, deux conseillers experts MQL5 de garde, tableau de bord web avec flux temps réel (SSE) et alertes Telegram." },
    ],
    features: [
      { icon: 'uil-chart-line', title: 'XAUUSD et BTCUSD', text: "Périmètre volontairement réduit à deux instruments." },
      { icon: 'uil-shield-check', title: 'Garde-fous de risque', text: "17 contrôles et deux conseillers experts MQL5 de garde." },
      { icon: 'uil-brain', title: "IA qui ne fait que rejeter", text: "L'IA recherche et améliore, mais ne décide pas de chaque trade." },
      { icon: 'uil-dashboard', title: 'Tableau de bord', text: "Dix pages web, flux temps réel (SSE), thèmes clair et sombre." },
      { icon: 'uil-telegram-alt', title: 'Alertes', text: "Notifications Telegram." },
      { icon: 'uil-clipboard-notes', title: 'Rapports honnêtes', text: "Résultats publiés avec leurs limites, y compris les échecs." },
    ],
    architecture: [
      { icon: 'uil-server', label: 'API & tableau de bord', text: 'FastAPI, Uvicorn, Jinja2, SSE' },
      { icon: 'uil-processor', label: 'Moteur', text: 'Stratégies, backtests, risque, portes de promotion' },
      { icon: 'uil-chart-bar', label: 'Exécution', text: 'MetaTrader 5 (Windows) et deux EA MQL5' },
      { icon: 'uil-database', label: 'Données', text: 'PostgreSQL (Supabase), SQLAlchemy 2, Alembic' },
      { icon: 'uil-globe', label: 'Site vitrine', text: 'Dossier site/ déployé sur Vercel' },
    ],
    modeling: {
      intro: "23 tables et 9 migrations Alembic. Le modèle suit le cycle de vie d'une stratégie, de sa version à ses ordres et à ses rapports.",
      entities: [
        { name: 'Strategy / StrategyVersion', text: "Une stratégie et ses versions successives, chacune évaluée séparément." },
        { name: 'BacktestRun', text: "Résultats d'un backtest : métriques, période, paramètres." },
        { name: 'PromotionGate', text: "Décisions des portes de promotion pour une version." },
        { name: 'Order / Position', text: "Ordres et positions sur le compte de démonstration." },
        { name: 'RiskEvent', text: "Rejets et alertes issus des contrôles de risque." },
      ],
    },
    stack: [
      { label: 'Back', items: ['Python 3.12', 'FastAPI', 'Pydantic', 'SQLAlchemy 2', 'Alembic'] },
      { label: 'Données', items: ['PostgreSQL (Supabase)', 'psycopg'] },
      { label: 'Trading', items: ['MetaTrader 5', 'MQL5'] },
      { label: 'IA & alertes', items: ['Anthropic API', 'python-telegram-bot'] },
      { label: 'Qualité', items: ['pytest', 'mypy', 'ruff', 'pre-commit', 'GitHub Actions'] },
    ],
    challenges: [
      { title: 'API de courtage indisponible', text: "Deriv n'est pas accessible depuis la France : l'exécution est passée sur MetaTrader 5, ce qui limite l'application à Windows." },
      { title: 'Réduire le périmètre', text: "Le projet a été ramené à deux instruments, XAUUSD et BTCUSD, pour pouvoir valider sérieusement plutôt que survoler beaucoup de marchés." },
      { title: 'Ne pas se mentir', text: "Tous les backtests finissent sous le seuil de 1,20. Une version validée à 1,0275 sur BTC tombe à 0,6909 sur le jeu scellé. La démonstration (22 trades, +14,90 EUR) n'est pas statistiquement significative." },
      { title: 'Séparer IA et décision', text: "L'IA ne peut que rejeter : la décision d'envoyer un ordre reste déterministe et testable." },
      { title: 'Documentation périmée', text: "Le fichier CLAUDE.md décrivait encore l'ancienne architecture Deriv. Il est signalé comme obsolète." },
    ],
    uiChallenges: [
      { icon: 'uil-dashboard', title: 'Densité sans bruit', text: "Un tableau de bord financier montre beaucoup de chiffres : hiérarchie, états vides et alertes doivent rester lisibles." },
      { icon: 'uil-exclamation-triangle', title: 'Ne pas survendre', text: "Les captures utilisent des données de démonstration fictives, et l'interface indique l'état de conformité « non vérifié »." },
    ],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://nexagold.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/TradingAgent' },
    ],
  },

  /* ───────────────────────── BUILDIT ───────────────────────── */
  {
    id: 'buildit',
    title: 'BuildIt',
    category: 'Outils développeur',
    status: 'TypeScript · open source · pré-alpha',
    wip: true,
    monogram: 'BI',
    summary: "« Development Environment Factory » : une CLI (pf) et un configurateur web qui assemblent un environnement de développement cohérent à partir d'un registre de technologies.",
    overview: "BuildIt (moteur « Forge ») décrit un projet par un manifeste, vérifie que les technologies choisies sont compatibles entre elles, puis génère la structure. La CLI s'appelle pf (@nagoloum/cli) ; un configurateur Next.js guide la sélection en 12 étapes sur 18 écrans. Le projet est en pré-alpha.",
    role: "Projet personnel de bout en bout. Développé principalement en solo, avec l'assistance de Claude.",
    repos: ['BuildIt'],
    meta: {
      country: 'France (outil international)',
      languages: ['Français', 'Anglais'],
      period: 'Depuis septembre 2026',
      team: 'Solo, assisté par IA',
      hosting: 'Pas de déploiement public confirmé',
    },
    figures: [
      { value: '299', label: 'entrées dans le registre' },
      { value: '37', label: 'catégories' },
      { value: '4', label: 'préréglages certifiés' },
      { value: '182', label: 'fichiers de test' },
    ],
    situation: {
      context: "Démarrer un projet demande des dizaines de décisions : framework, base, ORM, tests, lint, CI, déploiement. Chaque équipe les reprend à zéro ou copie un gabarit déjà vieux.",
      problem: "Les choix ne sont pas indépendants : une technologie en exclut une autre, une version impose une version. Un gabarit statique ne le sait pas, et ne dit pas pourquoi une combinaison est bonne ou non.",
      solution: "Trois couches séparées : un manifeste (ce que veut l'utilisateur), un registre (ce qui existe, certifié ou seulement déclaré) et des règles de compatibilité. Le moteur vérifie la cohérence avant de générer, et explique les conflits.",
    },
    howItWorks: [
      { title: 'Choix', text: "On part d'un préréglage certifié (saas, dashboard, api, fullstack) ou on compose son stack dans le configurateur." },
      { title: 'Manifeste', text: "Les choix sont enregistrés dans un manifeste validé par zod." },
      { title: 'Compatibilité', text: "Le moteur confronte le manifeste au registre et applique les règles de compatibilité cumulatives par catégorie." },
      { title: 'Génération', text: "La CLI pf produit la structure du projet et l'outillage associé." },
      { title: 'Diagnostic', text: "Project Doctor note l'état du projet généré (89/100 sur le dépôt lui-même)." },
    ],
    features: [
      { icon: 'uil-terminal', title: 'CLI pf', text: "@nagoloum/cli, version 0.5.0 dans le dépôt." },
      { icon: 'uil-window-grid', title: 'Configurateur web', text: "18 écrans et un parcours en 12 étapes, en français et en anglais." },
      { icon: 'uil-books', title: 'Registre', text: "299 entrées sur 37 catégories, dont 32 certifiées et 267 déclarées." },
      { icon: 'uil-check-circle', title: 'Compatibilité', text: "Règles cumulatives par catégorie et règles d'écosystème." },
      { icon: 'uil-heart-rate', title: 'Project Doctor', text: "Diagnostic chiffré de l'état d'un projet." },
      { icon: 'uil-swatchbook', title: 'Design « Forge »', text: "Accent orange et cyan acier, Inter et JetBrains Mono." },
    ],
    architecture: [
      { icon: 'uil-package', label: 'packages', text: '13 paquets (moteur, registre, règles, CLI…)' },
      { icon: 'uil-desktop', label: 'apps/web', text: 'Configurateur Next.js 15' },
      { icon: 'uil-terminal', label: 'CLI', text: 'pf, construite avec tsdown' },
      { icon: 'uil-layer-group', label: 'Trois couches', text: 'Manifeste, registre et compatibilité' },
    ],
    modeling: {
      intro: "BuildIt n'a pas de base de données : le modèle vit dans des schémas zod et des fichiers de registre versionnés.",
      entities: [
        { name: 'Manifest', text: "Ce que l'utilisateur veut : projet, catégories, choix." },
        { name: 'RegistryEntry', text: "Une technologie : catégorie, versions, statut certifié ou déclaré." },
        { name: 'CompatibilityRule', text: "Règle entre entrées : exclusion, exigence, version minimale." },
        { name: 'Preset', text: "Combinaison certifiée prête à l'emploi." },
      ],
    },
    stack: [
      { label: 'Langage', items: ['TypeScript', 'Node.js ≥ 20.11'] },
      { label: 'Monorepo', items: ['pnpm', 'Turborepo', 'tsdown', 'changesets'] },
      { label: 'Web', items: ['Next.js 15', 'React 19', 'Tailwind CSS 4'] },
      { label: 'Qualité', items: ['Vitest', 'Biome', 'zod 4', 'lefthook', 'commitlint', 'secretlint'] },
    ],
    challenges: [
      { title: 'Compatibilité cumulative', text: "L'audit a montré que 14 catégories se cumulent plutôt que de s'exclure ; les règles ont été réécrites et une règle d'écosystème a été ajoutée." },
      { title: 'Certifié ou seulement déclaré', text: "Seules 32 entrées sur 299 sont certifiées. L'interface doit le dire clairement plutôt que de laisser croire que tout est testé." },
      { title: 'Registre qui grossit', text: "Les compteurs de la documentation (283) ont divergé du registre réel (299) ; le registre fait foi." },
      { title: 'CI GitHub dormante', text: "La vérification passe en local (lefthook) ; les workflows GitHub restent inactifs." },
    ],
    uiChallenges: [
      { icon: 'uil-sliders-v-alt', title: 'Un parcours en 12 étapes', text: "Un grand nombre de choix à présenter sans submerger, avec un graphe de dépendances." },
      { icon: 'uil-palette', title: 'Identité Forge', text: "Orange et cyan acier, deux thèmes, états d'erreur explicites plutôt que des squelettes de chargement." },
    ],
    links: [
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/BuildIt' },
    ],
  },

  /* ───────────────────────── MAILFIND ───────────────────────── */
  {
    id: 'mailfind',
    title: 'MailFind',
    category: 'Full-Stack',
    status: 'Web · bêta fermée',
    wip: true,
    monogram: 'MF',
    summary: "Transforme une liste d'entreprises (CSV) en adresses e-mail professionnelles classées, avec la source, le statut de vérification et le score de chaque adresse.",
    overview: "MailFind part d'un CSV d'entreprises, lit leurs sites, cherche les adresses publiées, enrichit et contrôle chacune, puis exporte ou envoie la liste en campagne brouillon dans Campaign Mailer. Le principe : chaque adresse a une source, et une adresse non vérifiée n'est jamais présentée comme vérifiée. Le code est public mais propriétaire (tous droits réservés).",
    role: "Projet personnel de bout en bout, conçu en complément de Campaign Mailer. Développé avec l'assistance de Claude.",
    repos: ['MailFind'],
    meta: {
      country: 'France d’abord (SIREN, API Recherche d’entreprises)',
      languages: ['Français'],
      period: 'Septembre – octobre 2026',
      team: 'Solo, assisté par IA',
      hosting: 'Vercel (web), Railway (API et worker), Neon, Redis Cloud, Cloudflare R2',
    },
    figures: [
      { value: '636', label: 'adresses relevées à la recette (100 lignes)' },
      { value: '5 min 42', label: 'pour 99 entreprises' },
      { value: '18', label: 'migrations, 26 tables' },
      { value: '~800', label: 'cas de test' },
    ],
    situation: {
      context: "Quand on cherche une alternance, des clients ou des contacts, on passe l'essentiel du temps à trouver à qui écrire : ouvrir le site, chercher la page contact, relever une adresse, recommencer. Pour 200 entreprises, cela prend plusieurs jours et produit un tableur sans source ni date.",
      problem: "Les outils existants vendent des adresses « vérifiées » sans dire d'où elles viennent, et la vérification de boîte coûte cher. Il faut aussi respecter les sites visités et les données personnelles de tiers.",
      solution: "Un pipeline en cinq étapes sur files BullMQ : import, identification de l'entreprise, lecture du site, enrichissement, vérification. Chaque adresse a une source imposée par la base, un score détaillé critère par critère, et un statut honnête. Le robot respecte robots.txt et ne se déguise pas en navigateur.",
    },
    howItWorks: [
      { title: 'Import', text: "CSV de 5 000 lignes au plus. Les colonnes sont reconnues en français et en anglais ; une estimation de coût s'affiche au-delà de 20 lignes." },
      { title: 'Identification', text: "Recherche de l'entreprise (SIREN, domaine officiel) via l'API Recherche d'entreprises et Brave Search." },
      { title: 'Lecture du site', text: "Le robot lit accueil, contact, carrières, mentions légales : mailto, texte, JSON-LD, microdonnées. Une requête par seconde et par domaine." },
      { title: 'Enrichissement et vérification', text: "Hunter et adresses de rôle, puis contrôles locaux (syntaxe, MX, domaine jetable, liste de suppression) et vérification de boîte si demandée." },
      { title: 'Sortie', text: "Bibliothèque filtrable, exports CSV, XLSX et JSON, ou envoi en campagne brouillon dans Campaign Mailer." },
    ],
    features: [
      { icon: 'uil-link-alt', title: 'Source obligatoire', text: "Un déclencheur de base refuse toute adresse sans source." },
      { icon: 'uil-check-circle', title: 'Statuts honnêtes', text: "accept_all, unknown et unverified ne sont jamais présentés comme vérifiés." },
      { icon: 'uil-chart-pie-alt', title: 'Score détaillé', text: "0 à 100, décomposé critère par critère, sans pondération cachée." },
      { icon: 'uil-shield-check', title: 'Garde SSRF', text: "Refus des adresses privées et de métadonnées cloud, après résolution DNS et après chaque redirection." },
      { icon: 'uil-code-branch', title: 'API publique /v1', text: "Clés hachées, limite de débit, idempotence, erreurs RFC 9457, webhooks signés, OpenAPI 3.1." },
      { icon: 'uil-ban', title: 'Respect des sites', text: "robots.txt, page publique /robot pour demander l'exclusion, liste de suppression." },
    ],
    architecture: [
      { icon: 'uil-desktop', label: 'Frontend', text: 'React 19 + Vite, Tailwind CSS 4, sur Vercel' },
      { icon: 'uil-server', label: 'API', text: 'Express 5 sur Railway, avec /health et /ready' },
      { icon: 'uil-processor', label: 'Worker', text: 'Second service Railway qui vide les files BullMQ' },
      { icon: 'uil-database', label: 'Données', text: 'PostgreSQL 18 (Neon), Redis Cloud, Cloudflare R2' },
      { icon: 'uil-link-h', label: 'Intégration', text: 'API versionnée vers Campaign Mailer, jamais par sa base' },
    ],
    modeling: {
      intro: "26 tables et 18 migrations, chacune avec son script de retour. Les contraintes de base portent les règles du produit.",
      entities: [
        { name: 'companies', text: "Entreprise unique par utilisateur et domaine, ou SIREN." },
        { name: 'emails / email_sources', text: "Chaque adresse a au moins une source (URL et méthode, ou fournisseur)." },
        { name: 'verifications', text: "Historique des contrôles et statut de chaque adresse." },
        { name: 'pipeline_jobs', text: "Une tâche par import, entreprise et étape." },
        { name: 'provider_calls / provider_cache', text: "Appels payants réservés, comptés et mis en cache, pour ne jamais payer deux fois." },
        { name: 'suppressions / erased_addresses', text: "Listes d'exclusion, conservées uniquement sous forme d'empreinte SHA-256." },
      ],
    },
    stack: [
      { label: 'Front', items: ['React 19', 'Vite', 'Tailwind CSS 4', 'TypeScript'] },
      { label: 'Back', items: ['Express 5', 'zod 4', 'BullMQ', 'Cheerio'] },
      { label: 'Données', items: ['PostgreSQL 18 (Neon)', 'Redis Cloud', 'Cloudflare R2'] },
      { label: 'Qualité', items: ['Vitest', 'Playwright (tests E2E)', 'ESLint', 'Prettier'] },
    ],
    challenges: [
      { title: 'Budget à zéro euro', text: "Avec 50 crédits Hunter par mois, la vérification de boîte est plafonnée. Sans budget, tout reste « non vérifié » : le produit le dit plutôt que de l'embellir." },
      { title: 'Pas de SMTP depuis les serveurs', text: "Le port 25 est bloqué et l'IP risquerait la liste noire ; la vérification de boîte est donc déléguée à un fournisseur." },
      { title: 'Faille SSRF en IPv6', text: "La garde laissait passer http://[::ffff:169.254.169.254]/. Les adresses sont désormais jugées comme des nombres, et seul l'unicast global est autorisé." },
      { title: 'Recette sur de vrais sites', text: "Sur 50 entreprises réelles, 15 sites étaient injoignables : dix refusent le robot, qui n'insiste pas. Deux vrais défauts ont été corrigés (domaine nu sans www, page d'accueil trop lourde)." },
      { title: 'Latence', text: "La cible de 300 ms au 95e centile n'est pas tenue (521 ms), l'hébergement étant aux États-Unis pour une clientèle française." },
      { title: 'Données personnelles', text: "L'analyse d'impact est faite en interne mais n'a pas été relue par un juriste : la bêta reste fermée." },
    ],
    uiChallenges: [
      { icon: 'uil-question-circle', title: "Montrer l'incertain", text: "Un disque plein pour une boîte vérifiée, un cercle vide quand le serveur accepte tout : la forme distingue, pas seulement la couleur." },
      { icon: 'uil-eye', title: 'Accessibilité', text: "Audit axe-core sur 15 vues, deux thèmes, deux largeurs : 45 problèmes trouvés et corrigés." },
      { icon: 'uil-table', title: 'Longues listes', text: "Tri, recherche, filtres reflétés dans l'URL et actions en masse sur plus de 1 000 adresses." },
    ],
    links: [
      { kind: 'demo', label: 'Voir le site (bêta fermée)', url: 'https://mailfind.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/MailFind' },
    ],
  },

  /* ───────────────────────── CYNA ───────────────────────── */
  {
    id: 'cyna',
    title: 'Cyna',
    category: 'Full-Stack',
    status: 'Projet académique · en équipe',
    logo: cynaLogo,
    summary: "Plateforme SaaS de cybersécurité (Web & Mobile) : e-commerce de services en abonnement avec backoffice administrateur.",
    overview: "Cyna vend des services de cybersécurité (SOC, EDR, XDR) sous forme d'abonnements. Le site couvre tout le parcours d'achat, du catalogue au paiement Stripe, puis l'espace client avec ses abonnements et licences, et un backoffice pour l'administration.",
    role: "Projet de formation mené en équipe de 5 personnes. J'ai écrit la quasi-totalité du front-end (environ 90 % des commits) et contribué à l'API côté infrastructure et sécurité : déploiement, base de données, rotation des refresh tokens.",
    repos: ['Frontend_cyna', 'Backend_cyna'],
    meta: {
      languages: ['Français', 'Anglais', 'Arabe (RTL)'],
      team: 'Équipe de 5 personnes',
      hosting: 'Vercel',
    },
    figures: [
      { value: '5', label: "personnes dans l'équipe" },
      { value: '~90 %', label: 'des commits front-end' },
      { value: '3', label: 'langues (FR, EN, AR)' },
    ],
    features: [
      { icon: 'uil-shopping-cart', title: "Parcours d'achat", text: 'Catalogue, panier, paiement Stripe et factures PDF.' },
      { icon: 'uil-user-circle', title: 'Espace client', text: 'Abonnements, licences et commandes.' },
      { icon: 'uil-chart-bar', title: 'Backoffice', text: 'Administration avec graphiques Chart.js.' },
      { icon: 'uil-globe', title: 'Multilingue', text: 'Interface en français, anglais et arabe, avec support RTL.' },
      { icon: 'uil-lock', title: 'API sécurisée', text: 'Cookies JWT httpOnly avec rotation, 2FA, rate limiting, Helmet.' },
      { icon: 'uil-file-check-alt', title: 'Qualité', text: 'Webhook Stripe vérifié par signature, documentation Swagger, tests Jest et Vitest.' },
    ],
    architecture: [
      { icon: 'uil-desktop', label: 'Frontend', text: 'React 19, Redux Toolkit, Tailwind CSS, i18next' },
      { icon: 'uil-server', label: 'Backend', text: 'NestJS 11, MongoDB, Swagger' },
      { icon: 'uil-credit-card', label: 'Paiement', text: 'Stripe, webhook signé' },
    ],
    challenges: [
      { title: 'Sessions sûres', text: 'Cookies JWT httpOnly avec rotation des refresh tokens, 2FA et rate limiting côté API.' },
      { title: 'Arabe et RTL', text: "Trois langues dont l'arabe : la mise en page bascule en droite-à-gauche." },
      { title: 'Paiements vérifiés', text: 'Le webhook Stripe est vérifié par signature.' },
    ],
    stack: [
      { label: 'Front', items: ['React 19', 'Redux Toolkit', 'Tailwind CSS', 'i18next'] },
      { label: 'Back', items: ['NestJS 11', 'MongoDB', 'Swagger'] },
      { label: 'Paiement', items: ['Stripe'] },
    ],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://cynaapp.vercel.app' },
      { kind: 'github', label: 'Frontend', url: 'https://github.com/nagoloumdaniel/Frontend_cyna' },
      { kind: 'github', label: 'Backend', url: 'https://github.com/nagoloumdaniel/Backend_cyna' },
    ],
  },

  /* ───────────────────────── CAMPAIGN MAILER ───────────────────────── */
  {
    id: 'campaign-mailer',
    title: 'CampaignMailer',
    category: 'Full-Stack',
    status: 'Projet personnel',
    logo: campaignLogo,
    summary: "Application web de campagnes mail : envois depuis son compte Gmail, avec suivi d'envoi et dashboard.",
    overview: "Chaque utilisateur connecte son compte Google, importe ses contacts en CSV, écrit un modèle avec des variables et joint jusqu'à cinq fichiers (un CV par exemple). L'application envoie ensuite la campagne à son rythme, pendant les heures de bureau, avec suivi d'envoi et dashboard.",
    role: 'Projet personnel.',
    repos: ['Campaign-Mailer'],
    meta: {
      languages: ['Français'],
      hosting: 'Vercel',
    },
    figures: [
      { value: '450', label: 'envois max / 24 h glissantes' },
      { value: '5', label: 'pièces jointes max' },
      { value: '3', label: "niveaux d'idempotence" },
    ],
    features: [
      { icon: 'uil-google', title: 'Google OAuth 2.0', text: "Connexion Google et envoi via l'API Gmail." },
      { icon: 'uil-file-import', title: 'Modèles', text: 'Import CSV, modèles avec variables et aperçu en direct.' },
      { icon: 'uil-clock-three', title: 'Cadence maîtrisée', text: "Plafond de 450 envois par 24 h glissantes, pause aléatoire entre deux messages, envoi limité aux heures de bureau dans le fuseau de la campagne." },
      { icon: 'uil-history', title: 'Historique', text: "Historique des envois, relances, export des données et suppression du compte." },
      { icon: 'uil-chart-line', title: 'Observabilité', text: 'Logs structurés, Sentry, endpoints de santé.' },
      { icon: 'uil-check-circle', title: 'Tests', text: 'Tests backend et parcours Playwright.' },
    ],
    architecture: [
      { icon: 'uil-desktop', label: 'Frontend', text: 'React 19, TypeScript, Vite, Tailwind CSS' },
      { icon: 'uil-server', label: 'API', text: 'Express 5, PostgreSQL (Neon)' },
      { icon: 'uil-processor', label: 'Worker', text: "Moteur d'envoi BullMQ / Redis" },
      { icon: 'uil-envelope', label: 'Messagerie', text: 'API Gmail, Google OAuth 2.0' },
    ],
    challenges: [
      { title: 'Jamais deux fois le même message', text: "Un contact ne doit jamais recevoir deux fois le même mail, même si le worker s'arrête en plein envoi. Le moteur est idempotent sur trois niveaux : id de job, claim SQL et index unique." },
      { title: 'Respecter les quotas de Google', text: "Plafond de 450 envois par 24 h glissantes et pause aléatoire entre deux messages." },
      { title: 'Envoyer au bon moment', text: "Les envois restent dans les heures de bureau, selon le fuseau horaire de la campagne." },
    ],
    stack: [
      { label: 'Front', items: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS'] },
      { label: 'Back', items: ['Express 5', 'PostgreSQL (Neon)', 'BullMQ / Redis'] },
      { label: 'Intégrations', items: ['API Gmail', 'Google OAuth 2.0', 'Playwright'] },
    ],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://campaignmailer.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/Campaign-Mailer' },
    ],
  },
];

export const projectsNav = [{ name: 'Tous' }];
