# Kickoff: efn.is on Astro + Sveltia CMS (board demo prototype)

Read this whole file before doing anything. Then do **Phase 0 only** and stop.

## Context

I'm Siggi, a chemistry teacher and board member of Efnafræðifélag Íslands (Efnís, the Icelandic Chemical Society, founded 1999). The society's site, efn.is, runs on WordPress (Kadence theme, Bluehost shared hosting). We are evaluating a move to a static site with a Git-based CMS. The reasons are WordPress governance uncertainty, lower maintenance, and continuity: the society is volunteer-run, and the site must survive me stepping off the board.

This repo is a **prototype for a board demo**, not the production migration. Goals for the demo:

- The new design, working, with real content.
- Board members (non-developers) can log in and publish a news item from their own laptop.
- Hosting at zero cost, nothing server-side to patch.

Hard constraints:

- **Never modify the live WordPress site.** Only read from it, with GET requests to the public REST API. No credentials are needed or to be stored.
- **No secrets in the repo**, ever. Anything secret goes in Cloudflare or GitHub secret settings, and I set those myself.
- **Nothing depends on my personal accounts.** Assume the repo will live in a GitHub organisation owned by the society, and that Cloudflare will be registered to the society email (efnis1@gmail.com).

## Stack

- **Astro** (current stable), static output only. Content collections with Zod schemas; built-in i18n routing.
- **Sveltia CMS** at `/admin/`, loaded from CDN with a **pinned version**. Its config should stay Decap-compatible where possible, so Decap CMS remains a fallback.
- **Cloudflare Pages** for hosting. `sveltia-cms-auth` on Cloudflare Workers for GitHub OAuth.
- **Fontsource** to self-host Source Serif 4 (headings) and DM Sans (body). No Google Fonts requests, no analytics, no trackers.
- **Pagefind** for static search (later phase).
- **Turndown** for the WordPress HTML → Markdown migration.

Check current docs and versions for each tool before using it; don't rely on memory for APIs. Ask me before adding any dependency not listed here.

## Inputs

