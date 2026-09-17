import React, { useState } from 'react';
import './Qualifications.css';

const education = [
  { title: 'Mastère Développement Logiciel',
    sub: 'INGETIS - alternance 24 mois',       dates: 'Rentrée 2026',  side: 'left'  },
  { title: 'Bachelor Développement / Data', sub: 'INGETIS, Paris (diplômé)', dates: '2025 – 2026', side: 'right' },
  { title: 'BTS (Bac+2)',         sub: 'GTES',                        dates: '2024 – 2025', side: 'left'  },
  { title: 'Baccalauréat D',      sub: 'Lycée Bilingue Bafoussam',    dates: '2021 – 2022', side: 'right' },
  { title: 'Probatoire D',        sub: 'Lycée Bilingue Bafoussam',    dates: '2020 – 2021', side: 'left'  },
];
const experience = [
  { title: 'Stagiaire Développeur Front-End',
    sub: 'DATALIA - plateforme immobilière KILICASA',
    dates: 'Avril – juin 2026 (3 mois)', side: 'left' },
  { title: 'Projets Full-Stack',
    sub: 'Allibuy · Zolya · Campaign Mailer · Cyna (en équipe)', dates: '', side: 'right' },
  { title: 'Design graphique & motion', sub: 'BRITECH',                  dates: '2022 – 2025', side: 'left'  },
];
const certifications = [
  { title: 'Claude Code', sub: 'Anthropic', dates: '', side: 'left' },
];

const TimelineItem = ({ item }) => {
  const isLeft = item.side === 'left';
  return (
    <div className="qualification__data">
      <div className={isLeft ? 'qualification__text-left' : ''}>
        {isLeft && <>
          <h3 className="qualification__title">{item.title}</h3>
          {item.sub && <span className="qualification__subtitle">{item.sub}</span>}
          {item.dates && <div className="qualification__calendar"><i className="uil uil-calendar-alt" /> {item.dates}</div>}
        </>}
      </div>
      <div>
        <span className="qualification__rounder" />
        <span className="qualification__line" />
      </div>
      <div className={!isLeft ? 'qualification__text-right' : ''}>
        {!isLeft && <>
          <h3 className="qualification__title">{item.title}</h3>
          {item.sub && <span className="qualification__subtitle">{item.sub}</span>}
          {item.dates && <div className="qualification__calendar"><i className="uil uil-calendar-alt" /> {item.dates}</div>}
        </>}
      </div>
    </div>
  );
};

const Qualifications = () => {
  const [tab, setTab] = useState(1);
  return (
    <section className="qualification section">
      <span className="section__subtitle">Mon parcours</span>
      <h2 className="section__title reveal">Mes Qualifications</h2>
      <div className="qualification__container container">
        <div className="qualification__tabs reveal d1">
          {[
            { id: 1, icon: 'uil-graduation-cap', label: 'Éducation' },
            { id: 2, icon: 'uil-briefcase-alt',  label: 'Expérience' },
            { id: 3, icon: 'uil-award',          label: 'Certifications' },
          ].map(({ id, icon, label }) => (
            <button
              key={id}
              type="button"
              className={`qualification__button${tab===id?' qualification__active':''}`}
              onClick={()=>setTab(id)}
              aria-label={label}
              aria-pressed={tab===id}
              title={label}
            >
              <i className={`uil ${icon} qualification__icon`} />
              <span className="qualification__label">{label}</span>
            </button>
          ))}
        </div>
        <div className="qualification__sections">
          <div className={`qualification__content${tab===1?' qualification__content-active':''}`}>
            {education.map((item,i) => <TimelineItem key={i} item={item} />)}
          </div>
          <div className={`qualification__content${tab===2?' qualification__content-active':''}`}>
            {experience.map((item,i) => <TimelineItem key={i} item={item} />)}
          </div>
          <div className={`qualification__content${tab===3?' qualification__content-active':''}`}>
            {certifications.map((item,i) => <TimelineItem key={i} item={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Qualifications;
