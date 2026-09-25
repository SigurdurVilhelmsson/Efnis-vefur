# Efnafræðifélag Íslands — Design System

*Forest-teal, Amber & Basalt — maí 2026*

---

## The story — the carbonate ion

The brand is anchored by a stylised **carbonate ion** (CO₃²⁻): one amber centre, three teal atoms on bonds radiating at 120° — the trigonal-planar geometry of calcite.

> Our mark is the carbonate ion — the chemistry of Iceland spar, the crystal named after Iceland that taught the world how light bends.

The clearest specimens of calcite came from the **Helgustaðir mine** in the East Fjords, and in **1669** such a crystal revealed double refraction for the first time, helping found the science of polarised light. The same carbonate chemistry now underpins Iceland's carbon-capture industry (**Carbfix**, Carbon Recycling International) — turning CO₂ into stone. One molecule, linking Iceland's scientific past to its present.

The brand colours are a deliberate identity choice, not CPK convention (CPK would put carbon black and oxygen red). The mark is an identity, not a textbook diagram.

This is the design system for **Efnafræðifélag Íslands** (the Icelandic Chemical Society, brand short-form **Efnís**, web **efn.is**). It captures the visual language, type, color, iconography, components, and content tone used across the website and related printed material.

---

## About the organisation

Efnafræðifélag Íslands is the professional society for university-educated chemists, chemical engineers, biochemists, and science teachers (in primary, secondary, and upper-secondary schools), as well as anyone who has completed a university degree in a related field. Founded **1999**.

It serves four overlapping audiences: **researchers**, **teachers**, **students** (especially competition-track upper-secondary pupils), and **industry professionals**. The work surfaces in three main programmes:

- **EFNÍS Conference** — biennial, English-language, hosted at Háskóli Íslands.
- **Landskeppni / Ólympíulið** — national high-school chemistry competition feeding the International Chemistry Olympiad team. The historical record of teams since 2002 is one of the most-trafficked pages on the site.
- **Þumalputtareglur** — fifteen "rules of thumb" for talking about chemistry calmly and accurately. The flagship public-facing piece of content; carousel on the homepage, full page at `/thumalputtareglur/`. Inspired by *Tumregler* from Svenska Kemisamfundet but originally written for Icelandic context.

There is one product surface: the **website (efn.is)** — currently a Kadence-themed WordPress site with custom CSS in the Customizer (~16,500 chars as of April 2026). A child theme migration is planned but not done.

### Palette history (so future readers don't get confused)

This system has now gone through two recolours in a single quarter — the live Customizer CSS may still reference older tokens. The progression:

1. **Cyan-teal + gold-amber** (`#0d7377` / `#d4a017`) — the original Kadence import, legacy.
2. **Indígó + Kopar** (`#1e3a5f` / `#c0703a`) — chosen April 2026 to differentiate from the related `namsbokasafn.is`. *Superseded.*
3. **Forest-teal + Amber + Basalt** (`#1a6b5a` / `#d4872e` / `#1c2a26`) — adopted May 2026 to align with the new carbonate-ion logo. **Current.**

The shared overlap with namsbokasafn.is is being addressed by an overhaul of *that* site rather than this one — it is scheduled for the following months.

## Sources used to build this system

All references below are **read-only** — copies of the relevant files have been imported into `source-docs/` and `assets/`. Do not assume a future reader has access.

| Source                                              | Where it lived                      | Imported as                             |
| --------------------------------------------------- | ----------------------------------- | --------------------------------------- |
| Brand & logo handoff brief                          | (pasted into chat)                  | summarised inline below                 |
| Carbonate-mark SVGs (4 variants)                    | `uploads/efnis-carbonate-*.svg`     | `assets/logo/efnis-carbonate-*.svg`     |
| Útlitsstefnumótun (style direction draft)           | `outputs/utlitshandbok-drog.md`     | `source-docs/utlitshandbok-drog.md`     |
| Þumalputtareglur (content draft, 15 rules)          | `outputs/thumalputtareglur-drog.md` | `source-docs/thumalputtareglur-drog.md` |
| Efniskort (content map)                             | `outputs/efniskort-content-map.md`  | `source-docs/efniskort-content-map.md`  |
| Hi-fi mockup HTML (homepage + conference + article) | `outputs/efnis-mockup.html`         | `source-docs/efnis-mockup.html`         |
| Icon set (3 category + 15 rule SVGs)                | `outputs/icons/*.svg`               | `assets/icons/*.svg`                    |

