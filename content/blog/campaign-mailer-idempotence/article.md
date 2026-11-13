Campaign Mailer part d'un besoin très concret : envoyer des candidatures personnalisées sans y passer ses soirées. L'utilisateur connecte son compte Google, importe ses contacts en CSV, écrit un modèle avec des variables, et l'application envoie les messages depuis sa propre boîte Gmail, à un rythme raisonnable.

**Le vrai risque, c'est le doublon.** Un bug d'affichage se corrige. Un e-mail envoyé deux fois à un recruteur, non. J'ai donc conçu le moteur d'envoi en partant des pannes possibles : un worker tué en plein envoi, une planification qui tourne deux fois, deux jobs qui tombent sur le même contact.

**Trois protections plutôt qu'une.** Chaque job BullMQ porte l'identifiant du contact, ce qui empêche de le planifier deux fois. Avant d'envoyer, le job réserve le contact avec une seule requête UPDATE conditionnelle : si aucune ligne ne revient, c'est que quelqu'un d'autre s'en occupe, et le job s'arrête. Enfin, un index unique interdit d'enregistrer deux envois réussis pour le même contact. Chaque barrière peut céder seule, les trois ensemble beaucoup plus difficilement.

**Le cas ambigu.** Gmail ne propose pas de clé d'idempotence : on envoie d'abord, on enregistre ensuite. Si le processus s'arrête entre les deux, impossible de savoir si le message est parti. J'ai choisi de ne pas réessayer. Le contact passe en échec avec un message explicite et l'utilisateur décide. Un e-mail manqué se renvoie, un doublon ne s'efface pas.

**Respecter les limites de Gmail.** Google bloque un compte personnel au-delà de 500 messages par jour. L'application s'arrête à 450 sur 24 heures glissantes, pour laisser de la place aux e-mails écrits à la main. Les envois sont espacés d'au moins dix secondes, avec un décalage aléatoire, et n'ont lieu qu'aux heures de bureau, dans le fuseau horaire de la campagne.

**Une contrainte que je n'attendais pas.** Redis est hébergé sur l'offre gratuite d'Upstash, limitée à 500 000 commandes par mois. Or un worker inactif interroge Redis en permanence : j'ai mesuré 12 commandes par minute, ce qui dépasse le quota. J'ai donc mis le worker en veille quand rien n'est prévu. Il tombe à une commande par minute, et lors de ma mesure, un job ajouté pendant la veille a démarré 89 secondes plus tard.

**Ce que j'en retiens.** Le moteur d'envoi a sa propre documentation, qui écrit noir sur blanc chaque compromis et ce qu'on choisit en le modifiant. Le premier test réel, cinq e-mails le 14 septembre, s'est déroulé sans doublon. C'est un petit échantillon, mais c'était précisément ce que je voulais vérifier.
