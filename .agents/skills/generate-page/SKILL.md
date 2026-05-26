---
name: generate-page
description: Generate a complete, SEO-optimised MDX page for theyogasensei.com — pillar, subpillar (gear roundup / topic guide), or cluster article (pose, technique, single product review, how-to). Use this skill whenever the user asks to "write a blog post", "draft a pillar", "create a pose page", "do a gear roundup", "write an article about X", "generate content for [keyword]", "make a page about [yoga topic]", or anything that implies producing a publishable MDX file with frontmatter, schema.org, internal linking, and Pinterest-ready metadata. Also trigger when the user pastes a target keyword and asks for content, when they ask Codex to "follow our content rules" or "use our voice", or when they want a draft they can ship after light editing. This skill guarantees the output satisfies on-page-seo.md, follows SEO-page-anatomy-guide.md page-type rules, and matches the project's voice spec — so use it instead of writing content freehand.
---

# generate-page

Generates a complete MDX page for theyogasensei.com that ships ready for review: valid frontmatter, correct heading tree, schema.org JSON-LD wired up, internal links to the right pillar/cluster, Pinterest pin metadata, and voice that doesn't read as AI.

## When to use

The user wants a publishable draft of a page on theyogasensei.com — pillar, subpillar, or cluster article. They've usually given a target keyword and possibly the cluster it belongs to.

If the user is just brainstorming topics or planning content strategy, this skill is wrong — they want a discussion, not a 1,500-word draft. Push back and clarify.

## Inputs to collect (only if not already provided)

Ask these in one batch, not in sequence:

1. **Page type** — pillar | subpillar | cluster
2. **Primary keyword** — the exact phrase the page targets (e.g. "sun salutation for beginners")
3. **Cluster** — which content cluster this belongs to (e.g. `yoga-for-beginners`, `gear`, `styles`). For a pillar this is self-referential.
4. **Pillar slug** — for subpillars and clusters, which pillar do they link UP to. For pillars themselves, skip.
5. **Optional context** — competitor URLs in the SERP top-3, a stat the user wants featured, a specific story angle, the affiliate products to mention.

If the user already gave a clear request like "write the Sun Salutation cluster article under the yoga-for-beginners pillar", don't re-ask — extract from what they said and proceed.

## Workflow

### 1. Read the canonical project files

Always read these in order — they contain the rules this skill enforces:

1. `AGENTS.md` at the repo root — project rules, tech stack, dev rules, the voice index
2. `on-page-seo.md` — the 80+ item on-page SEO checklist
3. `SEO-page-anatomy-guide.md` — page-type playbook for pillar/subpillar/cluster
4. `references/voice.md` — voice rules, AI-tell phrases to delete
5. `references/stats.md` — canonical numbers; never invent any
6. `references/stories.md` — anecdotes you may reference (one per post max)
7. `references/opinions.md` — strong opinions backed by numbers (one per post max)

If any of `references/*.md` are missing, surface that to the user. Don't fabricate voice — ask whether to proceed with a generic draft and let them fill voice in later, or pause until they've authored the references.

### 2. Scan existing cluster siblings

List MDX files under the same cluster (`/content/poses/*.mdx`, `/content/gear/<category>/*.mdx`, etc.) and read their frontmatter. Use this to:

- Pick 2–4 sibling slugs for the `related` frontmatter field
- Find the pillar slug if the user hasn't given one
- Avoid topical duplicates ("we already have a Mountain Pose article, don't write a second")

### 3. SERP and PAA research — MANDATORY before writing

Do NOT skip this. Skipping it is the difference between a post that ranks and a post that doesn't. The expert pattern is an 8-step pre-writing checklist — execute every step in order:

1. **Search Google** for the primary keyword.
2. **Analyze the top 3 ranking pages** by reading their full content.
3. **Match their format** — listicle, tutorial, guide, comparison, or roundup. Whatever they're doing, do the same. Don't write a guide if the SERP wants a listicle.
4. **Match their length** within ±20% of the average word count of the top 3. Note this target before writing.
5. **Cover every topic the top 3 all talk about** — if all three mention "common mistakes", you must too. These shared topics are the implicit search intent.
6. **Add 1–2 extra topics they missed** — this is what makes your page rankable above theirs. Pull from Reddit threads (`site:reddit.com [keyword]`), niche forums, or your own teaching experience.
7. **Answer the main question directly at the top** in 2–4 sentences (the TLDR / featured snippet target). The first paragraph must satisfy the searcher in 5 seconds, before they scroll.
8. **Include an FAQ section with 4–8 questions verbatim from "People Also Ask"** — these have known volume and earn PAA carousel placement.

Also check `/used-keywords.md` at the repo root. If the primary keyword is already logged there, stop and ask the user — either pick a different keyword or refresh the existing page instead of opening a duplicate.

If the environment has no web search, ask the user to paste the SERP top-3 URLs and PAA questions. Do not proceed without this data — flag it as a blocker.

After publishing, append the primary keyword and slug to `/used-keywords.md`.

### 4. Resolve the page type → structure mapping

Pick the right template from SEO-page-anatomy-guide.md:

| Page type | Template section | Word count | Schema |
|-----------|------------------|------------|--------|
| pillar | "PILLAR PAGE — anatomy" | 3,500–5,000 | Article + BreadcrumbList + FAQPage |
| subpillar (gear roundup) | "SUBPILLAR PAGE — anatomy" | 2,000–3,000 | Article + ItemList + nested Review |
| subpillar (topic guide, no products) | "SUBPILLAR PAGE — anatomy" minus ItemList | 2,000–3,000 | Article + BreadcrumbList |
| cluster (pose / how-to) | "CLUSTER (BLOG) ARTICLE — anatomy" | 1,200–2,000 | HowTo + BreadcrumbList |
| cluster (article, no steps) | "CLUSTER (BLOG) ARTICLE — anatomy" | 1,200–2,000 | Article + BreadcrumbList |
| cluster (single product review) | "CLUSTER (BLOG) ARTICLE — anatomy" + Review | 1,500–2,500 | Review + Product + BreadcrumbList |

### 5. Generate the MDX file

Output a single MDX file with this structure (adapt to page type):

```mdx
---
type: pillar | subpillar | cluster
title: "[Title — 50–60 chars including keyword near the start, year for subpillars]"
slug: [lowercase-hyphenated-primary-keyword]
metaDescription: "[150–160 chars, keyword + benefit + soft CTA]"
schemaType: [Article | HowTo | ItemList | Review]
pillar: [pillar-slug]
clusters: [cluster, sub-cluster]
tags: [primary, secondary, tertiary, ...]
related: [sibling-slug-1, sibling-slug-2, sibling-slug-3, sibling-slug-4]
author: [author-slug]
reviewedBy: [author-slug]
publishedAt: [today]
lastReviewedAt: [today]
estimatedReadingTime: [calculated from word count, ~225 wpm]
heroImage: [cloudflare-image-id]
pin:
  primaryImage: [pin-image-id]
  description: "[Pinterest description with hashtags, 200–500 chars]"
faq:
  - q: "[Question from PAA]"
    a: "[2–4 sentence direct answer]"
citations:                # required if health/wellness claims
  - title: "[Study title]"
    authors: "[Authors]"
    year: [year]
    url: "[pubmed or peer-reviewed URL]"
howTo:                    # only for HowTo schema pages
  totalTime: "PT5M"
  step:
    - name: "[Step name]"
      text: "[Step description]"
      image: "[image-id]"
---

<PillarBackLink to="[pillar-slug]">
  Part of our complete guide to [Pillar Title]
</PillarBackLink>

<TLDR>
[2–4 sentence summary that answers the search query directly.
Primary keyword in the first 100 words. First-person where it fits.]
</TLDR>

<TableOfContents />   {/* only for posts ≥ 1,500 words */}

## [First H2 — answers the implicit "what is this" question]

[Body — short paragraphs (≤ 60 words), one H2 per ~250 words.
First-person experience, real numbers from stats.md if relevant,
bold the load-bearing phrase once per paragraph at most.]

[... continue body following the page-type's heading tree from
SEO-page-anatomy-guide.md ...]

## Frequently Asked Questions

[4–8 questions from PAA / SEMRush Questions tab, 2–4 sentence answers each]

## Related Reading

- [Sibling article 1](/path/to/sibling-1) — short context line
- [Sibling article 2](/path/to/sibling-2) — short context line
- [Sibling article 3](/path/to/sibling-3) — short context line

<PillarBackLink to="[pillar-slug]" position="footer" />

<AuthorCard author="[author-slug]" />
<NewsletterCapture leadMagnet="[cluster-appropriate-magnet]" />
```

**Rules the skill enforces while writing:**

- One H1 — and the H1 only lives in the route file's `<title>` (page header), not inside the MDX body. The first heading in MDX is `## (H2)`.
- Primary keyword in the first 100 words.
- Subheading at least every 300 words.
- No paragraph longer than 60 words.
- First-person voice anchored in the opening (cite a real moment from `stories.md` if relevant, otherwise generic first-person teaching voice).
- Bold one load-bearing phrase per paragraph max — never every other word.
- Use real numbers from `stats.md` only. Never round, never invent.
- 3–5 internal links minimum, 2–3 external citations minimum, every link uses descriptive anchor text.
- All affiliate links go through `/go/[slug]` with `rel="sponsored nofollow"`.
- All external links open in new tab with `rel="noopener"`.
- Sanskrit names italicised; English in regular type.
- One story per post max (from `stories.md`), one opinion per post max (from `opinions.md`).
- Tell readers when *not* to do the pose / *not* to buy the product — biggest anti-AI tell.
- No: "unlock", "leverage", "seamless", "world-class", "in today's fast-paced world", "navigate the journey", "embark on", "delve into", "elevate", "supercharge". No exclamation marks. No emojis.

### 6. Self-check against on-page-seo.md

After drafting the MDX, walk through every applicable item in `on-page-seo.md` and produce a report:

```
on-page SEO compliance report — [slug]

✅ satisfied:
  • Title tag (54 chars, keyword at position 1)
  • Meta description (152 chars, keyword + benefit + CTA)
  • Canonical URL set
  • Primary keyword in first 100 words (position 38)
  • FAQ section with 6 questions
  • FAQ schema JSON-LD
  • 4 internal links (pillar, 2 siblings, gear subpillar)
  • 3 external citations (.gov, pubmed × 2)
  • Author byline + Person schema
  • HowTo schema (12 steps)
  • Pinterest pin metadata
  • Breadcrumbs + BreadcrumbList schema
  • [...]

⚠️ needs human input:
  • Real anecdote — stories.md has no entry for "first time teaching sun salutation"
  • Cloudflare Image IDs — placeholders left as `poses/sun-salutation-step-1` etc.
  • Last-reviewed date will need refresh in 6 months
  • Author photo for /authors/marvin not yet uploaded

❌ not applicable:
  • LocalBusiness schema (yoga affiliate, not a service business)
  • Phone number / click-to-call (no service pages on this site)
  • Service-area coverage
```

### 7. Output

Save the MDX to the correct path based on type:

- Pillar → `/content/guides/[slug].mdx`
- Subpillar (gear) → `/content/guides/[slug].mdx` OR `/content/gear/[category]/best-[category]-for-[audience].mdx`
- Cluster (pose) → `/content/poses/[slug].mdx`
- Cluster (product review) → `/content/gear/[category]/[product-slug].mdx`
- Cluster (general article) → `/content/blog/[slug].mdx`

Then output:

1. A short summary: page title, target keyword, word count, schema type, internal-link count, external-citation count.
2. The on-page SEO compliance report.
3. The path to the saved MDX file.
4. A "next steps" line: e.g. "upload hero image to Cloudflare Images as `poses/sun-salutation-hero`, add the real anecdote to stories.md, run `pnpm build` to verify schema validation."

## Voice quick-reference (the AI-tell delete list)

Before finalising, search the draft for these phrases and delete or rewrite:

- "unlock", "leverage", "seamless", "world-class", "cutting-edge"
- "in today's fast-paced world", "in the modern era", "as we navigate"
- "delve into", "embark on", "journey", "navigate"
- "elevate", "supercharge", "transform", "revolutionise"
- "It's worth noting that", "It goes without saying", "Needless to say"
- "comprehensive guide", "ultimate guide" (use "complete" or just describe the thing)
- "myriad of", "plethora of", "a wide array of"
- Any exclamation mark
- Any emoji
- Sentences that start with "Whether you're a..." enumerating audiences

If you find yourself reaching for these because the prose otherwise feels flat, that's the signal — the prose is flat. Add a real number, a real story, or a real opinion instead.

## Examples — when this skill triggers

**Example 1**
User: "Schrijf een cluster article over Downward-Facing Dog onder de yoga-for-beginners pillar"
→ Trigger this skill. Inputs: type=cluster, primary keyword="downward facing dog", cluster=poses, pillar=yoga-for-beginners.

**Example 2**
User: "Generate a gear roundup for the best yoga blocks for beginners"
→ Trigger this skill. Inputs: type=subpillar, primary keyword="best yoga blocks for beginners", cluster=gear/blocks, pillar=yoga-for-beginners.

**Example 3**
User: "I want a pillar page on yoga for back pain"
→ Trigger this skill. Inputs: type=pillar, primary keyword="yoga for back pain", cluster=yoga-for-back-pain (new cluster — pillar opens it).

**Example 4**
User: "Can you draft a Sun Salutation article? Just follow our content rules."
→ Trigger this skill. Inputs: infer type=cluster from "article", keyword="sun salutation", search MDX files to find pillar.

**Example 5 (do NOT trigger this skill)**
User: "What are some yoga topics we should cover next?"
→ This is brainstorming, not generation. Discuss instead.

**Example 6 (do NOT trigger this skill)**
User: "Fix the FAQ section in sun-salutation.mdx — the schema is malformed."
→ This is editing one section, not generating a full page. Open the file and fix directly.

## Edge cases

- **No primary keyword given.** Ask. Don't guess — the keyword shapes everything.
- **The keyword targets a topic that's already covered.** Surface the existing file path and ask whether to update it or write a fresh angle.
- **The cluster doesn't exist yet.** For pillars this is fine — you're opening a new cluster. For subpillars/clusters, push back: "There's no pillar for [topic]. Want me to draft the pillar first, or assign this to an adjacent existing cluster?"
- **Pinterest pin image not yet uploaded.** Leave a placeholder `pin.primaryImage` ID following the convention (`poses/sun-salutation-pin-a`) and flag it in the report.
- **Stats/stories/opinions references are empty.** Flag and ask whether to proceed with a generic first-person draft or pause until they're filled in.
- **Health/wellness claim with no citation source.** Either find a peer-reviewed source via web search, or soften the claim to a non-specific phrasing. Never publish an unsupported health claim.

## What this skill is NOT

- Not a content strategy planner — it ships drafts, not topic maps.
- Not an editor for existing files — for that, open the file directly.
- Not an image generator — it leaves Cloudflare Image ID placeholders for the user to upload separately.
- Not a publisher — it writes to disk; the user reviews, edits voice details, and merges via git.