The live site (`efn.is` / local `testing.local`) was not directly accessible; the mockup HTML, the May logo brief, and the SVG files were treated as the source of truth.

---

## CONTENT FUNDAMENTALS

The voice is **calm, precise, anti-sensational**. The whole purpose of the *Þumalputtareglur* project is to give the public language for talking about chemistry without fear or hype, and that mission shapes how everything else on the site reads.

**Language.** Icelandic-first. English appears only on conference pages where the audience is international, and on the Olympiad-team archive. Icelandic uses the proper letters: **Ð, þ, æ, ö, á, é, í, ó, ú, ý** — no transliteration, ever. Place names are unanglicised: *Háskóli Íslands*, not "University of Iceland", in Icelandic copy.

**Person.** Mixed but leans toward **plural we / plural you** (við, þið) when addressing readers as a community ("Notið heldur…"). Imperative-plural is standard for instructions. First-person singular is rare — this is institutional voice, not personal blog voice.

**Casing.** Icelandic sentence case throughout. **Do not** title-case headings in the English-marketing way. Display headlines often use a single em-dash or comma to set off a clarifying clause — *"Efnafræði á Íslandi — í heild sinni"*, *"Náttúrulegt er ekki sjálfkrafa öruggt"*. Don't use ALL CAPS in body copy. UPPERCASE labels (e.g. eyebrow text on hero, pills) are fine and use letter-spacing `0.04–0.08em`.

**Typography conventions.**

- **Chemical formulas** with proper subscripts: CO₂, H₂O, H₂CO₃, NaCl, Al₂O₃, SO₂, NOₓ. Use Unicode subscript characters (₂, ₓ), not `<sub>`, in plain copy where possible — they survive copy-paste.
- **Em-dashes** (—) are the dominant punctuation for clauses; avoid hyphen-space-hyphen.
- **Quotation marks** are Icelandic low-9/high-9 style: „svona". *"American-style"* only appears in English content.
- **Numerals**: Icelandic uses `.` as thousands separator and `,` as decimal — *"5.000 kr/ár"*, *"pH ~5,6"*.

**Tone exemplars** (verbatim from the rules content):

> "Sú hugmynd að náttúruleg efni séu öll góð og manngerð efni öll slæm er algeng — og röng."
>
> "Skammturinn skilur á milli eiturs og lyfs."
>
> "Efnafræði er allt — ekki bara það sem er eitrað."

Note the rhythm: a common misconception, a one-line correction, then mechanism. No exclamation marks. No emojis. No "as a chemist" voice — it is **as the field**.

**Vocabulary anchors.** Use the precise Icelandic chemistry terms when they exist: *natríumhýpóklórít*, *kolsýra*, *jónandi geislun*, *steinrænn*, *rafgreining*. Don't simplify them — readers either know them or learn them in context. The orðaskrá page links to the official `íðorðabanki`.

**Emoji & exclamation use.** **Never** in product copy. The voice is collegial-academic, not marketing.

