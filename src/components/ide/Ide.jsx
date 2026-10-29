import React, { useEffect, useRef, useState } from 'react';
import useMediaQuery, { DESKTOP_QUERY } from '../../hooks/useMediaQuery';
import './Ide.css';

/* ─── Coloration syntaxique (palette « Dark+ » d'un vrai éditeur) ─── */
const CONTROL = /^(import|from|export|default|return|if|else|throw|await|async)$/;
const DECL = /^(const|let|var|function|type|interface|new|class)$/;
const LITERAL = /^(true|false|null|undefined)$/;
const BUILTIN_TYPE = /^(string|number|boolean|void|any|unknown|never)$/;
const TOKEN = /(\/\/.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`|[A-Za-z_$][\w$]*|\d+(?:\.\d+)?|\s+|[^\sA-Za-z_$\d]+)/g;

const nextSolid = (parts, i) => { for (let j = i + 1; j < parts.length; j++) if (!/^\s+$/.test(parts[j])) return parts[j]; return ''; };
const prevSolid = (parts, i) => { for (let j = i - 1; j >= 0; j--) if (!/^\s+$/.test(parts[j])) return parts[j]; return ''; };

const highlightMarkdown = (line) => {
  if (/^#{1,6}\s/.test(line)) return <span className="tk-head">{line}</span>;
  const bullet = line.match(/^(\s*-\s)(.*)$/);
  const body = bullet ? bullet[2] : line;
  const pieces = body.split(/(`[^`]*`)/g).map((p, i) =>
    /^`/.test(p) ? <span key={i} className="tk-str">{p}</span> : <span key={i}>{p}</span>);
  return <>{bullet && <span className="tk-pun">{bullet[1]}</span>}{pieces}</>;
};

const highlight = (line, lang, onRoute, linkable = []) => {
  if (lang === 'md') return highlightMarkdown(line);
  const parts = line.match(TOKEN) || [];
  return parts.map((t, i) => {
    if (/^\/\//.test(t)) return <span key={i} className="tk-com">{t}</span>;
    if (/^["'`]/.test(t)) {
      const inner = t.slice(1, -1);
      if (onRoute && linkable.includes(inner)) {
        return (
          <button key={i} type="button" className="tk-str tk-link" onClick={() => onRoute(inner)} title={`Ouvrir ${inner}`}>
            {t}
          </button>
        );
      }
      const isKey = lang === 'json' && nextSolid(parts, i) === ':';
      return <span key={i} className={isKey ? 'tk-prop' : 'tk-str'}>{t}</span>;
    }
    if (/^\d/.test(t)) return <span key={i} className="tk-num">{t}</span>;
    if (/^[A-Za-z_$]/.test(t)) {
      if (CONTROL.test(t)) return <span key={i} className="tk-ctl">{t}</span>;
      if (DECL.test(t) || LITERAL.test(t) || BUILTIN_TYPE.test(t)) return <span key={i} className="tk-kw">{t}</span>;
      const next = nextSolid(parts, i);
      const prev = prevSolid(parts, i);
      if (next.startsWith('(')) return <span key={i} className="tk-fn">{t}</span>;
      if (prev.endsWith('.')) return <span key={i} className="tk-prop">{t}</span>;
      if (next === ':' ) return <span key={i} className="tk-prop">{t}</span>;
      if (/^[A-Z]/.test(t)) return <span key={i} className="tk-type">{t}</span>;
      return <span key={i} className="tk-var">{t}</span>;
    }
    return <span key={i} className="tk-pun">{t}</span>;
  });
};

const AUTO_BUFFER = 40;   // lignes rendues au-dessus / au-dessous de la zone visible
const AUTO_VISIBLE = 40;  // lignes visibles au maximum (fenêtre ≈ 34 rem)

/* ─── Fenêtre : barre + points carrés ─── */
const Dots = () => <span className="ide-win__dots" aria-hidden="true"><i /><i /><i /></span>;

