# Texti — tillögur (copy proposals)

Icelandic copy drafted by Claude at Siggi's request (2026-09-26), for the
remaining `TODO(texti)` placeholders. **Status per item:** *proposed* = not yet
used on the site; Siggi edits or approves before it goes in. *Approved* = in use.

## Approved and in use

- Next-event fallback (Settings): „Enginn viðburður er á dagskrá í augnablikinu.
  Tilkynningar um viðburði birtast hér og í tölvupósti til félagsmanna."
- Conference registration/abstract labels (`src/lib/i18n.ts`, marked `// (UI)`):
  Skráning · Frestur · Skráningu er lokið. · Ágrip · Senda inn ágrip ·
  Sniðmát fyrir ágrip · Lokað hefur verið fyrir innsendingu ágripa.

## In use, not yet explicitly approved

- CMS hint on event start (`public/admin/config.yml`): „Ef tími er ekki
  ákveðinn, veldu kl. 00:00; þá birtist aðeins dagsetningin."

## Proposed

**Menntun — intro** (`src/content/sidur/menntun.is.md`)
> Eitt af hlutverkum Efnafræðifélags Íslands er að efla efnafræðikennslu á
> Íslandi. Félagið hefur staðið fyrir árlegri landskeppni í efnafræði meðal
> framhaldsskólanema frá skólaárinu 2001–02, ólympíulið Íslands keppir á hverju
> sumri í Norrænu og Alþjóðlegu ólympíukeppnunum í efnafræði og félagið veitir
> afburðanemendum sem útskrifast úr framhaldsskóla bókaverðlaun.

**Efnafræði á Íslandi — intro** (`src/content/sidur/efnafradi-a-islandi.is.md`)
> Efnafræði er stunduð víða á Íslandi: í háskólum og rannsóknastofnunum, í
> iðnaði og í skólum landsins. Hér má finna íðorðaskrá efnafræðinnar, sem
> íðorðanefnd félagsins vinnur að, og upplýsingar um Sprengjugengið, sem kynnir
> efnafræði fyrir almenningi.

Hub subpage cards use each page's first sentence as it stands (no new copy).

**404 page** (`src/pages/404.astro`)
> Síðan fannst ekki. Hún hefur mögulega verið færð eða fjarlægð.

**Past-events heading** (`src/pages/vidburdir/index.astro`): *Liðnir viðburðir*

**News 2024-10-25, Icelandic version** (the current English text moves to `.en.md`)
- Title: *Dagskrá og ágrip 10. ráðstefnu Efnís*
- Body:
  > Dagskrá ráðstefnunnar ásamt ágripum erinda má finna í
  > [ráðstefnuritinu](https://efn.is/wp-content/uploads/2024/10/EFNIS-2024_Prent_compressed.pdf).
  > Á síðustu stundu urðu smávægilegar breytingar á dagskrá dagsins og má nálgast
  > [uppfærða dagskrá hér](https://efn.is/wp-content/uploads/2025/01/Dagskra-Efnis-radstefna-2024.pdf).

**Facebook link** (placement approved: footer + About pages; wording proposed)
- Footer label: *Facebook-hópur Efnís* / *Efnís on Facebook*
- `um-efnis.is.md`, under „Hafðu samband" (adapted from the old WordPress contact page):
  > Einnig er hægt að líta við á [Facebook-hópi félagsins](https://www.facebook.com/groups/efnis/).
- `um-efnis.en.md`, under "Contact":
  > You can also visit the society's [Facebook group](https://www.facebook.com/groups/efnis/).

## Still needed from Siggi

- Board roles for four members (`src/content/stjorn/*.yml`)
- 2027 conference: details, registration and abstract text (is + en), once known
- Icelandic help texts and consent text for the SeaTable form (`docs/seatable-agrip.md`)
