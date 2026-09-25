# Efnís Website UI Kit

Click-thru recreation of **efn.is** — built from the hi-fi mockup in `source-docs/efnis-mockup.html` plus the live-site CSS-token list documented in `source-docs/utlitshandbok-drog.md`.

## Pages
- **Forsíða** — sticky header → indígó hero → þumalputtareglur carousel (15 cards, alternating border) → 3-column "Nýjast frá Efnís" with category icons → kopar-cta band → footer.
- **Þumalputtareglur** — long-form rules page (first 6 rules shown, alternating numerals).
- **Ráðstefnusíða** — page hero, 2/1 main+sidebar split, schedule, info cards.
- **Fréttasíða** — narrow-column article, byline avatar, blockquote, pill tags.

## Components
| File | Exports | Purpose |
|---|---|---|
| `Primitives.jsx` | `Icon` `Pill` `Button` | Shared atoms |
| `SiteHeader.jsx` | `SiteHeader` `EfnisMark` | Sticky nav + carbonate-mark lockup + member-CTA |
| `HeroBand.jsx`   | `HeroBand`   | Indígó-gradient homepage hero w/ decorative ring |
| `RulesCarousel.jsx` | `RulesCarousel` `RULES_DATA` | Scroll-snap carousel of 15 cards |
| `CategoryColumns.jsx` | `CategoryColumns` `PostList` | 3-column "latest from category" grid |
| `Footer.jsx`     | `CtaBand` `SiteFooter` | Membership band + 4-col footer |
| `Pages.jsx`      | `PageHero` `ConferencePage` `ArticlePage` `RulesPage` | Subpage layouts |

## Run
Open `index.html` in any modern browser. Bottom tab-strip switches between the four pages.

## What's intentionally fake
- Nav links and form submits are no-ops.
- Olympiad team archive and *Bókagjafir* — referenced in IA but not recreated; they're long historical lists, not visual-system surfaces.
- No login / member-area mock — the live site's "Gerast félagi" is currently an external link.
