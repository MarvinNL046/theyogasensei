# ADR-001: theyogasensei.com — Architecture & SEO Strategy

**Status:** Accepted (v2 — stack confirmed by founder)
**Date:** 2026-05-12
**Deciders:** Marvin (solo founder/developer)

---

## Context

theyogasensei.com is a yoga affiliate website monetized through partner programs (Amazon Associates, Manduka, Lululemon, Alo Yoga, Liforme, etc.). Traffic comes from two channels:

1. **Organic search** — must rank for yoga long-tail queries through deep topical authority
2. **Pinterest** — image-first traffic, requires vertical pin imagery and Rich Pins

Monetization happens via affiliate clicks. Email list is the secondary asset (newsletter → repeat traffic + future product launches).

**Founder context that shaped this revision**

- Tech stack is decided — TanStack Start + TanStack Query + Convex + Tailwind + Shadcn/UI + Resend + MDX
- Convex is used **only for email/lead capture** for now (not the product catalog)
- English-only at launch; i18n hooks left in place
- Founder is not yet an SEO expert — this ADR doubles as the SEO playbook

---

## Stack Decision (locked)

| Layer         | Tool                                      | Why                                                                                               |
| ------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Framework     | **TanStack Start** (SSG mode)             | File-based routing, type-safe nested layouts, prerender all content routes                        |
| Data fetching | **TanStack Query**                        | Hydrates from SSG payload; powers client-side refetch for dynamic bits (prices, subscriber count) |
| Database      | **Convex** (scoped to email/lead capture) | Real-time-ready, type-safe, founder familiar                                                      |
| Email         | **Resend + React Email**                  | Transactional + newsletter, founder's default                                                     |
| Styling       | **Tailwind + Shadcn/UI**                  | Velocity, design consistency                                                                      |
| Content       | **MDX in-repo**                           | Git-versioned, AI-draftable, no CMS overhead                                                      |
| Images        | **Cloudflare Images**                     | Variants from one upload — Pinterest 1000×1500 + OG 1200×630 + responsive                         |
| Hosting       | **Vercel**                                | Edge SSR, native TanStack Start support                                                           |
| Validation    | **Zod**                                   | Frontmatter, form schemas, API contracts                                                          |

**Explicitly not in scope (yet):** Neon, Drizzle, headless CMS, product database. Products are surfaced via MDX frontmatter + structured data; if/when the catalog outgrows MDX, migrate cleanly to Convex tables or Neon.

---

## Rendering strategy: SSG (chosen)

**Decision:** prerender all content routes (`/poses/*`, `/styles/*`, `/gear/*`, `/guides/*`, `/authors/*`, home, about) at build time. Lead-capture forms, click counters, and price refreshes happen client-side via TanStack Query against Convex/Resend.

### Why SSG beats SSR here

| Dimension             | SSG                                              | SSR                                            | Verdict                                                   |
| --------------------- | ------------------------------------------------ | ---------------------------------------------- | --------------------------------------------------------- |
| LCP / Core Web Vitals | HTML is on the CDN edge, sub-100ms TTFB globally | TTFB depends on server compute + region        | SSG wins clearly                                          |
| SEO crawlability      | Identical (both ship complete HTML)              | Identical                                      | Tie                                                       |
| Hosting cost          | Static CDN — effectively free at scale           | Compute per request — bill scales with traffic | SSG wins                                                  |
| Fresh data            | Stale until next build                           | Always fresh                                   | SSR wins — but irrelevant for evergreen content           |
| Build time            | Grows with content (~30s per 100 pages)          | Constant                                       | SSR wins eventually — but you're nowhere near the ceiling |
| Solo-dev ops          | Zero runtime to monitor                          | Need to watch cold starts, error budgets       | SSG wins                                                  |

**Why this works for your case specifically**

- Yoga content is evergreen. A pose article doesn't change weekly.
- Affiliate prices DO change — handled client-side (see below), not in the prerendered HTML.
- Subscriber count, click counters, dynamic CTAs — all client-fetched after hydration; they don't need to be in the static HTML.
- Vercel rebuilds on git push (~1–3 min for a few hundred pages). Editorial workflow becomes: edit MDX → commit → live in minutes.

