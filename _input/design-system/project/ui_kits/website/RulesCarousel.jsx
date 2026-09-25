/* eslint-disable */
const RULES_DATA = [
  { n: '01', t: 'Náttúrulegt ≠ öruggt',         d: 'Eiginleikar efnis ráðast af byggingu sameindarinnar, ekki uppruna hennar.' },
  { n: '02', t: 'Skammturinn ræður',             d: 'Paracelsus: „Skammturinn skilur á milli eiturs og lyfs." Vatn getur líka verið banvænt.' },
  { n: '03', t: 'E-númer eru gæðastimpill',      d: 'E-númer þýðir að efnið hefur verið rannsakað og samþykkt til neyslu.' },
  { n: '04', t: '„Þungmálmur" er óljóst',        d: 'Nefndu efnið: blý, kadmíum, kvikasilfur — ekki „þungmálma".' },
  { n: '05', t: 'Geislun ≠ geislavirkni',        d: 'Geislavirk efni gefa frá sér jónandi geislun. Þetta er ekki sama hugtakið.' },
  { n: '06', t: 'CO₂ er alltaf CO₂',             d: 'Sama sameindin hvort sem uppruninn er jarðefna eða endurnýjanlegur.' },
  { n: '07', t: 'Lífrænt ≠ lífrænt',             d: 'Lífræn efnafræði rannsakar kolefnissambönd. Lífrænn matur er búskaparaðferð.' },
  { n: '08', t: 'Jarðhitavatn er vatn',          d: 'H₂O með uppleystum söltum og steinefnum. Ekkert dulrænt í gangi.' },
  { n: '09', t: 'Klór er mörg efni',             d: 'Sundlaugarklór er natríumhýpóklórít í lágum styrk. NaCl er líka klór.' },
  { n: '10', t: 'Allt er efni',                  d: 'Vatn, súrefni, DNA — allt er efni. Hættan felst í styrk og útsetningu.' },
  { n: '11', t: 'pH er logaritmískur',           d: 'pH 3 er 10× súrra en pH 4. Skiptir máli fyrir umræðu um súrnun sjávar.' },
  { n: '12', t: 'Súrt regn ≠ náttúrulega súrt',  d: 'Hreint regn er pH ~5,6. Súrt regn frá SO₂/NOₓ er mun súrra.' },
  { n: '13', t: 'Vetni er bara vetni',           d: 'H₂ er alltaf H₂. Munurinn á gráu, bláu, grænu er framleiðsluferlið.' },
  { n: '14', t: 'Áburður = lífsnauðsyn',         d: 'Haber-Bosch-ferlið. Án tilbúins áburðar væri mannkynið mun færra í dag.' },
  { n: '15', t: 'Álbræðsla = rafgreining',       d: 'Ekki bruni. Íslensk álver nota endurnýjanlega orku — sporlétt ál.' },
];

function RulesCarousel() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #f3efe6 0%, #e6f2ef 100%)',
      padding: '4rem 2rem',
    }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: '1.75rem', color: '#0f4a3e', margin: '0 0 0.5rem', fontWeight: 700,
          }}>Þumalputtareglur um efnafræði</h2>
          <p style={{ color: '#5a6b66', maxWidth: 560, margin: '0 auto' }}>
            Fimmtán stuttar reglur til að ræða efnafræði af skynsemi og nákvæmni — án hræðslu eða oftrúar.
          </p>
        </div>
        <div style={{
          textAlign: 'center', color: '#8a9b96',
          fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '0.75rem',
        }}>← Strjúktu eða skrunaðu til að fletta →</div>
        <div style={{
          display: 'flex', gap: '1.25rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '0.5rem 0 1.5rem',
        }}>
          {RULES_DATA.map((r, i) => {
            const accent = i % 2 === 1;
            const color = accent ? '#d4872e' : '#1a6b5a';
            return (
              <div key={r.n} style={{
                flex: '0 0 280px', scrollSnapAlign: 'start',
                background: '#fff', borderRadius: 6, padding: '1.5rem',
                boxShadow: '0 1px 3px rgba(28, 42, 38,.04), 0 4px 12px rgba(28, 42, 38,.06)',
                borderTop: `3px solid ${color}`,
              }}>
                <div style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: '1.6rem', fontWeight: 700,
                  color, marginBottom: 4,
                }}>{r.n}</div>
                <div style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontWeight: 600, fontSize: '0.95rem',
                  color: '#0f4a3e', marginBottom: 8,
                }}>{r.t}</div>
                <div style={{ fontSize: '0.82rem', color: '#5a6b66', lineHeight: 1.5 }}>{r.d}</div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Button variant="outline" as="a">Sjá allar 15 reglurnar →</Button>
        </div>
      </div>
    </section>
  );
}
window.RulesCarousel = RulesCarousel;
window.RULES_DATA = RULES_DATA;
