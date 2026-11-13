Le trading algorithmique m'intéresse depuis longtemps. Début 2026, j'ai écrit deux bots Python qui pilotent MetaTrader 5 : XAUFxBot sur l'or, et SYNFxBot sur les indices de volatilité.

**XAUFxBot, la version ambitieuse.** Le bot repère des zones d'offre et de demande en H1, les affine en M30, et n'entre en position qu'avec au moins deux confirmations parmi une cassure de structure, un fair value gap, un sweep de liquidité, le MACD ou le stochastique. La tendance H4 sert de filtre. Un score fondamental s'ajoute par-dessus : inflation, dollar, actualités, VIX, saisonnalité.

**SYNFxBot, la version lisible.** Une seule idée : la tendance EMA 20/50 doit être alignée en M30 et en M15, et l'entrée se fait sur un croisement en M1. Stop à 1,5 ATR, objectif à deux fois le stop, passage au point mort puis stop suiveur. Le bot peut aussi répliquer ses ordres sur plusieurs comptes.

**Le risque d'abord.** Les deux bots dimensionnent chaque position à partir d'un pourcentage fixe du capital : 1 % sur l'or, 2 % sur les synthétiques. XAUFxBot plafonne aussi le nombre de positions ouvertes et le risque total à 3 % du compte. Chaque trade est enregistré dans MongoDB, notifié sur Telegram et visible dans un tableau de bord Streamlit.

**Les problèmes rencontrés.** MetaTrader rejetait certains ordres avec l'erreur « Invalid stops » : le stop était trop proche du prix pour le broker. Il a fallu lire la distance minimale imposée par chaque symbole avant d'envoyer l'ordre. En mode multi-comptes, plusieurs threads accédaient au terminal en même temps ; un verrou partagé a réglé les conflits.

**Pourquoi je suis reparti de zéro.** Quand une source fondamentale échouait (une API indisponible, une page web modifiée), sa fonction renvoyait zéro sans alerte, et le score continuait comme si de rien n'était. Mon backtest, lui, ne simulait ni spread ni slippage. C'est de là qu'est né NexaGold : un backtest plus honnête, un risque centralisé et des sources qui bloquent les ordres au lieu d'échouer en silence.
