---
name: workflow-template-build
description: "Section-by-section build workflow for design templates — ask for hi-res before guessing, one section at a time, screenshot + approve before next, use project tokens not hardcoded hex"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ab9ceb43-2414-4ab6-9c22-e478565ee2d5
---

When building a new design template, follow this section-by-section workflow strictly. Skipping steps wastes Marvin's time and leads to frustration.

**Why:** During the 2026-05-19 marathon session (templates 1-4), I repeatedly burned cycles by: building from thumbnail-quality template previews, guessing at vague feedback, batching too many sections before showing screenshots, and 1:1 implementing spec code with hardcoded hex instead of project tokens. Marvin's frustration ("ik snap je af en toe echt niet", "tsjonge jonge", "je doet maar wat", "we gaan van mooie pagina's naar een AI fluff pagina") was directly caused by these shortcuts. The workflow below avoids that.

**How to apply:** For every new template build:

1. **Ask for hi-res template image first.** Thumbnails in `/public/images/design-templates/` are too small to see detail. If unclear what an element is, stop and ask — do not guess from a 250×400 thumbnail.

2. **One section at a time.** Build a section → screenshot at 1440 → show to Marvin → wait for "akkoord" → only then move to the next. Even when Marvin's prompt looks "complete", treat each section as a checkpoint.

3. **When feedback is vague, ask — don't guess.** If Marvin says "het ziet er niet uit" or "voelt niet consistent", do NOT cycle through changes hoping to land it. Stop and ask: "what specific element — title / spacing / colors / image positioning?" The AskUserQuestion tool with concrete options is faster than blind iteration.

4. **Component-based from line one.** Data file → small components in `src/features/<feature>/` → thin route file that only assembles. Never inline in the route. See [[feedback-component-based]].

5. **Project tokens, never hardcoded hex.** When Marvin (or any spec) provides code with `bg-[#3f4634]` etc., map to our tokens: `bg-[color:var(--color-olive)]`. Marvin explicitly chose this path 2026-05-19 — hardcoded hex makes pages feel "AI fluff" and breaks visual coherence with other pages.

6. **Hero photo pattern: fade baked into the image, not Tailwind gradient overlay.** All hero-photo-with-fade-left pages use `bg-cover bg-right` (or `bg-right-top` to preserve a subject's head) on an `absolute inset-0` div, pointed at a generated image where the fade-to-cream is rendered into the photo itself. Do NOT stack a Tailwind `bg-gradient-to-r from-bg ...` on top — that's dubbele fade and feels off. Marvin spotted this on /reviews and called it inconsistent with /guides.

7. **Breadcrumbs go INSIDE the hero, not as a separate strip above.** A separate breadcrumb section creates a visible gap between navbar and hero that Marvin dislikes. Render them as the first element of the hero content column.

8. **Sidebar cards: vertical-stack on narrow widths.** When a sidebar is ~320px wide (lg:col-span-3 or fixed 320px), do not put 2-col grids inside cards — they become unreadable on laptop viewports. Score, rating, stars, summary stat: stack vertically. Marvin caught this on the ScoreSummaryCard.

9. **Marvin's design vocabulary** (so you can recognize what he means faster):
   - "ingezoomd" → bg-cover is cropping the photo too aggressively because the section is too short relative to the image's natural aspect; fix with min-h, more padding, or bg-contain
   - "boxed" → an image is in a rounded container instead of full-bleeding to the viewport edge like the homepage / /guides hero photos
   - "AI fluff" → generic styling, hardcoded hex, lazy iconography (Trophy/Sparkles/Heart instead of project-consistent zen icons), the page doesn't feel premium
   - "consistent met andere pagina's" → same hero pattern, same typography, same token palette as homepage and /guides
   - "later finetunen" → ship the structure now, refine pixels later — don't perfectionize on the first pass

10. **Save image prompts when generating new assets.** Marvin generates the images himself in GPT Image; the prompt I write is the contract. Always include: aspect ratio, subject framing, fade direction if needed, project palette descriptors (warm wood, sage, cream, charcoal, oat), explicit negative prompt (no faces in left third, no logos, no flowers, no neon, no busy composition).

See [[feedback-component-based]] for the architecture rule, [[seo-eeat-roadmap]] for what is deliberately deferred during this phase.
