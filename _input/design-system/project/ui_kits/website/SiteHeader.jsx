/* eslint-disable */
// Inline logo — full carbonate mark + wordmark lockup.
function EfnisMark({ size = 32, reversed = false }) {
  const bond  = reversed ? '#f3efe6' : '#0f4a3e';
  const node  = reversed ? '#f3efe6' : '#1a6b5a';
  return (
    <svg width={size * (124/128)} height={size}
         viewBox="0 0 124 128" xmlns="http://www.w3.org/2000/svg"
         role="img" aria-label="Efnís">
      <line x1="62" y1="64" x2="62"    y2="22" stroke={bond} strokeWidth="6" strokeLinecap="round"/>
      <line x1="62" y1="64" x2="98.37" y2="85" stroke={bond} strokeWidth="6" strokeLinecap="round"/>
      <line x1="62" y1="64" x2="25.63" y2="85" stroke={bond} strokeWidth="6" strokeLinecap="round"/>
      <circle cx="62"    cy="22" r="12" fill={node} />
      <circle cx="98.37" cy="85" r="12" fill={node} />
      <circle cx="25.63" cy="85" r="12" fill={node} />
      <circle cx="62"    cy="64" r="14" fill="#d4872e" />
    </svg>
  );
}

function SiteHeader({ current = 'home', onNav }) {
  const link = (id, label) => (
    <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav(id);}}
       style={{
         color: current === id ? '#1a6b5a' : '#5a6b66',
         fontWeight: 500, fontSize: '0.9rem',
         textDecoration: 'none',
       }}>{label}</a>
  );
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(251,251,249,0.92)', backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e3ddd0',
      padding: '0 2rem',
    }}>
      <div style={{
        maxWidth: 1120, margin: '0 auto', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav('home');}}
           style={{
             display: 'flex', alignItems: 'center', gap: '0.6rem',
             textDecoration: 'none',
           }}>
          <EfnisMark size={36} />
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontWeight: 700, fontSize: '1.05rem',
              color: '#0f4a3e', letterSpacing: '-0.01em',
            }}>Efnafræðifélag Íslands</span>
            <span style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 500, fontSize: '0.65rem',
              color: '#8a9b96', letterSpacing: '0.12em', textTransform: 'uppercase',
              marginTop: 2,
            }}>The Icelandic Chemical Society</span>
          </span>
        </a>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {link('home', 'Forsíða')}
          {link('rules', 'Þumalputtareglur')}
          {link('conf', 'Ráðstefnur')}
          {link('news', 'Fréttir')}
          <a href="#" onClick={(e)=>e.preventDefault()}
             style={{
               background: '#1a6b5a', color: '#fff',
               padding: '0.45rem 1.1rem', borderRadius: 4,
               fontWeight: 600, fontSize: '0.85rem',
               textDecoration: 'none',
             }}>Gerast félagi</a>
        </div>
      </div>
    </nav>
  );
}

Object.assign(window, { SiteHeader, EfnisMark });
