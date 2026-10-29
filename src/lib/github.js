/* Données GitHub publiques, lues côté navigateur (aucun jeton).
   - Calendrier de contributions : API publique github-contributions-api (mêmes chiffres que le profil).
   - Dépôts : API REST GitHub (commits, branches, contributeurs), 60 requêtes/h par IP, d'où le cache.
   Cache localStorage ; en cas d'échec (quota, hors-ligne) on ressert la dernière valeur connue. */

export const GITHUB_USER = 'nagoloumdaniel';
export const WINDOW_DAYS = 91; // 13 semaines ≈ 3 mois

const API = 'https://api.github.com';
const CONTRIB_API = 'https://github-contributions-api.jogruber.de/v4';
const CONTRIB_TTL = 5 * 60 * 1000;
const REPO_TTL = 10 * 60 * 1000;
const DAY = 864e5;

/* Comptes et auteurs d'IA, exclus des contributeurs et des commits. */
const AI_PATTERN = /(\[bot\]|-bot$|^bot$|claude|anthropic|copilot|chatgpt|openai|codex|gemini|cursor|devin|dependabot|renovate|github-actions|aider|windsurf)/i;
export const isAI = (login = '', name = '', type = '') =>
  type === 'Bot' || AI_PATTERN.test(login || '') || AI_PATTERN.test(name || '');

const readCache = (key) => {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
};
const writeCache = (key, data) => {
  try { localStorage.setItem(key, JSON.stringify({ at: Date.now(), data })); } catch { /* quota */ }
};

/* Renvoie { data, at, stale }. `force` ignore le TTL. */
async function cached(key, ttl, load, force = false) {
  const hit = readCache(key);
  if (hit && !force && Date.now() - hit.at < ttl) return { data: hit.data, at: hit.at, stale: false };
  try {
    const data = await load();
    writeCache(key, data);
    return { data, at: Date.now(), stale: false };
  } catch (err) {
    if (hit) return { data: hit.data, at: hit.at, stale: true };
    throw err;
  }
}

const HEADERS = { headers: { Accept: 'application/vnd.github+json' } };
const getJson = async (url) => {
  const res = await fetch(url, HEADERS);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

const iso = (d) => d.toISOString().slice(0, 10);

/* ── Contributions des 3 derniers mois ───────────────────── */
export function getContributions(force) {
  return cached('gh:contrib:v1', CONTRIB_TTL, async () => {
    const json = await getJson(`${CONTRIB_API}/${GITHUB_USER}?y=last`);
    const start = new Date();
    start.setUTCDate(start.getUTCDate() - (WINDOW_DAYS - 1));
    // Début sur un dimanche : colonnes de semaines pleines
    start.setUTCDate(start.getUTCDate() - start.getUTCDay());
    const from = iso(start);
    return json.contributions.filter(d => d.date >= from);
  }, force);
}

/* ── Statistiques d'un dépôt ─────────────────────────────── */
const lastPage = (res) => {
  const m = /[?&]page=(\d+)>; rel="last"/.exec(res.headers.get('Link') || '');
  return m ? Number(m[1]) : null;
};

async function loadRepo(repo) {
  const since = new Date(Date.now() - WINDOW_DAYS * DAY).toISOString();
  const base = `${API}/repos/${GITHUB_USER}/${repo}`;

  const [totalRes, branches, contributors] = await Promise.all([
    fetch(`${base}/commits?per_page=1`, HEADERS),
    getJson(`${base}/branches?per_page=100`),
    getJson(`${base}/contributors?per_page=100`),
  ]);
  if (!totalRes.ok) throw new Error(`HTTP ${totalRes.status}`);
  const totalCommits = lastPage(totalRes) ?? (await totalRes.json()).length;

  const recent = [];
  for (let page = 1; page <= 3; page++) {
    const batch = await getJson(`${base}/commits?since=${since}&per_page=100&page=${page}`);
    recent.push(...batch);
    if (batch.length < 100) break;
  }
  const human = recent.filter(c => !isAI(c.author?.login, c.commit?.author?.name, c.author?.type));

  return {
    totalCommits,
    branches: branches.length,
    contributors: contributors.filter(c => !isAI(c.login, '', c.type)).length,
    commitDates: human.map(c => c.commit.author.date.slice(0, 10)),
  };
}

export const getRepo = (repo, force) => cached(`gh:repo:v1:${repo}`, REPO_TTL, () => loadRepo(repo), force);

/* Agrège plusieurs dépôts (ex. front + back) en séries hebdomadaires sur 13 semaines. */
export async function getRepos(repos, force) {
  const results = await Promise.all(repos.map(r => getRepo(r, force)));
  const weeks = Math.ceil(WINDOW_DAYS / 7);
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  const startMs = end.getTime() - (WINDOW_DAYS - 1) * DAY;
  const series = Array.from({ length: weeks }, (_, i) => ({
    from: iso(new Date(startMs + i * 7 * DAY)),
    count: 0,
  }));
  let recent = 0;
  results.forEach(({ data }) => data.commitDates.forEach(date => {
    const idx = Math.floor((new Date(date).getTime() - startMs) / (7 * DAY));
    if (idx >= 0 && idx < weeks) { series[idx].count++; recent++; }
  }));
  return {
    series,
    recent,
    totalCommits: results.reduce((n, r) => n + r.data.totalCommits, 0),
    branches: results.reduce((n, r) => n + r.data.branches, 0),
    contributors: results.reduce((n, r) => n + r.data.contributors, 0),
    at: Math.min(...results.map(r => r.at)),
    stale: results.some(r => r.stale),
  };
}
