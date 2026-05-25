---
type: cluster-plan
cluster_id: yoga-mats
cluster_status: planning
pillar_keyword: yoga mat buying guide
created: 2026-05-24
last_updated: 2026-05-24
owner: M_Smi
review_cycle: weekly
target_completion: 2026-07-31
---

# Cluster Plan: Yoga Mats (Launch Cluster)

## Strategic Context

This is **theyogasensei.com's launch cluster** — the first content cluster published on the site. The decision to start with yoga mats is based on three factors:

1. **Funnel completeness** — Yoga mats have searchable intent across the entire customer journey, from informational ("how to clean") to commercial ("best for hot yoga") to transactional ("Manduka vs Liforme").
2. **Revenue alignment** — Mats are the highest-AOV yoga accessory on Amazon, with premium products in the $100-150 range yielding meaningful commission.
3. **Topical authority foundation** — Establishing The Yoga Sensei as a "yoga equipment expert" enables logical cluster extensions into blocks, straps, bolsters, and towels.

## Cluster Architecture

This cluster follows a **hub-and-spoke** model:

- **1 pillar page** acts as the hub, comprehensively covering yoga mat buying decisions
- **8-10 cluster posts** act as spokes, each going deep on a specific subtopic
- All spokes link back to the pillar; the pillar links to all spokes
- Lateral links between spokes where topically relevant (e.g., "How to Clean" → "How Long Does a Yoga Mat Last")

## Anti-Hallucination Compliance

Every post in this cluster MUST comply with the rules defined in `content-quality-checklist.md` and the broader ContentOps guardrails. Specifically:

- **No fabricated testing claims** — Never write "we tested," "sweat-tested," "after 6 months of use," or similar experiential claims unless backed by real data we possess
- **No fabricated prices** — Per Amazon Associates Operating Agreement, do not state specific prices. Use "check current price on Amazon"
- **No fabricated review counts or star ratings** — These change constantly. Use language like "highly rated on Amazon"
- **No fabricated specifications** — Every spec (thickness, weight, dimensions, material) must be verifiable on the official brand product page or Amazon listing
- **No fabricated PAA quotes** — Only use PAA questions captured from live SERPs in research phase
- **No fabricated source citations** — If citing research, use real, verifiable sources

When in doubt, use transparent language: "based on publicly available specifications," "frequently recommended in industry reviews," "according to the manufacturer."

## Content Posts in This Cluster

### Pillar (1)

| ID | Slug | Title (working) | Intent | Status |
|---|---|---|---|---|
| P1 | yoga-mat-buying-guide | How to Choose a Yoga Mat: A Practical Buying Guide | Informational + Commercial | brief-ready |

### Cluster Spokes (10)

| ID | Slug | Title (working) | Intent | Priority | Status |
|---|---|---|---|---|---|
| C1 | how-to-clean-a-yoga-mat | How to Clean a Yoga Mat (Without Damaging It) | Informational | high | draft (awaiting review) |
| C2 | best-yoga-mat-for-hot-yoga | The Best Yoga Mats for Hot Yoga | Commercial | high | brief-ready |
| C3 | best-yoga-mat-for-beginners | The Best Yoga Mats for Beginners | Commercial | high | brief-todo |
| C4 | how-to-store-a-yoga-mat | How to Store a Yoga Mat Properly | Informational | medium | brief-todo |
| C5 | how-long-does-a-yoga-mat-last | How Long Does a Yoga Mat Last? | Informational | medium | brief-todo |
| C6 | best-travel-yoga-mat | The Best Travel Yoga Mats | Commercial | medium | brief-todo |
| C7 | best-eco-friendly-yoga-mat | The Best Eco-Friendly Yoga Mats | Commercial | medium | brief-todo |
| C8 | manduka-pro-vs-liforme | Manduka PRO vs Liforme: Which Premium Mat Wins? | Transactional | low | brief-todo |
| C9 | lululemon-yoga-mat-review | Lululemon The Mat 5mm Review | Transactional | low | brief-todo |
| C10 | yoga-mat-thickness-guide | Yoga Mat Thickness: How Thick Should Yours Be? | Informational | low | brief-todo |

**Total cluster size**: 11 posts (1 pillar + 10 spokes)

## Publication Schedule

The schedule follows a "build inventory, then launch hub" strategy. We pre-publish foundation spokes before the pillar so that on pillar-launch day, the internal link structure is already mature.

