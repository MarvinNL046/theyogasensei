# The Yoga Sensei Content Strategy Notes

Last updated: 2026-05-24

This note captures the practical content strategy that emerged from the keyword research, seed briefs, and automation work. Use it as a reference before planning new briefs, updating `keywords.csv`, or deciding what to publish next.

## Current Strategic Direction

The Yoga Sensei should build traffic and trust through three complementary content engines:

1. Helpful informational content that can rank quickly and support internal links.
2. Commercial affiliate content for yoga mats, props, apps, books, and brand-specific reviews.
3. Audience-building pillar content such as chair yoga for seniors, where the main conversion is email capture and trust, not immediate affiliate revenue.

The best early strategy is not to open every pillar at once. Prioritize a few clusters deeply enough to build topical authority.

## Launch Cluster Recommendation

The recommended first major launch cluster is `yoga mats`.

Reason:

- It connects informational quick wins, commercial affiliate content, brand reviews, and comparisons.
- It is lower YMYL risk than senior/health clusters.
- It supports future gear authority: blocks, straps, bolsters, towels, and bags.
- It already has strong seed research for `how to clean a yoga mat` and `best yoga mat for hot yoga`.

Detailed launch plan:

- `content-launch-cluster-strategy.md`

Key tactic:

- Publish 4-6 supporting mat cluster posts before publishing the `yoga mat buying guide` pillar, so the pillar launches with real internal links.

## Three High-Value Seed Briefs

### 1. How To Clean A Yoga Mat

Project seed brief:

- `content-briefs/seed-how-to-clean-a-yoga-mat.md`

Strategic role:

- Informational quick win.
- Strong internal-link support for yoga mat reviews.
- Can monetize lightly through mat cleaners, microfiber cloths, spray bottles, and cleaning supplies.

Important rules:

- Verify live SERP and PAA before marking as a final brief.
- Treat user-supplied PAA as FAQ candidates until verified.
- Use official brand care guidance for brand-specific cleaning advice.
- Avoid unsupported disinfection or health claims.

Best next use:

- Create the real automation brief, then publish as an early mat-care cluster article.

### 2. Best Yoga Mat For Hot Yoga

Project seed brief:

- `content-briefs/seed-best-yoga-mat-for-hot-yoga.md`

Strategic role:

- BOFU commercial affiliate article.
- Supports mat-review authority and can link to mat cleaning content.
- Should be a hot-yoga-specific roundup, not a generic yoga mat article.

Important rules:

- Do not claim "tested" unless actual testing happened.
- Do not use fake ratings, fake review counts, or AggregateRating schema.
- Verify all product names, specs, availability, price labels, and care claims.
- Merge or consolidate close variants:
  - `best hot yoga mat`
  - `best mat for hot yoga`

Best next use:

- Create the real automation brief after `how to clean a yoga mat`, or publish as the first hot-yoga money page once product data is verified.

### 3. Chair Yoga For Seniors

Project seed brief:

- `content-briefs/seed-chair-yoga-for-seniors.md`

Strategic role:

- Audience-building pillar.
- High-volume low-KD opportunity.
- Main conversion should be a printable PDF or email lead magnet.
- Affiliate revenue is secondary and subtle.

Important rules:

- Treat as YMYL-adjacent senior-health content.
- Do not make treatment, fall-prevention, blood-pressure, weight-loss, or Medicare claims without verification.
- Use clear safety language and disclaimers.
- Do not invent medical reviewers, RYT credentials, or healthcare credentials.
- A PDF or video should only be promised if it exists or is actively being created.

Best next use:

- Build the real automation brief with live SERP, video intent, authority-source expectations, and source-backed safety requirements.

## Current Brief And Seed Inventory

Real/generated briefs:

- `content-briefs/2026-05-23-hatha-vs-vinyasa.md`
- `content-briefs/2026-05-24-best-yoga-blocks.md`
- `.agents/content-briefs/2026-05-21-downward-facing-dog.md`

