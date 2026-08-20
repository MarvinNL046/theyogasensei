---
name: content-tracking
description: "How to check cluster health and what's next to write on theyogasensei.com — `pnpm content:status` is the single command for it"
metadata:
  node_type: memory
  type: reference
  originSessionId: 9e61ec77-410f-445c-a25e-56d680d64763
---

`pnpm content:status` is the canonical command for checking content backlog and cluster health on theyogasensei.com. It:

1. Reads `keywords.csv` (the backlog) and `used-keywords.md` (the published log)
2. Cross-references the two and **auto-updates `keywords.csv`** status field (`todo` → `done` for any row whose slug appears in `used-keywords.md`). This means the user never manually maintains the status column.
3. Prints per-pillar cluster health: how many clusters/subpillars published vs planned per pillar
4. Flags stale pages (pillars >90d, subpillars >45d, clusters >365d since `lastReviewedAt`)
5. Enforces cluster discipline (warns when pillar has <10 clusters before opening another)
6. Suggests next 3 to write, sorted by score = volume / kd (easy-win first)

Run it at the start of every content work session. It's the only place that combines the backlog (keywords.csv) and the published log (used-keywords.md) into one view.

Implementation: `scripts/content-status.ts`. Wired into package.json as `content:status`.

Related infrastructure (already present, do NOT rebuild):

- `scripts/verify-used-keywords.ts` — CI guardrail; build fails if MDX file exists without matching row in used-keywords.md. Wired into `pnpm verify` and therefore `pnpm build`.
- `scripts/scan-mdx-slugs.ts` — walks `/content/**/*.mdx` and parses frontmatter. Shared utility.

Linked vault note: `C:\Users\M_Smi\Documents\ContentOps-Vault\Cluster Tracking — pnpm content-status.md` — see [[obsidian-vault]].