### Pre-Launch Phase (Weeks -3 to -1)

| Week | Post ID | Title | Notes |
|---|---|---|---|
| -3 | C1 | How to Clean a Yoga Mat | First production article. Use as pipeline validation test. |
| -3 | C4 | How to Store a Yoga Mat | Short complementary informational. |
| -2 | C5 | How Long Does a Yoga Mat Last | Builds care/maintenance subcluster |
| -2 | C10 | Yoga Mat Thickness Guide | Foundational informational, supports pillar |
| -1 | C2 | Best Yoga Mat for Hot Yoga | First commercial post; tests affiliate flow |
| -1 | C3 | Best Yoga Mat for Beginners | High-volume commercial |

### Launch Phase (Week 1)

| Week | Post ID | Title | Notes |
|---|---|---|---|
| 1 | P1 | Yoga Mat Buying Guide (pillar) | Launches with 6 spokes already linkable |
| 1 | C6 | Best Travel Yoga Mat | Maintains publication momentum |

### Post-Launch Phase (Weeks 2-4)

| Week | Post ID | Title | Notes |
|---|---|---|---|
| 2 | C7 | Best Eco-Friendly Yoga Mat | Commercial expansion |
| 3 | C8 | Manduka PRO vs Liforme | Transactional, high-intent |
| 4 | C9 | Lululemon Yoga Mat Review | Branded transactional, refreshable annually |

### Maintenance Phase (Month 2+)

- Week 5-8: Begin second cluster ("Yoga Equipment Beyond the Mat") while monitoring this cluster's performance
- Month 3+: Update top-performing posts based on Search Console data, refresh underperformers

## Internal Linking Map

Internal links are the structural connective tissue of this cluster. Every post must include the specified links to maintain topical authority signals.

### Outbound from Pillar (P1)

P1 links to ALL 10 cluster spokes, contextually placed:

- C1 (How to Clean) — in "Yoga Mat Care" section
- C2 (Best for Hot Yoga) — in "By Practice Style" section + "Top Picks" section
- C3 (Best for Beginners) — in "By Practice Style" section + "Top Picks" section
- C4 (How to Store) — in "Yoga Mat Care" section
- C5 (How Long Lasts) — in "Cost-Per-Year" section
- C6 (Best Travel) — in "Portability" section + "Top Picks" section
- C7 (Best Eco) — in "Eco-Friendly" section + "Top Picks" section
- C8 (Manduka vs Liforme) — in "Premium Mats" section
- C9 (Lululemon Review) — in "Top Picks" section
- C10 (Thickness Guide) — in "Thickness" section as "deep dive"

### Inbound to Pillar (P1)

EVERY cluster spoke links back to the pillar at least 2x with varied anchors:

- Variation A (exact): "yoga mat buying guide"
- Variation B (partial): "how to choose the right yoga mat"
- Variation C (descriptive): "our complete guide to yoga mats"
- Variation D (natural): "this comprehensive overview of yoga mat options"

Rotate anchors across spokes to avoid over-optimization signals.

### Lateral Links (Spoke-to-Spoke)

Strategic cross-links between related spokes:

- C1 (Clean) ↔ C4 (Store) ↔ C5 (Lasts) — care subcluster
- C2 (Hot Yoga) ↔ C7 (Eco) — overlap on natural rubber recommendations
- C2 (Hot Yoga) ↔ C8 (Manduka vs Liforme) — both feature premium mats
- C3 (Beginners) ↔ C10 (Thickness) — beginners often confused about thickness
- C6 (Travel) ↔ C10 (Thickness) — travel mats are thin
- C8 (Manduka vs Liforme) ↔ C9 (Lululemon Review) — comparison shoppers

**Maximum links rule**: Each post should have 3-7 internal links total. More than 10 dilutes signal; fewer than 3 misses opportunities.

## SEO Targets per Post

Word count targets marked `(provisional)` need validation via live SERP analysis during individual brief creation. Validated targets are based on existing briefs where SERP analysis has already been performed.

