import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import './Blog.css';

/*
  Articles rédigés à partir des dépôts et de la documentation des projets (septembre 2026).
  Chaque fait technique (chiffre, choix, bug) est vérifiable dans le code du projet concerné.
  Un paragraphe peut commencer par un intertitre en gras : '**Intertitre.** Texte…'
*/
const posts = [
  {
    id: 'campaign-mailer-idempotence',
    category: 'Projet',
    date: 'Septembre 2026',
    readTime: '6 min',
    title: 'Campaign Mailer : ne jamais envoyer deux fois le même e-mail',
    excerpt: "Un e-mail envoyé ne se rattrape pas. Comment j'ai conçu le moteur d'envoi de Campaign Mailer autour de cette contrainte, avec BullMQ et PostgreSQL.",
    tags: ['BullMQ', 'PostgreSQL', 'API Gmail', 'Express'],
    icon: 'uil-envelope-send',
    color: '#0EA5E9',
    paragraphs: [
      "Campaign Mailer part d'un besoin très concret : envoyer des candidatures personnalisées sans y passer ses soirées. L'utilisateur connecte son compte Google, importe ses contacts en CSV, écrit un modèle avec des variables, et l'application envoie les messages depuis sa propre boîte Gmail, à un rythme raisonnable.",
      "**Le vrai risque, c'est le doublon.** Un bug d'affichage se corrige. Un e-mail envoyé deux fois à un recruteur, non. J'ai donc conçu le moteur d'envoi en partant des pannes possibles : un worker tué en plein envoi, une planification qui tourne deux fois, deux jobs qui tombent sur le même contact.",
      "**Trois protections plutôt qu'une.** Chaque job BullMQ porte l'identifiant du contact, ce qui empêche de le planifier deux fois. Avant d'envoyer, le job réserve le contact avec une seule requête UPDATE conditionnelle : si aucune ligne ne revient, c'est que quelqu'un d'autre s'en occupe, et le job s'arrête. Enfin, un index unique interdit d'enregistrer deux envois réussis pour le même contact. Chaque barrière peut céder seule, les trois ensemble beaucoup plus difficilement.",
      "**Le cas ambigu.** Gmail ne propose pas de clé d'idempotence : on envoie d'abord, on enregistre ensuite. Si le processus s'arrête entre les deux, impossible de savoir si le message est parti. J'ai choisi de ne pas réessayer. Le contact passe en échec avec un message explicite et l'utilisateur décide. Un e-mail manqué se renvoie, un doublon ne s'efface pas.",
      "**Respecter les limites de Gmail.** Google bloque un compte personnel au-delà de 500 messages par jour. L'application s'arrête à 450 sur 24 heures glissantes, pour laisser de la place aux e-mails écrits à la main. Les envois sont espacés d'au moins dix secondes, avec un décalage aléatoire, et n'ont lieu qu'aux heures de bureau, dans le fuseau horaire de la campagne.",
      "**Une contrainte que je n'attendais pas.** Redis est hébergé sur l'offre gratuite d'Upstash, limitée à 500 000 commandes par mois. Or un worker inactif interroge Redis en permanence : j'ai mesuré 12 commandes par minute, ce qui dépasse le quota. J'ai donc mis le worker en veille quand rien n'est prévu. Il tombe à une commande par minute, et lors de ma mesure, un job ajouté pendant la veille a démarré 89 secondes plus tard.",
      "**Ce que j'en retiens.** Le moteur d'envoi a sa propre documentation, qui écrit noir sur blanc chaque compromis et ce qu'on choisit en le modifiant. Le premier test réel, cinq e-mails le 14 septembre, s'est déroulé sans doublon. C'est un petit échantillon, mais c'était précisément ce que je voulais vérifier.",
    ],
  },
  {
    id: 'portail-test-technique',
    category: 'Projet',
    date: 'Septembre 2026',
    readTime: '5 min',
    title: 'Deux jours de test technique : le portail de dépôt de pièces',
    excerpt: "Une partie sans IA, une partie avec, et une application complète à déployer en HTTPS. Les choix que j'ai faits sous contrainte de temps, et un bug de sécurité instructif.",
    tags: ['NestJS', 'Docker', 'Sécurité', 'Algorithmie'],
    icon: 'uil-folder-upload',
    color: '#14B8A6',
    paragraphs: [
      "En septembre, j'ai passé un test technique en deux parties. La première se faisait sans IA : deux clashs CodinGame en mode « le plus rapide » et un puzzle de l'Advent of Code. La seconde autorisait l'IA, à condition de livrer l'export complet des conversations. Le sujet : un portail où un avocat récupère les pièces de ses clients.",
      "**Sans IA : l'algorithmie.** Sur les deux clashs, j'ai validé 100 % des tests et terminé deuxième. Le puzzle consistait à suivre un garde sur une grille. Toute la difficulté de la seconde partie tenait à la détection des boucles : il faut suivre le couple (position, direction) et pas seulement la position, et ne tester comme obstacles que les cases du parcours d'origine.",
      "**Avec IA : le produit.** L'avocat crée une demande et obtient un lien public qui expire, protégé par un PIN à quatre chiffres affiché une seule fois. Le client déverrouille le lien, puis dépose ses fichiers grâce à un jeton de courte durée, lié à ce lien précis. Les jetons avocat et client passent par deux stratégies Passport distinctes : un jeton client ne peut pas servir sur une route avocat.",
      "**Le bug qui m'a le plus appris.** Pour vérifier le type réel d'un fichier et refuser un .exe renommé en .pdf, j'utilisais d'abord le paquet file-type. Il n'est publié qu'en ESM, alors que le backend compilait en CommonJS : le contrôle levait une erreur à chaque dépôt. Je l'ai remplacé par une vérification des signatures binaires des trois formats acceptés, écrite à la main et testée. Un contrôle de sécurité qui ne s'exécute jamais est pire que pas de contrôle, parce qu'on se croit protégé.",
      "**Déployer pour de vrai.** Tout tourne en conteneurs : NestJS, PostgreSQL, MinIO pour les fichiers, Prometheus et Grafana pour la supervision. Les images sont publiées sur GitHub Container Registry, le serveur se contente de les récupérer, et le certificat Let's Encrypt se renouvelle automatiquement.",
      "**La CI qui n'a jamais tourné.** Le workflow GitHub Actions était prêt, mais Actions est désactivé au niveau de mon compte, pas du dépôt. Plutôt que de passer ce point sous silence, je l'ai documenté et j'ai ajouté une commande make verify qui rejoue la même séquence en local. Dans un test technique, expliquer ce qui ne marche pas me semble plus utile que de l'ignorer.",
    ],
  },
  {
    id: 'allibuy-audit',
    category: 'Projet',
    date: 'Septembre 2026',
    readTime: '5 min',
    title: "Allibuy : ce que l'audit de mon propre code m'a appris",
    excerpt: "874 tests au vert, aucun any, et pourtant une mise en production aurait marqué des commandes comme payées sans rien encaisser. Retour sur l'audit de ma marketplace.",
    tags: ['NestJS', 'Next.js', 'PostgreSQL', 'Audit'],
    icon: 'uil-shopping-cart-alt',
    color: '#2563EB',
    paragraphs: [
      "Allibuy est mon plus gros projet : une marketplace multi-vendeurs pensée pour l'international, commencée en mai 2026. Tout tient dans un monorepo : une API NestJS, un site Next.js, des applications Expo pour chaque rôle et des paquets partagés pour les types et les schémas Zod.",
      "**Des indicateurs rassurants.** Début septembre, l'API comptait 49 modules et 505 endpoints, la base plus d'une centaine de modèles Prisma, et la suite backend 874 tests, tous au vert. Aucun any, aucun console.log, la row-level security PostgreSQL en place. Sur le papier, le projet était en bonne santé.",
      "**Ce que l'audit a révélé.** J'ai fait un état des lieux en lisant le code plutôt que la documentation, avec pour chaque constat un fichier ou une commande pour le vérifier. Trois intégrations n'existaient pas encore : le paiement, l'e-mail et les notifications push. Le code les remplaçait sans prévenir par des simulateurs qui répondaient « payé » et « envoyé ». En production, les commandes auraient été marquées payées sans le moindre encaissement. L'espace compte de l'acheteur contenait aussi trois formulaires qui affichaient un succès sans appeler l'API.",
      "**Les corrections.** Première règle : plus de repli silencieux. Si un service externe n'est pas configuré, l'application refuse de démarrer au lieu de simuler. J'ai ensuite écrit les adaptateurs Resend pour l'e-mail et Expo Push pour les notifications, puis branché les formulaires factices. L'adaptateur de paiement mobile money est écrit, mais volontairement verrouillé tant qu'il n'a pas été validé en bac à sable.",
      "**Réduire le périmètre.** Le même travail m'a conduit à retirer un rôle entier, celui des prestataires de services : Allibuy reste une marketplace de produits. Six modèles, un module d'API, dix pages web et une application mobile ont été supprimés en une seule passe. Moins de surface, c'est aussi moins de code à sécuriser avant de pouvoir encaisser.",
      "**Ce que j'en retiens.** Un pourcentage d'avancement calculé sur le volume de code ne veut pas dire grand-chose. L'audit situait le projet autour de 62 % du code livré, mais à 0 % de capacité d'encaissement. Pour une marketplace, c'est le second chiffre qui compte. Depuis, une tâche n'est cochée dans la roadmap que sur preuve : typecheck, tests ou essai réel contre l'API.",
    ],
  },
  {
    id: 'claude-code-methode',
    category: 'Méthode',
    date: 'Septembre 2026',
    readTime: '4 min',
    title: 'Coder avec Claude Code sans lui laisser le volant',
    excerpt: "Claude Code est devenu mon principal outil de travail. Les règles que je me suis fixées pour garder la main sur le code, avec des exemples tirés de mes projets.",
    tags: ['Claude Code', 'IA', 'Workflow', 'Qualité'],
    icon: 'uil-robot',
    color: '#8B5CF6',
    paragraphs: [
      "Claude Code est l'outil qui a le plus changé ma façon de travailler cette année, et j'ai passé la certification Claude Code d'Anthropic. Je l'utilise sur la plupart de mes projets, d'Allibuy à Campaign Mailer. Mais plus je m'en sers, plus je pose un cadre autour.",
      "**Un fichier de contexte par dépôt.** Allibuy et Campaign Mailer ont chacun un CLAUDE.md : architecture, commandes, conventions, pièges déjà rencontrés. L'agent démarre avec les informations qu'on donnerait à un nouveau développeur, et je n'ai pas à tout réexpliquer à chaque session.",
      "**Des critères de fin écrits à l'avance.** La roadmap de Campaign Mailer découpe le projet en phases, chacune avec sa définition de « terminé » et ses risques. Une tâche n'est pas finie parce que l'agent l'annonce, mais quand ces critères sont remplis.",
      "**La vérification fait foi.** Sur Zolya, une seule commande enchaîne analyse statique, typage, tests et build. C'est son résultat qui compte, pas le résumé de fin de tâche. Sur le portail de dépôt, un contrôle de type de fichier plantait à chaque upload à cause d'un conflit entre ESM et CommonJS : ce genre de problème ne se voit qu'en exécutant le code.",
      "**Auditer à partir du code.** Quand un projet grossit, la documentation dérive. Pour Allibuy, j'ai fait établir un état des lieux à partir du code, où chaque affirmation renvoie à un fichier ou à une commande. C'est ce qui a mis au jour les simulateurs de paiement silencieux.",
      "**Savoir coder sans.** Lors de mon dernier test technique, la partie algorithmique se faisait sans IA, et je tiens à garder ce réflexe. L'IA accélère ce que je sais déjà faire, elle ne remplace pas la compréhension. Et quand je m'en sers dans un cadre évalué, j'assume de montrer les échanges : l'export complet des conversations faisait partie du rendu.",
    ],
  },
  {
    id: 'nexagold-ia',
    category: 'Data & IA',
    date: 'Juillet 2026',
    readTime: '6 min',
    title: "NexaGold : quand mon modèle d'IA a fait moins bien que le hasard",
    excerpt: "J'ai construit un pipeline d'entraînement rigoureux pour filtrer des signaux de trading. Le verdict a été net : les features ne prédisaient rien. Voici ce que j'en ai fait.",
    tags: ['Python', 'FastAPI', 'Machine Learning', 'Backtesting'],
    icon: 'uil-chart-growth',
    color: '#D8B35A',
    paragraphs: [
      "NexaGold est ma plateforme de trading algorithmique sur l'or. Un moteur Python/FastAPI décide et exécute sur un compte démo MetaTrader 5, une API NestJS gère rapports et alertes, et un dashboard Next.js affiche l'état du système. L'idée de départ : une stratégie déterministe propose des trades, et un modèle d'IA écarte les moins bons.",
      "**Un pipeline conçu pour ne pas se mentir.** Les labels sont calculés en rejouant uniquement les bougies postérieures au signal. Quand l'objectif et le stop sont touchés dans la même bougie, je compte une perte. L'entraînement se fait en walk-forward, dans l'ordre chronologique, et un modèle réentraîné n'est jamais promu automatiquement.",
      "**Le verdict.** Sur 719 exemples, la régression logistique obtenait une AUC de 0,444 hors échantillon, donc moins bien qu'un tirage au hasard, et un score de Brier moins bon qu'une prédiction constante du taux moyen. Même résultat sur un second jeu de données. Ce n'était ni un problème de volume, ni un artefact : les features testées n'avaient aucun pouvoir prédictif.",
      "**Ne pas brancher le modèle.** Aucun modèle n'intervient donc dans les décisions aujourd'hui. Un tableau laissait pourtant entrevoir un gain au-dessus d'un certain seuil, mais tirer cette conclusion d'un modèle anti-prédictif aurait été se raconter une histoire. C'est frustrant, et c'est exactement le rôle d'un pipeline de validation.",
      "**Une stratégie qui avance prudemment.** Le backtest évènementiel en M1 applique spread et slippage à mon désavantage, et considère que le stop est touché en premier en cas de doute. Sur 180 jours, la stratégie « liquidity sweep » ressort légèrement positive avec un ratio risque/rendement de 3, y compris à coûts doublés. Mais 110 trades, c'est trop peu pour conclure : elle reste en paper trading, et le live est verrouillé.",
      "**Changer de broker en cours de route.** J'avais d'abord connecté un broker par API REST, puis je suis passé à MetaTrader 5 en juillet. Le prix est réel : le moteur ne tourne plus que sous Windows, sur mon poste. En échange, un compte démo gratuit, des stops enregistrés côté broker et l'historique du terminal pour compléter les données.",
      "**Ce que je retiens.** Un système de trading se juge d'abord à sa capacité à dire non : kill switch persisté, limites de perte calculées sur le résultat réalisé et latent, filtre d'annonces économiques qui bloque tout nouvel ordre si le calendrier est indisponible. Tout le reste vient après.",
    ],
  },
  {
    id: 'stage-datalia',
    category: 'Parcours',
    date: 'Juillet 2026',
    readTime: '4 min',
    title: 'Mon stage de développeur front-end chez DATALIA',
    excerpt: "Trois mois sur KILICASA, une plateforme immobilière : l'espace agence, le mode sombre, et le quotidien d'un dépôt partagé avec une dizaine de développeurs.",
    tags: ['Stage', 'React', 'TypeScript', 'Travail en équipe'],
    icon: 'uil-briefcase-alt',
    color: '#7B61FF',
    paragraphs: [
      "D'avril à juin 2026, j'ai effectué un stage de trois mois comme développeur front-end chez DATALIA, sur KILICASA, une plateforme immobilière. Je travaillais sur le dépôt de démonstration du produit, une application React et TypeScript qui sert de référence visuelle avant intégration dans le MVP.",
      "**Un dépôt partagé.** Une dizaine de personnes poussaient sur le même dépôt. Il fallait récupérer souvent le travail des autres, fusionner régulièrement la branche principale et garder des commits lisibles pour que chacun s'y retrouve.",
      "**Ce que j'ai construit.** Surtout l'espace agence : un tableau de bord avec revenus, répartition des leads et consommation de crédits ; la page des biens avec filtres et import PropData ; une page de connecteurs avec historique de synchronisation ; la gestion des candidatures (rendez-vous, annulations, historique des étapes) ; la gestion des documents et les paramètres de sécurité du compte.",
      "**Le mode sombre, écran par écran.** J'ai repris le thème sombre de plusieurs parcours : authentification, agence, partenaires. Ce n'est pas qu'une inversion de couleurs : contraste des champs, bordures des listes déroulantes, info-bulles des graphiques. Pour garder une cohérence, j'ai aligné les tailles de texte sur les variables CSS du projet et ajouté des scripts d'audit du CSS.",
      "**Des données simulées, des états réels.** L'application tournait sur des données fictives servies par un petit serveur de mock. Cela permet d'itérer vite sur l'interface, à condition de traiter quand même les situations concrètes : chargement, liste vide, confirmation avant une annulation.",
      "**La suite.** Diplômé de mon Bachelor, j'entre en Mastère Développement Logiciel à INGETIS et je cherche une alternance full-stack de 24 mois dès septembre 2026, pour continuer à progresser au sein d'une équipe.",
    ],
  },
  {
    id: 'rememberme-jwt',
    category: 'Technique',
    date: 'Janvier 2026',
    readTime: '4 min',
    title: "RememberMe : sécuriser une API REST avec JWT, et ce que j'ai changé depuis",
    excerpt: "Hachage des mots de passe, routes protégées, isolation des données : les bases de mon API Express. Et les limites que j'ai corrigées dans mes projets suivants.",
    tags: ['Node.js', 'Express', 'JWT', 'MongoDB'],
    icon: 'uil-lock-alt',
    color: '#F59E0B',
    paragraphs: [
      "RememberMe est une application de tâches que j'ai développée de bout en bout : un front React avec Vite et Tailwind, une API Express avec MongoDB. Listes, calendrier, tâches à venir, rappels du jour. Rien de révolutionnaire, mais une bonne occasion de construire une API complète proprement.",
      "**L'authentification.** Les mots de passe sont hachés avec bcrypt, avec un coût de 12, dans un hook Mongoose exécuté avant l'enregistrement. À la connexion, l'API renvoie un JWT que le front transmet ensuite dans l'en-tête Authorization. Un middleware vérifie ce jeton sur chaque route protégée et ajoute l'identifiant de l'utilisateur à la requête.",
      "**L'isolation des données.** Toutes les requêtes filtrent sur l'utilisateur authentifié, y compris la lecture d'une tâche par son identifiant : un jeton valide ne donne pas accès aux données d'un autre compte. J'ai écrit un test d'intégration dédié à ce cas, avec Jest, Supertest et une base MongoDB en mémoire.",
      "**Les limites.** Le jeton reste valable cinq à sept jours, il est stocké dans le localStorage et rien ne permet de le révoquer. S'il est volé, il reste utilisable pendant une semaine. Pour une application de tâches, le risque est modéré, mais ce n'est pas un modèle à reproduire.",
      "**Ce que j'ai fait ensuite.** Sur Cyna, projet mené en équipe, l'API place les jetons dans des cookies httpOnly, avec rotation et révocation du refresh token côté serveur. Sur Zolya, les mots de passe sont hachés avec Argon2id et le refresh token change à chaque utilisation. RememberMe reste un bon point de départ : c'est en voyant ses limites que j'ai compris à quoi servent ces mécanismes.",
    ],
  },
  {
    id: 'bots-trading-mt5',
    category: 'Data & IA',
    date: 'Janvier 2026',
    readTime: '5 min',
    title: 'XAUFxBot et SYNFxBot : mes premiers bots de trading et leurs limites',
    excerpt: "Deux bots Python pour MetaTrader 5, l'un sur l'or, l'autre sur les indices synthétiques. Ce qui fonctionnait, ce qui coinçait, et pourquoi j'ai tout repris dans NexaGold.",
    tags: ['Python', 'MetaTrader 5', 'Streamlit', 'Trading'],
    icon: 'uil-chart-line',
    color: '#10B981',
    paragraphs: [
      "Le trading algorithmique m'intéresse depuis longtemps. Début 2026, j'ai écrit deux bots Python qui pilotent MetaTrader 5 : XAUFxBot sur l'or, et SYNFxBot sur les indices de volatilité.",
      "**XAUFxBot, la version ambitieuse.** Le bot repère des zones d'offre et de demande en H1, les affine en M30, et n'entre en position qu'avec au moins deux confirmations parmi une cassure de structure, un fair value gap, un sweep de liquidité, le MACD ou le stochastique. La tendance H4 sert de filtre. Un score fondamental s'ajoute par-dessus : inflation, dollar, actualités, VIX, saisonnalité.",
      "**SYNFxBot, la version lisible.** Une seule idée : la tendance EMA 20/50 doit être alignée en M30 et en M15, et l'entrée se fait sur un croisement en M1. Stop à 1,5 ATR, objectif à deux fois le stop, passage au point mort puis stop suiveur. Le bot peut aussi répliquer ses ordres sur plusieurs comptes.",
      "**Le risque d'abord.** Les deux bots dimensionnent chaque position à partir d'un pourcentage fixe du capital : 1 % sur l'or, 2 % sur les synthétiques. XAUFxBot plafonne aussi le nombre de positions ouvertes et le risque total à 3 % du compte. Chaque trade est enregistré dans MongoDB, notifié sur Telegram et visible dans un tableau de bord Streamlit.",
      "**Les problèmes rencontrés.** MetaTrader rejetait certains ordres avec l'erreur « Invalid stops » : le stop était trop proche du prix pour le broker. Il a fallu lire la distance minimale imposée par chaque symbole avant d'envoyer l'ordre. En mode multi-comptes, plusieurs threads accédaient au terminal en même temps ; un verrou partagé a réglé les conflits.",
      "**Pourquoi je suis reparti de zéro.** Quand une source fondamentale échouait (une API indisponible, une page web modifiée), sa fonction renvoyait zéro sans alerte, et le score continuait comme si de rien n'était. Mon backtest, lui, ne simulait ni spread ni slippage. C'est de là qu'est né NexaGold : un backtest plus honnête, un risque centralisé et des sources qui bloquent les ordres au lieu d'échouer en silence.",
    ],
  },
];

