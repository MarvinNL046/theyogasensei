# Starter prompt — visual pass on existing /guides pages (2026-05-30)

Paste the block below to start tomorrow's session.

---

We're done writing launch content for now — the 9 mat-cluster pages under /guides are enough to launch with. Today I want to **visually upgrade the existing /guides pages**: right now they're almost all text + a few tables and they're missing visuals.

Three things I want to tackle:

1. **Images we can make with Higgsfield** — beyond the hero, where do decorative/illustrative images belong in the body of each guide? (Same honest rules: gpt_image_2 decorative = no person / no logo; Aiko Soul only where a consistent persona fits; anatomy-clean; on-brand.)
2. **Diagrams** — informational diagrams (mat thickness comparison, material/layer cross-section, grip-vs-sweat, "anatomy of a mat", cork-vs-rubber at a glance, etc.). Some of these already exist as patterns in the design templates.
3. **Review the design templates and decide the approach** — everything currently lives under /guides. Look at what the 17 design templates intended visually and how we retrofit the live pages.

**Don't build yet — plan first (per CLAUDE.md "define before build").** I want, in this order:

1. **Read first:** CLAUDE.md, AGENTS.md (design direction), the design templates in `public/images/design-templates`, the reference components/routes in `src/design-references/`, and the current MDX in `content/guides/*.mdx`. Memory has context: `visual-pass-plan`, `design-system-decisions`, `templates-build-progress`, `workflow-template-build`, `aiko-soul-id`.
2. **Audit:** for each guide page-type (pillar/concept, roundup, versus, how-to, brand-review), list the current visual gap — what's text/table-only that wants a visual.
3. **Inventory primitives:** what visual components + diagram patterns already exist in `src/design-references/` and the templates that we can reuse (don't reinvent).
4. **Propose a per-page-type visual spec:** for each type, what gets a Higgs image vs an informational diagram, and where it sits. Distinguish decorative (Higgs photo) from informational (component/SVG diagram).
5. **Phased execution plan:** one page (or section) per pass, screenshot + my approval before the next — same rhythm as the template build.

**Guardrails:** the approved design is locked — don't make it louder/SaaS-ier; keep diffs small; don't touch unrelated layout; images need width/height (CLS-safe). With ultracode on, use a workflow to fan out the audit/inventory across page-types, then we plan from the synthesis.

Start with step 1 (read) and step 2 (audit), then show me the gap map before proposing the spec.
