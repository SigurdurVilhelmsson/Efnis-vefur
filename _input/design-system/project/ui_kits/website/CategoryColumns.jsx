/* eslint-disable */
function PostList({ items }) {
  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0, margin: 0 }}>
      {items.map((p, i) => (
        <li key={i}>
          <a href="#" onClick={(e)=>e.preventDefault()}
             style={{
               display: 'block', padding: '0.6rem 0.85rem',
               background: '#f3efe6', borderRadius: 4,
               fontSize: '0.85rem', color: '#1c2a26',
               textDecoration: 'none',
             }}>
            {p.title} <span style={{ fontSize: '0.75rem', color: '#8a9b96' }}>{p.date}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function CategoryColumns() {
  const cols = [
    { icon: 'cat-frettir',   tone: 'primary', title: 'Fréttir af Efnís', sub: 'Tilkynningar og fréttir úr starfi félagsins.', items: [
      { title: 'Carbfix hlýtur alþjóðlega viðurkenningu fyrir CO₂-bindingu', date: '12. apr 2026' },
      { title: 'Aðalfundur Efnís 15. maí — dagskrá tilbúin',                  date: '8. apr 2026' },
      { title: 'Nýir félagar velkomnir — skráning opin',                       date: '1. apr 2026' },
    ]},
    { icon: 'cat-pistlar',   tone: 'accent',  title: 'Fréttapistlar', sub: 'Greinar og pistlar um efnafræði heima og erlendis.', items: [
      { title: 'Hvers vegna er PFAS-umræðan svona flókin?',         date: '10. apr 2026' },
      { title: 'Ný rannsókn: lífrænn áburður vs. tilbúinn',          date: '2. apr 2026' },
      { title: 'Vetni sem eldsneyti — hvar stendur Ísland?',         date: '22. mar 2026' },
    ]},
    { icon: 'cat-vidburdir', tone: 'primary', title: 'Viðburðir', sub: 'Ráðstefnur, fyrirlestrar og námskeið.', items: [
      { title: 'EFNÍS Conference 2026 — skráning opin',  date: 'Okt 2026' },
      { title: 'Kvöldfyrirlestur: Efnafræði matvæla',    date: '29. apr 2026' },
      { title: 'Efnafræðikeppni framhaldsskólanna',      date: 'Maí 2026' },
    ]},
  ];
  return (
    <section style={{ padding: '4rem 2rem' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.75rem', color: '#0f4a3e', margin: '0 0 0.5rem', fontWeight: 700 }}>Nýjast frá Efnís</h2>
          <p style={{ color: '#5a6b66', maxWidth: 560, margin: '0 auto' }}>Fylgstu með starfi félagsins, efnafræðifréttum og komandi viðburðum.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {cols.map((c, i) => {
            const isAccent = c.tone === 'accent';
            return (
              <div key={i}>
                <div style={{
                  width: 56, height: 56, padding: 12, borderRadius: 6,
                  background: isAccent ? '#f9ecd9' : '#e6f2ef',
                  color: isAccent ? '#b06f1f' : '#0f4a3e',
                  marginBottom: '0.75rem',
                }}>
                  <Icon name={c.icon} size={32} />
                </div>
                <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.1rem', color: '#0f4a3e', margin: '0 0 0.4rem', fontWeight: 600 }}>{c.title}</h3>
                <p style={{ fontSize: '0.88rem', color: '#5a6b66', margin: '0 0 1rem' }}>{c.sub}</p>
                <PostList items={c.items} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { PostList, CategoryColumns });