const CATEGORIES = ['Tous', 'Projet', 'Data & IA', 'Technique', 'Méthode', 'Parcours'];

const BlogCard = ({ post, onClick }) => (
  <article
    className="blog__card reveal-scale"
    role="button"
    tabIndex={0}
    aria-label={`Lire l'article : ${post.title}`}
    onClick={() => onClick(post)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(post); }
    }}
  >
    <div className="blog__card-header" style={{ '--post-color': post.color }}>
      <span className="blog__card-category">{post.category}</span>
      <i className={`uil ${post.icon} blog__card-icon`} />
    </div>
    <div className="blog__card-body">
      <div className="blog__card-meta">
        <span><i className="uil uil-calendar-alt" /> {post.date}</span>
        <span><i className="uil uil-clock" /> {post.readTime}</span>
      </div>
      <h3 className="blog__card-title">{post.title}</h3>
      <p className="blog__card-excerpt">{post.excerpt}</p>
      <div className="blog__card-tags">
        {post.tags.map(tag => <span key={tag} className="blog__tag">{tag}</span>)}
      </div>
      <span className="blog__read-btn" aria-hidden="true">Lire l'article <i className="uil uil-arrow-right" /></span>
    </div>
  </article>
);

const BlogModal = ({ post, onClose }) => {
  useEffect(() => {
    if (!post) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [post, onClose]);

  if (!post) return null;

  return createPortal(
    <div className="blog__modal-overlay" onClick={onClose}>
      <div className="blog__modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="blog__modal-close"
          onClick={onClose}
          autoFocus
          aria-label="Fermer"
        >
          <i className="uil uil-times" />
        </button>

        <div className="blog__modal-header" style={{ '--post-color': post.color }}>
          <span className="blog__card-category">{post.category}</span>
          <i className={`uil ${post.icon} blog__modal-icon`} />
        </div>

        <div className="blog__modal-body">
          <div className="blog__card-meta">
            <span><i className="uil uil-calendar-alt" /> {post.date}</span>
            <span><i className="uil uil-clock" /> {post.readTime}</span>
          </div>
          <h2 className="blog__modal-title">{post.title}</h2>
          <div className="blog__card-tags" style={{ marginBottom: '1.75rem' }}>
            {post.tags.map(tag => <span key={tag} className="blog__tag">{tag}</span>)}
          </div>
          <div className="blog__modal-content">
            {post.paragraphs.map((para, i) => (
              <p key={i} className="blog__modal-para">
                {para.includes('**') ? (
                  <>
                    <strong>{para.split('**')[1]}</strong>
                    {para.split('**')[2] || ''}
                  </>
                ) : para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selectedPost, setSelectedPost]     = useState(null);

  const filtered = activeCategory === 'Tous'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <section className="blog section" id="blog">
      <span className="section__subtitle">Aventures & Apprentissages</span>
      <h2 className="section__title reveal">Mon Blog</h2>

      <div className="blog__filters reveal d1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            className={`blog__filter-btn${activeCategory === cat ? ' blog__filter-btn--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="blog__grid container">
        {filtered.map(post => (
          <BlogCard key={post.id} post={post} onClick={setSelectedPost} />
        ))}
      </div>

      <div className="blog__cta reveal d3">
        <p className="blog__cta-text">Tu as une question, un projet ou tu veux échanger sur la tech ?</p>
        <Link to="/#contact" className="button button--accent button--flex">
          Me contacter <i className="uil uil-message button__icon" />
        </Link>
      </div>

      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </section>
  );
};

export default Blog;
