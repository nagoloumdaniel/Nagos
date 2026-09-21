# -*- coding: utf-8 -*-
"""Générateur du CV du portfolio - source modifiable.

Régénère `src/assets/Mon_CV_Dev.pdf` (nom public conservé, référencé par les
boutons « Télécharger mon CV » du site). CV complet multi-pages, compatible ATS :
une colonne, texte sélectionnable, liens cliquables, sans tableaux ni images.

Usage :
    pip install reportlab
    python cv/generate_cv.py

Police : Calibri (C:\\Windows\\Fonts) si disponible, sinon Helvetica.
"""
import os
from io import BytesIO

from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.join(HERE, "..", "src", "assets", "Mon_CV_Dev.pdf")

FULL_NAME = "Daniel Parfait NAGOLOUM TALLA"
TITLE = "Développeur Full-Stack & Data/IA - Recherche d'alternance 2026"
NAVY = HexColor("#0D2B55")
BLUE = HexColor("#1A6BC8")
GRAY = HexColor("#404040")
BLACK = HexColor("#000000")

try:
    pdfmetrics.registerFont(TTFont("Calibri", r"C:\Windows\Fonts\calibri.ttf"))
    pdfmetrics.registerFont(TTFont("Calibri-Bold", r"C:\Windows\Fonts\calibrib.ttf"))
    pdfmetrics.registerFont(TTFont("Calibri-Italic", r"C:\Windows\Fonts\calibrii.ttf"))
    FR, FB, FI = "Calibri", "Calibri-Bold", "Calibri-Italic"
except Exception:
    FR, FB, FI = "Helvetica", "Helvetica-Bold", "Helvetica-Oblique"

def sw(text, font, size):
    return pdfmetrics.stringWidth(text, font, size)

CM = 28.3465
W, H = A4
LEFT = 1.5 * CM
RIGHT = W - 1.5 * CM
USABLE = RIGHT - LEFT
TOP = H - 1.3 * CM
BOTTOM = 1.3 * CM

# ---------------------------------------------------------------- contenu

PROFILE = ("Étudiant en Bachelor Développement / Data à INGETIS (Paris), je développe des applications web "
           "de bout en bout (React / Next.js, Node.js / NestJS, PostgreSQL) avec des compétences "
           "complémentaires en Data et intelligence artificielle (Python, pandas, scikit-learn / LightGBM). "
           "Après un stage de développeur front-end chez DATALIA (plateforme immobilière KILICASA), je "
           "recherche une alternance en développement Full-Stack à partir de septembre 2026, au rythme de "
           "3 semaines en entreprise / 1 semaine de formation, dans le cadre d'un projet de poursuite "
           "d'études en Mastère Développement Full-Stack à INGETIS (rentrée 2026).")

EXPERIENCES = [
    {"role": "Stagiaire Développeur Front-End - DATALIA",
     "dates": "Avril 2026 - stage de 3 mois",
     "bullets": [
         "Développement et intégration d'interfaces web responsives pour la plateforme immobilière "
         "KILICASA : composants réutilisables, amélioration de l'expérience utilisateur.",
         "Intégration d'API, correction d'anomalies d'affichage, collaboration avec l'équipe technique via Git.",
     ]},
    {"role": "Développeur web - Freelance & projets personnels",
     "dates": "depuis 2021",
     "bullets": [
         "Sites vitrines React conçus et déployés pour de petites entreprises : Krossty (e-commerce, domaine "
         "personnalisé), Irene Hair Braids (prise de rendez-vous), Wiyorent (location), Creamy Milk Candies.",
     ]},
    {"role": "Design graphique & motion - BRITECH",
     "dates": "2022 – 2025",
     "bullets": [
         "Création de visuels et d'animations, une sensibilité UI/UX mise au service de mes développements.",
     ]},
]

