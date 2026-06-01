---
name: design-system-decisions
description: "Source-of-truth resolution between CLAUDE.md and AGENTS.md on visual design — palette, fonts, layout primitives, and what counts as \"the accent\""
metadata: 
  node_type: memory
  type: project
  originSessionId: ada7cc16-2010-43de-8098-d4d4179fb88b
---

The design system in `src/styles.css` reconciles CLAUDE.md ("one accent: terracotta OR sage") with AGENTS.md ("olive primary + clay secondary") by treating **olive as a dark neutral surface** (footer, feature blocks) and **warm clay as the only accent** (links, accent buttons, eyebrow text, hover states).

The visual reference is `/public/images/design-templates/` — the user said explicitly "we gaan het design volgens de afbeeldingen die ik heb toegevoegd aan de design templates, alles wat er nu staat zal worden vervangen". When in doubt, look at those PNGs first.

**Why:** Without this reconciliation, future sessions could re-introduce a second accent (e.g. terracotta AND sage simultaneously), break the "one accent" rule, and lose the calm editorial feel.

**How to apply:** When adding a new component or color usage:
- Backgrounds: `--color-bg` (warm cream) or `--color-surface` (warm white) or `--color-surface-muted` (recessed)
- Dark surfaces: `--color-olive` (footer, feature bands) — NOT an accent, treat as a neutral dark
- Text: `--color-ink` / `--color-ink-soft` / `--color-ink-muted`
- The single accent: `--color-accent` (warm clay) — use sparingly for highlights, links, hover. `--color-accent-soft` for tinted backgrounds, `--color-accent-deep` for hover/active states
- Fonts: Cormorant Garamond (serif, headings) + Inter (sans, body) via @fontsource

Primitives live at `src/components/ui/`: `Container`, `Section`, `Eyebrow`, `JapaneseAccent`. Use them — don't reinvent `mx-auto max-w-* px-*` inline.

The `JapaneseAccent` component locks the allowed kanji set to three verified phrases (`sensei`, `persistence`, `practice`) per AGENTS.md §9. Never add new phrases without verification.

Routes: nav uses existing `/poses /guides /gear /about /start-here`. The brand pages `/sensei-picks` and `/mindful-journal` are aspirational — to be created in a later session. See [[content-tracking]] for cluster status.
