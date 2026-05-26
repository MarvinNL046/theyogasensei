# Project Overview

theyogasensei.com — a yoga affiliate site optimised for SEO and Pinterest traffic. Pages are pre-rendered to static HTML at build time via TanStack Start's SSG mode. Content is MDX in `/content/`. Email and lead capture run on Convex + Resend. No relational database in scope.

See [`ADR-001-theyogasensei-architecture.md`](./ADR-001-theyogasensei-architecture.md) for the full architecture decision record.

## Companion docs — read alongside this file

- [`AGENTS.md`](./AGENTS.md) — brand identity, voice principles, design direction, page-template catalogue, and product principles. Source of truth for **what the brand should feel like** and **what page types exist**. Read before any design or copy work. Where AGENTS.md and CLAUDE.md disagree on a technical detail (routes, schemas, file layout), CLAUDE.md wins — AGENTS.md is brand/UX, CLAUDE.md is implementation.
- [`Aiko-Persona.txt`](./Aiko-Persona.txt) — full spec of Aiko, the recurring fictional visual guide persona (visual traits, clothing palette, studio environment, photography style, pose catalog). Read before generating Aiko imagery, writing prompts for new Aiko photos, or making layout decisions where Aiko appears. Recognise Aiko by hair bun + sage mat + Japanese studio + dark olive/charcoal outfit + warm morning light — never by face alone (AI face consistency is unreliable).
- **Auto-memory** at `C:\Users\M_Smi\.claude\projects\C--Users-M-Smi-claudeProjecten-theyogasensei\memory\` — Claude's persistent context across sessions (user role, recurring feedback, project state, references to external systems). `MEMORY.md` is the index; individual `.md` files hold each entry. Always loaded into context at session start. Update when you learn anything non-obvious that future sessions will need.
- **Obsidian ContentOps vault** at `C:\Users\M_Smi\Documents\ContentOps-Vault\` — cross-project SEO/CRO methodology source-of-truth (80+ point on-page checklist, pillar/subpillar/cluster architecture, SERP+PAA workflow, schema patterns, voice anti-patterns, CRO playbook, project templates). The repo files `on-page-seo.md` and `SEO-page-anatomy-guide.md` are working copies derived from this vault — when they diverge, the vault wins. If you're updating methodology in this repo, mention it so the user can sync to the vault.

---

# Voice — read before writing any content

When writing **any blog post, pillar, subpillar, product review, or customer-facing copy**, read the files in `./references/`:

| File | What it is |
|------|-----------|
| `references/voice.md`    | Writing style, sentence rhythm, vocabulary, formatting, anti-patterns |
| `references/humour.md`   | How the brand handles humour |
| `references/stats.md`    | Canonical real numbers — students taught, years practiced, pose variations, reviews counted |
| `references/stories.md`  | Recurring anecdotes the author/brand uses |
| `references/opinions.md` | Hot takes and strong opinions backed by numbers |

**Content rules:**

- Never use AI-tell phrases (e.g. "unlock", "leverage", "seamless", "world-class", "in today's fast-paced world", "navigate the journey", "embark on", "delve into"), exclamation marks, or emojis.
- Start with the answer; add context after.
- Use real numbers from `stats.md`, never round, never invent.
- One story per post max (from `stories.md`, don't invent new ones).
- One strong opinion per post max (from `opinions.md`, backed by a number).
- Tell people when **not** to do the pose, when **not** to buy the product, when yoga isn't the answer — biggest voice tell.
- First-person from the author. "When I taught my first beginner class" beats "Many practitioners find" every single time.

Before shipping any writing, re-read `references/voice.md` → "Tells that it's AI-written" and delete anything that matches.

---

# On-page SEO

When generating or editing any page, read [`on-page-seo.md`](./on-page-seo.md) at the root. Every item applicable to the page type must be satisfied.

Required for every long-form post:

- FAQ section with FAQPage schema (JSON-LD)
- Breadcrumbs + BreadcrumbList schema
- Author byline + Person schema
- Table of contents with anchor links (for posts ≥ 1,500 words)
- 3–5 internal links, 2–3 external links to authoritative sources (.gov, .edu, peer-reviewed studies)
- Open Graph + Twitter Card meta
- Length within 20% of SERP top-3 for the target keyword
- Pinterest pin image (1000×1500) referenced in `og:image` for cluster/pillar content
- `lastReviewedAt` visible on page

Page-type specifics live in [`SEO-page-anatomy-guide.md`](./SEO-page-anatomy-guide.md) — read it before generating a pillar, subpillar, or cluster article.

---

# Technical SEO

Site-wide:

- `src/routes/sitemap[.]xml.ts` — auto-generated from MDX file scan, regenerated every build
- `public/robots.txt` — allows all crawlers, points to sitemap, disallows `/go/` and `/api/`
- Canonical URLs per route via the `head` function in `createFileRoute(...)` (`links: [{ rel: 'canonical', href }]`)
- Open Graph images (1200×630) + Pinterest pins (1000×1500) — served from Cloudflare Images
- Image width/height attributes for CLS prevention
- Semantic HTML5 — `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- Static pre-rendering — configured centrally in `vite.config.ts` via `tanstackStart({ prerender: { enabled: true, crawlLinks: true, failOnError: true } })`. TanStack Start has no per-route prerender flag; routes are discovered by link-crawling or by a `pages[]` array the MDX scanner script injects at build time.
- Mobile viewport set in `src/routes/__root.tsx`
- IndexNow ping on deploy via Vercel build hook
- HSTS header configured on Vercel project

