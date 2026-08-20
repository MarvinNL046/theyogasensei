---
name: homepage-progress
description: Where we left off building the homepage sections per /public/images/design-templates/1.Homepage Minimalistisch yoga website met Zen stijl.png
metadata:
  node_type: memory
  type: project
  originSessionId: ada7cc16-2010-43de-8098-d4d4179fb88b
---

Building the homepage **section by section** per template 1 reference image. Marvin's pace: one section per work block, study the template image before code, compare via Playwright MCP screenshots, iterate until matched. See [[feedback-pace]] for the why.

## ⚠️ CURRENT STATE (updated 2026-05-30) — read this first

The fully-built homepage documented below (all 10 sections) was **stripped to 3
sections during the minimal-launch** (commit `61d8523 "minimal launch surface"`).
Marvin is now **rebuilding section-by-section** (NOT restoring from git wholesale)
— adapting each section for honesty + the live `/guides` cluster.

Live homepage (`src/routes/index.tsx`) sections now (all in `src/features/home/`):
**Hero → Trust bar → Featured-guide band → "Latest writing" (10 guide cards +
"View all guides") → "Who writes this" (about teaser) → ensō lead-capture band.**
Three sections rebuilt + pushed 2026-05-30 (commits …5934062):

- **`HomeTrustBar`** — four-point credibility strip under the hero (Leaf/BookOpen/
  PersonStanding/Globe2), icon+title+subtitle, dividers on md+, no cards. Honest (no
  lab-test claim).
- **`HomeFeaturedGuide`** — dark olive split band (copy+CTA left, `review-hero-best-mats.webp`
  right) featuring best-yoga-mats-2026. Photo-led, NOT another ensō (distinct from lead-capture).
- **`HomeLeadCapture`** — dark `Section` + `zen-enso-dark-texture-bg.webp` (ensō right,
  scrim left) + the real `NewsletterCapture` in its new **`onDark` tone variant** (`tone`
  - `showHeader` props added; light card usage unchanged).

**Topic grid + URL-addressable filters — DONE (2026-05-30, commits 8b4aa24 + b513cec):**

- `/guides` filter state now lives in the URL (`?category=care`) via `validateSearch`
  - `navigate`. `categorySlug`/`categoryFromSlug` in `data.ts` map clean slugs ⇄ labels.
    `GuidesIndexView` is now CONTROLLED (`active` + `onSelect` props, no internal useState).
- **Hydration gotcha (fixed):** reading the `?category=` param on first render caused
  React #418 (prerendered HTML is the "All" view). Fix = a post-hydration gate in the
  route component (`useState(false)` + `useEffect(()=>setHydrated(true))`, `active =
hydrated ? categoryFromSlug(category) : 'All'`). Use this pattern for ANY URL-driven
  state on a prerendered route. Loader still reads no search params (SSG-safe).
- **`HomeTopicGrid`** — 5 tiles (real guide images) deep-linking to `/guides?category=<slug>`,
  between trust bar and featured band.

Only remaining template-1 section: **Top-picks product grid** — deferred (buildable
honestly with placeholder stars + "COMING SOON" + gated `/go/` links per
[[affiliate-ratings-policy]] + [[affiliate-gate-launch]]; needs product data + porting the
reference `ProductPickCard`/`TopPicksGrid`; old build `31cbb53` had it as "Sensei Picks").
Marvin called the homepage done-for-now after the topic grid.

**The full designed homepage is NOT lost — it's in git** at commit **`31cbb53`**
(623 lines, all sections, `TOPICS` data inline). Deps still exist (Section,
Container, Eyebrow, JapaneseAccent). Reference image still at
`public/images/design-templates/1.Homepage…png`; section building-blocks also in
`src/design-references/features-reviews/`.

