Un service qui inscrit des utilisateurs doit contrôler une pièce d'identité fournie en photo. La revue manuelle est lente, et un simple OCR ne dit pas si les données sont cohérentes. KYC Checker enchaîne plusieurs contrôles (MRZ, nom, visage, forensique, archivage chiffré) pour produire une décision explicable. Projet personnel, avec l'assistance de Claude.

**Règles dures contre score.** Un score pondéré seul peut laisser passer un nom différent si tout le reste est bon. J'ai donc ajouté des plafonds de sévérité indépendants du score : un score élevé ne peut pas blanchir un nom différent ou une clé de contrôle invalide.

**Le caractère <.** Le modèle Tesseract par défaut le lit mal. La MRZ exige le modèle OCR-B, complété par une correction des confusions courantes.

**Des clés correctes ne prouvent rien.** Une MRZ cohérente n'atteste pas l'authenticité du document. Seule la lecture de la puce NFC apporterait une preuve forte ; elle est documentée mais non implémentée.

**Chercher sans stocker.** Retrouver un dossier par nom sans conserver le nom en clair a conduit à des jetons HMAC.

**Des limites assumées.** Pas de détection de vivacité, pas de limitation de débit, aucune évaluation de conformité. Le prototype n'est pas prêt à traiter de vraies données personnelles, et je le dis.
