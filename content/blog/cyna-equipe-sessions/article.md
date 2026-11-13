Cyna est une plateforme SaaS de cybersécurité, web et mobile : un e-commerce de services en abonnement, avec un backoffice administrateur. C'est un projet de formation mené en équipe de cinq personnes.

**Ma part.** J'ai écrit la quasi-totalité du front-end (environ 90 % des commits) et contribué à l'API côté infrastructure et sécurité : déploiement, base de données, rotation des refresh tokens.

**Des sessions sûres.** Les jetons JWT sont placés dans des cookies httpOnly, avec rotation des refresh tokens, double authentification et limitation de débit côté API. C'est ce que j'aurais voulu faire sur mon projet RememberMe, où le jeton reste dans le localStorage.

**L'arabe et le sens de lecture.** Trois langues (français, anglais, arabe) : en arabe, toute la mise en page bascule en droite-à-gauche. Il faut y penser dès le début, pas à la fin.

**Des paiements vérifiés.** Le webhook Stripe est vérifié par signature, pour qu'on ne puisse pas simuler un paiement en appelant l'URL à la main.

**Ce que j'ai appris.** Travailler à cinq oblige à lire le code des autres, à s'accorder sur des conventions et à relire avec méfiance. C'est un autre métier que le projet en solo.
