# Útlitsstefnumótun efn.is — drög

*Leiðarvísir fyrir framhald útlitsvinnu. Síðast uppfært apríl 2026.*

Þetta skjal er ætlað sem vinnuplan milli Siggi og Claude fyrir áframhaldandi útlitsþróun efn.is. Það dregur saman það sem þegar er komið, og leggur til næstu skref í þremur áföngum — hönnunarkerfi, SVG-myndmál og heildrænt sjónrænt yfirbragð.

---

## Staðan — hvað er búið

- **Kadence global palette:** indígó `#1e3a5f`, indígó-dark `#142d4c`, kopar `#c0703a` sett inn. Fótur, hnappar og hlekkir sækja í þessa paletu. *(Breytt úr teal/amber í apríl 2026 til að aðgreina frá námsbókasafn.is.)*
- **Letur:** Source Serif 4 fyrir fyrirsagnir, DM Sans fyrir meginmál. H4/H5 aðgreining fínpússuð.
- **Sticky header** og 4px hornbogi á hnöppum.
- **Forsíða (`/`):** þumalputtareglur-kafli með scroll-snap carousel (15 kort), kalt grátt→indígó-50 linear-gradient bakgrunnur, alternating indígó/kopar topplínur og númer, hover-lyfting á kortum. Þriggja-dálka-kafli undir með latest-posts fyrir flokka og SVG flokka-ikonum.
- **Þumalputtareglu-síða (`/thumalputtareglur/`)** birt í fullri lengd, tengd af forsíðu.
- **Þrír póstaflokkar:** `frettir-af-efnis`, `frettapistlar`, `vidburdir`.

### ✅ Áfangi 1 — Hönnunarkerfi (KLÁRAÐUR + UPPFÆRT)

CSS-breytukerfi (design tokens) er núna í Kadence Additional CSS (~4.300 stafir). Öll útlitsvinna héðan í frá getur sótt beint í þessar breytur.

**Litapalletta A — Indígó & Kopar** (valin apríl 2026 til aðgreiningar frá námsbókasafn.is):

*Litir:* `--efnis-teal` = `#1e3a5f` (indígó), `--efnis-teal-dark` = `#142d4c` (indígó-dark), `--efnis-teal-50` = `#e8eef5` (indígó-50), `--efnis-teal-100` = `#c5d4e6`, `--efnis-amber` = `#c0703a` (kopar), `--efnis-amber-dark` = `#a15c2d`, `--efnis-amber-50` = `#f5ebe1` (kopar-50), `--efnis-cream` = `#f4f5f7` (kalt grátt, enginn cream), `--efnis-cream-dark` = `#e8eaed`, `--efnis-ink` = `#1a1a2e`, `--efnis-ink-muted`, `--efnis-ink-subtle`.

*Gradíentar:* `--efnis-gradient-warm` (kalt grátt → indígó-50), `--efnis-gradient-hero` (indígó → indígó-dark, 160°), `--efnis-gradient-amber` (kopar-50 → kalt grátt), `--efnis-gradient-deep` (indígó-dark → indígó).

*Spacing:* `--efnis-space-xs` (.5rem) upp í `--efnis-space-2xl` (4.5rem), sex þrep.

*Skuggi og boglína:* `--efnis-shadow-sm/md/lg`, `--efnis-radius-sm/md/lg/pill`.

*Hjálparklassar (notanlegir í blokkum):* `.efnis-bg-warm`, `.efnis-bg-hero`, `.efnis-bg-amber`, `.efnis-bg-deep`, `.efnis-bg-cream`, `.efnis-bg-teal`, `.efnis-bg-teal-50`, `.efnis-text-teal`, `.efnis-text-teal-dark`, `.efnis-text-amber`, `.efnis-text-muted`, `.efnis-rule`, `.efnis-rule-amber`, `.efnis-rule-teal`, `.efnis-pill`, `.efnis-pill-amber`.

Staðfest á frontend: indígó og kopar litir rendera rétt í tokens, gradíentum, ikonum og carousel-kortum. Kadence global palette líka uppfærð (palette1–2 indígó, palette10 kopar).

**Uppsetning er á einum stað:** Sérsníða (Customizer) → „Nánari CSS" (eða einfaldlega setning `wp.customize('custom_css[kadence]')`). Auðvelt að fínstilla án þess að þurfa að breyta hverju skjali fyrir sig.

---

## Áfangi 2 — SVG-myndmál (í vinnslu)

Þetta er þar sem mesta sjónrænt virði liggur. Tvær leiðir fyrir SVG á efn.is, og ég held að hybrid-nálgun sé skynsamlegust:

### Leið A: Einföld línu-ikon (fljótlegt) — ✅ fyrsta lota tilbúin

Stakur, minimalískur stíll í anda Lucide, Heroicons eða Feather Icons — en málaður með Efnís-litunum. Þessi ikon væri hægt að nota:

- Við hvern þriggja-dálka-flokk á forsíðu (t.d. dagblaðs-ikon fyrir Fréttir, heimurinn-ikon fyrir Fréttapistla, dagatals-ikon fyrir Viðburði)
- Við hverja þumalputtareglu (einfalt tákn sem styður reglu, t.d. blað-og-tré fyrir „Náttúrulegt ≠ öruggt")
- Í aðalvalmynd (minnkandi pláss með ikonum)

**Búið (apríl 2026):**

- 8 SVG-ikon teiknuð í `/outputs/icons/` — 24×24 viewBox, 1.5 stroke, `currentColor`, round caps/joins. Samræmd Lucide-lík nálgun.
- 3 flokka-ikon: `cat-frettir.svg` (skjal með brotnu horni), `cat-pistlar.svg` (heimur með miðbaug), `cat-vidburdir.svg` (dagatal).
- 5 rule-ikon sem prufutilraun: `rule-01-natturulegt.svg` (laufblað), `rule-02-skammtur.svg` (Erlenmeyer-flaska), `rule-06-co2.svg` (þrjár kúlur O-C-O), `rule-08-jardhitavatn.svg` (dropi með gufu), `rule-11-ph.svg` (logaritmísk kúrva).
- Forskoðunarsíða — `/outputs/icons-preview.html` — sýnir öll ikon í fjölmörgu samhengi (stærðarvariantar 16–96px, litaþemur, þriggja-dálka-uppsetning, reglukorta-uppsetning).
- Flokka-ikonin innleidd á lifandi forsíðu í þriggja-dálka-kaflanum. CSS-hjálparklassi `.efnis-column-icon` bætt við Kadence CSS — 56×56 kassi, `--efnis-teal-50` bakgrunnur, `--efnis-radius-md` bogi, `currentColor` sækir `--efnis-teal-dark`. Staðfest á frontend.

**Eftir í Leið A:**

- Teikna ikon fyrir reglur 3–5, 7, 9–10, 12–15 (10 ikon eftir af 15).
- Samþykkja stíl með Siggi áður en allt safnið er klárað.
- Bæta ikonum inn í þumalputtareglu-kortin (carousel og síðuna) þegar stíll er samþykktur.

### Leið B: Frumsamin efnafræði-motíf (varanlegt virði)

Sértaktar SVG-myndir sem tengjast beint efnafræði — sameindateikningar, rannsóknartæki, jarðfræðilegt mynstur. Notað sem:

- Punktur á hero-section (subtle, afklippt sameind)
- Decorative bakgrunnsmynstur (mjög gegnsætt, 5–10% opacity) á einstökum síðum
- Stór illustration á þumalputtareglu-síðum (ein fyrir hverja reglu, bundin efninu sem rætt er)
- Logo-samspil þegar nýja lógóið kemur
- Illustration á aðildarsíðu, skólasíðu, ráðstefnusíðu

Hér er hægt að sækja sameindabyggingar beint úr PubChem sem SVG og síðan endurstílsa (skipta út lit, stroke-width, o.s.frv.). Dæmi um efni sem ættu stóru myndirnar: H₂O, CO₂, koffein, C₆H₁₂O₆ (glúkósi), benzen, klórfyll.

### Tillaga um verkferli

1. Ég set upp grunnsafn af 5–10 ikonum í fyrstu lotu (SVG-skrár í `/outputs/icons/`). Þú metur stíl og við stillum af.
2. Þegar grunnstíll er ákveðinn er léttvægt að bæta við fleirum jafnóðum.
3. SVG-in væri hægt að geyma ýmist sem inline í blokkum (kostur: litbreytanleg með CSS — ættu nú að sækja `var(--efnis-teal)` o.s.frv.) eða sem myndskrár í bókasafni WP (kostur: einfaldara fyrir umsjón).

---

## Áfangi 3 — Heildrænt sjónrænt yfirbragð

Þegar kerfi og ikon eru komin er næsta skref að lyfta öðrum svæðum síðunnar upp í sama gæðabil og þumalputtareglu-kaflinn.

### Hero-section á forsíðu (næsta stór skref eftir ikon)

Núna byrjar forsíðan á titlinum „Forsíða" — við viljum skipta honum út fyrir alvöru hero. Tillaga:

- Fullbreiddar bakgrunnur með `--efnis-gradient-hero` (teal → teal-dark, 160° horn) eða ljós útgáfa með mjög stórri, gegnsærri sameindateikningu
- Heading í Source Serif, t.d. *„Efnafræði á Íslandi — í heild sinni"* eða svipað
- Undirtexti sem útskýrir hvað félagið er og hverjum það þjónar (nemum, kennurum, rannsakendum, iðnaði)
- Tveir hnappar: „Gerast félagi" (aðal) og „Lesa reglurnar" (secondary)
- Hugsanlega lítið útklippt mynstur í horni (SVG, sameindateikning eða orbitals)

### Flokkasíður og einstakar færslur

Þegar fyrstu fréttir koma inn þarf að stílsa einstöku færslusíður — t.d. með lítilli flokks-ikon við fyrirsögn, dagsetning í amber, höfundur o.s.frv. Það sama á við um flokkasíður (archive-síður fyrir /category/frettir-af-efnis/ o.fl.). Nýti `.efnis-pill` fyrir flokkamerkingar.

### Ráðstefnusíða (EFNÍS Conference)

Núverandi ráðstefnuefni er nokkuð stofnaralegt. Við getum endurgert þessar síður þannig að hver ráðstefnuárgangur fái eigið litahorn úr gradíent-skalanum okkar (ekki mörg ný liti, bara mismunandi hlutföll teal/amber). Það gerir þær auðþekkjanlegar án að brjóta upp kerfið.

### Útprent og útflutningur

Þumalputtareglurnar væri hægt að útbúa sem A4 plakat (PDF) og bæklingi sem kennarar geta prentað og lagt í skólanámskeið. Þegar SVG-ikon eru tilbúin er tiltölulega fljótgert að búa til slíkt útprent með docx eða canvas-design skill-unum.

---

## Vinnubrögð milli okkar

Til að nýta Cowork-setuið sem best legg ég til:

- **Ég sé um útfærslu:** CSS-breytur, SVG-skrár, blokka-stillingar í gegnum REST API/Customizer. Þú þarft ekki að höndla kóða nema þú viljir.
- **Þú sérð um efni og ákvarðanir:** Þú samþykkir stíl, velur úr tillögum, skrifar texta. Ég get sjálfur samið fyrstu drög á íslensku og þú lagfærir.
- **Ítrun í stuttum lotum:** Einn hluti í einu (t.d. hero næst, svo fréttaflokkasíður, svo ráðstefnur). Verify-a hvert skref í vafranum áður en haldið er áfram.
- **Barnatema (child theme) að lokum:** Þegar við erum komin með stöðugt útlit getum við flutt sérsniðnar CSS-reglur úr Customizer í almennilegt child theme með Git-stuðningi. Það er hreint prakka-atriði — ekkert sem verður áhrifssýnilegt á vef.

---

## Næsta verkröð — það sem er eftir

1. ~~**Samþykkja þessa leiðsögn**~~ ✅
2. ~~**Koma upp CSS-breytukerfi**~~ ✅ (áfangi 1)
3. ~~**Fyrsta ikon-sett** — 3 flokka-ikon og 5 rule-ikon sem prufutilraun~~ ✅ (teiknað, forskoðað, flokka-ikon innleidd á forsíðu)
4. ~~**Samþykkja ikon-stíl**~~ ✅ Samþykkt af Siggi apríl 2026.
5. ~~**Klára rule-ikon safn**~~ ✅ Öll 15 rule-ikon teiknuð (reglur 1–15). SVG-skrár í `/outputs/icons/`. Forskoðun í `icons-preview.html` v2 með Indígó & Kopar pallettunni.
6. ~~**Hero-section á forsíðu**~~ ✅ Innleitt apríl 2026. Indígó-gradient hero með label, fyrirsögn, undirtexta (í samræmi við lög félagsins, 3. grein), tveimur CTA-hnöppum (Gerast félagi — 5.000 kr/ár, Þumalputtareglur →) og decorative orb. Kadence síðutitill falinn, full-width CSS.
7. ~~**Endurskoða þumalputtareglu-carousel**~~ ✅ 15 SVG-ikon bætt við carousel-kortin á forsíðu. Kopar/indígó litaskipti virka. Box-shadow uppfært í `--efnis-shadow-md` token. Ikon einnig bætt við H2-fyrirsagnir á `/thumalputtareglur/` síðunni.
8. ~~**Fréttaflokkasíður**~~ ✅ Indígó-gradient haus á archive-síðum. Pill-merki á flokkatenglum (indígó-50 fyrir Fréttir, kopar-50 fyrir Pistla, indígó-50 fyrir Viðburði) með hover-áhrifum. Post-kort með shadow-token og hover-lyfting. Dagsetning í kopar. Single-post stílar líka.
8b. ~~**Endurskipuleggja valmynd**~~ ✅ Ný IA innleidd: Um félagið ▾ | Ráðstefnur ▾ | Efnafræðinám og keppnir ▾ | Þumalputtareglur | Fréttir | Tenglar ▾. Dropdowns virka. Gamalt „Fréttir frá starfi félagsins" (id 296) fjarlægt úr valmynd.
9. ~~**Ráðstefnusíður**~~ ✅ Innleitt apríl 2026. Þrjár ráðstefnusíður stílaðar: 2024 (indígó-gradient hero), 2022 (indígó→kopar gradient hero), Fyrri ráðstefnur (deep indígó hero). H2-kaflahaus með indígó-dark lit og alternating indígó/kopar botnlínum. Sponsor-lógó stærðartakmörkuð (max 120px). Tenglar í teal með kopar-hover. Responsive CSS fyrir farsíma. CSS nú ~16.500 stafir.
10. **Lógó** (Siggi vinnur að) — þegar komið, passa við tokens. **← næsta skref þegar lógó er tilbúið.**
11. **Child theme** — flytja CSS úr Customizer yfir í Git-stýrt child theme. *Nauðsynlegt fljótlega — CSS er orðið ~16.500 stafir.*
12. **A4 plakat af reglum** fyrir kennara (PDF/print).

---

*Þessi drög eru til að ræða og breyta. Allt sem er lagt til má endurmóta.*
