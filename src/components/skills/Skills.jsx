import React from 'react';
import './Skills.css';
import { TerminalWindow } from '../ide/Ide';

const categories = [
  { icon: 'uil-brackets-curly', title: 'Langages',
    items: ['JavaScript / TypeScript', 'PHP', 'Python', 'SQL', 'Java', 'Dart', 'C#'] },
  { icon: 'uil-desktop', title: 'Front-End',
    items: ['React.js', 'Next.js', 'Vue.js', 'Angular.js', 'Tailwind CSS', 'Figma (maquettes)', 'React Native'] },
  { icon: 'uil-server', title: 'Back-End',
    items: ['Node.js (NestJS, Express, Fastify)', 'API REST', 'Swagger', 'Flask / FastAPI', 'Spring Boot (bases)', 'PHP'] },
  { icon: 'uil-database', title: 'Bases de données',
    items: ['PostgreSQL', 'MySQL / MariaDB', 'MongoDB', 'Redis', 'NeonDB', 'Supabase', 'Prisma', 'Drizzle ORM'] },
  { icon: 'uil-wrench', title: 'DevOps & outils',
    items: ['Git / GitHub', 'Docker', 'Vercel', 'Linux', 'Postman', 'Render'] },
  { icon: 'uil-robot', title: 'Data & IA',
    items: ['Python (pandas, Streamlit)', 'Scoring algorithmique', 'API de modèles (Claude, Gemini, GPT)'] },
  { icon: 'uil-sitemap', title: 'Méthodes & principes',
    items: ['SOLID', 'Clean Code / Clean Architecture', 'Transactions ACID', 'Agile / Scrum', 'Revues de code (Git)', 'Jira / Notion'] },
  { icon: 'uil-globe', title: 'Langues',
    items: ['Français : langue maternelle', 'Anglais : intermédiaire (B1)'] },
];

const total = categories.reduce((n, c) => n + c.items.length, 0);
const SKILL_LINES = [
  { k: 'cmd', t: 'skills --count' },
  ...categories.map(c => ({ k: 'out', parts: [
    { t: '✓ ', c: 'ok' },
    { t: c.title.padEnd(22, ' '), c: 'path' },
    { t: String(c.items.length).padStart(2, ' '), c: 'num' },
  ] })),
  { k: 'ok', t: `${categories.length} catégories · ${total} compétences` },
];

const Skills = () => (
  <section className="skills section" id="skills">
    <span className="section__subtitle">Ce que je maîtrise</span>
    <h2 className="section__title reveal">Mes Compétences</h2>
    <div className="skills__container container grid">
      {categories.flatMap(({ icon, title, items }, i) => {
        const card = (
          <div key={title} className={`skills__content reveal-scale d${(i % 4) + 1}`}>
            <h3 className="skills__title"><i className={`uil ${icon} skills__title-icon`} />{title}<span className="skills__count">{String(items.length).padStart(2, '0')}</span></h3>
            <div className="skills__tags">
              {items.map(name => <span key={name} className="skills__tag">{name}</span>)}
            </div>
          </div>
        );
        /* Le terminal s'insère au milieu des cartes (grands écrans) */
        return i === 3
          ? [card, (
            <div key="terminal" className="skills__ide">
              <TerminalWindow title="skills : zsh" lines={SKILL_LINES} className="ide-win--flow" />
            </div>
          )]
          : [card];
      })}
    </div>
  </section>
);
export default Skills;
