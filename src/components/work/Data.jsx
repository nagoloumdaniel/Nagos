import allibuyLogo    from '../../assets/logos/allibuy.webp';
import zolyaLogo      from '../../assets/logos/zolya.webp';
import campaignLogo   from '../../assets/logos/campaign-mailer.svg';
import cynaLogo       from '../../assets/logos/cyna.webp';
import trackshipLogo  from '../../assets/logos/trackship.webp';
import fundatradeLogo from '../../assets/logos/fundatrade.webp';
import finditLogo     from '../../assets/logos/findit.webp';
import botsLogo       from '../../assets/logos/xaufxbot.webp';
import nagosuiLogo    from '../../assets/logos/nagosui.webp';
import remembermeLogo from '../../assets/logos/rememberme.webp';
import sellcatLogo    from '../../assets/logos/sellcatalog.webp';
import krosstyLogo    from '../../assets/logos/krossty.webp';
import creamyLogo     from '../../assets/logos/creamy-milk-candies.webp';
import wiyorentLogo   from '../../assets/logos/wiyorent.webp';

/*
  Données projets, vérifiées sur les dépôts GitHub et les projets locaux (septembre 2026).

  - `logo`      : logo récupéré dans le dépôt du projet. `null` = aucun logo dans le dépôt,
                  la carte affiche alors le monogramme `initials`.
  - `logoBg`    : fond de la pastille du logo (blanc par défaut).
  - `logoCover` : le logo est déjà une icône carrée pleine, affichée bord à bord.
  - `links`     : uniquement des liens vérifiés. `kind` = 'demo' | 'github'.
  - `private`   : dépôt privé, aucun lien vers le code n'est publié.
  - `featured`  : place le projet en tête de grille.
*/