| Post ID | Primary Keyword | KD Target | Word Count Target | Search Intent |
|---|---|---|---|---|
| P1 | yoga mat buying guide | TBD (verify in Ahrefs) | 3500-4500 (provisional) | Mixed I+C |
| C1 | how to clean a yoga mat | ≤10 | 1800-2200 | Informational |
| C2 | best yoga mat for hot yoga | ≤15 | 3500-5000 | Commercial |
| C3 | best yoga mat for beginners | ≤20 (provisional) | 2500-3500 (provisional) | Commercial |
| C4 | how to store a yoga mat | ≤5 (provisional) | 1000-1500 (provisional) | Informational |
| C5 | how long does a yoga mat last | ≤10 (provisional) | 1500-2000 (provisional) | Informational |
| C6 | best travel yoga mat | ≤15 (provisional) | 2000-3000 (provisional) | Commercial |
| C7 | best eco friendly yoga mat | ≤15 (provisional) | 2500-3500 (provisional) | Commercial |
| C8 | manduka pro vs liforme | ≤10 (provisional) | 2000-2500 (provisional) | Transactional |
| C9 | lululemon yoga mat review | ≤15 (provisional) | 1500-2000 (provisional) | Transactional |
| C10 | yoga mat thickness | ≤10 (provisional) | 1500-2000 (provisional) | Informational |

**All KD targets MUST be verified in Ahrefs Lite before brief approval.** Provisional targets are derived from niche analysis and must be replaced with live SERP-validated numbers during individual brief creation.

## Schema Markup Requirements

Each post type uses a specific schema combination:

### All posts
- Article (or one of its subtypes)
- BreadcrumbList
- Organization (sitewide)

### Informational posts (C1, C4, C5, C10)
- Add: HowTo schema where step-based content exists
- Add: FAQPage schema for FAQ sections

### Commercial posts (C2, C3, C6, C7)
- Add: ItemList schema for product round-ups
- Add: Review schema for each product reviewed (without fake ratings — use schema only with verifiable data)
- Add: FAQPage schema for FAQ sections

### Transactional posts (C8, C9)
- Add: Review schema
- Add: Product schema where appropriate
- Note: do NOT use AggregateRating unless we genuinely aggregate ratings from a stated methodology

### Pillar (P1)
- All of the above as appropriate
- Add: FAQPage schema (extensive FAQ section)

## E-E-A-T Signals per Post

Each post must include:

- **Author byline** with link to author page
- **Published date** and **modified date**
- **Reading time estimate**
- **Disclaimer block** appropriate to content type:
  - Affiliate posts: "As an Amazon Associate, The Yoga Sensei earns from qualifying purchases. Product picks are based on publicly available specifications and aggregated user reviews, not direct testing."
  - All posts: Link to About page and editorial policy

## Lead Capture Strategy

This cluster supports newsletter list growth via one shared lead magnet:

**Lead Magnet**: "The Yoga Mat Care Checklist — A Printable Guide to Make Your Mat Last 5+ Years"

- Format: PDF, 1-2 pages, printable
- Delivery: Convex stores subscriber → Resend triggers email with download link
- Placement: Sticky pop-up on all cluster posts, triggers at 60% scroll depth
- Tags applied: `cluster:yoga-mats`, `interest:mat-care`

## Technical Implementation Notes

- All posts stored as MDX strings in Convex `posts` table
- Rendered server-side via TanStack Start route loaders
- Affiliate links use shared `<AffiliateLink>` component with `rel="sponsored nofollow noopener"` `target="_blank"`
- Images stored in Convex file storage, served via CDN with WebP/AVIF support
- Each post must pass Lighthouse audit (LCP < 2.5s, CLS < 0.1, INP < 200ms) before publication
- Schema validated via Google Rich Results Test before publication
- Mobile responsive verified on real device (not just DevTools)

## KPIs and Success Metrics

### Per-Post KPIs (track in Search Console + GA4)

- **Indexation**: Indexed in Google within 7 days of publication
- **First impression**: 100+ impressions per month within 30 days
- **Click-through rate**: ≥3% within 60 days
- **Average position**: Top 30 within 90 days, top 10 within 180 days for primary keyword

### Cluster-Level KPIs (track monthly)

- **Total cluster impressions**: target curves
  - Month 1: 1,000-5,000
  - Month 3: 10,000-25,000
  - Month 6: 50,000-100,000
- **Total cluster clicks**:
  - Month 3: 500-1,000
  - Month 6: 2,500-5,000
- **Affiliate clicks**: tracked in Convex `clicks` table
- **Newsletter signups from cluster**: tagged with `cluster:yoga-mats`
- **Affiliate revenue**: tracked in Amazon Associates dashboard

### Refresh Triggers

