# CLAUDE.md — efn.is on Astro + Sveltia CMS

Condensed from `KICKOFF.md` (the full brief). If they disagree, `KICKOFF.md` wins; say so.

## Context

- Site for **Efnafræðifélag Íslands** (Efnís, the Icelandic Chemical Society, founded 1999). Owner of this work: Siggi (board member, chemistry teacher).
- efn.is currently runs WordPress (Kadence, Bluehost). This repo is a **prototype for a board demo** of a static site + Git-based CMS, not the production migration.
- Demo goals: new design working with real content; non-developer board members can log in and publish a news item from their own laptop; zero-cost hosting with nothing server-side to patch.
- The site must survive Siggi leaving the board: boring, documented, few dependencies.

## Hard constraints

- **Never modify the live WordPress site.** Read only, GET requests to the public REST API (`https://efn.is/wp-json/wp/v2/`). No credentials.
- **No secrets in the repo, ever.** Secrets live in Cloudflare / GitHub secret settings, set by Siggi.
- **Nothing depends on Siggi's personal accounts.** Assume a society-owned GitHub org and a Cloudflare account on efnis1@gmail.com.
- Don't do any of the manual account/secret steps; write them down for Siggi instead.
- **Ask before adding any dependency** not in the stack below.

## Stack

- **Astro** (current stable, v7 at time of writing), `output: 'static'`, TypeScript strict. Content collections with Zod schemas. Built-in i18n routing.
- **Sveltia CMS** at `/admin/`, from CDN with a **pinned version**. Keep the config Decap-compatible where possible (Decap is the fallback), e.g. `widget: markdown` rather than `richtext`.
- **Cloudflare Pages** hosting; `sveltia-cms-auth` on Cloudflare Workers for GitHub OAuth.
- **Fonts**: Source Serif 4 (headings) + DM Sans (body), self-hosted. No Google Fonts requests, no analytics, no trackers, no third-party requests from public pages.
- **Pagefind** (static search, later phase). **Turndown** (WordPress HTML → Markdown, migration script only).
- Check current docs/versions before using a tool API; don't rely on memory.

## Design inputs

- `_input/design-system/project/colors_and_type.css` is the **canonical** token source. Don't invent colours.
- Current palette (May 2026): teal `#1a6b5a`, teal-dark `#0f4a3e`, basalt `#1c2a26`, amber `#d4872e`.
  **Never** use retired indigo `#1e3a5f`/`#142d4c`, copper `#c0703a`, old Kadence teal `#0d7377` or gold `#d4a017`.
  Note: `source-docs/efnis-mockup.html` still uses the retired indigo palette and Google Fonts — use it for layout only.
- Port `ui_kits/website/*.jsx` to `.astro` components. No React for static markup.
- Icons: inline SVG, 24×24, stroke 1.5, `currentColor`. Logo: only the four provided variants, never recoloured.
- Teal dominates; amber is a highlight, never a background. Cards: white, 6px radius, 3px top border alternating teal/amber.

## Site structure

Icelandic at root, English under `/en/`. WordPress slugs kept, with trailing slashes:
`/`, `/efnafradi-a-islandi/`, `/menntun/`, `/radstefnur/` + `/radstefnur/<year>/`, `/frettir/` + `/frettir/<slug>/`, `/vidburdir/` + `/vidburdir/<slug>/`, `/um-efnis/`, `/um-efnis/felagsadild/`, `/um-efnis/stjorn/`, `/um-efnis/log/`, `/en/` (+ English versions of entries that have them).
English is optional per entry. **Never show Icelandic text on an English page**; an entry without English just doesn't exist under `/en/`.

## Content model (summary)

Collections: `frettir`, `vidburdir`, `sidur` (create/delete off), `radstefnur`, `stjorn`, `reglur` (Þumalputtareglur, create/delete off), `settings` and `forsida`/`forsida_en` (single files). Schemas in `src/lib/schemas.ts`, CMS in `public/admin/config.yml`, check script `scripts/check-cms-config.mjs`. Every collection has a Zod schema **and** a matching Sveltia collection; a check script fails if they drift. **Invalid content must fail the build** (live site stays on last good deploy — a selling point, keep it).
i18n: Sveltia `multiple_files` (`<slug>.is.md`, `<slug>.en.md`). CMS labels, hints and collection names in Icelandic. Media in `public/images/uploads/`, referenced as `/images/uploads/...`. Full field lists: `KICKOFF.md` → "Content model".

## Icelandic language rules

