# Minimal Launch Route Audit (Phase B)

Date: 2026-05-25
Status: **Phase B1–B8 executed in commit `61d8523`. Tracking-sync + pre-C2 checklist in follow-up commit. Ready for second-opinion audit.**

Phase A (commits 712719d, 3628601) shipped a "noindex-and-ship" compromise: 26 routes stayed live, listing pages got `noindex`, the worst comparison page was archived, and the sitewide "certified teachers" fabrication + broken footer logo were fixed. Phase A treated hardcoded launch pages as keepable because they had inbound links.

Marvin's Phase B philosophy is different and stricter: **clean slate**. A route only stays live if it serves real content (an MDX file actually exists at `content/<type>/<slug>.mdx`) or it is a legitimate functional page (auth confirm, affiliate redirect, legal). Hardcoded mock pages — even with inbound links from header, footer, or homepage — move to `src/design-references/`. Inbound links to fake pages are themselves fake; we strip the link rather than keep the fake page alive to support it.

The principle (Marvin, verbatim): _"Wees streng. Als een page hardcoded content toont die suggereert dat we iets te bieden hebben dat we niet hebben, dan is dat een claims-safety violation in dezelfde categorie als fake testing claims. Strip het. We bouwen het opnieuw op wanneer we het echt hebben. Geen uitzonderingen voor 'het heeft toch inbound links' — die links strippen we ook."_

Content inventory at the time of this audit:

- content/guides/how-to-clean-a-yoga-mat.mdx — real 2,556-word C1 article. KEEP-LIVE.
- content/guides/yoga-for-beginners.mdx — frontmatter + schema real, body is a ~20-word placeholder ("Placeholder pillar — final copy lands via /generate-page").
- content/poses/sun-salutation.mdx — appears real (frontmatter complete, schemaType HowTo, ~87 lines).
- content/authors/marvin.mdx — rewritten in 3628601, real.
- No content/reviews/_, content/styles/_, content/gear/_, content/blog/_ exist.

## Section 1 — Inventory with Minimal Launch classification