MAJOR = [
    {"name": "Allibuy - Marketplace e-commerce internationale multi-vendeurs",
     "kind": "projet personnel, en développement (dépôt privé)",
     "tech": "Next.js 15 · React 19 · NestJS · Prisma · PostgreSQL · Redis / BullMQ · Meilisearch · Expo · Docker",
     "link": None,
     "desc": "Monorepo web, mobile et API : multi-devises, quatre rôles, paiements mobile money, recherche "
             "Meilisearch, temps réel Socket.io, sécurité PostgreSQL avancée (RLS, triggers)."},
    {"name": "Zolya - Marketplace C2C avec logistique intégrée",
     "kind": "projet personnel, en développement (dépôt privé)",
     "tech": "Flutter · NestJS · PostgreSQL / Prisma · Redis / BullMQ · Swagger · Docker",
     "link": None,
     "desc": "API sécurisée (OTP haché, Argon2id, refresh tokens rotatifs, RBAC), commandes avec escrow et "
             "registre financier en double entrée, application mobile Flutter (Clean Architecture + BLoC), "
             "tests unitaires et documentation."},
    {"name": "NexaGold - Trading algorithmique de l'or piloté par IA",
     "kind": "projet personnel, en développement (dépôt privé)",
     "tech": "Python (FastAPI) · pandas · scikit-learn · LightGBM · NestJS · Next.js · PostgreSQL · Redis",
     "link": None,
     "desc": "Moteur de décision Python (données → stratégie → risque → exécution) connecté à un broker par "
             "API, modèles gradient boosting, backtesting sur historique profond, kill switch de sécurité."},
    {"name": "Cyna - Plateforme SaaS de cybersécurité",
     "kind": "projet académique, en équipe",
     "tech": "React 19 · Redux Toolkit · Stripe · i18next · NestJS · MongoDB · Swagger",
     "link": "github.com/nagoloumdaniel/Frontend_cyna",
     "desc": "Front et API déployés : catalogue, panier et paiement Stripe, tableaux de bord, authentification "
             "JWT, rate limiting, documentation Swagger, travail en équipe avec Git."},
    {"name": "Fundatrade - Analyse fondamentale & technique BTC / Or",
     "kind": "projet personnel, déployé",
     "tech": "Next.js 15 · React 19 · TypeScript · WebSocket (Kraken) · Recharts",
     "link": "github.com/nagoloumdaniel/Fundatrade",
     "desc": "Prix en temps réel, 8 indicateurs techniques calculés côté serveur, 6 stratégies croisées via un "
             "scoring et suivi de la performance des prédictions générées."},
    {"name": "Thebarber - Réservation en ligne pour salon de coiffure",
     "kind": "projet personnel, déployé",
     "tech": "Next.js · TypeScript · Prisma · PostgreSQL · NextAuth · Zod",
     "link": "github.com/nagoloumdaniel/Thebarber",
     "desc": "Site vitrine avec réservation en ligne et back-office : logique métier séparée, validation des "
             "formulaires, socle RGPD / CNIL."},
    {"name": "XAUFxBot & SYNFxBot - Robots de trading automatisé",
     "kind": "projets personnels, fonctionnels",
     "tech": "Python · pandas / NumPy · MetaTrader 5 · MongoDB · Streamlit · Telegram API",
     "link": "github.com/nagoloumdaniel/XAUFxBot",
     "desc": "Stratégies automatisées sur l'or (XAU/USD) et les indices synthétiques : collecte temps réel, "
             "analyse de volatilité, gestion du risque, alertes Telegram, tableau de bord Streamlit."},
    {"name": "Findit - Agrégateur d'offres d'alternance (Île-de-France)",
     "kind": "projet personnel, en cours de développement (dépôt privé)",
     "tech": "Next.js · NestJS + Fastify · PostgreSQL · BullMQ · Docker · monorepo pnpm",
     "link": None,
     "desc": "Score de compatibilité explicable entre CV et offres, monorepo web / API / worker, garde-fous de "
             "conformité (registre de connecteurs, hook anti-secret)."},
]