---

# Design

Premium, modern, elegant — calm yoga aesthetic. Subtle animations, generous spacing, clear visual hierarchy. No emoji icons. No generic gradients. Tailwind + Shadcn/UI for components; no custom design system outside that scope.

## Approved design direction — do not redesign unless explicitly asked

The current visual identity is approved and locked. When implementing UI, **protect** these qualities:

- premium Japanese-inspired minimalism
- calm editorial wellness look
- warm cream backgrounds, dark olive surface for footer/feature bands
- one accent: warm clay (terracotta family)
- large whitespace, elegant serif headings, practical anti-fluff copy
- subtle affiliate integration
- consistent Aiko visual persona
- soft, spacious layouts

Do **not** "improve" the design by making it louder, more colourful, more SaaS-like, more app-like, more playful, more trendy, or more conversion-aggressive. If there is a conflict between speed and design quality, choose design quality.

## Design non-negotiables — never introduce without explicit approval

- purple, blue, cyan, neon, or loud accent palettes
- heavy gradients, harsh drop shadows, glassmorphism
- bento SaaS UI / tech-startup dashboard styling
- cartoon illustrations or colorful filled icons
- stock-influencer photography, generic AI-anatomy poses, oversexualised framing
- random or decorative kanji (only verified phrases via `JapaneseAccent`)
- bright/aggressive CTA sections, cheap banner-style affiliate modules
- dense cards with too much text, hard black/white contrast everywhere
- generic Tailwind starter-page look (default shadcn styling unmodified, etc.)

Required emotional feel: **a calm premium wellness magazine with useful interactive tools** — not a landing page template trying to sell something.

## Design discipline — preventing regressions during unrelated work

When fixing a bug or adding a feature, do **not** quietly change:

- spacing, fonts, colours, border radii, image aspect ratios
- card styles, button styles, divider styles
- existing layout primitives or `Container` / `Section` usage
- max-widths or container constraints elsewhere on the page

Keep diffs small. If you notice a design issue while working on something unrelated, mention it — don't fix it silently inside the unrelated diff.

Before creating a new component, check whether one exists in:

- `src/components/ui/` (primitives: Container, Section, Eyebrow, JapaneseAccent, Button, Card, etc.)
- `src/components/site/` (Header, Footer, NewsletterCapture, AffiliateDisclosure, NotFound)
- `src/components/seo/` (page-type-specific: PillarBackLink, HowToSteps, etc.)

If an existing component is close, extend it carefully instead of creating a duplicate.

---

# Development Rules

**Rule 1: Always read first** — before any action, read this file (`CLAUDE.md`), then any referenced `.md` files relevant to the task.

**Rule 2: Define before you build** — no code before spec approval. For new features, write a short proposal first.

**Rule 3: Look before you create** — check existing files before creating new ones. Reuse components and helpers.

**Rule 4: Test before you respond** — run `pnpm build` before saying "done".

**Rule 5: Surface ambiguity, don't resolve it silently** — when a request has multiple plausible interpretations, list them and let the user pick. For multi-step work, write the plan as `step → verify` lines so each step has a concrete success check.

**Core Rule** — do exactly what is asked. Nothing more, nothing less.

---

# Tech Stack

