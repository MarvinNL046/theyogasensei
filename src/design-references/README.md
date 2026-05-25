# Design References

Hand-coded design templates parked here **outside** TanStack Start's file-route convention (`src/routes/`). Files in this directory are:

- Preserved as visual reference for future feature work
- NOT auto-routed (the file-route plugin only scans `src/routes/`)
- NOT prerendered, sitemap-listed, or crawlable

If you want to revive any of these as a real route, copy the file back into `src/routes/` and wire its data to MDX / Convex / a real loader. Do not import directly from `src/design-references/` into live routes — that defeats the purpose of parking them.

## Current contents

- `compare-manduka-vs-liforme.tsx` — hand-coded compare page template (511 lines). Parked 2026-05-25 by Phase A of the launch-readiness route audit (`content-briefs/_launch-readiness-route-audit.md` Q4). Zero inbound links at time of move. Revive when a real `/compare/$slug` route is planned, backed by a content collection.
