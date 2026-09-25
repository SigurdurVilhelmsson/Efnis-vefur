# Phase 0: input check, component plan, open questions

Written 2026-09-25. Nothing here is built yet. It is a proposal to agree on before Phase 1.

## 1. Input inventory

| Expected (KICKOFF.md) | Status |
| --- | --- |
| `design-system/project/README.md` | ✅ |
| `design-system/project/colors_and_type.css` | ✅ |
| `design-system/project/assets/logo/` (primary, reversed, mono, favicon) | ✅ (4 SVGs; duplicates in `uploads/`) |
| `design-system/project/assets/icons/` | ✅ 3 category + 15 rule icons |
| `design-system/project/source-docs/efnis-mockup.html` | ✅ but it uses the **retired indigo/copper palette** and imports Google Fonts. Layout reference only. |
| `design-system/project/ui_kits/website/` | ✅ 7 JSX files, already recoloured to teal |
| `content/efnis-homepage-content.md` | ✅ |
| `content/Lög_Efnafræðifélags_Íslands` | ✅ (as `.md`) |
| `content/Ráðstefna_2024.pdf` | ❌ **Missing.** Needed in Phase 2 for the 2024 conference entry. |
| Fact-checked Þumalputtareglur | ❌ Not added. Only `source-docs/thumalputtareglur-drog.md` exists, marked *Drög … til yfirferðar*. |
| Self-hosted fonts | ✅ Bonus: `assets/fonts/` has 16 woff2 files (Fontsource builds, OFL). |

## 2. Proposed components (`src/components/`, all `.astro`, zero client JS unless noted)

**Base**
- `BaseLayout.astro`: `<html lang>`, meta, fonts, favicon, skip link, header, `<main>`, footer. Takes `lang`, `title`, `description`, and an `alternate` URL for the language switch.
- `PageLayout.astro`: `PageHero` + a 720px article column (text pages: lög, félagsaðild, síður).
- `global.css`: tokens copied verbatim from `colors_and_type.css`, plus reset, `:focus-visible` ring, reduced-motion rules and container utilities.

**Primitives** (from `Primitives.jsx`)
- `Icon.astro`: reads an SVG from `src/icons/` and inlines it at build time.
- `Button.astro`: variants `primary`, `accent`, `ghost`, `outline`. Renders `<a>` when given `href`.
- `Pill.astro`: `primary` / `amber`.
- `EfnisMark.astro`: inline logo SVG. `reversed` variant for dark backgrounds.

**Chrome** (from `SiteHeader.jsx`, `Footer.jsx`)
- `SiteHeader.astro`: sticky header, logo lockup, main nav, "Gerast félagi" button, IS/EN switch. On phones the nav collapses using `<details>`/`<summary>`, so no JS is needed.
- `LanguageSwitch.astro`: links to the other-language version when one exists. Otherwise links to that language's homepage.
- `SiteFooter.astro`: contact email, links to lög, stjórn and English. Contact email comes from `settings`.

**Homepage sections** (from `HeroBand.jsx`, `Footer.jsx` → `CtaBand`, and the kickoff homepage spec)
- `HeroBand.astro`: eyebrow, H1, tagline, intro, CTAs, decorative ring.
- `CardGrid.astro` + `Card.astro`: the four navigation cards, with alternating teal/amber top borders and hover lift.
- `NextEvent.astro`: next upcoming `vidburdir` entry, computed at build time. Falls back to `settings.next_event_fallback`.
- `NewsList.astro` + `NewsListItem.astro`: the latest three items on the homepage. The same item component is reused on the `/frettir/` archive.
- `CtaBand.astro`: membership call to action. The fee comes from `settings`.

**Subpages** (from `Pages.jsx`)
- `PageHero.astro`: breadcrumbs, H1, meta line.
- `Breadcrumbs.astro`: a real `<nav aria-label>` with `<ol>`.
- `EventBlock.astro`: date/time, place, registration link. Used on the homepage and on `/vidburdir/<slug>/`.
- `ConferenceLayout` pieces: `ProgrammeTable.astro` (time/code/title/speaker), `InfoCard.astro` (cream sidebar card, used for "Upplýsingar", prices and "Fyrri ráðstefnur"), `SponsorGrid.astro`, `CommitteeList.astro`.
- `Prose.astro`: styling wrapper for rendered Markdown bodies (headings, lists, blockquote in amber-50, tables).
- `BoardList.astro`: the `stjorn` collection, sorted by `order`.

**Not ported yet:** `RulesCarousel` and `CategoryColumns`. The kickoff homepage replaces them with the four cards, Næsti viðburður and Fréttir. The Þumalputtareglur content is also still a draft. See Q4.

**Utilities** (`src/lib/`): `formatDate(date, lang)` (Intl, `is-IS`/`en-GB`), `slugify()` (þ→th, ð→d, æ→ae, ö→o, strip diacritics), and `getEntries(collection, lang)` (reads `<slug>.is.md` / `<slug>.en.md`).

## 3. Technical approach (for your OK)

