# Lessons Learned — Content Pipeline (theyogasensei)

A living document. Updated after every cluster or major iteration.
Lessons captured here become guardrails for the next post — they are the cheap version of mistakes you do not want to make twice.

When to update:
- After a review round surfaces a class of issue (not a one-off typo)
- After a publish flow exposes a missing step
- After a near-miss on a compliance / claims violation
- After an architectural decision that future content depends on

Format per lesson: short title, 1-2 sentence context, concrete action for next briefs.

---

## 1. Always run the brief through the project's Zod validator before promoting to brief-ready

**Context.** The C1 brief said `type: subpillar` + `schemaType: HowTo` in the frontmatter hints. The project's Zod schema only allows `HowTo` on `type: cluster`. Caught at write time, but it could have wasted a writing round.

**Action.** Brief writers should peek at `src/lib/mdx/frontmatter.ts` discriminated union before suggesting `type` / `schemaType` combos. Add a "frontmatter validator notes" subsection to every brief that lists the allowed combos and any cross-field invariants the validator enforces.

---

## 2. HowTo step[] content must match `totalTime` numerically

**Context.** C1 first draft had a 5-step daily wipe-down (~30 seconds total) under `totalTime: PT15M`. Google's rich result would have rendered a 15-minute HowTo that reads like a half-minute task. Reviewer caught the mismatch.

**Action.** When the brief gives multiple routines of different durations (e.g. daily/weekly/monthly), the brief must specify which routine becomes the canonical HowTo block. Default: pick the longest/richest routine for schema (better rich-result value), describe the shorter routines in body prose. Verify after writing: count steps × realistic duration vs `totalTime`.

---

## 3. HEAD-check every external URL before linking in body or "Further Reading"

**Context.** C1 originally linked to REI's specific yoga-mat-cleaning expert advice page. The URL was bot-blocked on curl HEAD check (could not verify 200 OK within 20s timeout). NYT Wirecutter URL was 301→200 OK and fine. The brief's brand-link fallback rule was correct in principle but easy to forget for non-product URLs.

**Action.** Every external href in a draft gets a `curl -sIL -A "Mozilla/5.0" <url> --max-time 15 | grep HTTP` check before commit. If dead or bot-blocked → fallback to homepage with descriptive sentence ("REI Expert Advice publishes a short, well-sourced primer in their how-to library"), do not silently keep the dead URL.

---

## 4. Never write first-person practice claims without explicit user confirmation

**Context.** C1 first draft had "Skipping this step is one of the most common mistakes I see — and it leaves a film that kills your grip" in the Castile soap section. The brief permitted "1-2 genuine personal notes where applicable", but the writer (Hermes) cannot know what the author has actually experienced. Caught at review; rewritten impersonally.

**Action.** Default to impersonal phrasing in drafts ("Skipping this step is a common mistake — Castile residue leaves a film that kills grip"). Mark explicit `<!-- MARVIN: insert personal note here if you've actually done this -->` placeholders where the brief invites personal anecdote. First-person fabrication is the easiest E-E-A-T violation to ship by accident.

---

## 5. Forward links to unpublished posts: plain text only

**Context.** C1 first draft had `[our complete yoga mat buying guide](/guides/yoga-mat-buying-guide) (publishing soon)`. The link would 404 on launch day because P1 publishes after C1 in the cluster schedule. Caught at review; href stripped, text kept.

**Action.** Any internal link to a not-yet-published target → plain text, no `<a href>`. The hyperlink gets added via a post-publish update once the target ships. The brief's "live vs forward links" split is correct; enforce it at write time, not at review time.

---

## 6. Brand-care advice cites publicly verifiable warranty/policy, not specific lifespan numbers

**Context.** First draft said "A well-treated Manduka PRO realistically gives you ten years." The 10-year specific number was not verifiable. Manduka's lifetime guarantee on the PRO is publicly verifiable on their warranty page. Reframed at review to use the warranty as the anchor with a "see their warranty terms for current conditions" disclaimer.

**Action.** When citing brand product longevity or care, anchor to publicly verifiable warranty/policy language (with a "current conditions" disclaimer) rather than a specific year/month number. Acceptable: "lifetime guarantee under proper care". Not acceptable: "lasts about 10 years".

---

## 7. YAML schema content and body prose for the same routine must share frame and key terms