OTHER = [
    ("NagosUI - Librairie de composants front-end", "Next.js 16, React 19, Tailwind v4, Turborepo - en développement", "github.com/nagoloumdaniel/NagosUI"),
    ("Mon Portfolio (nagoloum.vercel.app)", "React 19, Vite, GSAP, Three.js (R3F), EmailJS - en production", "github.com/nagoloumdaniel/Nagos"),
    ("RememberMe - Application de planification", "React, Express, MongoDB, JWT - déployée", "github.com/nagoloumdaniel/Backend_RememberMe"),
    ("Task App - Clone Wunderlist / Google Tasks", "Angular 18, NestJS, TypeScript - terminé", "github.com/nagoloumdaniel/libheros-task-app"),
    ("QR Studio Ad - Générateur de QR codes", "React, react-qr-code, i18next - déployé", "github.com/nagoloumdaniel/QrStudioAd"),
    ("Urbanet - Site vitrine animé", "React, TypeScript, Framer Motion - déployé", "github.com/nagoloumdaniel/Urbanet"),
    ("Sites vitrines clients", "Krossty, Irene Hair Braids, Wiyorent, Creamy Milk Candies - React, déployés", "github.com/nagoloumdaniel"),
    ("SellCatalog - Application mobile + API Python", "Flutter, Python (Flask) - prototype fonctionnel", "github.com/nagoloumdaniel/SellCatalog"),
    ("Basic Shop App - Application Android", "Kotlin - en développement", "github.com/nagoloumdaniel/Basic-shop-app"),
    ("Shadow Escape - Jeu d'infiltration", "Unity, C#, ShaderLab - prototype", "github.com/nagoloumdaniel/Shadow_Escape"),
    ("Shop App - Mini e-commerce", "Java Spring Boot, Vue.js - projet académique", "github.com/nagoloumdaniel/Springboot_project"),
    ("Gestion Tickets Bus & Feedback", "PHP, MySQL, SCSS - projets académiques", "github.com/nagoloumdaniel/Gestion_tickets_bus"),
]

SKILLS = [
    ("Langages", "JavaScript (ES6+), TypeScript, Python, SQL, PHP, Java, Dart, Kotlin (bases), HTML5, CSS3"),
    ("Front-End", "React 19, Next.js (App Router), Angular 18, Vue.js (notions), Tailwind CSS, Redux Toolkit, "
                  "Zustand, i18next / next-intl, GSAP / Framer Motion, Three.js (R3F), responsive design, "
                  "accessibilité"),
    ("Mobile", "Flutter (Clean Architecture + BLoC), React Native (Expo), Android natif (Kotlin, bases)"),
    ("Back-End", "Node.js, NestJS, Express, Fastify, API REST, Swagger / OpenAPI, FastAPI, Flask, "
                 "Spring Boot (bases), JWT + refresh tokens, RBAC, Argon2 / bcrypt, rate limiting, "
                 "WebSockets (Socket.io), files BullMQ"),
    ("Data & IA", "pandas, NumPy, Matplotlib, scikit-learn, LightGBM, Streamlit, indicateurs techniques et "
                  "scoring, MetaTrader 5, intégration d'API de modèles (Claude, Gemini)"),
    ("Bases de données", "PostgreSQL (PostGIS, RLS), MySQL / MariaDB, MongoDB, Redis, Supabase, Meilisearch, "
                         "Prisma, Drizzle ORM, Mongoose"),
    ("Outils & DevOps", "Git / GitHub, Docker & docker-compose, Vercel / Render, Linux (bases), Postman, "
                        "Figma, Android Studio, VS Code, Claude Code"),
    ("Méthodes & principes", "SOLID, Clean Code / Clean Architecture, transactions ACID, Agile / Scrum, "
                             "revues de code (Git), Jira / Notion"),
]

