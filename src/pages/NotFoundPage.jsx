import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import useMediaQuery, { DESKTOP_QUERY } from '../hooks/useMediaQuery';
import { EditorWindow, Prompt, TermLine } from '../components/ide/Ide';
import './NotFoundPage.css';

/* ─── Routes réelles du site (utilisées par le terminal et l'éditeur) ─── */
const ROUTES = [
  { path: '/', alias: ['home', 'accueil', '~'], note: 'accueil' },
  { path: '/portfolio', alias: ['portfolio', 'projets', 'work'], note: 'projets' },
  { path: '/#contact', alias: ['contact'], note: 'me contacter' },
];

const buildFiles = (pathname) => ({
  'not-found.jsx': {
    lang: 'js',
    errorLine: 9,
    lines: [
      '// not-found.jsx',
      'import { useLocation } from "react-router-dom";',
      'import { routes } from "./routes";',
      '',
      'export default function NotFound() {',
      '  const { pathname } = useLocation();',
      `  const requested = "${pathname}";`,
      '  if (!routes.includes(requested)) {',
      '    throw new Error("404: page introuvable");',
      '  }',
      '}',
    ],
  },
  'routes.js': {
    lang: 'js',
    errorLine: 0,
    lines: [
      '// routes.js : clique sur une route pour y aller',
      'export const routes = [',
      '  "/",            // accueil',
      '  "/portfolio",   // projets',
      '  "/#contact",    // me contacter',
      '];',
      '',
      `// "${pathname}" n'est pas dans routes`,
    ],
  },
  'README.md': {
    lang: 'md',
    errorLine: 0,
    lines: [
      '# 404 : page introuvable',
      '',
      "Cette adresse n'existe pas ou a été déplacée.",
      '',
      '## Que faire ?',
      '- taper `cd /` dans le terminal',
      '- ouvrir routes.js et cliquer sur une route',
      '- ou utiliser le menu en haut de la page',
    ],
  },
});

const LINKABLE = ROUTES.map(r => r.path);

/* ─── Terminal ─── */
const COMMANDS = ['help', 'ls', 'pwd', 'whoami', 'cd', 'open', 'cat', 'theme', 'date', 'echo', 'clear', 'exit'];

