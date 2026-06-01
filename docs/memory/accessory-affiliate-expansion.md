---
name: accessory-affiliate-expansion
description: "Verified accessory ASINs + keyword data for the next monetization expansion beyond mats — data saved, NO content built yet (Marvin's explicit hold)"
metadata: 
  node_type: memory
  type: project
  originSessionId: ab4f04a5-6355-4c1c-b26f-d60bb1600495
---

**Saved 2026-05-30. Marvin said: store the data, do NOT build content yet.**

Affiliate expansion beyond the mats cluster into 5 accessory categories. ASINs
verified on Amazon.com by a parallel browser-Claude session; the chosen mains are
already in `src/lib/affiliate-links.ts` (inert — they only monetize once a
guide/`AffiliateButton` references the slug; nothing references them yet).

**In the registry now (chosen mains):**
| slug | product | ASIN |
|---|---|---|
| `manduka-yoga-block` | Manduka Yoga Block (foam) | B000VUAGAS |
| `gaiam-cork-yoga-block` | Gaiam Cork Yoga Block 4×6×9" | B008R71FI4 |
| `manduka-align-strap` | Manduka Align Yoga Strap | B01ABWKUXI |
| `manduka-breathe-easy-carrier` | Manduka Breathe Easy Carrier | B077BJ8315 |
| `hugger-mugger-bolster` | Hugger Mugger Standard Bolster | B000C9LZRQ |

**Alternatives (for an easy 1-line swap if wanted later):**
Gaiam Yoga Block (foam) B075W63K67 · Gaiam Yoga Strap (D-ring) B0964G5H4Q ·
Gaiam Cargo Mat Bag B011NQZBAI · Gaiam Yoga Bolster B01ICBTPTK.
Bolster note: there is NO Manduka bolster — Marvin picked Hugger Mugger (category
standard, most reviews) over the Gaiam alt.

**Keyword data (US, Ahrefs — head terms, mostly low KD):** yoga blocks 11K KD4 ·
yoga bolster 5.8K KD6 (highest CPS 1.12) · yoga towel 3.9K KD3 · yoga strap 3.8K
KD3 · yoga mat bag 3.3K KD3 · yoga wheel 3.2K **KD0** · yoga mat carrier 1.3K KD1 ·
cork yoga block 350 KD3 · yoga knee pad 150 **KD0**.

**KD nuance to respect:** the low-KD numbers above are HEAD/informational terms.
The affiliate money is in the COMMERCIAL "best yoga X" long-tail, which is harder
(`keywords.csv` has "best yoga blocks" at KD **48**, vol 12.1K). Target commercial
intent for revenue, not the easy head terms.

**Already in the content backlog (`keywords.csv`):** `best yoga blocks` (subpillar
gear/blocks, **briefed** → `content-briefs/2026-05-24-best-yoga-blocks.md`),
`best yoga bolster`, `how to tie yoga mat strap`, `best thick yoga mat`,
`yoga nidra for sleep` (affiliate fit for bolsters). These slot under the
**`yoga-for-beginners` pillar** (NOT live yet — current site is all the mats
cluster), so accessories = broadening the architecture, see [[homepage-progress]].

**When Marvin greenlights content:** (1) generate "best yoga blocks" from the
intel below via `generate-page`; (2) add cross-sell `AffiliateButton`s
(strap/bag/towel) to existing mat guides; (3) the gate is open + tag works
([[affiliate-gate-launch]]) so verify each new `/go/<slug>` 302s after deploy.
Already-live accessory slugs on the mats guides: yogitoes, eQua towel, mat-wash.
(The old keywords.csv brief `content-briefs/2026-05-24-best-yoga-blocks.md` is
ARCHIVED under `_archive/test-runs/` — use the fresh intel below instead.)

---

## Category 1 — YOGA BLOCKS: SERP + page intel (browser-CC deep-dive 2026-05-30)

**Target the head term `yoga blocks`** (11K US / 27K global, **KD 4 ≈ ~5 RDs for
top 10**, TP 2.6K) — easier + bigger than the commercial "best yoga blocks" (KD 48
in keywords.csv). One well-built review page can cover the whole cluster:
foam yoga blocks (1.3K), cork yoga blocks (1.0K), best yoga blocks (700), yoga foam
blocks (450) + informational long-tail: yoga block exercises (900), how to use yoga
blocks (350), what are yoga blocks for (300), where to buy (70, buy-intent).

