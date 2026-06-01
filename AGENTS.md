# AGENTS.md — The Yoga Sensei

This file contains project guidance for AI coding agents working on **The Yoga Sensei**. Read this before making changes.

## Companion docs — read alongside this file

- [`CLAUDE.md`](./CLAUDE.md) — implementation rules: tech stack (TanStack Start + SSG, MDX, Convex, Resend, Cloudflare Images), SSG constraints, MDX frontmatter schema, SEO head pattern, content routing table, and development workflow. Source of truth for **how things are built**. AGENTS.md owns brand/voice/UX; CLAUDE.md owns architecture/code. Where they disagree on a technical detail (routes, file paths, schemas), CLAUDE.md wins.
- [`content-quality-checklist.md`](./content-quality-checklist.md) — practical ContentOps guardrails and pre-publish checklist for SEO articles, affiliate content, and YMYL/senior-health pages. Use it before creating briefs, drafts, or publish-ready MDX.
- [`content-strategy-notes.md`](./content-strategy-notes.md) — project-specific ContentOps strategy notes: priority clusters, seed briefs, automation behavior, and 90-day content direction.
- [`content-launch-cluster-strategy.md`](./content-launch-cluster-strategy.md) — launch strategy recommending the yoga mats cluster first, with publication sequence and launch readiness checklist.
- [`content-page-structure-guide.md`](./content-page-structure-guide.md) — search intent and page anatomy guide for informational, commercial, visual/video, and YMYL/senior content.
- [`content-link-and-image-seo-guide.md`](./content-link-and-image-seo-guide.md) — internal/external/affiliate anchor text, alt text, image filenames, lazy loading, and link rel rules.
- **Auto-memory** (Claude Code only) at `C:\Users\M_Smi\.claude\projects\C--Users-M-Smi-claudeProjecten-theyogasensei\memory\` — persistent context across Claude sessions: user role, recurring feedback, project state, references to external systems. `MEMORY.md` is the index; individual `.md` files hold each entry. Other AI agents (Codex, Cursor) don't have access to this memory layer, so when in doubt, check the in-repo `.md` files first; Claude Code sessions can additionally rely on memory for cross-session continuity.
- **Obsidian ContentOps vault** at `C:\Users\M_Smi\OneDrive\ContentOps-Vault\` (moved into OneDrive 2026-06-01 for cross-machine sync; on another PC look under that machine's `OneDrive\ContentOps-Vault`) — cross-project SEO/CRO methodology source-of-truth. Contains the 80+ point on-page checklist, pillar/subpillar/cluster architecture, SERP+PAA 8-step workflow, schema.org patterns per page type, voice "AI tells to delete" list, CRO landing page playbook, and reusable project templates. The repo files `on-page-seo.md` and `SEO-page-anatomy-guide.md` are derived working copies — when they diverge from the vault, the vault wins. Agents without local file access can rely on the in-repo copies; agents that can read the vault should prefer it.

## 1. Project identity

**The Yoga Sensei** is a premium yoga editorial, affiliate, and community platform.

The brand should feel:

- calm
- intelligent
- practical
- editorial
- premium but accessible
- Japanese-inspired, without becoming gimmicky
- anti-fluff, anti-hype, pro-practice

Core positioning:

> Real yoga guidance, honest reviews, and mindful tools for building a consistent practice.

Brand themes:

- practice over perfection
- clarity over noise
- quality over quantity
- progress through consistency
- mindful living without fake guru energy

Avoid building a generic yoga blog. The product should feel like a refined wellness publisher with useful tools and trustworthy recommendations.

---

## 2. Product principles

Every feature, page, and component should support at least one of these goals:

1. Help visitors understand yoga clearly.
2. Help beginners start without feeling overwhelmed.
3. Help readers choose high-quality yoga gear with confidence.
4. Build trust through transparent, useful, non-spammy content.
5. Encourage returning visits through routines, tools, newsletter content, and saved resources.

Do not optimize only for affiliate clicks. Optimize for trust first. Affiliate conversion should feel like a natural result of helpful guidance.

---

## 3. Tone of voice

Use copy that is:

- calm
- direct
- practical
- honest
- warm, but not overly emotional
- confident, but not pushy
- clear enough for beginners

Good examples:

- “Practice over perfection.”
- “Learn yoga properly. Build consistency. Move with intention.”
- “Honest reviews, practical routines, and clear guidance for your practice.”
- “Choose gear that supports your body, your practice, and your values.”

Avoid:

- fake spiritual language
- exaggerated claims
- aggressive sales copy
- generic wellness clichés
- “manifest your inner energy” style language
- unsupported claims like “we tested this” unless actual test data exists

When writing affiliate/review copy, be transparent and grounded. Do not invent real-world testing, ratings, prices, medical claims, or user reviews.

---

## 4. Design direction

The visual identity is inspired by Japanese minimalism, premium wellness, and editorial publishing.

Reference mood:

- shoji screens
- soft morning light
- bonsai / ceramic vessels / stones
- washi paper texture
- warm wood floors
- subtle shadows
- large whitespace
- quiet luxury
- restrained typography
- enso-circle style brand mark

Do not use:

- loud gradients
- neon wellness colors
- chakra rainbow visuals
- generic stock-photo influencer aesthetics
- cluttered SaaS dashboard styling
- cheap banner-like affiliate modules
- overdone animations

### Design must feel like:

> Calm software meets premium wellness magazine.

---

## 5. Color system

Use warm, natural, muted tones.

Recommended tokens:

```css
:root {
  --background: #f6f1ea;
  --surface: #fffdf9;
  --surface-muted: #efe7dc;
  --primary: #3f4a35;
  --primary-soft: #6f7d62;
  --secondary: #b88e72;
  --text-primary: #1f1f1c;
  --text-muted: #6e6a64;
  --border: #e6ded3;
  --dark: #252d22;
}
```

Tailwind/shadcn naming should map to these values where possible:

- `background`: warm cream
- `foreground`: near black
- `primary`: dark olive
- `secondary`: warm stone/clay
- `muted`: soft beige
- `border`: light warm stone
- `card`: warm white

Keep contrast accessible. Buttons and text on olive/dark backgrounds must remain readable.

---

## 6. Typography

Use an editorial serif for headings and a modern sans-serif for body copy.

Preferred combinations:

- Heading: `Cormorant Garamond`, `Lora`, or `Playfair Display`
- Body: `Inter`, `Manrope`, or `Plus Jakarta Sans`

Design intent:

- headings feel elegant and editorial
- body text is highly readable
- labels and metadata are uppercase, spaced, and subtle

Suggested styles:

```tsx
<h1 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight" />
<p className="text-base md:text-lg leading-8 text-muted-foreground" />
<span className="text-xs uppercase tracking-[0.18em]" />
```

Do not overuse decorative fonts. The site should remain calm and legible.

---

## 7. Layout rules

General layout:

```tsx
<section className="py-20 md:py-28">
  <div className="mx-auto max-w-7xl px-6">
    ...
  </div>