/* ─── Éditeur de code (onglets, lignes cliquables, barre d'état) ─── */
const EditorWindowImpl = ({ files, onRoute, linkable, label = 'Fichiers', className = '', statusLeft, autoScroll = false }) => {
  const names = Object.keys(files);
  const [active, setActive] = useState(names[0]);
  const [cursor, setCursor] = useState({ ln: files[names[0]].errorLine || 1, col: 1 });
  const file = files[active];
  const autoRef = useRef(null);
  const [startLine, setStartLine] = useState(0);
  const lhRef = useRef(19);
  const startRef = useRef(0);

  /* Va-et-vient automatique (≈ 30 px/s) ; rien si l'utilisateur réduit les animations.
     Seules les lignes proches de la fenêtre visible sont dans le DOM (hauteur de ligne fixe). */
  useEffect(() => {
    const el = autoRef.current;
    if (!autoScroll || !el) return undefined;
    const firstLine = el.querySelector('.ide-line');
    if (firstLine) lhRef.current = firstLine.getBoundingClientRect().height || 19;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf; let last = performance.now(); let dir = 1; let pos = 0;
    const tick = (now) => {
      const lh = lhRef.current;
      const max = el.scrollHeight - el.clientHeight;
      pos += dir * ((now - last) / 1000) * (Number(el.dataset.autoSpeed) || 30);
      if (pos >= max) { pos = max; dir = -1; } else if (pos <= 0) { pos = 0; dir = 1; }
      el.scrollTop = pos;
      const first = Math.max(0, Math.floor(pos / lh) - AUTO_BUFFER);
      if (Math.abs(first - startRef.current) >= AUTO_BUFFER / 2) { startRef.current = first; setStartLine(first); }
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoScroll, active]);

  const select = (name) => {
    setActive(name);
    setCursor({ ln: files[name].errorLine || 1, col: 1 });
  };
  const onKeyTabs = (e) => {
    const i = names.indexOf(active);
    if (e.key === 'ArrowRight') select(names[(i + 1) % names.length]);
    if (e.key === 'ArrowLeft') select(names[(i - 1 + names.length) % names.length]);
  };
  const langName = { js: 'JavaScript React', ts: 'TypeScript', json: 'JSON', md: 'Markdown' }[file.lang] || file.lang;

  return (
    <div className={`ide-win ide-editor ${className}`}>
      <div className="ide-win__bar">
        <Dots />
        <div className="ide-tabs" role="tablist" aria-label={label} onKeyDown={onKeyTabs}>
          {names.map((n) => (
            <button
              key={n}
              type="button"
              role="tab"
              aria-selected={active === n}
              tabIndex={active === n ? 0 : -1}
              className={`ide-tab${active === n ? ' is-active' : ''}`}
              onClick={() => select(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {autoScroll ? (
        /* Défilement automatique et lent : jusqu'en bas, puis retour vers le haut, en boucle */
        <div className="ide-code ide-code--auto" role="tabpanel" aria-label={active} ref={autoRef}>
          {(() => {
            const lh = lhRef.current;
            const end = Math.min(file.lines.length, startLine + AUTO_BUFFER * 2 + AUTO_VISIBLE);
            return (
              <>
                <div style={{ height: startLine * lh }} />
                {file.lines.slice(startLine, end).map((line, k) => (
                  <div key={startLine + k} className="ide-line">
                    <span className="ide-line__no">{startLine + k + 1}</span>
                    <code className="ide-line__txt">{highlight(line, file.lang)}</code>
                  </div>
                ))}
                <div style={{ height: (file.lines.length - end) * lh }} />
              </>
            );
          })()}
        </div>
      ) : (
      <div className="ide-code" role="tabpanel" aria-label={active}>
        {file.lines.map((line, i) => {
          const ln = i + 1;
          const isErr = file.errorLine === ln;
          const isCur = cursor.ln === ln;
          return (
            <div
              key={ln}
              className={`ide-line${isErr ? ' is-error' : ''}${isCur ? ' is-current' : ''}`}
              onClick={() => setCursor({ ln, col: line.length + 1 })}
            >
              <span className="ide-line__no">{ln}</span>
              <code className="ide-line__txt">
                {highlight(line, file.lang, onRoute, linkable)}
                {isCur && <span className="ide-caret" aria-hidden="true" />}
              </code>
            </div>
          );
        })}
      </div>
      )}

      <div className="ide-win__status">
        {statusLeft}
        <span>Ln {cursor.ln}, Col {cursor.col}</span>
        <span className="ide-status__lang">{langName}</span>
      </div>
    </div>
  );
};

/* ─── Terminal : invite colorée, commande colorée ─── */
const colorizeCmd = (text) =>
  text.split(/(\s+)/).map((w, i) => {
    if (/^\s+$/.test(w) || w === '') return w;
    if (i === 0) return <span key={i} className="tk-fn">{w}</span>;
    if (/^-{1,2}[\w-]/.test(w)) return <span key={i} className="tk-str">{w}</span>;
    if (/^["'].*["']$/.test(w)) return <span key={i} className="tk-str">{w}</span>;
    if (/\/|\.(jsx?|tsx?|md|json)$/.test(w)) return <span key={i} className="tk-path">{w}</span>;
    return <span key={i}>{w}</span>;
  });

export const Prompt = () => (
  <span className="ide-ps" aria-hidden="true">
    <span className="ps-user">nagoloum@portfolio</span><span className="ps-sep">:</span><span className="ps-path">~</span><span className="ps-dollar">$</span>
  </span>
);

/* line = { k: 'cmd' | 'out' | 'err' | 'ok' | 'plain', t?: string, parts?: [{ t, c }] } */
export const TermLine = ({ line }) => (
  <div className={`ide-term__line ide-term__line--${line.k}`}>
    {line.k === 'cmd' && <Prompt />}
    <span>
      {line.parts
        ? line.parts.map((p, i) => <span key={i} className={p.c ? `tk-${p.c}` : undefined}>{p.t}</span>)
        : line.k === 'cmd' ? colorizeCmd(line.t) : line.t}
    </span>
  </div>
);

/* ─── Terminal « film » : tape les commandes quand il entre à l'écran ─── */
const TerminalWindowImpl = ({ title = 'nagoloum@portfolio : ~', lines, className = '' }) => {
  const ref = useRef(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [shown, setShown] = useState(reduced ? lines.length : 0);
  const [typed, setTyped] = useState('');
  const started = useRef(false);

  useEffect(() => {
    if (reduced) return undefined;
    let cancelled = false;
    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    const play = async () => {
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        const l = lines[i];
        if (l.k === 'cmd') {
          for (let c = 1; c <= l.t.length; c++) {
            if (cancelled) return;
            setTyped(l.t.slice(0, c));
            await wait(24);
          }
          await wait(180);
        } else {
          await wait(120);
        }
        setTyped('');
        setShown(i + 1);
      }
    };
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) { started.current = true; play(); }
    }, { threshold: 0.35 });
    if (el) io.observe(el);
    return () => { cancelled = true; io.disconnect(); };
  }, [lines, reduced]);

  const typing = shown < lines.length && lines[shown]?.k === 'cmd' && typed;

  return (
    <div className={`ide-win ide-term ${className}`} ref={ref}>
      <div className="ide-win__bar">
        <Dots />
        <span className="ide-win__title">{title}</span>
      </div>
      <div className="ide-term__log" role="img" aria-label={`Terminal : ${lines.filter(l => l.k === 'cmd').map(l => l.t).join(' ; ')}`}>
        {lines.slice(0, shown).map((l, i) => <TermLine key={i} line={l} />)}
        {typing && (
          <div className="ide-term__line ide-term__line--cmd">
            <Prompt /><span>{colorizeCmd(typed)}</span><span className="ide-caret" />
          </div>
        )}
        {!typing && <div className="ide-term__line"><Prompt /><span className="ide-caret" /></div>}
      </div>
    </div>
  );
};

/* Éditeurs et terminaux : grands écrans uniquement (rien n'est rendu sur mobile / tablette) */
const useIdeEnabled = () => useMediaQuery(DESKTOP_QUERY);
export const EditorWindow = (props) => (useIdeEnabled() ? <EditorWindowImpl {...props} /> : null);
export const TerminalWindow = (props) => (useIdeEnabled() ? <TerminalWindowImpl {...props} /> : null);
