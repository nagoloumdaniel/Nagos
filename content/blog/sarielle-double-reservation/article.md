Sarielle Fashion est un salon indépendant (coiffure, make-up, lace, cils) à Clausthal-Zellerfeld, en Basse-Saxe. Les rendez-vous passaient par messagerie et téléphone, avec un risque de doubles réservations et une clientèle francophone et germanophone. J'ai construit le site, la réservation et le back-office, en solo, avec l'assistance de Claude.

**Pourquoi une vérification ne suffit pas.** Si deux personnes réservent le même créneau à la même seconde, chacune vérifie qu'il est libre, chacune le trouve libre, et les deux insèrent. Le contrôle, suivi d'une insertion, n'est pas atomique.

**Deux protections.** Un verrou transactionnel PostgreSQL sérialise les demandes, et un index unique partiel garantit au niveau de la base qu'un créneau ne peut pas être pris deux fois. Prisma ne sachant pas exprimer l'index partiel, je l'ai écrit en SQL dans la migration.

**Les migrations sur Vercel.** Le verrou advisory de Prisma expirait derrière le pooler Neon. Les migrations passent donc par la connexion directe, verrou désactivé.

**Deux langues sans refonte des routes.** J'ai choisi un middleware de réécriture plutôt qu'un dossier [locale], pour garder les URL françaises et laisser le dashboard en français.

**Un changement en route.** Resend était prévu pour les e-mails ; il a été remplacé par SMTP Gmail. Le site est en production.