</section>
```

Use:

- generous vertical spacing
- large hero sections
- calm grid systems
- rounded cards
- thin borders
- subtle shadows
- soft image overlays
- editorial asymmetry where useful

Avoid cramped sections. This brand needs whitespace.

Recommended card style:

```tsx
className="rounded-3xl border border-border/70 bg-card/80 shadow-sm backdrop-blur-sm"
```

Recommended buttons:

```tsx
className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary/90"
```

---

## 8. Imagery rules

Preferred image direction:

- natural light
- neutral interiors
- Japanese-inspired rooms
- yoga mats, blocks, straps, bolsters
- close-up material textures
- calm body poses
- no exaggerated influencer poses
- warm shadows
- ceramic, wood, linen, stone, plants

Avoid:

- fake-smiling stock photos
- overly sexualized yoga photography
- glossy fitness-ad images
- busy studio backgrounds
- unrealistic AI anatomy
- fake product logos unless intentionally placeholder

Use `next/image` for production images. Always provide useful alt text.

---

## 9. Japanese-inspired details

Use Japanese details sparingly and respectfully — as a **recurring premium branding detail**, never as decoration.

Allowed design motifs:

- enso circle
- shoji-inspired layout lines
- subtle brush dividers
- washi paper grain
- vertical accent text (right edge, semi-transparent, only verified phrases)
- asymmetry
- natural imperfection

### Verified phrase set — the canonical 6

Render via the `<JapaneseAccent>` component (`src/components/ui/japanese-accent.tsx`). Never invent new strings, never use random kanji, never `<span lang="ja">` with raw Japanese inline.

| Phrase | Romaji | Meaning | Intended usage |
|---|---|---|---|
| `継続は力なり` | Keizoku wa chikara nari | "Consistency is strength" | **The recurring brand-mark phrase.** Hero edges, footer, decorative vertical accents site-wide. Default choice when in doubt. |
| `練習・学び・成長する。` | Renshū, manabi, seichō suru | "Practice. Learn. Grow." | Practice / learning / how-to / pose-guide contexts. Hero kicker. |
| `今ここ` | Ima koko | "Be here now" | Meditation / breathwork / mindfulness sections. Short — fits small spaces. |
| `静けさ` | Shizukesa | "Stillness" | Quiet / reflective / long-form reading moments. Featured guide dark bands. |
| `習慣が人生を作る` | Shūkan ga jinsei o tsukuru | "Habits create your life" | Routine / consistency / newsletter / daily-practice content. |
| `先生` | Sensei | "Teacher" | Logo / wordmark contexts only. Not a freestanding accent. |

### Styling rules (enforced by `<JapaneseAccent>`)

- Font: **Noto Serif JP** (loaded via `@fontsource/noto-serif-jp`), falls back to body serif
- `letter-spacing: 0.2em`, opacity ~0.7–0.85
- Vertical orientation: `writing-mode: vertical-rl` + `text-orientation: mixed`
- Tone: warm clay accent on light surfaces, accent-soft on dark surfaces
- Never: brush fonts, bright colours, large/loud sizing, drop shadows, animated entrance

When unsure, do not add Japanese copy. When in doubt which phrase, use `persistence`.

---

## 10. Core page templates

The project currently needs these page types. Keep a consistent design language across all of them.

### 1. Homepage

Purpose:

- brand introduction
- topic discovery
- trust pillars
- featured guides
- product recommendations
- newsletter capture

Route suggestion:

```txt
/
```

### 2. Blog / Journal index

Purpose:

- article discovery
- category filtering
- search
- popular articles
- newsletter capture

Route suggestion:

```txt
/journal
```

### 3. Single blog article

Purpose:

- long-form SEO content
- education
- internal links
- newsletter conversion

Route suggestion:

```txt
/journal/[slug]
```

Must include:

- article hero
- author/date/read time
- featured image
- table of contents
- structured headings
- related articles
- optional affiliate cards only when relevant

### 4. Affiliate review page

Example:

- “7 Best Yoga Mats for Every Practice”

Route suggestion:

```txt
/reviews/best-yoga-mats
```

Must include:

- clear affiliate disclosure
- top picks
- comparison table
- product cards
- review methodology
- buying guide
- FAQ
- final verdict

Do not fake testing claims. Use “researched”, “selected”, or “reviewed” unless actual testing occurred.

### 5. Single product review page

Example:

- “Manduka PRO Yoga Mat Review”

Route suggestion:

```txt
/reviews/manduka-pro-yoga-mat
```

Must include:

- rating breakdown
- pros and cons
- who it is for
- performance sections
- alternatives
- final verdict
- affiliate disclosure

Do not invent user review counts, exact prices, or claims without a source or internal dataset.

### 6. Category page

Examples:

- Yoga Gear
- Meditation
- Beginner Yoga
- Breathwork

Route suggestion:

```txt
/categories/[slug]
```

Purpose:

- SEO hub
- internal linking
- topic exploration

### 7. Beginner roadmap page

Route suggestion:

```txt
/start-here
```

Purpose:

- guide beginners step by step
- reduce overwhelm
- introduce core concepts
- link to gear, routines, and beginner content

### 8. Sensei Picks page

Route suggestion:

```txt
/sensei-picks
```

Purpose:

- curated essentials
- premium affiliate experience
- editorial product recommendations

Must feel curated, not like a store catalog.

### 9. Newsletter / Community page

Route suggestion:

```txt
/mindful-journal
```

Purpose:

- email capture
- community positioning
- explain weekly value

Focus areas:

- weekly insights
- routines
- product recommendations
- philosophy
- calm productivity

### 10. Author / About page

Route suggestion:

```txt
/about
```

Purpose:

- EEAT
- mission
- philosophy
- anti-fluff angle
- credibility

Do not make this a generic “I love yoga” page. Emphasize why the platform exists.

### 11. Search page

Route suggestion:

```txt
/search
```

Purpose:

- topic discovery
- finding content in a large library
- filtering by type, category, difficulty, time, etc.

### 12. Comparison page

Examples:

- Manduka vs Liforme
- Cork vs foam yoga blocks
- Yoga app comparisons

Route suggestion:

```txt
/compare/[slug]
```

Must include:

- balanced verdict
- head-to-head table
- “choose X if...” guidance
- related content

### 13. Pose library

Route suggestion:

```txt
/poses
/poses/[slug]
```

Purpose:

- large SEO library
- beginner education
- routine building

Pose pages should include:

- difficulty
- muscles worked
- benefits
- breathing cues
- common mistakes
- beginner tips
- modifications
- related poses

Do not make medical or injury-treatment claims.

### 14. Routine pages

Examples:

- 10-minute morning yoga
- yoga for stiff hips
- bedtime yoga
- yoga for anxiety
- yoga for office workers

Route suggestion:

```txt
/routines
/routines/[slug]
```

Must include:

- duration
- level
- equipment
- routine steps
- pose breakdown
- breathing cues
- modifications
- FAQs
- related routines

### 15. Tools / Calculator pages

Examples:

- flexibility assessment
- yoga style finder
- meditation timer
- mobility quiz

Route suggestion:

```txt
/tools
/tools/[slug]
```

Purpose:

- engagement
- returning users
- useful personalization

Tools should feel like calm guided assessments, not spammy quizzes.

### 16. Quote / Philosophy pages

Route suggestion:

```txt
/philosophy
/philosophy/[slug]
```

Purpose:

- engagement
- social sharing
- Pinterest
- backlinks

Use sparingly. Do not let this dilute the practical focus of the platform.

### 17. Video / Content hub

Route suggestion:

```txt
/videos
/videos/[slug]
```

Purpose:

- embedded video routines
- playlists
- guided practices
- video series

Must include:

- VideoObject schema when video is real
- duration
- difficulty
- equipment
- transcript/summary when possible

---

## 11. SEO and content rules

Before briefing, drafting, or publishing content, also use [`content-quality-checklist.md`](./content-quality-checklist.md). In short:

- Never invent testing, PAA questions, ratings, prices, review counts, medical claims, credentials, or first-hand experience.
- Keep affiliate disclosures visible before affiliate CTAs.
- Separate verified PAA from related/source-research questions.
- Treat health, pain, senior, kids, and medical-adjacent topics as YMYL-adjacent: use cautious wording, reliable sources, visible disclaimers, and no treatment promises.
- Match the page format to live SERP intent before writing.

Use [`content-page-structure-guide.md`](./content-page-structure-guide.md) to choose the correct page anatomy by intent:

- Informational pages should lead with a direct answer, steps, and FAQ.
- Commercial pages should lead with disclosure, methodology, top picks, and comparison tables.
- Visual/video intent needs image-led or video-supported pages.
- Senior/YMYL pages need safety, sources, disclaimers, references, and no fake reviewer or credential claims.

Use [`content-link-and-image-seo-guide.md`](./content-link-and-image-seo-guide.md) for anchors and media:

- Internal link anchors should be descriptive, natural, and varied.
- Affiliate links should use `rel="sponsored nofollow"` and `noopener` when opened in a new tab.
- Meaningful images need concise descriptive alt text; decorative images use `alt=""`.
- Image filenames should be descriptive kebab-case, and images need stable dimensions to avoid layout shift.

Use semantic HTML and structured data where appropriate.

Recommended schema types:

- `Article`
- `BlogPosting`
- `BreadcrumbList`
- `FAQPage`
- `Product`
- `Review`
- `ItemList`
- `HowTo`
- `VideoObject`

Every content page should have:

- descriptive title
- meta description
- canonical URL
- Open Graph image
- breadcrumb navigation
- internal links
- clean heading hierarchy
- meaningful alt text

Do not keyword-stuff. Write naturally and clearly.

Content should be organized into clusters:

- Yoga Gear
- Beginner Yoga
- Meditation
- Breathwork
- Flexibility
- Yoga Philosophy
- Routines
- Pose Library
- Tools
- Videos

---

## 12. Affiliate and trust rules

Affiliate content must be transparent.

Include disclosures near review sections, comparison tables, and CTA blocks:

> We may earn a commission when you buy through links on our site. This never affects our recommendations.

Do not:

- hide affiliate disclosures
- fake real reviews
- invent star ratings
- claim hands-on testing without proof
- use manipulative urgency
- overdo CTA buttons
- create banner-ad style sections

Preferred CTA copy:

- “View Review”
- “Check Price”
- “Read the Guide”
- “Compare Options”
- “See Our Pick”

Avoid:

- “Buy Now!!!”
- “Limited time only” unless verified
- “Best ever” without evidence

---

## 13. Accessibility rules

Accessibility is mandatory.

Requirements:

- keyboard navigable
- visible focus states
- good color contrast
- proper heading order
- labels for inputs
- alt text for meaningful images
- `aria-label` for icon-only buttons
- no text baked into important images
- do not rely on color alone to communicate state

Interactive tools must be usable on mobile and with keyboard navigation.

---

## 14. Performance rules

The site should feel fast and calm.

Do:

- use Server Components by default
- use Client Components only when needed
- optimize images with `next/image`
- lazy-load heavy media
- avoid unnecessary animation libraries
- keep JS bundles small
- use static generation for content pages when possible

Avoid:

- heavy carousels when a simple grid works
- huge client-side state for static pages
- unoptimized images
- loading too many fonts or weights

---

## 15. Suggested tech stack

Core stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- MDX or typed content collections
- Zod for data validation
- React Email + Resend for newsletter emails

Optional later:

- Convex or Neon for saved tools/community features
- Upstash for queues/rate limiting
- Vercel for hosting
- Plausible / Vercel Analytics for privacy-friendly analytics

Do not introduce backend complexity before the product needs it.

---

## 16. Suggested project structure

```txt
app/
  (site)/
    page.tsx
    about/page.tsx
    journal/page.tsx
    journal/[slug]/page.tsx
    reviews/page.tsx
    reviews/[slug]/page.tsx
    categories/[slug]/page.tsx
    start-here/page.tsx
    sensei-picks/page.tsx
    mindful-journal/page.tsx
    search/page.tsx
    compare/[slug]/page.tsx
    poses/page.tsx
    poses/[slug]/page.tsx
    routines/page.tsx
    routines/[slug]/page.tsx
    tools/page.tsx
    tools/[slug]/page.tsx
    philosophy/page.tsx
    videos/page.tsx