| Path                       | Current state                                                                                 | New classification      | Why                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------- |
| \_\_root.tsx               | Layout shell (Header/Footer + outlet)                                                         | KEEP-LIVE               | Required infrastructure; not a URL.                                                   |
| about.tsx                  | Editorial about-page, references Marvin only                                                  | KEEP-LIVE               | Honest single-author page after 3628601 cleanup.                                      |
| affiliate-disclosure.tsx   | Static legal disclosure                                                                       | KEEP-LIVE (verify body) | Legally needed once any `/go/$slug` link is published. See Section 10.                |
| authors/$slug.tsx          | Dynamic route, resolves from content/authors/\*.mdx                                           | KEEP-LIVE               | Real loader, real MDX exists (marvin.mdx).                                            |
| confirm.tsx                | Convex newsletter confirm token handler                                                       | KEEP-LIVE               | Functional auth endpoint; harmless without subscribers.                               |
| gear/$category/$slug.tsx   | Dynamic gear review route, no content/gear/\*                                                 | NEEDS-CONTENT-FIRST     | Route structure fine but zero MDX backing it.                                         |
| gear/$category/index.tsx   | Hardcoded category landing                                                                    | STRIP-AND-ARCHIVE       | Mock content; no category model exists.                                               |
| gear/index.tsx             | "7 Best Yoga Mats" hardcoded list                                                             | STRIP-AND-ARCHIVE       | Claims-safety violation: implies tested ranking we don't have.                        |
| go/$slug.tsx               | Affiliate redirect, reads affiliateLinks registry                                             | KEEP-LIVE               | Functional infra; empty registry → 404 is fine.                                       |
| guides/$slug.tsx           | MDX-driven (wired in 712719d)                                                                 | KEEP-LIVE               | Real content lives behind it.                                                         |
| guides/index.tsx           | Hardcoded "Journal" with fake POSTS array, noindex'd in Phase A                               | STRIP-AND-ARCHIVE       | Hardcoded POSTS suggest editorial inventory we don't have.                            |
| index.tsx                  | 640-line homepage with hardcoded featured guides, topics grid, featured review, product cards | REWRITE-FOR-LAUNCH      | Stays live (root URL) but body must shrink to honest minimum.                         |
| mindful-journal.tsx        | Hardcoded CRO landing, 460 lines                                                              | STRIP-AND-ARCHIVE       | No journal product, claims-safety violation.                                          |
| poses/$slug.tsx            | MDX-driven loader                                                                             | KEEP-LIVE               | Real content (sun-salutation.mdx).                                                    |
| poses/index.tsx            | Hardcoded slug list                                                                           | STRIP-AND-ARCHIVE       | One real pose ≠ a "Poses" hub.                                                        |
| privacy.tsx                | Static legal page                                                                             | KEEP-LIVE (verify body) | See Section 10 — confirm body is real, not placeholder.                               |
| reviews/$slug.tsx          | Dynamic, noindex-until-content (Phase A)                                                      | NEEDS-CONTENT-FIRST     | No content/reviews/\* exists; structurally correct, archive shell until first review. |
| reviews/best-yoga-mats.tsx | Hardcoded best-of list                                                                        | STRIP-AND-ARCHIVE       | Implies tested ranking we don't have.                                                 |
| reviews/manduka-pro.tsx    | Hardcoded 466-line product review                                                             | STRIP-AND-ARCHIVE       | Fabricated testing/scoring — same category as "certified teachers".                   |
| search.tsx                 | Hardcoded sample-result search page (957 lines)                                               | STRIP-AND-ARCHIVE       | Fake results; no index to search. Header search button is already `disabled`.         |
| sensei-picks.tsx           | Hardcoded picks landing (428 lines)                                                           | STRIP-AND-ARCHIVE       | Implies curated recommendations we haven't made.                                      |
| start-here.tsx             | Hardcoded CRO landing (418 lines)                                                             | STRIP-AND-ARCHIVE       | Mock onboarding flow; no signup product live.                                         |
| styles/$slug.tsx           | Dynamic, no MDX backing                                                                       | NEEDS-CONTENT-FIRST     | Structure ok, archive until content arrives.                                          |
| styles/index.tsx           | Hardcoded styles list                                                                         | STRIP-AND-ARCHIVE       | Zero real style MDX.                                                                  |
| terms.tsx                  | Static legal page                                                                             | KEEP-LIVE (verify body) | See Section 10.                                                                       |

(Already moved in Phase A — out of scope here: `compare/manduka-vs-liforme.tsx`.)

## Section 2 — Per-route concrete migration action

