## Mise en situation

Chercher une alternance, un stage ou un CDI oblige à parcourir une dizaine de sites : jobboards, pages carrières, agrégateurs d'ATS. Les mêmes offres reviennent partout, parfois périmées, et chaque site a ses propres filtres.

## Problème

Aucune source ne couvre tout, les doublons noient le signal, et un agrégateur « tout automatique » coûte vite cher en appels LLM et pose des questions juridiques sur ce qu'on a le droit de lire.

## Solution

Un agent mixte : le LLM orchestre et décide, mais les outils sont déterministes (API France Travail, flux d'ATS, JSON-LD, Cheerio, Playwright). Un registre de conformité en base dit quelles sources sont autorisées, un garde-fou de budget plafonne les coûts, et le robots.txt est respecté.
