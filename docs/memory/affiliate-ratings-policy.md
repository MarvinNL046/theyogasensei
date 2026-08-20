---
name: affiliate-ratings-policy
description: 'Ratings ARE allowed if sourced from the affiliate partner (Amazon), real + attributed — never fabricated. Needs PA-API; placeholder until then.'
metadata:
  node_type: memory
  type: feedback
  originSessionId: 247b1b40-280e-45f0-8514-9c9d3c6ff24d
---

Marvin's clarification (2026-05-29) on the "no ratings in copy" rule:
**ratings are fine when they come from the affiliate partner (Amazon) — real,
attributed star ratings + review counts. What stays banned is FABRICATING our
own scores/ratings.** Honest = real third-party data, attributed. Fabricated =
inventing numbers.

**Why it's not on yet (the constraint to remember):**

- Showing Amazon ratings programmatically needs **PA-API access** (comes after
  Amazon Associates approval + qualifying sales).
- Amazon's API terms require price/rating data to be **live/refreshed** (≈24h
  cache max), NOT hardcoded into static copy. Manually typing Amazon ratings into
  MDX/components is both a ToS risk and goes stale.

**How to apply:**

- **Pre-PA-API (now):** no ratings rendered. Use the `EmptyStars` placeholder
  ("rating not yet available") — that's the correct interim state, not a bug.
- **Post-PA-API:** wire live Amazon ratings + review counts (attributed,
  auto-refreshed) into product cards / Sensei Picks; fill the placeholder stars.
- This pairs with the gate flip in [[affiliate-gate-launch]] — both unlock after
  Associates approval. Note: this REFINES the CLAUDE.md "no ratings/star counts
  in copy" rule (which still holds for fabricated/hardcoded ratings).
