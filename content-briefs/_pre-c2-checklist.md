# Pre-C2 Launch Checklist

Date created: 2026-05-25
Status: blocking — items here MUST be resolved before C2 (first commercial-intent post + first live affiliate links) publishes.

Phase B (minimal launch cleanup, commit `61d8523`) archived `/privacy`, `/terms`, and `/affiliate-disclosure` because:

- C1 ships with **zero affiliate links** (deliberate, per cluster plan)
- No live newsletter signup form exists yet (Convex flow pending)
- No `/go/$slug` redirects currently published

This means we have **no acute FTC/GDPR compliance trigger** for C1 launch. But as soon as we add affiliate links (C2 onwards) or expose a live newsletter signup, the legal pages must be back on-site with real copy.

## Blocking items before C2

### 1. Write real legal copy

- [ ] `/privacy` — Privacy Policy that actually describes:
  - What data the site collects (analytics via Vercel, newsletter via Convex+Resend, affiliate cookies via Amazon Associates and any other programs)
  - Marvin's NL location + EU GDPR applicability
  - US visitors and any relevant US state-level requirements
  - Contact for data requests: `marvin@theyogasensei.com`
- [ ] `/terms` — Terms of Use covering site usage, affiliate relationship, no-warranty, governing law
- [ ] `/affiliate-disclosure` — FTC-compliant disclosure for Amazon Associates + any other affiliate programs Marvin joins

### 2. Restore routes from archive

- [ ] `git mv src/design-references/routes/privacy.tsx src/routes/privacy.tsx`
- [ ] `git mv src/design-references/routes/terms.tsx src/routes/terms.tsx`
- [ ] `git mv src/design-references/routes/affiliate-disclosure.tsx src/routes/affiliate-disclosure.tsx`
- [ ] Verify routeTree regenerates correctly (pnpm dev → check src/routeTree.gen.ts)

### 3. Re-link from live pages

- [ ] Footer: add legal row back (Privacy / Terms / Affiliate disclosure)
- [ ] About page: restore the "See affiliate disclosure" CTA (currently rewritten to `mailto:`)
- [ ] Confirm route: ensure no further repointing needed

### 4. Update sitemap

- [ ] Add to `src/lib/seo/sitemap.ts` STATIC_PAGES: `/privacy`, `/terms`, `/affiliate-disclosure`
- [ ] Run `pnpm generate-sitemap` and verify the 3 URLs land in `public/sitemap.xml`

### 5. Affiliate link infrastructure check

Before publishing the first `/go/$slug` redirect:

- [ ] `src/content/affiliate-links.ts` registry contains the slug
- [ ] Inline emit site uses `rel="sponsored nofollow noopener"` and `target="_blank"`
- [ ] Affiliate disclosure is visible **above the fold** on every page that links to `/go/$slug`
- [ ] Click tracking is implemented (Convex `clicks` table or Vercel custom event)

### 6. Newsletter signup (when Convex flow goes live)

If you also bring a newsletter signup back at the same time as C2:

- [ ] Restore newsletter widget in C1 sidebar (or wherever signup will live)
- [ ] Restore footer "Mindful inbox" column OR add inline signup blocks where it makes sense
- [ ] Test full double-opt-in flow via `/confirm` route
- [ ] GDPR consent checkbox on the signup form (required for EU visitors)

### 7. Re-run claims-safety sweep

Even after legal pages return, double-check before C2 publishes:

```sh
grep -rnE "we tested|sweat[- ]?tested|hands[- ]?on test|\\d+ mats tested|certified yoga teacher|reviewed by certified|by a certified|by an? RYT" src/ content/ | grep -v "design-references\\|node_modules"
```

Expected: zero hits except the legitimate "NOT a certified instructor" framing.

## Non-blocking but recommended

- [ ] Build a `listFrontmatter(collection)` helper in `src/lib/mdx/loader.ts` so the archived listing routes (`/guides`, `/poses`, `/styles`, `/gear`) can come back with real MDX iteration
- [ ] When second guide ships, refresh homepage "Latest writing" section
- [ ] When `/poses/$slug` has 3-5 entries, build a real `/poses` index

## Why this exists

The audit pattern from Phase A and Phase B uncovered claims-safety violations hiding in scaffolding code, sitewide meta descriptions, footer copy, and author bios. Every time we found one, we found 3-5 more in the sibling sweep. The discipline this checklist enforces:

- Don't bring legal pages back live until the bodies are real
- Don't ship affiliate links until the disclosure flow is intact
- Don't expose newsletter signup until the backend works end-to-end
- Run the sweep before each milestone, not after

When this checklist is empty, C2 is unblocked.
