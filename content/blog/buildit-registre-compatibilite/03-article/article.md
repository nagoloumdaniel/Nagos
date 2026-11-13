Démarrer un projet demande des dizaines de décisions : framework, base, ORM, tests, lint, CI, déploiement. BuildIt est une « Development Environment Factory » : une CLI et un configurateur web qui assemblent un environnement cohérent à partir d'un registre de technologies. Projet personnel, pré-alpha.

**Trois couches séparées.** Un manifeste (ce que veut l'utilisateur), un registre (ce qui existe) et des règles de compatibilité. Le moteur vérifie la cohérence avant de générer, et explique les conflits au lieu de les subir.

**Les choix ne sont pas indépendants.** Une technologie en exclut une autre, une version impose une version. Un gabarit statique ne le sait pas. L'audit a montré que 14 catégories se cumulent plutôt que de s'exclure : j'ai réécrit les règles et ajouté une règle d'écosystème.

**Certifié ou seulement déclaré.** Seules 32 entrées sur 299 sont certifiées. L'interface doit le dire clairement plutôt que de laisser croire que tout est testé. C'est un choix d'honnêteté de produit autant qu'une contrainte technique.

**Le registre fait foi.** Les compteurs de la documentation (283) ont divergé du registre réel (299). Depuis, le registre est la source de vérité. Les vérifications passent en local, les workflows GitHub restant inactifs.