**Context.** C1's YAML HowTo step[] used "mix soap solution → wipe top → wipe back → rinse → dry". The body prose for the monthly deep clean opened with "This is where you go gentler with closed-cell mats and more carefully with open-cell ones" — different framing entirely. A user who sees the rich result and clicks through should recognise the same structure.

**Action.** When the YAML step[] mirrors a body section, open that body section with a one-line summary echoing the step sequence. The prose can then elaborate per-material specifics. Cheap consistency, big trust impact.

---

## 8. Scaffolding code can hide claims violations — investigate every TS error individually

**Context.** During the technical pre-flight audit, a TS error pointed to `TRUST_STATS` being undefined. Investigating the surrounding code surfaced hardcoded scaffolding claims ("21 mats tested", "Hands-on testing", "We tested 21 yoga mats") in UI components and route meta — all of which violated the anti-hallucination policy. Auto-cleanup would have buried these behind a green build.

**Action.** For every pre-existing TS error in scaffolding code: report surrounding code + intent + recommendation, wait for per-error decision. When ONE fabricated claim is found, sweep the project with `grep -rE "we tested|sweat[- ]?tested|\d+ mats tested|\d+/5 stars?"` to catch sibling violations before committing. Scaffolding violations get fixed in the same compliance commit; authored MDX violations get surfaced to the user for a decision.

---

## 9. Tracking files must be updated in the same commit (or immediate follow-up) as content changes

**Context.** Marvin explicitly flagged that consistent bookkeeping matters to him. After C1's first draft commit, three tracking files needed sync: `used-keywords.md` (append row), `_yoga-mat-cluster-plan.md` (C1 status: brief-ready → draft), `seed-how-to-clean-a-yoga-mat.md` (checkbox tick). Initially only the keywords ledger was updated in the draft commit; the other two needed a follow-up.

**Action.** After any content commit (draft / patch / publish), check the full tracking stack:
- `used-keywords.md` — row exists and is current?
- `_<cluster>-cluster-plan.md` — post status reflects reality (brief-todo / brief-ready / draft / published)?
- `seed-<slug>.md` — Status checklist boxes ticked, with commit refs?
- `public/sitemap.xml` — regenerated only on publish (not on draft); explicit note in commit if skipped
Update what's stale in the same commit if possible, in an immediate `chore(tracking): sync` commit otherwise. Report all touched tracking files in the end-of-task report.

---

## 10. Reviewer-loop discipline: execute fixes, don't re-paste files

**Context.** After a review round listing 5-8 specific patches, the instinct is to re-paste the file in chat to "confirm what was read". This wastes the reviewer's context window and stalls the loop.

**Action.** When the reviewer gives a fix list and says "go": patch the file, run validator gates, commit, report the diff. The reviewer already read the file. Only re-paste content when the reviewer explicitly asks "show me X" or "plak Y".

---

## 11. Audit the webapp's routing state BEFORE planning content launch

**Context.** C1 was content-ready (schemas perfect, anti-hallucination clean, validation green), but the pre-publish render check surfaced that `src/routes/guides/$slug.tsx` was a hardcoded "Morning Yoga Routine" design template — the route loaded frontmatter correctly so JSON-LD rendered fine, but the component body never called `loadContent()`. Publishing C1 would have shipped the wrong body to Google. A full audit then found 6 dynamic-needs-wiring routes, 5 design-template-only files, and 1 phantom dynamic route all sitting live in `src/routes/`.

**Action.** Before planning any content launch on a TanStack-Start-style file-routed app, run a route audit: classify every file in `src/routes/` as ESSENTIAL / DYNAMIC-NEEDS-WIRING / DESIGN-TEMPLATE-ONLY / DELETE. Reference implementations (routes that already call `loadContent()` correctly) are your model for fixing the broken ones. Move design-only templates OUT of the file-route directory to a location like `src/design-system/templates/` so TanStack does not pick them up. Mark dead-data listing routes `noindex` until they iterate real MDX. Cluster launch order: (1) webapp routing clean, (2) MDX render pipeline verified on real content, (3) only then content publish.

**Reference**: `_launch-readiness-route-audit.md` shows the format for a 26-route inventory + per-route classification + 5-phase migration plan.

---

## 12. Visual review surfaces sitewide claims that code review misses

**Context.** Marvin's visual review of the C1 page (commit 712719d render) caught a footer claim ("Instructional content is reviewed by certified yoga teachers") that was not in C1's code — it lived in `footer.tsx`. The sibling-violation sweep then found 4 more hits in `authors.ts` (Person schema bio), `marvin.mdx` (author MDX), and `index.tsx` (homepage meta description, twice). All sitewide, none visible during the C1 code review.

