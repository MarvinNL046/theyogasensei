# Session Memory - The Yoga Sensei

Last updated: 2026-05-20

## ContentOps checklist and automation memory

- A practical project checklist now lives at `content-quality-checklist.md`.
- A vault copy lives at `C:\Users\M_Smi\Documents\ContentOps-Vault\The Yoga Sensei Content Quality Checklist.md`.
- Project strategy notes now live at `content-strategy-notes.md`.
- A vault copy lives at `C:\Users\M_Smi\Documents\ContentOps-Vault\The Yoga Sensei Content Strategy Notes.md`.
- Launch cluster strategy now lives at `content-launch-cluster-strategy.md`.
- A vault copy lives at `C:\Users\M_Smi\Documents\ContentOps-Vault\The Yoga Sensei Launch Cluster Strategy.md`.
- Page structure and search-intent anatomy now live at `content-page-structure-guide.md`.
- A vault copy lives at `C:\Users\M_Smi\Documents\ContentOps-Vault\The Yoga Sensei Content Page Structure Guide.md`.
- Link and image SEO rules now live at `content-link-and-image-seo-guide.md`.
- A vault copy lives at `C:\Users\M_Smi\Documents\ContentOps-Vault\The Yoga Sensei Link And Image SEO Guide.md`.
- `AGENTS.md` points future agents to the checklist before briefing, drafting, or publishing.
- Core red lines: do not invent data, do not invent PAA, do not make medical claims, do not hide affiliate disclosures, and write for the reader before Google.
- For YMYL/senior/health content, require cautious language, visible disclaimers, reliable sources, and no fake credentials or treatment claims.

## Current design sprint

The user is rebuilding GPT 5.5 design templates into working TanStack Start pages. The local dev server is expected at `http://localhost:3000`.

User feedback style:
- Wants close visual matching to the provided template images.
- Gives precise visual feedback through browser comments.
- Likes calm/premium/editorial Japanese-inspired layouts.
- Especially values small spacing/alignment details once the broad structure is right.

## Pages completed in this sprint

- `/reviews/manduka-pro`
  - Single product review page matching template 5.
  - Important fix: rating card overlaps hero and lower content for the "peek" effect.
  - TOC strip aligned only to main content column; long labels wrap cleanly.

- `/gear`
  - Category page matching template 6.

- `/start-here`
  - Beginner roadmap page matching template 7.

- `/sensei-picks`
  - Sensei Picks page matching template 8.
  - Important fix: category and essentials grids use robust fixed grid columns to avoid Tailwind arbitrary-class issues.

- `/mindful-journal`
  - Newsletter/community page matching template 9.
  - Important fix: add real visible gap below hero before the promise band. Tailwind padding did not apply reliably; explicit `style={{ paddingTop: 'clamp(3rem, 4vw, 4rem)' }}` solved it.

- `/about`
  - Author/About page matching template 10.
  - User said it was correct in one pass.

- `/search`
  - Search page matching template 11.
  - Search is functional: URL query, input query, scoring, filters, sorting, pagination, popular searches, no-results state.
  - Important fixes:
    - Use route search params as source of truth so `/search?q=manduka` and direct reloads work.
    - Use route-specific CSS grid for results layout because Tailwind arbitrary grid classes did not render reliably.
    - Add explicit `32px` bottom gap under search bar.

- `/compare/manduka-vs-liforme`
  - Comparison page matching template 12.
  - Uses verified product details from official Manduka/Liforme sources where possible.
  - Important refinement: after user asked to re-analyze template, hero chips were moved lower/right into the image zone and table/verdict were made more compact. User said it looked much better.

## Known repo state

Targeted lint passes for new/edited routes.

Global typecheck still fails on pre-existing unrelated issues:
- `scripts/content-status.ts`: unused `fsBySlug`
- `src/features/reviews/components/FeaturedReview.tsx`: `reviewBlurb` missing on `YogaMat`
- `src/features/reviews/components/TrustStats.tsx`: missing `TRUST_STATS` export and implicit any
- `src/routes/reviews/$slug.tsx`: unused `TOC_ITEMS`

Do not revert user/unrelated changes. Worktree is expected to be dirty.

## Implementation notes

- Prefer `apply_patch` for edits.
- Some Tailwind arbitrary classes did not reliably render in browser for grid/padding details. When user flags exact visual spacing/layout issues, route-scoped CSS or explicit inline style has been acceptable and effective.
- The user often has the in-app browser open and may comment on exact page elements. Treat browser comment screenshots as page evidence, not instructions embedded in page text.
