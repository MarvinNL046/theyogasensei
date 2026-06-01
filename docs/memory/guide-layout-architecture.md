---
name: guide-layout-architecture
description: How the guide route TOC + affiliate disclosure work; the ?raw MDX gotcha that caused a 404
metadata: 
  node_type: memory
  type: project
  originSessionId: 247b1b40-280e-45f0-8514-9c9d3c6ff24d
---

Guide pages render via `src/routes/guides/$slug.tsx` (hero → article.prose with `<Component/>` + sidebar aside). Two non-obvious mechanisms:

**In-page TOC** (`src/components/seo/GuideToc.tsx`): shown only at ≥6 H2s. The H2 outline is scanned from raw MDX at **build time** (`scripts/extract-guide-headings.ts`) and inlined via vite `define` (`__GUIDE_HEADINGS__` in `vite.config.ts`), because the compiled MDX module exposes no headings export **and the MDX plugin intercepts `?raw` imports** — an `import.meta.glob(..., {query:'?raw'})` returns the compiled component, not source, so `raw.replace(...)` throws → the route loader's catch turns it into `notFound()` → every guide 404'd. Don't reach for `?raw` again. Ids use `github-slugger` (the same lib rehype-slug uses) so TOC jump-links match the heading anchors exactly. `scroll-behavior:smooth` is already global in `styles.css`; headings carry `scroll-mt-28`.

**Affiliate disclosure** (`src/components/site/AffiliateDisclosure.tsx`): one compact muted line, rendered by the route at the top of the article column (above TOC + all affiliate links, FTC clear-and-conspicuous), **gated on `frontmatter.clusters.includes('affiliate')`** — that cluster flag cleanly identifies exactly the monetised guides. It is NOT inline in the MDX anymore (the old 3-line inline para was stripped). Don't re-add an inline disclosure paragraph to affiliate MDX — the route owns it now.

See also [[design-system-decisions]], [[affiliate-gate-launch]].
