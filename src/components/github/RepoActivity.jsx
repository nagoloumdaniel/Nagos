import React, { useState } from 'react';
import { getRepos } from '../../lib/github';
import useAsyncData from '../../hooks/useAsyncData';
import GithubStat from './GithubStat';
import './Github.css';

const W = 640;
const H = 150;
const PAD = { l: 8, r: 8, t: 14, b: 22 };

const fmtWeek = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

/* Graphique des commits par semaine (5 mois) + chiffres : commits, branches, contributeurs humains (IA exclues). */
const RepoActivity = ({ repos }) => {
  const { data, status } = useAsyncData((force) => getRepos(repos, force), 10 * 60 * 1000);
  const [active, setActive] = useState(null);

  if (status === 'error') {
    return <p className="gh-note" role="status">Statistiques GitHub indisponibles pour le moment (limite de requêtes de l'API publique).</p>;
  }
  if (!data) return <div className="gh-skeleton gh-skeleton--repo" aria-busy="true" aria-label="Chargement de l'activité GitHub" />;

  const { series } = data;
  const max = Math.max(1, ...series.map(s => s.count));
  const bw = (W - PAD.l - PAD.r) / series.length;
  const bar = (s, i) => {
    const h = (s.count / max) * (H - PAD.t - PAD.b);
    return { x: PAD.l + i * bw + 3, w: bw - 6, h, y: H - PAD.b - h };
  };
  const pts = series.map((s, i) => {
    const b = bar(s, i);
    return `${(b.x + b.w / 2).toFixed(1)},${b.y.toFixed(1)}`;
  });
  const area = `M${PAD.l + bw / 2},${H - PAD.b} L${pts.join(' L')} L${W - PAD.r - bw / 2},${H - PAD.b} Z`;
  const cur = active === null ? null : series[active];

  return (
    <div className="gh-repo">
      <ul className="gh-stats gh-stats--repo">
        <GithubStat value={data.totalCommits} label="commits au total" icon="uil-code-commit" />
        <GithubStat value={data.recent} label="commits (5 mois)" icon="uil-chart-line" />
        <GithubStat value={data.branches} label="branches" icon="uil-code-branch" />
        <GithubStat value={data.contributors} label="contributeurs (hors IA)" icon="uil-users-alt" />
      </ul>

      <div className="gh-canvas gh-chart" onMouseLeave={() => setActive(null)}>
        <svg
          className="gh-svg gh-svg--chart"
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`${data.recent} commits sur les 13 dernières semaines, ${data.branches} branches, ${data.contributors} contributeurs`}
        >
          <defs>
            <linearGradient id="gh-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--gh-4)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--gh-4)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} className="gh-baseline" />
          <path d={area} fill="url(#gh-area)" className="gh-area" />
          <polyline points={pts.join(' ')} className="gh-line" pathLength="1" />
          {series.map((s, i) => {
            const b = bar(s, i);
            return (
              <g key={s.from} onMouseEnter={() => setActive(i)} onTouchStart={() => setActive(i)}>
                <rect x={b.x - 3} y={PAD.t} width={b.w + 6} height={H - PAD.t - PAD.b} className="gh-hit" />
                <rect
                  x={b.x} y={b.y} width={b.w} height={Math.max(b.h, s.count ? 2 : 0)} rx="2"
                  className={`gh-bar${active === i ? ' is-active' : ''}`}
                  style={{ animationDelay: `${i * 45}ms` }}
                />
                {i % 3 === 0 && <text x={b.x + b.w / 2} y={H - 6} className="gh-axis gh-axis--c">{fmtWeek(s.from)}</text>}
              </g>
            );
          })}
        </svg>
        {cur && (
          <div className="gh-tip" style={{ left: `${((PAD.l + (active + 0.5) * bw) / W) * 100}%`, top: 0 }} role="status">
            <strong>{cur.count} commit{cur.count > 1 ? 's' : ''}</strong>
            <span>semaine du {fmtWeek(cur.from)}</span>
          </div>
        )}
      </div>
      <p className="gh-foot">
        Données GitHub publiques, actualisées toutes les 10 min{data.stale ? ' (dernières valeurs connues)' : ''}.
      </p>
    </div>
  );
};

export default RepoActivity;