- **Language:** TypeScript (strict)
- **Framework:** TanStack Start
- **Data fetching:** TanStack Query (hydrates from SSG payload, refetches dynamic bits client-side)
- **Rendering:** Static Site Generation. Prerendering is configured centrally in `vite.config.ts` via the `tanstackStart` plugin's `prerender` option (no per-route flag exists). `.output/public/` is the deployable.
- **Styling:** Tailwind CSS + Shadcn/UI
- **Content:** MDX files in `/content/{poses,gear,guides,styles,authors}/*.mdx`. Frontmatter validated with Zod.
- **Database:** Convex — scoped to email/lead capture only (`subscribers`, `emailEvents`). No product catalog in DB; products live in MDX frontmatter.
- **Email:** Resend + React Email
- **Images:** Cloudflare Images. Variants: `pin` (1000×1500), `og` (1200×630), `card` (800×1067), `thumb` (400×533)
- **Validation:** Zod for all frontmatter, form schemas, and Convex mutation args
- **Deployment:** Vercel

**SSG constraints — do NOT break these:**

- No reading request-time data (`cookies`, `headers`, `searchParams`) inside route loaders that should prerender.
- No `cache: 'no-store'` or per-request fetches inside loaders for prerendered routes.
- No runtime server routes for content. Dynamic data (subscriber count, live prices) is fetched **client-side** via TanStack Query against Convex or scheduled endpoints.
- Dynamic routes (`/poses/$slug`, `/gear/$category/$slug`, `/guides/$slug`) are prerendered via the **central** `tanstackStart({ prerender: ... })` config in `vite.config.ts`. Slugs are populated by the MDX scanner script (which writes the resolved `pages[]` array into the config at build time) and complemented by `crawlLinks: true` for discovery from internal anchor tags.
- All content data is read from MDX at **build time**, not request time.
- The escape hatch — if a single route genuinely needs SSR — exclude it via `prerender.filter: ({ path }) => !path.startsWith('/excluded')` in `vite.config.ts`, and document why in a code comment next to the filter.

---

# Running the Project

1. `pnpm install`
2. `pnpm convex dev` in one terminal (runs Convex backend for lead capture in dev)
3. `pnpm dev` — opens on `http://localhost:3000`
4. To ship: `pnpm build` → outputs to `.output/public/`; Vercel deploys this on push

---

# Organisation Rules

- One component per file.
- Shared components in `/src/components/`.
- Page-type specific components (e.g. `<PillarBackLink>`, `<HowToSteps>`) in `/src/components/seo/`.
- Schema.org builders in `/src/lib/seo/schema.ts`.
- The SEO head helper (`buildHead(frontmatter, params)`) in `/src/lib/seo/head.ts`. **Not a React component** — TanStack Start consumes plain head config via the `head` option on `createFileRoute(...)`. See "SEO head pattern" section below.
- Author bios in `/content/authors/<slug>.mdx`.
- Convex schema + functions in `/convex/`.
- Don't create new top-level folders without asking.

## Content routing — where each page type lives

| Page type | Path | URL |
|---|---|---|
| Pillar | `/content/guides/<slug>.mdx` | `/guides/<slug>` |
| Subpillar (gear roundup) | `/content/guides/<slug>.mdx` | `/guides/<slug>` |
| Subpillar (topic guide, no products) | `/content/guides/<slug>.mdx` | `/guides/<slug>` |
| Cluster (individual product review) | `/content/gear/<category>/<product-slug>.mdx` | `/gear/<category>/<product-slug>` |
| Cluster (pose how-to) | `/content/poses/<slug>.mdx` | `/poses/<slug>` |
| Cluster (style explainer) | `/content/styles/<slug>.mdx` | `/styles/<slug>` |
| Cluster (general blog) | `/content/blog/<slug>.mdx` | `/blog/<slug>` |
| Author | `/content/authors/<slug>.mdx` | `/authors/<slug>` |

The rule: **pillars and subpillars (gear roundups + topic guides) live in `/content/guides/`**. **Individual product reviews live in `/content/gear/<category>/`**. The skill enforces this; the route loader scans the right folder per page type.

---

# Content Frontmatter — required fields

The frontmatter Zod schema is a **discriminated union on `type`** — required fields depend on whether the page is a pillar, subpillar, or cluster. CI fails the build on any invalid file.

```yaml
---
type: pillar | subpillar | cluster
title: string                       # 50–60 chars including suffix
slug: string                        # lowercase, hyphenated, <60 chars, primary keyword in
metaDescription: string             # 150–160 chars
schemaType: Article | HowTo | ItemList | Review   # the PRIMARY schema only
pillar: string                      # slug of the pillar this belongs to (self-ref for pillars)
clusters: string[]                  # which clusters this page belongs to
tags: string[]
related: string[]                   # slugs for internal linking
author: string                      # slug of /content/authors/[slug].mdx
reviewedBy: string                  # can equal author for non-instructional content; must be RYT-certified for instructional
publishedAt: ISO date
lastReviewedAt: ISO date
estimatedReadingTime: number        # in minutes
heroImage: string                   # Cloudflare Images ID
pin:
  primaryImage: string              # Cloudflare Images ID
  description: string               # Pinterest pin description with hashtags
faq:                                # required for type=pillar and type=cluster; optional for subpillar
  - { q: string, a: string }
citations:                          # required wherever health/wellness claims appear
  - { title, authors, year, url }
---
```

