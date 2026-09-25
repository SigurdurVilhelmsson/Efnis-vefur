# Fonts — assets/fonts/

Self-hosted brand fonts, in WOFF2 format. Loaded by `colors_and_type.css` at the project root via `@font-face` declarations.

| Family | Weights | Subsets | Files |
|---|---|---|---|
| **Source Serif 4** | 400, 500, 600, 700 | `latin`, `latin-ext` | 8 |
| **DM Sans** | 400, 500, 600, 700 | `latin`, `latin-ext` | 8 |

Total payload: **~240 KB** for 16 files. Most pages will load fewer than half — browsers only fetch the unicode-range subset they need, and most copy on efn.is is plain Icelandic (covered by the `latin` subset; `latin-ext` is included so Central-European names render correctly if they appear).

## Provenance

Files are originally from **Google Fonts**, redistributed by [Fontsource](https://fontsource.org/) under the **SIL Open Font License 1.1**. Source URLs were:

- `https://cdn.jsdelivr.net/fontsource/fonts/source-serif-4@latest/{subset}-{weight}-normal.woff2`
- `https://cdn.jsdelivr.net/fontsource/fonts/dm-sans@latest/{subset}-{weight}-normal.woff2`

Both fonts are free for commercial use; no attribution is required in the rendered output but the licence text should accompany any redistribution of the font files themselves. Carry the OFL with you if you copy these files into another project.

## Updating

Bump versions by re-downloading from the same Fontsource URLs (replace `@latest` with a pinned version if you want reproducibility — `@5.0.10` etc.). If a new weight is added to the design system later, follow the same naming pattern (`<family>-<weight>-<subset>.woff2`) and add matching `@font-face` rules to `colors_and_type.css`.

## Why not the variable font?

Source Serif 4 has a true variable font (opsz + wght axes). We're using the static-weight cuts instead because:
1. The design system only uses four discrete weights; the optical-size axis benefit at 16–48px text sizes is negligible.
2. Static cuts give a smaller per-page payload (only the weights actually used).
3. Static cuts have better fallback handling in older Safari versions still seen in WordPress audiences.

If a future need arises for, say, the *birefringence ghost* at a very large display size, the variable VF can be added without removing the statics.
