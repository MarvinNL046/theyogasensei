# The Yoga Sensei Content Page Structure Guide

Last updated: 2026-05-24

Use this guide when choosing the right page format for a keyword. Page structure is where SEO, UX, trust, and conversion meet. Before drafting, match the live SERP intent first; then choose the structure below.

## Search Intent Types

### Informational Intent

The reader wants to learn or solve a problem.

Examples:

- `how to clean a yoga mat`
- `what is chair yoga`
- `yoga benefits`

Best formats:

- how-to guides
- beginner guides
- FAQ-led articles
- step-by-step tutorials
- educational listicles

Primary conversion:

- internal links
- email signup
- light affiliate only when useful

### Navigational Intent

The reader already knows a brand, person, site, or product.

Examples:

- `manduka yoga mat`
- `lululemon yoga mat`
- `yoga with adriene`

Best formats:

- brand review
- brand landing page
- product explainer
- comparison with alternatives

### Commercial Investigation Intent

The reader is comparing before buying.

Examples:

- `best yoga mat for hot yoga`
- `manduka vs lululemon`
- `best yoga blocks`

Best formats:

- product roundup
- comparison table
- head-to-head review
- "best for X" guide

Primary conversion:

- affiliate clicks
- product comparison
- buyer confidence

### Transactional Intent

The reader wants to buy now.

Examples:

- `buy manduka pro mat`
- `manduka mat discount code`
- `yoga mat amazon`

Best formats:

- product page
- deal/coupon page
- focused landing page

### Visual Intent

The reader wants images or visual examples.

Examples:

- `yoga poses for 2`
- `yoga poses for 3`
- `chair yoga poses chart`

Best formats:

- visual pose library
- image-led guide
- printable chart
- Pinterest-friendly infographic

### Video Intent

The reader wants to watch the instruction.

Examples:

- `chair yoga for seniors`
- `10 minute morning yoga`
- `yoga nidra`

Best formats:

- article with embedded video
- routine page with video
- transcript or summary
- step-by-step visual support

If the live SERP is dominated by video, text-only content is usually not enough.

### Question Intent

The reader asks a direct question.

Best formats:

- short direct answer near the top
- FAQ section
- featured-snippet style answer in 40-60 words

## Page Structure By Content Type

### Informational How-To: How To Clean A Yoga Mat

Goal:

Help the reader solve a practical problem and remember The Yoga Sensei as useful and trustworthy.

Above the fold:

- H1 with the primary keyword.
- Reading time.
- Last updated date.
- Author byline.
- Hero image when useful.
- Short direct answer in 40-60 words.
- Table of contents for longer guides.

Body structure:

1. Quick answer box.
2. Why cleaning matters.
3. Supplies needed.
4. Step-by-step daily cleaning method.
5. Deep cleaning method.
6. Methods by mat type: rubber, PVC, cork, TPE, microfiber.
7. Natural cleaner cautions.
8. Brand-specific care guidance, using official sources.
9. Common mistakes.
10. FAQ.
11. Related guides and next step.

Schema:

- `Article` or `BlogPosting`.
- `HowTo` only if the page has explicit steps and all required fields can be accurately provided.
- `FAQPage` only if the FAQ is visible on the page.
- `BreadcrumbList`.

Monetization:

- light affiliate placements for cleaners, microfiber cloths, spray bottles, and cleaning supplies.
- avoid turning the article into a product roundup unless the SERP supports it.

### Commercial Investigation: Best Yoga Mat For Hot Yoga

Goal:

Help the reader compare options and choose confidently.

Above the fold:

- H1 with keyword and freshness signal when appropriate.
- Last updated date.
- Transparent methodology note.
- Affiliate disclosure.
- Comparison table visible early.
- Product image, best-for label, key specs, and CTA per row.
- Jump links to individual reviews.

Body structure:

1. Top picks at a glance.
2. Methodology: how products were researched or tested.
3. Buying guide: what matters for hot yoga.
4. Individual product sections.
5. Mats considered but not recommended.
6. Best by brand or use case.
7. Accessories section.
8. FAQ.
9. Final verdict.
10. Related reviews and guides.

