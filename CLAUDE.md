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

Collections: `frettir`, `vidburdir`, `sidur` (create/delete off), `radstefnur`, `stjorn`, `settings` (single file). Every collection has a Zod schema **and** a matching Sveltia collection; a check script fails if they drift. **Invalid content must fail the build** (live site stays on last good deploy — a selling point, keep it).
i18n: Sveltia `multiple_files` (`<slug>.is.md`, `<slug>.en.md`). CMS labels, hints and collection names in Icelandic. Media in `public/images/uploads/`, referenced as `/images/uploads/...`. Full field lists: `KICKOFF.md` → "Content model".

## Icelandic language rules

- **Don't write new Icelandic prose.** Copy comes from Siggi or `_input/`. Where missing, insert a visible `TODO(texti): lýsing á …` placeholder and list every placeholder in the phase summary.
- Dates via `Intl.DateTimeFormat`: `is-IS` ("25. október 2024"), `en-GB` on English pages.
- Correct `lang="is"` / `lang="en"` on every page.
- Pitfalls: "kemísk efni" has a danger connotation; *geislun* (radiation) ≠ *geislavirkni* (radioactivity); "geislavirk geislun" is not established usage.
- Typography: „Icelandic quotes", em-dashes, `5.000` thousands / `5,6` decimals, Unicode subscripts (CO₂).
- Slugs: þ→th, ð→d, æ→ae, ö→o, strip other diacritics (á→a, í→i, …).

## Quality floor

Responsive to phone width; visible keyboard focus (`:focus-visible`); `prefers-reduced-motion` respected; WCAG AA contrast; semantic HTML; no font layout shift. Lighthouse 95+ performance and accessibility. CMS preview (`preview_styles`) loads the site's CSS.

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

## Decisions log

<!-- Append: date — decision — why. -->

- 2026-09-25 — Repo already existed with history, so no `git init`; scaffolded Astro's official `minimal` template into it by hand (the `create-astro` template download is blocked in the build container). Identical files, renamed package to `efnis-vefur`.
- 2026-09-25 — `trailingSlash: 'always'` and `site: 'https://efn.is'` — keeps WordPress URLs (`/um-efnis/`) identical, so fewer redirects.
- 2026-09-25 — `.node-version` = 22 — Astro 7 needs Node ≥ 22.12; Cloudflare Pages reads this file to pick the Node version.
- 2026-09-25 — `.gitignore` also ignores `.env.*`, `.dev.vars` and `.wrangler/` so Cloudflare/Wrangler local secrets can't be committed by accident.
