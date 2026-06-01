---
name: production-env-wiring
description: Production Convex deployment + Vercel/Convex env wiring; newsletter verified live end-to-end 2026-05-30
metadata: 
  node_type: memory
  type: project
  originSessionId: ab4f04a5-6355-4c1c-b26f-d60bb1600495
---

Production newsletter went live and was verified end-to-end on 2026-05-30.

**Deployments**
- Convex PROD: `perceptive-bear-405.eu-west-1.convex.cloud` (created via `npx convex deploy`). Tables/indexes live: subscribers, emailEvents, affiliateClicks.
- Convex DEV: `adventurous-marlin-334` (local `pnpm convex dev`).
- Vercel project: `marvinnl046s-projects/theyogasensei`, aliased to `www.theyogasensei.com`.

**Env wiring (the launch blocker that was fixed)**
- Vercel **Production** env: `AFFILIATE_REDIRECTS_ENABLED` + `VITE_CONVEX_URL=https://perceptive-bear-405.eu-west-1.convex.cloud`. VITE_ vars are **build-time** — after adding, a fresh `npx vercel --prod` build is required (a redeploy of the old build won't inline it).
- Convex **PROD** env (`npx convex env set ... --prod`): `RESEND_API_KEY` + `SITE_URL=https://www.theyogasensei.com`.
- Before this, prod had ONLY AFFILIATE_REDIRECTS_ENABLED → newsletter SIMULATED (fake "sent", no capture). See [[affiliate-gate-launch]].

**Verification (live, prod)**: submitted the homepage newsletter on www.theyogasensei.com with `delivered@resend.dev` (Resend's no-bounce sink) → prod `subscribers` row created with optInToken → `emailEvents` row `template:double-opt-in type:sent` → Resend send succeeded. That one inert test row (pending, never confirmed) is still in prod; `confirmedCount` ignores unconfirmed rows so it doesn't inflate the public count. Remove via Convex dashboard if a pristine table is wanted.

**Opt-in model: SINGLE opt-in (changed 2026-05-30, commit f2c6d4e).** Marvin found the confirm step unnecessary friction (correct — not legally required under NL/AVG with logged consent). `subscribers:insert` now sets `confirmedAt` at signup and sends the Welcome email directly; no double-opt-in. Added a server-side email-format regex as hygiene (no confirm click to catch typos). `sendDoubleOptIn` action + `emails/DoubleOptIn.tsx` are now VESTIGIAL (still deployed, never scheduled). `/confirm` route + `confirm` mutation kept for in-flight legacy links. Verified live on prod end-to-end (immediate confirmedAt + welcome event).

**Unsubscribe: BUILT (suppress model, 2026-05-30, commit 455693d).** `/unsubscribe?token=` route (button-confirm so email link-scanners can't unsub on load; post-hydration gate avoids React #418) + public `subscribers:unsubscribe` mutation. Suppression not deletion: sets `unsubscribedAt`, keeps the row; a deliberate form re-signup reactivates (clears `unsubscribedAt` via `patch(..., {unsubscribedAt: undefined})`). Every welcome/lead-magnet email carries the unsubscribe link (per-subscriber `optInToken`) + a `List-Unsubscribe: <url>` header. `confirmedCount` now excludes unsubscribed + unconfirmed. Verified live on prod end-to-end. Optional later: RFC-8058 one-click `List-Unsubscribe-Post` (needs a Convex HTTP POST endpoint on `.convex.site`).

**Welcome email redesigned (2026-05-30, commit 99a5d1d).** Premium responsive layout: bonsai hero (`/images/brand/newsletter-bonsai.png`), serif heading, "start here" link rows, clay CTA, dark-olive footer band with the unsubscribe link. QA'd via a throwaway render script + Playwright at desktop + 375px (note: `emails/` is excluded from the root tsconfig → `tsx` uses the classic JSX runtime, so a standalone render needs `globalThis.React = React` + dynamic import). React Email previews can be served through the running vite dev server from `public/` (the MCP browser blocks `file://`).

**Prod subscriber tables are EMPTY (cleaned 2026-05-30).** Used the new internal `subscribers:deleteByEmail` mutation (cascades emailEvents) to remove all test rows — `confirmedCount` is 0, ready for real signups. That mutation is a permanent admin utility (run via `npx convex run subscribers:deleteByEmail '{"email":"…"}' --prod`) and backs the privacy page's GDPR-erasure promise.

**Still optional / not done**
- Resend webhook → prod Convex `/resend-webhook` (open/click/bounce events). Core flow works without it; the `sent` event is recorded by our own email actions, not the webhook.
- Apex→www redirect chain is a Vercel dashboard setting (Marvin's). See [[vercel-deploy-setup]].
