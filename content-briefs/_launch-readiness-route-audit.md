# Launch-Readiness Route Audit

Date: 2026-05-25
Status: **inventory + plan only — no code changes yet, awaiting Marvin's decisions on the 5 open questions below**

Triggered by the C1 pre-publish render-check, which surfaced that `src/routes/guides/$slug.tsx` loads frontmatter correctly (JSON-LD schemas render perfectly) but its component body is a hardcoded "Morning Yoga Routine: 15 Minutes to Energize Your Day" design template — not the real MDX content. If C1 publishes today, Google indexes the placeholder body.

This audit classifies every route file in `src/routes/` so we can clean the webapp's routing surface before any content launches.

---

## Summary

| Class | Count |
|---|---|
| ESSENTIAL — must be live at launch | 14 |
| DYNAMIC-NEEDS-WIRING — loader correct, body still a placeholder template | 6 |
| DESIGN-TEMPLATE-ONLY — hardcoded one-off, should move out of `src/routes/` | 5 |
| DELETE — orphan / duplicate / never wired | 1 |
| **Total routes** | **26** |

## Classification table

| Route | Class | loadFrontmatter? | Hardcoded placeholder? | Justification |
|---|---|---|---|---|
| `__root.tsx` | ESSENTIAL | n/a | n/a | Layout root, not a routable page. |
| `about.tsx` | ESSENTIAL | no | no | Real bio + methodology + Aiko disclosure, finalised in commit `5950021`. |
| `affiliate-disclosure.tsx` | ESSENTIAL | no | yes (single "Placeholder" line) | Legally required at launch; content task, not structural. |
| `authors/$slug.tsx` | ESSENTIAL | no (uses `resolveAuthor`) | no | Loads real Person data, emits Person schema, renders author bio fields — no MDX body needed by design. |
| `compare/manduka-vs-liforme.tsx` | DESIGN-TEMPLATE-ONLY | no | yes (511 lines hardcoded) | Standalone hardcoded compare design; no `/compare/$slug` dynamic route exists — one-off preview. |
| `confirm.tsx` | ESSENTIAL | no | no | Double opt-in landing for newsletter. Functional flow page. |
| `gear/$category/$slug.tsx` | ESSENTIAL | yes | no | Correctly calls `loadContent('gear', …)` and renders `<Component />` — wiring is correct. |
| `gear/$category/index.tsx` | DYNAMIC-NEEDS-WIRING | no | yes | Category listing renders hardcoded sample products instead of iterating MDX in `content/gear/<category>/`. |
| `gear/index.tsx` | DYNAMIC-NEEDS-WIRING | no | yes ("7 Best Yoga Mats" hardcoded) | Top-level gear hub uses sample data instead of a real MDX index. |
| `go/$slug.tsx` | ESSENTIAL | n/a | no | Affiliate redirect using `affiliateLinks` map; correct, `noindex` set. |
| `guides/$slug.tsx` | DYNAMIC-NEEDS-WIRING | yes | yes (`// Placeholder design data`, "Morning Yoga Routine" body) | **THE SMOKING GUN** — loader + head/schemas are wired but `GuidePage()` renders a static design instead of `<Component />`. Would publish C1 with the wrong body. |
| `guides/index.tsx` | DYNAMIC-NEEDS-WIRING | no | yes ("Morning Yoga Routine…" entries hardcoded) | Journal index lists fake articles instead of iterating real guides. |
| `index.tsx` | ESSENTIAL | no | partial (featured cards hardcoded) | Homepage hero/landing — hardcoded featured items acceptable as marketing copy. Replace cards post-launch once real content exists. |
| `mindful-journal.tsx` | ESSENTIAL | no | no | Newsletter CRO landing page; hardcoded copy is intentional brand content. |
| `poses/$slug.tsx` | ESSENTIAL | yes | no | Correctly renders `<Component />` from `loadContent('poses', slug)`; matches `content/poses/sun-salutation.mdx`. **Reference implementation.** |
| `poses/index.tsx` | DYNAMIC-NEEDS-WIRING | no | yes | Pose library listing not wired to MDX. |
| `privacy.tsx` | ESSENTIAL | no | yes (single "Placeholder" line) | Legally required; body copy task only. |
| `reviews/$slug.tsx` | DELETE *(or wire — see Q2)* | no | yes (ignores `params` entirely, hardcoded "Best Yoga Mats") | Dynamic route shape but never reads `slug`; duplicates `/reviews/best-yoga-mats`. |
| `reviews/best-yoga-mats.tsx` | DESIGN-TEMPLATE-ONLY *(or ESSENTIAL — see Q1)* | no | yes (renders feature components with `yogaMats` sample data) | Hand-coded specific review page assembled from feature components. |
| `reviews/manduka-pro.tsx` | DESIGN-TEMPLATE-ONLY *(or ESSENTIAL — see Q1)* | no | yes (`mandukaPro` hardcoded data, 461 lines) | Same as above for individual product review. |
| `search.tsx` | ESSENTIAL | no | partial (sample result list) | Functional search UI; sample data placeholder until real index — the route itself is required. |
| `sensei-picks.tsx` | ESSENTIAL | no | no | Curated gear landing page — intentional brand/CRO copy. |
| `start-here.tsx` | ESSENTIAL | no | no | Beginner roadmap landing — intentional brand/CRO copy. |
| `styles/$slug.tsx` | ESSENTIAL | yes | no | Correct: loader + `<Component />` render. Zero `content/styles/*.mdx` exists yet — URL 404s until content arrives, wiring is fine. |
| `styles/index.tsx` | DYNAMIC-NEEDS-WIRING | no | yes | Style index not wired to real MDX. |
| `terms.tsx` | ESSENTIAL | no | yes (single "Placeholder" line) | Legally required; body copy task only. |

