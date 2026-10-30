import React from 'react';
import { GITHUB_USER } from '../../lib/github';
import ContributionGraph from './ContributionGraph';
import './Github.css';

const GithubActivity = () => (
  <section className="github section" id="github">
    <span className="section__subtitle">En temps réel</span>
    <h2 className="section__title reveal">Activité GitHub</h2>
    <div className="container">
      <div className="gh-panel glass reveal">
        <header className="gh-panel__head">
          <span className="gh-panel__title"><i className="uil uil-github-alt" aria-hidden="true" /> {GITHUB_USER}</span>
          <a className="gh-panel__link" href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
            Profil GitHub <i className="uil uil-arrow-up-right" aria-hidden="true" />
          </a>
        </header>
        <ContributionGraph />
      </div>
    </div>
  </section>
);

export default GithubActivity;
