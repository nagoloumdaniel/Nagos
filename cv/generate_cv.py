# -*- coding: utf-8 -*-
"""Générateur du CV du portfolio - source modifiable.

Régénère `public/CV_Daniel_NAGOLOUM_TALLA.pdf`, le fichier téléchargé par le bouton
« Télécharger mon CV » du site (le nom du fichier contient le nom du candidat).
CV d'une page, compatible ATS : une colonne, texte sélectionnable, liens cliquables.

Usage :
    pip install reportlab
    python cv/generate_cv.py

Police : Arial (C:\\Windows\\Fonts) si disponible, sinon Helvetica.
"""
import os

from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_PATH = os.path.join(HERE, "..", "public", "CV_Daniel_NAGOLOUM_TALLA.pdf")

NAVY, BLUE, GRAY, BLACK = HexColor("#0D2B55"), HexColor("#1A6BC8"), HexColor("#555555"), HexColor("#111111")

try:
    pdfmetrics.registerFont(TTFont("Arial", r"C:\Windows\Fonts\arial.ttf"))
    pdfmetrics.registerFont(TTFont("Arial-Bold", r"C:\Windows\Fonts\arialbd.ttf"))
    pdfmetrics.registerFont(TTFont("Arial-Italic", r"C:\Windows\Fonts\ariali.ttf"))
    pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="Arial-Bold", italic="Arial-Italic", boldItalic="Arial-Bold")
    FR, FB, FI = "Arial", "Arial-Bold", "Arial-Italic"
except Exception:
    FR, FB, FI = "Helvetica", "Helvetica-Bold", "Helvetica-Oblique"

def style(name, **kw):
    base = dict(fontName=FR, fontSize=9.2, leading=12.6, textColor=BLACK)
    base.update(kw)
    return ParagraphStyle(name, **base)

S_NAME = style("name", fontName=FB, fontSize=20, leading=24, textColor=NAVY)
S_ROLE = style("role", fontName=FB, fontSize=13, leading=17, textColor=BLUE)
S_META = style("meta", textColor=GRAY, leading=13)
S_H = style("h", fontName=FB, fontSize=10, leading=13, textColor=NAVY, spaceBefore=11)
S_P = style("p")
S_ITEM = style("item", fontName=FR)
S_BUL = style("bul", leftIndent=12, bulletIndent=2)
S_PRJ = style("prj", fontName=FB, textColor=NAVY, spaceBefore=3)
S_TECH = style("tech", fontName=FI, fontSize=8.4, textColor=GRAY)

def heading(text):
    return KeepTogether([Paragraph(text.upper(), S_H), HRFlowable(width="100%", thickness=1, color=NAVY, spaceBefore=1, spaceAfter=4)])

def skill(label, text):
    return Paragraph(f"<b>{label} :</b> {text}", S_ITEM)

