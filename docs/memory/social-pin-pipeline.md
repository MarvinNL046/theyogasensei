---
name: social-pin-pipeline
description: Code text-layer pipeline (satori+sharp) for Pinterest pins and Instagram posts in brand fonts — 65 pins + 9 IG posts generated
metadata: 
  node_type: memory
  type: project
  originSessionId: 845874c6-5116-415a-8f3c-6d6490b225cb
---

The social-image pipeline built on launch day (2026-05-31). Text is rendered by
**code, never diffusion** (diffusion garbles text — see [[social-media-plan]]).

**Pipeline:** `satori` lays out brand text/scrim in real brand fonts → SVG →
`sharp` rasterises and composites over an existing on-brand photo resized to a
cover. **Use `embedFont: true`** (satori's default): the outline-path mode
(`embedFont: false`) mis-spaces text with these fonts — drops spaces between
words and inserts a space before punctuation ("thickness , material"). With
`embedFont: true` sharp still rasterises correctly on Windows. Bug caught + fixed
during the launch-day build (verified with a side-by-side).

**Scripts (run with `npx tsx`, no package.json entry):**
- `scripts/generate-pins.ts` → `public/images/pins/<slug>/*.png` (1000×1500) +
  `_pins.md` per guide. Holds a `GUIDES` array with hand-tuned 5-angle hooks
  (listicle / problem / comparison / aesthetic / checklist) for **all 13 guides
  = 65 pins**. Backgrounds: readdir `public/images/guides/<slug>/*.webp` for
  angles 1/2/3/5, a rotating Aiko photo for the aesthetic angle (4), brand-pool
  fillers if a folder is short. Descriptions in `_pins.md` = each guide's
  metaDescription + a per-topic hashtag set. To add a guide: append to `GUIDES`.
- `scripts/generate-ig.ts` → `public/images/social/instagram/*.png` (1080×1080)
  + `_ig.md`. 9-post starter grid; modes: photo / tip / quote-dark / card-cream.

**Fonts:** static TTFs in `scripts/assets/fonts/` (CormorantGaramond-400/600/700,
Inter-500/600, NotoSerifJP-600), from the fontsource jsDelivr CDN. Brand serif is
**Cormorant Garamond** (not plain Cormorant — easy mistake) per `src/styles.css`.
Palette: cream `#faf6ef`, clay `#c45a3e`, ink `#2b2a27`, olive ink `#23261c`;
brand mark `継続は力なり` (persistence). **New dev dependency:** `satori` 0.26.

**Decisions (2026-05-31):** Marvin approved the look + approved scaling to all 13
guides; generated images stay under `public/` (deploy with the site). Hook copy in
`_pins.md`/`_ig.md` is a first draft — edit before posting. Marvin posts 3–5
pins/week, backfilling the 65 over ~6–8 weeks ([[social-media-plan]]).

**Honest framing baked in:** no fabricated testing, Aiko decorative only (never a
claimed teacher), no medical claims, no emoji/exclamation.

Status: **DONE** — 65 pins + 9 IG starter posts generated and visually QA'd.
[[feedback-pace]] (approve-before-scale honoured).

**Update 2026-06-18 — pose pins + the live count.** The generator now spans **19
entries (18 guides + 1 pose) = 95 pins**. `generate-pins.ts` gained two optional
fields on a `Guide` entry — `route` (URL segment, default `guides`; use `poses`
for `/poses/<slug>` pages) and `bg` (an explicit 5-background array that bypasses
the guide-folder readdir, for pages with no `public/images/guides/<slug>/` folder)
— plus an optional slug-filter arg (`npx tsx scripts/generate-pins.ts childs-pose`
builds just that one, so you don't regenerate all 90). First pose pin: `childs-pose`
(Mindful Living board), built from the existing local Aiko photos
(`aiko-childs-pose-sage-yoga-mat.webp`, `aiko-meditation-back-view-sage-yoga-mat.webp`)
— no new Higgsfield generation.

**Update 2026-06-18 — starter comments are now standard.** After publishing a pin,
add one brand-voice starter comment under it ("om het gesprek op gang te brengen"):
first-person, honest, ends on a question, no emoji/exclamation, tied to the pin's
topic. Done for all 10 then-live pins on 2026-06-18. Low priority for the click-KPI
(KPI = outbound clicks, not comments) — it's an engagement-signal nicety, not a
main lever.
