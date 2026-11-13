Patricia exerce seule à Dakar. Les rendez-vous passent par messages et appels, avec des créneaux gérés de tête. Le problème n'est pas que technique : une coiffure comme des locs se prépare, et une cliente dont le cheveu est inadapté perd du temps et de l'argent, tandis que Patricia perd un créneau.

**Qualifier avant de réserver.** Le site propose un diagnostic de compatibilité par prestation, puis la réservation en ligne. Il guide sans bloquer. Le nom, le logo et les photographies appartiennent à Patricia ; j'ai réalisé le site en solo avec l'assistance de Claude.

**La double réservation.** Même leçon que sur Sarielle : un contrôle suivi d'une insertion laisse passer deux requêtes simultanées. Un verrou consultatif dans la transaction et un index d'unicité limité aux réservations actives règlent le problème.

**Une devise sans décimales.** Le schéma stocke les montants en centièmes alors que le FCFA n'a pas de décimales. La conversion est centralisée en un seul endroit, pour ne pas la dupliquer.

**Des photos privées.** Les photos d'évaluation sont stockées en privé, accessibles par URL présignée, et purgées automatiquement à échéance.

**Des notifications fiables.** Une file idempotente garantit qu'un échec SMTP n'annule jamais une réservation. Le projet compte 439 tests Vitest et 13 fichiers de test E2E, et il est en production.