**Why it's winnable — the SERP is content-weak:** only ONE real editorial review in
the top 10 (#6 OutdoorGearLab, ~9K words, DR74, but a generic non-yoga gear site).
#2 Manduka + #3 Yolohayoga are thin SHOP collection pages (323 / 2.4K words) ranking
on DR, not content; Yolohayoga has only 6 RDs. Rest = Amazon, shopping pack, forums.
A yoga-specialist dedicated review slots in perfectly.

**Winning structure (from OutdoorGearLab's blueprint, no need to match 9K words):**
per-category awards (Best Overall / Best Foam / Best Cork / Best Budget) + comparison
table + a **"foam vs cork"** section (captures foam 1.3K + cork 1.0K) + an
informational **"what are yoga blocks for / how to use"** section (captures the
350+300 long-tail). Decision factors Google expects: stability, slip-resistance,
comfort, durability.

**ASINs already in registry:** Manduka Block `manduka-yoga-block` (B000VUAGAS),
Gaiam Foam `B075W63K67` (NOT yet in registry — would be the foam pick), Gaiam Cork
`gaiam-cork-yoga-block` (B008R71FI4). NB: if we want the Gaiam foam block as a
separate pick, add `gaiam-yoga-block` B075W63K67 to the registry.

**Strategic decision (confirmed):** make a DEDICATED `/guides/best-yoga-blocks` page,
NOT a section bolted onto a mat guide — the SERP rewards dedicated yoga-block pages.

## Categories 2–4 — SERP + page intel (browser-CC 2026-05-30)

**YOGA BOLSTER — priority 2 (best monetization).** 5.8K US / 22K global, **KD 6
(~7 RDs)**, TP 2.0K, highest CPS (1.12). **Relevant for NL (800) + DE (4.3K)** —
Marvin's home markets. Cluster: yoga bolster pillow (2.1K), bolster yoga (800),
best yoga bolster (400) + long-tail what is/how to use a bolster. SERP very weak:
#2–6 are shop collection pages on authority (Hugger Mugger #2 = 394 words); only
real editorial = Women's Health #7 + a tiny blog Flecks of Lex #10 (DR11, 1.6K
words, 8 backlinks) ranking on exact-match content. → **Dedicated HYBRID page**
(info + picks). Blueprint headings (from Flecks): what are bolsters · what to look
for · shape/material/size · how to use · what poses · who makes the best. ASIN:
`hugger-mugger-bolster` (B000C9LZRQ), Gaiam alt B01ICBTPTK.

**YOGA MAT BAG + CARRIER — priority 3.** Combine `yoga mat bag` (3.3K) + `yoga mat
carrier` (1.3K) on ONE page (~4.6K combined), **KD 3 (~4 RDs)**, TP 1.3K. Cluster:
gym bag with yoga mat holder (450), lululemon yoga mat bag (450) + how-to long-tail.
SERP slightly more competitive — Manduka's page is STRONGER here (2.8K traffic), so
needs a bit more depth than blocks/bolster. ASIN: `manduka-breathe-easy-carrier`
(B077BJ8315), Gaiam Cargo alt B011NQZBAI.

**YOGA STRAP — do NOT make a standalone page.** 3.8K volume but **traffic potential
only 70** — the SERP is AI-Overview (#1) + Amazon (#2) + shop pages; Google handles
it as shopping, no editorial review ranks. A "best yoga strap" page would earn
almost nothing even ranking well. → Use `manduka-align-strap` (B01ABWKUXI) as a
**cross-sell product** inside a broader page (an "essential yoga accessories"
overview, or buttons in existing mat guides). The how-to long-tail (how to use a
yoga strap / yoga strap stretches, 600) is a separate INFORMATIONAL page type
(exercises, not a review) if ever wanted.

**Final priority order:** 1) yoga blocks (dedicated review) · 2) yoga bolster
(dedicated hybrid) · 3) yoga mat bag+carrier (combined) · 4) yoga strap = product
only, no page.

## FAQ question banks (from Ahrefs, more reliable than PAA — DIY "how to make" excluded)

**Blocks (page DONE):** used the strongest set. Key conversion Qs: "how many do I
need" (pushes 2-pack), "are cork better / foam vs cork".

**Bolster (for the page):** what is a yoga bolster / what is a bolster in yoga · what
is it used for · **what size should I buy** (+ what size for restorative) · **what kind
to buy** · rectangular vs round · **what is the best filling / what to fill it with**
(buckwheat vs cotton vs foam — big buyer doubt) · how to use a bolster (for back pain)
· what to use instead. The size + kind + filling Qs are the conversion gold.

**Mat bag/carrier (for the page):** thin direct list — what are the benefits of a
yoga mat bag · why do you need one. SUPPLEMENT with logical buyer Qs: what size do I
need (does my mat fit) · bag vs sling vs carrier — which · can it fit a thick mat.

**Internal-link overlap:** blocks ↔ bolster both have "what to use instead" + "how to
use for back pain" — natural cross-links between the two new pages (topical cluster).

## BUILD STATUS
- ✅ **Page 1 DONE + shipped:** `/guides/best-yoga-blocks` (commit 078e76a). Manduka
  block corrected to CORK (best overall); Gaiam foam = best value; Gaiam cork = budget.
- ✅ **Page 2 DONE + shipped:** `/guides/best-yoga-bolster` (commit 85e5508). Hybrid
  info+picks (hugger-mugger best overall, gaiam best value). YMYL-safe framing. Both
  /go/ links verified live (302 + tag).
- ✅ **Page 3 DONE + shipped:** `/guides/best-yoga-mat-bag` (commit a7eeb07).
  manduka-breathe-easy-carrier (best overall sling) + gaiam-mat-bag (best value).
  Both /go/ verified live (302 + tag).
- **Strap = product only, no page.** Registry slug aligned to `manduka-yoga-strap`
  (B01ABWKUXI, was manduka-align-strap; commit 5aa4bbf). Inert — use it if/when a
  cross-sell button is added to an existing guide.

**ALL 3 ACCESSORY PAGES SHIPPED + every /go/ link verified live.** The accessory
cluster is complete: blocks, bolster, mat-bag — each a gear roundup via generate-page
(voice-honest, no test claims/ratings, 7-Q FAQ from Ahrefs, Higgs hero+pin, cross-linked).
Registry has 13 slugs total (8 mat/towel + 5 accessory mains + the 3 Gaiam value picks
already counted). NOTE the carrier registry key is `manduka-breathe-easy-carrier`
(NOT the browser-CC's suggested `manduka-mat-carrier`).
