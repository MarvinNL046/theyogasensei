---
name: seo-eeat-roadmap
description: 'After all 17 design templates are locked, run a dedicated SEO + EEAT pass per page-type — build the missing SEO components, wire real MDX rendering, hook up frontmatter to UI, and validate against the 80-point checklist in the Obsidian vault'
metadata:
  node_type: memory
  type: project
  originSessionId: ab9ceb43-2414-4ab6-9c22-e478565ee2d5
---

After **all 17 design templates** are visually locked, do a dedicated **SEO + EEAT pass** per page-type before publishing real content.

**Division of labour (set 2026-05-20):** Marvin builds the **design templates with Codex**, not Claude — reassigned mid-template-5 after the design-execution friction logged in [[workflow-template-build]]. Claude does **not** do design-template work on this project anymore. Claude's scope here is the **technical + SEO phase**: technical SEO, on-page SEO, smart internal linking, cluster/pillar/subpillar structure (see `keywords.csv` + `used-keywords.md`), schema, and the EEAT pass below. Don't volunteer for or pick up design/layout work — wait for Marvin to hand over the technical phase.

**Why:** During design build (started 2026-05-19), the focus is visual template-match. SEO/EEAT components were intentionally skipped to avoid rewriting them every time a layout pivots. Marvin's explicit choice (2026-05-19): "design alle templates eerst, dan SEO pass per pagina — cleaner, minder rework." Doing both at once means each layout iteration breaks previously-wired SEO bindings; doing SEO once after design lock means it sticks.

**How to apply:** When the final design template is approved by Marvin (track via [[homepage-progress]] style "Done" lists per template), open a new "SEO + EEAT pass" milestone. Walk through each route in order. Per route do:

1. **Restore real MDX rendering** — currently `/guides/$slug.tsx` (and likely future $slug routes) renders **hardcoded placeholder content**, not `<Component />` from `loadContent`. The loader still loads frontmatter, but the body MDX is dropped. Reintroduce `loadContent` + render `<Component />`.

2. **Wire frontmatter to UI** — replace hardcoded dates/titles ("May 12, 2024 · 6 min read") with `frontmatter.publishedAt`, `frontmatter.estimatedReadingTime`, `frontmatter.title`, etc. Same for author from `resolveAuthor`.

3. **Build missing SEO components in `/src/components/seo/`** (folder doesn't exist yet, but CLAUDE.md plans for it):
   - `<TableOfContents>` — anchor links for posts ≥ 1500 words
   - `<FAQ>` — renders `frontmatter.faq[]` as visible section (schema is already emitted via buildHead)
   - `<RelatedPosts>` — cluster linking, sourced from `frontmatter.related[]`
   - `<Citations>` — renders `frontmatter.citations[]` for health/wellness claims
   - `<LastReviewed>` — visible `lastReviewedAt` badge for EEAT trust
   - `<PillarBackLink>` — back to parent pillar for clusters
   - `<HowToSteps>` — for pose pages with HowTo schema
   - `<AuthorBio>` — extract sidebar About widget to reusable component

4. **External authoritative links** — per CLAUDE.md: every long-form post needs 2-3 links to .gov / .edu / peer-reviewed studies. Add to MDX body.

5. **Internal linking weave** — verify each post has 3-5 internal links (cluster cross-linking, pillar-up-linking). Pose cards in body content should link to `/poses/$slug` not be plain text.

6. **Pinterest pin** — `frontmatter.pin.primaryImage` must be the 1000×1500 Cloudflare Images variant referenced as og:image for cluster/pillar pages.

7. **RYT-500 review** — instructional content (pose tutorials, anatomical guidance) needs `reviewedBy` pointing to an RYT-certified author. Currently `marvin` is acceptable for placeholder; before publishing instructional content, onboard paid reviewer (see ADR-001).

8. **Validate per route** with:
   - Lighthouse mobile ≥ 90
   - Google Rich Results Test (all emitted schemas)
   - Pinterest Rich Pin Validator (cluster/pillar)
   - View-source check that schema JSON-LD renders
   - 80-point on-page SEO checklist from [[obsidian-vault]] (the canonical version; `on-page-seo.md` in repo is a working copy)

**Current known gaps** (snapshot 2026-05-19, /guides/$slug specifically — others likely similar):

- `loadContent` import was removed in design refactor; MDX body not rendered
- Hardcoded "May 12, 2024 · 6 min read" instead of frontmatter
- No visible `lastReviewedAt`
- No FAQ section in body (schema fine, UI absent)
- No TOC
- No related posts
- No external links
- Pose card has no internal route link
- No `reviewedBy` visible
- No citations[] rendering

See [[homepage-progress]] for template build status, [[obsidian-vault]] for the canonical checklist location.
