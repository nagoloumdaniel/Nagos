NexaGold est ma plateforme de trading algorithmique sur l'or. Un moteur Python/FastAPI décide et exécute sur un compte démo MetaTrader 5, une API NestJS gère rapports et alertes, et un dashboard Next.js affiche l'état du système. L'idée de départ : une stratégie déterministe propose des trades, et un modèle d'IA écarte les moins bons.

**Un pipeline conçu pour ne pas se mentir.** Les labels sont calculés en rejouant uniquement les bougies postérieures au signal. Quand l'objectif et le stop sont touchés dans la même bougie, je compte une perte. L'entraînement se fait en walk-forward, dans l'ordre chronologique, et un modèle réentraîné n'est jamais promu automatiquement.

**Le verdict.** Sur 719 exemples, la régression logistique obtenait une AUC de 0,444 hors échantillon, donc moins bien qu'un tirage au hasard, et un score de Brier moins bon qu'une prédiction constante du taux moyen. Même résultat sur un second jeu de données. Ce n'était ni un problème de volume, ni un artefact : les features testées n'avaient aucun pouvoir prédictif.

**Ne pas brancher le modèle.** Aucun modèle n'intervient donc dans les décisions aujourd'hui. Un tableau laissait pourtant entrevoir un gain au-dessus d'un certain seuil, mais tirer cette conclusion d'un modèle anti-prédictif aurait été se raconter une histoire. C'est frustrant, et c'est exactement le rôle d'un pipeline de validation.

**Une stratégie qui avance prudemment.** Le backtest évènementiel en M1 applique spread et slippage à mon désavantage, et considère que le stop est touché en premier en cas de doute. Sur 180 jours, la stratégie « liquidity sweep » ressort légèrement positive avec un ratio risque/rendement de 3, y compris à coûts doublés. Mais 110 trades, c'est trop peu pour conclure : elle reste en paper trading, et le live est verrouillé.

**Changer de broker en cours de route.** J'avais d'abord connecté un broker par API REST, puis je suis passé à MetaTrader 5 en juillet. Le prix est réel : le moteur ne tourne plus que sous Windows, sur mon poste. En échange, un compte démo gratuit, des stops enregistrés côté broker et l'historique du terminal pour compléter les données.

**Ce que je retiens.** Un système de trading se juge d'abord à sa capacité à dire non : kill switch persisté, limites de perte calculées sur le résultat réalisé et latent, filtre d'annonces économiques qui bloque tout nouvel ordre si le calendrier est indisponible. Tout le reste vient après.
