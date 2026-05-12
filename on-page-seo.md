# On-page SEO — do these on every page

**The comprehensive on-page SEO checklist.** 15 categories · 80+ items · the complete on-page SEO spec for blog posts and service pages. Technical SEO (sitemaps, robots.txt, Core Web Vitals) is covered separately.

> **How to use this file:** point Claude Code (or any page-generation skill) at `on-page-seo.md` before generating any page, then say "generate a blog post about X" — it will satisfy every item on this list automatically. That's the whole point.

Source: distilled from a professional SEO expert's checklist. Treat this as the canonical on-page spec for theyogasensei.com. Update when SEO best practices shift, not before.

---

## 1. Head & metadata — what Google indexes first

- [ ] **Title tag** — 50–60 chars, primary keyword near the start.
- [ ] **Meta description** — 150–160 chars, keyword + benefit + soft CTA.
- [ ] **Canonical URL** set to prevent duplicates.
- [ ] **Open Graph** — `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type`.
- [ ] **Twitter Card** — `summary_large_image`, title, description, image.
- [ ] **Language attribute** on `<html>` (e.g. `lang="en"`).
- [ ] **Viewport meta** tag for responsive rendering.
- [ ] **Favicon** + `apple-touch-icon`.
- [ ] **Charset meta** — `<meta charset="utf-8">`.

## 2. URL structure — clean, readable, keyword-forward

- [ ] **Short slug** — under 60 chars.
- [ ] **Primary keyword** in the slug.
- [ ] **Hyphens only** — never underscores.
- [ ] **Lowercase** only.
- [ ] **No stop words** ("the", "a", "of") unless necessary.
- [ ] **Logical hierarchy** — `/services/[slug]`, `/blog/[slug]`.

## 3. Headings — structure for skimmers & bots

- [ ] **Exactly one H1** per page, contains primary keyword.
- [ ] **Logical H2 → H3 hierarchy** — never skip levels.
- [ ] **H2s use supporting keywords + questions** from the cluster.
- [ ] **No keyword stuffing** — write naturally.

## 4. Copy & body — answer the query, fast

- [ ] **Primary keyword** in the first 100 words.
- [ ] **Direct answer** to the query in the first paragraph.
- [ ] **Length** matches SERP average (within 20% of top-3).
- [ ] **Short paragraphs** (1–4 sentences).
- [ ] **Readability** — 8th–10th grade level.
- [ ] **Active voice** preferred.
- [ ] **Bold key phrases** — sparingly.
- [ ] **Bullets & numbered lists** where appropriate.

## 5. FAQ section — every blog post

- [ ] **4–8 questions** from SEMRush Questions tab + "People Also Ask".
- [ ] **Direct answers** — 2–4 sentences each.
- [ ] **FAQ schema** (JSON-LD) applied.

## 6. Images — every image is a ranking signal

- [ ] **Alt text** describes image + keyword where natural.
- [ ] **Filenames** — descriptive, hyphens, e.g. `emergency-plumber-toronto.webp`.
- [ ] **WebP**, compressed under 200 KB.
- [ ] **Width/height attributes** specified — prevents CLS.
- [ ] **Lazy loading** (`loading="lazy"`) for below-fold.
- [ ] **Responsive srcset** where needed.
- [ ] **Featured/hero image** for social sharing.

## 7. Internal links — pass authority across the site

- [ ] **3–5 internal links** per post.
- [ ] Link to **related blog posts & relevant service pages**.
- [ ] **Descriptive anchor text** — never "click here" or "read more".
- [ ] **Contextually placed** in body copy.
- [ ] **Breadcrumbs** on every page.

## 8. External links — cite authority, don't hoard it

- [ ] **2–3 external links** to authoritative sources (`.gov`, `.edu`, major industry).
- [ ] **Relevant** to the topic.
- [ ] Open in **new tab** with `rel="noopener"`.
- [ ] `rel="nofollow"` for sponsored links.

## 9. Schema markup — JSON-LD in `<head>`

- [ ] **Article schema** on blog posts.
- [ ] **LocalBusiness schema** — most specific subtype (Plumber, Dentist…).
- [ ] **Service schema** on service pages.
- [ ] **FAQ schema** wherever FAQ section exists.
- [ ] **BreadcrumbList schema** on every page.
- [ ] **Organization schema** site-wide.
- [ ] **Author/Person schema** for bylines.

