## Mise en situation

Je voulais vendre de petites ressources numériques utiles au quotidien : un CV lisible par les logiciels de tri, un budget, des prompts pour le travail, un devis pour freelance. Des produits à petit prix, achetés sur un coup de tête, où l'attente du fichier ne doit pas exister.

## Problème

Vendre à 3 € demande autant de rigueur qu'à 300 €. Il faut encaisser sans erreur, livrer le bon fichier à la bonne personne, émettre des factures valides, rembourser proprement et respecter le droit français et le RGPD. Les plateformes toutes faites imposent leur marque et leurs frais, et un site bricolé laisse passer des paiements en double ou des fichiers accessibles à tous.

## Solution

J'ai construit la boutique de zéro. Le serveur décide de tout ce qui compte : prix, droits d'accès, rôles. Un webhook Stripe signé et idempotent est la seule source de vérité d'un paiement. Les fichiers restent dans un stockage privé et ne sortent que par des liens signés de courte durée. Les factures et avoirs sont figés et numérotés sans trou. L'identité visuelle, la palette et les pages d'erreur sont propres au projet.
