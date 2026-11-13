Quand on cherche une alternance ou des contacts, on passe l'essentiel du temps à trouver à qui écrire. MailFind transforme une liste d'entreprises (CSV) en adresses professionnelles classées, avec la source, le statut de vérification et le score de chacune. Conçu en complément de Campaign Mailer.

**Un pipeline en cinq étapes.** Import, identification de l'entreprise, lecture du site, enrichissement, vérification, sur des files BullMQ. Chaque adresse a une source imposée par la base et un score détaillé critère par critère. Le robot respecte le robots.txt et ne se déguise pas en navigateur.

**Un budget à zéro euro.** Avec 50 crédits Hunter par mois, la vérification de boîte est plafonnée. Sans budget, tout reste « non vérifié » : le produit le dit plutôt que de l'embellir. Le port 25 étant bloqué, la vérification est déléguée à un fournisseur.

**Une faille SSRF en IPv6.** La garde laissait passer http://[::ffff:169.254.169.254]/. Les adresses sont désormais jugées comme des nombres, et seul l'unicast global est autorisé.

**La recette sur de vrais sites.** Sur 50 entreprises réelles, 15 sites étaient injoignables : dix refusent le robot, qui n'insiste pas. Deux vrais défauts sont sortis de ce test et ont été corrigés (domaine nu sans www, page d'accueil trop lourde).

**Les limites.** La cible de 300 ms au 95e centile n'est pas tenue (521 ms), l'hébergement étant aux États-Unis pour une clientèle française. L'analyse d'impact sur les données personnelles est faite en interne mais n'a pas été relue par un juriste : la bêta reste fermée.
