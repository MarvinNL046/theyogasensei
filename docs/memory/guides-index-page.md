---
name: guides-index-page
description: "The live /guides overview/hub route — how it's built and what was deliberately trimmed from the template"
metadata:
  node_type: memory
  type: project
  originSessionId: ab4f04a5-6355-4c1c-b26f-d60bb1600495
---

Built the **live `/guides` index** (2026-05-30) — previously only `/guides/$slug`
existed. Ported the "Journal" design reference (`src/design-references/routes/guides-index.tsx`,
template image `public/images/design-templates/2.*.png`) to live, but adapted it
from a big multi-category blog to the real scope (10 yoga-mat guides).

**Architecture (component-based, per [[feedback-component-based]]):**

- `src/features/guides-index/data.ts` — `listGuides()` reads real frontmatter via
  `listContentSlugs('guides')` + `loadFrontmatter` (SSG-serialisable). Category is an
  explicit slug→category map (`CATEGORY_BY_SLUG`) because frontmatter can't carry a
  category field (closed Zod union) and `tags` overlap (pillar also has `mat-care`).
  Categories: All / Buying guides / Roundups / Comparisons / Reviews / Care.
- `src/features/guides-index/components/` — GuidesHero, GuideFilters (client),
  FeaturedGuide, GuideListItem, GuidesSidebar, GuidesCta.
- `src/features/guides-index/GuidesIndexView.tsx` — holds the `useState` filter; SSG
  renders the "All" view, then chips filter client-side (no request). Featured pillar
  shows only in "All".
- `src/routes/guides/index.tsx` — thin: head meta (indexable, canonical `www…/guides`),
  loader returns `listGuides()`, renders the view.

**Honesty trims vs the template** (the reference is full of placeholders that can't
ship): cut the dead search box, fake category counts, disabled filter buttons →
real working filters; cut fake pagination; used the real `NewsletterCapture`
(not a `#` form); CTA links go to live routes only (pillar + /about, NOT the
non-existent /start-here or /poses index). Dropped the reference's `noindex`.

**Reachability:** added a "Guides" link to the footer and a "View all guides"
button on the homepage Latest-writing section. Also fixed a pre-existing homepage
bug — the how-to-clean card pointed at a non-existent `yoga-mats/…` image path
(now `guides/…`).

Featured = the pillar `how-to-choose-a-yoga-mat`. `JapaneseAccent` phrases used
(`practice`, `stillness`) are in the verified set — see [[japanese-typography]].
Build prerenders 19 pages now (was 18).

**Draft-exclusion gotcha (fixed):** the index lists content via `listContentSlugs`,
which globs `/content/<folder>/**/*.mdx` and did NOT skip `_drafts/`. That
surfaced `content/guides/_drafts/yoga-for-beginners.mdx` as a card on the live
hub (and `/guides/$slug` would render it on a direct hit). The draft convention
is: any path with a `_drafts/` segment is out of the live surface — `scanMdxEntries`
(prerender + sitemap) already enforced it; `listContentSlugs` now mirrors it, and
the guides `$slug` loader 404s any `_drafts` slug. When adding any new "list all
content" helper, replicate the `_drafts` skip.

Shipped (pushed to main, commits 530d71c…5a0417a): Figure+inline variant, 11
guide figures, the /guides hub, sitemap entry, the \_drafts fix, and the diagram
round (see [[visual-pass-plan]]).
