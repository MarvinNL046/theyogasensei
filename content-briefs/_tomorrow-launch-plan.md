# Plan — 2026-05-31 (launch day)

**Theme:** flip the site from "built" to "found". Get indexed by Google first,
then activate Pinterest (phase 1), set up a light Instagram presence, and lock a
weekly content rhythm.

**State today (2026-05-30):** site fully live on www, single opt-in + unsubscribe
working, 14 guides published (the yoga-mat cluster under the
`how-to-choose-a-yoga-mat` pillar — tight + complete = good launch shape).
Subscriber tables clean. Welcome email redesigned. → **Content is launch-ready
for the mat cluster.**

Legend: **[M]** = Marvin only (accounts/DNS, I can't). **[C]** = I (Claude) do it.

---

## BLOCK 1 — The real Google launch (do this first, highest ROI)

1. **[M] Google Search Console** — add property `https://www.theyogasensei.com`,
   verify (DNS TXT or the existing meta/HTML method).
   → *Verify:* property shows "Ownership verified".
2. **[M] Submit the sitemap** in GSC: `sitemap.xml`.
   → *Verify:* GSC Sitemaps shows "Success", 21 URLs discovered.
3. **[M] Request indexing** for the money pages via URL Inspection: the pillar
   (`/guides/how-to-choose-a-yoga-mat`), `/guides/best-yoga-mats-2026`, and the
   3 accessory pages.
   → *Verify:* URL Inspection says "URL is on Google" or "Indexing requested".
4. **[M] Bing Webmaster Tools** (5 min, optional) — add site, import from GSC.
   IndexNow already pings on deploy, so Bing/Yandex get pinged automatically.
5. **[C] Pre-flight check** — re-confirm robots.txt allows crawl, canonicals are
   www, sitemap is current, every guide returns 200.
   → *Verify:* a crawl of the sitemap returns 200 + correct canonical on each.

> Why first: social drives spikes; Google is the compounding engine for an SEO
> affiliate site. Nothing ranks until it's indexed.

---

## BLOCK 2 — Pinterest (phase 1, ~80% of social effort)

The full plan already exists in `_social-media-plan.md` (approved 2026-05-29).
Its trigger ("content fuller") is now met. Execute it:

6. **[M] Pinterest Business account** (free) + **claim the domain**
   theyogasensei.com → activates Rich Pins, analytics, attribution.
   → *Verify:* domain shows "claimed"; Rich Pin Validator passes on one guide URL.
7. **[C] Build the pin design-template** — code text-layer (HTML+Playwright or
   SVG→sharp) in brand fonts (Cormorant/cream/olive/clay/ensō), 1000×1500.
   Higgsfield supplies the imagery layer (studio/Aiko/product). Build once, reuse.
   → *Verify:* one rendered pin looks premium + on-brand at 1000×1500.
8. **[C] Proof set: 4–5 pins for `best-yoga-mats-2026`** (most reach) using the
   5-angle formula (listicle / problem / comparison / aesthetic / single-tip).
   → *Verify:* Marvin approves the look → then scale to all 14 guides (~3–5
   fresh pins/week, backfill over 6–8 weeks).

---

## BLOCK 3 — Instagram (light — brand presence, not a traffic engine)

9. **[M] Create IG account** — handle, bio with the one link to `/guides`
   (or a Linktree), brand avatar (`/images/brand/avatar-yoga-sensei`).
10. **[C] Starter set: 6–9 grid posts** from existing brand/Aiko imagery + honest
    short captions (no fake testing, Aiko stays decorative). Repurpose pin visuals.
    → *Verify:* a cohesive first-grid look; captions pass the voice anti-AI check.

> Keep IG effort low until Pinterest is humming. Links are bio-only, so IG won't
> move guide traffic early — it's brand-building.

---

## WEEKLY RHYTHM (going forward)

- **1 new page/week** from the gear/review/comparison queue — these need **no RYT
  reviewer**. Next best by score (volume ÷ difficulty):
  1. `retrospec solana yoga mat` (review, vol 14k, kd 2)
  2. `manduka yoga mat` (review, vol 14k, kd 6)
  3. `manduka vs lululemon yoga mat` (comparison)
  4. `alo yoga mat`, `gaiam yoga mat` (reviews)
- **Each new page → 4–5 Pinterest pins** at publish.
- **Refresh pass: start ~week 10–12**, driven by Search Console (rewrite titles/
  meta on high-impression-low-CTR pages; expand pages stuck on page 2). Not before
  — there's no performance data to act on yet.

### Decision parked for Marvin
The **biggest-volume topics are pose/instructional** (`best yoga poses for back
pain` vol 32k, `yoga poses for two people` vol 4.5k) but are **gated on an
RYT-certified reviewer** (CLAUDE.md rule). Onboarding an RYT-500 reviewer unlocks
the pose pillar — the roadmap trigger is ~€500/mo affiliate revenue (ADR-001).
Until then, gear/reviews carry the cadence.

---

## Tomorrow's realistic order
GSC (Block 1) → Pinterest account + I build the pin template & proof set (Block 2)
→ IG account + starter posts (Block 3, if time) → review the proof pins together.
Accounts are yours; template + pins + posts are mine.
