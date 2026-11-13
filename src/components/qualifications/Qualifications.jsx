import React, { useState } from 'react';
import './Qualifications.css';
import { EditorWindow, TerminalWindow } from '../ide/Ide';
import { etudes, experiences, certifications } from '../../lib/contenu/parcours';

/* Même contenu que la frise, en « git log » (généré depuis content/experiences) */
const GIT_LOG = [
  { k: 'cmd', t: 'git log --graph --oneline experience' },
  ...experiences.map(x => ({ k: 'out', parts: [
    { t: '* ', c: 'warn' }, { t: `${x.shortDate}  `, c: 'num' }, { t: x.title, c: 'plain' }, { t: ` · ${x.sub.split(/\s[-·]\s/)[0]}`, c: 'dim' },
  ] })),
];

/* Boutons d'un certificat : télécharger le PDF, vérifier en ligne */
const CertActions = ({ item }) => (
  <div className="qualification__actions">
    <a href={item.file} download={item.fileName} className="button button--sm button--flex"
       aria-label={`Télécharger le certificat : ${item.title}`}>
      <i className="uil uil-import" aria-hidden="true" /> Télécharger
    </a>
    {item.verify && (
      <a href={item.verify} target="_blank" rel="noreferrer" className="button button--sm button--ghost button--flex"
         aria-label={`Vérifier le certificat en ligne : ${item.title}`}>
        <i className="uil uil-external-link-alt" aria-hidden="true" /> Vérifier
      </a>
    )}
  </div>
);

const CERT_FILES = {
  'certifications.json': {
    lang: 'json',
    lines: JSON.stringify(
      certifications.map(c => ({ title: c.title, issuer: c.sub.split(/\s[-·]\s/)[0], ...(c.dates && { period: c.dates }), status: 'completed' })),
      null, 2,
    ).split('\n'),
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
  const tabs = [
    { id: 1, icon: 'uil-graduation-cap', label: 'Éducation', count: etudes.length },
    { id: 2, icon: 'uil-briefcase-alt',  label: 'Expérience', count: experiences.length },
    { id: 3, icon: 'uil-award',          label: 'Certifications', count: certifications.length },
  ].filter(t => t.count > 0); // une rubrique sans dossier n'est pas affichée
  const [chosen, setTab] = useState(1);
  const tab = tabs.some(t => t.id === chosen) ? chosen : tabs[0]?.id;
  if (!tabs.length) return null;
  return (
    <section className="qualification section">
      <span className="section__subtitle">Formation & expérience</span>
      <h2 className="section__title">Mon parcours</h2>
      <div className="qualification__container container">
        <div className="qualification__tabs">
          {tabs.map(({ id, icon, label }) => (
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
            {etudes.map((item,i) => <TimelineItem key={i} item={item} />)}
          </div>
          <div className={`qualification__content${tab===2?' qualification__content-active':''}`}>
            {experiences.map((item,i) => <TimelineItem key={i} item={item} />)}
            {experiences.length > 0 && <TerminalWindow title="experience : git" lines={GIT_LOG} className="ide-win--flow qualification__ide" />}
          </div>
          <div className={`qualification__content${tab===3?' qualification__content-active':''}`}>
            {certifications.map((item,i) => <TimelineItem key={i} item={item} />)}
            {certifications.length > 0 && <EditorWindow files={CERT_FILES} label="Certifications" className="ide-win--flow qualification__ide" />}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Qualifications;