**Short forms.** "Efnís" (the society's nickname) is used in casual contexts — *Bókagjafir Efnís*, *EFNÍS Conference*. The full name *Efnafræðifélag Íslands* appears in mastheads, footer, legal/lög contexts.

---

## VISUAL FOUNDATIONS

The system is **literary, institutional, unfussy** — closer to a serious science publication than a tech product. Generous whitespace, restrained colour, serif headings doing most of the personality work. Warm-Nordic feel: forest-teal for the geothermal-water reference, amber for the carbonate centre, basalt for depth, cream for the page.

### Color

| Role           | Var                  | Hex       | Notes                                                        |
| -------------- | -------------------- | --------- | ------------------------------------------------------------ |
| Primary (Teal) | `--efnis-teal`       | `#1a6b5a` | All primary CTAs, headings, links, atoms in mark             |
| Primary dark   | `--efnis-teal-dark`  | `#0f4a3e` | Bonds in mark, hero gradient end, heading colour             |
| Primary soft   | `--efnis-teal-soft`  | `#9ccabf` | Photo overlays, subtle illustration tints                    |
| Primary 50     | `--efnis-teal-50`    | `#e6f2ef` | Pill bg, icon-box bg, hover tint                             |
| Primary 100    | `--efnis-teal-100`   | `#c4dfd6` | Scrollbar thumb, dividers on dark                            |
| Accent (Amber) | `--efnis-amber`      | `#d4872e` | Carbonate centre, alternating rule numbers, dates, secondary CTA |
| Accent dark    | `--efnis-amber-dark` | `#b06f1f` | Hover, pill text                                             |
| Accent 50      | `--efnis-amber-50`   | `#f9ecd9` | Pill bg, blockquote bg                                       |
| Basalt         | `--efnis-basalt`     | `#1c2a26` | Footer, dark sections, body ink                              |
| Cream          | `--efnis-cream`      | `#f3efe6` | Section bg, info-card, post-list items                       |
| Cream-dark     | `--efnis-cream-dark` | `#e3ddd0` | Borders, dividers                                            |
| Warm white     | `--efnis-bg`         | `#fbfbf9` | Page background                                              |
| Ink (= basalt) | `--efnis-ink`        | `#1c2a26` | Body text on light                                           |
| Ink muted      | `--efnis-ink-muted`  | `#5a6b66` | Secondary text, article body                                 |
| Ink subtle     | `--efnis-ink-subtle` | `#8a9b96` | Meta, dates, hints                                           |

The palette is **two colours plus a neutral set** — do not introduce new hues. **Teal dominates; amber is a highlight, never a background.** Variation comes from gradient direction, alternating primary/accent (rule numbers, top-borders), and from where each colour lands on the warm/cold axis (amber = warmth + dates, teal = institutional + headings, basalt = depth + body).

### Type

- **Display: Source Serif 4** — variable, optical-size axis. Used for H1–H5, hero text, logo wordmark, info-card titles. Weight 600–700.
- **Body: DM Sans** — geometric grotesque. Weight 400 for body, 500–600 for UI labels, 700 for emphasis.
- **Mono: ui-monospace stack** — only used for chemical formula examples in dev/code contexts. Body copy uses DM Sans for formulas (CO₂ sits comfortably in DM Sans because of its tabular figures).

Type is **fluid on the hero** (`clamp(2rem, 4vw, 3rem)`) but otherwise on a clear stepped scale — see `colors_and_type.css`.

### Backgrounds

- **No imagery is canonical yet** beyond the carbonate mark. No photographs as full-bleed. No photographic textures.
- **Gradients are the texture.** Four named gradients (`hero`, `warm`, `amber`, `deep`) — all subtle, ≤20° hue spread. Hero gradient is 160° (slightly off-vertical) to feel anchored. **Deep** is now basalt → teal-dark, used for the footer-adjacent panel transitions.
- **Decorative geometry** is allowed *sparingly*: the hero has one giant transparent ring (`border: 40px solid rgba(255,255,255,.04)`) bleeding off-canvas top-right. That's the entire decorative vocabulary at the moment — additional shapes (orbitals, molecule outlines) are a planned phase 2.
- **No grain, no noise, no radial blurs.** Backgrounds are flat or simple linear gradients.

### Animation & motion

- **Restrained.** No bounces, no springs, no parallax.
- **Hover-lift on cards**: `transform: translateY(-2px)` + shadow `md → lg`, 200ms ease-out. That's it.
- **Color/background transitions** on links/buttons: 150ms.
- **Scroll-snap carousel** is the only "moving" element — and it only moves on user input.
- **No entrance animations** on page load. Pages just appear.
- **Reduced-motion**: respect `prefers-reduced-motion: reduce` in any future additions; do not add motion that is not respectful of this.

### Hover & press states

- **Buttons**: hover darkens to `*-dark` token (e.g. `--primary` → `--primary-dark`). No size change, no shadow change.
- **Ghost button on dark hero**: hover increases bg opacity from `0.12` to `0.20`.
- **Outline button**: hover fills with `--primary-tint` (light indígó-50).
- **Cards**: hover lifts 2px, shadow goes `md → lg`. No border change.
- **Links**: hover changes color to `--primary-dark`. No underline appears or disappears.
- **Press**: no dedicated press state — the transition speed (150ms) is fast enough that the browser's default tap-down feels right.
- **Focus**: rely on browser default outline; do not strip it. (Site does not currently customise this; documented as a gap.)

### Borders & dividers

- **Rules**: 3px top borders on cards, alternating `--primary` and `--accent` at `:nth-child(odd/even)` — this alternation is a *signature visual move* and worth preserving anywhere cards are listed.
- **Section dividers**: `1px solid var(--efnis-cream-dark)` (`#e8eaed`).
- **Hero/dark dividers**: `1px solid rgba(255,255,255,.10)`.

### Shadows

Three-step elevation, all tinted with primary indígó (no pure-black shadows) for cohesion with the palette:

- `--efnis-shadow-sm` — barely-there, for subtle floats
- `--efnis-shadow-md` — default card shadow
- `--efnis-shadow-lg` — hover state, info cards

### Capsules vs. protection gradients

- The dark hero relies on a **gradient** (hero/deep). Text on it sits at 100% opacity for headings, 75–85% for subtext.
- Pills (`.efnis-pill`, `.efnis-pill-amber`) are **filled capsules** in a tint of their hue — never gradient-filled, never bordered.
- No "frosted glass" / backdrop-filter usage **except** on the sticky header (`backdrop-filter: blur(12px)` over `rgba(255,255,255,.92)`). Reserve backdrop-filter for the sticky-header pattern only.

### Layout rules

- **Container max-width: 1120px**, centred, with `2rem` side padding on desktop. Article-width is narrower at `720px`.
- **Vertical rhythm**: sections are `4rem` top/bottom (`var(--efnis-space-2xl)` × roughly 0.9). Hero gets `5rem 2rem 4.5rem`.
- **Sticky header** at top of page, 64px tall, with backdrop blur.
- **Three-column grid** is the dominant editorial layout (categories, footer columns) — collapses to single column at `768px`.
- **No sidebars on article pages**; conference page uses a 2/1 main+sidebar split because of the structured info-card stack.

### Transparency & blur

- Reserved. Hero overlay-ring uses 4% white. Footer link text uses 60% white. Sticky header bg is 92% white over blur.
- **Do not** introduce blur in card backgrounds, button hovers, or imagery.

### Color vibe of imagery

- The system has no canonical photographic imagery yet. When photography enters, the brief is **warm Nordic, lab-or-geology, never corporate-tech**. Calcite specimens, basalt landscapes, geothermal vapour, lab glass on stone, are all on-brand. Stock business-tech imagery is to be avoided. Black-and-white is acceptable.
- Conference styling can lean slightly warmer through the amber accent; main marketing surfaces stay teal-led.

### Corner radii

- **4px (sm)** — buttons, post-list items, default. Tight, not soft.
- **6px (md)** — cards, icon boxes.
- **12px (lg)** — info-card, blockquote-figure containers (the "looser" containers).
- **99px (pill)** — pills, status chips.

The system **does not** use very large radii (16px+) anywhere. Right angles and small radii reinforce the institutional feel.

### What cards look like

- White background (`--bg-1`).
- 6px corner radius.
- 3px coloured top border (alternating primary/accent in lists).
- `--efnis-shadow-md` default, `--efnis-shadow-lg` on hover.
- `1.5rem` interior padding.
- No outer border. Shadow does the lifting.

---

## LOGO

The primary identity is the **carbonate-ion mark** — one amber centre, three teal atoms on bonds radiating at 120°. Files live in `assets/logo/`:

| File                           | When to use                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| `efnis-carbonate-primary.svg`  | Default. Full colour on warm-white / cream backgrounds.      |
| `efnis-carbonate-reversed.svg` | On basalt or any dark background. Cream atoms + amber centre. |
| `efnis-carbonate-mono.svg`     | Single-ink contexts: stamps, embossing, fax-grade documents. |
| `efnis-carbonate-favicon.svg`  | Sizes 16–32px. Thicker strokes/nodes survive at favicon resolution. |

**Wordmark lockup.** Mark to the left, two-line wordmark to the right — *Efnafræðifélag Íslands* (Source Serif 4, 700) above *THE ICELANDIC CHEMICAL SOCIETY* (DM Sans, 500, letter-spaced small caps, muted). A stacked (centred) version is fine for square formats. See `preview/brand-logo.html` for the canonical sizing.

**Clear space & minimum size.** Keep clear space around the mark equal to the radius of one outer atom (~12% of the mark's height). Do not place the full-colour mark below ~24px — use the favicon variant instead.

**Birefringence ghost (optional).** A device for hero moments only: set the wordmark *Efnís* with a faint amber duplicate offset 2–3px, as if viewed through a calcite crystal. CSS helper class `.efnis-birefringence[data-text]` in `colors_and_type.css`. **Use sparingly.** More offset reads as a misprint. Reach for it on About-page heroes, conference posters, and the mast of long-form publications — not in nav, not on buttons, not in body text.

**Don't.** Don't recolour the mark outside the four provided variants. Don't rotate it. Don't add an outline or drop-shadow. Don't put the primary mark on busy photographs.

---

## ICONOGRAPHY

There is **one custom icon set**, hand-drawn for Efnís in the *Lucide / Heroicons / Feather* tradition:

- **24×24 viewBox**, `1.5` stroke-width, `currentColor`, round caps + joins, `fill="none"`.
- Three category icons (`cat-frettir`, `cat-pistlar`, `cat-vidburdir`) and fifteen rule icons (`rule-01-natturulegt` through `rule-15-albraeddsla`). All in `assets/icons/`.
- Each rule icon depicts the *concept* of the rule with the simplest possible shape: a leaf for "natural ≠ safe", an Erlenmeyer flask for "the dose makes the poison", three circles in O–C–O for CO₂, a logarithmic curve for pH, two bonded H atoms with a spectrum bar for "hydrogen is hydrogen", and so on.
- **Approved by Siggi April 2026.** Style is locked. New rule-icons should match: same viewBox, same stroke, same minimal-line approach.

**Usage rules.**

- Always inline-SVG, **not** `<img>` — so they inherit `currentColor` for primary/accent recolouring (e.g. category boxes).
- Common container: 56×56 box, `--efnis-radius-md`, padding `12px`, background `--primary-tint` with text in `--primary-dark` (or accent equivalent for `Pistlar`). The CSS class is `.efnis-column-icon` on the live site.
- Smaller inline use (e.g. next to H2 on the rules page): 24px, no box, `currentColor` matches the heading.
- **Don't** flip stroke-width, **don't** add fill, **don't** add drop-shadows, **don't** rotate. The minimalism is the point.

**No icon font** is in use. **No PNG icons.** **No emoji.** **No unicode-characters-as-icons.** Every glyph is an SVG file.

**Substitutions.** If a needed icon is genuinely missing (e.g. a UI affordance like "search" or "menu" that this set doesn't yet cover), use **Lucide** as a fallback — same viewBox, same stroke-weight, same caps. Document the substitution in the relevant file. Lucide can be linked from CDN: `https://unpkg.com/lucide@latest/dist/umd/lucide.js`.

---

## Index — what's in this folder

```
.
├── README.md                  ← you are here
├── SKILL.md                   ← Agent-Skill manifest (works in Claude Code too)
├── colors_and_type.css        ← drop-in CSS variables + base type
├── assets/
│   ├── fonts/                 ← 16 self-hosted woff2 files (Source Serif 4 + DM Sans)
│   ├── logo/                  ← 4 carbonate-mark SVG variants
│   └── icons/                 ← 18 hand-drawn SVG icons (3 category, 15 rules)
├── source-docs/               ← read-only: imported original drafts and mockup
│   ├── utlitshandbok-drog.md     style direction document (Apr-2026, pre-pivot)
│   ├── thumalputtareglur-drog.md the 15 rules content
│   ├── efniskort-content-map.md  IA / content audit
│   └── efnis-mockup.html         hi-fi 3-page mockup
├── preview/                   ← Design-System-tab cards (for the project preview)
└── ui_kits/
    └── website/               ← efn.is recreation + reusable JSX components
        ├── README.md
        ├── index.html
        ├── Primitives.jsx     Icon, Pill, Button
        ├── SiteHeader.jsx     EfnisMark, SiteHeader
        ├── HeroBand.jsx
        ├── RulesCarousel.jsx
        ├── CategoryColumns.jsx
        ├── Footer.jsx         CtaBand, SiteFooter
        └── Pages.jsx          PageHero, ConferencePage, ArticlePage, RulesPage
```

**No slide template was provided**, so `slides/` is intentionally absent.

---

## Caveats

- **Live Customizer CSS is still on the April Indígó+Kopar tokens.** This repo is the source of truth for the May Forest-teal+Amber+Basalt direction; the WordPress Customizer needs a token swap when this is ready to ship. Hex map for the swap is in `colors_and_type.css` (top of file).
- **Photography library is empty** — written guidance only.
- **Fonts** are self-hosted in `assets/fonts/` as woff2 files (Source Serif 4 + DM Sans at 400/500/600/700, both `latin` and `latin-ext` subsets). No third-party CDN required for type rendering — print, export, and offline use all work.
- **No dark mode**. The system is single-theme by design.
- **Focus rings** rely on browser defaults; an accessibility pass to add explicit `:focus-visible` styling is open work.
- **Visual overlap with namsbokasafn.is** is accepted for now — that site is scheduled for an overhaul in the following months and will move off teal/amber.