components/
  layout/
    site-header.tsx
    site-footer.tsx
  sections/
    hero-section.tsx
    newsletter-cta.tsx
    trust-pillars.tsx
    topic-grid.tsx
  cards/
    article-card.tsx
    product-card.tsx
    routine-card.tsx
    pose-card.tsx
    tool-card.tsx
  ui/
    ...shadcn components

content/
  articles/
  reviews/
  products/
  poses/
  routines/
  philosophy/
  videos/

data/
  navigation.ts
  categories.ts
  products.ts
  site.ts

lib/
  seo.ts
  schema.ts
  utils.ts
  constants.ts
```

Use kebab-case filenames. Use PascalCase for React components.

---

## 17. Component standards

Components should be:

- typed with TypeScript
- composable
- accessible
- responsive
- visually consistent
- not over-engineered

Prefer reusable primitives:

- `Container`
- `Section`
- `Eyebrow`
- `Prose`
- `ArticleCard`
- `ProductCard`
- `RoutineCard`
- `NewsletterCTA`
- `Breadcrumbs`
- `ComparisonTable`
- `FAQAccordion`

Do not create one-off components when a reusable section works.

---

## 18. Data and content integrity

Use typed data models for products, articles, poses, and routines.

Use Zod or TypeScript types to avoid broken pages.

Example product fields:

```ts
export type Product = {
  slug: string
  name: string
  brand: string
  category: string
  description: string
  image: string
  affiliateUrl?: string
  rating?: number
  priceLabel?: '$' | '$$' | '$$$'
  pros?: string[]
  cons?: string[]
  bestFor?: string[]
}
```

Never hard-code fake user review counts, prices, or ratings as if they are real. Use placeholder labels clearly in mock/demo content.

---

## 19. Mobile design rules

Mobile is critical.

Mobile pages should use:

- stacked layouts
- large tap targets
- sticky or accessible search/filter controls where useful
- short summary cards
- collapsible sidebars/filters
- clean CTAs
- readable line lengths

Avoid dense desktop tables on mobile. Use comparison cards or horizontally scrollable tables with clear affordances.

---

## 20. Animation and interaction

Use subtle motion only.

Good:

- gentle fade-in
- small hover lift
- accordion transitions
- progress indicators
- breathing animation for tools

Bad:

- aggressive parallax
- distracting scroll effects
- bouncing CTA buttons
- over-animated hero sections

Motion should support calm focus.

---

## 21. Forms and newsletter

Newsletter forms should be simple and trustworthy.

Fields:

- email address

Optional later:

- interests
- practice level
- preferred content type

Always include:

- no-spam reassurance
- unsubscribe note
- privacy-friendly copy

Example:

> No spam. Unsubscribe anytime.

---

## 22. Legal and health disclaimers

Yoga and wellness content should not replace professional medical guidance.

Use disclaimers where relevant:

> This content is for educational purposes only and is not medical advice. Listen to your body and consult a qualified professional when needed.

Avoid medical promises such as:

- “cures anxiety”
- “fixes back pain”
- “treats injuries”
- “guaranteed results”

Use safer wording:

- “may help”
- “can support”
- “designed to encourage”
- “often used for”

---

## 23. Development workflow

Before making changes:

1. Inspect existing files and patterns.
2. Reuse existing components where possible.
3. Keep changes focused.
4. Preserve design consistency.
5. Avoid adding unnecessary dependencies.

After making changes, run the available checks:

```bash
npm run lint
npm run typecheck
npm run build
```

When scripts differ, inspect `package.json` and run the closest available equivalents.

---

## 24. Implementation priorities

Current priority order:

1. Design system foundation
2. Shared layout components
3. Homepage
4. Journal index
5. Single article template
6. Affiliate review template
7. Single product review template
8. Category template
9. Start Here / Beginner Roadmap
10. Sensei Picks
11. Newsletter page
12. About page
13. Search
14. Comparison pages
15. Pose library
16. Routine pages
17. Tools
18. Philosophy / quotes
19. Video hub

Build templates before filling the site with large volumes of content.

---

## 25. Non-negotiables

- Do not make the site feel like a spammy affiliate blog.
- Do not invent factual claims, prices, test results, or reviews.
- Do not use loud wellness clichés.
- Do not misuse Japanese text.
- Do not add large dependencies without a clear reason.
- Do not sacrifice accessibility for aesthetics.
- Do not clutter pages with too many CTAs.
- Do not hide affiliate disclosures.

The winning direction is:

> Premium editorial design, practical yoga guidance, honest product recommendations, and calm interactive tools.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
