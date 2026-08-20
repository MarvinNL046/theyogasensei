# Social Media Plan — theyogasensei.com

**Status:** READY TO ACTIVATE (2026-05-31). The "content fuller" trigger is met —
14 guides published, mat cluster complete. Pinterest is phase 1. See
`_tomorrow-launch-plan.md` for the launch-day sequence (GSC first, then this).
**Primary goal:** drive **traffic to the guides** (not direct social sales).
**Approved by Marvin 2026-05-29.**

## Funnel role

This is an SEO + affiliate site. Social = top-of-funnel:
`social → guide page → newsletter (Convex) → affiliate (after Associates approval)`.
Social's KPI is **outbound clicks to guides**, not likes/followers.

## Channel priority

1. **Pinterest — phase 1, ~80% of effort.** Buyer-intent + search-driven +
   evergreen pins + format selects for tutorial/curation. Already baked into the
   site (every cluster has a 1000×1500 pin + Rich Pin metadata).
2. **Instagram — brand-building, low affiliate ROI.** Aiko/zen aesthetic fits;
   links only in bio. Later phase.
3. **Facebook — lowest effort, just repurpose** Pinterest/IG content. No own strategy.
4. **TikTok / video (Higgsfield) — experimental, later phase.** See guardrails.

## Honest-framing + AI guardrails (apply to ALL social)

- No fabricated testing language ("we tested", "in our lab") — same as on-site.
- Ratings only from Amazon, real + attributed, once PA-API is live — see
  [[affiliate-ratings-policy]]. No fabricated scores on pins.
- No medical claims.
- **Aiko stays a DECORATIVE brand visual, never a claimed real teacher/expert.**
  Critical for video: do NOT make AI-Aiko "demonstrate poses" as if a real
  instructor (authenticity + instruction/medical risk). Use AI video as
  ambiance/b-roll (mat unrolling, calm studio, bonsai) with text overlays of the
  real honest tips — not fake tutorials. Label AI content where TikTok/Meta require.
- Marvin's real voice/POV is the authenticity anchor — lean on it over a fully
  synthetic persona.

---

## PHASE 1 — PINTEREST (the full plan)

### Core lever: multiple fresh pins per guide

Pinterest rewards NEW pins over repins. So per guide make **4–5 distinct pins**
(different image + hook), all linking to the same guide URL. 7 guides × ~4 =
~30 pins that drive evergreen traffic. New guide → 4–5 pins at publish.

### Pin-type formula (5 angles per guide)

1. Number/listicle hook — "7 Honest Yoga Mat Picks (2026)"
2. Problem/question hook — targets the searcher's pain ("Bad knees in yoga?…")
3. Comparison/infographic — thickness/material comparison, visual
4. Aesthetic/lifestyle — calm Aiko/studio image, subtle title (broad reach)
5. Single honest tip / checklist — standalone value pin

### TECH DECISION (important): text via code-template, NOT diffusion

Diffusion models garble text. So:

- **Higgsfield** generates the **imagery layer** (studio/Aiko via the Soul,
  product shots) — on-brand, consistent.
- A **code-template** (HTML+Playwright OR SVG→sharp) overlays the **text** in
  brand fonts (Cormorant serif, cream/olive/clay, ensō mark, whitespace, 1000×1500).
- Same pipeline already used for the og-image + favicon. Gives crisp, repeatable,
  premium pins. Build this template once, reuse forever.

### Board structure (mirror the clusters; start small)

Yoga Mats & Gear · Yoga for Beginners · Eco / Sustainable Yoga · Mindful Living.

### Copy (Pinterest = search engine)

- **Title:** keyword first + benefit (e.g. "Best Yoga Mat for Bad Knees: Cushion Without the Wobble").
- **Description:** 2–3 keyword-rich sentences (primary + secondary from
  `used-keywords.md`) + 3–5 hashtags. Guides already have `pin.description` — extend per variant.
- **Link:** always the specific guide URL (https://www.theyogasensei.com/guides/…).
- **Rich Pins:** metadata already on-site — just needs claiming.

### Cadence (solo-realistic)

**3–5 fresh pins/week.** Backfill the ~30 pins over ~6–8 weeks. Not 20/day (spam/burnout).
Schedule via Pinterest native scheduler or Tailwind.

### Account prerequisites (Marvin's steps — I can't do these)

1. Pinterest **Business account** (free) + **claim domain** theyogasensei.com →
   activates Rich Pins + analytics + attribution.
2. Schedule/post pins (I generate; Marvin or a scheduler posts).

### Measurement

Pinterest Analytics (outbound clicks) + GSC/Vercel referral from pinterest.com →
mapped to guides. **Outbound clicks = the KPI.**

### First execution step (when we start)

Build the **pin design-template** (code text-layer) + generate a **proof set of
4–5 pins for one guide** (proposed: the `best-yoga-mats-2026` hub — most reach) →
Marvin approves the look → scale to all 7 guides. ("Build one, approve, then scale.")

---

## LATER PHASES (parked)

- **IG Reels / TikTok:** Higgsfield ambiance/b-roll video (Seedance/Kling) +
  text-overlay tips, decorative Aiko, AI-labeled. Repurpose as Pinterest Idea Pins.
- **Facebook:** auto-repurpose Pinterest/IG.