| Path                       | Classification      | Action                                                                                                                | Blocking?        |
| -------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------- |
| \_\_root.tsx               | KEEP-LIVE           | None.                                                                                                                 | no               |
| about.tsx                  | KEEP-LIVE           | None. Optional: remove the `/affiliate-disclosure` Link if §10 decides legal pages are also archived.                 | no               |
| affiliate-disclosure.tsx   | KEEP-LIVE           | Confirm body is real copy; keep.                                                                                      | yes (read)       |
| authors/$slug.tsx          | KEEP-LIVE           | None.                                                                                                                 | no               |
| confirm.tsx                | KEEP-LIVE           | None. Internal links to `/guides` and `/start-here` updated → `/guides/how-to-clean-a-yoga-mat` and `/` respectively. | yes (link patch) |
| gear/$category/$slug.tsx   | NEEDS-CONTENT-FIRST | `git mv src/routes/gear/$category/$slug.tsx src/design-references/routes/gear-category-slug.tsx`.                     | yes              |
| gear/$category/index.tsx   | STRIP-AND-ARCHIVE   | `git mv` → `src/design-references/routes/gear-category-index.tsx`.                                                    | yes              |
| gear/index.tsx             | STRIP-AND-ARCHIVE   | `git mv` → `src/design-references/routes/gear-index.tsx`.                                                             | yes              |
| go/$slug.tsx               | KEEP-LIVE           | None.                                                                                                                 | no               |
| guides/$slug.tsx           | KEEP-LIVE           | None.                                                                                                                 | no               |
| guides/index.tsx           | STRIP-AND-ARCHIVE   | `git mv` → `src/design-references/routes/guides-index.tsx`.                                                           | yes              |
| index.tsx                  | REWRITE-FOR-LAUNCH  | See Section 4 spec.                                                                                                   | yes              |
| mindful-journal.tsx        | STRIP-AND-ARCHIVE   | `git mv` → `src/design-references/routes/mindful-journal.tsx`.                                                        | yes              |
| poses/$slug.tsx            | KEEP-LIVE           | None.                                                                                                                 | no               |
| poses/index.tsx            | STRIP-AND-ARCHIVE   | `git mv` → `src/design-references/routes/poses-index.tsx`.                                                            | yes              |
| privacy.tsx                | KEEP-LIVE           | Verify body real; otherwise §10.                                                                                      | yes (read)       |
| reviews/$slug.tsx          | NEEDS-CONTENT-FIRST | `git mv` → `src/design-references/routes/reviews-slug.tsx`.                                                           | yes              |
| reviews/best-yoga-mats.tsx | STRIP-AND-ARCHIVE   | `git mv` → `src/design-references/routes/reviews-best-yoga-mats.tsx`.                                                 | yes              |
| reviews/manduka-pro.tsx    | STRIP-AND-ARCHIVE   | `git mv` → `src/design-references/routes/reviews-manduka-pro.tsx`.                                                    | yes              |
| search.tsx                 | STRIP-AND-ARCHIVE   | `git mv` → `src/design-references/routes/search.tsx`. Header search icon stays `disabled`.                            | yes              |
| sensei-picks.tsx           | STRIP-AND-ARCHIVE   | `git mv` → `src/design-references/routes/sensei-picks.tsx`.                                                           | yes              |
| start-here.tsx             | STRIP-AND-ARCHIVE   | `git mv` → `src/design-references/routes/start-here.tsx`.                                                             | yes              |
| styles/$slug.tsx           | NEEDS-CONTENT-FIRST | `git mv` → `src/design-references/routes/styles-slug.tsx`.                                                            | yes              |
| styles/index.tsx           | STRIP-AND-ARCHIVE   | `git mv` → `src/design-references/routes/styles-index.tsx`.                                                           | yes              |
| terms.tsx                  | KEEP-LIVE           | Verify body real; otherwise §10.                                                                                      | yes (read)       |

After moves, run `pnpm tsc --noEmit` to catch dangling `Link to=` references and fix per §3.

## Section 3 — Inbound link cascade

For every STRIP-AND-ARCHIVE / NEEDS-CONTENT-FIRST target, all inbound `to="…"` Link usages from sources that remain live (KEEP-LIVE / REWRITE-FOR-LAUNCH) must be stripped. Sources that are themselves being archived take their links with them — no action.

`/start-here` (STRIP-AND-ARCHIVE)

- src/components/site/header.tsx:70 — desktop CTA button "Start here". Source KEEP-LIVE → REMOVE entire CTA block (lines ~68–83 keep only the disabled Search button, or drop the right-side cluster entirely).
- src/components/site/header.tsx:119 — mobile CTA mirror. Source KEEP-LIVE → REMOVE mobile "Start here" link (lines 118–124).
- src/components/site/footer.tsx:45 — "Practice → Start here". Source KEEP-LIVE → REMOVE list item.
- src/components/site/footer.tsx:119 — newsletter "Subscribe" CTA pointing at /start-here. Source KEEP-LIVE → either remove the CTA entirely (recommended, no signup product) or repoint to `mailto:` placeholder. See §5.
- src/routes/index.tsx:277 — homepage hero secondary CTA. Source REWRITE-FOR-LAUNCH → covered by §4 rewrite.
- src/routes/guides/index.tsx:577 — source STRIP-AND-ARCHIVE, no action.
- src/routes/confirm.tsx:146, 187 — fallback CTAs. Source KEEP-LIVE → repoint to `/` (home) or `/guides/how-to-clean-a-yoga-mat`.

`/poses` (poses/index.tsx STRIP-AND-ARCHIVE)

- src/components/site/footer.tsx:50 — "Practice → Poses". Source KEEP-LIVE → REMOVE list item.
- src/components/site/header.tsx — NAV_LINKS array entry `{ to: '/poses', label: 'Practice' }` (line 10). Source KEEP-LIVE → REMOVE entry.
- src/routes/guides/index.tsx:584 — source STRIP-AND-ARCHIVE, no action.
- src/components/site/not-found.tsx:44 — `to="/poses/$slug"`, dynamic pose deep link. Source KEEP-LIVE; target `/poses/$slug` remains KEEP-LIVE → no action.

