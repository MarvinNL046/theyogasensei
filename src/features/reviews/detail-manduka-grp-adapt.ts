import type { DetailReview } from '#/components/reviews/ReviewDetail'

/**
 * Research-only review — the author has not practised on this mat. Every
 * performance claim is attributed to a named source (Manduka's own pages,
 * OutdoorGearLab, Wirecutter, or named independent reviewers).
 * No prices, and no customer-review text or ratings from Amazon: Associates
 * allows that data only through the PA-API, which this account does not have.
 * associates-ok: this header documents the rule rather than breaking it.
 */
export const DETAIL: DetailReview = {
  updatedAt: 'September 6, 2026',
  sources: [
    {
      title:
        'Manduka GRP Adapt 2.0: specifications and current care instructions',
      url: 'https://www.manduka.com/products/grp-adapt-2-0-yoga-mat-5mm',
    },
    {
      title: 'Manduka PRO lifetime guarantee: eligible products and exclusions',
      url: 'https://www.manduka.com/pages/product-guarantee',
    },
    {
      title: 'OutdoorGearLab: yoga mat comparison and attributed testing',
      url: 'https://www.outdoorgearlab.com/topics/fitness/best-yoga-mat',
    },
    {
      title: 'Wirecutter: yoga mat comparison',
      url: 'https://www.nytimes.com/wirecutter/reviews/best-yoga-mats/',
    },
  ],
  productName: 'Manduka GRP Adapt',
  title: 'Manduka GRP Adapt Review',
  intro:
    'The Manduka GRP Adapt is worth considering if wet grip matters more to you than easy maintenance. Its absorbent surface needs careful cleaning and complete drying, and the PRO lifetime guarantee does not cover it. This documentation-led review separates the current 2.0 specifications from older models and attributed third-party testing; we have not practised on this mat.',
  byline: {
    author: 'The Yoga Sensei',
    date: 'July 25, 2026',
    readTime: '12 min read',
  },
  affiliateSlug: 'manduka-grp-adapt',
  heroImage: '/images/reviews/manduka-grp-adapt/hero.webp',
  overall: 4.1,
  pros: [
    'Wet grip 8.5 at OutdoorGearLab — the highest score in that nineteen-mat field, with dry grip 9.5 alongside it',
    'Ranked 3rd of 19 mats at 82/100 and given the Top Pick for grip in hot yoga',
    'Grips from the first roll-out — no salt-scrub break-in period, unlike the PRO',
    'Designed for practice directly on the absorbent surface, without a covering towel',
    "Lighter than the PRO, at a listed 5.8 lb against the PRO's reputation for heft",
  ],
  cons: [
    "Not on Manduka's lifetime guarantee — the guarantee page names the PRO family exhaustively and no GRP appears",
    'Absorbent surface can show marks; no validated lifespan estimate in this review',
    'No soap, ever. No disinfectant, ever. No submerging. Manduka says all three in writing',
    'Must be dried fully before rolling, and OutdoorGearLab reports it takes a long time to dry',
    'Squeaks on pivots and scuffs easily — reported independently across six years and two generations',
    'Contains latex, so it is out for anyone with a sensitivity — and at least one current roundup has this wrong',
  ],
  features: [
    {
      title: 'Open-cell surface that pulls sweat in',
      body: 'A Manduka executive explained the mechanism to SELF as "an open-celled polyurethane, which means that there are tiny little openings in the surface that let sweat in". Manduka\'s own care guide puts it plainly: "The GRP Series is constructed of an open-cell surface (absorbent), meaning that it will allow moisture to be absorbed." That is the whole product in one sentence, and every downside follows from it.',
    },
    {
      title: 'Satin Grip top, Versa-Grip base',
      body: 'The 2.0 pairs an upgraded Satin Grip top layer with a Versa-Grip bottom and a foam cushion inner layer. Note that Versa-Grip is not on the Travel mat — it appears in a marketing image on that page but not in its specs or feature list.',
    },
    {
      title: 'Measured grip, not claimed grip',
      body: "OutdoorGearLab's Kate Pitts tested 19 mats over two months, pouring a litre of water on each to score wet grip specifically. The GRP Adapt 2.0 took dry grip 9.5 and wet grip 8.5. That methodology matters here more than usual, because sweat is the mat's entire pitch.",
    },
    {
      title: 'Four current variants, and they differ by more than thickness',
      body: "Adapt 2.0 at 5mm, Adapt 1.0 at 5mm, Adapt Lite 2.1 at 4mm, Adapt Travel at 1.5mm. The Lite is not simply a thinner Adapt: it is 24 inches wide against the 5mm mat's 26. Anyone cross-shopping on thickness is quietly changing width too.",
    },
  ],
  sections: [
    {
      id: 'overview',
      title: 'Start here: check the model before following care advice',
      body: 'The original GRP and the current GRP Adapt 2.0 are different products. Cleaning advice written for an earlier version should not be carried across automatically.\n\nFor the current 2.0, Manduka says to avoid soap, soaking, submerging and harsh chemicals. Let the mat dry completely before storing it. Check the exact model on your order and use its current manufacturer instructions.\n\nManufacturer specifications and care guidance were checked on September 6, 2026. The third-party test results discussed below are attributed research, not our own measurements.',
    },
    {
      id: 'grip',
      title: 'Grip — the part that genuinely delivers',
      body: 'This is not a marketing claim, it is a measurement. OutdoorGearLab tested 19 mats over two months, dumping a litre of water on each one to score wet grip specifically. The GRP Adapt 2.0 scored dry grip 9.5 and wet grip 8.5. That wet-grip figure is the highest of any mat on the page — nothing else clears 8.0. Its dry grip is strong but not the best: the Manduka eKO and the Prana Verde both take a full 10.0, and the Jade Harmony 2.0 ties the GRP at 9.5. It finished 3rd of 19 overall at 82 out of 100 and took their Top Pick for grip in hot yoga.\n\nUnlike the PRO, it works immediately. Manduka states the PRO takes around three months of daily practice to break in and will feel slippery whenever you are warm before then. The GRP has no break-in.\n\nThe honest counterweight is that the other current independent test did not pick it. Wirecutter placed it in "The competition" rather than among its picks, noting the mat has great grippiness and does not stretch, but reporting that their tester found it squeaked when pivoting and that switching positions was sometimes difficult. Two credible 2026 tests, one enthusiastic and one unconvinced. Treeline Review, meanwhile, tested three Manduka mats in its 2026 roundup and did not include a GRP at all.\n\nThat disagreement is useful, because it tells you the grip is real and the friction is real, and which of those matters depends on whether your practice pivots.',
      image: '/images/reviews/manduka-grp-adapt/grip.webp',
      ratings: [
        { label: 'Wet grip', score: 4.5 },
        { label: 'Dry grip', score: 4.8 },
        { label: 'Grips from day one', score: 5.0 },
        { label: 'Ease of pivoting', score: 3.0 },
      ],
    },
    {
      id: 'open-vs-closed',
      title: 'GRP or PRO: absorption versus easy maintenance',
      body: 'The GRP absorbs moisture; the PRO keeps it on the surface. That construction difference affects both grip and cleaning.\n\nManduka currently describes the GRP as suitable for heated classes and vigorous vinyasa. An earlier recommendation to route all vigorous practice to the PRO no longer reflects the current product guidance. Choose by grip, maintenance and construction rather than treating practice intensity as a blanket exclusion.\n\nThe PRO plus a towel is another setup to compare. It may suit someone who prioritises an easy-wipe surface and the PRO guarantee, while the GRP is designed for direct contact with its absorbent surface. Neither setup guarantees that every user can practise without slipping.',
      cta: {
        slug: 'manduka-pro-6mm',
        productName: 'Manduka PRO 6mm',
        label: 'Compare closed-cell construction and the PRO guarantee:',
      },
    },
    {
      id: 'warranty',
      title: 'The PRO lifetime guarantee does not cover the GRP',
      body: 'Manduka lists the eligible PRO models in its lifetime guarantee; the GRP is not included. A guarantee link in the website footer does not extend that coverage to every mat.\n\nThis is narrower than saying that a buyer has no warranty or rights at all. Check the seller terms and the applicable product policy for your purchase. Do not base the GRP decision on the PRO guarantee, and do not treat the PRO policy as an unconditional promise either: exclusions and seller eligibility apply.',
    },
    {
      id: 'variants',
      title: 'Which one to actually buy',
      body: 'Manduka currently sells five GRP items, and the differences are not only thickness.\n\n**GRP Adapt 2.0, 5mm** — the current flagship. 71 by 26 inches standard, 79 by 26 long, a listed 5.8 lb, made in Spain. Manduka says the 2.0 brings an upgraded Satin Grip top, an enhanced moisture layer, a re-engineered interior and 20% recycled content.\n\n**GRP Adapt 1.0, 5mm** — the previous generation, still sold. Worth knowing: Manduka publishes identical weight, identical dimensions, an identical material line and an equivalent care block for the 1.0 and the 2.0. The revision is a surface and interior change that nobody outside Manduka has tested. Do not assume the 2.0 is meaningfully better; nobody has measured the gap.\n\n**GRP Adapt Lite 2.1, 4mm** — lighter at 3.7 lb, and narrower: 24 inches against the 5mm mat\'s 26. If you are choosing the Lite to save weight, you are also giving up two inches of width.\n\n**GRP Adapt Travel, 1.5mm** — 2 lb, foldable. Note that Versa-Grip is not listed in its specifications, only in a marketing image on the page.\n\n**Almost Perfect GRP Adapt Lite 2.0** — Manduka\'s discounted first batch, and the company tells you plainly not to use it for the thing you would buy a GRP for: "This first batch was produced without the Versa-Grip base layer found on the now updated GRP Adapt Lite 2.1. As a result, the mat may shift or gather during faster, more dynamic movement, or hot yoga." Fine for restorative work, wrong for hot yoga.',
      image: '/images/reviews/manduka-grp-adapt/variants.webp',
    },
    {
      id: 'buying',
      title: 'Where you can actually buy it, and what the link gets you',
      body: 'Version check: **the Amazon link on this page does not buy you the 2.0.**\n\nAt our July 2026 listing check, a department-scoped search of Amazon US returned only two GRP products: a 5mm Adapt in three colourways, and the 1.5mm Adapt Travel in two. We did not identify a GRP Adapt 2.0 or Lite 2.1 listing in that check. Availability can change; verify the current listing before ordering. The 5mm listing carries no version marker anywhere — not in the title, not in the bullets, not in the model number. If you specifically want the current generation, buy it direct from Manduka.\n\nWhile you are comparing listings, treat Amazon\'s specification fields with suspicion on this product. All three 5mm listings carry a title ending "71 x 24 x 1/16 inches" and an Item Width of 24 inches, while the Measurements block on the same listing says 26 inches — Manduka\'s own figure. Amazon states 5.5 lb where Manduka states 5.8 lb, although OutdoorGearLab actually weighed the mat at 5.5 lb, so on that one Amazon may be closer. The two Travel listings even disagree with each other on weight.\n\nI earn a commission if you buy through the link below, and it goes to the previous-generation 5mm Adapt. Check the model named by the seller before checkout.',
    },
    {
      id: 'care',
      title: 'Care — the real ownership cost',
      body: "Plan for cleaning and drying time after each session.\n\nManduka's current rules, from its own pages: wipe with Manduka's Mat Wash and a damp cloth after practice. Never use any type of soap — the company says it compromises performance and integrity. Never soak or submerge. Never use harsh chemicals. Allow the mat to dry fully before rolling, roll it with the top surface facing in, and store it out of direct sunlight.\n\nAnd one rule with a hygiene consequence people do not expect: \"Mats designed to absorb moisture (like the GRP Series) should never be treated with disinfectant as the liquid will be absorbed into the mat and then cannot be thoroughly removed.\" If you studio-hop, share a mat, or rely on a studio's disinfectant spray, this is the wrong mat.\n\nThere is a live conflict here worth knowing about rather than papering over. OutdoorGearLab recommends a deep clean once or twice a month with a diluted mild dish soap mixture. Manduka says do not use any type of soap. Wirecutter, separately, still tells readers Manduka suggests scrubbing with salt and water to break the mat in — advice Manduka's current pages do not carry for this line. I would follow the manufacturer on a mat outside the PRO lifetime guarantee, but you should know the sources disagree.\n\nOutdoorGearLab scored Care and Cleaning 7.0, the mat's lowest score of any category, and reports it takes a long time to dry fully.",
      cta: {
        slug: 'manduka-mat-wash',
        productName: 'Manduka Mat Wash',
        label: 'The only cleaner Manduka permits on this surface:',
      },
    },
    {
      id: 'complaints',
      title: 'The complaints that keep recurring',
      body: 'Three faults show up independently across six years and two product generations, which makes them a pattern rather than one bad unit.\n\n**Squeaking on pivots.** Wirecutter\'s tester in 2026 and OutdoorGearLab in 2026 both report it, and OutdoorGearLab notes it happens when the mat is dry. Jaime Tan reported the same in 2020. If you practise Ashtanga or Mysore, or in a quiet studio, take this seriously.\n\n**Scuffing.** Jaime Tan reported scuffing the surface immediately, simply by turning her heel. OutdoorGearLab lists that it shows sweat and traction marks and leaves watermarks.\n\n**Dust and pet hair.** The absorbent surface attracts both, reported independently by three separate reviewers. If you have a cat or practise in a dusty room, expect to be picking things off it.\n\n**Off-gassing.** The 2018 review described a mat that "smelled pretty bad at first". One independent owner reports it took roughly eight days airing out to smell normal, and Wirecutter\'s yoga instructor advised not using it straight from the packaging. Plan to unroll it and leave it a week before your first class.\n\nOne correction while we are here, because it is a safety point rather than a preference. A current, well-ranked hot-yoga roundup describes the GRP as latex-free. It is not. Every current GRP Adapt product page lists latex in the material stack and warns it is "not recommended for those with latex sensitivities". If you have a latex allergy, do not rely on that other page.',
    },
  ],
  specs: [
    {
      label: 'Thickness',
      value: '5mm (Adapt 2.0 and 1.0) · 4mm Lite 2.1 · 1.5mm Travel',
    },
    {
      label: 'Dimensions',
      value: '71" × 26" standard, 79" × 26" long — but the Lite is 24" wide',
    },
    {
      label: 'Weight',
      value:
        '5.8 lb per Manduka; Amazon says 5.5 lb and OutdoorGearLab measured 5.5 lb',
    },
    {
      label: 'Construction',
      value:
        'Satin Grip open-cell polyurethane top, foam inner, Versa-Grip base',
    },
    { label: 'Material', value: 'Polyurethane / natural rubber / latex' },
    {
      label: 'Latex',
      value: 'Yes — Manduka advises against it for latex sensitivities',
    },
    {
      label: 'Warranty',
      value: 'Not covered by the PRO lifetime guarantee; check seller terms',
    },
    {
      label: 'Care',
      value:
        'Mat wash and damp cloth only. No soap, no disinfectant, no submerging',
    },
    { label: 'Made in', value: 'Spain' },
  ],
  whoFor: [
    'Hot yoga and heated vinyasa practitioners whose hands slide on any sealed mat',
    'Anyone currently practising on a mat plus a towel who would rather carry one thing',
    'Practitioners who want grip from the first roll-out instead of a three-month break-in',
    'People who practise at home, on their own mat, and can hang it to dry after every class',
    'Anyone who accepts a mat with a service life rather than a decade-long guarantee',
  ],
  notIdealFor:
    'Skip it if you have a latex sensitivity, need the PRO lifetime guarantee, or cannot follow the absorbent surface care and drying instructions. If you prefer to pivot freely, read the attributed reports about friction and squeaking before choosing.',
  whoForImage: '/images/reviews/grp.webp',
  atAGlance: [
    { label: 'Best for', value: 'Hot yoga & heavy sweat' },
    { label: 'Grip', value: 'Highest measured in its field' },
    { label: 'Cushioning', value: 'Firm 5mm; less than the PRO' },
    { label: 'Durability', value: 'Absorbent surface; care matters' },
    { label: 'Weight', value: '~5.5–5.8 lb' },
    { label: 'Price', value: '$$$' },
  ],
  verdict:
    'Consider the GRP Adapt if an absorbent grip surface suits your practice and you can clean and dry it properly. The third-party reports below describe strong grip, but also surface marks and squeaking; we have not independently tested those outcomes. Choose the PRO instead if you prioritise closed-cell construction and its limited lifetime guarantee. Before buying, confirm the version, material warning and care instructions on the exact listing.',
  alternatives: [
    {
      name: 'Manduka PRO 6mm',
      badge: 'Lifetime guarantee',
      overall: 4.6,
      image: '/images/guides/manduka-yoga-mat/hero.webp',
      href: '/reviews/manduka-pro',
    },
    {
      name: 'Liforme Classic',
      badge: 'Best for Alignment',
      overall: 4.0,
      image: '/images/reviews/liforme/hero.webp',
      href: '/reviews/liforme',
    },
    {
      name: 'Lululemon The Mat',
      badge: 'Best Studio Feel',
      overall: 4.2,
      image: '/images/guides/lululemon-yoga-mat/hero.webp',
      href: '/reviews/lululemon',
    },
    {
      name: 'Alo Warrior Mat',
      badge: 'Plush oversized alternative',
      overall: 4.1,
      image: '/images/reviews/alo/hero.webp',
      href: '/reviews/alo',
    },
  ],
}
