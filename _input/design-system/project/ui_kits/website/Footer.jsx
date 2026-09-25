/* eslint-disable */
function CtaBand() {
  return (
    <section style={{
      background: 'linear-gradient(160deg, #1a6b5a 0%, #0f4a3e 100%)',
      color: '#fff', textAlign: 'center', padding: '3.5rem 2rem',
    }}>
      <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.5rem', margin: '0 0 0.75rem', fontWeight: 700 }}>Gerstu félagi í Efnís</h2>
      <p style={{ opacity: 0.85, maxWidth: 500, margin: '0 auto 1.5rem' }}>
        Opið öllum sem hafa áhuga á efnafræði — nemendum, kennurum, rannsakendum og sérfræðingum úr iðnaði.
      </p>
      <Button variant="accent" as="a">Gerast félagi — 5.000 kr/ár</Button>
    </section>
  );
}

function SiteFooter({ onNav }) {
  const link = (id, label) => (
    <a href="#" onClick={(e)=>{e.preventDefault(); onNav && onNav(id);}}
       style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{label}</a>
  );
  const ext = (href, label) => (
    <a href={href} target="_blank" rel="noreferrer"
       style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>{label}</a>
  );
  return (
    <footer style={{
      background: '#1c2a26', color: 'rgba(243,239,230,0.7)',
      padding: '3rem 2rem 2rem', fontSize: '0.85rem',
    }}>
      <div style={{
        maxWidth: 1120, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '2rem',
      }}>
        <div>
          <h4 style={{ color: '#fff', fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '0.95rem', margin: '0 0 0.75rem', fontWeight: 700 }}>Efnafræðifélag Íslands</h4>
          <p style={{ margin: '0 0 0.5rem' }}>Stofnað 1999. Félag efnafræðinga, kennara, nemenda og áhugafólks um efnafræði á Íslandi.</p>
          <p style={{ margin: 0 }}>efnis@efn.is</p>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '0.95rem', margin: '0 0 0.75rem', fontWeight: 700 }}>Flýtileiðir</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <li>{link('home', 'Forsíða')}</li>
            <li>{link('rules', 'Þumalputtareglur')}</li>
            <li>{link('conf', 'Ráðstefnur')}</li>
            <li>{link('news', 'Fréttir')}</li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '0.95rem', margin: '0 0 0.75rem', fontWeight: 700 }}>Námsefni</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <li>{ext('https://namsbokasafn.is', 'Námsbókasafn')}</li>
            <li>{ext('#', 'Bókagjafir Efnís')}</li>
            <li>{ext('#', 'Orðaskrá')}</li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '0.95rem', margin: '0 0 0.75rem', fontWeight: 700 }}>Tengiliðir</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <li>{ext('#', 'Stjórn félagsins')}</li>
            <li>{ext('#', 'Hafðu samband')}</li>
            <li>{ext('#', 'Gerast félagi')}</li>
          </ul>
        </div>
      </div>
      <div style={{
        maxWidth: 1120, margin: '2rem auto 0', paddingTop: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
        fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)',
      }}>
        <span>© 2026 Efnafræðifélag Íslands</span>
        <span>Indígó &amp; Kopar litapalletta</span>
      </div>
    </footer>
  );
}
Object.assign(window, { CtaBand, SiteFooter });
