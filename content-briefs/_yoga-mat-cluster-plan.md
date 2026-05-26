# Hermes — Cluster Brief UPDATE (post Ahrefs validation)

**Status:** vorige cluster proposal vervangt. Ahrefs keyword research uitgevoerd
2026-05-26, drie pivots gemaakt op basis van data.

**Reviewed by:** Claude (browser audit + Ahrefs validation)
**Approved by:** Marvin

---

## Wat is veranderd t.o.v. je vorige proposal

| Item | Vorige proposal | Update | Reden |
|---|---|---|---|
| Pillar URL | `/guides/yoga-mat-buying-guide` | `/guides/how-to-choose-a-yoga-mat` | "yoga mat buying guide" = vol 60, KD 17. "how to choose a yoga mat" = vol 350, KD 11. Beide keywords gedekt via title/H1. |
| Thickness post | Supporting role | Behouden als supporting MAAR target sterker dan gedacht: vol 250 KD 0 met Traffic Potential 1,000/mo via parent topic "yoga mat thickness" (vol 600). Behandel als prioriteit-info-post, niet als bijzaak. |
| Storage post | Eigen URL | **DROP als standalone.** Vol 10/mo, geen meetbare TP. Verwerk als sectie in bestaande cleaning-guide of in pillar. |
| Lifespan post | Eigen URL | **DROP als standalone.** Vol 40, KD 1 — easy win maar te klein voor eigen URL met deadline-druk. Verwerk als sectie in pillar. Kan later wel als losse post als we naar 8+ in totaal willen. |
| Cluster scope | 5 nieuwe posts + cleaning-guide | **3 nieuwe posts + bestaande cleaning-guide = 4 live totaal.** Quality > quantity. |

## Definitieve cluster — Yoga Mat Selection & Care

```text
Pillar: /guides/how-to-choose-a-yoga-mat    [INFO] [DRAFT 2026-05-28]
  ├─ /guides/how-thick-should-a-yoga-mat-be [INFO] [DRAFT 2026-05-29]
  ├─ /guides/best-yoga-mat-for-hot-yoga     [AFFILIATE — C2 DRAFT 2026-05-30]
  └─ /guides/how-to-clean-a-yoga-mat        [EXISTING — PILLAR + THICKNESS LINKS UPDATED 2026-05-29]

Cluster draft status: complete as of the C2 affiliate-spoke draft. Final publication still needs Marvin review, affiliate destination mapping and final live QA.
```

## Per post — definitieve specs

### 1. PILLAR — `/guides/how-to-choose-a-yoga-mat`
- **Primary keyword:** `how to choose a yoga mat` (vol 350, KD 11, TP 300)
- **Secondary keyword:** `yoga mat buying guide` (vol 60, KD 17, TP 400)
- **Title:** "How to Choose a Yoga Mat: A Practical Buying Guide"
- **H1:** "How to Choose a Yoga Mat"
- **Word count:** 3,000–4,000
- **Intent:** mixed (info-heavy, leads to commercial decisions)
- **Internal sections that absorb dropped posts:**
  - "How long does a yoga mat last?" → eigen H2, 200-300 woorden, anchor voor de easy-win keyword (vol 40, KD 1) zonder eigen URL
  - "How to store your yoga mat" → eigen H2, 150-200 woorden
- **Schema:** Article (geen HowTo — dit is een buying guide, geen procedure)

### 2. SUPPORTING — `/guides/how-thick-should-a-yoga-mat-be`
- **Primary keyword:** `how thick should a yoga mat be` (vol 250, KD 0, TP 1,000)
- **Parent topic dekking:** `yoga mat thickness` (vol 600)
- **Title:** "How Thick Should a Yoga Mat Be? A Practical Thickness Guide"
- **H1:** "How Thick Should a Yoga Mat Be?"
- **Word count:** 2,200–2,800
- **Intent:** info
- **Schema:** Article (overweeg FAQPage als sectie aan einde)

### 3. AFFILIATE — `/guides/best-yoga-mat-for-hot-yoga` — DRAFT
- **Primary keyword:** `best yoga mat for hot yoga` (vol 2,200, KD 5, TP 3,000)
- **Merge keywords:** `best hot yoga mat` (vol 1,200), `best mat for hot yoga` (vol 300)
- **Title:** "Best Yoga Mat for Hot Yoga: Grippy Picks for Sweaty Practice"
- **H1:** "Best Yoga Mat for Hot Yoga"
- **Word count:** 2,500–3,200 target for this commercial spoke draft
- **Intent:** commercial
- **Schema:** Article + FAQPage (geen Product schema — we hebben niet zelf getest)
- **Affiliate state at launch:** all product CTAs route through `/go/<slug>` placeholders. Real Amazon/Product mappings activate after Marvin's Associates approval.
- **URL note:** onder `/guides/` om taxonomie consistent te houden. Verplaats later naar `/reviews/` als die taxonomie ooit komt.

