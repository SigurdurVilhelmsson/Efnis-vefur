# Fonts

Self-hosted woff2 files for **Source Serif 4** (headings) and **DM Sans** (body), weights 400–700, `latin` + `latin-ext` subsets.

- Copied from the design system (`_input/design-system/project/assets/fonts/`). They are Fontsource builds of the Google Fonts originals.
- Licence: SIL Open Font License 1.1, see `OFL-DMSans.txt` and `OFL-SourceSerif4.txt` (taken from the `@fontsource/*` 5.3.0 npm packages).
- Loaded through Astro's Fonts API (`fonts` in `astro.config.mjs`, `<Font>` in `BaseLayout.astro`). Astro copies them into the build and generates metric-matched fallback fonts, so text doesn't jump when the web font arrives.
