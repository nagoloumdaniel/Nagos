import React, { useState } from 'react';
import './Qualifications.css';
import { EditorWindow, TerminalWindow } from '../ide/Ide';

const education = [
  { title: 'Mastère Développement Logiciel',
    sub: 'INGETIS, Paris - alternance 24 mois', dates: 'Rentrée 2026 / 2027', side: 'left'  },
  { title: 'Bachelor Développement Logiciel',
    sub: 'INGETIS, Paris - diplôme obtenu',     dates: '2025 / 2026',         side: 'right' },
  { title: 'BTS (Bac+2)',         sub: 'GTES',                     dates: '2024 – 2025', side: 'left'  },
  { title: 'Baccalauréat D',      sub: 'Lycée Bilingue Bafoussam', dates: '2021 – 2022', side: 'right' },
  { title: 'Probatoire D',        sub: 'Lycée Bilingue Bafoussam', dates: '2020 – 2021', side: 'left'  },
];
const experience = [
  { title: 'Software Engineer Intern',
    sub: 'Tynoc Tech - certificat de réussite',
    dates: '18 sept. – 18 oct. 2026 (1 mois)', side: 'left' },
  { title: 'Stagiaire Développeur Front-End',
    sub: 'DATALIA - plateforme immobilière KILICASA',
    dates: 'Avril – juin 2026 (3 mois)', side: 'right' },
  { title: 'Design graphique & motion', sub: 'BRITECH', dates: '2022 – 2025', side: 'left' },
];

/* Même contenu que la frise, en « git log » */
const GIT_LOG = [
  { k: 'cmd', t: 'git log --graph --oneline experience' },
  { k: 'out', parts: [{ t: '* ', c: 'warn' }, { t: 'sept. 2026  ', c: 'num' }, { t: 'Software Engineer Intern', c: 'plain' }, { t: ' · Tynoc Tech', c: 'dim' }] },
  { k: 'out', parts: [{ t: '* ', c: 'warn' }, { t: 'avr. 2026   ', c: 'num' }, { t: 'Stagiaire Développeur Front-End', c: 'plain' }, { t: ' · DATALIA', c: 'dim' }] },
  { k: 'out', parts: [{ t: '* ', c: 'warn' }, { t: '2022-2025   ', c: 'num' }, { t: 'Design graphique & motion', c: 'plain' }, { t: ' · BRITECH', c: 'dim' }] },
];

const certifications = [
  { title: 'Claude Code in Action', sub: 'Anthropic · certificat de réussite', dates: '', side: 'left',
    file: '/certificats/Certificat_Daniel_NAGOLOUM_TALLA_Claude_Code_in_Action.pdf',
    verify: 'https://verify.skilljar.com/c/gbnsgq8fsask' },
  { title: 'Software Engineer Intern', sub: 'Tynoc Tech · certificat de réussite', dates: '18 sept. – 18 oct. 2026', side: 'right',
    file: '/certificats/Certificat_Daniel_NAGOLOUM_TALLA_Software_Engineer_Intern_Tynoc_Tech.pdf',
    verify: 'https://app.tynoc.com/verify/tynck4qasaxey6bg' },
];

/* Boutons d'un certificat : télécharger le PDF, vérifier en ligne */
const CertActions = ({ item }) => (
  <div className="qualification__actions">
    <a href={item.file} download={item.file.split('/').pop()} className="button button--sm button--flex"
       aria-label={`Télécharger le certificat : ${item.title}`}>
      <i className="uil uil-import" aria-hidden="true" /> Télécharger
    </a>
    <a href={item.verify} target="_blank" rel="noreferrer" className="button button--sm button--ghost button--flex"
       aria-label={`Vérifier le certificat en ligne : ${item.title}`}>
      <i className="uil uil-external-link-alt" aria-hidden="true" /> Vérifier
    </a>
  </div>
);

const CERT_FILES = {
  'certifications.json': {
    lang: 'json',
    lines: [
      '[',
      '  {',
      '    "title": "Claude Code in Action",',
      '    "issuer": "Anthropic",',
      '    "status": "completed"',
      '  },',
      '  {',
      '    "title": "Software Engineer Intern",',
      '    "issuer": "Tynoc Tech",',
      '    "period": "18 sept. – 18 oct. 2026",',
      '    "status": "completed"',
      '  }',
      ']',
    ],
  },
};

const TimelineItem = ({ item }) => {
  const isLeft = item.side === 'left';
  return (
    <div className="qualification__data">
      <div className={isLeft ? 'qualification__text-left' : ''}>
        {isLeft && <>
          <h3 className="qualification__title">{item.title}</h3>
          {item.sub && <span className="qualification__subtitle">{item.sub}</span>}
          {item.dates && <div className="qualification__calendar"><i className="uil uil-calendar-alt" /> {item.dates}</div>}
          {item.file && <CertActions item={item} />}
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
          {item.file && <CertActions item={item} />}
        </>}
      </div>
    </div>
  );
};

const Qualifications = () => {
  const [tab, setTab] = useState(1);
  return (
    <section className="qualification section">
      <span className="section__subtitle">Formation & expérience</span>
      <h2 className="section__title reveal">Mon parcours</h2>
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
            <TerminalWindow title="experience : git" lines={GIT_LOG} className="ide-win--flow qualification__ide" />
          </div>
          <div className={`qualification__content${tab===3?' qualification__content-active':''}`}>
            {certifications.map((item,i) => <TimelineItem key={i} item={item} />)}
            <EditorWindow files={CERT_FILES} label="Certifications" className="ide-win--flow qualification__ide" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Qualifications;
