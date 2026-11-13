RememberMe est une application de tâches que j'ai développée de bout en bout : un front React avec Vite et Tailwind, une API Express avec MongoDB. Listes, calendrier, tâches à venir, rappels du jour. Rien de révolutionnaire, mais une bonne occasion de construire une API complète proprement.

**L'authentification.** Les mots de passe sont hachés avec bcrypt, avec un coût de 12, dans un hook Mongoose exécuté avant l'enregistrement. À la connexion, l'API renvoie un JWT que le front transmet ensuite dans l'en-tête Authorization. Un middleware vérifie ce jeton sur chaque route protégée et ajoute l'identifiant de l'utilisateur à la requête.

**L'isolation des données.** Toutes les requêtes filtrent sur l'utilisateur authentifié, y compris la lecture d'une tâche par son identifiant : un jeton valide ne donne pas accès aux données d'un autre compte. J'ai écrit un test d'intégration dédié à ce cas, avec Jest, Supertest et une base MongoDB en mémoire.

**Les limites.** Le jeton reste valable cinq à sept jours, il est stocké dans le localStorage et rien ne permet de le révoquer. S'il est volé, il reste utilisable pendant une semaine. Pour une application de tâches, le risque est modéré, mais ce n'est pas un modèle à reproduire.

**Ce que j'ai fait ensuite.** Sur Cyna, projet mené en équipe, l'API place les jetons dans des cookies httpOnly, avec rotation et révocation du refresh token côté serveur. Sur Zolya, les mots de passe sont hachés avec Argon2id et le refresh token change à chaque utilisation. RememberMe reste un bon point de départ : c'est en voyant ses limites que j'ai compris à quoi servent ces mécanismes.
