# Higgsfield — account model & commercial licensing

Quick reference so any machine / future session knows the account setup without
re-checking. Verified 2026-06-01.

## Account is per-account, not per-project

One Higgsfield account (`marvinsmit1988@gmail.com`, **Plus plan**) is reusable
across any number of websites / niches. No second subscription is needed to start
another niche site.

- CLI: `~/.local/bin/higgsfield.exe` (alias `hf`) — installed globally, works in
  any project directory.
- Skills: `~/.claude/skills/` (`higgsfield-generate`, `-soul-id`,
  `-product-photoshoot`, `-marketplace-cards`) — global.
- The trained **Aiko Soul** (`cd51dd12-40a3-40a1-ba68-065ee2d38e41`) lives on the
  account, callable from any project via `--soul-id`. Aiko is yoga-specific —
  train a fresh Soul for a different niche/persona.

## Commercial use IS covered

Per the official **Terms of Use Agreement §4.4**:

> "The Company does not claim ownership of any of your Inputs or Outputs, and nor
> does it restrict the use of Outputs for commercial use."

This is account/output-level, **not** tier-gated — the Plus plan is fine for
affiliate sites, marketing, e-commerce, etc. The commercial right is in the Terms,
not in the pricing tiers.

## Content limits that still apply (Terms §5.1 & §5.3)

- No infringing real people, brand logos, protected characters, or existing art.
- No deepfake / impersonation (no making a real person appear to say/do things).
- No prohibited content (nudity, violence, hate, etc.).
- You may sell the generated **content**, but not resell access to the platform.

## Shared-across-sites caveats

1. **Credits are one pool.** Two busy sites draw from the same Plus bundle — you
   run out faster, not blocked. Upgrade the plan for more volume; never a second
   account. (Balance ~790 credits on 2026-06-01.)
2. Exact Plus credit limits not re-verified here (live pricing page wouldn't
   fetch); only the balance was read via `higgsfield account status`. The
   commercial _right_ is confirmed from the Terms regardless.

Source: <https://higgsfield.ai/terms-of-use-agreement> (§4.4, §5.1, §5.3)
