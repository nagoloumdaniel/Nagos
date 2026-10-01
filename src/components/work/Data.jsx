import allibuyLogo    from '../../assets/logos/allibuy.webp';
import zolyaLogo      from '../../assets/logos/zolya.webp';
import campaignLogo   from '../../assets/logos/campaign-mailer.svg';
import cynaLogo       from '../../assets/logos/cyna.webp';
import fundatradeLogo from '../../assets/logos/fundatrade.webp';
import finditLogo     from '../../assets/logos/findit.webp';
import nagosuiLogo    from '../../assets/logos/nagosui.webp';
import remembermeLogo from '../../assets/logos/rememberme.webp';
import krosstyLogo    from '../../assets/logos/krossty.webp';
import creamyLogo     from '../../assets/logos/creamy-milk-candies.webp';
import wiyorentLogo   from '../../assets/logos/wiyorent.webp';
import qrStudioLogo   from '../../assets/logos/qr-studio.webp';
import ireneLogo      from '../../assets/logos/irene-hair-braids.webp';
import nexagoldLogo   from '../../assets/logos/nexagold.webp';
import kycLogo        from '../../assets/logos/kyc-checker.webp';
import mailfindLogo   from '../../assets/logos/mailfind.svg';
import builditLogo    from '../../assets/logos/buildit.webp';