Seed briefs:

- `content-briefs/seed-how-to-clean-a-yoga-mat.md`
- `content-briefs/seed-best-yoga-mat-for-hot-yoga.md`
- `content-briefs/seed-chair-yoga-for-seniors.md`

Seed briefs are planning input only. The automation must verify SERP, PAA, word counts, sources, and product claims before marking a keyword as `briefed`.

## Current Priority Opportunities

These are the most interesting opportunities in the backlog:

### Fast informational and support wins

- `how to clean a yoga mat`
- `how to clean lululemon yoga mat`
- `how thick should a yoga mat be`
- `how to tie yoga mat strap`

### Commercial affiliate opportunities

- `best yoga mat for hot yoga`
- `best non-slip yoga mat`
- `best thick yoga mat`
- `best yoga bolster`
- `best yoga app`
- `lululemon yoga mat`
- `alo yoga mat`
- `gaiam yoga mat`
- `manduka vs lululemon yoga mat`

### Audience and topical authority opportunities

- `chair yoga for seniors`
- `free chair yoga for seniors`
- `printable chair yoga for seniors`
- `free 28 day chair yoga for seniors`

### High-volume but higher-care health topics

- `best yoga poses for back pain`
- `yoga for sciatica`
- `yoga for posture`
- `yoga nidra for sleep`
- `yoga for constipation`

Treat these as YMYL-adjacent and source-heavy.

### Visual / Pinterest opportunities

- `yoga poses for 2`
- `yoga poses for two people`
- `yoga poses for 3`
- `yoga poses for kids`
- `easy kid yoga poses for 2`

## Suggested 90-Day Plan

### Month 1: Foundation

Publish or prepare these three cornerstone pieces:

1. `how to clean a yoga mat`
2. `chair yoga for seniors`
3. `best yoga mat for hot yoga`

This creates:

- one informational support article
- one audience-building pillar
- one commercial affiliate article

### Month 2: Cluster Building

Add supporting articles around the first three:

- Chair yoga over 70
- Printable chair yoga for seniors
- Free 28-day chair yoga plan landing page
- Chair yoga for beginners
- Best non-slip yoga mat
- How thick should a yoga mat be
- Lululemon yoga mat review
- Yoga nidra for sleep

### Month 3: Authority And Distribution

Focus on:

- Internal links between pillar and cluster pages.
- Pinterest assets for chair yoga, pose guides, and visual topics.
- Search Console query review.
- Updating early pages based on real impressions.
- Only then start heavier backlink or YouTube work.

## Automation Notes

Current automation:

- ID: `content-researcher`
- Output folder: `content-briefs`
- Writes real briefs as `content-briefs/YYYY-MM-DD-[keyword-slug].md`
- Reads seed briefs from `content-briefs/seed-[keyword-slug].md`

Important automation behavior:

- Seed briefs are not treated as verified.
- PAA must be verified or labelled unavailable.
- Commercial claims must be source-backed.
- YMYL and senior-health content requires disclaimers, sources, and cautious wording.
- `used-keywords.md` is a published-page guardrail only; brief-stage work is tracked in `keywords.csv`.

Important fix made:

- `scripts/content-status.ts` now preserves `briefed` status instead of resetting non-published briefed rows back to `todo`.

## Operating Rules

Before publishing:

- Use `content-quality-checklist.md`.
- Check live SERP intent.
- Check cannibalisation.
- Verify PAA separately from source-derived questions.
- Verify product claims and health claims.
- Keep affiliate disclosures visible.

Before opening a new pillar:

- Ask whether an existing cluster needs more support first.
- Make an exception only for clearly strong hit-now opportunities such as chair yoga for seniors or a very low-KD commercial opportunity.

## Practical Next Step

Create a 30-article content calendar from `keywords.csv` with:

- primary keyword
- cluster
- page type
- status
- seed brief path
- planned publish week
- internal links to include
- monetization goal
- YMYL/commercial warnings

This should become the working plan for the first 6 months.