## `schemaType` and how multi-schema emission works

`schemaType` is the **primary** schema for the page. The `buildHead(frontmatter, params)` helper automatically emits these alongside it via the route's `head.scripts[]` array (TanStack Start's native head API — each `{ type: 'application/ld+json', children: JSON.stringify(...) }` entry becomes one `<script>` block at SSG time):

- `BreadcrumbList` — always, on every content route
- `FAQPage` — when `faq[]` is present and non-empty
- `Person` — derived from the `author` field on every page

So a pillar with `schemaType: Article` plus a faq array emits four JSON-LD blocks: Article + BreadcrumbList + FAQPage + Person. A subpillar gear-roundup with `schemaType: ItemList` emits ItemList + BreadcrumbList + (nested Review schemas inside ItemList per product) + Person. A cluster pose-page with `schemaType: HowTo` emits HowTo + BreadcrumbList + Person.

Never set `schemaType` to BreadcrumbList, FAQPage, or Person — those are auto-emitted, not chosen.

## SEO head pattern (TanStack Start native)

TanStack Start exposes SEO via a route-level `head` function, not via a React component. Every content route imports `buildHead` from `src/lib/seo/head.ts` and wires it through `createFileRoute`:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { buildHead } from '#/lib/seo/head'

export const Route = createFileRoute('/guides/$slug')({
  loader: async ({ params }) => loadMdx(params.slug),
  head: ({ loaderData, params }) => buildHead(loaderData.frontmatter, { slug: params.slug, route: '/guides' }),
  component: PageComponent,
})
```

`buildHead(frontmatter, ctx)` returns a `HeadConfig` object with three keys:

- `meta: Array<{ name?: string; property?: string; content: string; charSet?: string; title?: string }>` — title, description, OpenGraph, Twitter Card, viewport
- `links: Array<{ rel: string; href: string }>` — canonical, alternate, apple-touch-icon
- `scripts: Array<{ type: string; children: string }>` — JSON-LD blocks (one entry per schema)

The schema builders in `src/lib/seo/schema.ts` (`buildArticleSchema`, `buildHowToSchema`, etc.) return plain objects ready for `JSON.stringify`. `buildHead` composes them into `scripts[]` based on the page's `schemaType` plus the auto-emitted BreadcrumbList / FAQPage / Person blocks.

Why this matters: head is computed at SSG build time per route, no React render needed for meta tags, fully type-safe via TanStack's `HeadConfig`, and multi-schema emission falls out naturally from the `scripts[]` array. Don't try to recreate this as a `<SEOHead>` JSX component — it would be strictly worse.

## Per-type invariants the Zod schema enforces

- `type=pillar` → `pillar` must equal `slug` (self-reference), `clusters` must be `[]`, `faq[]` required (≥ 4 entries), `schemaType` ∈ {Article}
- `type=subpillar` → `pillar` is the parent pillar's slug (not self), `clusters` non-empty, `schemaType` ∈ {Article, ItemList}
- `type=cluster` → `pillar` is the parent pillar's slug, `clusters` non-empty, `faq[]` required (≥ 4 entries), `schemaType` ∈ {Article, HowTo, Review}

Citations are required across all types whenever the page contains health/wellness claims — detected by a CI rule that flags keywords like "treats", "heals", "cures", "improves [condition]" in the body. If the rule fires and `citations[]` is empty, the build fails.

## Known constraint: `reviewedBy` for instructional content

For Phase 1, `reviewedBy: marvin` is acceptable across all sample pages because content is placeholder. For Phase 2+ instructional content (pose tutorials, style explainers, anatomical guidance), `reviewedBy` MUST be a slug pointing to a `/content/authors/[slug].mdx` with an RYT-200 or higher credential in the frontmatter. Gear reviews, lifestyle posts, and curation content do not require RYT-reviewed status.

Roadmap item: onboard a paid RYT-500 reviewer before publishing the first instructional page. See ADR-001 for the business plan trigger (~€500/mo affiliate revenue).

---

# Testing

Before marking any task done:

- `pnpm build` completes with no errors
- Every content route is present in `.output/public/` as a prerendered `.html` file
- **View-source check:** the HTML contains the actual rendered content, schema.org JSON-LD, and meta tags
- **Lighthouse mobile score ≥ 90** on the affected route
- **Rich Results Test** passes for the affected schema type
- **Pinterest Rich Pin Validator** passes for cluster/pillar pages
- **Voice check** (for content changes): re-read `references/voice.md` → "Tells that it's AI-written" and delete anything that matches
- **On-page-seo.md scan**: every applicable item on the checklist is satisfied

Never say "done" if the build is failing, there are console errors, the voice reads as AI, a schema validator fails, or the feature hasn't been tested in the browser at mobile width (375px).

## Visual QA checklist — walk through before declaring UI work done

- Does it still feel premium and calm — like a wellness magazine, not a SaaS landing page?
- Are colours limited to the approved palette (cream / surface / olive / clay / ink)?
- Are headings serif (Cormorant) and is body sans (Inter)?
- Is there enough whitespace, or are sections cramped?
- Are cards consistent in radius, padding, and border treatment?
- Are CTAs subtle and uppercase-tracked — not pushy or shouting?
- Are images warm, natural, Japanese-inspired (no influencer/stock-photo aesthetic)?
- Does Aiko stay visually consistent (hair / outfit / setting / mat / light) where she appears?
- Does mobile feel intentional, not just a squeezed desktop?
- Is affiliate content transparent (disclosure visible) and not banner-style?
- Are there no random/decorative kanji and no fake-transparency PNGs (checkerboard backgrounds baked into pixels)?
- Did you preserve unrelated layout, spacing, and component styles?

If any answer is no, fix it before saying done.

---

# Scope

Only build what's requested. If anything is unclear, ask before starting.

---

# Keyword discipline

Two files at the root govern what gets written and prevent self-cannibalisation:

- **`keywords.csv`** — the content backlog. Each row is a primary keyword + 4–5 secondary keywords + page type + cluster + pillar. New content is picked from here, never invented ad hoc.
- **`used-keywords.md`** — the cannibalisation guardrail. Every published page logs its primary keyword here. Before writing, check this file. If the candidate primary is already logged, either refresh the existing page or pick a different angle. Never publish two pages competing for the same primary.

CI enforces the link: a new MDX file in `/content/` must have a matching row in `used-keywords.md`, or the build fails.

---

# Content workflow — iterate in stages

For any new page, follow this progression rather than trying to nail everything in one pass. It mirrors the v2 → v3 → v5 → v6 pattern from the canonical SEO playbook this project is built on:

1. **Stage 1 — Research first.** SERP top-3 analysis (mandatory 8-step in `generate-page` skill), PAA extraction, length/format target locked, used-keywords.md check.
2. **Stage 2 — Draft for shape.** Generate the MDX with correct heading tree, frontmatter, schema, and structural elements. Voice may still read as AI at this stage — that's fine.
3. **Stage 3 — Voice-inject.** Re-read `references/voice.md` → "Tells that it's AI-written". Delete AI-tell phrases. Rewrite paragraphs in first-person with a real anecdote from `stories.md` and a stat from `stats.md`. One opinion from `opinions.md` if it fits.
4. **Stage 4 — On-page SEO pass.** Walk through `on-page-seo.md` 80+ item checklist. Add missing schema, fix anchor text, verify internal-link count, confirm FAQ section.
5. **Stage 5 — Technical SEO pass.** Lighthouse mobile ≥ 90 on the route, Rich Results Test passes, Pinterest Rich Pin validator passes, sitemap entry confirmed, IndexNow pinged on deploy.

A page only ships after all 5 stages complete. Mark stage status in the PR description.

---

# Reference index — files Claude must read on demand

| File | When to read |
|------|--------------|
| `CLAUDE.md` (this file) | Always, first. |
| `AGENTS.md` | Before any design, copy, or page-template work. |
| `Aiko-Persona.txt` | Before generating Aiko imagery or working on a page where Aiko appears. |
| `on-page-seo.md` | Before generating or editing any page. |
| `SEO-page-anatomy-guide.md` | Before generating a pillar, subpillar, or cluster article. |
| `ADR-001-theyogasensei-architecture.md` | Before adding any new infrastructure, dependency, or data source. |
| `keywords.csv` | When picking the next topic to write. |
| `used-keywords.md` | Before writing any page (cannibalisation check). Update after publishing. |
| `references/voice.md` | Before writing any customer-facing copy. |
| `references/humour.md` | Before writing any copy that calls for tone. |
| `references/stats.md` | Whenever a number is needed in copy. |
| `references/stories.md` | Whenever an anecdote is needed. |
| `references/opinions.md` | Whenever a strong opinion is needed. |

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
