Zolya est une marketplace de vêtements d'occasion entre particuliers à Douala et Yaoundé. Le problème de départ est simple : un acheteur qui paie d'avance risque de ne rien recevoir, un vendeur qui expédie d'abord risque de ne pas être payé. Je l'ai développée en solo, avec l'assistance de Claude.

**Le séquestre.** L'acheteur paie par Mobile Money via Campay, et l'argent reste bloqué jusqu'à la réception de l'article, confirmée par un code. Sans action sous 48 heures, la commande s'annule automatiquement. Le vendeur n'est payé que si la livraison a bien eu lieu.

**Un solde ne se modifie jamais.** Chaque mouvement d'argent est une écriture dans un grand livre à double entrée, immuable. On n'écrit pas « le solde passe à 12 000 », on écrit « 12 000 entrent, 12 000 sortent ». On peut ainsi rejouer l'historique et prouver un solde à n'importe quel moment.

**Des codes qui ne fuient pas.** Les codes de collecte et de réception sont hachés en base et vérifiés côté serveur. Une base copiée ne permet donc pas de valider une livraison.

**Une livraison sans disponibilité garantie.** Les offres sont proposées aux livreurs l'une après l'autre, avec un repli après 20 minutes. Rien ne garantit qu'un livreur soit libre, d'où l'annulation automatique si rien n'avance.

**Ce qui reste imparfait.** GitHub Actions est désactivé sur mon compte : la vérification passe par un script local. Plusieurs documents internes ont aussi vieilli par rapport au code. Dans ce cas, le code et les migrations font foi. L'application n'est pas encore sur les stores.
