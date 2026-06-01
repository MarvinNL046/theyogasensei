---
name: feedback-component-based
description: "Always build new pages component-based with a data file + small focused components, never inline everything in the route file"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ab9ceb43-2414-4ab6-9c22-e478565ee2d5
---

For any new page on theyogasensei.com, build **component-based + data-driven**: a thin route file that imports/assembles, a separate data file with typed dummy data, and small focused components — never inline everything in the route.

**Why:** During the design build (2026-05-19) I inlined the entire homepage, /guides, and /guides/$slug pages directly in the route files — hundreds of lines of mixed JSX with hardcoded arrays. Marvin called this out explicitly: "ja we moeten altijd component-based werken heb je dat eerder niet gedaan?" The inline approach makes diffs huge, kills reuse (e.g. the Newsletter widget got rebuilt twice across /guides and /guides/$slug), and turns small UI tweaks into long-file edits that risk side effects. Marvin's preferred pattern was demonstrated when he handed me a structural briefing for template 4 (gear roundup): explicit component list, data file location, design tokens. That's the bar.

**How to apply:** When a new page is requested:

1. **Data file first** — define types in `src/features/<feature>/data/<noun>.ts` (e.g. `src/features/reviews/data/yoga-mats.ts`). Export the type and the typed array. No data in components.
2. **Atomic components** — split UI into `src/features/<feature>/components/<Name>.tsx`. Each file = one component. Prop types explicit. Reuse primitives from `src/components/ui/` (Container, Section, Eyebrow, JapaneseAccent, Button, Card).
3. **Thin route file** — `src/routes/<route>.tsx` only does: route config (loader, head), then assembles the components in order. Should read like a table of contents. Place hardcoded copy in the data file or as props, not as inline text.
4. **Reusable sidebar widgets** — when a widget appears on multiple pages (e.g. Newsletter, Popular Posts, Categories, About Author), extract to its own component the first time it's needed across two routes. Do NOT copy-paste it.
5. **Lighter components live in `src/components/ui/`** — only truly generic primitives belong here. Feature-specific stuff stays in `src/features/<feature>/components/`.
6. **Existing inline pages** are flagged for refactor: `src/routes/index.tsx` (homepage), `src/routes/guides/index.tsx` (blog index), `src/routes/guides/$slug.tsx` (blog detail). These should be broken apart in a future session — see [[homepage-progress]] and the SEO+EEAT pass.

Follow this pattern from the start of any new page; do not need to be asked.
