import type { DetailReview } from '#/components/reviews/ReviewDetail'

/**
 * Research-only review — the author has not practised on this mat. Every
 * performance claim is attributed to a named source (Alo's own product copy,
 * the EverydayYoga retailer spec sheet, T3, Popsugar, YouTube reviewer
 * Alexia K Yoga, or named Reddit owner threads).
 *
 * Weight corrected 2026-07-26: shipped as ~6 lb from the EverydayYoga listing,
 * which is an outlier. Alo's own product pages state "approximately 8 lbs" and
 * every other reviewer repeats that; 6 lb also implies the same density as the
 * lululemon, which contradicts the universal "surprisingly heavy" reports.
 *
 * No prices as figures:
 * Amazon Associates forbids them outside the PA-API. Alo sells direct, so
 * affiliateSlug is null — same situation as the Lululemon review.
 */
export const DETAIL: DetailReview = {
  productName: 'Alo Warrior Mat',
  title: 'Alo Warrior Mat Review',
  intro:
    'The Warrior Mat is the yoga mat as a luxury object: oversized, plush, matte, and built around a polyurethane-leather top that Alo pitches — and independent reviewers largely confirm — as gripping wet or dry. The performance under the styling is real, but so are the running costs the marketing skips: it is heavy, it creases, it shows every sweat mark, and it wants wiping after every single session.',
  byline: {
    author: 'The Yoga Sensei',
    date: 'July 26, 2026',
    readTime: '9 min read',
  },
  affiliateSlug: null,
  heroImage: '/images/reviews/alo/hero.webp',
  overall: 4.1,
  pros: [
    'Grips wet and dry — T3 rates it four stars out of five and calls it soft, spongy and stable, and YouTube tester Alexia K Yoga confirms grip holds with sweaty hands',
    'Noticeably bigger than a standard mat at 74.4 by 26.4 inches, so broad flows stay on the mat',
    'Plush 5mm cushion over a natural rubber base — Popsugar’s reviewer credits it with protecting joints in every position',
    'Premium matte finish that reviews and owner threads consistently praise — the looks are the one point nobody disputes',
    'Formaldehyde-free, PVC-free build with an ethically sourced natural rubber base, per the published spec sheet',
  ],
  cons: [
    'Heavy — Alo states approximately eight pounds, and multiple owners say it is a home mat, not one you carry to class',
    'The polyurethane-leather top shows sweat outlines, oils and scuffs, and Alo’s own care guidance asks for a wipe-down after every use',
    'Creases easily — a long-term Reddit owner lists it among their main complaints, and Alo says to roll it top-out to protect the surface',
    'Sold direct with recurring owner complaints about colour accuracy and final-sale purchases on the Alo subreddit',
    'Natural rubber base, so the usual latex-allergy caution applies',
  ],
  features: [
    {
      title: 'Polyurethane-leather top layer',
      body: 'The spec sheet lists the top as 100% polyurethane leather — a smooth, matte surface in the same family as the tops on the Lululemon Reversible and the Liforme, engineered to hold damp skin. Alo’s own product copy claims it is slip-free "wet or dry", and independent testers broadly back that up.',
    },
    {
      title: 'Oversized footprint',
      body: 'At 74.4 by 26.4 inches the Warrior is around six inches longer and two inches wider than a standard mat. Owner threads keep coming back to it right after the looks: wide-legged flows and floor work stop spilling onto the floorboards.',
    },
    {
      title: '5mm build on a natural rubber base',
      body: 'The mat is 5mm thick in total — a thin polyurethane-leather top over a base of ethically sourced natural rubber, and it is that rubber bulk that makes it feel plush rather than dense. It is also most of the roughly eight pounds Alo publishes — the cushioning and the portability problem are the same design decision.',
    },
    {
      title: 'A care regime, not just a mat',
      body: 'Alo’s guidance: wipe the top after every session with a microfiber cloth and a 1-to-20 solution of oil-free soap, never machine wash, roll top-out, and keep lotions and rings away from the surface. Owners who skip this report sweat outlines that set in.',
    },
  ],
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      body: 'Be clear about what this review is. I have not practised on a Warrior Mat. This is a research review, built from Alo’s own product pages and care guidance, the published retailer spec sheet, T3’s tested review, Popsugar’s long-term impressions, and owner threads on Reddit that run from love letters to complaint posts. Where a claim comes from Alo’s marketing rather than an independent source, I say so.\n\nOne more thing worth knowing before you read on: Alo sells this mat direct, and there is no link on this page that buys it — we earn nothing on the Warrior Mat whether you buy it or not. Where we can point you at something buyable that genuinely helps, like a grip towel or a rival mat, we do, and those are the usual affiliate links.\n\nThe short version: a genuinely good premium home mat whose two real costs — the weight and the upkeep — are exactly the things the brand’s marketing photographs cannot show.',
    },
    {
      id: 'grip',
      title: 'Grip — the polyurethane top earns its keep',
      body: 'The grip story is consistent across sources that have actually stood on it. T3’s tester describes a surface that "barely moves as you flow" and scores the mat four stars out of five. Alexia K Yoga, who filmed a hands-on comparison against other premium mats, found very good grip with dry hands and reported it holds up when you sweat. Alo itself claims slip-free performance "wet or dry" — for once, a marketing line the independent reviews broadly agree with.\n\nThe material family matters for expectations. The Warrior’s top is polyurethane leather — the same broad family as the Lululemon and Liforme tops, surfaces that hold damp palms where foam and PVC let them slide. Polyurethane tops typically grip from the first session without a break-in period, and they typically collect dust, lint and pet hair for the same reason they hold skin — our Liforme review documents exactly that trade-off. No published source has tested a brand-new Warrior’s first session specifically, so treat both points as the PU-top expectation rather than a verified fact about this mat. One construction nuance: Liforme and Lululemon document their tops as absorbent, open-cell surfaces, while the Warrior’s spec sheet describes a wipe-only, moisture-wicking leather — related family, not identical build.\n\nWhat the Warrior does not have is structured test data. OutdoorGearLab ran its hands-on wet-grip protocol on the Manduka GRP Adapt and the Liforme; for the Warrior the evidence is reviewer consensus rather than test scores. Strong consensus — but worth naming the difference.',
      image: '/images/reviews/alo/grip.webp',
      imageAlt: 'Two hands pressed flat in downward dog on a smooth matte charcoal mat surface, fingers spread',
      ratings: [
        { label: 'Dry grip', score: 4.4 },
        { label: 'Wet grip', score: 4.4 },
        { label: 'Smooth transitions', score: 4.0 },
      ],
    },
    {
      id: 'comfort',
      title: 'Comfort and space — where it genuinely leads',
      body: 'If grip is where the Warrior matches its premium rivals, comfort and floor space are its strongest cards. The 5mm build over its natural rubber base reads as plush rather than dense: Popsugar’s reviewer calls it thick enough to cushion the joints in every position while staying stable, and T3 lands on "soft, spongy and stable" as the one-line verdict. Kneeling work, low lunges and floor sequences are the poses where owners say the difference from a 4mm mat is obvious.\n\nThe oversized footprint deserves equal billing. At 74.4 by 26.4 inches, taller practitioners stop running their heels off the end, and wide flows stay on the mat. Combined with the cushioning, it is easy to see why the Warrior keeps being described as a home-studio centrepiece rather than a piece of kit.\n\nThe honest counterweight: softness costs a little in standing balance. A plush surface lets hands and feet sink fractionally more than a firm 4mm mat does, which is the usual trade-off for cushioning this comfortable. Reviewers describe the Warrior as stable for its class, not as the firmest platform available.',
      image: '/images/reviews/alo/comfort.webp',
      imageAlt: 'A knee pressing into a thick charcoal mat surface that compresses softly under it, in warm light',
      ratings: [
        { label: 'Cushioning', score: 4.6 },
        { label: 'Joint support', score: 4.5 },
        { label: 'Balance-pose stability', score: 3.8 },
      ],
    },
    {
      id: 'weight-care',
      title: 'Weight and care — the part the photos skip',
      body: 'Here is where the Warrior asks for commitment. Alo publishes the weight as approximately eight pounds, and the size that makes it luxurious at home makes it a burden anywhere else. The most-cited Reddit owner review says it plainly: very high quality, feels worth the money, and "really heavy and would not be suitable for travel". If your mat rides to a studio on your shoulder, this is the wrong mat — not marginally, structurally.\n\nThen there is the upkeep. Alo’s own care guidance asks for a wipe-down after every session with a 1-to-20 oil-free soap solution, no machine washing, rolling top-out so the surface does not crease, and keeping lotions and jewellery away from the top. That is not optional polish: the matte polyurethane shows sweat outlines, oils and scuffs, and owners who let them sit report marks that set in. The same Reddit review lists creasing among its main complaints. A handful of owners have posted about trapped-moisture problems from rolling the mat before it dried — isolated reports, but consistent with how any wipe-only surface fails when stored damp.\n\nA grip towel over the top during sweaty sessions is the cheapest way to keep the surface presentable — it catches the sweat before the mat does.',
      image: '/images/reviews/alo/care.webp',
      imageAlt: 'A large rolled charcoal mat standing by a door with a folded microfiber cloth on top, sweat marks visible on an unrolled section nearby',
      cta: {
        slug: 'manduka-yogitoes',
        productName: 'Manduka Yogitoes',
        label: 'The towel layer that keeps sweat off a polyurethane top:',
      },
      ratings: [
        { label: 'Portability', score: 2.5 },
        { label: 'Ease of care', score: 3.0 },
        { label: 'Sweat-mark resistance', score: 2.5 },
      ],
    },
    {
      id: 'value',
      title: 'Value — what you are actually paying for',
      body: 'The Warrior sits at the premium end of the market, in the same tier as the Lululemon Reversible, the Liforme and the Manduka GRP Adapt. Against that field, what the extra money buys is specific: the largest practice surface of the group, the plushest feel, and the strongest looks. What it does not buy is measured grip superiority, light weight, or low maintenance.\n\nSo the value question is really a lifestyle question. If the mat lives unrolled in a home studio, gets wiped after practice, and doubles as part of the room — the thing it is clearly designed for — owners consistently call it worth it. If it needs to travel, or you want gear that forgives neglect, the same money buys mats that fit that life better.\n\nWorth knowing before ordering direct: the Alo subreddit carries recurring complaints about colours looking different in person than on the site, and about final-sale purchases that could not be returned. Check the current returns policy on the exact colourway before you commit — some are excluded.',
      cta: {
        slug: 'manduka-grp-adapt',
        productName: 'Manduka GRP Adapt',
        label: 'The same-tier mat with measured grip data behind it, if sweat is your priority:',
      },
    },
  ],
  specs: [
    { label: 'Thickness', value: '5 mm' },
    { label: 'Dimensions', value: '74.4" × 26.4" (189 × 67 cm) — oversized' },
    { label: 'Weight', value: '~8 lb (~3.6 kg), per Alo' },
    { label: 'Construction', value: 'Polyurethane-leather top, natural rubber base' },
    { label: 'Materials', value: 'Formaldehyde-free, PVC-free, ethically sourced rubber (per spec sheet)' },
    { label: 'Latex', value: 'Natural rubber base — check with Alo if you have a latex allergy' },
    { label: 'Care', value: 'Wipe-only after each use; not machine washable; roll top-out' },
  ],
  whoFor: [
    'You practise at home and the mat stays unrolled — the weight never bites and the looks pay off daily',
    'You sweat and want a polyurethane top — the surface family built to hold damp palms',
    'You are taller or broader than standard mats accommodate and keep running off the edges',
    'Kneeling poses and floor work are where your current mat hurts — the plush 5mm is the fix',
    'You are willing to wipe the mat down after every session, because this surface demands it',
  ],
  notIdealFor:
    'Anyone who carries their mat to class, wants low-maintenance gear, or needs the firmest possible platform for balance work.',
  whoForImage: '/images/reviews/alo/whofor.webp',
  atAGlance: [
    { label: 'Best for', value: 'Home practice with sweaty grip' },
    { label: 'Grip', value: '4.4' },
    { label: 'Cushioning', value: '4.6' },
    { label: 'Portability', value: '2.5' },
    { label: 'Weight', value: '~8 lb' },
    { label: 'Price', value: '$$$' },
  ],
  verdict:
    'The Warrior Mat is the premium tier’s comfort-and-looks play: an oversized, plush surface whose styling draws more consistent praise than any spec, and grip that independent reviewers rate near the top of its class. Buy it as what it is — a home-studio mat with a care routine attached — and owner threads say it earns its price. Buy it as a carry-everywhere workhorse and its two structural drawbacks, eight pounds and a fussy surface, will find you within a month.',
  alternatives: [
    {
      name: 'Lululemon The Mat',
      badge: 'Closest cross-shop',
      overall: 4.2,
      image: '/images/guides/lululemon-yoga-mat/hero.webp',
      href: '/reviews/lululemon',
    },
    {
      name: 'Manduka GRP Adapt',
      badge: 'Best grip for hot yoga',
      overall: 4.1,
      image: '/images/reviews/manduka-grp-adapt/hero.webp',
      href: '/reviews/manduka-grp-adapt',
    },
    {
      name: 'Liforme Classic',
      badge: 'Grip + alignment guide',
      overall: 4.0,
      image: '/images/reviews/liforme/hero.webp',
      href: '/reviews/liforme',
    },
    {
      name: 'Jade Harmony',
      badge: 'Lighter natural rubber classic',
      overall: 4.2,
      image: '/images/guides/jade-yoga-mat/hero.webp',
      href: '/reviews/jade',
    },
  ],
}
