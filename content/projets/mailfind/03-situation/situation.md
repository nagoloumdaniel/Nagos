## Mise en situation

Quand on cherche une alternance, des clients ou des contacts, on passe l'essentiel du temps à trouver à qui écrire : ouvrir le site, chercher la page contact, relever une adresse, recommencer. Pour 200 entreprises, cela prend plusieurs jours et produit un tableur sans source ni date.

## Problème

Les outils existants vendent des adresses « vérifiées » sans dire d'où elles viennent, et la vérification de boîte coûte cher. Il faut aussi respecter les sites visités et les données personnelles de tiers.

## Solution

Un pipeline en cinq étapes sur files BullMQ : import, identification de l'entreprise, lecture du site, enrichissement, vérification. Chaque adresse a une source imposée par la base, un score détaillé critère par critère, et un statut honnête. Le robot respecte robots.txt et ne se déguise pas en navigateur.