- **Don't write new Icelandic prose.** Copy comes from Siggi or `_input/`. Where missing, insert a visible `TODO(texti): lýsing á …` placeholder and list every placeholder in the phase summary.
- Dates via `Intl.DateTimeFormat`: `is-IS` ("25. október 2024"), `en-GB` on English pages.
- Correct `lang="is"` / `lang="en"` on every page.
- Pitfalls: "kemísk efni" has a danger connotation; *geislun* (radiation) ≠ *geislavirkni* (radioactivity); "geislavirk geislun" is not established usage.
- Typography: „Icelandic quotes", em-dashes, `5.000` thousands / `5,6` decimals, Unicode subscripts (CO₂).
- Slugs: þ→th, ð→d, æ→ae, ö→o, strip other diacritics (á→a, í→i, …).

## Quality floor

Responsive to phone width; visible keyboard focus (`:focus-visible`); `prefers-reduced-motion` respected; WCAG AA contrast; semantic HTML; no font layout shift. Lighthouse 95+ performance and accessibility. CMS preview loads the site's CSS (`CMS.registerPreviewStyle` in `public/admin/index.html`; `preview_styles` isn't a real Sveltia option).

## Working rules

- One phase at a time (see `KICKOFF.md` → Phases). End of phase: build, commit, **stop**, summarise (done, decisions, placeholders, manual steps). Wait for go-ahead.
- Small logical commits with clear messages.
- Prefer boring, well-documented solutions; the next maintainer may have modest web skills. Few dependencies.
- If the brief conflicts with what a tool supports, **stop and ask**; don't work around it silently.
- Log every non-obvious decision below.

## Commands

- `npm run dev` — local dev server
- `npm run build` — static build to `dist/`
- `npm run preview` — serve the build
- `npm run check:cms` — Zod schemas vs CMS config (first step of `npm run build`)
- CMS locally: `npm run dev`, then open `http://localhost:4321/admin/index.html` in Chrome/Edge → "Work with Local Repository"

## Decisions log

<!-- Append: date — decision — why. -->

