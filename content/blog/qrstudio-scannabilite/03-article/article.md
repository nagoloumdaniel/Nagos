Les générateurs de QR codes en ligne imposent souvent un compte, envoient le contenu à un serveur, ou produisent des codes illisibles une fois personnalisés. QR Studio fait l'inverse : tout est calculé dans le navigateur, avec dix types de contenu et quatre formats d'export.

**Le vrai problème.** Personnaliser un QR code (couleurs, logo, formes) peut le rendre impossible à scanner, sans que l'utilisateur le sache avant d'imprimer. C'est cette erreur coûteuse que l'outil cherche à prévenir.

**Des heuristiques en direct.** L'outil analyse le contraste, la couverture du logo et la densité de la grille, et signale les risques avant l'export.

**Un rendu SVG maison.** La librairie qrcode fournit la matrice ; les formes, yeux, dégradés et logo sont dessinés par un rendu SVG que j'ai écrit. Il sert à la fois pour l'aperçu, l'export SVG et la rasterisation, donc ce que l'on voit est ce que l'on exporte.

**La limite.** Le dépôt n'a que ESLint : pas de tests automatisés, la vérification est manuelle. C'est un point à corriger. Projet personnel, en ligne, en français et en anglais.
