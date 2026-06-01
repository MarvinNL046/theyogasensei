---
name: visual-pass-plan
description: "Next-session plan — retrofit existing /guides pages with visuals (Higgs images, diagrams, design-template review)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 247b1b40-280e-45f0-8514-9c9d3c6ff24d
---

Planned for the session of **2026-05-30**: the launch content is enough (9 mat-cluster pages live), so the focus shifts from writing new pages to **visually upgrading the existing `/guides/*` pages**, which are currently almost all text + a few tables and lack visuals.

Three workstreams Marvin named:
1. **Higgsfield images** — decorative/illustrative imagery beyond the hero (in-body section images, dividers). Reuse the established flow: `gpt_image_2`, no person / no logo for decorative; Aiko Soul (`--soul-id`, see [[aiko-soul-id]]) only where a consistent persona is wanted. Anatomy-clean, on-brand (warm cream/olive/clay, Japanese minimalism).
2. **Diagrams** — informational diagrams (e.g., mat thickness comparison, material/layer cross-sections, grip-vs-sweat, "anatomy of a mat") that also appear in the existing design templates. These are component/SVG diagrams, not photos.
3. **Design-template review + retrofit plan** — all content currently lives under `/guides`; review what the 17 design templates intended visually and decide how to retrofit. Source of truth for visuals: `public/images/design-templates` (see [[design-system-decisions]], [[templates-build-progress]]); reusable reference components/routes in `src/design-references/`.

**Approach (plan before build, per CLAUDE.md):** audit each `/guides` page-type for its visual gap → inventory the available visual primitives in `src/design-references/` + what the templates show → write a per-page-type visual spec (what image vs what diagram, placement) → get Marvin's approval → execute page-by-page (one page/section per pass, screenshot + approve before next, per [[workflow-template-build]] and [[feedback-pace]]).

**Guardrails:** protect the approved/locked design (no louder/SaaS-ier styling); keep diffs small; don't change unrelated layout; CLS-safe (width/height on images). Ultracode is session-scoped — re-enable if wanted.

Starter prompt is in `content-briefs/_tomorrow-visual-pass.md`.

---

## Progress — photo round done (session 2026-05-30)

**Infrastructure built:**
- `src/components/ui/figure.tsx` — `<Figure id alt caption variant priority>` = `Image` + `<figcaption>` in a `<figure>`, `not-prose my-8`, rounded-xl border, muted stone-500 caption. CLS-safe (w/h from Image). Import in MDX: `import { Figure } from '#/components/ui/figure'`.
- New `inline` image variant (1280×854, 3:2) in `src/lib/images/variants.ts` — the in-body editorial figure size. Decorative Higgs photos are converted to webp at exactly this size via `sharp` and dropped at `public/images/guides/<slug>/<name>.webp` (the `guides/` local fallback path).

**Decorative photos placed (9/10 guides, 11 figures):** all `gpt_image_2`, no person/no logo, warm cream/olive/clay Japanese-minimalist, each with a `prompts/<name>.md` doc.
- pillar `how-to-choose`: materials (opener) + texture (Material §) + **aiko-practice** (Closing note — the one Aiko Soul shot; came back seated meditation not standing, used as persona/consistency beat, byline stays Marvin)
- `how-to-store`: storage · `how-to-clean`: cleaning-kit
- roundups (placed before the 2nd H2, NOT before the answer-first Quick-Picks): hot-yoga, eco-materials, cushion-knees, mat-lineup
- versus `cork-vs-rubber`: two-mats-side-by-side · brand `lululemon`: mat-construction closeup
- `how-thick` deliberately left photo-less (already has a table; its real need is the thickness diagram).

**Diagram round — DONE (same session, shipped):** built `src/components/diagrams/`
with a shared `DiagramFrame` + three illustrative SVG diagrams: `GripMoistureCurve`
(cork-vs-rubber + hot-yoga), `MatThicknessScale` (how-thick), `CushionStabilitySpectrum`
(bad-knees). Honesty rules: direction + the page's own values only, no fabricated
precision, every one tagged "Illustrative"; project tokens only (NO gradients/hex),
CLS-safe, mobile-legible. Hardened via a 4-dimension adversarial review workflow
(brand/accuracy/a11y/code). **Eco-scorecard deliberately SKIPPED** — bar scores would
imply fake precision; the eco page already has a material table + photo. Porting the
reference `ComparisonTable`/`ScoreSummaryCard` to live is still open if wanted later.

**Gotchas:** Higgs **soul queue was very slow** this day (~45 min vs ~2 min normal) while `gpt_image_2` stayed ~2 min — generate decorative photos freely, but don't block on Soul. `generate wait` flag is `--timeout` not `--wait-timeout`. Each `pnpm build` regenerates `public/sitemap.xml` — `git checkout` it to keep diffs clean. Work left **uncommitted** for Marvin's review.
