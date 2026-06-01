---
name: japanese-typography
description: "Canonical 6-phrase verified Japanese accent set + Noto Serif JP font + usage philosophy (recurring brand-mark, not decoration)"
metadata: 
  node_type: memory
  type: project
  originSessionId: ada7cc16-2010-43de-8098-d4d4179fb88b
---

Japanese typography is a **recurring premium branding detail**, not decoration. Marvin's explicit framing: "luxe branding detail, niet 'kijk ik heb Japanse tekst'". The same verified-phrase set repeated consistently across hero edges, footer, feature bands, etc. is what builds recognisable brand identity — not random kanji per section.

**Why:** Repetition of the same handful of phrases (especially `継続は力なり`) does for the brand what a recurring mascot does for other publishers — it makes the site memorable instead of generic. Random or one-off kanji destroys this effect and reads as AI decoration.

**How to apply:**
- Render Japanese ONLY via `<JapaneseAccent phrase="..." />` from `src/components/ui/japanese-accent.tsx`. Never write `<span lang="ja">` with raw Japanese inline — the component enforces font (Noto Serif JP), spacing (0.2em tracking), opacity (~0.7–0.85), and the verified-phrase guarantee.
- The 6 verified phrases are documented in AGENTS.md §9 (canonical table with romaji + meaning + intended-usage per phrase). When in doubt, use `persistence` (`継続は力なり` — "consistency is strength") — that's the recurring brand-mark.
- Phrase-to-context mapping: practice pages → `practice`, meditation → `presence`, long-form reading → `stillness`, routines → `habits`, logo/wordmark → `sensei`, everything else → `persistence`.
- Font is loaded via `@fontsource/noto-serif-jp` (400 + 500 weights) in `src/styles.css`. Never swap to brush/decorative Japanese fonts — only Noto Serif JP, Zen Old Mincho, or Shippori Mincho are acceptable.
- Sizing: default `sm` (text-[11px]), `md` for hero floating accents, `lg` for centred decorative panels.
- Tone: `default` (accent on light), `onDark` (accent-soft on olive), `soft` (ink-muted, for very subtle whisper accents).

Adding a 7th phrase requires Marvin to verify the kanji and approve usage context — never extend the set unilaterally. See [[design-system-decisions]] for broader palette/typography reconciliation.
