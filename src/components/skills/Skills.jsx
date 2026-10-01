import React from 'react';
import './Skills.css';

const categories = [
  { icon: 'uil-brackets-curly', title: 'Langages',
    items: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'SQL', 'Java', 'Dart', 'C#'] },
  { icon: 'uil-desktop', title: 'Front-End & Mobile',
    items: ['React', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'Redux Toolkit', 'Motion (Framer Motion)', 'Three.js', 'React Native (Expo)', 'Flutter', 'Figma (maquettes)'] },
  { icon: 'uil-server', title: 'Back-End',
    items: ['Node.js', 'NestJS', 'Express', 'Fastify', 'API REST', 'Swagger', 'FastAPI', 'Flask', 'BullMQ / Redis (files de tâches)', 'Socket.io', 'Zod', 'Stripe (paiements)', 'Spring Boot (bases)'] },
  { icon: 'uil-database', title: 'Bases de données',
    items: ['PostgreSQL', 'MySQL / MariaDB', 'MongoDB', 'Redis', 'NeonDB', 'Supabase', 'Prisma', 'Drizzle ORM'] },
  { icon: 'uil-wrench', title: 'DevOps & outils',
    items: ['Git / GitHub', 'Docker', 'Vercel', 'Render', 'Linux', 'Postman', 'Playwright (tests E2E)', 'Turborepo'] },
  { icon: 'uil-robot', title: 'Data & IA',
    items: ['Python (pandas)', 'scikit-learn / LightGBM', 'Streamlit', 'Scoring algorithmique', 'API Claude', 'API Gemini', 'API GPT', 'Claude Code'] },
  { icon: 'uil-sitemap', title: 'Méthodes & principes',
    items: ['SOLID', 'Clean Code', 'Clean Architecture', 'Transactions ACID', 'Tests unitaires (Jest / Pytest)', 'Agile / Scrum', 'Revues de code (Git)', 'Jira / Notion'] },
  { icon: 'uil-globe', title: 'Langues',
    items: ['Français : langue maternelle', 'Anglais : intermédiaire (B1)'] },
];

const Skills = () => (
  <section className="skills section" id="skills">
    <span className="section__subtitle">Ce que je maîtrise</span>
    <h2 className="section__title reveal">Mes Compétences</h2>
    <div className="skills__container container grid">
      {categories.map(({ icon, title, items }, i) => (
        <div key={title} className={`skills__content reveal-scale d${(i % 4) + 1}`}>
          <h3 className="skills__title"><i className={`uil ${icon} skills__title-icon`} />{title}</h3>
          <div className="skills__tags">
            {items.map(name => <span key={name} className="skills__tag">{name}</span>)}
          </div>
        </div>
      ))}
    </div>
  </section>
);
export default Skills;