/*
  Données projets, vérifiées sur les dépôts GitHub et les projets locaux (septembre 2026).

  - `logo`      : logo récupéré dans le dépôt du projet. `null` = aucun logo dans le dépôt,
                  la carte affiche alors le monogramme `initials`.
  - `logoIcon`  : le projet n'a pas de fichier logo mais sa marque est une icône (Thebarber),
                  reprise ici avec la même icône et le même fond.
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
      { kind: 'demo', label: 'Voir le site', url: 'https://campaignmailer.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/Campaign-Mailer' },
    ],
  },
  {
    id: 'mailfind',
    title: 'Mailfind',
    category: 'Full-Stack',
    status: 'Déployé · bêta',
    featured: true,
    logo: mailfindLogo,
    logoCover: true,
    summary: "Recherche et vérification d'adresses e-mail professionnelles à partir d'un nom et d'un domaine.",
    description: "Mailfind retrouve l'adresse e-mail professionnelle la plus probable d'une personne à partir de son nom et du domaine de son entreprise, en combinant plusieurs schémas d'adresses courants avec une vérification de validité.",
    features: [],
    tech: [],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://mailfind.vercel.app' },
    ],
  },
  {
    id: 'buildit',
    title: 'BuildIt',
    category: 'Full-Stack',
    status: 'En développement',
    featured: true,
    private: true,
    logo: builditLogo,
    summary: 'Projet en cours de développement.',
    description: "BuildIt est en cours de développement. Pas encore de lien public à ce stade.",
    features: [],
    tech: [],
    links: [],
  },
  {
    id: 'nexagold',
    title: 'NexaGold',
    category: 'Data & IA',
    status: 'En développement',
    featured: true,
    logo: nexagoldLogo,
    logoBg: '#0F0E17', // le logo est blanc, pensé pour un fond sombre
    summary: "Plateforme de trading algorithmique sur l'or : moteur Python FastAPI relié à MetaTrader 5, API NestJS et dashboard Next.js.",
    description: "NexaGold prend la suite de mes premiers bots de trading. Le moteur Python enchaîne données, stratégie, risque et exécution, et pilote un compte démo MetaTrader 5. Autour, une API NestJS gère rapports et alertes, et un dashboard Next.js affiche l'état du système. Le projet accorde plus de place à la validation qu'au trading lui-même : backtest sans biais de look-ahead, limites de risque centralisées et modèles IA évalués avant d'être branchés.",
    features: [
      'Kill switch persisté, limites de perte quotidienne et hebdomadaire, cooldowns',
      'Filtre d\'annonces économiques « fail-closed » : sans calendrier, aucun nouvel ordre',
      'Backtest évènementiel M1 avec spread et slippage simulés',
      'Stratégies multi-timeframe (actuellement « scalp M5 ») évaluées en paper trading, promues manuellement seulement si elles passent le backtest',
      'Pipeline d\'entraînement walk-forward (scikit-learn, LightGBM) avec promotion manuelle des modèles',
      'Tests pytest et intégration continue GitHub Actions',
    ],
    tech: ['Python', 'FastAPI', 'MetaTrader 5', 'pandas', 'scikit-learn / LightGBM', 'NestJS', 'Prisma', 'Next.js 16', 'PostgreSQL'],
    links: [
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/NexaGoldAI' },
    ],
  },
  {
    id: 'cyna',
    title: 'Cyna',
    category: 'Full-Stack',
    status: 'Déployé · projet en équipe',
    featured: true,
    logo: cynaLogo,
    summary: "E-commerce de services de cybersécurité (SOC, EDR, XDR) en abonnement, réalisé en équipe : front React et API NestJS.",
    description: "Cyna vend des services de cybersécurité sous forme d'abonnements. Projet de formation mené en équipe (5 personnes) : j'ai écrit la quasi-totalité du front-end (~90 % des commits) et contribué à l'API côté infrastructure et sécurité (déploiement, base de données, rotation des refresh tokens). Le site couvre tout le parcours d'achat, du catalogue au paiement Stripe, puis l'espace client avec ses abonnements et licences, et un backoffice pour l'administration.",
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
      { kind: 'github', label: 'Frontend', url: 'https://github.com/nagoloumdaniel/Frontend_cyna' },
      { kind: 'github', label: 'Backend', url: 'https://github.com/nagoloumdaniel/Backend_cyna' },
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
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/Fundatrade' },
    ],
  },

  // ── Autres projets ──────────────────────────────────────────────────
  {
    id: 'findit',
    title: 'Findit',
    category: 'Full-Stack',
    status: 'En développement',
    logo: finditLogo,
    summary: "Agrégateur d'offres d'alternance et de stage en développement en Île-de-France, avec collecte automatisée.",
    description: "Findit centralise les offres d'alternance et de stage en développement publiées en Île-de-France et renvoie toujours vers l'annonce d'origine. Le socle public fonctionne : collecte planifiée, normalisation et recherche. La partie privée (analyse de CV et suivi de candidatures) est en cours, avec une règle stricte : ne jamais inventer une compétence ou une expérience.",
    features: [
      'Monorepo pnpm / Turborepo : web Next.js, API NestJS sur Fastify, worker BullMQ',
      'Connecteurs Greenhouse et Lever actifs ; connecteur Workable implémenté et testé, pas encore planifié en production',
      'Pipeline de normalisation, classification et ingestion des offres',
      'API publique : recherche, filtres, statistiques',
      'Import de CV (PDF, DOCX, TXT) et structuration via une IA locale (Ollama), désactivée par défaut',
    ],
    tech: ['Next.js', 'NestJS + Fastify', 'Prisma', 'PostgreSQL', 'Redis / BullMQ', 'Docker', 'Turborepo'],
    links: [
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/Findit' },
    ],
  },
  {
    id: 'kyc-checker',
    title: 'KYC Checker',
    category: 'Data & IA',
    status: 'Fonctionnel',
    logo: kycLogo,
    logoCover: true,
    summary: "Vérification de pièces d'identité : lecture de la MRZ, correspondance du nom, comparaison de visage et archivage chiffré.",
    description: "KYC Checker analyse la photo d'une pièce d'identité. Il lit la bande MRZ des passeports et des cartes d'identité, contrôle ses clés selon la norme ICAO 9303, compare le nom à celui attendu et, si un selfie est fourni, le visage à la photo du document. Il rend une décision (validé, suspect ou rejeté) accompagnée d'un score. Le module annonce clairement sa limite : il vérifie la cohérence d'un document, pas son authenticité physique.",
    features: [
      'MRZ des passeports (TD3), cartes d\'identité (TD1) et pièces TD2, avec correction des erreurs OCR',
      'Correspondance floue des noms (Jaro-Winkler)',
      'Comparaison selfie / photo de la pièce avec OpenCV (YuNet + SFace)',
      'Contrôles qualité de l\'image : résolution et netteté',
      'API FastAPI protégée par clé, images traitées en mémoire uniquement',
      'Archivage chiffré AES-256-GCM, recherche par jetons HMAC sans donnée personnelle en clair, journal d\'audit',
      'SDK TypeScript pour Next.js, image Docker, 50 tests pytest',
    ],
    tech: ['Python', 'FastAPI', 'OpenCV', 'Tesseract OCR', 'Cryptography', 'Docker', 'pytest'],
    links: [
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/KYC-Checker' },
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
      'Thème clair / sombre, bascule FR/EN basée sur la traduction native du navigateur',
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Jest'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://rememberme-lemon-chi.vercel.app' },
      { kind: 'github', label: 'Frontend', url: 'https://github.com/nagoloumdaniel/Frontend_RememberMe' },
      { kind: 'github', label: 'Backend', url: 'https://github.com/nagoloumdaniel/Backend_RememberMe' },
    ],
  },
  {
    id: 'nagosui',
    title: 'NagosUI',
    category: 'Front-End',
    status: 'En développement',
    logo: nagosuiLogo,
    summary: 'Librairie de composants animés et site vitrine, organisés en monorepo pnpm + Turborepo.',
    description: "NagosUI est ma librairie de composants front-end, pensée dans un monorepo pnpm/Turborepo pour rester lisible et éditable plutôt que packagée en boîte noire. Toutes les valeurs visuelles (couleurs, rayons, ombres, courbes d'animation) passent par des tokens, pour pouvoir changer toute la direction artistique en un seul endroit. Le site vitrine sert de terrain d'essai et de documentation.",
    features: [
      'Design tokens Tailwind CSS v4 et tokens d\'animation partagés',
      'Premier composant animé avec Motion (bouton magnétique, 5 variantes)',
      'Site vitrine avec palette de commandes, thème clair/sombre et interface bilingue FR/EN ; pages Docs/Blocks/Templates en construction',
      'Scroll fluide avec Lenis',
    ],
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Motion', 'Lenis', 'Turborepo'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://nagosui.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/NagosUI' },
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
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/wiyorent' },
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
      'Fiche produit avec sélection de format (50g / 100g / 150g)',
      'Commande via un message WhatsApp pré-rempli',
      'Carrousel, défilement animé et page de contact avec carte',
    ],
    tech: ['React', 'Vite', 'React Router', 'Tailwind CSS'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://krossty.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/Krossty' },
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
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/Creamy-milk-candies' },
    ],
  },
  {
    id: 'qr-studio',
    title: 'QR Studio',
    category: 'Front-End',
    status: 'Déployé',
    logo: qrStudioLogo,
    summary: 'Générateur de QR codes personnalisables : dix types de contenu, styles, couleurs, logo et export en image.',
    description: "QR Studio génère des QR codes personnalisables directement dans le navigateur. L'encodage (norme ISO/IEC 18004, niveau de correction d'erreur H) passe par la librairie `qrcode` ; le travail fait main porte sur ce qui vient après : rendu SVG stylé, export et contrôle de scannabilité. On choisit le type de contenu, on personnalise le rendu, puis on télécharge l'image.",
    features: [
      'Dix types de contenu : lien, texte, e-mail, téléphone, SMS, Wi-Fi, vCard, crypto, géolocalisation, évènement',
      'Rendu SVG maison : formes de module, dégradés, couleur des repères, logo central',
      'Vérification de scannabilité (contraste, couverture du logo selon le niveau de correction)',
      'Export PNG, JPG, WebP ou Base64',
      'Thème clair / sombre',
    ],
    tech: ['React', 'JavaScript', 'Canvas API', 'Three.js'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://qrstudio-lovat.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/QrStudioAd' },
    ],
  },
  {
    id: 'irene-hair-braids',
    title: 'Irene Hair Braids',
    category: 'Front-End',
    status: 'Déployé',
    logo: ireneLogo,
    summary: 'Site vitrine pour une coiffeuse spécialisée dans les tresses : catalogue de coiffures et contact.',
    description: "Site vitrine d'une activité de tresses. Les visiteuses parcourent le catalogue de coiffures en photos, agrandissent celles qui les intéressent, puis contactent la coiffeuse via les coordonnées et les réseaux sociaux.",
    features: [
      'Catalogue de coiffures avec agrandissement des photos',
      'Carrousel et défilement animé',
      'Coordonnées et boutons vers les réseaux sociaux',
    ],
    tech: ['React', 'Vite', 'React Router', 'Tailwind CSS'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://irene-hair-braids.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/irene-hair-braids' },
    ],
  },
  {
    id: 'gestion-tickets-bus',
    title: 'Gestion Tickets Bus',
    category: 'Full-Stack',
    status: 'Projet de formation',
    logo: null,
    initials: 'GT',
    summary: 'Réservation de tickets de bus en PHP / MySQL : trajets, agences, paiement et factures PDF.',
    description: "Application de réservation de billets de bus. Le client choisit un trajet, réserve, paie et récupère sa facture en PDF. L'administrateur gère les agences, les bus, les trajets, les réservations et les utilisateurs.",
    features: [
      'Recherche de trajets et réservation',
      'Paiement et génération de factures PDF (FPDF)',
      'Back-office : agences, bus, trajets, réservations, utilisateurs',
      'Sessions et séparation client / administrateur',
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'FPDF'],
    links: [
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/Gestion_tickets_bus' },
    ],
  },
  {
    id: 'gestion-dechets',
    title: 'Gestion Déchets',
    category: 'Full-Stack',
    status: 'Projet de formation',
    logo: null,
    initials: 'GD',
    summary: 'Signalement de dépôts de déchets par les habitants et suivi de leur collecte par des agents.',
    description: "Plateforme de signalement de déchets en PHP. Un habitant signale un dépôt avec une photo, une catégorie et un lieu. L'administrateur visualise le signalement sur une carte et l'assigne à un agent de collecte, qui marque ensuite la tâche comme terminée.",
    features: [
      'Formulaire de signalement avec photo, catégorie et localisation',
      'Affichage du lieu signalé sur Google Maps',
      'Assignation des tâches aux agents de collecte',
      'Trois espaces : habitant, administrateur, agent',
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
    links: [
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/Gestion_Dechets' },
    ],
  },
  {
    id: 'feedback',
    title: 'Feedback',
    category: 'Full-Stack',
    status: 'Projet de formation',
    logo: null,
    initials: 'FB',
    summary: 'Collecte des retours des étudiants sur leurs modules de formation, avec espaces formateur et admin.',
    description: "Application PHP de feedback pédagogique. Les étudiants évaluent les modules qu'ils suivent, les formateurs consultent les retours sur leurs cours, et l'administrateur gère étudiants, modules et feedbacks depuis un tableau de bord.",
    features: [
      'Espaces étudiant, formateur et administrateur',
      'Dépôt de feedback par module et historique',
      'Changement de mot de passe à la première connexion, mots de passe hachés',
      'Tableaux de bord et listes chargées en AJAX',
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'AJAX'],
    links: [
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/Feedback' },
    ],
  },
  {
    id: 'quotes',
    title: 'Quotes',
    category: 'Front-End',
    status: 'Déployé',
    logo: null,
    initials: 'QT',
    summary: 'Générateur de citations en JavaScript, avec tests Jest et intégration continue GitHub Actions.',
    description: "Un petit générateur de citations aléatoires. Le code est volontairement simple : le but de l'exercice était de mettre en place des tests unitaires avec Jest et un workflow GitHub Actions qui les exécute à chaque push.",
    features: [
      'Affichage d\'une citation aléatoire',
      'Tests unitaires Jest',
      'Workflow d\'intégration continue GitHub Actions',
    ],
    tech: ['JavaScript', 'Jest', 'GitHub Actions'],
    links: [
      { kind: 'demo', label: 'Voir le site', url: 'https://projet-citations-dusky.vercel.app' },
      { kind: 'github', label: 'GitHub', url: 'https://github.com/nagoloumdaniel/projet-citations' },
    ],
  },
];

export const projectsNav = [
  { name: 'Tous' },
  { name: 'Full-Stack' },
  { name: 'Front-End' },
  { name: 'Data & IA' },
  { name: 'Mobile' },
  { name: 'Jeu' },
];