### How dynamic data survives in an SSG world

```
Static (in HTML, prerendered):
  ✓ Article body, headings, schema.org JSON-LD
  ✓ Author bio + photo
  ✓ Product name, slug, description, hero image
  ✓ Internal links, breadcrumbs, related articles
  ✓ Affiliate disclosure
  ✓ Last-updated date (rebuilt nightly = day-fresh)

Client-fetched after hydration (TanStack Query):
  ✗ Current price + currency (from price-feed function or scheduled Convex sync)
  ✗ "In stock" badge
  ✗ Lead capture form state
  ✗ Newsletter subscriber count ("Join 1,247 yogis...")
  ✗ Recently viewed / personalized recommendations (when added)
```

The HTML Google indexes contains the _content_. The HTML Pinterest crawls contains the _image and OG tags_. Neither cares about live prices. Users see prices on hydration — fine, because the link-out `/go/[slug]` is what actually monetizes, and that's stable.

### Rebuild cadence

- **On push** — every git commit triggers a Vercel rebuild (full SSG)
- **Nightly cron** — Vercel Cron triggers a rebuild at 03:00 UTC so `lastReviewedAt` and price snapshots stay fresh
- **On-demand** — if you ever need ISR-style behavior for a single route, exclude it from the central prerender config via `prerender.filter: ({ path }) => !path.startsWith('/excluded')` in `vite.config.ts`. TanStack Start has no per-route prerender flag; all prerender control is central. Use as escape hatch, not default.

### When to revisit

- Pillar gets to ~5,000+ pages AND build time exceeds 10 minutes → split into multiple Vercel projects per cluster, or move some routes to ISR
- You launch a feature that genuinely needs per-user server-rendered data (auth-gated content, personalized homepages) → those routes go SSR while the rest stay SSG

---

## The SEO Architecture (the actual moat)

For a content/affiliate site, the tech stack matters far less than how content is structured. This is the part to get right.

### 1. Topical authority via pillar/cluster model

You don't rank by writing more — you rank by **owning a topic**. The pattern that consistently works:

```
                   [Pillar page: "Yoga for Beginners"]
                              ^   ^   ^   ^
                             /    |    \    \
                  [Cluster] [Cluster] [Cluster] [Cluster]
                  Sun Salu- Best Mat   Breath-   Beginner
                  tation    for Begin  ing 101   Mistakes
```

Every cluster article links **up** to its pillar. The pillar links **down** to every cluster. Siblings cross-link where contextually natural. Google reads this graph and concludes: "this site is the authority on Yoga for Beginners."

**Proposed topic clusters for theyogasensei.com**

Each cluster = one pillar (2000–4000 words) + 8–15 cluster articles (800–1500 words). Aim for full cluster coverage before opening a new pillar.

| Pillar (1 per topic)        | Example cluster articles                                                                                             |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Yoga for Beginners          | Sun Salutation step-by-step · 5 mistakes beginners make · Beginner mat buying guide · First 10 poses · Breath basics |
| Yoga Styles Explained       | Hatha vs Vinyasa · What is Ashtanga · Yin yoga benefits · Iyengar vs Anusara · Restorative for stress                |
| Yoga Gear & Reviews         | Best yoga mats 2026 · Best blocks · Best straps · Best leggings · Travel mat comparison                              |
| Yoga for Specific Goals     | Yoga for flexibility · Yoga for back pain · Yoga for sleep · Yoga for runners · Yoga for desk workers                |
| Home Practice               | Building a home studio · Best yoga apps · DIY yoga corner · Daily 15-min routines                                    |
| Yoga Philosophy & Lifestyle | The 8 limbs · Pranayama explained · Meditation for beginners · Yoga journals worth keeping                           |

This is where affiliate revenue lives — the gear/reviews cluster monetizes hard, the others build authority and feed the gear cluster through internal linking.

### 2. URL structure (locked once chosen — don't redirect later)

