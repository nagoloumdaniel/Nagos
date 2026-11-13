## Mise en situation

Démarrer un projet demande des dizaines de décisions : framework, base, ORM, tests, lint, CI, déploiement. Chaque équipe les reprend à zéro ou copie un gabarit déjà vieux.

## Problème

Les choix ne sont pas indépendants : une technologie en exclut une autre, une version impose une version. Un gabarit statique ne le sait pas, et ne dit pas pourquoi une combinaison est bonne ou non.

## Solution

Trois couches séparées : un manifeste (ce que veut l'utilisateur), un registre (ce qui existe, certifié ou seulement déclaré) et des règles de compatibilité. Le moteur vérifie la cohérence avant de générer, et explique les conflits.
