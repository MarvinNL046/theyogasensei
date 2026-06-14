# Pinterest Launch Schedule — theyogasensei.com

**Created:** 2026-06-14 · **Status:** ready to execute
**Why now:** the mat cluster is full (18 guides, 90 pins generated). Activate top-of-funnel.
**KPI:** outbound clicks to guides (not likes/followers). See `_social-media-plan.md`.

> **The mechanism:** I generate the pins (done — `public/images/pins/<slug>/`). **You post them** — manually in Pinterest or via Pinterest's native scheduler / Tailwind. There's no API automation set up, and dumping 90 pins at once gets you throttled. This is the drip plan.

---

## ⚙️ One-time setup (do this first — ~20 min)

1. **Pinterest Business account** — create/convert one (free). *[M]*
2. **Claim the domain** `theyogasensei.com` in Pinterest Settings → Claimed accounts. This activates **Rich Pins** (the site metadata is already in place — it just needs claiming) + analytics + proper attribution. *[M]*
3. **Create 4 boards** (mirror the clusters):
   - **Yoga Mats & Gear** (primary — most pins)
   - **Yoga for Beginners**
   - **Eco / Sustainable Yoga**
   - **Mindful Living** (parked — for future lifestyle content)

## 📌 The rule

- **3–5 fresh pins/week.** One at a time, spread across guides — not 5 variants of one guide back-to-back.
- **Lead with the strongest hook angle** (`01-listicle` or `02-problem`) for each guide first; circle back for `03-comparison` / `05-checklist` as second/third pins weeks later.
- **Copy is ready** in each guide's `public/images/pins/<slug>/_pins.md` (title + description + link per pin). Pinterest is a search engine — the keyword-first titles matter.
- **Always set the pin link** to the specific guide URL (in each `_pins.md`).

---

## 🗓️ The queue (≈4 pins/week, ~6 weeks to cover every guide's lead pin)

Prioritised by proven GSC traction (hot-yoga, eco, how-thick already get impressions) + the hub + commercial value.

| Week | Pin (file) | Board | Guide link |
|---|---|---|---|
| **1** | best-yoga-mats-2026 `01-listicle` | Mats & Gear | /guides/best-yoga-mats-2026 |
| 1 | best-yoga-mat-for-hot-yoga `01-listicle` | Mats & Gear | /guides/best-yoga-mat-for-hot-yoga |
| 1 | eco-friendly-yoga-mat `01-listicle` | Eco / Sustainable | /guides/eco-friendly-yoga-mat |
| 1 | how-to-choose-a-yoga-mat `01-listicle` | Beginners | /guides/how-to-choose-a-yoga-mat |
| **2** | how-thick-should-a-yoga-mat-be `01` | Beginners | /guides/how-thick-should-a-yoga-mat-be |
| 2 | manduka-yoga-mat `01` | Mats & Gear | /guides/manduka-yoga-mat |
| 2 | lululemon-yoga-mat `01` | Mats & Gear | /guides/lululemon-yoga-mat |
| 2 | best-yoga-mat-for-bad-knees `01` | Mats & Gear | /guides/best-yoga-mat-for-bad-knees |
| **3** | retrospec-solana-yoga-mat `01` | Mats & Gear | /guides/retrospec-solana-yoga-mat |
| 3 | gaiam-yoga-mat `01` | Beginners | /guides/gaiam-yoga-mat |
| 3 | jade-yoga-mat `01` | Eco / Sustainable | /guides/jade-yoga-mat |
| 3 | cork-vs-rubber-yoga-mat `01` | Eco / Sustainable | /guides/cork-vs-rubber-yoga-mat |
| **4** | manduka-vs-lululemon-yoga-mat `01` | Mats & Gear | /guides/manduka-vs-lululemon-yoga-mat |
| 4 | how-to-clean-a-yoga-mat `01` | Mats & Gear | /guides/how-to-clean-a-yoga-mat |
| 4 | how-to-store-a-yoga-mat `01` | Mats & Gear | /guides/how-to-store-a-yoga-mat |
| 4 | best-yoga-bolster `01` | Mats & Gear | /guides/best-yoga-bolster |
| **5** | best-yoga-blocks `01` | Mats & Gear | /guides/best-yoga-blocks |
| 5 | best-yoga-mat-bag `01` | Mats & Gear | /guides/best-yoga-mat-bag |
| 5 | best-yoga-mats-2026 `03-comparison` (2nd angle) | Mats & Gear | /guides/best-yoga-mats-2026 |
| 5 | best-yoga-mat-for-hot-yoga `02-problem` (2nd angle) | Mats & Gear | /guides/best-yoga-mat-for-hot-yoga |
| **6+** | Second/third angles (`02-problem`, `03-comparison`, `05-checklist`) of the top-performing guides, spread across boards | — | — |

After week 6 every guide has its lead pin live; from there, feed fresh second-angle pins on the same 3–5/week cadence and let Pinterest analytics tell you which guides to feed more.

---

## ✍️ Week 1 — copy ready to paste

**1. best-yoga-mats-2026 → board: Yoga Mats & Gear**
- Image: `public/images/pins/best-yoga-mats-2026/01-listicle.png`
- Title: *The Honest Yoga Mat Guide for 2026*
- Description: An honest 2026 yoga mat guide comparing seven standout picks by material, grip, cushion and trade-offs, without fake lab-testing claims. #yogamat #yogagear #yogaforbeginners #yogapractice
- Link: https://www.theyogasensei.com/guides/best-yoga-mats-2026

**2. best-yoga-mat-for-hot-yoga → board: Yoga Mats & Gear**
- Image: `public/images/pins/best-yoga-mat-for-hot-yoga/01-listicle.png`
- Title: *Best Yoga Mat for Hot Yoga*
- Description: Choose the best yoga mat for hot yoga by wet grip, sweat handling, material, thickness and towel pairing, without fake testing claims or fixed prices. #hotyoga #yogamat #yogagear #yogapractice
- Link: https://www.theyogasensei.com/guides/best-yoga-mat-for-hot-yoga

**3. eco-friendly-yoga-mat → board: Eco / Sustainable Yoga**
- Image: `public/images/pins/eco-friendly-yoga-mat/01-listicle.png`
- Title: *Best Eco-Friendly Yoga Mats*
- Description: Choose an eco-friendly yoga mat by material, grip, latex risk and care needs, with five honest picks and no fake testing claims. #ecoyoga #sustainableyoga #yogamat #ecofriendly
- Link: https://www.theyogasensei.com/guides/eco-friendly-yoga-mat

**4. how-to-choose-a-yoga-mat → board: Yoga for Beginners**
- Image: `public/images/pins/how-to-choose-a-yoga-mat/01-listicle.png`
- Title: *How to Choose a Yoga Mat, Without the Hype*
- Description: A clear, honest guide to choosing a yoga mat by thickness, material, grip, durability and care, based on practice and careful research. #yogamat #howtochooseayogamat #yogaforbeginners #yogatips
- Link: https://www.theyogasensei.com/guides/how-to-choose-a-yoga-mat

> Copy for every other pin lives in its guide's `_pins.md`. Tweak titles/descriptions freely before posting — the generated copy is a first draft.
