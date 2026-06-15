# Next-session start prompt

Paste the block below at the start of the next session to resume quickly.
(Last updated 2026-06-15.)

---

```
Hoi! We werken aan TheYogaSensei (affiliate yoga-site).
Lees eerst je memory voor de volle context (MEMORY.md + de project_* / feedback_* files), vooral:
- project_reviews_redesign  → 5 review-pagina's live op /reviews/*
- project_pinterest_live     → pin-systeem + wat al gepost is (niet dubbelen!)
- feedback_color_system + feedback_image_character_convention → design- & beeldregels
- reference_* (SEO-playbook) + eeat-guidelines

Stand van zaken: de mat-review-cluster staat volledig op het nieuwe editorial-design
(roundup + 5 detailpagina's), live + SEO-gemigreerd. Pinterest-drip loopt (~1 pin/dag).

Werkafspraken:
- echte repo = /home/marvin/Projecten/theyogasensei-github
- commit + push per afgeronde stap
- eerlijke E-E-A-T: geen verzonnen tests/scores, onze eigen redactionele rubriek
- visueel checken in Chrome (localhost:3000) voor je "klaar" zegt
- pins: copy + 5 beeld-varianten staan in public/images/pins/<slug>/_pins.md
  → upload de 0X-*.png (mét tekst), NIET de kale guides/<slug>/pin.webp

Begin met een korte status + jouw voorstel voor de beste volgende stap vandaag.
Opties die ik in gedachten heb:
1. Pinterest: 1 verse pin posten (Jade/Gaiam/Lululemon/Retrospec staan klaar)
2. Nieuwe content: een pose/guide/review erbij, of een money-page updaten
3. Iets dat jij aandraagt
```

---

## Snelle status (2026-06-15)

**Af & live:**
- 6 review-pagina's op nieuw editorial-design: `/reviews/best-yoga-mats` (roundup) +
  `/reviews/{manduka-pro,jade,gaiam,lululemon,retrospec}` (detail). Canonical, in sitemap,
  oude `/guides/*` reviews 301'd → `_drafts`, IndexNow gepingd.
- v4 `@theme` design-tokens (ivory/olijf/sage/taupe), olijf koppen, charcoal labels, scherpe hoeken.
- Homepage: meditatie-hero, ensō nieuwsbrief-banner, TopPicks-sectie.

**Pinterest gepost (niet dubbelen):** week-1 (best-yoga-mats-2026 ×2, hot-yoga, eco, how-to-choose,
how-thick) + 2026-06-15 manduka `02-problem` → /reviews/manduka-pro.

**Logische volgende stappen:**
- Pinterest-drip doorzetten (~1/dag): Jade/Gaiam/Lululemon/Retrospec pins staan klaar.
- Nieuwe content of money-page updates (~1–2/week) voor autoriteit.
- Optioneel: rich detail-pagina's bestaan nu als herbruikbare `ReviewDetail`-component —
  nieuwe producten zijn snel toe te voegen (data-file + thin route + migratie).