```
/                                    Home
/start-here                          Funnel entry, email capture
/poses/                              Pose library index
/poses/[pose-slug]                   /poses/downward-facing-dog
/styles/                             Yoga style index
/styles/[style-slug]                 /styles/vinyasa
/gear/                               Gear category index
/gear/[category]/                    /gear/mats
/gear/[category]/[product-slug]      /gear/mats/manduka-prolite
/guides/[topic-slug]                 /guides/yoga-for-beginners ← pillar pages live here
/about                               E-E-A-T critical
/authors/[author-slug]               E-E-A-T critical
/go/[slug]                           Affiliate redirect (noindex)
/sitemap.xml, /robots.txt, /rss.xml
```

Flat where possible. `/poses/[slug]` not `/yoga/poses/[slug]`. Avoid date-based URLs (evergreen content shouldn't look stale).

### 3. Internal linking — the actual ranking lever

Three link types, every page uses all three:

- **Cluster → pillar** — every cluster article links its pillar in the first 150 words ("part of our complete guide to Yoga for Beginners")
- **Pillar → cluster** — pillar pages contain a "Read next" or "In this cluster" section linking all children
- **Contextual cross-cluster** — when a "Best Mat for Beginners" article mentions Sun Salutation, link to the Sun Salutation pose page

**Build a "related content" component that queries by tag, not random.** Hardcode tags in MDX frontmatter:

```yaml
---
title: "Sun Salutation: The Complete Beginner's Guide"
slug: sun-salutation
pillar: yoga-for-beginners
clusters: [poses, beginner]
tags: [sun-salutation, vinyasa, morning-routine, beginner]
related: [downward-facing-dog, cobra-pose, mountain-pose]
---
```

The `pillar` field powers the breadcrumb + "back to pillar" CTA. The `related` field powers the in-content sidebar. Internal linking becomes data-driven, not a manual chore.

### 4. Heading hierarchy (the structural SEO that 90% of sites still get wrong)

**One H1 per page. Always.** TanStack Start's layout should not emit an H1 — only the page does.

```
H1: Sun Salutation: The Complete Beginner's Guide       ← page title, once
  H2: What Is Sun Salutation?
  H2: Why Sun Salutation Matters
  H2: How to Do Sun Salutation (Step-by-Step)
    H3: Step 1 — Mountain Pose (Tadasana)
    H3: Step 2 — Upward Salute (Urdhva Hastasana)
    H3: Step 3 — Standing Forward Fold (Uttanasana)
    ...
  H2: Common Beginner Mistakes
  H2: Sun Salutation Variations
    H3: Surya Namaskar A
    H3: Surya Namaskar B
  H2: Recommended Gear for Sun Salutation
  H2: Related Poses & Articles
```

**Rules:**

- H2s should each match a search-intent subtopic (steal from "People Also Ask" boxes on Google)
- H3s only when H2 genuinely has nested structure
- Skip H4+ — if you need them, you're writing two articles
- Lock heading rendering at the MDX layer so authors can't break the tree

Build a `<Heading level={2 | 3}>` Shadcn-styled component that enforces semantic correctness and styles consistently — H1 is owned by the route's `<title>` only, H4+ are forbidden (if you need H4, split the article). Use `rehype-slug` + `rehype-autolink-headings` for anchor links.

### 5. E-E-A-T signals (Experience · Expertise · Authoritativeness · Trustworthiness)

Post-2022, this is the difference between "ranks" and "doesn't rank" for health/wellness queries — yoga sits squarely in YMYL-adjacent territory.

**Mandatory page-level signals**

- **Author bylines on every article** — name, photo, credentials, link to `/authors/[slug]`
- **Author pages** with: 200-line professional bio, credentials (RYT-200, RYT-500, certifications), years of practice, social proof (links to LinkedIn, Instagram, certifications)
- **Last reviewed date + reviewed-by signature** — "Last updated May 2026, reviewed by [Author]"
- **First-person experience** — "When I taught my first beginner class..." beats generic prose every time
- **Citations** — link to peer-reviewed studies for any health claim, link to original source for any quote
- **About page** with founder photo, story, contact email (real, not a form), business address
- **Affiliate disclosure** above the fold on every product page, plus footer site-wide
- **Privacy policy + terms** — boilerplate is fine, but they must exist

**Structured data per content type**

| Page type             | Schema.org type                           |
| --------------------- | ----------------------------------------- |
| Pose article          | `HowTo` + steps                           |
| Style explainer       | `Article`                                 |
| Product review        | `Review` with `itemReviewed: Product`     |
| Best-X listicle       | `ItemList` + nested `Review`s             |
| Pillar guide          | `Article` + `BreadcrumbList`              |
| Author page           | `Person` with `knowsAbout` and `alumniOf` |
| Recipe-style routines | `HowTo` with `totalTime` and `step`       |

Centralize schema generation in a `lib/seo/schema.ts` builder — never hand-write JSON-LD in pages.

**Reusable React component patterns**

```tsx
<ArticleHeader
  title={...}
  author={...}            // resolves to author MDX, pulls credentials + photo
  publishedAt={...}
  lastReviewedAt={...}
  reviewedBy={...}        // can be same as author or different
  estimatedReadingTime={...}
/>

<AuthorBylineCompact author={...} />     // appears at top
<AuthorCard author={...} />              // appears at bottom with longer bio

<AffiliateDisclosure />                  // always above the fold on review pages

<CitationList citations={...} />         // peer-reviewed sources
```

### 6. Pinterest as second-pillar traffic

Pinterest is functionally a visual search engine and Google indexes Pinterest itself — well-optimized pins double as backlinks.

**Per-article requirements**

- **Vertical hero image** (1000×1500 minimum) in MDX frontmatter — Cloudflare Images variant `pin`
- **Pin title** (different from page title — Pinterest's title can be more clickbaity, 60–100 chars)
- **Pin description** with relevant hashtags (200–500 chars)
- **`og:image` on every page** points to the vertical pin variant so users sharing/saving pull the right asset
- **Rich Pin verification** — verify domain in Pinterest, Rich Pins activate automatically via schema.org/Article

**Workflow**

Per pillar/cluster article, design 3–5 pin variants (different headlines, different visuals) and schedule via Tailwind App (yoga audience overlaps heavily with Pinterest schedulers — Tailwind, Buffer, Pinterest's native scheduler). Variant testing tells you which pin earned the click.

Frontmatter extension:

```yaml
---
pin:
  primaryImage: poses/sun-salutation-pin-a.jpg
  variants:
    - { image: …-pin-b.jpg, title: '5-min morning yoga that changed my life' }
    - {
        image: …-pin-c.jpg,
        title: 'Sun Salutation: Step-by-step for absolute beginners',
      }
  description: "The complete beginner's guide to Sun Salutation. Step-by-step photos, common mistakes, and how to add it to your morning routine. #yoga #yogaforbeginners #morningroutine"
---
```

### 7. Technical SEO baseline

Things to set up once and forget:

- `<title>` and `<meta name="description">` per route, length-validated
- Canonical URLs (avoid duplicate-content penalties from query strings)
- `<meta name="robots">` controls per page (noindex on `/go/[slug]` and `/search` results)
- Dynamic `/sitemap.xml` — auto-generated from MDX file scan
- `/robots.txt` — allow everything except `/go/`, `/api/`
- `/rss.xml` — for newsletter feed + indexing signal
- 301 redirects table in code (when you rename slugs)
- Open Graph + Twitter card meta on every page
- `hreflang` placeholder for future i18n
- Web Vitals tracking via Vercel Analytics + send to Convex if you want to keep history

**Core Web Vitals targets (mobile)**

- LCP < 2.5s — preload hero image, use Cloudflare Images responsive variant
- INP < 200ms — minimize client JS; TanStack Start's SSR-first model helps
- CLS < 0.1 — reserve image dimensions, no late-loading hero, no font-swap shift

---

## Lead Capture Flow (Resend + Convex)

```
[Landing CTA / inline form / exit-intent modal]
       ↓ submit (TanStack Server Action)
[Zod validation]
       ↓
[Convex mutation: insertSubscriber(email, source, timestamp, doubleOptInToken)]
       ↓ trigger
[Resend → send double-opt-in email]
       ↓ user clicks confirm
[Convex mutation: confirmSubscriber(token)]
       ↓
[Resend → welcome email + lead magnet (e.g. "7-Day Beginner Yoga PDF")]
```

**Convex schema (initial, minimal)**

```ts
// convex/schema.ts
defineSchema({
  subscribers: defineTable({
    email: v.string(),
    source: v.string(), // "homepage", "pillar:beginners", "exit-intent"
    confirmedAt: v.optional(v.number()),
    optInToken: v.string(),
    leadMagnet: v.optional(v.string()),
    tags: v.array(v.string()), // for future segmentation
  })
    .index('by_email', ['email'])
    .index('by_token', ['optInToken']),

  emailEvents: defineTable({
    subscriberId: v.id('subscribers'),
    type: v.string(), // "sent", "opened", "clicked", "bounced"
    template: v.string(),
    timestamp: v.number(),
  }).index('by_subscriber', ['subscriberId']),
})
```

Resend webhooks land on a Convex HTTP action to record `opened/clicked/bounced` — gives you per-subscriber engagement scoring without leaving the stack.

**Lead magnets per cluster**

- Beginners cluster → "7-Day Beginner Yoga Starter PDF"
- Gear cluster → "Yoga Mat Buyer's Cheat Sheet"
- Styles cluster → "Which Yoga Style Fits You? Quiz + Result PDF"

Different cluster, different magnet, different tag in Convex — segment newsletters accordingly later.

---

## Consequences

**What becomes easier**

- Adding a new article = one MDX file with structured frontmatter; SEO scaffolding (schema, breadcrumbs, related links, sitemap entry) generates automatically
- Author E-E-A-T propagates via shared author MDX files
- Pinterest pins ship in the same PR as the article — no fragmented workflow
- Lead capture stays on your stack — no Mailchimp/ConvertKit dependency

**What becomes harder**

- Discipline required: every article needs full frontmatter (pillar, cluster, tags, related, pin assets, author). Lint this with Zod in CI.
- Internal linking only works if you actually fill `related` — build a script that warns when an article has fewer than 3 related links
- Author bios must be real — fake credentials get caught and demolish E-E-A-T

**What we'll need to revisit**

- When product catalog exceeds ~50 items → move from MDX frontmatter to Convex tables (real-time price updates make sense at scale)
- When you onboard a second author → consider Sanity/Payload only if they refuse to write MDX
- When you launch i18n → URL structure becomes `/[locale]/poses/...`; design the routing now to flex later

---

## Action Items — Week 1 to Launch

### Day 1 — Foundation

- [ ] `npx @tanstack/cli@latest create` scaffold (not the deprecated `create-start-app` or the gone `pnpm create @tanstack/start`)
- [ ] **Configure SSG mode** — central `tanstackStart({ prerender: { enabled: true, crawlLinks: true, failOnError: true } })` in `vite.config.ts`; document the `prerender.filter` escape hatch
- [ ] TanStack Query setup with hydration from SSG payload
- [ ] Tailwind + Shadcn/UI
- [ ] TypeScript strict, ESLint, Prettier
- [ ] GitHub repo + Vercel project + DNS for theyogasensei.com
- [ ] Vercel Cron set for nightly rebuild (03:00 UTC)

### Day 2 — Convex + Lead capture

- [ ] `npx convex dev` init
- [ ] `subscribers` + `emailEvents` schema
- [ ] `insertSubscriber`, `confirmSubscriber` mutations
- [ ] Resend account, domain verification, API key
- [ ] React Email templates: double-opt-in, welcome + lead magnet
- [ ] Resend webhook → Convex HTTP action for engagement events

### Day 3 — MDX content pipeline

- [ ] MDX route handler for `/guides/[slug]`, `/poses/[slug]`, `/gear/[category]/[slug]`, `/styles/[slug]`
- [ ] Tailwind typography for prose
- [ ] Frontmatter Zod schema (title, slug, pillar, clusters, tags, related, author, pin, schema_type, publishedAt, lastReviewedAt)
- [ ] CI lint that fails build on missing required frontmatter

### Day 4 — Author + E-E-A-T

- [ ] `/authors/[slug]` route + author MDX schema
- [ ] `ArticleHeader`, `AuthorBylineCompact`, `AuthorCard`, `AffiliateDisclosure`, `CitationList` components
- [ ] About page draft (you, photo, story, contact, mission)
- [ ] Privacy policy + terms + affiliate disclosure pages

### Day 5 — Image pipeline

- [ ] Cloudflare Images account + API token
- [ ] Variants: `pin` (1000×1500), `og` (1200×630), `card` (800×1067), `thumb` (400×533)
- [ ] `<Image variant="pin|og|card|thumb">` helper
- [ ] Bulk-upload script with frontmatter image-id linking

### Day 6 — SEO infrastructure

- [ ] `<Head>` builder + per-route JSON-LD via `lib/seo/schema.ts`
- [ ] Dynamic `/sitemap.xml`
- [ ] `/robots.txt`, `/rss.xml`
- [ ] OG + Twitter card meta defaults + per-page overrides
- [ ] Canonical URL handling
- [ ] Google Search Console + Bing Webmaster verification
- [ ] Pinterest domain verification
- [ ] `<Heading level={N}>` enforced component

### Day 7 — Affiliate plumbing

- [ ] `/go/[slug]` redirect handler (noindex)
- [ ] Click logging — Convex `clickEvents` table (added when needed)
- [ ] First affiliate IDs configured (Amazon Associates, 2–3 direct brand partners)
- [ ] Affiliate disclosure component shipped to every monetized page

### Pre-launch QA

- [ ] PageSpeed Insights ≥ 90 mobile on 5 sample routes
- [ ] Rich Results Test passes for `Article`, `Product`, `HowTo`, `Review`
- [ ] Pinterest Rich Pin validator passes for 3 sample pages
- [ ] Sitemap submitted to Google + Bing
- [ ] Indexing API ping integration

### Week 2 — Content launch

- [ ] First **pillar page**: "Yoga for Beginners" (3000+ words)
- [ ] First **5 cluster articles** linking to that pillar
- [ ] First **10 pose pages** in `/poses/`
- [ ] First **5 gear reviews** in `/gear/mats/`
- [ ] Pinterest content calendar set up — 3 pins/day minimum

### Month 1 KPIs

- 30 published articles minimum
- 1 pillar fully built out
- 100+ Pinterest pins live
- Email list at 100+ confirmed subscribers
- 5 ranking keywords in Search Console (page 2 or better)

---

## Companion files (canonical references)

These files live at the repo root and are read by Claude Code / page-generation skills before any work:

- **[`CLAUDE.md`](./CLAUDE.md)** — project-wide instructions. Defines voice rules, content rules, technical SEO baseline, dev rules, tech stack, SSG constraints, and the file-reference index. Read first, always.
- **[`on-page-seo.md`](./on-page-seo.md)** — the 80+ item on-page SEO checklist (15 categories), distilled from a professional SEO expert's spec. Every page-generation task must satisfy applicable items.
- **[`SEO-page-anatomy-guide.md`](./SEO-page-anatomy-guide.md)** — the page-type playbook: full structure, heading tree, MDX frontmatter, and schema.org for pillar / subpillar / cluster articles. Plus technical-SEO and scannability sections.
- **`references/voice.md`, `humour.md`, `stats.md`, `stories.md`, `opinions.md`** — to be authored by Marvin before content production begins. These encode the brand voice, real numbers, recurring stories, and strong opinions that protect content from sounding AI-generated.

## Open questions

- **Author identity** — Will you publish under your own name with stated experience, hire a certified yoga teacher to co-byline, or use a brand persona ("The Yoga Sensei")? Real human + credentials wins for E-E-A-T; pure brand persona caps your ceiling.
- **Affiliate networks beyond Amazon** — Direct partners (Manduka, Lululemon) often pay better but require individual applications. Worth mapping in week 2.
- **Lead magnet production** — Who designs/writes the first PDF? If you, budget a day. If outsourced, allocate ~€100–300 per magnet.
- **Pinterest scheduler** — Tailwind App (~€15/mo) or native Pinterest. Tailwind is the standard for serious creators; native works for the first months.

If any of these need a separate ADR, ping back.