- 2026-09-25 — Repo already existed with history, so no `git init`; scaffolded Astro's official `minimal` template into it by hand (the `create-astro` template download is blocked in the build container). Identical files, renamed package to `efnis-vefur`.
- 2026-09-25 — `trailingSlash: 'always'` and `site: 'https://efn.is'` — keeps WordPress URLs (`/um-efnis/`) identical, so fewer redirects.
- 2026-09-25 — `.node-version` = 22 — Astro 7 needs Node ≥ 22.12; Cloudflare Pages reads this file to pick the Node version.
- 2026-09-25 — `.gitignore` also ignores `.env.*`, `.dev.vars` and `.wrangler/` so Cloudflare/Wrangler local secrets can't be committed by accident.
- 2026-09-25 — Siggi's answers to the Phase 0 questions: contrast fixes approved (see below); membership fee ~~5.000 kr/ár~~ (superseded, see the About-page entry below); contact email **efnis1@gmail.com**; English name **The Icelandic Chemical Society**; main nav *Efnafræði á Íslandi · Menntun · Ráðstefnur · Fréttir · Um Efnís* + "Gerast félagi" button + EN link; no icons on the homepage cards for now; Þumalputtareglur **in scope** (`/thumalputtareglur/` + homepage carousel), Claude proofreads the draft for Siggi to approve.
- 2026-09-25 — Contrast (WCAG AA) deviations from the UI kit, existing tokens only: amber buttons use basalt text (5.19:1) not white (2.87:1); meta text and dates use `ink-muted`, never `ink-subtle` or amber text; amber pill uses basalt text; text on dark hero/footer ≥ 85% white. `ink-subtle` and amber remain for borders, markers and large rule numbers.
- 2026-09-25 — Added dev dependencies `@astrojs/check` + `typescript` (approved). `npm run build` = `astro check && astro build`, so type errors fail the build too. npm resolved TypeScript 6.x because `@astrojs/check` doesn't support 7 yet.
- 2026-09-25 — Global CSS lives in `public/styles/global.css` (plain static file, not bundled) so the CMS preview (`preview_styles`, Phase 2) can load the exact same stylesheet by a stable URL. Component-specific styles stay scoped in `.astro` files.
- 2026-09-25 — Fonts: Astro Fonts API, `local` provider, design-system woff2 files (Fontsource builds) with OFL licences in `src/assets/fonts/`. **No preload**: local files carry no subset name, so a preload would also fetch the unused latin-ext files (~26 KB); metric-matched fallbacks prevent layout shift anyway. Revisit with Lighthouse in Phase 5.
- 2026-09-25 — More contrast details: amber button hover *lightens* (`color-mix` 85% amber + white, 6.1:1 with basalt) instead of darkening, because basalt on amber-dark is only 3.65:1. Large rule numerals on even cards use `amber-dark` (4.09:1 ≥ 3:1 for large text); plain amber on white is 2.87:1.
- 2026-09-25 — Links inside `.prose` are underlined (WCAG 1.4.1: teal vs body ink isn't enough on colour alone). Nav, cards and buttons keep the design system's no-underline style.
- 2026-09-25 — Homepage order: hero → four cards → Næsti viðburður | Fréttir (side by side, stacked on phones) → Þumalputtareglur carousel → membership CTA. The brief's order, with the carousel added before the CTA now that the rules are in scope.
- 2026-09-25 — Phone menu is a `<details>` disclosure (no JS). The link list is rendered twice (desktop row, phone panel); CSS shows one.
- 2026-09-25 — English header has no main nav yet (no English subpages exist); it shows "Membership" (→ `/en/#membership`) and "Íslenska". Language switch goes to the page's translation if it exists, else the other language's homepage; `hreflang` alternates are emitted only for real translations.
- 2026-09-25 — Phase 1 content lives in `src/data/*.ts` stand-ins (homepage copy, settings, placeholder entries, rules). Phase 2 replaces them with content collections. The rules are the unproofread draft verbatim, visibly marked; proposed corrections are in `docs/thumalputtareglur-yfirlestur.md`.
- 2026-09-25 — English homepage copy edits (approved decisions): "Chemistry Society" → "Chemical Society"; fee "3,000 ISK (approx. €20)" → "5,000 ISK" (the euro figure was dropped rather than recomputed).
- 2026-09-25 — The rules carousel is pure CSS scroll-snap: focusable track for keyboard scrolling, each card links to its rule (`/thumalputtareglur/#regla-N`).
- 2026-09-25 — **About page copy** (`_input/content/efnis-about-content.md`, from Siggi) supersedes earlier decisions: the fee is **3.000 kr / 3,000 ISK (approx. €20)**, and membership is **not open to everyone** (bylaws, 3. grein). So: the header's "Gerast félagi" button is gone; the hero keeps only "Þumalputtareglur ↓"; homepage card 4 ("Gerðu þig félag — Opið öllum …") became "Um Efnís" with the About intro's "vettvangur fyrir alla" sentence; the membership CTA band became an information band (Félagsaðild eligibility text + fee + "Nánari upplýsingar um félagsaðild"). The footer's kit sentence ("…og áhugafólks um efnafræði") was replaced by "Reykjavík · stofnað 1999" and the emblem teaser (first sentence of "Merki félagsins") suggested in the About notes.
- 2026-09-25 — `/um-efnis/` renders the About copy; `/en/um-efnis/` is its English version (same slug under `/en/`, matching how Sveltia's `multiple_files` will name translations; the notes suggested `/en/about/`, which is a one-line change if preferred). English nav now has "About". `/um-efnis/felagsadild/` shows the About page's Félagsaðild text plus a link to the bylaws.
- 2026-09-26 — Þumalputtareglur corrections approved and applied (`src/data/thumalputtareglur.ts`); the "drög" marker on `/thumalputtareglur/` is gone. Terminology choices: *koldíoxíð* (not koltvísýringur), *nitur*/*nituroxíð* (not köfnunarefni), *kemísk efni*, *klórbleikiefni*, *bótúlíneitur*, *kúlufiskur*, *saltpéturssýra*. Full record in `docs/thumalputtareglur-yfirlestur.md` → Ákvarðanir.
- 2026-09-26 — Phase 2 dependencies (approved): `@astrojs/markdown-satteri` direct, to set `smartPunctuation: false` (Astro 7's Markdown turns straight quotes into English “…” on Icelandic pages); `yaml` (dev) for the CMS check script.
- 2026-09-26 — Schemas live in `src/lib/schemas.ts` (not in `content.config.ts`) so the Node check script can import them. It runs with `--experimental-strip-types` (Node 22.12–22.17 need the flag; later versions ignore it). The check compares field names both ways, recursing into lists/objects; `body` must exist exactly when files are Markdown.
- 2026-09-26 — Entry ids keep the language: `glob()` with a custom `generateId`, so `um-efnis.is.md` → id `um-efnis.is` (Astro's default id drops the dots). `splitId()` in `src/lib/content.ts` gives `{ slug, lang }`. No `slug` field anywhere (Astro would use it as the id).
- 2026-09-26 — Missing content fails the build too: Astro only warns on a missing file, so fixed pages, settings and the homepage are loaded through helpers that throw. Verified: a bad date and a deleted page both exit 1.
- 2026-09-26 — Shared fields (dates, place, image, lists…) are `i18n: duplicate` so they're also written to `.en.md`; the same Zod schema serves both languages. `output.omit_empty_optional_fields: true`, and optional schema fields also accept `''`/null (Decap writes those).
- 2026-09-26 — Homepage copy is its own CMS collection "Forsíða" with two files: `src/content/forsida/is.yml` (structured: hero, cards, bands) and `forsida/en.md` (title, intro, Markdown body). The brief's `sidur` model (title + body) doesn't fit the Icelandic homepage.
- 2026-09-26 — The membership fee on the homepage comes from Settings ("Árgjald félagsins er {fee} kr.", Siggi's wording). The About and Félagsaðild pages state the fee in their text; the Settings hint says to update those too.
- 2026-09-26 — News URLs drop the date prefix of the file name: `2024-10-25-slug.is.md` → `/frettir/slug/` (WordPress-style; Phase 3 redirects rely on it). Two items with the same URL fail the build. The `{{year}}-{{month}}-{{day}}` in the CMS slug is the creation date, not the `date` field.
- 2026-09-26 — New CMS entries get ö→oe in slugs (Sveltia's transliteration); accepted by Siggi to stay Decap-compatible. Migrated WordPress slugs keep ö→o.
- 2026-09-26 — English routes exist only for entries with an `.en.md`: `/en/frettir/<slug>/`, `/en/vidburdir/<slug>/`, `/en/radstefnur/<year>/`, and fixed pages via `src/pages/en/[...path].astro` (paths from `PAGE_PATHS`). No English list pages yet.
- 2026-09-26 — Footer "Merki félagsins →" links to the About page's emblem heading, found by its text (/merki|emblem/) because Markdown heading ids come from the heading text.
- 2026-09-26 — Þumalputtareglur are the `reglur` collection (Icelandic only, 15 fixed files); numbering must be 1…n without gaps or the build fails. The page intro is `sidur/thumalputtareglur.is.md`.
- 2026-09-26 — 2024 conference seeded from `Ráðstefna_2024.pdf`: programme before the poster table (poster list is Markdown in the body); two typos in the PDF programme corrected (10:30–10:50, O-15 15:30–15:50); sponsors by name, URL only where the PDF prints one, no logos; committee label "Ráðstefnunefnd" as in the PDF; no prices (block hidden when empty).
- 2026-09-26 — Sveltia pinned to 0.221.1 from unpkg (the CDN build also loads its UI translations from unpkg; `/admin/` only, never public pages). The CMS UI has no Icelandic translation; only labels and hints are Icelandic.
- 2026-09-26 — Phase 3 dependency: `turndown` (dev, in the approved stack). In Node it parses HTML with its own `@mixmark-io/domino` dependency; no separate HTML parser added.
- 2026-09-26 — WordPress import (`npm run import:wp`, `scripts/import-wordpress.mjs`): stage everything, wire only the unambiguous. All 16 pages + 2 posts go to `wp-import/` as Markdown; only news, conferences 1–9 (+ English 2022) and the current board go into `src/content/`. Existing content files are never overwritten without `--overwrite`, so Siggi's `_input/` versions (lög, um-efnis, 2024 conference) win over WordPress. Report: `docs/wordpress-import.md` (generated).
- 2026-09-26 — WordPress's front page (`/`, "Fréttir frá starfi félagsins") was the news archive: one `<h2>` + italic date per item. The script splits it into news files; the two real WP posts are duplicates of two sections and keep their slugs (so `/ny-heimasida/` → `/frettir/ny-heimasida/`). Items keep their text verbatim, including the English-only and bilingual ones (as `.is.md`); `summary` left empty. The three `daemi-*` placeholder news items were deleted.
- 2026-09-26 — The REST API's rendered content had **no** `<style>` blocks or Kadence wrappers (the brief expected some); only `style=` width attributes on images, which Turndown drops. Cleanup: Outlook safelinks unwrapped, Jetpack `i0.wp.com` image URLs mapped to the originals, file-block embeds/"Download" buttons dropped, `<br><br>` → paragraph break, underscore separator line → `---`.
- 2026-09-26 — Conference `theme` and `venue` made optional (schema + CMS): unknown for conferences 1–3 (theme) and 8 (venue). Multi-day conferences use the first day as `date`. Venues are in the nominative (Hótel Saga, not "á Hótel Sögu") from a small table in the script; 2022 venue (Askja, Sturlugata 7) from the English 9th-conference page.
- 2026-09-26 — Images: downloaded to `public/images/uploads/` as `YYYY-MM-<original name>` (the folder is flat and `image.png` exists in two months). Documents (57 PDFs/docx, ~196 MB) are **not** copied; links still point at efn.is. Three proceedings PDFs exceed Cloudflare Pages' 25 MiB file limit — decision needed before WordPress is switched off.
- 2026-09-26 — `redirects-draft.txt` (repo root, `_redirects` syntax) is inactive; pages with no new home are `# TODO` lines. `/?page_id=N` links can't be handled by `_redirects` (query strings).
