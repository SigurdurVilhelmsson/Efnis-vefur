/* eslint-disable */
/* Efnís UI kit — shared component scope.
   Components export to window for cross-file Babel scope. */

const { useState } = React;

// ── Inline icon helper ───────────────────────────────────────
function Icon({ name, size = 24, color }) {
  // Inline SVG paths — kept here so the kit is portable.
  const PATHS = {
    'cat-frettir': (
      <>
        <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" />
        <path d="M14 3v5h5" />
        <line x1="8" y1="12.5" x2="16" y2="12.5" />
        <line x1="8" y1="15.5" x2="16" y2="15.5" />
        <line x1="8" y1="18.5" x2="13" y2="18.5" />
      </>
    ),
    'cat-pistlar': (
      <>
        <circle cx="12" cy="12" r="9" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <path d="M12 3a13 13 0 0 1 0 18" />
        <path d="M12 3a13 13 0 0 0 0 18" />
      </>
    ),
    'cat-vidburdir': (
      <>
        <rect x="3" y="5" width="18" height="16" rx="1.5" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="3" x2="8" y2="7" />
        <line x1="16" y1="3" x2="16" y2="7" />
        <circle cx="12" cy="15.5" r="1.3" fill="currentColor" stroke="none" />
      </>
    ),
    'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
    'menu':        <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    'close':       <><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></>,
  };
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ color, display: 'block' }}
      aria-hidden="true"
    >
      {PATHS[name] || null}
    </svg>
  );
}

// ── Pill (status / category capsule) ─────────────────────────
function Pill({ tone = 'primary', children }) {
  const bg = tone === 'amber' ? '#f9ecd9' : '#e6f2ef';
  const fg = tone === 'amber' ? '#b06f1f' : '#0f4a3e';
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.2rem 0.65rem',
      borderRadius: 99,
      fontSize: '0.72rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
      background: bg,
      color: fg,
    }}>{children}</span>
  );
}

// ── Button ──────────────────────────────────────────────────
function Button({ variant = 'primary', as = 'button', onClick, children, style }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.7rem 1.5rem',
    borderRadius: 4,
    fontWeight: 600,
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background 150ms cubic-bezier(.2,.7,.2,1), color 150ms',
    ...style,
  };
  const variants = {
    primary: { background: '#1a6b5a', color: '#fff' },
    accent:  { background: '#d4872e', color: '#fff' },
    ghost:   { background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' },
    outline: { background: 'transparent', color: '#1a6b5a', border: '1.5px solid #1a6b5a' },
  };
  const Cmp = as;
  return (
    <Cmp
      onClick={onClick}
      href={as === 'a' ? '#' : undefined}
      style={{ ...base, ...variants[variant] }}
    >
      {children}
    </Cmp>
  );
}

Object.assign(window, { Icon, Pill, Button });
