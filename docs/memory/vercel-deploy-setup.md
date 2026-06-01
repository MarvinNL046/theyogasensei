---
name: vercel-deploy-setup
description: "How theyogasensei deploys to Vercel — gotchas that blocked the first launch (routeTree.gen, vercel.json, canonical host, auth)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 247b1b40-280e-45f0-8514-9c9d3c6ff24d
---

theyogasensei.com runs on Vercel (project `prj_3B5kHpU3fccE2dCioZ5tlgXyWwpB`,
team `team_7Vpqlkzfz83Hrfz4GuMw6YTt` / `marvinnl046s-projects`). Framework:
TanStack Start + nitro (vercel.json present, output handled by the preset).
Production serves on **www.theyogasensei.com** (non-www 307-redirects to www).

**Hard-won gotchas from the first launch (2026-05-29) — all fixed:**

1. **`vercel.json` invalid `source` pattern** → EVERY deploy failed silently at
   config validation (no deployment record created). Vercel uses path-to-regexp,
   not free regex: no `\.`, `(?:...)`, or `?` quantifiers. Keep header sources
   simple, e.g. `/(.*).(js|css|woff2|woff|webp|...)`.

2. **`routeTree.gen.ts` was gitignored** → Vercel's clean checkout ran
   `tsc --noEmit` (the `typecheck` step, which runs BEFORE vite generates the
   file) and failed with TS2307 + a route-type cascade. Fix: the file is now
   COMMITTED (un-ignored). Re-commit it if routes change. (Proper long-term fix
   would be generating it pre-typecheck in the build script.)

3. **Canonical host:** `SITE_URL` fallback in `src/lib/seo/head.ts` AND
   `scripts/generate-sitemap.ts` is now `https://www.theyogasensei.com` (was
   non-www, which mismatched the served/redirected www host). Override via
   `SITE_URL` env if ever needed.

**Deploy mechanics:**
- Vercel CLI is installed + authed as `marvinnl046` (cached login on this machine).
  Manual deploy: `vercel deploy --prod --yes` from the repo (it's linked via
  `.vercel/`, which is gitignored).
- Auto-deploy on `git push origin main` WORKS now (it was blocked only by the two
  bugs above). There is also a deploy hook for `main`.
- No Vercel env vars are set → Convex features (newsletter) are inert until
  `VITE_CONVEX_URL` is added. The affiliate gate is safe by default (see
  [[affiliate-gate-launch]]).

**Build-validation gotcha (caused a failed deploy 2026-05-29):** do NOT validate
a build with `pnpm build 2>&1 | tail -N && <next>` — the pipe to `tail` makes the
shell see `tail`'s exit code (0), masking a real build failure, so the `&&` chain
runs and it looks green when typecheck actually failed. Validate with the REAL
exit code: `pnpm build > log 2>&1; echo "EXIT=$?"; tail log` — or just run
`pnpm typecheck` directly and read its exit. (A favicon deploy failed on
`tsc` TS2353 — a `type` prop on TanStack `HeadLink` is not allowed — that the
masked local build missed. HeadLink links accept `rel`/`href`, not `type`.)

**Still open (Marvin's account steps):** GSC verify + sitemap submit, Amazon
Associates application, then flip the gate (see [[affiliate-gate-launch]]).
Homepage `/` still lacks an og:image (minor).