A post enters "refresh queue" when:

- Average position drops 5+ positions over 30 days
- CTR drops below 2% despite top-20 positions
- Top competitor publishes significantly updated content
- Product recommendations become outdated (discontinued, replaced)

## Risk Registry

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Amazon Associates account suspended | Medium | High | Strict TOS compliance, no price mentions, prominent disclosure |
| Google penalty for thin/duplicate content | Low | High | Each post must be unique, 1500+ words, original analysis |
| YMYL classification (medical claims) | Low (this cluster) | Medium | Avoid health claims; redirect health-adjacent topics to future cluster |
| Topical authority signal dilution | Medium | Medium | Strict internal linking discipline; no off-topic posts in this cluster |
| Slow indexation | Medium | Medium | GSC URL inspection + manual submit for each post on day of publication |
| Image performance issues | Medium | Low | WebP/AVIF, lazy loading except hero, width/height attributes always |

## Author Workflow Checklist (per post)

Hermes uses this for every post in the cluster:

### Pre-writing

- [ ] Brief file exists and is approved
- [ ] Live SERP analysis captured (top 5 ranking pages noted)
- [ ] Live PAA questions captured
- [ ] Live Related Searches captured
- [ ] Ahrefs KD verified for primary keyword
- [ ] Search intent confirmed
- [ ] Target word count set
- [ ] Internal link plan documented (outbound + inbound)

### Writing

- [ ] H1 contains primary keyword
- [ ] Primary keyword appears in first 100 words
- [ ] Meta title ≤60 chars with primary keyword
- [ ] Meta description 140-155 chars
- [ ] URL slug short, kebab-case
- [ ] Headers (H2/H3) include secondary keywords naturally
- [ ] TL;DR or key takeaway near top
- [ ] FAQ section with real PAA questions
- [ ] Author byline included
- [ ] Appropriate disclaimer included
- [ ] All claims verifiable (no fabricated data)

### Visual

- [ ] Hero image: WebP, ≤150KB, eager load, width/height set
- [ ] Body images: WebP, lazy load, descriptive alt text ≤125 chars
- [ ] Image filenames kebab-case and descriptive
- [ ] Optional: comparison tables, diagrams, infographics

### Technical

- [ ] Internal links inserted per linking map
- [ ] External authority links use `rel="noopener"`
- [ ] Affiliate links use `<AffiliateLink>` component
- [ ] Schema markup added (Article + BreadcrumbList minimum)
- [ ] Open Graph + Twitter Card meta tags set
- [ ] Canonical URL set

### Pre-publication

- [ ] View-source check: full content visible in SSR output
- [ ] Mobile preview on real device
- [ ] PageSpeed Insights: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Rich Results Test passes for schema
- [ ] Spelling/grammar check
- [ ] All affiliate links resolve correctly
- [ ] No broken internal links

### Post-publication

- [ ] URL submitted in Search Console
- [ ] Newsletter signup events tested
- [ ] Affiliate click tracking verified in Convex
- [ ] Post added to sitemap.xml
- [ ] Featured on homepage / category page if applicable

## File Conventions

This cluster follows the project's standard conventions:

- **Briefs**: `content-briefs/seed-{slug}.md` for each post
- **Content**: stored in Convex `posts` table (not as files)
- **Images**: `public/images/yoga-mats/{post-slug}/{filename}.webp`
- **Schema overrides**: defined in route loader head config

## Cluster Completion Definition

This cluster is considered "complete" when ALL of the following are true:

- All 11 posts published
- All internal links operational
- All schema markup validated
- All posts indexed in Google
- At least 50% of posts achieving top-20 ranking for primary keyword
- Newsletter list has captured 100+ subscribers tagged `cluster:yoga-mats`
- At least one post has generated a verified affiliate sale

Estimated time to "complete" status: 6-9 months from launch.

## Next Cluster

Upon completion of this cluster, the next planned cluster is:

**Cluster: Yoga Equipment Beyond the Mat**

- Pillar: "Yoga Accessories Guide: Blocks, Straps, Bolsters & More"
- Spokes: 8-10 posts covering individual accessory categories
- Rationale: Logical topical extension; reuses authority built by mat cluster

(Separate cluster plan file to be created upon mat cluster reaching 80% completion.)

---

**Document owner**: M_Smi
**Review frequency**: Weekly during active publication phase, monthly thereafter
**Last reviewed**: 2026-05-24
