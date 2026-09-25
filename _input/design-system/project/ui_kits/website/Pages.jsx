/* eslint-disable */
function PageHero({ crumbs, title, meta }) {
  return (
    <section style={{
      background: 'linear-gradient(160deg, #1a6b5a 0%, #0f4a3e 100%)',
      color: '#fff', padding: '3.5rem 2rem 3rem',
    }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && ' / '}
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>{c}</span>
            </React.Fragment>
          ))}
        </div>
        <h1 style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: '2.25rem', margin: '0 0 0.5rem', fontWeight: 700, letterSpacing: '-0.01em',
        }}>{title}</h1>
        {meta && <p style={{ fontSize: '0.95rem', opacity: 0.75, margin: 0 }}>{meta}</p>}
      </div>
    </section>
  );
}

function ConferencePage() {
  const sched = [
    { time: '09:00', talk: 'Skráning og morgunverður' },
    { time: '09:30', talk: 'Opening remarks', speaker: 'Formaður Efnís' },
    { time: '10:00', talk: 'Keynote: Mineral carbonation at scale', speaker: 'Dr. Sandra Ó. Snæbjörnsdóttir' },
    { time: '11:00', talk: 'Session A: Green chemistry approaches', speaker: '3 erindi, 20 mín. hvert' },
    { time: '12:30', talk: 'Hádegisverður og veggspjöld' },
    { time: '14:00', talk: 'Session B: Water chemistry & geothermal', speaker: '4 erindi' },
    { time: '16:00', talk: 'Poster session & networking' },
    { time: '19:00', talk: 'Ráðstefnukvöldverður', speaker: 'Hótel Borg' },
  ];
  return (
    <>
      <PageHero
        crumbs={['Forsíða', 'Ráðstefnur', 'EFNÍS Conference 2026']}
        title="EFNÍS Conference 2026"
        meta="Chemistry and the Environment — 17.–18. október 2026, Háskóli Íslands"
      />
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
          <div>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.3rem', color: '#0f4a3e', margin: '0 0 0.75rem', fontWeight: 700 }}>Um ráðstefnuna</h2>
            <p style={{ color: '#5a6b66', margin: '0 0 1rem' }}>
              Árlega ráðstefna Efnafræðifélags Íslands safnar saman rannsakendum, nemendum og sérfræðingum úr iðnaði til tveggja daga fyrirlestra og umræðna. Þema ráðstefnunnar 2026 er <strong>Chemistry and the Environment</strong> — hvernig efnafræði getur ráðist gegn umhverfisvandamálum, frá loftslagsmálum til vatnsverndar.
            </p>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.3rem', color: '#0f4a3e', margin: '2rem 0 0.75rem', fontWeight: 700 }}>Lykilfyrirlesarar</h2>
            <ul style={{ color: '#5a6b66', paddingLeft: '1.25rem', margin: '0 0 1rem' }}>
              <li><strong>Dr. Sandra Ó. Snæbjörnsdóttir</strong> — Carbfix, CarbonMineral</li>
              <li><strong>Prof. Guðmundur Þóroddsson</strong> — Háskóli Íslands, lífefnafræði</li>
              <li><strong>Dr. Elin M. Jónsdóttir</strong> — Matís, matvælaefnafræði</li>
            </ul>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.3rem', color: '#0f4a3e', margin: '2rem 0 0.75rem', fontWeight: 700 }}>Dagskrá — dag 1 (17. október)</h2>
            <div>
              {sched.map((s, i) => (
                <div key={i} style={{
                  padding: '0.85rem 0',
                  borderBottom: i < sched.length - 1 ? '1px solid #e3ddd0' : 'none',
                  display: 'flex', gap: '1rem',
                }}>
                  <div style={{ fontWeight: 600, color: '#1a6b5a', minWidth: 60, fontSize: '0.85rem' }}>{s.time}</div>
                  <div>
                    <div style={{ fontSize: '0.88rem', color: '#1c2a26' }}>{s.talk}</div>
                    {s.speaker && <div style={{ fontSize: '0.78rem', color: '#8a9b96' }}>{s.speaker}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ background: '#f3efe6', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1rem', color: '#0f4a3e', margin: '0 0 0.75rem', fontWeight: 700 }}>Upplýsingar</h3>
              {[
                ['Dagsetning', '17.–18. okt 2026'],
                ['Staður', 'Háskólatorg, HÍ'],
                ['Tungumál', 'Enska / íslenska'],
                ['Verð', '8.000 kr (félagar: 5.000 kr)'],
                ['Nemendur', 'Ókeypis'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.88rem', color: '#5a6b66' }}>
                  <strong style={{ color: '#1c2a26', minWidth: 80 }}>{k}</strong>{v}
                </div>
              ))}
              <div style={{ marginTop: '1rem' }}>
                <Button variant="accent" as="a" style={{ width: '100%', justifyContent: 'center' }}>Skrá mig</Button>
              </div>
            </div>
            <div style={{ background: '#f3efe6', borderRadius: 12, padding: '1.5rem' }}>
              <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1rem', color: '#0f4a3e', margin: '0 0 0.75rem', fontWeight: 700 }}>Fyrri ráðstefnur</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.88rem' }}>
                <li><a href="#" onClick={(e)=>e.preventDefault()} style={{color:'#1a6b5a',textDecoration:'none'}}>EFNÍS Conference 2024</a></li>
                <li><a href="#" onClick={(e)=>e.preventDefault()} style={{color:'#1a6b5a',textDecoration:'none'}}>EFNÍS Conference 2022</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ArticlePage() {
  return (
    <>
      <PageHero
        crumbs={['Forsíða', 'Fréttir']}
        title="Carbfix hlýtur alþjóðlega viðurkenningu fyrir CO₂-bindingu"
        meta="Fréttir af Efnís · 12. apríl 2026"
      />
      <article style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: '#e6f2ef', color: '#1a6b5a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '1rem',
          }}>SV</div>
          <div style={{ fontSize: '0.88rem' }}>
            <div style={{ fontWeight: 600, color: '#1c2a26' }}>Siggi Vilhelmsson</div>
            <div style={{ color: '#8a9b96', fontSize: '0.82rem' }}>12. apríl 2026 · 4 mín. lestur</div>
          </div>
          <Pill>Fréttir</Pill>
        </div>
        <p style={{ color: '#5a6b66', margin: '0 0 1.25rem' }}>
          Carbfix-verkefnið, sem bindur koltvísýring í basaltberg á Hellisheiði, hefur hlotið alþjóðlega viðurkenningu frá Global CCS Institute fyrir framlag sitt til loftslagsverknautar.
        </p>
        <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.3rem', color: '#0f4a3e', margin: '2rem 0 0.75rem', fontWeight: 700 }}>Hvað er Carbfix?</h2>
        <p style={{ color: '#5a6b66', margin: '0 0 1.25rem' }}>
          Carbfix er tæknilausn sem fangar CO₂ úr andrúmslofti eða iðnaðarlosun, leysir það í vatni og dælir lausninni í basaltberg. Efnahvarfið umbreytir koltvísýringnum í steinefni á aðeins tveimur árum.
        </p>
        <blockquote style={{
          borderLeft: '3px solid #d4872e', padding: '1rem 1.5rem',
          background: '#f9ecd9', borderRadius: '0 6px 6px 0',
          margin: '1.5rem 0', fontStyle: 'italic', color: '#1c2a26',
        }}>
          „Þetta er ekki aðeins tæknilausn — þetta er efnafræði í verki. Sama grundvallarreglan sem við kennum í efnafræði 101 er undirstaðan."
          <div style={{ fontStyle: 'normal', fontSize: '0.85rem', color: '#8a9b96', marginTop: '0.5rem' }}>— Dr. Sandra Ó. Snæbjörnsdóttir</div>
        </blockquote>
        <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.3rem', color: '#0f4a3e', margin: '2rem 0 0.75rem', fontWeight: 700 }}>Efnafræðin á bakvið ferlið</h2>
        <p style={{ color: '#5a6b66', margin: '0 0 1.25rem' }}>
          Kjarni Carbfix-tækninnar er leysing CO₂ í vatni (myndun kolsýru, H₂CO₃) og efnahvörf við kalsíum- og magnesíumjónir í basaltberginu. Niðurstaðan eru karbónatsteinefni sem eru stöðug í milljónir ára.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e3ddd0' }}>
          <Pill>Loftslagsmál</Pill>
          <Pill tone="amber">Jarðefnafræði</Pill>
          <Pill>Carbfix</Pill>
          <Pill tone="amber">Rannsóknir</Pill>
        </div>
      </article>
    </>
  );
}

function RulesPage() {
  return (
    <>
      <PageHero
        crumbs={['Forsíða', 'Þumalputtareglur']}
        title="Þumalputtareglur um efnafræði"
        meta="Fimmtán reglur til að ræða efnafræði af skynsemi og nákvæmni — án hræðslu eða oftrúar."
      />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 2rem' }}>
        {RULES_DATA.slice(0, 6).map((r, i) => {
          const accent = i % 2 === 1;
          const color = accent ? '#d4872e' : '#1a6b5a';
          return (
            <section key={r.n} style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '2rem', fontWeight: 700, color, lineHeight: 1 }}>{r.n}</span>
                <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '1.4rem', color: '#0f4a3e', margin: 0, fontWeight: 700 }}>{r.t}</h2>
              </div>
              <p style={{ color: '#5a6b66', margin: 0, lineHeight: 1.65 }}>{r.d}</p>
            </section>
          );
        })}
        <p style={{ color: '#8a9b96', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem' }}>
          ↓ Reglur 7–15 birtast einnig í fullri lengd ↓
        </p>
      </div>
    </>
  );
}

Object.assign(window, { PageHero, ConferencePage, ArticlePage, RulesPage });