## Internal linking map

```text
pillar (how-to-choose) → thickness, hot-yoga, cleaning
thickness → pillar, hot-yoga
hot-yoga → pillar, cleaning, thickness
cleaning (existing) → pillar, hot-yoga, thickness
```

**Concrete anchor locations:**
- **pillar → thickness:** in de "Thickness" sectie van de buying guide, deeplink naar de specifieke thickness-guide voor lezers die meer detail willen
- **pillar → hot-yoga:** in de "Match the mat to your practice style" sectie, hot yoga als specifiek voorbeeld
- **pillar → cleaning:** in de "Care & longevity" sectie
- **thickness → pillar:** na de quick thickness-table, "still not sure? our complete buying guide..."
- **thickness → hot-yoga:** in de "When you need extra grip" sectie
- **hot-yoga → pillar:** in de intro, "if you're not sure hot yoga is your style yet, start with our buying guide"
- **hot-yoga → cleaning:** in de "Caring for your hot yoga mat" sectie (logisch — hot yoga mats moeten vaker schoongemaakt)
- **hot-yoga → thickness:** in de "What thickness for hot yoga" sectie
- **cleaning (existing) → pillar, hot-yoga, thickness:** voeg toe in de bestaande "Further reading" sectie, vervangt de huidige "complete yoga mat buying guide (publishing soon)" placeholder

**Belangrijk:** in de bestaande `/guides/how-to-clean-a-yoga-mat` staat nu: *"For more on how long a properly maintained mat should actually last, see our complete yoga mat buying guide (publishing soon)."* — die placeholder moet vervangen worden door een echte link naar de pillar zodra die live is.

## Production schedule

| Dag | Werk | Hermes/CC | Marvin review |
|---|---|---|---|
| Do 28 | Pillar research + draft + assets | 5-7h | 60-90m |
| Vr 29 | Thickness post research + draft + assets | 1.5-2h | 30-45m |
| Vr 29 | Internal link pass (pillar ↔ thickness ↔ cleaning) | 30m | 15m |
| Za 30 | C2 (hot yoga) research + draft | 5-7h | 60-90m |
| Za 30 | C2 affiliate disclosure banner, product table QA | 2h | 30m |
| Zo 31 | Final cluster QA + claim-safety sweep + schema validation | 2h | 30m |
| Zo 31 | Vercel preview deploy + final audit door Claude | — | — |
| Zo 31 | Apex alias aanslaan + GSC submission | 30m | 15m |

**Total Marvin time required:** ~4-5 hours review across 4 days. Bouw rust in op vrijdagavond.

## Sitemap update na launch

Sitemap groeit van 8 naar 10 URLs:
```text
/, /about, /authors/marvin
/guides/how-to-choose-a-yoga-mat        (NEW)
/guides/how-thick-should-a-yoga-mat-be   (NEW)
/guides/best-yoga-mat-for-hot-yoga       (NEW)
/guides/how-to-clean-a-yoga-mat
/affiliate-disclosure, /privacy, /terms, /contact
```

`/go/$slug` blijft uit sitemap (redirects only).

## Risk register

- **C2 specifieke product claims:** elke product-claim in de hot-yoga post moet verifieerbaar zijn uit publieke specs of manufacturer pages. Geen "we testten 12 mats", geen verzonnen prijzen, geen verzonnen ratings. Als Marvin een specifieke mat zelf bezit en heeft gebruikt, mag dat met disclosure. Anders: "based on aggregated user reviews and manufacturer specifications".
- **Amazon Associates approval timing:** als approval vrijdag of zaterdag binnenkomt, vervang placeholder tag in `affiliate-links.ts`. Als nee, banner blijft op C2 staan.
- **KvK-beslissing:** Marvin opereert nog als privépersoon. C2 mag live met affiliate links zodra tag activeert; juridisch is dit grijs maar acceptabel zolang inkomsten beperkt zijn. Bij significant verkeer/inkomsten KvK regelen — buiten scope deze cluster.

## Out of scope (parkeren voor cluster #2)

- Standalone storage post (vol 10 — niet de moeite waard nu)
- Standalone lifespan post (vol 40 KD 1 — easy win, leuk voor cluster #2 als content-volume strategie aan komt)
- `/guides` index page (WARN-5 uit B++ audit, niet launch-blocking)
- Author portrait upload
- Travel mat / beginners / props clusters (volgende strategische beslissing)

---

**Sign-off:** approved 2026-05-26 by Marvin via browser session with Claude.
Content brief voor pillar volgt direct hierna.