`/styles` (styles/index.tsx STRIP-AND-ARCHIVE)

- src/components/site/footer.tsx:55 — "Practice → Styles". Source KEEP-LIVE → REMOVE list item.

`/guides` (guides/index.tsx STRIP-AND-ARCHIVE — note: this strips the LISTING route. `/guides/$slug` stays live as KEEP-LIVE.)

- src/components/site/header.tsx — NAV_LINKS entries `{ to: '/guides', label: 'Guides' }` and `{ to: '/guides', label: 'Journal' }` (lines 8, 11). Source KEEP-LIVE → either REMOVE both, or repoint to `/guides/how-to-clean-a-yoga-mat` (the one real guide). Recommended: remove the duplicate "Journal" entry; rename "Guides" to point at the single live guide OR leave as nav placeholder pointing at `/`.
- src/components/site/footer.tsx:60 — "Practice → Guides". Source KEEP-LIVE → REMOVE list item (or repoint to the single MDX guide).
- src/routes/index.tsx:270, 356, 533 — homepage CTAs. Source REWRITE-FOR-LAUNCH → covered by §4.
- src/routes/guides/$slug.tsx:135, 333, 366 — breadcrumb + back links. Source KEEP-LIVE → repoint to `/` (home).
- src/routes/confirm.tsx:140, 166 — fallback CTAs. Source KEEP-LIVE → repoint to `/guides/how-to-clean-a-yoga-mat`.
- src/components/site/not-found.tsx:29, 57 — `to="/guides/$slug"` (dynamic). Source KEEP-LIVE; target `/guides/$slug` KEEP-LIVE → no action.

`/gear` (gear/index.tsx STRIP-AND-ARCHIVE)

- src/components/site/header.tsx — NAV_LINKS entry `{ to: '/gear', label: 'Reviews' }` (line 9). Source KEEP-LIVE → REMOVE entry.
- src/components/site/footer.tsx:73 — "Reviews → Gear". Source KEEP-LIVE → REMOVE list item.
- src/features/reviews/components/HeroReviewSection.tsx:45 — source is used by reviews/manduka-pro.tsx (STRIP-AND-ARCHIVE) and reviews/$slug.tsx (NEEDS-CONTENT-FIRST archived). Both sources archived → no action.
- src/features/reviews/components/ProductReviewHero.tsx:48 — same: only used by archived review pages → no action.
- src/routes/gear/$category/index.tsx — source STRIP-AND-ARCHIVE, no action.

`/gear/$category/$slug` (NEEDS-CONTENT-FIRST archived)

- src/routes/gear/$category/index.tsx:43 — source STRIP-AND-ARCHIVE, no action.

`/sensei-picks` (STRIP-AND-ARCHIVE)

- No `to="/sensei-picks"` references found in src/ — appears unlinked from nav already. Safe to archive.

`/mindful-journal` (STRIP-AND-ARCHIVE)

- No `to="/mindful-journal"` references found in src/. Safe to archive.

`/search` (STRIP-AND-ARCHIVE)

- Header search trigger (header.tsx:75–82) is `disabled` and does not Link to `/search`. No inbound Links to strip.

`/reviews/best-yoga-mats`, `/reviews/manduka-pro`, `/reviews/$slug` (all archived)

- No direct `to="/reviews/…"` Link references found in surviving sources. Internal cross-links between reviews leave with the archived files. Safe.

Guides $slug breadcrumb file specifically:

- src/routes/guides/$slug.tsx:131 `to="/"` — KEEP.
- src/routes/guides/$slug.tsx:164, 221 `to="/about"` — KEEP (about is KEEP-LIVE).
- src/routes/guides/$slug.tsx:240 `to={post.to}` — related-posts loop. Verify the related list doesn't deep-link into archived `/guides/<slug>` slugs that don't exist; safest to filter related posts to slugs that have MDX files. Belongs to Phase B7 polish, not blocking the archive moves.

## Section 4 — Homepage (index.tsx) rewrite specification

Current homepage (640 lines) hardcodes:

