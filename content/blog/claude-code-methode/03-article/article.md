Claude Code est l'outil qui a le plus changé ma façon de travailler cette année, et j'ai passé la certification Claude Code d'Anthropic. Je l'utilise sur la plupart de mes projets, d'Allibuy à Campaign Mailer. Mais plus je m'en sers, plus je pose un cadre autour.

**Un fichier de contexte par dépôt.** Allibuy et Campaign Mailer ont chacun un CLAUDE.md : architecture, commandes, conventions, pièges déjà rencontrés. L'agent démarre avec les informations qu'on donnerait à un nouveau développeur, et je n'ai pas à tout réexpliquer à chaque session.

**Des critères de fin écrits à l'avance.** La roadmap de Campaign Mailer découpe le projet en phases, chacune avec sa définition de « terminé » et ses risques. Une tâche n'est pas finie parce que l'agent l'annonce, mais quand ces critères sont remplis.

**La vérification fait foi.** Sur Zolya, une seule commande enchaîne analyse statique, typage, tests et build. C'est son résultat qui compte, pas le résumé de fin de tâche. Sur le portail de dépôt, un contrôle de type de fichier plantait à chaque upload à cause d'un conflit entre ESM et CommonJS : ce genre de problème ne se voit qu'en exécutant le code.

**Auditer à partir du code.** Quand un projet grossit, la documentation dérive. Pour Allibuy, j'ai fait établir un état des lieux à partir du code, où chaque affirmation renvoie à un fichier ou à une commande. C'est ce qui a mis au jour les simulateurs de paiement silencieux.

**Savoir coder sans.** Lors de mon dernier test technique, la partie algorithmique se faisait sans IA, et je tiens à garder ce réflexe. L'IA accélère ce que je sais déjà faire, elle ne remplace pas la compréhension. Et quand je m'en sers dans un cadre évalué, j'assume de montrer les échanges : l'export complet des conversations faisait partie du rendu.
