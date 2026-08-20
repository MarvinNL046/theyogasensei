# Launch-Readiness Route Audit

Date: 2026-05-25
Status: **Phase A1–A6 executed in commit `712719d`. Awaiting Phase A8 (publish flow).**

Triggered by the C1 pre-publish render-check, which surfaced that `src/routes/guides/$slug.tsx` loads frontmatter correctly (JSON-LD schemas render perfectly) but its component body is a hardcoded "Morning Yoga Routine: 15 Minutes to Energize Your Day" design template — not the real MDX content. Without a route fix, publishing C1 ships placeholder body to Google.

This audit classifies every route file in `src/routes/` so we can clean the webapp's routing surface before any content launches.

---

## Section 1 — Full route inventory

Recursive scan of `src/routes/`. TanStack Start uses file-based routing: every file with `createFileRoute(...)` becomes a live URL. `__root.tsx` is the layout root, not a routable page.

| Path (relative to `src/routes/`) | Lines |  Bytes | createFileRoute? | Generated URL                            |
| -------------------------------- | ----: | -----: | ---------------- | ---------------------------------------- |
| `__root.tsx`                     |    70 |  2,210 | no (layout root) | n/a                                      |
| `about.tsx`                      |   626 | 25,159 | yes              | `/about`                                 |
| `affiliate-disclosure.tsx`       |    27 |    793 | yes              | `/affiliate-disclosure`                  |
| `authors/$slug.tsx`              |    59 |  1,803 | yes              | `/authors/$slug` (dynamic)               |
| `compare/manduka-vs-liforme.tsx` |   511 | 19,562 | yes              | `/compare/manduka-vs-liforme`            |
| `confirm.tsx`                    |   230 |  8,447 | yes              | `/confirm`                               |
| `gear/$category/$slug.tsx`       |    61 |  2,019 | yes              | `/gear/$category/$slug` (nested dynamic) |
| `gear/$category/index.tsx`       |    48 |  1,424 | yes              | `/gear/$category`                        |
| `gear/index.tsx`                 |   460 | 19,787 | yes              | `/gear`                                  |
| `go/$slug.tsx`                   |    24 |    862 | yes              | `/go/$slug` (dynamic)                    |
| `guides/$slug.tsx`               |   523 | 24,681 | yes              | `/guides/$slug` (dynamic)                |
| `guides/index.tsx`               |   591 | 27,270 | yes              | `/guides`                                |
| `index.tsx`                      |   640 | 27,422 | yes              | `/` (homepage)                           |
| `mindful-journal.tsx`            |   460 | 15,745 | yes              | `/mindful-journal`                       |
| `poses/$slug.tsx`                |    52 |  1,645 | yes              | `/poses/$slug` (dynamic)                 |
| `poses/index.tsx`                |    39 |  1,071 | yes              | `/poses`                                 |
| `privacy.tsx`                    |    24 |    674 | yes              | `/privacy`                               |
| `reviews/$slug.tsx`              |   142 |  5,980 | yes              | `/reviews/$slug` (dynamic)               |
| `reviews/best-yoga-mats.tsx`     |    39 |  1,456 | yes              | `/reviews/best-yoga-mats`                |
| `reviews/manduka-pro.tsx`        |   461 | 16,814 | yes              | `/reviews/manduka-pro`                   |
| `search.tsx`                     |   957 | 34,231 | yes              | `/search`                                |
| `sensei-picks.tsx`               |   428 | 17,051 | yes              | `/sensei-picks`                          |
| `start-here.tsx`                 |   418 | 17,347 | yes              | `/start-here`                            |
| `styles/$slug.tsx`               |    52 |  1,655 | yes              | `/styles/$slug` (dynamic)                |
| `styles/index.tsx`               |    39 |  1,073 | yes              | `/styles`                                |
| `terms.tsx`                      |    24 |    599 | yes              | `/terms`                                 |

**Total**: 26 files, 25 routable URLs + 1 layout root.

---

## Section 2 — Classification (A / B / C / D)

Per route exactly one label:

- **A. LIVE-ESSENTIAL** — must remain live for launch
- **B. DESIGN-TEMPLATE-ONLY** — pure visual reference, hardcoded fake content, no launch value → move out of `src/routes/`
- **C. DYNAMIC-ROUTE-NEEDS-FIX** — route exists but renders hardcoded content instead of real data; needs wiring to MDX/loader
- **D. UNCLEAR** — needs Marvin's decision

