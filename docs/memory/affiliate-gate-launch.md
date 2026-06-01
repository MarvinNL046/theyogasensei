---
name: affiliate-gate-launch
description: AFFILIATE_REDIRECTS_ENABLED stays false at launch — flip to true on Vercel ONLY after Amazon Associates approval (this is the recurring TODO not to forget)
metadata: 
  node_type: memory
  type: project
  originSessionId: 247b1b40-280e-45f0-8514-9c9d3c6ff24d
---

**APPROVED 2026-05-30.** Status of the launch checklist:
- ✅ Tag confirmed: `theyogasensei-20` IS Marvin's real Associates tag (the
  placeholder guess was correct — no swap needed; comment updated).
- ✅ All 11 registry ASINs in `src/lib/affiliate-links.ts` verified against live
  Amazon listings (mine via WebFetch + a parallel browser-Claude session). 7 were
  identical; 3 updated to freshly-verified same-product variants (Liforme
  B09X66N6GX, Yogitoes B0D5ZR3R1M, eQua B00DGMS8XU); eKO 5mm kept at 71" standard
  B078YB99H8 (Marvin's call over the 79" long version). Commit 6d8cc5c.
- ✅ Every `/go/<slug>` + AffiliateButton slug in the content maps to a registry key.
- ✅ **GATE FLIPPED — AFFILIATE LINKS ARE LIVE (2026-05-30).** Set
  `AFFILIATE_REDIRECTS_ENABLED=true` for **Production** via the Vercel CLI
  (`vercel env rm/add`; the var existed but was empty — Marvin pre-created it).
  Preview left gated. Triggered the deploy with an empty commit (0468eaa) since
  there was no code change; the flag is read at runtime + snapshotted per deploy,
  so a fresh deploy was required. Verified live: `/go/manduka-pro-6mm` →
  302 → `amazon.com/dp/B005NZ7PEQ?tag=theyogasensei-20`, plus 4 more spot-checks
  (all 302, correct ASIN, tag appended). Click analytics now logs (gate is open).

**Vercel CLI works in-session** (54.6.1, authed as marvinnl046, project linked at
`.vercel/project.json`) — the earlier "Marvin sets it himself" note is superseded;
I can read (`vercel env pull` to a temp file, read one key, delete) and write
(`vercel env rm/add`) env vars. The session-start "Vercel CLI not installed"
banner was stale.

**Why it's false at launch (decided 2026-05-29):** the `/go/$slug` gate is
fail-closed — `affiliateRedirectsEnabled()` only returns true when the env var
is exactly `'true'`/`'1'`. With it false, `/go/` returns 404 + noindex/nostore
and no affiliate links are live. We launch gated so no unapproved
placeholder-tag links go public before Associates approval (CLAUDE.md rule).

**Important coupling:** click analytics is wired AFTER the gate in
`src/routes/go/$slug.tsx` — clicks are only logged when the gate is OPEN. So
while gated, there is NO click analytics. Marvin had originally set the Vercel
env to true to get click analytics; for launch we accept losing analytics until
approval. (Option to decouple: log the click before the gate and still 404 —
not built; revisit if pre-approval analytics is wanted.)

**Env var is account-side:** set in the Vercel dashboard (Settings → Environment
Variables → Production), NOT readable/writable via the connected Vercel MCP or
local code. Marvin sets it himself.

Related: production deploys from GitHub `main`; see the push/deploy story — the
site was 42 commits behind until the launch push.