- `_input/design-system/`: the design system handoff (I'll copy it in from my OneDrive). Key files:
  - `project/README.md`: brand brief with colour, type and component rules.
  - `project/colors_and_type.css`: the **canonical** CSS variables. Use these; don't invent colours.
  - `project/assets/logo/`: the carbonate-ion logo (primary, reversed, mono, favicon SVGs).
  - `project/assets/icons/`: category and rule icons (1.5 stroke, `currentColor`).
  - `project/source-docs/efnis-mockup.html`: hi-fi mockup of three pages.
  - `project/ui_kits/website/`: React-style components mirroring efn.is. Port these to `.astro` components; don't ship React for static markup.
- `_input/content/`: homepage content draft (`efnis-homepage-content.md`), the bylaws (`Lög_Efnafræðifélags_Íslands`), the 2024 conference page (`Ráðstefna_2024.pdf`), and the fact-checked Þumalputtareglur if I've added them.

Palette: the May 2026 Forest-teal + Amber + Basalt palette is current (primary `#1a6b5a`, primary dark `#0f4a3e`, basalt `#1c2a26`, amber `#d4872e`, as defined in `colors_and_type.css`). **Do not** reintroduce the retired indigo (`#1e3a5f`, `#142d4c`) or copper (`#c0703a`) palette, and don't use the old Kadence teal `#0d7377` or gold `#d4a017`.

## Site structure

Icelandic is the default language at the root. English lives under `/en/`. Keep the existing WordPress slugs:

- `/`: Forsíða
- `/efnafradi-a-islandi/`: Efnafræði á Íslandi (research, industry, geothermal)
- `/menntun/`: Menntun og úrræði
- `/radstefnur/` and `/radstefnur/<year>/`
- `/frettir/` and `/frettir/<slug>/`
- `/vidburdir/` and `/vidburdir/<slug>/`
- `/um-efnis/`, `/um-efnis/felagsadild/`, `/um-efnis/stjorn/`, `/um-efnis/log/`
- `/en/`: English homepage (content from the English section of `efnis-homepage-content.md`), plus English versions of entries that have them

English is optional per entry. An entry without an English version simply doesn't appear under `/en/`; never show Icelandic text on an English page.

## Homepage

Follow the mockup and `efnis-homepage-content.md`:

1. Hero: society name, tagline, intro paragraph.
2. Four cards: Efnafræði á Íslandi, Menntun og úrræði, Ráðstefnur Efnís, Gerðu þig félag.
3. **Næsti viðburður**: computed at build time as the next upcoming entry in the viðburðir collection. If there is none, show a fallback text I can edit in the CMS.
4. Fréttir: the three latest news items, plus a link to the archive.
5. Membership call to action.
6. Footer: contact email, links to lög, stjórn and English.

## Content model

Each collection needs a Zod schema **and** a matching Sveltia collection. Keep the two in sync, and add a small check script that fails if a field exists in one but not the other. Invalid content must fail the build; the live site then stays on its last good deploy. That property is a selling point for the board, so preserve it.

For i18n, use Sveltia's `multiple_files` structure (`<slug>.is.md`, `<slug>.en.md`). Field labels, hints and collection names in the CMS config are in **Icelandic**.

- **frettir** (Fréttir): `title` (i18n, required), `date`, `summary` (i18n), `image`, `featured` (boolean), `body` (i18n, rich text). File slug: `{{year}}-{{month}}-{{day}}-{{slug}}`.
- **vidburdir** (Viðburðir): `title` (i18n, required), `start` (datetime), `place`, `registration_url` (optional), `body` (i18n).
- **sidur** (Síður): `title` (i18n, required), `body` (i18n). Set `create: false` and `delete: false` so editors can edit fixed pages but not break the menu.
- **radstefnur** (Ráðstefnur): `number`, `year`, `date`, `theme` (i18n), `venue`, `programme` (list of `time`, `code`, `title`, `speaker`), `sponsors` (list of `name`, `logo`, `url`), `prices` (list of `label` (i18n) and `amount`), `committee` (list of names), `body` (i18n). Model the 2024 conference from the PDF as the first entry.
- **stjorn** (Stjórn): `name`, `role`, `order`. Plain data, no photos needed yet.
- **settings**: a single file for editable site-wide text (the Næsti viðburður fallback text, the membership fee, the contact email).

Media goes in `public/images/uploads/`, referenced as `/images/uploads/...`.

## Icelandic language rules

- Icelandic copy comes **from me or from the input files**. Don't write new Icelandic prose. Where copy is missing, insert a visible placeholder like `TODO(texti): lýsing á …` and list all placeholders in your phase summary.
- Format dates with `Intl` using `is-IS` ("25. október 2024"); use `en-GB` on English pages.
- Set `lang="is"` or `lang="en"` correctly on every page.
- Known pitfalls if you touch copy: "kemísk efni" carries a danger connotation in everyday Icelandic; *geislun* (radiation) and *geislavirkni* (radioactivity) are distinct terms, and "geislavirk geislun" is not established usage.
- Slugs transliterate þ→th, ð→d, æ→ae, ö→o and strip other diacritics (á→a, í→i, …).

## Quality floor

Responsive down to phone width, visible keyboard focus, `prefers-reduced-motion` respected, WCAG AA contrast, semantic HTML, no layout shift from fonts. Lighthouse 95+ on performance and accessibility is the target. The CMS preview (Sveltia `preview_styles`) should load the site's CSS, so previews look like the real site.

## Phases

Work one phase at a time. At the end of each phase: run the build, commit, then **stop** and give me a short summary. Include what was done, decisions you made and why, placeholders left, and anything I need to do by hand. Wait for my go-ahead before the next phase. Commit in small logical steps with clear messages.

**Phase 0: Setup and plan**
- Check that `_input/` has what's listed above, and tell me what's missing.
- `git init`, `.gitignore`, a scaffolded Astro project (TypeScript, strict).
- Create `CLAUDE.md` with a condensed version of this file (context, constraints, stack, language rules, working rules), plus an empty "Decisions log" section you'll append to as we go.
- Read the design system and mockup, then propose the component list and any open questions. Don't build components yet.

**Phase 1: Design and skeleton**
- Global tokens from `colors_and_type.css`, self-hosted fonts, logo and favicon.
- Port layout components (header with language switch, footer, hero, card, news list item, event block, CTA) as `.astro` components.
- All routes above, rendering placeholder content.

**Phase 2: Content model and CMS**
- Collections, schemas, the schema-vs-CMS sync check, and `public/admin/` (`index.html` and `config.yml`).
- Make the CMS usable locally via Sveltia's local repository workflow in Chrome/Edge, so I can test editing before OAuth exists.
- Seed content from `_input/content/`: homepage text, lög, félagsaðild, the 2024 conference, and the English page.

**Phase 3: WordPress migration**
- A script in `scripts/` that reads all published posts and pages from `https://efn.is/wp-json/wp/v2/` (public endpoints, paginated), converts them to Markdown with frontmatter matching the schemas, and downloads referenced media.
- Strip inline `<style>` blocks and Kadence/Gutenberg wrapper markup. Several pages (notably Forsíða) had embedded styles, so report which items needed manual layout decisions instead of guessing.
- Write a `redirects-draft.txt` mapping old WordPress URLs to new ones (for a later Cloudflare `_redirects` file). Don't activate it yet.

**Phase 4: Deploy preparation**
- Cloudflare Pages build settings, `sveltia-cms-auth` setup notes, and the `backend` section of the CMS config (with a placeholder repo name).
- A GitHub Action for a daily scheduled rebuild via a deploy hook stored as a repo secret, so "Næsti viðburður" rolls over.
- A step-by-step checklist of the manual steps I must do (GitHub org, OAuth app, Cloudflare account, secrets, inviting board members). Don't attempt any of them yourself.

**Phase 5: Polish for the demo**
- Pagefind search.
- Nordic chemistry events from Kemisamfundet's iCal feed (`https://kemisamfundet.se/?post_type=tribe_events&ical=1&eventDisplay=list`), fetched at build time. The build must **not** fail if the feed is down.
- `docs/hvernig-vefurinn-virkar.md`: a handover document for future board members, drafted in plain English with a clear structure. I'll translate and finalise it, so keep it short.
- A demo checklist: what to show, in what order, and what to verify on a phone beforehand.

## Working rules

- Prefer boring, well-documented solutions. The next maintainer may be a board member with modest web skills.
- Keep dependencies few. Every dependency is future maintenance.
- When something in this brief conflicts with what the tools actually support, stop and tell me rather than working around it silently.
- Log every non-obvious decision in `CLAUDE.md` under "Decisions log".