| Route                            | Class                                       | Why                                                                                                                                                                                 |
| -------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__root.tsx`                     | A                                           | Layout root, not a page.                                                                                                                                                            |
| `about.tsx`                      | A                                           | Real bio + methodology + Aiko disclosure (commit `5950021`).                                                                                                                        |
| `affiliate-disclosure.tsx`       | A                                           | Legally required; placeholder body is a content task, not structural.                                                                                                               |
| `authors/$slug.tsx`              | A                                           | Uses `resolveAuthor`, emits Person schema, renders real author fields. Wiring is correct.                                                                                           |
| `compare/manduka-vs-liforme.tsx` | D                                           | Hardcoded 511-line compare page. **No inbound links from other routes (verified §5).** Either ship as launch page or move to design-references. See Q4.                             |
| `confirm.tsx`                    | A                                           | Double opt-in landing for newsletter. Functional flow.                                                                                                                              |
| `gear/$category/$slug.tsx`       | A                                           | Correct: calls `loadContent('gear', ...)` and renders `<Component />`.                                                                                                              |
| `gear/$category/index.tsx`       | C                                           | Renders hardcoded sample products instead of iterating MDX.                                                                                                                         |
| `gear/index.tsx`                 | C                                           | Top-level gear hub uses hardcoded sample data. Heavily inbound-linked → cannot just delete.                                                                                         |
| `go/$slug.tsx`                   | A                                           | Affiliate redirect via `affiliateLinks` map; `noindex` set correctly.                                                                                                               |
| `guides/$slug.tsx`               | **C**                                       | **THE SMOKING GUN.** Loader correct, body renders 400-line "Morning Yoga Routine" template instead of `<Component />`. Blocks C1 publish.                                           |
| `guides/index.tsx`               | C                                           | Lists hardcoded fake articles instead of iterating real guides.                                                                                                                     |
| `index.tsx`                      | A                                           | Homepage hero/landing. Featured cards hardcoded but acceptable as marketing copy; refresh post-launch.                                                                              |
| `mindful-journal.tsx`            | A                                           | Newsletter CRO landing; intentional brand content.                                                                                                                                  |
| `poses/$slug.tsx`                | A                                           | Reference implementation: `loadContent('poses', slug)` → `<Component />`.                                                                                                           |
| `poses/index.tsx`                | C                                           | Pose library listing not wired to MDX.                                                                                                                                              |
| `privacy.tsx`                    | A                                           | Legally required; body copy task only.                                                                                                                                              |
| `reviews/$slug.tsx`              | D                                           | Phantom dynamic route — accepts `$slug` but never reads it; renders hardcoded "Best Yoga Mats". See Q2.                                                                             |
| `reviews/best-yoga-mats.tsx`     | **A** _(was D, demoted to A by §5 finding)_ | **7 inbound links** from gear/index, sensei-picks, start-here, search, compare. Moving it = breaking 7 launch-essential pages. Keep as ESSENTIAL launch page, migrate to MDX later. |
| `reviews/manduka-pro.tsx`        | **A** _(was D, demoted to A by §5 finding)_ | **3 inbound links** from gear/index, sensei-picks, start-here. Same logic: keep as ESSENTIAL launch page, migrate to MDX later.                                                     |
| `search.tsx`                     | A                                           | Functional search UI. Sample result list is a placeholder, but the route itself is required.                                                                                        |
| `sensei-picks.tsx`               | A                                           | Curated gear landing; intentional brand/CRO copy.                                                                                                                                   |
| `start-here.tsx`                 | A                                           | Beginner roadmap landing; intentional brand/CRO copy.                                                                                                                               |
| `styles/$slug.tsx`               | A                                           | Wiring correct. No `content/styles/*.mdx` yet → URL 404s until content arrives. Acceptable.                                                                                         |
| `styles/index.tsx`               | C                                           | Style index not wired to MDX.                                                                                                                                                       |
| `terms.tsx`                      | A                                           | Legally required; body copy task only.                                                                                                                                              |

**Tallies**: A = 17, B = 0, C = 7, D = 2.

The B bucket is empty after §5 cross-reference: the only candidates (the two hardcoded review pages and the compare page) are either heavily inbound-linked (= effectively essential) or pending Marvin's decision (= D, not B).

---

## Section 3 — Migration plan per category

### A — LIVE-ESSENTIAL (17 routes): stays, with small cleanup tasks

| Route                        | Action                                                                                                             | Effort                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `__root.tsx`                 | none                                                                                                               | —                       |
| `about.tsx`                  | none (already finalised)                                                                                           | —                       |
| `affiliate-disclosure.tsx`   | Marvin writes real body copy (currently 1-line placeholder)                                                        | Content task, S         |
| `authors/$slug.tsx`          | none                                                                                                               | —                       |
| `confirm.tsx`                | none (already finalised)                                                                                           | —                       |
| `gear/$category/$slug.tsx`   | none                                                                                                               | —                       |
| `go/$slug.tsx`               | none — but `src/content/affiliate-links.ts` registry needs entries before any C2-onwards post links to `/go/...`   | Tracked in cluster plan |
| `index.tsx`                  | optional: refresh featured cards once real content lands; not blocking launch                                      | M, post-launch          |
| `mindful-journal.tsx`        | none                                                                                                               | —                       |
| `poses/$slug.tsx`            | none — **reference implementation for the `guides/$slug.tsx` fix**                                                 | —                       |
| `privacy.tsx`                | Marvin writes real body copy                                                                                       | Content task, S         |
| `reviews/best-yoga-mats.tsx` | keep as hand-coded launch page; add TODO comment to migrate to MDX once `reviews/$slug.tsx` is wired (post-launch) | none for launch         |
| `reviews/manduka-pro.tsx`    | same as above                                                                                                      | none for launch         |
| `search.tsx`                 | sample results are acceptable for launch; build real search index post-launch                                      | none for launch         |
| `sensei-picks.tsx`           | none                                                                                                               | —                       |
| `start-here.tsx`             | none                                                                                                               | —                       |
| `styles/$slug.tsx`           | none — URL 404s gracefully until content arrives                                                                   | —                       |
| `terms.tsx`                  | Marvin writes real body copy                                                                                       | Content task, S         |

### B — DESIGN-TEMPLATE-ONLY (0 routes after §5)

**Empty bucket.** All initial B-candidates were either reclassified A (heavy inbound links) or D (pending decision). Standard B-action template (for future use) would be: move file to `src/design-references/` (outside file-route convention), regenerate sitemap, verify no leftover internal links.

### C — DYNAMIC-ROUTE-NEEDS-FIX (7 routes): wire to real data

| Route                      | Fix                                                                                                                                               | Priority                | Effort                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------- |
| `guides/$slug.tsx`         | Replace `GuidePage()` body with `loadContent('guides', slug)` + render `<Component />`. Use `poses/$slug.tsx` as template. **Blocks C1 publish.** | P0                      | M (30-60 min: preserve sidebar/CTA design, feed it `loaderData.frontmatter` instead of hardcoded strings) |
| `guides/index.tsx`         | Add `noindex` meta tag now; build `listFrontmatter('guides')` helper later for real iteration                                                     | P1 noindex / P3 iterate | S now / M later                                                                                           |
| `poses/index.tsx`          | Same: `noindex` now, real iteration later                                                                                                         | P1 / P3                 | S / M                                                                                                     |
| `styles/index.tsx`         | Same                                                                                                                                              | P1 / P3                 | S / M                                                                                                     |
| `gear/index.tsx`           | Same — but extra care because of 2 inbound links to `/reviews/...` that must continue working                                                     | P1 / P3                 | S / M                                                                                                     |
| `gear/$category/index.tsx` | Same                                                                                                                                              | P1 / P3                 | S / M                                                                                                     |
| `reviews/$slug.tsx`        | See D-Q2 (wire or delete)                                                                                                                         | depends on Q2           | S or M                                                                                                    |

### D — UNCLEAR (2 routes): need Marvin's decision

**Q1.** ~~Are `reviews/best-yoga-mats.tsx` and `reviews/manduka-pro.tsx` ESSENTIAL or design previews?~~ **RESOLVED by §5: classified A.** Reason: 7+ inbound links from launch-essential CRO pages. Moving them = broken-link cascade. Keep, migrate to MDX post-launch.

**Q2. `reviews/$slug.tsx` — wire or delete?**

- Wire (recommended): call `loadContent('reviews', slug)` like `poses/$slug.tsx`. Gives a future-proof dynamic review route + future home for `reviews/best-yoga-mats` and `reviews/manduka-pro` migrated to MDX.
- Delete: simpler short term but means re-creating the route later when MDX-backed reviews start. Half-implemented is the riskiest state — that's where it lives now.

**Q3. The 5 C-listing routes — `noindex` now and ship, or block launch until real iteration?**

- My recommendation: `noindex` now (S effort, reversible), build real iteration post-launch as P3 task. Listings are not where SEO traffic enters; direct article URLs via sitemap + GSC are.

**Q4. `compare/manduka-vs-liforme.tsx` — permanent launch page or design preview?**

- Currently: hardcoded 511-line compare page with **zero inbound links** (verified §5). If it's intended as a real launch URL, ESSENTIAL — and we should add at least one inbound link from `/gear` or `/reviews`. If it's a design preview, move to `src/design-references/` — no broken-link risk.

**Q5. `styles/$slug.tsx` — confirm styles cluster is genuinely post-launch?** (No `content/styles/*.mdx` exists today. Wiring is correct, URL would 404 if anyone visited it directly. Acceptable if styles is a later cluster.)

---

## Section 4 — Sitemap + robots impact

### Current `public/sitemap.xml` (9 URLs)

| URL                          | Status check                                                                           |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `/`                          | ✅ A — homepage                                                                        |
| `/about`                     | ✅ A — finalised                                                                       |
| `/start-here`                | ✅ A                                                                                   |
| `/privacy`                   | ✅ A (placeholder body, but legally required URL)                                      |
| `/terms`                     | ✅ A (same)                                                                            |
| `/affiliate-disclosure`      | ✅ A (same)                                                                            |
| `/authors/marvin`            | ✅ A — `authors/$slug` route works correctly                                           |
| `/guides/yoga-for-beginners` | ⚠️ A-route, C-render — renders Morning Yoga template until `guides/$slug.tsx` is fixed |
| `/poses/sun-salutation`      | ✅ A — `poses/$slug` route works correctly                                             |

**All 9 sitemap URLs are A-classified routes.** No leakage of B (none exist) or C-listing routes into the sitemap. ✅

The two URLs to watch:

- `/guides/yoga-for-beginners` — already in sitemap, will render placeholder until Phase A fix lands. **Acceptable risk only because the site isn't deployed yet** (we're 17 commits ahead of origin/main).
- `/guides/how-to-clean-a-yoga-mat` — not yet in sitemap; will be added by `pnpm generate-sitemap` on C1 publish day. Should NOT be added until `guides/$slug.tsx` is fixed.

### Current `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /go/
Disallow: /api/

Sitemap: https://theyogasensei.com/sitemap.xml
```

- `/go/` correctly disallowed (affiliate redirects, also `noindex`) ✅
- `/api/` disallowed (no routes exist yet, but pre-emptive correct) ✅
- **Gap**: `/confirm` is currently `noindex, nofollow` via meta tag (correct), but for belt-and-braces could also be added to `Disallow: /confirm` in robots.txt. Low priority.
- **Gap**: hardcoded review/compare pages (`/reviews/best-yoga-mats`, `/reviews/manduka-pro`, `/compare/manduka-vs-liforme`) are crawlable but NOT in sitemap. If kept as A-launch pages, they should be **added to sitemap** so Google can discover them via the canonical path rather than only via internal links.

---

## Section 5 — Internal links audit (A → B/C cross-references)

Grep across `src/routes/` and `src/components/` for hrefs pointing to the at-risk routes. Findings:

### Links to `/reviews/best-yoga-mats` (7 hits)

- `src/routes/compare/manduka-vs-liforme.tsx:181` (top-bar link)
- `src/routes/compare/manduka-vs-liforme.tsx:233` (breadcrumb link)
- `src/routes/gear/index.tsx:81` (featured slot)
- `src/routes/gear/index.tsx:409` (CTA button)
- `src/routes/search.tsx:117` (sample result entry)
- `src/routes/sensei-picks.tsx:99` (curated card)
- `src/routes/reviews/manduka-pro.tsx:281` (related review link)

### Links to `/reviews/manduka-pro` (3 hits)

- `src/routes/gear/index.tsx:119` (top picks card)
- `src/routes/search.tsx:159` (sample result entry)
- `src/routes/sensei-picks.tsx:60` (curated card)
- `src/routes/start-here.tsx:128` (best mat recommendation)

### Links to `/compare/manduka-vs-liforme` (0 hits)

**Zero inbound links.** Confirms the page is orphan unless Marvin says it's a launch page (Q4).

### Header / Footer nav (the canonical site shell)

- Header → `/`, `/start-here`, `/guides`, `/gear`, `/poses`, `/about` (the Header line `{ to: '/gear', label: 'Reviews' }` routes "Reviews" nav to `/gear`, not `/reviews/*`)
- Footer → `/`, `/start-here`, `/poses`, `/styles`, `/guides`, `/gear`, `/about`, `/privacy`, `/terms`, `/affiliate-disclosure`

All canonical site-shell links target A-routes. ✅ No header/footer nav breakage on any migration path.

### Critical finding

**The two hardcoded review pages are functionally essential** because of the inbound-link web. Reclassifying them from "design template" to "keep as ESSENTIAL launch page" (done in §2) is the right call — moving them out would require also fixing 10 inbound link sites, which is a much bigger change than just keeping them.

---

## Section 6 — Recommended execution order

| Phase  | Steps                                                                                                                                                                                                                                               | Effort             | Blocks                   |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------ |
| **A0** | Marvin answers Q2, Q4, Q5 (no Q1, Q3 already resolved / recommended in this doc)                                                                                                                                                                    | 5 min              | A1                       |
| **A1** | Fix `guides/$slug.tsx` to call `loadContent` + render `<Component />`. Use `poses/$slug.tsx` as template. Preserve existing sidebar/CTA design but feed it `loaderData.frontmatter`. Run `pnpm typecheck`.                                          | **30–45 min**      | C1 publish               |
| **A2** | Render-check via `pnpm dev`: visit `/guides/how-to-clean-a-yoga-mat`, verify MDX body renders (not Morning Yoga template). Verify hero image, FAQ section, all 11 H2s present.                                                                      | 10 min             | C1 publish               |
| **A3** | Q3 noindex pass: add `{ name: 'robots', content: 'noindex, nofollow' }` to `head()` of `guides/index`, `poses/index`, `styles/index`, `gear/index`, `gear/$category/index`. One-line per route. Run `pnpm typecheck`.                               | **15 min**         | optional but recommended |
| **A4** | If Q2 = wire: replicate `poses/$slug.tsx` pattern in `reviews/$slug.tsx`. If Q2 = delete: `git rm` the file, verify no remaining route references.                                                                                                  | 20 min / 5 min     | optional                 |
| **A5** | If Q4 = move: relocate `compare/manduka-vs-liforme.tsx` to `src/design-references/` (outside `src/routes/` so TanStack ignores it). If Q4 = keep: add to sitemap generation script.                                                                 | 10 min / 5 min     | optional                 |
| **A6** | If Q1 review pages stay (already decided A): add inline `{/* TODO: migrate to MDX-backed reviews/$slug once that route is wired */}` comments at top of `reviews/best-yoga-mats.tsx` and `reviews/manduka-pro.tsx`. Audit trail for future cleanup. | 5 min              | nice to have             |
| **A7** | Commit phase A as one atomic commit: `fix(routes): wire guides/$slug to MDX + noindex listings + ...`.                                                                                                                                              | 5 min              | —                        |
| **A8** | Resume C1 publish flow: `pnpm generate-sitemap` → `pnpm build` smoke test → Vercel preview deploy → Rich Results Test → GSC submission.                                                                                                             | tracked separately | —                        |

**Estimated total for Phase A1+A2+A3 (minimum to unblock C1 publish)**: **~60–75 minutes** + Marvin review checkpoints.

Phase D (build `listFrontmatter` helper for real listing iteration) is explicitly **post-launch** — not in this audit's scope.

---

## Files touched by this audit

- **READ-ONLY**: every file in `src/routes/`, `src/components/site/header.tsx`, `src/components/site/footer.tsx`, `public/sitemap.xml`, `public/robots.txt`
- **NO CODE CHANGES**: zero `src/` files modified
- **DOCS WRITTEN**: this file only

Next step: Marvin answers Q2, Q4, Q5 → I execute Phase A1–A7 in one commit.