Each product section should include:

- product name
- best-for label
- image
- quick specs
- pros
- cons
- who it is for
- who should skip it
- source-backed care or material notes
- affiliate CTA

Integrity rules:

- Do not say "tested" unless The Yoga Sensei actually tested it.
- Do not invent ratings, prices, review counts, or ownership claims.
- Do not use `AggregateRating` unless legitimate rating data exists.
- Use `researched`, `selected`, or `compared from public product data` when that is the truth.

Schema:

- `Article` or `BlogPosting`.
- `ItemList` for ranked product lists.
- `Product` only when product data is accurate and source-backed.
- `FAQPage` only for visible FAQ.
- No fake `Review` or `AggregateRating`.

### YMYL / Senior Audience: Chair Yoga For Seniors

Goal:

Build trust, provide safe beginner-friendly guidance, and convert to email through a useful printable or plan.

Above the fold:

- H1 with the primary keyword.
- Clear educational/medical disclaimer.
- Author byline.
- Reviewer only if a real qualified reviewer exists.
- Lead magnet callout if the PDF or plan exists.
- Intro video if available and appropriate.
- Short benefits overview with careful language.
- Table of contents.

Body structure:

1. What chair yoga is.
2. Safety first: who should consult a professional.
3. Source-backed benefits with cautious wording.
4. What readers need.
5. Easy chair yoga poses with photos or clear illustrations.
6. Beginner routine.
7. Printable plan or lead magnet section.
8. Specific-needs sections, kept cautious.
9. Resources, books, programs, or DVDs.
10. FAQ.
11. Safety recap.
12. References.
13. Author bio and reviewer note if real.

Each pose should include:

- pose name
- short benefit phrasing
- large clear image
- short numbered steps
- hold time
- modification
- safety tip

YMYL rules:

- Do not claim cure, prevention, treatment, weight loss, fall prevention, blood pressure changes, or Medicare coverage without reliable verification.
- Add disclaimers.
- Use reliable sources.
- Do not invent credentials or medical reviewers.
- Treat PDF, video, and program claims as TODO until the asset exists.

Schema:

- `Article` or `BlogPosting`.
- `FAQPage` if visible FAQ exists.
- `HowTo` only if steps are safe, specific, and schema-complete.
- `VideoObject` only when real video metadata is available.
- Avoid `MedicalWebPage` unless the page truly qualifies and does not imply professional medical advice.

## Content Format Variation (anti-scaled-content footprint)

**The risk (verified by audit 2026-05-29):** all 7 current mat guides share one skeleton — a comparison table + an FAQ section + 8–12 H2s. Even the how-tos and the pillar carry that table-plus-FAQ stamp. That repeated structure is exactly the "template footprint" that scaled-content detection flags. Page format must be varied **deliberately**, not defaulted.

Tracked per page via the `content_format` column in `keywords.csv` (vocabulary: **roundup · how-to · versus · deep-dive · concept**). This is SEPARATE from `page_type` (pillar/subpillar/cluster/review/comparison = cluster role) — do not conflate the two columns.

### The five content formats (structure signatures)

- **roundup** ("best X for Y") — multiple picks; comparison table allowed; FAQ allowed. Use sparingly — not every new page. _(Live: best-yoga-mats hub, bad-knees, eco, hot-yoga.)_
- **how-to** ("how to clean / store / roll a mat") — step-by-step; NO comparison table; at most a short checklist; FAQ optional. _(Live: how-to-clean.)_
- **versus** ("cork vs rubber", "Manduka vs Liforme") — head-to-head prose; max ONE comparison table; a conclusion paragraph; NO picks grid.
- **deep-dive** ("is the Manduka PRO worth it", "what is a TPE mat") — deep prose; no picks grid; no mandatory table; optionally one spec strip.
- **concept** ("what thickness", "open vs closed cell") — explanatory; no picks; table only when it genuinely clarifies. _(Live: how-thick, how-to-choose pillar.)_

### Hard variation rules