const Terminal = ({ pathname, navigate }) => {
  const [lines, setLines] = useState(() => [
    { k: 'cmd', t: `curl -I ${pathname}` },
    { k: 'err', parts: [{ t: 'HTTP/1.1 ', c: 'dim' }, { t: '404', c: 'err' }, { t: ' Not Found', c: 'err' }] },
    { k: 'out', t: 'Tape « help » ou clique sur une commande ci-dessous.' },
  ]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const resolve = useCallback((target) => {
    const t = (target || '').replace(/^\.?\//, '/').replace(/\/$/, '') || '/';
    return ROUTES.find(r => r.path === t || r.alias.includes(t.replace(/^\//, '')) || r.alias.includes(target));
  }, []);

  const go = useCallback((route) => {
    setLines(l => [...l, { k: 'out', t: `→ ${route.path}` }]);
    setTimeout(() => navigate(route.path), 350);
  }, [navigate]);

  const run = useCallback((raw) => {
    const input = raw.trim();
    const [cmd, ...args] = input.split(/\s+/);
    const out = (t, k = 'out') => ({ k, t });
    let res = [];

    switch (cmd) {
      case '': break;
      case 'help':
        res = [out('Commandes : ' + COMMANDS.join(', ')), out('Exemples : cd /  ·  open portfolio  ·  cat README.md')];
        break;
      case 'ls':
        res = [out('not-found.jsx   routes.js   README.md')];
        break;
      case 'pwd':
        res = [out(pathname)];
        break;
      case 'whoami':
        res = [out('Daniel NAGOLOUM TALLA · Développeur Full-Stack + IA', 'plain'), out('Alternance 24 mois dès septembre 2026')];
        break;
      case 'cd':
      case 'open': {
        const r = resolve(args[0] || '/');
        if (r) { go(r); } else { res = [out(`${cmd}: ${args[0] || ''}: aucune route de ce nom (essaie « ls » ou « help »)`, 'err')]; }
        break;
      }
      case 'cat': {
        const f = args[0];
        if (f === 'README.md') res = [out('404 : page introuvable. Tape « cd / » pour revenir à l\'accueil.')];
        else if (f === 'routes.js') res = ROUTES.map(r => out(`"${r.path}"  // ${r.note}`));
        else res = [out(`cat: ${f || ''}: fichier introuvable`, 'err')];
        break;
      }
      case 'theme': {
        const next = !document.body.classList.contains('dark-theme');
        document.body.classList.toggle('dark-theme', next);
        try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch { /* stockage indisponible */ }
        window.dispatchEvent(new Event('themechange'));
        res = [out(`thème ${next ? 'sombre' : 'clair'}`, 'ok')];
        break;
      }
      case 'date':
        res = [out(new Date().toLocaleString('fr-FR'))];
        break;
      case 'echo':
        res = [out(args.join(' '))];
        break;
      case 'clear':
        setLines([]);
        return;
      case 'exit':
        go(ROUTES[0]);
        break;
      case 'sudo':
        res = [out('Nice try : ici personne n\'est root.', 'err')];
        break;
      default:
        res = [out(`zsh: commande introuvable : ${cmd}`, 'err')];
    }
    setLines(l => [...l, { k: 'cmd', t: input }, ...res]);
  }, [go, pathname, resolve]);

  const submit = (e) => {
    e.preventDefault();
    if (value.trim()) setHistory(h => [value, ...h]);
    setHIndex(-1);
    if (!value.trim()) { setLines(l => [...l, { k: 'cmd', t: '' }]); } else { run(value); }
    setValue('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const n = Math.min(hIndex + 1, history.length - 1);
      if (n >= 0) { setHIndex(n); setValue(history[n]); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const n = hIndex - 1;
      setHIndex(n);
      setValue(n >= 0 ? history[n] : '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const m = COMMANDS.filter(c => c.startsWith(value));
      if (m.length === 1) setValue(m[0] + ' ');
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const quick = ['help', 'ls', 'whoami', 'cd /', 'open portfolio', 'theme'];

  return (
    <div className="ide-win ide-term" onClick={() => inputRef.current?.focus()}>
      <div className="ide-win__bar">
        <span className="ide-win__dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="ide-win__title">nagoloum@portfolio : ~</span>
      </div>

      <div className="ide-term__log" ref={logRef} role="log" aria-live="polite">
        {lines.map((l, i) => <TermLine key={i} line={l} />)}
        <form className="ide-term__form" onSubmit={submit}>
          <label htmlFor="nf-term-input"><Prompt /></label>
          <input
            id="nf-term-input"
            ref={inputRef}
            className="ide-term__input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Terminal : saisir une commande"
          />
        </form>
      </div>

      <div className="ide-term__quick" aria-label="Commandes rapides">
        {quick.map(c => (
          <button key={c} type="button" className="ide-chip" onClick={(e) => { e.stopPropagation(); run(c); }}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── Page ─── */
const NotFoundPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  usePageMeta({
    title: 'Page introuvable (404) - Daniel NAGOLOUM TALLA',
    description: "Cette page n'existe pas ou a été déplacée.",
    path: pathname,
    noindex: true,
  });

  return (
    <div className="nf">
      <section className="nf-hero" aria-labelledby="nf-title">
        <div className="nf-hero__stage" aria-hidden="true" />

        {/* Chiffres géants : pleins hors de la silhouette, en contour dessus */}
        <div className="nf-layer nf-layer--solid">
          <h1 className="nf-big" id="nf-title">
            <span className="nf-big__first">Erreur</span>
            <span className="nf-big__code">404</span>
            <span className="nf-big__tail">Page introuvable</span>
          </h1>
        </div>
        <div className="nf-layer nf-layer--outline" aria-hidden="true">
          <p className="nf-big">
            <span className="nf-big__first">Erreur</span>
            <span className="nf-big__code">404</span>
            <span className="nf-big__tail">Page introuvable</span>
          </p>
        </div>

        <div className="nf-hero__inner container">
          <div className="nf-hero__top">
            <p className="nf-hero__lead">
              L'adresse <code className="nf-path">{pathname}</code> n'existe pas ou a été déplacée.
            </p>
          </div>
          <div className="nf-hero__actions">
            <Link to="/" className="button button--flex">
              Retour à l'accueil <i className="uil uil-estate button__icon" />
            </Link>
            <Link to="/portfolio" className="button button--ghost button--flex">
              Voir mes projets <i className="uil uil-arrow-right button__icon" />
            </Link>
          </div>
        </div>
      </section>

      {isDesktop && (
      <section className="nf-ide container" aria-label="Éditeur et terminal">
        <EditorWindow files={buildFiles(pathname)} onRoute={(p) => navigate(p)} linkable={LINKABLE} statusLeft={<span className="ide-status__err">✕ 1 erreur</span>} />
        <Terminal pathname={pathname} navigate={navigate} />
      </section>
      )}
    </div>
  );
};

export default NotFoundPage;