## Critical findings

1. **`guides/$slug.tsx` is broken.** Explicit `// Placeholder design data for template 3 visual demo` comment at line 130. Loader correctly fetches frontmatter (so JSON-LD renders right), but the component body is a 400+ line static "Morning Yoga Routine" design. **Any guide MDX published today (yoga-for-beginners, how-to-clean-a-yoga-mat) renders the wrong body.** Must fix before C1 publication.

2. **Three correct reference implementations exist** — `poses/$slug.tsx`, `styles/$slug.tsx`, `gear/$category/$slug.tsx`. They call `loadContent()` and render `<Component />`. Use one of these as the model for the `guides/$slug.tsx` fix.

3. **`reviews/$slug.tsx` is a phantom dynamic route** — accepts `$slug` param but never reads it. Renders the same "Best Yoga Mats" content regardless of URL. Duplicate-content risk with `/reviews/best-yoga-mats.tsx`.

4. **All 5 index/listing routes are dead-data** — `guides/index`, `poses/index`, `styles/index`, `gear/index`, `gear/$category/index` show hardcoded sample articles. Acceptable for launch only if traffic enters via direct article URLs (sitemap + GSC); otherwise they leak fake content into the index.

5. **`reviews/best-yoga-mats.tsx` and `reviews/manduka-pro.tsx` are hand-coded one-offs** built from feature components against `yogaMats`/`mandukaPro` data modules. The data inside has already been audited and cleaned of fabricated claims (commits `d80d340`, `4a78433`), but they're still NOT MDX-backed — meaning future content edits require code changes. See Q1.

## Recommended migration plan

**Phase A — Blockers for C1 publish (must-fix)**

1. **Wire `guides/$slug.tsx` to MDX.** Replace `GuidePage()` body with the same pattern as `poses/$slug.tsx`: `const { Component } = loadContent('guides', slug)` then render `<Component />`. Optionally keep the existing hero/sidebar design and feed it `loaderData.frontmatter` instead of hardcoded strings — that way the work on template 3 is preserved as a chrome around the real content.

**Phase B — Pre-launch hygiene (recommended before any cluster goes live)**

2. **Mark the 5 listing/index routes `noindex` in their `head: () => ({ meta })` config.** This prevents Google from indexing the fake "Morning Yoga Routine" listings while we figure out the real iteration logic. Cheap one-line fix per route, reversible. Code:
   ```tsx
   { name: 'robots', content: 'noindex, nofollow' }
   ```
   Add to: `guides/index.tsx`, `poses/index.tsx`, `styles/index.tsx`, `gear/index.tsx`, `gear/$category/index.tsx`.

3. **Decide on `reviews/$slug.tsx`** — wire it to `loadContent('reviews', slug)` OR delete the file. Keeping it half-implemented is the worst of both worlds. See Q2.

**Phase C — Design-template relocation (optional, post-launch OK)**

4. **Move DESIGN-TEMPLATE-ONLY files out of `src/routes/`** to a location outside TanStack's file-route convention (proposal: `src/design-system/templates/`). Files involved: `compare/manduka-vs-liforme.tsx`, optionally `reviews/best-yoga-mats.tsx` and `reviews/manduka-pro.tsx` (only if Q1 says they're previews, not launch pages). Doing this prevents the routes from being prerendered, listed in sitemap, or crawled. Files keep their value as design references.

**Phase D — Real iteration logic for listings (post-launch)**

5. Build a `listFrontmatter(collection)` helper in `src/lib/mdx/loader.ts` that scans the `content/<collection>/` directory and returns frontmatter arrays. Wire the 5 listing routes to it. Remove their `noindex` once they show real content.

## Open questions for Marvin

These need decisions before Phase A code changes start:

1. **`reviews/best-yoga-mats.tsx` + `reviews/manduka-pro.tsx`** — are these intended to ship as **hand-coded launch pages** (ESSENTIAL, keep in `src/routes/`) or as **design previews** awaiting MDX migration (DESIGN-TEMPLATE-ONLY, move out)? Their data modules look production-shaped, suggesting the former. If launch pages: leave in routes, add a TODO to migrate to MDX later. If previews: move out and reroute users.

2. **`reviews/$slug.tsx`** — wire it to MDX now (preferred — gives you a future-proof dynamic review route) or delete? Half-implemented is the riskiest state.

3. **DYNAMIC-NEEDS-WIRING listing pages** — "noindex them and ship anyway" (Phase B path) or "block launch until they iterate real MDX" (more work, cleaner result)? My recommendation: noindex now, iterate later.

4. **`compare/manduka-vs-liforme.tsx`** — is there a planned `/compare/$slug` dynamic route, or is this a permanent one-off? Determines DESIGN-TEMPLATE-ONLY vs ESSENTIAL.

5. **`styles/$slug.tsx`** is wired correctly but **zero** `content/styles/*.mdx` exists. Confirm the styles cluster is genuinely post-launch — otherwise the listing page will be empty and the URL 404s.

---

## Files touched by this audit

- **READ-ONLY**: every file in `src/routes/` (subagent classification pass)
- **NO CODE CHANGES**: confirmed by audit subagent
- **DOCS WRITTEN**: this file (`content-briefs/_launch-readiness-route-audit.md`)

Next step: Marvin reviews answers to Q1-Q5, then Phase A starts.