- **Fonts:** Astro 7's built-in Fonts API with the `local` provider, fed with the 16 woff2 files already in the design system. Those files *are* Fontsource builds. This adds no npm dependency, needs no network at build time, gives preload, and generates metric-matched fallback fonts, which is what prevents layout shift. The alternative is the `@fontsource/*` npm packages: two extra dependencies and no automatic fallback metrics. The OFL licence text will ship with the files.
- **i18n:** Astro i18n with `defaultLocale: 'is'`, `locales: ['is','en']`, `prefixDefaultLocale: false`. In Sveltia: `initial_locales: [is]`, so English stays optional per entry. Non-translatable fields (`date`, `image`, `start`, …) use `i18n: duplicate`, which makes each `.en.md` file self-contained and simple to validate.
- **Sveltia pinning:** latest is **0.221.0**, and Sveltia is still pre-1.0. Its docs *discourage* exact pinning, because pinned sites miss fixes. Your brief asks for a pin. I plan to pin exactly (`@sveltia/cms@0.221.0`) and write down how to bump it. Flagging this because it is a small conflict between your brief and the tool's docs.
- **Rich text:** `widget: markdown` (Sveltia treats it as an alias of `richtext`), so Decap still works.
- **Nested i18n (to verify in Phase 2):** `radstefnur.prices[].label` is i18n while `amount` is not, inside a list. I'll test that Sveltia handles per-subfield i18n in lists with `multiple_files`. If it doesn't, I'll stop and ask.

## 4. Contrast problems in the design system (WCAG AA needs 4.5:1 for normal text)

I measured the token pairings the UI kit uses:

| Pairing (as used in kit) | Ratio | AA normal text |
| --- | --- | --- |
| White on amber (accent button, "Gerast félagi") | **2.87** | ❌ (fails even large text) |
| Amber text on page bg (dates) | **2.77** | ❌ |
| `ink-subtle` #8a9b96 on bg / cream (meta, dates) | **2.81 / 2.54** | ❌ |
| Amber-dark on amber-50 (amber pill) | **3.51** | ❌ |
| 60% white on teal (hero eyebrow) / 50% (breadcrumbs) | **3.40 / 2.84** | ❌ |
| 40% white on basalt (footer copyright) | **3.63** | ❌ |
| Teal on bg, white on teal, ink-muted on bg/cream | 6.15 / 6.37 / 5.43 / 4.91 | ✅ |
| Basalt on amber | 5.19 | ✅ |

Proposed fixes, using existing tokens only:
- Accent buttons get **basalt text on amber** (5.19) instead of white.
- Meta text and dates use `ink-muted`. `ink-subtle` is kept for borders and decoration only.
- The amber pill gets basalt text.
- Text on the dark hero and footer is at least 85% white. Amber survives as borders, markers and rule numbers.

## 5. Discrepancies between inputs

1. **Membership fee:** the UI kit says *5.000 kr/ár*, the English page draft says *3,000 ISK (approx. €20)*. Which is right? The fee will live in `settings`.
2. **Contact email:** the kit footer says `efnis@efn.is`, the content draft says `efnis1@gmail.com`. I'll use `efnis1@gmail.com` (from `settings`) unless you say otherwise.
3. **English name:** the design system and logo lockup say *The Icelandic **Chemical** Society*. The English page draft says *The Icelandic **Chemistry** Society*. I won't change your copy without a decision.
4. **Conference frequency:** the design README says *biennial*, the homepage draft says *annual* ("Árleg ráðstefna", "annual national conference").
5. **Hero copy:** the kit uses "Efnafræði á Íslandi — í heild sinni" plus a different subtitle. The content draft uses "Efnafræðifélag Íslands" plus the *Fagvettvangur…* tagline. I'll use the content draft's copy with the mockup's layout, as the brief says.
6. **Design README** still mentions "indígó" in a few places (shadows, outline hover), and the kit footer prints "Indígó & Kopar litapalletta". Stale text; the CSS tokens win and I'll drop that footer line.

## 6. Open questions

1. **Ráðstefna_2024.pdf:** can you add it? Phase 2 needs it.
2. **Contrast fixes (§4):** OK to deviate from the kit this way? Or do you want the design system itself updated?
3. **Fee, email, English name, annual vs biennial (§5):** what are the correct values?
4. **Þumalputtareglur:** out of scope for the demo (not in the site structure), or add `/thumalputtareglur/` plus the homepage carousel once the fact-checked text exists?
5. **Main nav:** I propose *Efnafræði á Íslandi · Menntun · Ráðstefnur · Fréttir · Um Efnís*, then a "Gerast félagi" button and an EN link. This follows note 5 in the content draft, with Fréttir added. Is Viðburðir also a nav item, or only reached from the homepage block?
6. **Homepage card icons:** the four cards have no matching icons in the set (only fréttir/pistlar/viðburðir exist). Options: (a) no icons, (b) Lucide fallback icons copied inline, as the design README allows, with no dependency, (c) you draw four. I suggest (a) for the demo.
7. **Footer "Tenglar":** the content draft lists *Lög · Stjórn · Tenglar · English*, but `/tenglar/` isn't in the site structure. Drop it, or add it as a `sidur` page?
8. **Stjórn:** the `stjorn` collection models the current board. The WordPress page also holds every board since 1999. Should the history go into the page body (a `sidur` entry) under the current-board list?
9. **Images in fréttir:** may I add an optional `image_alt` field (i18n)? Accessibility needs alt text, and the brief's schema has none.
10. **English "Næsti viðburður":** the English homepage draft has no event block. Show upcoming events that have English versions on `/en/`, or leave the block off the English homepage?
11. **English slugs:** `multiple_files` gives the English version the same slug as the Icelandic one (`/en/frettir/2024-10-25-radstefna/`). Is that acceptable?
12. **Type checking:** `astro check` needs `@astrojs/check` + `typescript` as dev dependencies. They aren't in the listed stack. May I add them, so type errors fail CI and not only schema errors?
