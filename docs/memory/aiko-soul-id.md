---
name: aiko-soul-id
description: Higgsfield Soul Character ref for Aiko — reuse this soul-id for face-consistent Aiko image generation
metadata: 
  node_type: memory
  type: project
  originSessionId: 247b1b40-280e-45f0-8514-9c9d3c6ff24d
---

The Aiko persona now has a trained Higgsfield **Soul 2.0 Character** for
face-consistent generation (trained 2026-05-28, status: completed, validated).

**Soul ref id:** `cd51dd12-40a3-40a1-ba68-065ee2d38e41` (name `aiko`, type `soul_2`)

**How to use** — pass to higgsfield-generate for face-faithful Aiko stills/video:
```
higgsfield generate create text2image_soul_v2 --soul-id cd51dd12-40a3-40a1-ba68-065ee2d38e41 --prompt "..." --quality 2k --aspect_ratio 3:4 --wait
```
text2image_soul_v2 allowed aspect_ratio: 1:1,16:9,9:16,4:3,3:4,3:2,2:3 (NOT 4:5).
Use `soul_cinematic` for cinematic/video. Always still ground prompts in the
brand world from [[Aiko-Persona]] (charcoal/olive set, Japanese studio, sage mat,
warm morning light, calm expression).

**Why:** Aiko-Persona.txt deliberately avoided face-reliance because AI face
consistency was unreliable. A trained Soul fixes that — Marvin chose to make
Aiko's face a consistent brand asset. The Soul generalises to new poses/scenes,
not just the training shots (validated with an unseen meditation scene).

**Training data:** 12 curated portraits (front/3-4/profile/look-down, charcoal +
dark olive, varied warm light) generated with Nano Banana Pro (`nano_banana_2`)
off the anchor image `public/images/aiko-persona/aiko-cobra-pose-warm-yoga-studio.png`.
Working files live OUTSIDE the repo at `~/.aiko-soul-test/` (anchor, set/, validate.png).
Not yet copied into the repo — ask Marvin if the portraits should become
canonical refs under `public/images/aiko-persona/`.

**Higgsfield CLI:** `~/.local/bin/higgsfield.exe` (+ `hf.exe`), v0.1.40, authed as
marvinsmit1988@gmail.com (plus plan). Windows install was manual (the official
`curl|sh` only supports darwin/linux) — binary pulled from GitHub releases.
Skills installed globally in `~/.claude/skills/` (higgsfield-generate, -soul-id,
-product-photoshoot, -marketplace-cards). NOTE: the CLI has no folder/collection
command — asset folders are web-UI only.