FORMATION = [
    ("Bachelor Développement / Data - INGETIS, Paris", "2025 – 2026, en cours."),
    ("Projet de poursuite d'études : Mastère Développement Full-Stack - INGETIS",
     "rentrée 2026 - alternance 24 mois, rythme 3 semaines en entreprise / 1 semaine de formation."),
    ("BTS - GTES", "2024 – 2025."),
    ("Baccalauréat D - Lycée Bilingue de Bafoussam", "2021 – 2022."),
]

# ---------------------------------------------------------------- rendu

class CV:
    def __init__(self):
        self.buf = BytesIO()
        self.c = pdfcanvas.Canvas(self.buf, pagesize=A4)
        self.c.setAuthor(FULL_NAME)
        self.c.setTitle(f"CV - {TITLE} - {FULL_NAME}")
        self.c.setSubject("Candidature en alternance - septembre 2026")
        self.c.setCreator(FULL_NAME)
        self.y = TOP
        self.page = 1

    def page_break(self):
        self.c.showPage()
        self.page += 1
        self.y = TOP

    def need(self, height):
        if self.y - height < BOTTOM:
            self.page_break()

    def toks(self, text, f, s, col, url=None):
        return [{"t": w, "f": f, "s": s, "c": col, "u": url} for w in text.split()]

    def rich(self, tokens, x0=LEFT, width=None, leading=1.27, after=2):
        width = width if width is not None else (RIGHT - x0)
        lines = [[]]
        cur = 0.0
        for t in tokens:
            wlen = sw(t["t"], t["f"], t["s"])
            spl = sw(" ", t["f"], t["s"])
            if lines[-1] and cur + spl + wlen > width:
                lines.append([])
                cur = 0.0
            if lines[-1]:
                cur += spl
            lines[-1].append(t)
            cur += wlen
        for ln in lines:
            if not ln:
                continue
            lh = max(t["s"] for t in ln) * leading
            self.need(lh)
            self.y -= lh
            # regroupe les mots consécutifs de même style en un seul drawString
            # (texte contigu => extraction ATS propre)
            groups = []
            for t in ln:
                key = (t["f"], t["s"], t["c"].hexval(), t.get("u"))
                if groups and groups[-1][0] == key:
                    groups[-1][1].append(t["t"])
                else:
                    groups.append([key, [t["t"]], t])
            x = x0
            for gi, (key, words, t) in enumerate(groups):
                if gi:
                    x += sw(" ", t["f"], t["s"])
                text = " ".join(words)
                self.c.setFont(t["f"], t["s"])
                self.c.setFillColor(t["c"])
                self.c.drawString(x, self.y, text)
                wl = sw(text, t["f"], t["s"])
                if t.get("u"):
                    url = t["u"] if t["u"].startswith(("http", "mailto")) else "https://" + t["u"]
                    self.c.linkURL(url, (x, self.y - 2, x + wl, self.y + t["s"] * 0.85), relative=0)
                    self.c.setLineWidth(0.5)
                    self.c.setStrokeColor(t["c"])
                    self.c.line(x, self.y - 1.4, x + wl, self.y - 1.4)
                x += wl
        self.y -= after

    def head(self, text):
        self.need(30)
        self.y -= 14
        self.c.setFont(FB, 11)
        self.c.setFillColor(NAVY)
        self.c.drawString(LEFT, self.y, text.upper())
        self.c.setStrokeColor(NAVY)
        self.c.setLineWidth(0.8)
        self.c.line(LEFT, self.y - 3.5, RIGHT, self.y - 3.5)
        self.y -= 8

    def build(self):
        c = self.c
        c.setFont(FB, 18)
        c.setFillColor(NAVY)
        c.drawString(LEFT, self.y - 14, FULL_NAME)
        self.y -= 30
        c.setFont(FB, 11.5)
        c.setFillColor(BLUE)
        c.drawString(LEFT, self.y, TITLE)
        self.y -= 13
        self.rich(self.toks("Paris - Île-de-France · 06 25 83 90 07 ·", FR, 9, GRAY)
                  + self.toks("nagoloumtalladanielparfait@gmail.com", FR, 9, BLUE,
                              "mailto:nagoloumtalladanielparfait@gmail.com"), after=1)
        self.rich(self.toks("linkedin.com/in/nagoloum", FR, 9, BLUE, "https://www.linkedin.com/in/nagoloum")
                  + self.toks("·", FR, 9, GRAY)
                  + self.toks("github.com/nagoloumdaniel", FR, 9, BLUE, "https://github.com/nagoloumdaniel")
                  + self.toks("·", FR, 9, GRAY)
                  + self.toks("nagoloum.vercel.app", FR, 9, BLUE, "https://nagoloum.vercel.app"), after=0)

        self.head("Profil professionnel")
        self.rich(self.toks(PROFILE, FR, 10, BLACK), after=2)

        self.head("Expérience professionnelle")
        for exp in EXPERIENCES:
            self.need(26)
            self.y -= 3
            self.rich(self.toks(exp["role"], FB, 10.5, BLACK)
                      + self.toks("· " + exp["dates"], FI, 9.5, GRAY), after=1)
            for b in exp["bullets"]:
                self.rich(self.toks("•", FR, 10, BLACK) + self.toks(b, FR, 10, BLACK),
                          x0=LEFT + 10, after=1)

        self.head("Projets majeurs")
        for pr in MAJOR:
            self.need(40)
            self.y -= 3
            self.rich(self.toks(pr["name"], FB, 10.5, NAVY)
                      + self.toks("- " + pr["kind"], FI, 9.5, GRAY), after=1)
            tk = self.toks(pr["tech"], FI, 9, GRAY)
            if pr["link"]:
                tk += self.toks("·", FR, 9, GRAY) + self.toks(pr["link"], FR, 9, BLUE, pr["link"])
            self.rich(tk, after=1)
            self.rich(self.toks(pr["desc"], FR, 10, BLACK), after=2)

        self.head("Autres projets")
        for name, info, link in OTHER:
            self.need(14)
            tk = (self.toks("•", FR, 10, BLACK) + self.toks(name + " :", FB, 10, BLACK)
                  + self.toks(info, FR, 10, BLACK))
            if link:
                tk += self.toks("·", FR, 9, GRAY) + self.toks(link, FR, 9, BLUE, link)
            self.rich(tk, x0=LEFT + 10, after=1.5)

        self.head("Compétences techniques")
        for label, items in SKILLS:
            self.need(14)
            self.rich(self.toks(label + " :", FB, 10, BLACK) + self.toks(items, FR, 10, BLACK), after=1.5)

        self.head("Formation")
        for main, detail in FORMATION:
            self.need(14)
            self.rich(self.toks(main, FB, 10, BLACK) + self.toks("- " + detail, FR, 10, BLACK), after=1.5)

        self.head("Certifications")
        self.rich(self.toks("Anthropic - Claude Code", FR, 10, BLACK), after=1)

        self.head("Langues")
        self.rich(self.toks("Français : langue maternelle · Anglais : intermédiaire (B2)", FR, 10, BLACK), after=1)

        self.head("Liens professionnels")
        self.rich(self.toks("Portfolio :", FB, 10, BLACK)
                  + self.toks("nagoloum.vercel.app", FR, 10, BLUE, "https://nagoloum.vercel.app")
                  + self.toks("· GitHub :", FB, 10, BLACK)
                  + self.toks("github.com/nagoloumdaniel", FR, 10, BLUE, "https://github.com/nagoloumdaniel")
                  + self.toks("· LinkedIn :", FB, 10, BLACK)
                  + self.toks("linkedin.com/in/nagoloum", FR, 10, BLUE, "https://www.linkedin.com/in/nagoloum"),
                  after=0)

        c.showPage()
        c.save()
        return self.buf.getvalue(), self.page


if __name__ == "__main__":
    data, pages = CV().build()
    out = os.path.normpath(OUT_PATH)
    with open(out, "wb") as f:
        f.write(data)
    print(f"OK : {out} ({pages} page(s), {len(data)} octets, police {FR})")
