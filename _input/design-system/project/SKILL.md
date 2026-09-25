---
name: efnis-design
description: Use this skill to generate well-branded interfaces and assets for Efnafræðifélag Íslands (Efnís / efn.is — the Icelandic Chemical Society), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick start

- **Drop-in tokens:** `<link rel="stylesheet" href="colors_and_type.css">` gives you the full Forest-teal + Amber + Basalt palette, type pair (Source Serif 4 + DM Sans), spacing, radii, shadows, and helper classes.
- **Logo:** four SVGs in `assets/logo/` (primary, reversed, mono, favicon). Inline them, recolour only by swapping the named variant — never recolour the primary.
- **Icons:** 18 SVGs in `assets/icons/` — inline them, do not `<img>`. They use `currentColor`.
- **UI components:** see `ui_kits/website/` for ready-made JSX components for site sections.
- **Tone:** Icelandic-first, calm, anti-sensational. No emoji, no exclamation marks. Read README → CONTENT FUNDAMENTALS for examples.

## Hard rules

- Two colours plus neutrals (teal + amber, with basalt + cream). Do **not** invent new hues. Teal dominates; amber is a highlight, never a background.
- Source Serif 4 for display, DM Sans for body. Don't substitute.
- The carbonate-ion mark is the anchor of the identity. Use the SVG variant that fits the context — do not recolour it.
- Icons stay 24×24, 1.5 stroke, `currentColor`, no fill.
- Cards = white, 6px radius, 3px coloured top border (alternate primary/accent in lists), shadow-md.
- Icelandic typography conventions: low-9/high-9 quotes, em-dashes, `,` decimal separator, `.` thousands, proper Ð/þ/æ/ö/á.
- Chemical formulas use Unicode subscripts (CO₂, H₂O), not `<sub>`.