## 10. E-E-A-T signals — Experience · Expertise · Authority · Trust

- [ ] **Author byline** with name on every blog post.
- [ ] **Author bio** with credentials (years, qualifications).
- [ ] Link to **author's dedicated page**.
- [ ] **Published date** displayed.
- [ ] **"Last updated" date** when refreshed.
- [ ] **Real stories, numbers, opinions** from the business voice file.
- [ ] **Cite authoritative sources**.
- [ ] **About page** with full company credentials.
- [ ] **Contact page** — real address, phone, hours.

## 11. Accessibility — A11y signals = SEO signals

- [ ] **Semantic HTML5** — `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`.
- [ ] **ARIA labels** on interactive elements where needed.
- [ ] **Color contrast** meets WCAG AA (4.5:1 body text).
- [ ] **Focus indicators** visible on interactive elements.
- [ ] **Alt text on all images** (empty `alt=""` for decorative).
- [ ] **Descriptive link text**.
- [ ] **Skip-to-content link** for keyboard users.

## 12. Mobile & responsive — mobile-first indexing

- [ ] **Responsive layout** (Tailwind handles this).
- [ ] **Touch targets** minimum 48×48 px.
- [ ] **Body font** minimum 16 px.
- [ ] **No horizontal scroll** at any viewport.
- [ ] **No intrusive interstitials**.

## 13. Social preview — shareable card

- [ ] **OG image** optimized — 1200×630, under 1 MB.
- [ ] **Twitter Card image** — 1200×600.
- [ ] **Compelling `og:description`** — different from meta if valuable.

## 14. Conversion elements — capture the lead (SERVICE PAGES ONLY)

- [ ] **Primary CTA** above the fold.
- [ ] **Phone number** with click-to-call (`tel:`).
- [ ] **Multiple CTA placements** throughout the page.
- [ ] **Trust signals** — reviews, ratings, licenses, years.
- [ ] **Testimonials** with names (photos where possible).
- [ ] **Service-area coverage** listed.
- [ ] **Business hours** displayed.
- [ ] **Physical address** with embedded map.

## 15. Long-form content — 1500+ word posts

- [ ] **Table of contents** with anchor links at the top.
- [ ] **Jump links** for each H2.
- [ ] **Back-to-top button**.

---

## How to use this checklist in our build

**Every page-generation skill must read this file first.** Whether a skill is "draft a pose article," "write a gear review," or "scaffold a new pillar," the agent should:

1. Read `on-page-seo.md` before generating.
2. Read the page's MDX frontmatter (target keyword, cluster, author, etc.).
3. Produce content that satisfies every item in the relevant categories.
4. Output a per-page checklist of which items are satisfied and which are pending human input (e.g., "real story from the author" — not something the AI can fabricate).

**Adaptations for theyogasensei.com (yoga affiliate vs. plumber/service)**

- **Category 14 (Conversion elements)** — repurpose for affiliate content. Primary CTA = newsletter signup or top affiliate product. "Phone number" is N/A; substitute Pinterest follow. "Service-area" is N/A; substitute language/region.
- **Category 9 (Schema)** — LocalBusiness becomes `Person`/`Organization` for the brand. Service schema becomes `HowTo` for pose pages and `Review`/`ItemList` for product roundups.
- **Category 10 (E-E-A-T)** — "business voice file" = the author's teaching experience and credentials (RYT-500, years teaching, certifications).

The remaining 13 categories apply 1:1.

## Build a guardrail, not just a doc

Wire this checklist into CI. Every PR that adds or edits an MDX file should run a linter that:

- Parses frontmatter and asserts required fields exist (title, slug, metaDescription, canonical, author, pillar, schemaType, heroImage).
- Validates title tag length (50–60), meta description length (150–160), slug length (<60).
- Confirms presence of FAQ section frontmatter for blog posts.
- Confirms `pin.primaryImage` exists for Pinterest channel pages.
- Confirms `lastReviewedAt` is within the freshness window (90 days for pillars, 45 for subpillars, 365 for clusters).

The point of saving this file is not to read it once and feel good — it's to make it impossible to ship a page that misses any item on the list.
