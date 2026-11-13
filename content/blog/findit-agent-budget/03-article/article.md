Chercher une alternance oblige à parcourir une dizaine de sites. Les mêmes offres reviennent partout, parfois périmées. Findit est un agent qui découvre, collecte, déduplique et publie les offres, avec un espace candidat. Projet personnel, développé en solo avec l'assistance de Claude, toujours en cours.

**Le LLM décide, les outils exécutent.** Le modèle orchestre, mais les outils sont déterministes : API France Travail, flux d'ATS, JSON-LD, Cheerio, Playwright. Un registre de conformité en base dit quelles sources sont autorisées, et le robots.txt est respecté.

**Le coût.** Les premières exécutions coûtaient plusieurs milliers de micro-dollars. Avec un plan plus court et des outils déterministes, une exécution est passée de 5 419 à 782 micro-dollars. Un garde-fou de budget plafonne désormais la dépense.

**Les boucles de planification.** L'orchestrateur pouvait replanifier sans fin. J'ai borné les itérations et rendu les décisions vérifiables.

**Les agrégateurs d'ATS.** Les offres d'un même ATS vivent sous des sous-domaines clients différents. Plutôt que de scraper chaque site, j'ai énuméré les tenants.

**Deux erreurs de sécurité.** Le tableau de bord de l'agent était accessible sans authentification : il est maintenant derrière un proxy d'authentification. Et une clé a été exposée par erreur : elle a été révoquée et remplacée, et la procédure de gestion des secrets a été durcie. Je préfère le raconter que le cacher.
