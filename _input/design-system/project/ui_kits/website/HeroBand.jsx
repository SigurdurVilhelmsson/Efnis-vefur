/* eslint-disable */
function HeroBand({ onCta }) {
  return (
    <section style={{
      background: 'linear-gradient(160deg, #1a6b5a 0%, #0f4a3e 100%)',
      color: '#fff',
      padding: '5rem 2rem 4.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* decorative ring — the only allowed decorative geometry */}
      <div style={{
        position: 'absolute', top: -60, right: -80,
        width: 400, height: 400, borderRadius: '50%',
        border: '40px solid rgba(255,255,255,0.04)',
        pointerEvents: 'none',
      }}/>
      <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: '0.8rem', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)', marginBottom: '1rem',
        }}>Efnafræðifélag Íslands</div>
        <h1 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700, lineHeight: 1.15, margin: '0 0 1rem',
          maxWidth: 640, letterSpacing: '-0.01em',
        }}>Efnafræði á Íslandi — í heild sinni</h1>
        <p style={{
          fontSize: '1.1rem', opacity: 0.85,
          maxWidth: 540, margin: '0 0 2rem', lineHeight: 1.6,
        }}>Miðstöð efnafræði fyrir nemendur, kennara, rannsakendur og iðnað. Stofnað 1999.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="accent" onClick={onCta}>Gerast félagi — 5.000 kr/ár</Button>
          <Button variant="ghost" onClick={onCta}>Þumalputtareglur ↓</Button>
        </div>
      </div>
    </section>
  );
}
window.HeroBand = HeroBand;
