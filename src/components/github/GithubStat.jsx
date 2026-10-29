import React from 'react';
import useCountUp from '../../hooks/useCountUp';

/* Chiffre animé (compte jusqu'à `value` à l'apparition). */
const GithubStat = ({ value, label, icon }) => {
  const [shown, ref] = useCountUp(value);
  return (
    <li className="gh-stat">
      <i className={`uil ${icon}`} aria-hidden="true" />
      <span className="gh-stat__value" ref={ref}>{shown.toLocaleString('fr-FR')}</span>
      <span className="gh-stat__label">{label}</span>
    </li>
  );
};

export default GithubStat;
