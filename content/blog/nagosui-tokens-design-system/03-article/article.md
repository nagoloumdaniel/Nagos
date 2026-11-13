Chaque nouveau site front recopie couleurs, ombres, rayons et courbes d'animation. Les valeurs visuelles dérivent d'un projet à l'autre, et les animations « premium » sont réimplémentées à chaque fois. NagosUI est mon projet de design system React animé, avec tokens, composants et site de documentation.

**Une Foundation Layer.** Les composants n'utilisent que les tokens. Changer un token change donc toute la direction artistique, sans toucher aux composants.

**Un état initial assumé.** Seuls Button et MagneticButton sont livrés. Aucun paquet n'est publié sur npm. Je préfère le dire que gonfler la liste de composants.

**Une page blanche au retour navigateur.** Un conflit entre le bfcache et Lenis faisait apparaître une page blanche en revenant en arrière. Il est corrigé.

**Un logo sensible au thème.** Il change selon le thème sans JavaScript ni flash, avec un composant à deux images.

**Ce qui manque.** Il n'y a pas encore de tests automatisés ni de script lint. C'est la prochaine étape avant de publier quoi que ce soit.
