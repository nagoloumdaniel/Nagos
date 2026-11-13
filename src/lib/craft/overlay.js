/* Calque visuel du crafting : curseurs, cadres de sélection, guides et particules.
   Un seul calque fixe pour tout le site ; un « monde » interne suit le défilement,
   ce qui évite toute barre de défilement parasite. */

let layer = null;
let world = null;
let canvas = null;
let ctx2d = null;
let raf = 0;
const jobs = new Set();

const syncWorld = () => {
  if (world) world.style.transform = `translate3d(${-window.scrollX}px, ${-window.scrollY}px, 0)`;
  if (jobs.size) markDirty();
};

const sizeCanvas = () => {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
  markDirty();
};

export const getWorld = () => {
  if (world) return world;
  layer = document.createElement('div');
  layer.className = 'craft-layer';
  layer.setAttribute('aria-hidden', 'true');
  canvas = document.createElement('canvas');
  canvas.className = 'craft-nano';
  ctx2d = canvas.getContext('2d');
  world = document.createElement('div');
  world.className = 'craft-world';
  layer.append(canvas, world);
  document.body.appendChild(layer);
  window.addEventListener('scroll', syncWorld, { passive: true });
  window.addEventListener('resize', sizeCanvas);
  sizeCanvas();
  syncWorld();
  return world;
};

/* ─── Particules « nanotech » ────────────────────────────────
   Le rendu ne dépend que de la progression p (0 → 1) : il se rejoue
   à l'identique dans les deux sens quand le scroll pilote la timeline. */

const rand = (seed) => {
  let s = seed >>> 0 || 1;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
};

export const addNano = ({ group, rect, from, color, seed = 1 }) => {
  const r = rand(seed * 9301 + 49297);
  const area = rect.w * rect.h;
  const count = Math.max(48, Math.min(240, Math.round(area / 900)));
  const step = Math.max(5, Math.sqrt(area / count));
  const cols = Math.max(1, Math.floor(rect.w / step));
  const rows = Math.max(1, Math.floor(rect.h / step));
  const parts = [];
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      if (parts.length >= count) break;
      const tx = rect.x + (i + 0.5) * (rect.w / cols);
      const ty = rect.y + (j + 0.5) * (rect.h / rows);
      // 60 % des particules sortent de la pointe du curseur, le reste converge de loin
      const fromCursor = r() < 0.6 && from;
      const ang = r() * Math.PI * 2;
      const dist = fromCursor ? r() * 36 : 80 + r() * 200;
      const ox = fromCursor ? from.x : tx;
      const oy = fromCursor ? from.y : ty;
      parts.push({
        sx: ox + Math.cos(ang) * dist,
        sy: oy + Math.sin(ang) * dist,
        tx, ty,
        d: ((i / cols) * 0.5 + (j / rows) * 0.5) * 0.45 + r() * 0.08,
        bend: (r() - 0.5) * 60,
      });
    }
  }
  const job = { p: 0, group, parts, color: color || '#171717', rect };
  jobs.add(job);
  return job;
};

export const removeNano = (job) => { jobs.delete(job); markDirty(); };

const draw = () => {
  raf = 0;
  if (!ctx2d) return;
  ctx2d.clearRect(0, 0, window.innerWidth, window.innerHeight);
  const sx = window.scrollX;
  const sy = window.scrollY;
  jobs.forEach((job) => {
    const { p } = job;
    if (p <= 0 || p >= 1) return;
    const ox = job.group.ox - sx;
    const oy = job.group.oy - sy;
    const fade = p > 0.82 ? 1 - (p - 0.82) / 0.18 : 1;
    ctx2d.fillStyle = job.color;
    for (let k = 0; k < job.parts.length; k += 1) {
      const q = job.parts[k];
      let t = (p - q.d) / 0.42;
      if (t <= 0) continue;
      if (t > 1) t = 1;
      const e = 1 - (1 - t) ** 3;
      const x = q.sx + (q.tx - q.sx) * e + Math.sin(e * Math.PI) * q.bend + ox;
      const y = q.sy + (q.ty - q.sy) * e + oy;
      ctx2d.globalAlpha = (t < 1 ? 0.9 : 0.55) * fade;
      ctx2d.fillRect(x - 0.9, y - 0.9, 1.8, 1.8);
    }
    // Ligne de balayage qui « imprime » le composant
    if (p > 0.35 && p < 0.95) {
      const s = (p - 0.35) / 0.6;
      ctx2d.globalAlpha = 0.7 * fade;
      ctx2d.fillRect(job.rect.x + ox, job.rect.y + oy + job.rect.h * s, job.rect.w, 1);
    }
  });
  ctx2d.globalAlpha = 1;
};

export function markDirty() {
  if (!raf) raf = requestAnimationFrame(draw);
}
