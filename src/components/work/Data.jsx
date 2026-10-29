import allibuyLogo  from '../../assets/logos/allibuy.webp';
import campaignLogo from '../../assets/logos/campaign-mailer.svg';
import cynaLogo     from '../../assets/logos/cyna.webp';
import tradingagentLogo from '../../assets/logos/tradingagent.png';
import zolyaLogo from '../../assets/logos/zolya.png';
import finditLogo from '../../assets/logos/findit.png';
import builditLogo from '../../assets/logos/buildit.webp';
import mailfindLogo from '../../assets/logos/mailfind.svg';
import sarielleLogo from '../../assets/logos/sariellefashion.svg';
import hairstyleLogo from '../../assets/logos/hairstylebypati.svg';
import kycLogo from '../../assets/logos/kyc-checker.jpg';
import remembermeLogo from '../../assets/logos/rememberme.png';
import nagosuiLogo from '../../assets/logos/nagosui.png';

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
    logo: zolyaLogo,
    logoCover: true,
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
      { value: '480', label: 'tests (271 backend, 210 Flutter)' },
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
    logo: finditLogo,
    title: 'Findit',
    category: 'Full-Stack',
    status: 'Web · en cours de développement',
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
    logo: tradingagentLogo,
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
      { title: 'Ne pas se mentir', text: "La version 1.3.0 validée à 1,0275 sur BTC tombe à 0,6909 sur le jeu scellé. La 1.4.0 atteint 1,3916 en validation (35 trades), mais son filtre a été trouvé en examinant 164 tranches des mêmes données et le jeu scellé n'est pas ouvert. La démonstration (22 trades, +14,90 EUR) n'est pas statistiquement significative." },
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
    logo: builditLogo,
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
      hosting: 'Vercel (configurateur web : buildit.vercel.app)',
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
      { kind: 'demo', label: 'Voir le configurateur', url: 'https://buildit.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/BuildIt' },
    ],
  },

  /* ───────────────────────── MAILFIND ───────────────────────── */
  {
    id: 'mailfind',
    logo: mailfindLogo,
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

  /* ───────────────────────── SARIELLE FASHION ───────────────────────── */
  {
    id: 'sariellefashion',
    logo: sarielleLogo,
    title: 'Sarielle Fashion',
    category: 'Full-Stack',
    status: 'Next.js · en production',
    monogram: 'SF',
    summary: "Site vitrine bilingue (FR / DE), réservation en ligne et back-office pour un salon de coiffure, make-up, pose de lace et de cils à Clausthal-Zellerfeld (Allemagne).",
    overview: "Projet réalisé pour une cliente réelle : un salon indépendant dont les rendez-vous passaient par messagerie et téléphone. Le site propose un catalogue de prestations, un parcours de réservation guidé, une évaluation de compatibilité capillaire, des demandes sur mesure et une messagerie, avec un back-office pour tout gérer. Le paiement se fait sur place : le site ne traite aucune donnée de paiement. Le code est public à titre de portfolio, sous licence propriétaire.",
    role: "Projet client de bout en bout, développé en solo avec l'assistance de Claude.",
    repos: ['SarielleFashion'],
    meta: {
      country: 'Allemagne (Basse-Saxe)',
      languages: ['Français', 'Allemand'],
      period: 'Depuis octobre 2026',
      team: 'Solo, assisté par IA',
      hosting: 'Vercel, Neon (PostgreSQL), Cloudflare R2',
    },
    figures: [
      { value: '26', label: 'modèles Prisma' },
      { value: '16', label: 'migrations' },
      { value: '17', label: 'domaines métier' },
      { value: '4', label: 'tâches planifiées (cron)' },
    ],
    situation: {
      context: "Sarielle Fashion est un salon indépendant (coiffure femme, homme et enfant, make-up, lace, cils, événements, déplacement à domicile possible) installé à Clausthal-Zellerfeld, en Basse-Saxe.",
      problem: "Les rendez-vous passaient par messagerie et téléphone : risque de doubles réservations, questions répétitives sur la compatibilité d'une coiffure avec le type de cheveux, aucune vision centralisée des demandes, clientèle francophone et germanophone.",
      solution: "Un site bilingue avec catalogue, réservation guidée, évaluation de compatibilité, demandes sur mesure, messagerie et un back-office. Deux protections empêchent la double réservation : un verrou transactionnel PostgreSQL et un index unique partiel.",
    },
    howItWorks: [
      { title: 'Catalogue', text: "La cliente parcourt les prestations (prix en euros, durée, photos) et ouvre une fiche détaillée." },
      { title: 'Compatibilité', text: "Une évaluation à questions conditionnelles, avec photo privée, vérifie qu'une coiffure convient au type de cheveux." },
      { title: 'Réservation', text: "Parcours en plusieurs étapes ; le créneau est contrôlé dans une transaction qui prend un verrou consultatif PostgreSQL avant d'insérer." },
      { title: 'Confirmation', text: "La cliente reçoit un lien d'annulation sécurisé à durée limitée. Une réservation en attente porte une échéance, passé laquelle le créneau est libéré." },
      { title: 'Gestion', text: "Le back-office suit les réservations (machine à statuts, reprogrammation), les clients, les demandes et la messagerie." },
    ],
    features: [
      { icon: 'uil-clock-three', title: 'Réservation en ligne', text: "Créneaux protégés contre la double réservation, option coiffure à domicile avec frais de déplacement." },
      { icon: 'uil-globe', title: 'Bilingue FR / DE', text: "Allemand sous /de, métadonnées localisées avec canonical et hreflang, e-mails dans la langue de la demande." },
      { icon: 'uil-check-circle', title: 'Compatibilité capillaire', text: "Questions conditionnelles et règles configurables par prestation." },
      { icon: 'uil-envelope', title: 'Demandes sur mesure', text: "Coiffures personnalisées avec photos de référence, et liste d'attente." },
      { icon: 'uil-dashboard', title: 'Back-office', text: "Prestations, disponibilités, calendrier, messagerie centralisée, statistiques et journal d'audit." },
      { icon: 'uil-eye', title: 'Avis et galerie', text: "Avis clients, galerie, FAQ et informations pratiques." },
    ],
    architecture: [
      { icon: 'uil-desktop', label: 'Application', text: 'Next.js 15 (App Router), pages publiques et dashboard' },
      { icon: 'uil-layer-group', label: 'Modules métier', text: '17 domaines dans src/modules, indépendants de src/app' },
      { icon: 'uil-database', label: 'Données', text: 'PostgreSQL (Neon) via Prisma' },
      { icon: 'uil-package', label: 'Fichiers', text: 'Cloudflare R2, URL présignées, traitement d’images avec sharp' },
      { icon: 'uil-history', label: 'Tâches planifiées', text: 'Quatre cron Vercel (notifications, rappels H-24, rétention RGPD, liste d’attente)' },
    ],
    modeling: {
      intro: "26 modèles et 13 enums Prisma, 16 migrations. Prix et durée sont figés sur chaque réservation.",
      entities: [
        { name: 'Service / Category', text: "Prestations rangées par catégorie, avec photos et options." },
        { name: 'Appointment', text: "Réservation avec instantané du prix et de la durée, et échéance de mise en attente." },
        { name: 'CompatibilityRule / HairAssessment', text: "Règles par prestation et évaluations des clientes." },
        { name: 'CustomRequest', text: "Demande de coiffure personnalisée, avec l'historique des décisions." },
        { name: 'Conversation / Message', text: "Messagerie centralisée entre clientes et salon." },
        { name: 'Review / AuditLog', text: "Avis avec photos, et journal d'audit." },
      ],
    },
    stack: [
      { label: 'Application', items: ['Next.js 15', 'React 19', 'TypeScript strict', 'Tailwind CSS 4'] },
      { label: 'Données', items: ['PostgreSQL (Neon)', 'Prisma 6', 'Cloudflare R2'] },
      { label: 'Services', items: ['Auth.js', 'Zod 4', 'Nodemailer (SMTP Gmail)', 'sharp'] },
      { label: 'Qualité', items: ['Vitest', 'Playwright', 'ESLint', 'Prettier', 'GitHub Actions'] },
    ],
    challenges: [
      { title: 'Double réservation', text: "Une simple vérification ne suffit pas sous concurrence : verrou consultatif plus index unique partiel. Prisma ne sachant pas exprimer l'index partiel, il est écrit en SQL dans la migration." },
      { title: 'Migrations sur Vercel', text: "Le verrou advisory de Prisma expirait derrière le pooler Neon ; les migrations passent par la connexion directe, verrou désactivé." },
      { title: 'i18n sans refonte des routes', text: "Un middleware de réécriture plutôt qu'un dossier [locale], pour garder les URL françaises et laisser le dashboard en français." },
      { title: "Fournisseur d'e-mails", text: "Resend était prévu au départ, remplacé par SMTP Gmail." },
    ],
    uiChallenges: [
      { icon: 'uil-globe', title: 'Deux langues', text: "Dictionnaires typés : une clé allemande manquante fait échouer la compilation." },
      { icon: 'uil-moon', title: 'Thème clair et sombre', text: "Interface responsive, avec bascule de thème." },
    ],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://sariellefashion.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/SarielleFashion' },
    ],
  },

  /* ───────────────────────── HAIRSTYLE BY PATRICIA ───────────────────────── */
  {
    id: 'hairstylebypati',
    logo: hairstyleLogo,
    title: 'Hairstyle by Patricia',
    category: 'Full-Stack',
    status: 'Next.js · en production',
    monogram: 'HP',
    summary: "Site vitrine, catalogue et réservation en ligne pour une coiffeuse indépendante à Dakar (Sénégal) : locs, nattes collées, vanilles, sur rendez-vous.",
    overview: "Patricia exerce seule à Dakar et gérait ses rendez-vous par messages et appels. Le site enchaîne un catalogue de prestations, un diagnostic de compatibilité configurable, une réservation en ligne sans double réservation possible (paiement sur place) et un back-office où elle valide, planifie et échange avec ses clientes. Le catalogue public affiche pour l'instant « Le catalogue arrive bientôt ». Le code est public à titre de référence, sous licence propriétaire.",
    role: "Projet client de bout en bout, développé en solo avec l'assistance de Claude. Le nom, le logo et les photographies appartiennent à Patricia.",
    repos: ['HairStyleByPati'],
    meta: {
      country: 'Sénégal (Dakar)',
      languages: ['Français'],
      period: 'Depuis octobre 2026',
      team: 'Solo, assisté par IA',
      hosting: 'Vercel, Neon (PostgreSQL), Cloudflare R2',
    },
    figures: [
      { value: '26', label: 'modèles Prisma' },
      { value: '15', label: 'migrations' },
      { value: '439', label: 'tests Vitest' },
      { value: '13', label: 'fichiers de test E2E' },
    ],
    situation: {
      context: "Patricia exerce seule à Dakar. Les rendez-vous passent par messages et appels : créneaux gérés de tête, risque de doubles réservations, questions répétitives sur la compatibilité d'une coiffure avec le cheveu de la cliente.",
      problem: "Une coiffure comme des locs se prépare : une cliente dont le cheveu est inadapté perd du temps et de l'argent, et Patricia perd un créneau. Il faut qualifier avant de réserver, sans bloquer les clientes.",
      solution: "Un site en français, pensé mobile : catalogue, diagnostic de compatibilité par prestation, réservation en ligne sans double réservation, et back-office.",
    },
    howItWorks: [
      { title: 'Catalogue', text: "Prestations avec photos, prix en FCFA et durée." },
      { title: 'Diagnostic', text: "Questions conditionnelles propres à la prestation ; la photo d'évaluation est stockée en privé." },
      { title: 'Réservation', text: "Réservation en 8 étapes. Le serveur prend un verrou PostgreSQL (pg_advisory_xact_lock) avant de revérifier le créneau et d'insérer." },
      { title: 'Notification', text: "Un e-mail est mis en file (idempotent, repris sur échec, jamais bloquant pour l'enregistrement), avec un rappel H-24." },
      { title: 'Annulation', text: "Lien sécurisé à durée limitée ; le délai est de 30 minutes par défaut, configurable. Paiement sur place." },
    ],
    features: [
      { icon: 'uil-clock-three', title: 'Réservation sans doublon', text: "Verrou consultatif, index d'unicité sur les réservations actives et test de concurrence E2E." },
      { icon: 'uil-check-circle', title: 'Compatibilité capillaire', text: "Règles revérifiées côté serveur à la réservation ; une évaluation acceptée ne réserve jamais un créneau automatiquement." },
      { icon: 'uil-history', title: "Liste d'attente et rappels", text: "Liste d'attente et rappel e-mail H-24." },
      { icon: 'uil-envelope', title: 'Messagerie', text: "Messagerie centralisée avec notes internes et notifications." },
      { icon: 'uil-dashboard', title: 'Back-office', text: "Catalogue, disponibilités, absences, promotions, calendrier, fiches clientes, statistiques et journal d'audit." },
      { icon: 'uil-lock', title: 'Photos privées', text: "Accès par URL présignée et purge automatique à échéance." },
    ],
    architecture: [
      { icon: 'uil-desktop', label: 'Application', text: 'Next.js 15 (App Router) sur Vercel' },
      { icon: 'uil-layer-group', label: 'Modules métier', text: 'Un dossier par domaine dans src/modules' },
      { icon: 'uil-database', label: 'Données', text: 'PostgreSQL (Neon) via Prisma' },
      { icon: 'uil-package', label: 'Fichiers', text: 'Cloudflare R2, photos privées par URL présignée' },
      { icon: 'uil-envelope', label: 'Notifications', text: 'File idempotente puis SMTP Gmail' },
    ],
    modeling: {
      intro: "26 modèles et 17 enums Prisma, 15 migrations. Prix et durée sont figés sur chaque réservation ; les montants sont stockés en entiers (colonnes *Cents).",
      entities: [
        { name: 'Service / Category', text: "Prestations, photos, options et règles de compatibilité." },
        { name: 'Appointment', text: "Réservation avec instantané du prix et de la durée." },
        { name: 'HairAssessment', text: "Évaluation de compatibilité d'une cliente." },
        { name: 'CustomRequest', text: "Demande de coiffure personnalisée avec photos de référence." },
        { name: 'Conversation / Message', text: "Échanges avec les clientes." },
        { name: 'Review / WaitlistEntry', text: "Avis avec photos et liste d'attente." },
      ],
    },
    stack: [
      { label: 'Application', items: ['Next.js 15', 'React 19', 'TypeScript strict', 'Tailwind CSS 4'] },
      { label: 'Données', items: ['PostgreSQL (Neon)', 'Prisma 6', 'Cloudflare R2'] },
      { label: 'Services', items: ['Auth.js', 'Zod', 'Nodemailer (SMTP Gmail)'] },
      { label: 'Qualité', items: ['Vitest', 'Playwright', 'axe-core', 'ESLint', 'Prettier'] },
    ],
    challenges: [
      { title: 'Double réservation', text: "Un contrôle suivi d'une insertion laisse passer deux requêtes simultanées ; résolu par un verrou consultatif dans la transaction et un index d'unicité limité aux réservations actives." },
      { title: 'Devise sans décimales', text: "Le schéma stocke en 1/100 alors que le FCFA n'a pas de décimales ; la conversion est centralisée." },
      { title: 'Photos privées et RGPD', text: "Évaluations stockées en privé, accès par URL présignée, purge automatique à échéance." },
      { title: 'Notifications fiables', text: "Une file idempotente garantit qu'un échec SMTP n'annule jamais une réservation." },
    ],
    uiChallenges: [
      { icon: 'uil-mobile-android', title: 'Pensé mobile', text: "Interface responsive en français, avec thème clair et sombre." },
      { icon: 'uil-eye', title: 'Accessibilité visée', text: "Objectif WCAG 2.2 AA, contrôlé en partie avec axe-core dans les tests E2E." },
    ],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://hairstylebypati.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/HairStyleByPati' },
    ],
  },

  /* ───────────────────────── KYC CHECKER ───────────────────────── */
  {
    id: 'kyc-checker',
    logo: kycLogo,
    logoCover: true,
    title: 'KYC Checker',
    category: 'Back-End',
    status: 'Python · en cours de développement',
    wip: true,
    monogram: 'KC',
    summary: "Moteur de vérification de pièces d'identité : MRZ, nom, visage, forensique et archivage chiffré, avec une décision explicable.",
    overview: "KYC Checker enchaîne les contrôles d'une pièce d'identité fournie en photo et produit une décision VALID, SUSPECT ou REJECTED accompagnée des avertissements qui la justifient, pour qu'un humain relise les cas douteux. C'est un prototype backend (CLI, bibliothèque Python, API HTTP) : il n'y a pas d'interface ni de démo en ligne, et la plateforme décrite dans le cahier des charges n'est pas implémentée. Toutes les données de test sont des spécimens synthétiques.",
    role: "Projet personnel. Développé avec l'assistance de Claude.",
    repos: ['KYC-Checker'],
    meta: {
      languages: ['Français'],
      team: 'Solo, assisté par IA',
      hosting: 'Pas de déploiement en ligne',
    },
    figures: [
      { value: '3', label: 'formats MRZ (TD1, TD2, TD3)' },
      { value: '50', label: 'tests collectés (42 passent, 8 ignorés)' },
      { value: '4', label: 'points d’accès HTTP' },
    ],
    situation: {
      context: "Un service qui inscrit des utilisateurs doit contrôler une pièce d'identité fournie en photo.",
      problem: "La revue manuelle est lente, et un simple OCR ne dit pas si les données sont cohérentes : la zone MRZ contient des clés de contrôle, le nom saisi doit correspondre à celui du document et le selfie doit ressembler à la photo.",
      solution: "Une chaîne de contrôles qui produit une décision explicable. Des règles dures plafonnent la décision : un score élevé ne peut pas blanchir un nom différent ou une clé invalide.",
    },
    howItWorks: [
      { title: 'Lecture', text: "Localisation de la bande MRZ avec OpenCV, puis OCR (Tesseract avec modèle OCR-B, ou EasyOCR), ou texte MRZ fourni directement." },
      { title: 'MRZ', text: "Détection du format, correction des confusions OCR courantes et vérification des clés de contrôle." },
      { title: 'Nom et visage', text: "Rapprochement flou du nom (Jaro-Winkler) ; comparaison du selfie avec la photo de la pièce (YuNet et SFace)." },
      { title: 'Forensique', text: "Résolution, netteté et ELA expérimental : des signaux d'aide à la revue, pas des preuves de fraude." },
      { title: 'Décision', text: "Score (60 points de clés MRZ, 40 de similarité de nom) puis règles dures ; archivage chiffré optionnel." },
    ],
    features: [
      { icon: 'uil-file-check-alt', title: 'MRZ ICAO Doc 9303', text: "Formats TD1, TD2 et TD3, avec détection automatique." },
      { icon: 'uil-check-circle', title: 'Décision explicable', text: "VALID, SUSPECT ou REJECTED, avec les avertissements qui la justifient." },
      { icon: 'uil-eye', title: 'Comparaison de visage', text: "Seuil cosinus configurable." },
      { icon: 'uil-lock', title: 'Archivage chiffré', text: "AES-256-GCM, index SQLite sans donnée personnelle en clair (jetons HMAC), journal d'audit et rétention configurable." },
      { icon: 'uil-code-branch', title: 'API HTTP', text: "FastAPI, authentification par clé d'API, images traitées en mémoire." },
      { icon: 'uil-terminal', title: 'CLI et bibliothèque', text: "Commandes demo et verify, plus un exemple d'intégration Next.js." },
    ],
    architecture: [
      { icon: 'uil-package', label: 'Cœur', text: 'MRZ, rapprochement de nom et scoring, sans dépendance image' },
      { icon: 'uil-processor', label: 'Image', text: 'OpenCV, OCR, visage et forensique (couches optionnelles)' },
      { icon: 'uil-server', label: 'API', text: 'FastAPI et Docker' },
      { icon: 'uil-database', label: 'Coffre', text: 'Fichiers chiffrés et index SQLite' },
    ],
    modeling: {
      intro: "Le coffre utilise SQLite ; le contenu chiffré est stocké en fichiers. Deux tables.",
      entities: [
        { name: 'records', text: "Dossier archivé : jetons HMAC du nom et du numéro de document, statut, score, rétention." },
        { name: 'audit_log', text: "Trace des accès : acteur, date, action." },
      ],
    },
    stack: [
      { label: 'Langage', items: ['Python 3.11+'] },
      { label: 'Vérification', items: ['mrz', 'OpenCV', 'Tesseract', 'NumPy', 'Pillow'] },
      { label: 'API et données', items: ['FastAPI', 'Uvicorn', 'cryptography', 'SQLite', 'Docker'] },
      { label: 'Qualité', items: ['pytest'] },
    ],
    challenges: [
      { title: 'OCR du caractère <', text: "Le modèle Tesseract par défaut le lit mal ; la MRZ exige le modèle OCR-B, complété par une correction des confusions courantes." },
      { title: 'Authenticité non vérifiable par image', text: "Des clés MRZ correctes ne prouvent rien. Seule la lecture de la puce NFC apporterait une preuve forte ; elle est documentée mais non implémentée." },
      { title: 'Règles dures contre score', text: "Un score pondéré seul peut laisser passer un nom différent, d'où des plafonds de sévérité indépendants du score." },
      { title: 'Recherche sans donnée personnelle', text: "Retrouver un dossier par nom sans le stocker en clair a conduit à des jetons HMAC." },
      { title: 'Limites assumées', text: "Pas de détection de vivacité, pas de limitation de débit, aucune évaluation de conformité : le prototype n'est pas prêt à traiter de vraies données personnelles." },
    ],
    links: [
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/KYC-Checker' },
    ],
  },

  /* ───────────────────────── REMEMBERME ───────────────────────── */
  {
    id: 'rememberme',
    logo: remembermeLogo,
    title: 'RememberMe',
    category: 'Full-Stack',
    status: 'React · Node · en production',
    monogram: 'RM',
    summary: "Gestionnaire de tâches et de rappels organisés par listes : une interface React et une API REST Node / Express.",
    overview: "RememberMe est un seul projet réparti sur deux dépôts : une application web React (Frontend_RememberMe) et une API REST Express avec MongoDB et JWT (Backend_RememberMe). Les deux sont en production. La récupération de mot de passe est incomplète : les écrans existent dans l'interface mais ne sont pas branchés à l'API.",
    role: "Projet personnel de bout en bout.",
    repos: ['Frontend_RememberMe', 'Backend_RememberMe'],
    meta: {
      languages: ['Anglais (traduction FR / EN par le navigateur)'],
      hosting: 'Vercel (interface et API serverless), MongoDB',
    },
    figures: [
      { value: '2', label: 'dépôts, un seul projet' },
      { value: '12', label: 'routes de l’API' },
      { value: '6', label: 'tests d’intégration backend' },
    ],
    situation: {
      context: "Un gestionnaire de tâches et de rappels, avec des tâches regroupées dans des listes personnalisées.",
      problem: "Les tâches doivent rester propres à chaque compte, consultables par liste, par date et par échéance proche.",
      solution: "Une API qui isole les données de chaque utilisateur par jeton JWT, et une SPA qui expose listes, calendrier et tâches à venir.",
    },
    howItWorks: [
      { title: 'Compte', text: "Inscription et connexion par e-mail et mot de passe ; l'API renvoie un jeton JWT." },
      { title: 'Requêtes', text: "Axios joint le jeton à chaque requête ; une réponse 401 vide la session." },
      { title: 'Isolation', text: "Un middleware vérifie le jeton et place l'identifiant utilisateur dans la requête ; tâches, listes et profils sont filtrés par cet identifiant." },
      { title: 'Consultation', text: "Tâches par liste, par date dans le calendrier, ou à échéance proche." },
    ],
    features: [
      { icon: 'uil-check-circle', title: 'Tâches', text: "Création, modification, suppression, état terminé, priorité, date et heure d'échéance." },
      { icon: 'uil-clipboard-notes', title: 'Listes', text: "Regroupement des tâches dans des listes personnalisées." },
      { icon: 'uil-clock-three', title: 'Calendrier et à venir', text: "Choix d'une date, navigation par mois, tâches à échéance proche." },
      { icon: 'uil-bell', title: 'Notifications', text: "Préférences d'activation et d'heure ; tâches du jour via l'API." },
      { icon: 'uil-moon', title: 'Thème clair / sombre', text: "Bascule mémorisée, préférence système prise en compte." },
      { icon: 'uil-shield-check', title: 'Isolation des comptes', text: "Un test d'intégration vérifie qu'un compte ne lit pas les tâches d'un autre." },
    ],
    architecture: [
      { icon: 'uil-desktop', label: 'Frontend', text: 'React 19, Vite, Tailwind CSS 3, React Router 7, sur Vercel' },
      { icon: 'uil-server', label: 'API', text: 'Express en fonctions serverless sur Vercel, connexion MongoDB mise en cache' },
      { icon: 'uil-database', label: 'Données', text: 'MongoDB via Mongoose' },
      { icon: 'uil-shield-check', label: 'Accès', text: 'JWT, CORS en liste blanche' },
    ],
    modeling: {
      intro: "Trois collections MongoDB ; le lien entre une tâche et sa liste se fait par le nom, volontairement souple.",
      entities: [
        { name: 'User', text: "Nom, e-mail unique, mot de passe haché (bcrypt), préférences de notification." },
        { name: 'Todo', text: "Titre, description, état, échéance, liste, priorité (low, medium, high)." },
        { name: 'List', text: "Nom unique par utilisateur." },
      ],
    },
    stack: [
      { label: 'Frontend', items: ['React 19', 'Vite', 'Tailwind CSS', 'React Router', 'Axios'] },
      { label: 'Backend', items: ['Node.js', 'Express', 'Mongoose', 'jsonwebtoken', 'bcryptjs'] },
      { label: 'Données', items: ['MongoDB'] },
      { label: 'Qualité', items: ['Jest', 'Supertest', 'mongodb-memory-server', 'ESLint'] },
    ],
    challenges: [
      { title: 'Déploiement Vercel', text: "Adapter une API Express au mode serverless (point d'entrée dédié, réécriture des routes, connexion MongoDB en cache). Côté interface, une réécriture vers index.html corrige les 404 sur les routes directes." },
      { title: 'CORS', text: "Passage à une liste blanche d'origines, avec gestion explicite des requêtes OPTIONS." },
      { title: 'Tests réparés', text: "La suite d'intégration du backend était cassée ; elle a été réparée et passe." },
      { title: 'Récupération de mot de passe', text: "Les écrans existent mais ne sont pas branchés à l'API : la fonction est incomplète." },
    ],
    uiChallenges: [
      { icon: 'uil-globe', title: 'Langues', text: "Interface en anglais ; le bouton FR / EN s'appuie sur la traduction native du navigateur." },
      { icon: 'uil-moon', title: 'Thème', text: "Thème clair et sombre mémorisé." },
    ],
    links: [
      { kind: 'demo', label: "Voir l'application", url: 'https://rememberme-lemon-chi.vercel.app' },
      { kind: 'github', label: 'GitHub (interface)', url: 'https://github.com/nagoloumdaniel/Frontend_RememberMe' },
      { kind: 'github', label: 'GitHub (API)', url: 'https://github.com/nagoloumdaniel/Backend_RememberMe' },
    ],
  },

  /* ───────────────────────── NAGOSUI ───────────────────────── */
  {
    id: 'nagosui',
    logo: nagosuiLogo,
    title: 'NagosUI',
    category: 'Outils développeur',
    status: 'React · en cours de développement',
    wip: true,
    monogram: 'NU',
    summary: "Design system React animé : tokens, composants et site de documentation. Au stade initial, seuls Button et MagneticButton sont livrés.",
    overview: "NagosUI est une couche de fondation : une source unique de tokens (visuels en CSS, motion en TypeScript) sur laquelle les composants se construisent sans valeur codée en dur. Le projet est au stade initial : seuls le composant Button et sa variante MagneticButton sont livrés, rien n'est publié sur npm (paquets privés en version 0.0.0). Le dépôt est public, sans licence pour le moment : tous droits réservés.",
    role: "Projet personnel. Développé avec l'assistance de Claude.",
    repos: ['NagosUI'],
    meta: {
      languages: ['Français', 'Anglais'],
      period: 'Depuis mai 2026',
      team: 'Solo, assisté par IA',
      hosting: 'Vercel (site de démonstration)',
    },
    figures: [
      { value: '2', label: 'composants livrés' },
      { value: '0', label: 'paquet publié sur npm' },
    ],
    situation: {
      context: "Chaque nouveau site front recopie couleurs, ombres, rayons et courbes d'animation.",
      problem: "Les valeurs visuelles dérivent d'un projet à l'autre, et les animations « premium » sont réimplémentées à chaque fois.",
      solution: "Une Foundation Layer : changer un token change toute la direction artistique, car les composants n'utilisent que ces tokens.",
    },
    howItWorks: [
      { title: 'Tokens visuels', text: "Définis dans theme.css via @theme de Tailwind v4 (couleurs, rayons, ombres, flous, courbes)." },
      { title: 'Tokens de motion', text: "EASE, SPRING et DURATION en TypeScript, pour Motion et GSAP." },
      { title: 'Composants', text: "Variantes décrites avec CVA, sans valeur visuelle brute." },
      { title: 'Consommation', text: "L'application importe theme.css et utilise @nagos/ui comme dépendance de workspace, sans build ni publication." },
    ],
    features: [
      { icon: 'uil-window-grid', title: 'Button', text: "Variantes primary, glass, gradient, outline et ghost ; tailles de sm à xl, plus icon." },
      { icon: 'uil-sliders-v-alt', title: 'MagneticButton', text: "Effet magnétique via le hook useMagnetic." },
      { icon: 'uil-swatchbook', title: 'Tokens', text: "Tokens CSS et tokens de motion." },
      { icon: 'uil-books', title: 'Site de documentation', text: "Pages et documentation FR / EN, palette de commandes, thème." },
    ],
    architecture: [
      { icon: 'uil-package', label: 'packages/ui', text: '@nagos/ui : tokens, hooks et composants' },
      { icon: 'uil-desktop', label: 'apps/showcase', text: 'Site vitrine et documentation Next.js' },
      { icon: 'uil-layer-group', label: 'Monorepo', text: 'pnpm et Turborepo' },
    ],
    stack: [
      { label: 'Application', items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4'] },
      { label: 'Animation', items: ['Motion', 'GSAP', 'Lenis'] },
      { label: 'Outillage', items: ['pnpm', 'Turborepo', 'CVA', 'next-themes', 'cmdk'] },
    ],
    challenges: [
      { title: 'Page blanche au retour navigateur', text: "Conflit entre le bfcache et Lenis, corrigé." },
      { title: 'Logo sensible au thème', text: "Sans JavaScript ni flash, avec un composant à deux images." },
      { title: 'Pas encore de tests', text: "Il n'y a pas de tests automatisés ni de script lint pour l'instant." },
    ],
    uiChallenges: [
      { icon: 'uil-sliders-v-alt', title: 'Indicateur d’actif coulissant', text: "Dans la barre latérale et le sommaire de la documentation." },
      { icon: 'uil-moon', title: 'Transition de thème', text: "Fluide, avec un logo qui suit le thème." },
    ],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://nagosui.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/NagosUI' },
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
