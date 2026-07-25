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
  productName: 'Manduka GRP Adapt',
  title: 'Manduka GRP Adapt Review',
  intro:
    'The GRP Adapt is the mat Manduka built for people who sweat, and by the one independent measurement available it is the grippiest mat in its field. It is also the mat Manduka will not put on its lifetime guarantee, will not let you wash with soap, and steers vigorous practitioners away from. All of that is in the company\'s own writing, and none of it is on the pages currently ranking for this mat.',
  byline: {
    author: 'The Yoga Sensei',
    date: 'July 25, 2026',
    readTime: '12 min read',
  },
  affiliateSlug: 'manduka-grp-adapt',
  heroImage: '/images/reviews/manduka-grp-adapt/hero.webp',
  overall: 4.1,
  pros: [
    'Dry grip 9.5 and wet grip 8.5 at OutdoorGearLab, against test-field averages of 7.4 and 5.7 — the highest in that field',
    'Ranked 3rd of 19 mats at 82/100 and given the Top Pick for grip in hot yoga',
    'Grips from the first roll-out — no salt-scrub break-in period, unlike the PRO',
    'Genuinely removes the need for a towel in heated practice, which no closed-cell mat does',
    'Lighter than the PRO, at a listed 5.8 lb against the PRO\'s reputation for heft',
  ],
  cons: [
    'Not on Manduka\'s lifetime guarantee — the guarantee page names the PRO family exhaustively and no GRP appears',
    'Manduka concedes open-cell construction wears faster than closed-cell, and publishes no lifespan figure at all',
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
      body: 'OutdoorGearLab\'s Kate Pitts tested 19 mats over two months, pouring a litre of water on each to score wet grip specifically. The GRP Adapt 2.0 took dry grip 9.5 and wet grip 8.5. That methodology matters here more than usual, because sweat is the mat\'s entire pitch.',
    },
    {
      title: 'Four current variants, and they differ by more than thickness',
      body: 'Adapt 2.0 at 5mm, Adapt 1.0 at 5mm, Adapt Lite 2.1 at 4mm, Adapt Travel at 1.5mm. The Lite is not simply a thinner Adapt: it is 24 inches wide against the 5mm mat\'s 26. Anyone cross-shopping on thickness is quietly changing width too.',
    },
  ],
  sections: [
    {
      id: 'overview',
      title: 'Start here: the top-ranking advice will damage your mat',
      body: 'The review sitting on page one of Google for this mat tells you to put it in the bath.\n\nSELF, September 2018: "Unlike other yoga mats, you actually can submerge the Manduka GRP in a bathtub to thoroughly clean it."\n\nManduka, on the live GRP Adapt 2.0 page today: "Do not soak, submerge, or use harsh chemicals, as this can damage the moisture-absorbing surface."\n\nBoth statements are real and I have read both pages. The SELF piece is not wrong about the mat it reviewed — it reviewed the original GRP, a different product with a different surface, in 2018. It is wrong about the mat you can buy now, and Google is still showing it.\n\nThat is the shape of this whole SERP. The other editorial result, from December 2020, compares "the GRP Hot at 6mm, GRP Lite at 4mm... and then there\'s the GRP Adapt". Manduka sells none of those three today. Nobody on page one has written about the mats that actually exist.\n\nSo that is what this page does. I have not practised on this mat; every performance claim below is attributed to Manduka, to OutdoorGearLab, to Wirecutter, or to a named independent reviewer. What I can do is read the current documentation properly and tell you what it says.',
    },
    {
      id: 'grip',
      title: 'Grip — the part that genuinely delivers',
      body: 'This is not a marketing claim, it is a measurement. OutdoorGearLab tested 19 mats over two months, dumping a litre of water on each one to score wet grip specifically. The GRP Adapt 2.0 scored dry grip 9.5 and wet grip 8.5, against field averages of 7.4 and 5.7. It finished 3rd of 19 overall at 82 out of 100 and took their Top Pick for grip in hot yoga.\n\nUnlike the PRO, it works immediately. Manduka states the PRO takes around three months of daily practice to break in and will feel slippery whenever you are warm before then. The GRP has no break-in.\n\nThe honest counterweight is that the other current independent test did not pick it. Wirecutter placed it in "The competition" rather than among its picks, noting the mat has great grippiness and does not stretch, but reporting that their tester found it squeaked when pivoting and that switching positions was sometimes difficult. Two credible 2026 tests, one enthusiastic and one unconvinced. Treeline Review, meanwhile, tested three Manduka mats in its 2026 roundup and did not include a GRP at all.\n\nThat disagreement is more useful than either page-one review, because it tells you the grip is real and the friction is real, and which of those matters depends on whether your practice pivots.',
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
      title: 'Open-cell or closed-cell: the only question that matters',
      body: 'If you take one thing from this page, take this. Manduka sells two flagship mats built on opposite principles, and choosing between them is not about which is better.\n\nThe PRO is closed-cell: sealed, so nothing gets in. Manduka\'s own 2026 article states "The PRO mat is built for stability and support, not for sweat absorption due to its closed-cell construction." Sweat sits on the surface. You wipe it off. You can disinfect it. It is covered for approximately ten years of regular use.\n\nThe GRP is open-cell: porous, so sweat is drawn in rather than pooling. That is why it grips when you are dripping. It is also why you can never disinfect it, never use soap on it, never submerge it, and must dry it completely before rolling.\n\nManduka states the trade-off itself, and this is the most useful sentence the company has published about the mat: the open-cell construction "will show signs of wear over time with use more quickly than a mat of closed-cell construction." Then it does something manufacturers almost never do — it routes you away from its own product: "If you have a more vigorous practice we recommend the PRO Series as this mat is designed to withstand such practices."\n\nThere is a third option the whole search results page ignores: the PRO plus a towel. Manduka\'s own article says the PRO is not built for sweat absorption and that a yoga towel is the answer in heated classes. That combination costs more upfront and lasts far longer.\n\n**The choosing rule:** does your practice already force you to use a towel? If yes, the GRP is the mat that removes it, and you are accepting a consumable in exchange. If no, you are taking on every maintenance restriction for a benefit you do not need.',
      cta: {
        slug: 'manduka-pro-6mm',
        productName: 'Manduka PRO 6mm',
        label: 'Manduka routes vigorous practices to this one instead:',
      },
    },
    {
      id: 'warranty',
      title: 'The lifetime guarantee everyone assumes it has',
      body: 'Manduka\'s reputation for standing behind its mats is a big part of why people buy the brand. That reputation does not extend to this mat, and the way it is presented makes the confusion very easy.\n\nManduka\'s guarantee page names its covered products exhaustively: the PRO, PROlite, PRO Travel, PRO Squared, PRO Long & Wide and PROlite Long & Wide. No GRP mat appears anywhere on the list. Yet the footer of every GRP product page carries a "Lifetime Guarantee" link, which is how a buyer arriving from the PRO\'s reputation ends up assuming they are covered.\n\nMaura Blackstone, a physical therapist with a 500-hour teaching qualification, reached the same conclusion in an unsponsored review and put the warranty gap in her cons list. So this is not a technicality I have invented — an independent clinician reviewing the mat hands-on found it too.\n\nFor context on what is being given up: Manduka defines the PRO guarantee as covering approximately ten years of regular use, including wear to the top surface from regular use. The GRP has no published lifespan figure of any kind. Not on the four product pages, not in the care guide, nowhere.',
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
      body: 'This matters and no other page says it, so I will be blunt: **the Amazon link on this page does not buy you the 2.0.**\n\nA department-scoped search of Amazon US returns only two GRP products: a 5mm Adapt in three colourways, and the 1.5mm Adapt Travel in two. There is no GRP Adapt 2.0 listing and no Lite 2.1 listing. The 5mm listing carries no version marker anywhere — not in the title, not in the bullets, not in the model number. If you specifically want the current generation, buy it direct from Manduka.\n\nWhile you are comparing listings, treat Amazon\'s specification fields with suspicion on this product. All three 5mm listings carry a title ending "71 x 24 x 1/16 inches" and an Item Width of 24 inches, while the Measurements block on the same listing says 26 inches — Manduka\'s own figure. Amazon states 5.5 lb where Manduka states 5.8 lb, although OutdoorGearLab actually weighed the mat at 5.5 lb, so on that one Amazon may be closer. The two Travel listings even disagree with each other on weight.\n\nI earn a commission if you buy through the link below, and it goes to the previous-generation 5mm Adapt. Telling you that costs me the sale of a 2.0 and it is still the right thing to put on the page.',
    },
    {
      id: 'care',
      title: 'Care — the real ownership cost',
      body: 'This is where the mat asks something of you, and where the ranking pages are most out of date.\n\nManduka\'s current rules, from its own pages: wipe with Manduka\'s Mat Wash and a damp cloth after practice. Never use any type of soap — the company says it compromises performance and integrity. Never soak or submerge. Never use harsh chemicals. Allow the mat to dry fully before rolling, roll it with the top surface facing in, and store it out of direct sunlight.\n\nAnd one rule with a hygiene consequence people do not expect: "Mats designed to absorb moisture (like the GRP Series) should never be treated with disinfectant as the liquid will be absorbed into the mat and then cannot be thoroughly removed." If you studio-hop, share a mat, or rely on a studio\'s disinfectant spray, this is the wrong mat.\n\nThere is a live conflict here worth knowing about rather than papering over. OutdoorGearLab recommends a deep clean once or twice a month with a diluted mild dish soap mixture. Manduka says do not use any type of soap. Wirecutter, separately, still tells readers Manduka suggests scrubbing with salt and water to break the mat in — advice Manduka\'s current pages do not carry for this line. I would follow the manufacturer on a mat with no warranty behind it, but you should know the sources disagree.\n\nOutdoorGearLab scored Care and Cleaning 7.0, the mat\'s lowest score of any category, and reports it takes a long time to dry fully.',
      cta: {
        slug: 'manduka-mat-wash-lavender',
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
    { label: 'Thickness', value: '5mm (Adapt 2.0 and 1.0) · 4mm Lite 2.1 · 1.5mm Travel' },
    { label: 'Dimensions', value: '71" × 26" standard, 79" × 26" long — but the Lite is 24" wide' },
    { label: 'Weight', value: '5.8 lb per Manduka; Amazon says 5.5 lb and OutdoorGearLab measured 5.5 lb' },
    { label: 'Construction', value: 'Satin Grip open-cell polyurethane top, foam inner, Versa-Grip base' },
    { label: 'Material', value: 'Polyurethane / natural rubber / latex' },
    { label: 'Latex', value: 'Yes — Manduka advises against it for latex sensitivities' },
    { label: 'Warranty', value: 'None. The lifetime guarantee covers the PRO family only' },
    { label: 'Care', value: 'Mat wash and damp cloth only. No soap, no disinfectant, no submerging' },
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
    'Skip it if you have a latex sensitivity, want Manduka\'s lifetime guarantee, practise Ashtanga or anything pivot-heavy, rely on studio disinfectant or share a mat, cannot hang it to dry after every session, or do not sweat much — the grip is the only thing you are buying, and the maintenance rules apply either way.',
  whoForImage: '/images/reviews/grp.webp',
  atAGlance: [
    { label: 'Best for', value: 'Hot yoga & heavy sweat' },
    { label: 'Grip', value: 'Highest measured in its field' },
    { label: 'Cushioning', value: 'Firm 5mm; less than the PRO' },
    { label: 'Durability', value: 'Service life, no warranty' },
    { label: 'Weight', value: '~5.5–5.8 lb' },
    { label: 'Price', value: '$$$' },
  ],
  verdict:
    'The best wet grip anyone has measured, sold with an ownership cost the marketing does not mention. OutdoorGearLab put it third of nineteen and top for hot yoga; Wirecutter tested it and did not pick it. Manduka concedes in writing that open-cell wears faster than closed-cell, publishes no lifespan figure, leaves the mat off its lifetime guarantee, and tells vigorous practitioners to buy the PRO instead. Buy the GRP Adapt if your practice already forces you to use a towel and you want to stop carrying one — that is a real problem it genuinely solves. If you sweat moderately, buy the PRO, break it in, and keep it for a decade. And if you want the current 2.0, buy direct: Amazon only carries the previous generation.',
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
      name: 'Jade Harmony',
      badge: 'Best Natural Rubber',
      overall: 4.2,
      image: '/images/guides/jade-yoga-mat/hero.webp',
      href: '/reviews/jade',
    },
  ],
}
