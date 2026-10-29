import React, { useMemo, useState } from 'react';
import { getContributions, GITHUB_USER } from '../../lib/github';
import useAsyncData from '../../hooks/useAsyncData';
import GithubStat from './GithubStat';
import './Github.css';

const CELL = 12;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT = 30;
const TOP = 18;
const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const DAYS = ['', 'lun.', '', 'mer.', '', 'ven.', ''];

const fmtDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

const computeStats = (days) => {
  const today = new Date().toISOString().slice(0, 10);
  const past = days.filter(d => d.date <= today);
  const total = past.reduce((n, d) => n + d.count, 0);
  const active = past.filter(d => d.count > 0).length;
  const best = past.reduce((m, d) => Math.max(m, d.count), 0);
  // Série en cours : un jour vide aujourd'hui ne casse pas la série
  let streak = 0;
  for (let i = past.length - 1; i >= 0; i--) {
    if (past[i].count > 0) streak++;
    else if (i === past.length - 1) continue;
    else break;
  }
  return { total, active, best, streak };
};

const ContributionGraph = () => {
  const { data, status } = useAsyncData(getContributions);
  const [tip, setTip] = useState(null);
  const days = data?.data;

  const layout = useMemo(() => {
    if (!days) return null;
    const weeks = [];
    days.forEach((d, i) => {
      if (i % 7 === 0) weeks.push([]);
      weeks[weeks.length - 1].push(d);
    });
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((w, x) => {
      const m = new Date(`${w[0].date}T12:00:00`).getMonth();
      if (m !== lastMonth && x < weeks.length - 1) { labels.push({ x, text: MONTHS[m] }); lastMonth = m; }
    });
    return { weeks, labels };
  }, [days]);

  if (status === 'error') {
    return (
      <p className="gh-note" role="status">
        Calendrier indisponible pour le moment.{' '}
        <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">Voir mon profil GitHub</a>.
      </p>
    );
  }
  if (!layout) return <div className="gh-skeleton" aria-busy="true" aria-label="Chargement des contributions" />;

  const stats = computeStats(days);
  const width = LEFT + layout.weeks.length * STEP;
  const height = TOP + 7 * STEP;
  const show = (e, d, x, y) => {
    const box = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    const scale = box.width / width;
    setTip({ d, left: (LEFT + x * STEP + CELL / 2) * scale, top: (TOP + y * STEP) * scale });
  };

  return (
    <div className="gh-graph">
      <ul className="gh-stats">
        <GithubStat value={stats.total} label="contributions (3 mois)" icon="uil-code-branch" />
        <GithubStat value={stats.active} label="jours actifs" icon="uil-calendar-alt" />
        <GithubStat value={stats.streak} label="jours de série" icon="uil-fire" />
        <GithubStat value={stats.best} label="record sur 1 jour" icon="uil-trophy" />
      </ul>

      <div className="gh-scroll">
        <div className="gh-canvas" onMouseLeave={() => setTip(null)}>
          <svg
            className="gh-svg"
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={`${stats.total} contributions GitHub sur les 3 derniers mois, ${stats.active} jours actifs`}
          >
            {layout.labels.map(l => (
              <text key={l.x} x={LEFT + l.x * STEP} y={10} className="gh-axis">{l.text}</text>
            ))}
            {DAYS.map((t, i) => t && (
              <text key={i} x={0} y={TOP + i * STEP + CELL - 2} className="gh-axis">{t}</text>
            ))}
            {layout.weeks.map((week, x) => week.map((d, y) => (
              <rect
                key={d.date}
                x={LEFT + x * STEP}
                y={TOP + y * STEP}
                width={CELL}
                height={CELL}
                rx="2"
                className={`gh-cell gh-l${d.count === 0 ? 0 : d.level}`}
                style={{ animationDelay: `${x * 28 + y * 6}ms` }}
                onMouseEnter={(e) => show(e, d, x, y)}
                onTouchStart={(e) => show(e, d, x, y)}
              />
            )))}
          </svg>
          {tip && (
            <div className="gh-tip" style={{ left: tip.left, top: tip.top }} role="status">
              <strong>{tip.d.count} contribution{tip.d.count > 1 ? 's' : ''}</strong>
              <span>{fmtDate(tip.d.date)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="gh-legend" aria-hidden="true">
        <span>Moins</span>
        {[0, 1, 2, 3, 4].map(l => <i key={l} className={`gh-cell gh-l${l} gh-legend__cell`} />)}
        <span>Plus</span>
      </div>
    </div>
  );
};

export default ContributionGraph;