- **FAQ is OPTIONAL, not default** — at most ~half the pages, and only where there are genuinely repeated reader questions. Stop stamping an FAQ on everything.
- **Comparison table only on roundup and versus.** Not on how-to / deep-dive / concept.
- **Vary the shape deliberately:** intro form, number of H2s, and heading phrasing should differ between articles. Avoid identical section order in consecutive pieces.
- One format does not own a cluster — mix formats across the cluster.

### Publication tempo

Fresh domain → **2–4 thorough articles per week**, paced on **GSC indexing signals**: if new pages sit in "Crawled / Discovered – currently not indexed", slow down and let existing pages earn trust before adding more. **Finish one cluster before opening a second** (see the cluster-discipline rule in `pnpm content:status`).

## Semantic HTML Rules

Use semantic HTML:

- `main` for primary page content.
- `article` for the post body.
- `header` for the page/article header.
- `nav` for breadcrumbs, table of contents, and navigation.
- `section` for major content blocks.
- `aside` for related guides, disclosures, callouts, or secondary content.
- `footer` for author bio, updated date, and page footer content.

Every long-form article should include:

- breadcrumb navigation
- one H1
- clear H2/H3 hierarchy
- author/date/updated metadata
- meaningful alt text
- related content block
- visible disclosure where needed
- schema that matches visible content

## Affiliate Link Rules

Affiliate links should use:

```html
rel="sponsored nofollow"
```

Use affiliate CTAs calmly:

- Check Price
- See Current Price
- View on Amazon
- Compare Options

Avoid:

- fake urgency
- hidden affiliate links
- excessive CTAs

## Structured Data By Page Type

Use:

- `Article` or `BlogPosting` for most posts.
- `BreadcrumbList` for breadcrumbs.
- `FAQPage` when FAQ is visible.
- `HowTo` for true step-by-step guides.
- `ItemList` for ranked roundups.
- `Product` only with accurate source-backed product data.
- `VideoObject` only when actual video metadata is available.

Be careful with:

- `Review`
- `AggregateRating`
- medical schema

Never add schema for data that is not visible and true on the page.

## Core Web Vitals And Mobile Rules

For performance:

- Use optimized images.
- Give images and embeds stable dimensions to avoid layout shift.
- Prioritize the hero image only when it is the LCP image.
- Keep JavaScript minimal.
- Avoid heavy carousels when a static table or grid works.

Mobile:

- Design mobile-first.
- Use readable font sizes.
- Keep tap targets at least 44px where possible.
- Make comparison tables usable on mobile.
- Avoid tiny text in images.
- For senior content, use larger text, high contrast, and simple layouts.

## Internal Linking Structure

Use three kinds of internal links:

### Hub Links

Pillars link to their cluster pages.

### Spoke Links

Cluster pages link back to their pillar.

### Lateral Links

Related cluster pages link to each other.

Use descriptive anchor text:

- good: "see our guide to cleaning yoga mats"
- weak: "click here"

## Above-The-Fold Rules

Readers decide quickly whether a page is worth their time.

Above the fold should make the page promise obvious:

### Informational

- H1
- direct answer or TL;DR
- hero image if useful
- table of contents for long content

### Commercial

- H1
- affiliate disclosure
- methodology note
- comparison table or top picks
- clear CTA labels

### YMYL / Senior

- H1
- disclaimer
- trust signal
- lead magnet or safe next step
- video or visual cue when intent is video-heavy

## Engagement And UX Signals

Do not overstate what Google directly measures. Instead, optimize for reader behavior that usually correlates with better performance:

- fast load
- clear answer
- easy scanning
- useful internal links
- strong next step
- no intrusive ads or popups
- mobile readability

## Intent Matching Rule

Before writing, inspect the live SERP:

- If top results are product roundups, write a product roundup.
- If top results are videos, include or create video support.
- If top results are forums, identify what real people are asking and answer it better.
- If top results are authority medical sites, raise E-E-A-T and safety standards.
- If top results are how-to pages, lead with steps and clarity.

The right structure is not chosen from preference. It is chosen from search intent.