story = [
    Paragraph("Daniel Parfait NAGOLOUM TALLA", S_NAME),
    Paragraph("Développeur Full-Stack + IA", S_ROLE),
    Paragraph("Alternance 24 MOIS (dès septembre 2026)", style("alt", fontName=FB, fontSize=11, leading=15, textColor=BLUE)),
    Spacer(1, 3),
    Paragraph("Noisy-le-Grand - Île-de-France - 06 25 83 90 07 - 3 semaines en entreprise et 1 semaine en formation", S_META),
    Paragraph(
        '<a href="mailto:nagoloumtalladanielparfait@gmail.com" color="#1A6BC8">nagoloumtalladanielparfait@gmail.com</a> - '
        '<a href="https://www.linkedin.com/in/nagoloum" color="#1A6BC8">linkedin.com/in/nagoloum</a> - '
        '<a href="https://github.com/nagoloumdaniel" color="#1A6BC8">github.com/nagoloumdaniel</a>', S_META),

    heading("Profil professionnel"),
    Paragraph(
        "Développeur Full-Stack récemment diplômé d'un Bachelor Développement Logiciel (INGETIS Paris) et intégrant un "
        "Mastère Développement Logiciel. Je conçois des applications web complètes, de l'interface au back-end, en "
        "passant par la gestion des données. Ayant fait mes preuves lors d'un stage front-end chez DATALIA et sur des "
        "projets SaaS collaboratifs, je recherche une alternance pour la rentrée de septembre 2026 afin de poursuivre "
        "mon évolution technique.", S_P),

    heading("Compétences"),
    skill("Langages", "JavaScript / TypeScript, PHP, Python, SQL, Java, Dart, C#"),
    skill("Front-End", "React.js, Next.js, Vue.js, Angular.js, Tailwind CSS, Figma (maquettes), React Native"),
    skill("Back-End", "Node.js (NestJS, Express, Fastify), API REST, Swagger, Flask / FastAPI, Spring Boot (bases), PHP"),
    skill("Bases de données", "PostgreSQL, MySQL / MariaDB, MongoDB, Redis, NeonDB, Supabase, Prisma, Drizzle ORM"),
    skill("DevOps &amp; outils", "Git / GitHub, Docker, Vercel, Linux, Postman, Render"),
    skill("Data &amp; IA", "Python (pandas, Streamlit), scoring algorithmique, API de modèles (Claude, Gemini, GPT)"),
    skill("Méthodes &amp; principes", "SOLID, Clean Code / Clean Architecture, transactions ACID, Agile / Scrum, revues de code (Git), Jira / Notion"),

    heading("Expérience professionnelle"),
    Paragraph("<b>Stagiaire Développeur Front-End - DATALIA</b> &nbsp;<font name='%s' color='#555555' size='8.6'>avril – juin 2026 (stage de 3 mois)</font>" % FI, S_P),
    Paragraph("Développement et intégration d'interfaces web responsives pour la plateforme immobilière KILICASA : "
              "composants réutilisables, amélioration de l'expérience utilisateur.", S_BUL, bulletText="•"),
    Paragraph("Intégration d'API, correction d'anomalies d'affichage, collaboration avec l'équipe technique via Git.", S_BUL, bulletText="•"),

    heading("Projets"),
    Paragraph("Allibuy - Marketplace e-commerce multi-vendeurs (Web &amp; Mobile) <font name='%s' color='#555555' size='8.6'>- (dépôt privé)</font>" % FI, S_PRJ),
    Paragraph("NextJS · React · NestJS · Prisma · PostgreSQL · Redis / BullMQ · Meilisearch · Expo…", S_TECH),
    Paragraph("Marketplace internationale semblable aux plateformes telles qu'Amazon, Alibaba, adaptée au marché africain.", S_P),
    Paragraph("Cyna - Plateforme SaaS de cybersécurité (Web &amp; Mobile) <font name='%s' color='#555555' size='8.6'>- projet académique, en équipe</font>" % FI, S_PRJ),
    Paragraph("ReactJS · NestJS · MongoDB · Stripe · Swagger · i18next…", S_TECH),
    Paragraph("Plateforme e-commerce de services de cybersécurité en abonnement avec backoffice administrateur.", S_P),
    Paragraph("CampaignMailer - Application de campagne mail (Web) <font name='%s' color='#555555' size='8.6'>- projet personnel</font>" % FI, S_PRJ),
    Paragraph("ReactJS · TypeScript · PostgreSQL · Redis / BullMQ · API Gmail · Express", S_TECH),
    Paragraph("Plateforme d'envois de campagnes mail avec suivi d'envoi et dashboard.", S_P),

    heading("Formation"),
    Paragraph("<b>Bachelor Développement Logiciel - INGETIS, Paris</b> - 2025 / 2026 - Diplôme obtenu", S_P),
    Paragraph("<b>Mastère Développement Logiciel - INGETIS, Paris</b> - rentrée 2026 / 2027 - alternance 24 mois", S_P),

    heading("Langues"),
    Paragraph("Français : langue maternelle &nbsp;·&nbsp; Anglais : intermédiaire (B1)", S_P),
]

def build():
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    doc = SimpleDocTemplate(
        OUT_PATH, pagesize=A4,
        leftMargin=1.8 * cm, rightMargin=1.8 * cm, topMargin=1.5 * cm, bottomMargin=1.3 * cm,
        title="CV - Daniel Parfait NAGOLOUM TALLA - Développeur Full-Stack + IA",
        author="Daniel Parfait NAGOLOUM TALLA",
    )
    doc.build(story)
    print("OK ->", os.path.abspath(OUT_PATH))

if __name__ == "__main__":
    build()
