---
name: templates-build-progress
description: 'Status tracker for the 17 design templates in /public/images/design-templates/ — which routes are built, which sections per route are first-pass done, which are deferred for finetuning'
metadata:
  node_type: memory
  type: project
  originSessionId: ab9ceb43-2414-4ab6-9c22-e478565ee2d5
---

Status of the 17 design templates in `/public/images/design-templates/`. Marvin's plan (2026-05-19): build all 17 visual templates first, then a dedicated SEO+EEAT pass per page (see [[seo-eeat-roadmap]]).

**Design build reassigned to Codex (2026-05-20).** Mid-template-5, Marvin moved the design-template build to Codex ("die luistert beter"). Claude no longer builds design templates on this project — see [[seo-eeat-roadmap]] for Claude's actual scope (technical + SEO phase). The table below is a historical snapshot of what Claude built; Codex now owns template progress, so do not treat it as current.

**Snapshot as of 2026-05-19 (end of marathon session, 13 WIP commits this session):**

| #   | Template                  | Route                        | Status                                            | Notes                                                                                                                                                                                                                                                                                                                                                                             |
| --- | ------------------------- | ---------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Homepage minimalistic zen | `/`                          | ✅ first pass, all 10 sections                    | Hero, Trust bar, Topic grid, Featured Review, Sensei Picks, Latest Articles, Newsletter band, Footer. Inline in route file — needs component refactor in EEAT pass.                                                                                                                                                                                                               |
| 2   | Yoga blog / journal index | `/guides`                    | ✅ first pass + multiple iteration rounds (v1→v4) | Hero, filter tabs, featured post, post list, pagination, sidebar (search/popular/categories/newsletter), bottom CTA. Inline.                                                                                                                                                                                                                                                      |
| 3   | Blog detail page          | `/guides/$slug`              | ✅ first pass                                     | Article hero with fade-left photo + avatar byline, stats/TOC strip, large article image with figcaption (Cobra Pose · BHUJANGASANA), body sections + checklist + pose card, 2-col with sidebar, bottom CTA. Inline. Hardcoded placeholder body — real MDX rendering deferred to EEAT pass.                                                                                        |
| 4   | Affiliate review page     | `/reviews/best-yoga-mats`    | ✅ component-based build                          | New page-type and the first one done correctly with data file + 11 components in `src/features/reviews/`. Hero, "In this guide" nav, Top Picks Grid (7 cards), Comparison Table (5 rows), Featured Review with carousel arrows + radar chart + score bars + newsletter card with bonsai bottom-right, Info Cards 3-col (How We Test / Buying Guide / FAQ), dark-olive Footer CTA. |
| 5   | Single product review     | `/gear/$category/$slug`      | ⏸ not started                                     |                                                                                                                                                                                                                                                                                                                                                                                   |
| 6   | Category page             | `/gear/$category`            | ⏸ not started                                     | Stub exists.                                                                                                                                                                                                                                                                                                                                                                      |
| 7   | Beginner roadmap          | `/start-here`                | ⏸ not started                                     | Stub exists.                                                                                                                                                                                                                                                                                                                                                                      |
| 8   | "Sensei Picks" page       | tbd                          | ⏸ not started                                     | Brand name `/sensei-picks` not wired.                                                                                                                                                                                                                                                                                                                                             |
| 9   | Newsletter / community    | tbd                          | ⏸ not started                                     |                                                                                                                                                                                                                                                                                                                                                                                   |
| 10  | Author / about page       | `/authors/$slug` or `/about` | ⏸ not started                                     | Stub exists.                                                                                                                                                                                                                                                                                                                                                                      |
| 11  | Search page               | tbd                          | ⏸ not started                                     | Search icon in header is disabled placeholder.                                                                                                                                                                                                                                                                                                                                    |
| 12  | Comparison page           | tbd                          | ⏸ not started                                     |                                                                                                                                                                                                                                                                                                                                                                                   |
| 13  | Pose library              | `/poses`                     | ⏸ not started                                     | Stub exists.                                                                                                                                                                                                                                                                                                                                                                      |
| 14  | Routine pages             | tbd                          | ⏸ not started                                     |                                                                                                                                                                                                                                                                                                                                                                                   |
| 15  | Tools / calculator        | tbd                          | ⏸ not started                                     |                                                                                                                                                                                                                                                                                                                                                                                   |
| 16  | Quote / philosophy        | tbd                          | ⏸ not started                                     |                                                                                                                                                                                                                                                                                                                                                                                   |
| 17  | Video content hub         | tbd                          | ⏸ not started                                     |                                                                                                                                                                                                                                                                                                                                                                                   |

**Per-template finetuning queue** (deferred during the design marathon, to address in later focused sessions before EEAT pass):

- Template 1 homepage: refactor inline route file into components per [[feedback-component-based]]
- Template 2 /guides: Hero v3 is dark full-width but the hi-res template shows a cream hero with right-side arrangement (vase + branch + books) — currently structurally wrong. Filter tabs need a "LATEST ▾" sort dropdown right. Featured post needs avatar circle + "By The Yoga Sensei". Regular cards need bookmark-top-right icon. Bottom CTA should be cream not dark.
- Template 3 /guides/$slug: Article hero is currently single column with overlay, but hi-res template shows 2-column cream layout with arrangement on the right (vase + branch + books) like template 2 hero. Stats strip should be in a box with "In this article:" eyebrow + zen icons (sun/person/leaf/clock). Blog post image is currently cobra placeholder — template shows child's pose. Sidebar needs to wire to MDX-driven data, currently hardcoded.
- Template 4 /reviews/best-yoga-mats: All 7 product cards use the same `pick-manduka-pro.webp` placeholder — replace with 7 distinct mat product photos when those assets land. Newsletter card uses `newsletter-bonsai.webp` as the bottom-right decorative — works visually but ideal would be a transparent-bg vase illustration.

**Image assets generated this session** (all in `/public/images/brand/`, PNG + WebP at 96% compression):

- `journal-hero-bg` — full-width hero photo for /guides v3 (later replaced by template-2 cream hero plan)
- `journal-newsletter-bg` — sidebar newsletter widget bg
- `journal-cta-bg` — bottom CTA full-width bg
- `article-hero-morning-yoga` — /guides/$slug hero with baked fade-left
- `avatar-yoga-sensei` — author byline circle portrait
- `review-hero-best-mats` — /reviews/best-yoga-mats hero with baked fade-left
- Plus topic-_ (6), pick-_ (5), newsletter-bonsai, 4 enso bg's from earlier sessions

**Recent commit references** (for git log archaeology):

- `b8c54c2` homepage build through Topic grid
- `ea3632c` Featured Review dark stone bg
- `3dc3538` Sensei Picks photo swap
- `31cbb53` Latest Articles + Newsletter final two
- `7f19a58` image SEO: WebP + alt texts + Newsletter-Footer gap
- `271c434` template 2 stage 1 blog index main
- `96a46a8` template 2 stages 2+3 sidebar + bottom CTA
- `2033b63` template 2 v2 (hero compact, featured, popular, bg images)
- `25be71d` template 2 v3 (popular simple, newsletter no-box)
- `d29e509` template 2 v3/v4 + template 3 blog detail first pass
- `3dd53cb` pose caption + alt audit
- `e9898b3` template 4 review page component-based

See [[homepage-progress]] for detailed homepage section history, [[seo-eeat-roadmap]] for the deferred SEO work, [[workflow-template-build]] for the section-by-section workflow learned this session, [[feedback-component-based]] for the architecture rule.
