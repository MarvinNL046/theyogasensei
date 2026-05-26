# Used Keywords — theyogasensei.com

The keyword-cannibalisation guardrail. Every page-generation skill must read this file before writing, and append to it after publishing.

**Rule:** a primary keyword is used by **exactly one** page on this site. Once it's logged here, treat it as taken — either refresh the existing page or pick a different angle (e.g., narrow the modifier: "sun salutation" → "sun salutation for back pain"). Never publish two pages competing for the same primary keyword. That's how you split your own ranking signal across two URLs and lose to a competitor with one.

Secondary keywords can overlap across pages — only primaries are tracked here.

---

## Format

Append one row per published page in this format:

```
| Primary keyword | Slug | Page type | Cluster | Pillar | Published | Last reviewed |
```

## Log

| Primary keyword | Slug | Page type | Cluster | Pillar | Published | Last reviewed |
|---|---|---|---|---|---|---|
| sun salutation | sun-salutation | cluster | poses | yoga-for-beginners | 2026-05-13 | 2026-05-13 |
| how to clean a yoga mat | how-to-clean-a-yoga-mat | cluster | yoga-mats | how-to-choose-a-yoga-mat | 2026-05-25 | 2026-05-28 |
| how to choose a yoga mat | how-to-choose-a-yoga-mat | pillar | yoga-mats | how-to-choose-a-yoga-mat | 2026-05-28 | 2026-05-28 |
| how thick should a yoga mat be | how-thick-should-a-yoga-mat-be | cluster | yoga-mats | how-to-choose-a-yoga-mat | 2026-05-29 | 2026-05-29 |
| best yoga mat for hot yoga | best-yoga-mat-for-hot-yoga | cluster | yoga-mats | how-to-choose-a-yoga-mat | 2026-05-30 | 2026-05-30 |

---

## Workflow

**Before writing a page:**

1. Open this file.
2. Search for the candidate primary keyword.
3. If it appears → either update the existing page (refresh `lastReviewedAt`, expand content, add new sections) or pick a different keyword. Do NOT open a competing page.
4. If it doesn't appear → proceed with research and drafting.

**After publishing a page:**

1. Append a row with the primary keyword, slug, page type, cluster, pillar, today's date as both Published and Last reviewed.
2. Commit the change in the same PR as the new MDX file. CI should fail if a new MDX file is added without a corresponding row here.

**When refreshing an existing page:**

1. Update the matching row's `Last reviewed` to today.
2. Update the page's `lastReviewedAt` frontmatter to match.
3. The Published date never changes — that's the original publish date for citation purposes.

---

## Related guardrails

- **Cluster discipline** — don't open a second pillar in a cluster until the first has 10+ cluster articles linking to it.
- **Internal-linking density** — every new cluster article must add at least one link to the pillar and 2–3 links to siblings in the same cluster. The `related` frontmatter field enforces this.
- **Search Console review** — every 90 days, audit pages with high impressions but low CTR. Either rewrite the title/meta or merge into the closest pillar.