1. Hero with dual CTA → /guides, /start-here.
2. TRUST_PILLARS section (4 generic value props).
3. "Everything you need" TOPICS grid (6 hardcoded topic cards → /styles, /poses, /gear, /guides etc.).
4. Featured Review band — implies a Manduka editorial pick exists.
5. "Featured guides" cards array → /guides/$slug with slugs that mostly don't have MDX.
6. Final CTA band → /guides + /start-here.

Rewrite target: ~150 lines, three blocks, zero claims about content we don't have.

KEEP:

- `<head>` meta + canonical (already real, honest copy).
- Hero block (text + brand imagery), but strip the secondary "Start here" CTA. Primary CTA repoints to `/guides/how-to-clean-a-yoga-mat` (the one real guide) with label like "Read the latest guide" — or to `/about` if Marvin prefers introducing himself first.
- Optional: small "About the author" teaser linking to `/about` and `/authors/marvin`.

STRIP entirely:

- TRUST_PILLARS array + render (we'll re-introduce when we have substance to back each pillar).
- TOPICS grid (it links to archived listing routes).
- Featured Review band (no real review exists).
- Featured guides cards array (most slugs have no MDX).
- Final dual-CTA band.

MINIMAL REPLACEMENT (recommended):

1. Hero — same brand imagery, copy unchanged, single primary CTA → `/guides/how-to-clean-a-yoga-mat`.
2. One "Latest writing" section — hand-list the two pieces that exist (`/guides/how-to-clean-a-yoga-mat`, `/poses/sun-salutation`). If `yoga-for-beginners.mdx` body is still a placeholder at execution time, exclude it; otherwise include.
3. Footer CTA band — replaced by a one-line "Written by Marvin — read the about page" link to `/about`. No newsletter signup until Convex flow is live.

Net effect: the homepage advertises only what actually exists.

## Section 5 — Footer cleanup

Issue 1 — Footer logo image (`/logo/logo-mark.png` → `/logo/logo-enso.png`): already fixed in commit 3628601. CONFIRMED. No further action.

Issue 2 — Footer description fabrication ("certified teachers" etc.): already fixed in commit 3628601. CONFIRMED. No further action.

Issue 3 (NEW) — Footer navigation links pointing at soon-archived routes:

- footer.tsx:45 `/start-here` → REMOVE list item (target archived).
- footer.tsx:50 `/poses` → REMOVE list item (poses listing archived). Note: dynamic `/poses/$slug` remains live, but linking to it from footer requires a deep-link choice; cleanest is removal until a poses index is rebuilt.
- footer.tsx:55 `/styles` → REMOVE list item (target archived).
- footer.tsx:60 `/guides` → REMOVE list item, OR repoint to `/guides/how-to-clean-a-yoga-mat` ("Latest guide"). Recommend remove for symmetry.
- footer.tsx:73 `/gear` → REMOVE list item.
- footer.tsx:78 `/about` → KEEP (target KEEP-LIVE).
- footer.tsx:119 Newsletter "Subscribe" button → `/start-here` → REMOVE entire newsletter column, OR repoint to `mailto:` placeholder until Convex signup ships. Recommend remove column.
- footer.tsx:131, 136, 142 (`/privacy`, `/terms`, `/affiliate-disclosure`) → KEEP if §10 confirms legal pages stay live with real bodies; otherwise remove in lockstep.

Result: footer collapses from 4-column to 1-2 columns (logo+description, legal row). Acceptable for a single-author launch.

## Section 6 — Header cleanup

NAV_LINKS array (header.tsx:7–13) currently exports 5 entries. After archive:

- `/guides` (Guides) → target archived. REMOVE entry, OR rename to "Guide" and point at `/guides/how-to-clean-a-yoga-mat`. Recommended: REMOVE.
- `/gear` (Reviews) → target archived. REMOVE entry.
- `/poses` (Practice) → target archived (poses index). REMOVE entry. Dynamic `/poses/$slug` is reachable via direct links, not nav.
- `/guides` (Journal — duplicate) → REMOVE entry.
- `/about` → KEEP.

End state: NAV_LINKS = `[{ to: '/about', label: 'About' }]`. Header collapses to logo + one nav item + (disabled) search icon. Mobile menu mirrors automatically.

Desktop "Start here" CTA (header.tsx:69–74) → REMOVE.
Mobile "Start here" CTA (header.tsx:118–124) → REMOVE.

Disabled search button (header.tsx:75–82) → KEEP as-is (already `disabled` + `aria-label="Search — coming soon"`).

## Section 7 — Sitemap.xml impact

Current 9 URLs in public/sitemap.xml:

| URL                                                 | Verdict                                                                                          |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| https://theyogasensei.com/                          | KEEP                                                                                             |
| https://theyogasensei.com/about                     | KEEP                                                                                             |
| https://theyogasensei.com/start-here                | REMOVE (route archived)                                                                          |
| https://theyogasensei.com/privacy                   | KEEP (pending §10 verify)                                                                        |
| https://theyogasensei.com/terms                     | KEEP (pending §10 verify)                                                                        |
| https://theyogasensei.com/affiliate-disclosure      | KEEP (pending §10 verify)                                                                        |
| https://theyogasensei.com/authors/marvin            | KEEP                                                                                             |
| https://theyogasensei.com/guides/yoga-for-beginners | REMOVE until body is real copy (currently placeholder) — OR keep if Marvin writes the body in B6 |
| https://theyogasensei.com/poses/sun-salutation      | KEEP                                                                                             |

ADD (currently missing from sitemap):

- https://theyogasensei.com/guides/how-to-clean-a-yoga-mat — the only fully-real guide; must be in the sitemap.

Post-migration sitemap (minimum, 7 URLs):

1. / (home)
2. /about
3. /authors/marvin
4. /guides/how-to-clean-a-yoga-mat
5. /poses/sun-salutation
6. /privacy \*
7. /terms \*
8. /affiliate-disclosure \*

(\* = conditional on §10 legal-page decision. If Marvin keeps placeholder legal bodies in design-references, drop these three and final sitemap = 5 URLs.)
If yoga-for-beginners body is rewritten in B6, add /guides/yoga-for-beginners as URL 9.

## Section 8 — Execution order

Phase B is a single PR-sized refactor, executed in this order. No code changes happen in this audit doc — these are the steps Marvin (or a follow-up subagent) will run.

B1 — Verify legal page bodies (15 min). Read `src/routes/privacy.tsx`, `terms.tsx`, `affiliate-disclosure.tsx`. If bodies are real → confirm KEEP-LIVE. If placeholder → escalate to §10 Q5.

B2 — Create archive structure (5 min). `mkdir -p src/design-references/routes` if not present. Confirm existing `src/design-references/` is gitignored from prerender (verify vite.config.ts).

B3 — `git mv` all STRIP-AND-ARCHIVE + NEEDS-CONTENT-FIRST routes (15 min). 13 file moves total: gear/index.tsx, gear/$category/index.tsx, gear/$category/$slug.tsx, guides/index.tsx, mindful-journal.tsx, poses/index.tsx, reviews/$slug.tsx, reviews/best-yoga-mats.tsx, reviews/manduka-pro.tsx, search.tsx, sensei-picks.tsx, start-here.tsx, styles/$slug.tsx, styles/index.tsx. Also remove now-empty directories (`src/routes/gear/`, `src/routes/reviews/` will retain nothing but consider keeping `src/routes/poses/`, `src/routes/styles/` empty-with-just-$slug — wait, styles has nothing left, poses keeps $slug). Net leftover route dirs: poses/ (only $slug.tsx), guides/ (only $slug.tsx), authors/ ($slug.tsx), go/ ($slug.tsx).

B4 — Strip inbound Links per §3 (30 min). Edit header.tsx, footer.tsx, confirm.tsx, guides/$slug.tsx (breadcrumb to-/guides → to-"/"). Run `pnpm tsc --noEmit` to catch any remaining `Link to=` references to dead routes.

B5 — Rewrite homepage per §4 (45 min). index.tsx 640 → ~150 lines.

B6 — Content decisions (variable). Marvin's call: rewrite `content/guides/yoga-for-beginners.mdx` body or remove from sitemap. Verify `content/poses/sun-salutation.mdx` body is real (not just frontmatter).

B7 — Update sitemap.xml per §7 (5 min). Add how-to-clean-a-yoga-mat, remove archived URLs, condition legal URLs on §10.

B8 — Verify build (15 min). `pnpm build` (or SSG equivalent), spot-check generated HTML for orphan Links, confirm `/sitemap.xml` matches §7 final list, confirm `/start-here`, `/gear`, `/sensei-picks`, etc. now 404 in dev.

Total: ~2.5 hours of focused work.

## Section 9 — What goes live after this migration

Final live URL surface (assuming §10 answers favor keeping legal pages and Marvin rewrites yoga-for-beginners body):

1. `/` — Honest 3-section homepage: hero, latest writing (2 items), about-the-author link.
2. `/about` — Editorial about page, single-author honest framing.
3. `/authors/marvin` — Author profile from content/authors/marvin.mdx.
4. `/guides/how-to-clean-a-yoga-mat` — Real 2,556-word C1 article.
5. `/guides/yoga-for-beginners` — IF body rewritten in B6; otherwise excluded.
6. `/poses/sun-salutation` — Real HowTo pose guide.
7. `/privacy` — Legal page (verify body in B1).
8. `/terms` — Legal page (verify body in B1).
9. `/affiliate-disclosure` — Legal page (verify body in B1).

Functional but unindexed / not in sitemap:

- `/confirm?token=…` — Newsletter confirm endpoint (no real signup yet, but harmless).
- `/go/<slug>` — Affiliate redirect (empty registry → 404; safe).
- `/authors/<slug>` for slugs other than marvin → notFound() → 404.
- `/guides/<slug>`, `/poses/<slug>` dynamic 404s for non-existent slugs.

**Total: 6 live URLs minimum (no legal pages, no yoga-for-beginners), up to 9 if all conditions met.** This is the entire public surface area at launch.

## Section 10 — Open questions for Marvin

Q1 — `/start-here` & `/mindful-journal`: Both are hardcoded CRO landings with no real product (no signup flow, no journal). Recommendation: STRIP-AND-ARCHIVE both. Confirm?

Q2 — `/poses/sun-salutation`: Does a single real pose justify keeping the dynamic `/poses/$slug` route live, or would you rather wait until you have 3-5 poses before exposing any? Recommendation: KEEP-LIVE — one real pose is still real, and there's no listing page promising more. Confirm?

Q3 — `/authors/$slug` as dynamic route while Marvin is the only author: keep dynamic (current) or collapse to a static `/authors/marvin` and remove the dynamic loader? Recommendation: KEEP dynamic — the loader is harmless, NotFound is correct for any other slug, and you'll likely add a second author within the year. Confirm?

Q4 — `/confirm`: Keep the route even though no live signup form points to it yet? Recommendation: KEEP — it's a functional endpoint, harmless without subscribers, ready when the Convex flow goes live. Confirm?

Q5 — `/privacy`, `/terms`, `/affiliate-disclosure`: Phase B1 will read each body. If the body is real legal copy → KEEP-LIVE. If the body is placeholder ("Lorem ipsum") → two options: (a) move to design-references until you write real copy, (b) keep live with placeholder. Recommendation: option (a) — running affiliate links without a real disclosure page is a compliance risk, and we should not run any `/go/$slug` redirects until `/affiliate-disclosure` is real. Confirm and please commit to writing real copy if any body is placeholder.

Q6 — `/go/$slug`: Keep live even though `affiliateLinks` registry is currently empty (so every slug 404s)? Recommendation: KEEP — the redirect infrastructure is correct, legal pattern is right (`rel="sponsored nofollow"` at emit site), and the empty registry just means no live affiliate slugs yet. Adding entries is later, additive work. Confirm?

Q7 — `content/guides/yoga-for-beginners.mdx` body is a ~20-word placeholder. Three options: (a) rewrite the body before launch (B6), (b) leave the route live with placeholder body and `noindex` it, (c) move the .mdx file to a `_drafts/` folder so the route 404s until ready. Recommendation: (a) if you can carve out 2-3 hours for the writeup, otherwise (c) — placeholder pillar text on a route that screams "yoga for beginners" is the highest claims-safety risk after the review fabrications. Choose.

Q8 — Newsletter "Subscribe" footer column (footer.tsx:108–124): remove entirely or keep with `mailto:` placeholder? Recommendation: remove until Convex signup ships. Confirm.

Once Marvin answers Q1–Q8, a follow-up subagent can execute Phase B1–B8 in a single commit.
