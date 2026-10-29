import allibuyLogo  from '../../assets/logos/allibuy.webp';
import campaignLogo from '../../assets/logos/campaign-mailer.svg';
import cynaLogo     from '../../assets/logos/cyna.webp';

/*
  Projets du CV (CV_Daniel_NAGOLOUM_TALLA.pdf), détaillés d'après les dépôts.
  - `private`      : dépôt privé, aucun lien vers le code.
  - `figures`      : chiffres clés (valeur + libellé).
  - `features`     : fonctionnalités, avec icône Unicons.
  - `architecture` : briques du projet.
  - `challenges`   : difficultés techniques traitées.
  - `stack`        : technologies groupées.
  - `links`        : liens vérifiés. `kind` = 'demo' | 'github'.
*/
export const projectsData = [
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
  {
    id: 'cyna',
    title: 'Cyna',
    category: 'Full-Stack',
    status: 'Projet académique · en équipe',
    logo: cynaLogo,
    summary: "Plateforme SaaS de cybersécurité (Web & Mobile) : e-commerce de services en abonnement avec backoffice administrateur.",
    overview: "Cyna vend des services de cybersécurité (SOC, EDR, XDR) sous forme d'abonnements. Le site couvre tout le parcours d'achat, du catalogue au paiement Stripe, puis l'espace client avec ses abonnements et licences, et un backoffice pour l'administration.",
    role: "Projet de formation mené en équipe de 5 personnes. J'ai écrit la quasi-totalité du front-end (environ 90 % des commits) et contribué à l'API côté infrastructure et sécurité : déploiement, base de données, rotation des refresh tokens.",
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
  {
    id: 'campaign-mailer',
    title: 'CampaignMailer',
    category: 'Full-Stack',
    status: 'Projet personnel',
    logo: campaignLogo,
    summary: "Application web de campagnes mail : envois depuis son compte Gmail, avec suivi d'envoi et dashboard.",
    overview: "Chaque utilisateur connecte son compte Google, importe ses contacts en CSV, écrit un modèle avec des variables et joint jusqu'à cinq fichiers (un CV par exemple). L'application envoie ensuite la campagne à son rythme, pendant les heures de bureau, avec suivi d'envoi et dashboard.",
    role: 'Projet personnel.',
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