**On recovery, adapt these (don't blind-restore):**

1. Sensei Picks subtitle "tested and approved" → honest (we don't test).
2. Ratings → placeholder stars until PA-API live; then real Amazon ratings — see [[affiliate-ratings-policy]].
3. Topic-grid + picks link to ARCHIVED routes (`/gear`, `/poses`, `/styles`, `/start-here`) that no longer exist → remap to the live `/guides` cluster.
4. Year "2024" → 2026; merge with the current head (www canonical + og:image already fixed in index.tsx).

**Approach (Marvin to choose next session):** A = recover from git + adapt (faster, one PR) · B = section-by-section per the workflow below. Deferred to a future session.

## Status as of 2026-05-19 (the full build — now stripped, see above)

**Done (verified at desktop 1440; mobile/tablet/ultra-wide previously verified or visually confirmed by Marvin):**

1. **Foundation** — design tokens (`src/styles.css`), Cormorant Garamond + Inter + Noto Serif JP via `@fontsource`, primitives at `src/components/ui/` (Container, Section, Eyebrow, JapaneseAccent)
2. **Header** — cream sticky bar, enso logo + wordmark + 練習 kanji, nav `GUIDES · REVIEWS · PRACTICE · JOURNAL · ABOUT` (uppercase tracked, JOURNAL points at /guides), olive Start Here pill, disabled search icon (lucide), mobile hamburger
3. **Footer** — dark olive, mark logo, link columns, JapaneseAccent persistence brand-mark
4. **Hero** — asymmetric split, text left ~5/12 with `練習・学び・成長する。` kicker + 3-line headline + italic 2-line vervolg + body + EXPLORE JOURNAL/START HERE CTAs. Image right bleeds to viewport edge using `lg:absolute lg:right-0 lg:w-[58%]` capped at `lg:max-w-[920px] 2xl:max-w-[1100px]` to prevent overlap at ultra-wide. Uses new `/public/images/hero/aiko-meditation-mountain-shoji.png` (1536×1024, `継続は力なり` baked into the shoji on the right). `object-right` keeps the kanji visible at all widths. Mobile stacks (image below text).
5. **Trust bar** — clean editorial strip immediately under hero, `border-y` + cream bg, 4 items in `Container size="default"` (max-w-6xl): Leaf · BookOpen · PersonStanding · Globe2 (Lucide, sage olive color, strokeWidth 1.25). Uppercase tracked titles, stone body text, vertical dividers between columns on lg+. NO cards, NO shadows. Copy: "Honest & Independent / In-Depth Guides / Practice First / Mindful Living".
6. **Topic grid** (2026-05-19) — 6 tiles in `lg:grid-cols-6`, `aspect-square rounded-2xl ring-1`. Horizontal gap tightened from `gap-x-5` → `gap-x-3` (12px) to match template rhythm. Photography now mixes 3 object/lifestyle scenes (Yoga Mats = rolled sage mat + olive branch, Yoga Tips = open journal + tea + linen, Meditation = stacked zen stones + bonsai + incense) with 3 Aiko poses (Beginner = child's pose, Breathwork = cropped chest+hands close-up in dark olive top, Yoga Styles = Warrior II). Assets generated via GPT Image 2 from canonical Aiko prompts (Asian guide early 30s, dark hair in bun, charcoal/olive yoga set, Japanese studio, sage mat, warm morning light). Live at `/public/images/brand/topic-*.png`. Eyebrow "OUTLINE BY TOPIC" + serif h2 "Everything you need / for your yoga journey." + "VIEW ALL TOPICS →" link, all left-stacked.

7. **Featured Review dark band** (2026-05-19) — bg switched to `japanese-zen-editorial-background.png` (textured dark stone with enso brush right + baked 集中 kanji + red seal left). Full-opacity image, no tinted overlay (Marvin: "geen lichte groene waas"). Black-only left-side gradient overlay (`from-black/65 via-black/30 to-transparent`) keeps text legible without olive tint. Mat-foto kept right per template 1 — removed the prior `mask-image: linear-gradient(to right, transparent, black 14%)` fade and the `bg-[color:var(--color-olive-deep)]` wrapper because those were designed against a solid olive bg, and against the new stone bg they made the photo render as a dark rect. Replaced wrapper bg with `ring-1 ring-black/40` for a subtle edge. Removed the DOM `JapaneseAccent phrase="stillness"` because the bg image already has 集中 baked in left — avoid double-stacked kanji. Aiko-rolling-out-mat photo now blends naturally with the stone texture.

8. **Sensei Picks** (2026-05-19) — layout was already correct (5 cards grid, TOP PICKS eyebrow, serif h2 "Our top recommendations, tested and approved.", disabled carousel arrows, badge + serif name + muted brand + empty stars + COMING SOON tracked caps). Fix was purely photographic: replaced 5× Aiko-in-yoga-poses with 5 product close-ups in the same dark zen editorial aesthetic (warm wooden studio floor, shoji + cream plaster bg, warm morning light, olive branch / ceramic accents, no people, no logos). Live at `/public/images/brand/pick-*.png` (manduka-pro, cork-blocks, cotton-strap, studio-bolster, yoga-wheel). Empty stars + COMING SOON badge preserved per voice rules (no fake reviews/prices).

9. **Latest Articles** (2026-05-19) — layout was already correct (FROM THE JOURNAL eyebrow, serif h2 "Latest articles & insights", right-aligned "VIEW ALL ARTICLES →" link, 3-column grid, aspect-[4/3] rounded image, clay category eyebrow, serif title, blurb, date · read time meta with low-opacity bullet separator). One-line fix: replaced card 1 image from the rommelige `aiko-yoga-pose-collage-japanese-studio.png` (a literal collage of mini-Aikos) to the clean single `aiko-warrior-ii-yoga-pose.png` — visual rhythm now consistent across all three cards. Cards: Warrior II (Routine — Morning Yoga Routine) / Meditation back-view (Practice — habit) / Upward Dog (Pose Guide — Sun Salutation, fits Surya Namaskar sequence).

10. **Newsletter band** (2026-05-19) — layout was already correct (dark olive full-width, MINDFUL INBOX eyebrow, serif h2 "Mindful insights. Straight to your inbox.", body, email input + JOIN clay pill, "No spam" disclaimer). Right panel: replaced the placeholder `JapaneseAccent phrase="habits"` typographic rect with a bonsai editorial photograph — small Japanese bonsai in matte-charcoal ceramic pot on warm wooden surface, steaming tea cup in soft background, shoji edge with morning side light. Panel aspect changed from `aspect-[4/3]` → `aspect-[3/2]` to fit the landscape 1536×1024 image. Live at `/public/images/brand/newsletter-bonsai.png`. Subtle `ring-1 ring-black/40` for edge definition.

**🎉 Homepage template 1 is complete — all 10 sections refined per design.**

**Established workflow (proven this session):**

1. Open `/public/images/design-templates/1.Homepage Minimalistisch yoga website met Zen stijl.png` via Read tool — study the section in detail.
2. Read current render via Chrome MCP (Playwright) at viewports 1440 (primary), 375 (mobile-first check), 768 (tablet), 2560 (ultra-wide sanity).
3. Write out section-by-section comparison table (template vs current).
4. Ask Marvin for any ambiguity before coding.
5. Edit, then re-screenshot all viewports.
6. Iterate until match.

**Open follow-ups for later sessions:**

- `/sensei-picks` and `/mindful-journal` brand routes don't exist yet (Marvin liked these names). Currently JOURNAL nav points at `/guides`.
- Route refactor decision: `/guides` → `/journal`, `/gear` → `/reviews` (better SEO intent signal) — significant churn, separate session.
- Search icon in header is disabled placeholder — wire up when `/search` route exists.
- Hero image's `継続は力なり` is baked into the photo (not DOM text) — accessibility tradeoff Marvin accepted. Long-term: consider clean version + DOM overlay.

See [[design-system-decisions]] for palette/font reconciliation, [[japanese-typography]] for kanji rules, [[feedback-pace]] for working rhythm.