export const projectsData = [
  // ── Projets en vedette ──────────────────────────────────────────────
  {
    id: 'allibuy',
    title: 'Allibuy',
    category: 'Full-Stack',
    status: 'En développement',
    featured: true,
    private: true,
    logo: allibuyLogo,
    summary: 'Marketplace multi-vendeurs internationale : API NestJS, web Next.js et applications mobiles Expo dans un seul monorepo.',
    description: "Allibuy est une marketplace multi-vendeurs pensée pour l'international (FCFA, EUR, USD, numéros de tous pays). Tout vit dans un monorepo : une API NestJS, un site Next.js, quatre applications Expo (acheteur, vendeur, livreur, administration) et des paquets partagés pour les types et les validateurs Zod. La base PostgreSQL compte plus d'une centaine de modèles Prisma, et la suite de tests backend dépasse les 870 tests.",
    features: [
      'Quatre rôles (acheteur, vendeur, livreur, administration) avec RBAC stocké en base',
      'Sécurité côté base : row-level security PostgreSQL, triggers et journal d\'audit',
      'Escrow des paiements et wallet vendeur',
      'Recherche Meilisearch, files de tâches Redis / BullMQ, temps réel Socket.io',
      'Types et schémas Zod partagés entre le web, le mobile et l\'API',
      'Paiement mobile money en cours d\'intégration (adaptateur verrouillé jusqu\'à validation en bac à sable)',
    ],
    tech: ['NestJS', 'Next.js 15', 'React 19', 'Expo (React Native)', 'Prisma', 'PostgreSQL', 'Redis / BullMQ', 'Meilisearch', 'Socket.io', 'Docker'],
    links: [],
  },
  {
    id: 'zolya',
    title: 'Zolya',
    category: 'Mobile',
    status: 'En développement',
    featured: true,
    private: true,
    logo: zolyaLogo,
    logoCover: true,
    summary: 'Marketplace C2C de vêtements d\'occasion avec sa propre logistique : deux apps Flutter, une API NestJS et un espace admin Next.js.',
    description: "Zolya est une marketplace camerounaise de vêtements et d'accessoires d'occasion, avec un service de livraison intégré, Zolya Delivery. Le monorepo réunit deux applications Flutter (acheteurs et vendeurs, livreurs) construites en Clean Architecture avec BLoC, des paquets Dart partagés (cœur, client d'API, design system), une API NestJS et un espace d'administration Next.js rendu côté serveur.",
    features: [
      'Authentification durcie : OTP haché, Argon2id, refresh token rotatif, RBAC',
      'Commande avec escrow et registre financier en double entrée',
      'Livraison multi-niveaux avec agences, missions et codes de sécurité',
      'Portefeuille, retraits, litiges et parrainage',
      'Jobs durables sur Redis / BullMQ (repli automatique, annulation après 48 h)',
      'Paiement Mobile Money derrière une couche d\'abstraction',
    ],
    tech: ['Flutter', 'Dart', 'BLoC', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis / BullMQ', 'Next.js', 'Swagger', 'Docker'],
    links: [],
  },
  {
    id: 'campaign-mailer',
    title: 'Campaign Mailer',
    category: 'Full-Stack',
    status: 'Déployé · bêta',
    featured: true,
    logo: campaignLogo,
    summary: "Envoi de campagnes d'e-mails personnalisés depuis son propre compte Gmail, à un rythme qui respecte les quotas de Google.",
    description: "Chaque utilisateur connecte son compte Google, importe ses contacts en CSV, écrit un modèle avec des variables et joint jusqu'à cinq fichiers (un CV par exemple). L'application envoie ensuite la campagne à son rythme, pendant les heures de bureau. Le moteur d'envoi est la partie la plus travaillée : un contact ne doit jamais recevoir deux fois le même message, même si le worker s'arrête en plein envoi.",
    features: [
      'Connexion Google OAuth 2.0 et envoi via l\'API Gmail',
      'Import CSV, modèles avec variables et aperçu en direct',
      'Moteur d\'envoi BullMQ idempotent sur trois niveaux (id de job, claim SQL, index unique)',
      'Plafond de 450 envois par 24 h glissantes, pause aléatoire entre deux messages',
      'Envoi limité aux heures de bureau dans le fuseau de la campagne',
      'Historique des envois, relances, export des données et suppression du compte',
      'Logs structurés, Sentry, endpoints de santé, tests backend et parcours Playwright',
    ],
    tech: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Express 5', 'PostgreSQL (Neon)', 'BullMQ / Redis', 'API Gmail', 'Playwright'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://campaign-mailer-app.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/Nagoloum/Campaign-Mailer' },
    ],
  },
  {
    id: 'nexagold',
    title: 'NexaGold',
    category: 'Data & IA',
    status: 'En développement',
    featured: true,
    private: true,
    logo: null,
    initials: 'NG',
    summary: "Plateforme de trading algorithmique sur l'or : moteur Python FastAPI relié à MetaTrader 5, API NestJS et dashboard Next.js.",
    description: "NexaGold prend la suite de mes premiers bots de trading. Le moteur Python enchaîne données, stratégie, risque et exécution, et pilote un compte démo MetaTrader 5. Autour, une API NestJS gère rapports et alertes, et un dashboard Next.js affiche l'état du système. Le projet accorde plus de place à la validation qu'au trading lui-même : backtest sans biais de look-ahead, limites de risque centralisées et modèles IA évalués avant d'être branchés.",
    features: [
      'Kill switch persisté, limites de perte quotidienne et hebdomadaire, cooldowns',
      'Filtre d\'annonces économiques « fail-closed » : sans calendrier, aucun nouvel ordre',
      'Backtest évènementiel M1 avec spread et slippage simulés',
      'Stratégie « liquidity sweep » multi-timeframe, en paper trading uniquement',
      'Pipeline d\'entraînement walk-forward (scikit-learn, LightGBM) avec promotion manuelle des modèles',
      'Tests pytest et intégration continue GitHub Actions',
    ],
    tech: ['Python', 'FastAPI', 'MetaTrader 5', 'pandas', 'scikit-learn / LightGBM', 'NestJS', 'Prisma', 'Next.js 16', 'PostgreSQL'],
    links: [],
  },
  {
    id: 'cyna',
    title: 'Cyna',
    category: 'Full-Stack',
    status: 'Déployé · projet en équipe',
    featured: true,
    logo: cynaLogo,
    summary: "E-commerce de services de cybersécurité (SOC, EDR, XDR) en abonnement, réalisé en équipe : front React et API NestJS.",
    description: "Cyna vend des services de cybersécurité sous forme d'abonnements. Projet de formation mené en équipe : j'ai écrit la majeure partie du front-end et une bonne part de l'API. Le site couvre tout le parcours d'achat, du catalogue au paiement Stripe, puis l'espace client avec ses abonnements et licences, et un backoffice pour l'administration.",
    features: [
      'Catalogue, panier, paiement Stripe et factures PDF',
      'Espace client : abonnements, licences, commandes',
      'Backoffice administrateur avec graphiques Chart.js',
      'Interface en français, anglais et arabe (support RTL)',
      'API sécurisée : cookies JWT httpOnly avec rotation, 2FA, rate limiting, Helmet',
      'Webhook Stripe vérifié par signature, documentation Swagger, tests Jest et Vitest',
    ],
    tech: ['React 19', 'Redux Toolkit', 'Tailwind CSS', 'i18next', 'Stripe', 'NestJS 11', 'MongoDB', 'Swagger'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://cynaapp.vercel.app' },
      { kind: 'github', label: 'GitHub Frontend', url: 'https://github.com/Nagoloum/Frontend_cyna' },
      { kind: 'github', label: 'GitHub Backend', url: 'https://github.com/Nagoloum/Backend_cyna' },
    ],
  },
  {
    id: 'portail-depot',
    title: 'Portail de dépôt de pièces',
    category: 'Full-Stack',
    status: 'Déployé · test technique',
    featured: true,
    logo: null,
    initials: 'PD',
    summary: 'Un avocat génère un lien expirable protégé par PIN, son client y dépose ses pièces sans créer de compte.',
    description: "Réalisé pendant un test technique, en deux jours. L'avocat crée une demande de dépôt et obtient un lien public qui expire, protégé par un code à quatre chiffres. Le client dépose ses documents sans compte. L'application est conteneurisée de bout en bout, déployée en HTTPS, et livrée avec sa supervision Prometheus et Grafana.",
    features: [
      'Lien public expirable, déverrouillage par PIN avec verrouillage après plusieurs échecs',
      'Deux stratégies JWT séparées : un jeton client ne peut pas servir sur les routes avocat',
      'Stockage des fichiers sur MinIO (compatible S3), journal d\'audit des accès',
      'Logique de statut isolée et testée unitairement avec Jest',
      'Métriques Prometheus, dashboards Grafana et règles d\'alerte',
      'Installation en une commande, images publiées sur GitHub Container Registry',
    ],
    tech: ['NestJS', 'TypeORM', 'PostgreSQL', 'MinIO', 'React', 'Vite', 'Chakra UI v3', 'Docker', 'Prometheus / Grafana'],
    links: [
      { kind: 'demo', label: 'Voir la démo', url: 'https://daniel-nagoloum.stage2-div.rayan-drissi.com' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/Nagoloum/portail' },
    ],
  },
  {
    id: 'trackship',
    title: 'Trackship',
    category: 'Full-Stack',
    status: 'Déployé',
    featured: true,
    logo: trackshipLogo,
    logoCover: true,
    summary: 'Suivi de colis multilingue : page de suivi publique, dashboard admin et reçus PDF avec QR code et code-barres.',
    description: "Trackship permet à une société de transport de publier le suivi de ses colis. Le client entre son numéro sur la page publique, sans inscription. L'administrateur gère les commandes et leurs étapes depuis un dashboard, et génère des reçus en PDF ou en PNG dans la langue du destinataire.",
    features: [
      'Page de suivi publique sans compte',
      'Dashboard admin : commandes, évènements de suivi, messages, historique des reçus',
      'Reçus PDF et PNG avec QR code et code-barres Code-128',
      'Interface en français, anglais, espagnol et allemand',
      'Supabase (PostgreSQL, Auth, RLS), clé de service utilisée côté serveur uniquement',
      'Thème clair et sombre',
    ],
    tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'shadcn/ui', 'Supabase', 'next-intl', 'React PDF'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://trackship-eta.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/Nagoloum/Trackship' },
    ],
  },
  {
    id: 'fundatrade',
    title: 'Fundatrade',
    category: 'Data & IA',
    status: 'Déployé',
    featured: true,
    logo: fundatradeLogo,
    summary: "Analyse technique et fondamentale du Bitcoin et de l'or, avec une prédiction hebdomadaire scorée.",
    description: "Fundatrade rassemble dans une seule interface ce que je consultais avant chaque décision de trading : prix en temps réel, indicateurs techniques, contexte macro, actualités et calendrier économique. L'application croise plusieurs stratégies avec un système de score et en tire une prédiction (direction, objectif, stop, ratio risque/rendement) dont la performance est suivie dans la semaine.",
    features: [
      'Prix en direct via WebSocket (Kraken pour le BTC)',
      'Huit indicateurs calculés côté serveur en TypeScript, sans librairie externe',
      'Six stratégies croisées et détection du régime de marché',
      'Contexte macro (FRED), calendrier économique et sentiment des actualités',
      'Prédiction hebdomadaire avec suivi du P&L et historique',
    ],
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Recharts', 'WebSockets'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://fundatrade.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/Nagoloum/Fundatrade' },
    ],
  },

  // ── Autres projets ──────────────────────────────────────────────────
  {
    id: 'findit',
    title: 'Findit',
    category: 'Full-Stack',
    status: 'En développement',
    private: true,
    logo: finditLogo,
    summary: "Agrégateur d'offres d'alternance et de stage en développement en Île-de-France, avec collecte automatisée.",
    description: "Findit centralise les offres d'alternance et de stage en développement publiées en Île-de-France et renvoie toujours vers l'annonce d'origine. Le socle public fonctionne : collecte planifiée, normalisation et recherche. La partie privée (analyse de CV et suivi de candidatures) est en cours, avec une règle stricte : ne jamais inventer une compétence ou une expérience.",
    features: [
      'Monorepo pnpm / Turborepo : web Next.js, API NestJS sur Fastify, worker BullMQ',
      'Connecteurs Greenhouse, Lever et Workable, avec tests',
      'Pipeline de normalisation, classification et ingestion des offres',
      'API publique : recherche, filtres, statistiques',
      'Import de CV (PDF, DOCX, TXT) et structuration via une IA locale (Ollama), désactivée par défaut',
    ],
    tech: ['Next.js', 'NestJS + Fastify', 'Prisma', 'PostgreSQL', 'Redis / BullMQ', 'Docker', 'Turborepo'],
    links: [],
  },
  {
    id: 'trading-bots',
    title: 'XAUFxBot & SYNFxBot',
    category: 'Data & IA',
    status: 'Fonctionnel',
    logo: botsLogo,
    summary: "Deux bots de trading Python pour MetaTrader 5 : l'un sur l'or, l'autre sur les indices synthétiques.",
    description: "Mes premiers projets de trading automatisé, construits sur la même base : connexion MetaTrader 5, historique des trades dans MongoDB, alertes Telegram et tableau de bord Streamlit. XAUFxBot trade l'or à partir de zones d'offre et de demande, avec un biais fondamental. SYNFxBot trade les indices de volatilité sur un alignement de tendance multi-timeframe et peut répliquer ses ordres sur plusieurs comptes.",
    features: [
      'XAUFxBot : zones offre / demande en H1, confirmations (BOS, FVG, sweep de liquidité), biais H4',
      'XAUFxBot : score fondamental (inflation, DXY, actualités, saisonnalité…)',
      'SYNFxBot : croisement EMA 20/50 en M1 aligné sur M15 et M30',
      'Risque par trade fixe, stop à l\'ATR, break-even et trailing stop',
      'Multi-comptes (SYNFxBot), alertes Telegram, courbe de capital sur Streamlit',
    ],
    tech: ['Python', 'MetaTrader 5', 'pandas', 'MongoDB', 'Streamlit', 'Telegram'],
    links: [
      { kind: 'github', label: 'GitHub XAUFxBot', url: 'https://github.com/Nagoloum/XAUFxBot' },
      { kind: 'github', label: 'GitHub SYNFxBot', url: 'https://github.com/Nagoloum/SYNFxBot' },
    ],
  },
  {
    id: 'rememberme',
    title: 'RememberMe',
    category: 'Full-Stack',
    status: 'Déployé',
    logo: remembermeLogo,
    summary: 'Gestionnaire de tâches et de rappels : front React et API REST Express / MongoDB sécurisée par JWT.',
    description: "Une application de tâches que j'ai construite en entier, du front à l'API. On y organise ses tâches en listes, on les retrouve dans un calendrier et une vue « à venir », et on reçoit les rappels du jour. Côté API, chaque requête est rattachée à l'utilisateur authentifié, et un test d'intégration vérifie qu'on ne peut pas lire les tâches d'un autre compte.",
    features: [
      'Inscription et connexion',
      'Listes, tâches, calendrier et vue des tâches à venir',
      'Mots de passe hachés avec bcrypt, routes protégées par JWT',
      'Isolation des données par utilisateur, couverte par des tests Jest + Supertest',
      'Thème clair / sombre et changement de langue',
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Jest'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://rememberme-lemon-chi.vercel.app' },
      { kind: 'github', label: 'GitHub Frontend', url: 'https://github.com/Nagoloum/Frontend_RememberMe' },
      { kind: 'github', label: 'GitHub Backend', url: 'https://github.com/Nagoloum/Backend_RememberMe' },
    ],
  },
  {
    id: 'task-app',
    title: 'Task App',
    category: 'Full-Stack',
    status: 'Terminé',
    logo: null,
    initials: 'TA',
    summary: 'Gestion de listes et de tâches façon Wunderlist : front Angular, API NestJS et MongoDB.',
    description: "Une application de listes de tâches inspirée de Wunderlist et Google Tasks, écrite avec Angular côté client et NestJS côté serveur. Le projet m'a servi à travailler l'architecture modulaire des deux frameworks : modules, services, DTO validés côté API ; guards et intercepteurs côté Angular.",
    features: [
      'Inscription et connexion avec JWT (Passport)',
      'Listes et tâches : création, modification, suppression',
      'Guard de route et intercepteur HTTP qui ajoute le jeton côté Angular',
      'DTO validés avec class-validator côté API',
    ],
    tech: ['Angular', 'TypeScript', 'Tailwind CSS', 'NestJS', 'MongoDB', 'Passport JWT'],
    links: [
      { kind: 'github', label: 'GitHub', url: 'https://github.com/Nagoloum/libheros-task-app' },
    ],
  },
  {
    id: 'nagosui',
    title: 'NagosUI',
    category: 'Front-End',
    status: 'En développement',
    logo: nagosuiLogo,
    summary: 'Librairie de composants animés et site vitrine, organisés en monorepo pnpm + Turborepo.',
    description: "NagosUI est ma librairie de composants front-end, distribuée à la manière de shadcn : on récupère le code source et on le garde. Toutes les valeurs visuelles (couleurs, rayons, ombres, courbes d'animation) passent par des tokens, pour pouvoir changer toute la direction artistique en un seul endroit. Le site vitrine sert de terrain d'essai.",
    features: [
      'Design tokens Tailwind CSS v4 et tokens d\'animation partagés',
      'Composants animés avec Motion (bouton magnétique…)',
      'Site vitrine avec pages composants, blocs, templates et documentation',
      'Scroll fluide avec Lenis',
    ],
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Motion', 'Lenis', 'Turborepo'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://nagosui.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/Nagoloum/NagosUI' },
    ],
  },
  {
    id: 'sellcatalog',
    title: 'SellCatalog',
    category: 'Mobile',
    status: 'Prototype fonctionnel',
    logo: sellcatLogo,
    summary: 'Catalogue de ventes privées en Flutter, connecté à une API Python Flask.',
    description: "Une application Flutter qui consomme une petite API Flask. Au lancement, elle vérifie si une session existe déjà ; sinon elle affiche l'écran de connexion. L'utilisateur parcourt ensuite le catalogue des ventes privées, cherche un produit, filtre par catégorie et garde ses favoris d'une session à l'autre.",
    features: [
      'Inscription et connexion, session conservée localement',
      'Catalogue chargé depuis l\'API avec image, catégorie et prix',
      'Recherche et filtre par catégorie',
      'Favoris persistants avec shared_preferences',
    ],
    tech: ['Flutter', 'Dart', 'Material 3', 'Python', 'Flask'],
    links: [
      { kind: 'github', label: 'GitHub', url: 'https://github.com/Nagoloum/SellCatalog' },
    ],
  },
  {
    id: 'wiyorent',
    title: 'Wiyorent',
    category: 'Front-End',
    status: 'Déployé',
    logo: wiyorentLogo,
    logoBg: '#000000',
    summary: 'Site de location au Cameroun : appartements, logements étudiants, voitures, salles et services événementiels.',
    description: "Site vitrine d'une activité de location au Cameroun. Chaque offre a sa page (appartements, logements étudiants, maisons, voitures, salles de cérémonie, traiteur, décoration) avec galerie photo et fiche détaillée. Le contact passe par les réseaux sociaux et WhatsApp.",
    features: [
      'Une dizaine de pages : catégories de location et fiches détaillées',
      'Galeries photo avec carrousel et zoom',
      'Boutons de contact WhatsApp et réseaux sociaux',
      'Mise en page responsive avec Tailwind CSS',
    ],
    tech: ['React', 'Vite', 'React Router', 'Tailwind CSS'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://wiyorent.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/Nagoloum/wiyorent' },
    ],
  },
  {
    id: 'krossty',
    title: 'Krossty',
    category: 'Front-End',
    status: 'Déployé',
    logo: krosstyLogo,
    summary: 'Site de vente de chips à Douala : catalogue de formats et commande par WhatsApp.',
    description: "Site vitrine pour une marque de chips basée à Douala. Le visiteur choisit un format sur la fiche produit, puis un bouton ouvre WhatsApp avec un message de commande déjà rempli (produit et prix). Pas de paiement en ligne : la commande se conclut directement avec le vendeur.",
    features: [
      'Catalogue et fiches produit par format',
      'Commande via un message WhatsApp pré-rempli',
      'Carrousel, défilement animé et page de contact avec carte',
    ],
    tech: ['React', 'Vite', 'React Router', 'Tailwind CSS'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://krossty.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/Nagoloum/Krossty' },
    ],
  },
  {
    id: 'creamy-milk-candies',
    title: 'Creamy Milk Candies',
    category: 'Front-End',
    status: 'Déployé',
    logo: creamyLogo,
    summary: 'Site de vente de bonbons au lait : galerie de produits et commande par WhatsApp.',
    description: "Site vitrine pour une marque de bonbons au lait. Même principe que Krossty : le visiteur consulte les produits, ouvre la fiche qui l'intéresse et passe commande par un message WhatsApp pré-rempli.",
    features: [
      'Galerie et fiches produit',
      'Commande via un message WhatsApp pré-rempli',
      'Liens vers les réseaux sociaux de la marque',
    ],
    tech: ['React', 'Vite', 'React Router', 'Tailwind CSS'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://creamy-milk-candies.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/Nagoloum/Creamy-milk-candies' },
    ],
  },
];

export const projectsNav = [
  { name: 'Tous' },
  { name: 'Full-Stack' },
  { name: 'Front-End' },
  { name: 'Data & IA' },
  { name: 'Mobile' },
];