**Action.** After every render-check, scan the **sitewide layer** explicitly:
- `src/components/site/footer.tsx` + `header.tsx`
- `src/lib/content/authors.ts` (Person schema feeds every JSON-LD)
- `src/routes/index.tsx` `<head>` meta + og:description
- Every author MDX in `content/authors/`

Plus the standard sibling sweep: `grep -rnE "we tested|certified yoga teacher|reviewed by certified|\d+ mats tested" src/ content/ | grep -v design-references`.

---

## 13. Inbound link cascade matters more than "the page exists"

**Context.** In Phase A I kept `/reviews/best-yoga-mats.tsx` and `/reviews/manduka-pro.tsx` live because they had 7+ and 3+ inbound links from CRO pages. Marvin pushed back: "inbound links to fake pages are also fake — strip the link rather than keep the fake page alive to support it." Phase B archived both pages AND archived the CRO pages they were linked from (gear/index, sensei-picks, start-here, search). End result: no links left to strip, no fake pages left to support.

**Action.** When auditing for launch readiness, classify pages by **content honesty**, not by **how many other pages link to them**. If a page makes claims it cannot back up, archive it. Then sweep the inbound links separately — most will be in pages that are also archived for the same reason. The few that aren't get stripped in the same commit.

The clean-slate principle: every live URL serves real content or is a functional endpoint. Period.

---

## 14. Convex CLI `init` modifies AGENTS.md / CLAUDE.md and `convex/tsconfig.json`

**Context.** `npx convex dev` (first run) appended Convex AI pointers to AGENTS.md and CLAUDE.md, created `convex/_generated/ai/guidelines.md`, installed Convex skills into `.claude/skills/`, and created `convex/tsconfig.json` WITHOUT `"types": ["node"]` — which broke `process.env` references in `convex/email.ts` (TS2591 "Cannot find name 'process'").

**Action.** After running `npx convex dev` for the first time on a project that already uses `process.env` in Convex functions:
- Verify AGENTS.md/CLAUDE.md appends are non-destructive (Convex CLI is well-behaved — only appends with `<!-- convex-ai-start -->` / `<!-- convex-ai-end -->` markers)
- Open `convex/tsconfig.json` and confirm `"types": ["node"]` is in the `compilerOptions` (or add it). `@types/node` is usually already in `package.json`.
- Run `pnpm typecheck` from project root AND `npx tsc --noEmit` from inside `convex/` to confirm both check passes.

---

## 15. Budget foam mats (NBR/PVC) carry a California Prop 65 warning — check the label before drafting

**Context.** The first draft of the Retrospec Solana review framed NBR foam benignly ("latex-free + phthalate-free = a safe pick"). The SERP/PAA pass then surfaced that both the ½" and 1" Solana ship with a Prop 65 warning for **acrylonitrile** ("known to the State of California to cause cancer"), verified across multiple independent sources and consistent with NBR chemistry (NBR = acrylonitrile-butadiene rubber). Shipping the rosy framing would have been a real E-E-A-T/trust miss on a health-adjacent purchase. The official Retrospec page hid the warning in dynamic/below-fold content, so a static page-fetch alone missed it.

**Action.** For ANY budget foam or PVC mat review (NBR, TPE-foam, PVC), before writing the material section:
- Search "<product> Proposition 65 warning" and check the Amazon listing + advocacy sources (Mamavation, htsyoga Prop 65 guides), not just the brand's own static page.
- If a warning exists, disclose it verbatim in a `Callout`, add a dedicated "is it toxic / Prop 65" FAQ, and link the official [p65warnings.ca.gov](https://www.p65warnings.ca.gov/) for context.
- YMYL-cautious framing only: disclose + contextualise (broad CA labeling law, not proof of harm in normal use) + offer the natural-rubber/cork/TPE alternative. No medical claims in either direction — neither "this is dangerous" nor "this is totally safe."
- Don't assert "phthalate-free / non-toxic" as fact unless the brand states it AND it isn't contradicted by a Prop 65 label.

---

## Cluster-level retrospective slot

After each cluster completes (all spokes + pillar published), append a short retrospective here:

- What broke that this list could have prevented?
- What new lesson should be added?
- What lesson became obsolete or wrong?

The list grows by addition, not edit-in-place — old lessons stay so the pattern of mistakes is visible over time.
