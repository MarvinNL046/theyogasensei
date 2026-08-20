// Resolves the `related` frontmatter slugs into ready-to-render sidebar links.
//
// Why a registry: related[] holds content slugs, but some content has moved
// (the six mat reviews now live under /reviews/* and 301-redirect from their
// old /guides/<slug> URLs). Linking through a redirect wastes a hop, so this
// maps every referenced slug straight to its live URL, title and category.
// Unknown slugs (e.g. drafts) are dropped, so a stale related entry can never
// render a broken or redirecting link.

export interface RelatedItem {
  href: string
  title: string
  category: string
}

const REGISTRY: Record<string, RelatedItem> = {
  // Guides (live at /guides/<slug>)
  'best-yoga-blocks': {
    href: '/guides/best-yoga-blocks',
    title: 'Best Yoga Blocks: Foam vs Cork, Honestly Compared',
    category: 'Props',
  },
  'best-yoga-bolster': {
    href: '/guides/best-yoga-bolster',
    title: 'Best Yoga Bolsters: Shapes, Fills and Two Honest Picks',
    category: 'Props',
  },
  'best-yoga-mat-bag': {
    href: '/guides/best-yoga-mat-bag',
    title: 'Best Yoga Mat Bags and Carriers: A Practical Guide',
    category: 'Accessories',
  },
  'best-yoga-mat-for-bad-knees': {
    href: '/guides/best-yoga-mat-for-bad-knees',
    title: 'Best Yoga Mats for Bad Knees: Cushion vs Stability',
    category: 'Buying guide',
  },
  'best-yoga-mat-for-hot-yoga': {
    href: '/guides/best-yoga-mat-for-hot-yoga',
    title: 'Best Yoga Mat for Hot Yoga: Grip That Survives Sweat',
    category: 'Buying guide',
  },
  'best-non-slip-yoga-mat': {
    href: '/guides/best-non-slip-yoga-mat',
    title: 'Best Non-Slip Yoga Mat: 5 Grippy Picks That Hold',
    category: 'Buying guide',
  },
  'how-to-clean-lululemon-yoga-mat': {
    href: '/guides/how-to-clean-lululemon-yoga-mat',
    title: 'How to Clean a Lululemon Yoga Mat Without Ruining It',
    category: 'Mat care',
  },
  'alo-yoga-mat': {
    href: '/reviews/alo',
    title: 'Alo Warrior Mat Review',
    category: 'Reviews',
  },
  'cork-vs-rubber-yoga-mat': {
    href: '/guides/cork-vs-rubber-yoga-mat',
    title: 'Cork vs Rubber Yoga Mat: Which One Fits Your Practice',
    category: 'Comparison',
  },
  'eco-friendly-yoga-mat': {
    href: '/guides/eco-friendly-yoga-mat',
    title: 'Best Eco-Friendly Yoga Mats: 5 Honest Picks',
    category: 'Buying guide',
  },
  'how-thick-should-a-yoga-mat-be': {
    href: '/guides/how-thick-should-a-yoga-mat-be',
    title: 'How Thick Should a Yoga Mat Be?',
    category: 'Buying guide',
  },
  'how-to-choose-a-yoga-mat': {
    href: '/guides/how-to-choose-a-yoga-mat',
    title: 'How to Choose a Yoga Mat: A Practical Buying Guide',
    category: 'Buying guide',
  },
  'how-to-clean-a-yoga-mat': {
    href: '/guides/how-to-clean-a-yoga-mat',
    title: 'How to Clean a Yoga Mat (Without Damaging It)',
    category: 'Mat care',
  },
  'how-to-store-a-yoga-mat': {
    href: '/guides/how-to-store-a-yoga-mat',
    title: 'How to Store a Yoga Mat So It Lasts',
    category: 'Mat care',
  },
  'manduka-vs-lululemon-yoga-mat': {
    href: '/guides/manduka-vs-lululemon-yoga-mat',
    title: 'Manduka vs Lululemon Yoga Mat: Which Should You Buy?',
    category: 'Comparison',
  },
  'alo-vs-lululemon-yoga-mat': {
    href: '/guides/alo-vs-lululemon-yoga-mat',
    title: 'Alo vs Lululemon Yoga Mat: Which One Should You Buy?',
    category: 'Comparison',
  },
  'liforme-vs-lululemon-yoga-mat': {
    href: '/blog/liforme-vs-lululemon-yoga-mat',
    title: 'Liforme vs Lululemon: Which Premium Yoga Mat Suits You?',
    category: 'Comparison',
  },
  'manduka-pro-vs-liforme': {
    href: '/guides/manduka-pro-vs-liforme',
    title: 'Manduka PRO vs Liforme: Grip, Durability and Value Compared',
    category: 'Comparison',
  },
  'manduka-vs-jade-yoga-mat': {
    href: '/guides/manduka-vs-jade-yoga-mat',
    title: 'Manduka vs Jade Yoga Mat: Which One Should You Buy?',
    category: 'Comparison',
  },
  'manduka-pro-vs-prolite': {
    href: '/guides/manduka-pro-vs-prolite',
    title: 'Manduka PRO vs PROlite: Thickness, Weight, Guarantee',
    category: 'Comparison',
  },
  'gaiam-vs-manduka-yoga-mat': {
    href: '/guides/gaiam-vs-manduka-yoga-mat',
    title: 'Gaiam vs Manduka: Which Yoga Mat Is Worth It?',
    category: 'Comparison',
  },
  'yoga-poses-for-2': {
    href: '/guides/yoga-poses-for-2',
    title: 'Yoga Poses for 2: A Safe 15-Minute Beginner Routine',
    category: 'Partner yoga',
  },
  'yoga-for-balance': {
    href: '/guides/yoga-for-balance',
    title: 'Yoga for Balance: A Safe 15-Minute Beginner Practice',
    category: 'Beginner yoga',
  },

  // Chair yoga for seniors cluster (pillar + spokes)
  'chair-yoga-for-seniors': {
    href: '/guides/chair-yoga-for-seniors',
    title: 'Chair Yoga for Seniors: Safe Poses and a Gentle Plan',
    category: 'Chair yoga',
  },
  'free-chair-yoga-for-seniors': {
    href: '/guides/free-chair-yoga-for-seniors',
    title: 'Free Chair Yoga for Seniors: Routines and Classes',
    category: 'Chair yoga',
  },
  'printable-chair-yoga-for-seniors': {
    href: '/guides/printable-chair-yoga-for-seniors',
    title: 'Printable Chair Yoga for Seniors: A Routine Chart',
    category: 'Chair yoga',
  },
  'free-28-day-chair-yoga-for-seniors': {
    href: '/guides/free-28-day-chair-yoga-for-seniors',
    title: 'Free 28-Day Chair Yoga for Seniors: The Full Plan',
    category: 'Chair yoga',
  },
  'chair-yoga-for-beginners': {
    href: '/guides/chair-yoga-for-beginners',
    title: 'Chair Yoga for Beginners: How to Start',
    category: 'Chair yoga',
  },

  // Reviews — keyed by their old content slug; resolve to the live /reviews/* URL.
  'best-yoga-mats-2026': {
    href: '/reviews/best-yoga-mats',
    title: 'Best Yoga Mats for Every Practice (2026)',
    category: 'Reviews',
  },
  'manduka-yoga-mat': {
    href: '/reviews/manduka-pro',
    title: 'Manduka PRO Yoga Mat Review',
    category: 'Reviews',
  },
  'jade-yoga-mat': {
    href: '/reviews/jade',
    title: 'Jade Harmony Yoga Mat Review',
    category: 'Reviews',
  },
  'gaiam-yoga-mat': {
    href: '/reviews/gaiam',
    title: 'Gaiam Premium Yoga Mat Review',
    category: 'Reviews',
  },
  'lululemon-yoga-mat': {
    href: '/reviews/lululemon',
    title: 'Lululemon The Mat Review',
    category: 'Reviews',
  },
  'retrospec-solana-yoga-mat': {
    href: '/reviews/retrospec',
    title: 'Retrospec Solana Yoga Mat Review',
    category: 'Reviews',
  },
  'liforme-yoga-mat': {
    href: '/reviews/liforme',
    title: 'Liforme Yoga Mat Review',
    category: 'Reviews',
  },
  'manduka-grp-yoga-mat': {
    href: '/reviews/manduka-grp-adapt',
    title: 'Manduka GRP Adapt Review',
    category: 'Reviews',
  },
  'best-yoga-mat-towel': {
    href: '/guides/best-yoga-mat-towel',
    title: 'Best Yoga Mat Towel: Which Slipping Problem Do You Have?',
    category: 'Gear',
  },
  'best-foldable-yoga-mat': {
    href: '/guides/best-foldable-yoga-mat',
    title: 'Best Foldable Yoga Mat: Two Kinds, and Most Guides Mix Them Up',
    category: 'Gear',
  },
  'best-yoga-knee-pads': {
    href: '/guides/best-yoga-knee-pads',
    title: 'Best Yoga Knee Pads: Or Would a Folded Blanket Do?',
    category: 'Props',
  },
  'best-pilates-grip-socks': {
    href: '/guides/best-pilates-grip-socks',
    title: 'Best Pilates Grip Socks: What Matters and What Is Just Price',
    category: 'Gear',
  },

  // Yoga-for-beginners cluster (pillar + spokes)
  'yoga-for-beginners': {
    href: '/guides/yoga-for-beginners',
    title: 'Yoga for Beginners: How to Start a Calm Home Practice',
    category: 'Beginners',
  },
  'best-yoga-mat-for-beginners': {
    href: '/guides/best-yoga-mat-for-beginners',
    title: 'Best Yoga Mat for Beginners: 5 Picks for Every Budget',
    category: 'Buying guide',
  },
  'morning-yoga-routine': {
    href: '/guides/morning-yoga-routine',
    title: 'Morning Yoga Routine: A Gentle 10-Minute Flow for Beginners',
    category: 'Practice',
  },
  'sun-salutation': {
    href: '/poses/sun-salutation',
    title:
      "Sun Salutation: A Step-by-Step Beginner's Guide to Surya Namaskar A",
    category: 'Poses',
  },
  'sun-salutation-b': {
    href: '/poses/sun-salutation-b',
    title: 'Sun Salutation B: A Step-by-Step Guide to Surya Namaskar B',
    category: 'Poses',
  },
  'sun-salutation-c': {
    href: '/poses/sun-salutation-c',
    title: 'Sun Salutation C: A Step-by-Step Guide to Surya Namaskar C',
    category: 'Poses',
  },

  // Poses (live at /poses/<slug>)
  'childs-pose': {
    href: '/poses/childs-pose',
    title: "Child's Pose: A Calm, Restful Guide to Balasana",
    category: 'Poses',
  },
  'cobra-pose': {
    href: '/poses/cobra-pose',
    title: 'Cobra Pose: A Gentle Guide to Bhujangasana',
    category: 'Poses',
  },
  'downward-facing-dog': {
    href: '/poses/downward-facing-dog',
    title: 'Downward Facing Dog: A Calm Guide to Adho Mukha Svanasana',
    category: 'Poses',
  },
  'pigeon-pose': {
    href: '/poses/pigeon-pose',
    title: 'Pigeon Pose: A Kind Guide to Eka Pada Rajakapotasana',
    category: 'Poses',
  },
  'warrior-ii': {
    href: '/poses/warrior-ii',
    title: 'Warrior II: A Steady Guide to Virabhadrasana II',
    category: 'Poses',
  },
  // Backfilled 2026-08-20: these pages were referenced by related[] on
  // live articles but had no entry here, so resolveRelated() dropped them
  // and those sidebars rendered short or empty.

  // Mat materials — the subpillar set behind /materials
  'natural-rubber-yoga-mat': {
    href: '/guides/natural-rubber-yoga-mat',
    title: 'Natural Rubber Yoga Mat Guide: 5 Picks by Grip and Thickness',
    category: 'Materials',
  },
  'tpe-yoga-mat': {
    href: '/guides/tpe-yoga-mat',
    title: 'TPE Yoga Mat Guide: Material, Grip and 3 Source-Checked Picks',
    category: 'Materials',
  },
  'cork-yoga-mat': {
    href: '/guides/cork-yoga-mat',
    title: 'Cork Yoga Mat Guide: 5 Source-Checked Picks for Grip and Travel',
    category: 'Materials',
  },
  'jute-yoga-mat': {
    href: '/guides/jute-yoga-mat',
    title: 'Jute Yoga Mat Guide: Texture, Backings and 2 Verified Picks',
    category: 'Materials',
  },
  'pvc-yoga-mat': {
    href: '/guides/pvc-yoga-mat',
    title: 'PVC Yoga Mat Guide: Material, Grip and 3 Verified Options',
    category: 'Materials',
  },
  'suede-yoga-mat': {
    href: '/guides/suede-yoga-mat',
    title: 'Suede Yoga Mat Guide: Surface, Backings and 3 Verified Options',
    category: 'Materials',
  },
  'hemp-yoga-mat': {
    href: '/guides/hemp-yoga-mat',
    title: 'Hemp Yoga Mat Guide: Construction, Grip and Green Claims',
    category: 'Materials',
  },
  'eva-yoga-mat': {
    href: '/guides/eva-yoga-mat',
    title: 'EVA Yoga Mat Guide: Foam, Density and 2 Verified Options',
    category: 'Materials',
  },
  'nbr-yoga-mat': {
    href: '/guides/nbr-yoga-mat',
    title: 'NBR Yoga Mat Guide: Foam, Thickness and 2 Verified Options',
    category: 'Materials',
  },
  'cotton-yoga-mat': {
    href: '/guides/cotton-yoga-mat',
    title: 'Cotton Yoga Mat Guide: Weaves, Backings and Organic Claims',
    category: 'Materials',
  },
  'high-density-yoga-mat': {
    href: '/guides/high-density-yoga-mat',
    title: 'High-Density Yoga Mats: What the Label Actually Means',
    category: 'Materials',
  },

  // Mat specs and buying guides
  'best-thick-yoga-mat': {
    href: '/guides/best-thick-yoga-mat',
    title: 'Best Thick Yoga Mat: 3 Honest Picks for Cushion and Stability',
    category: 'Buying guide',
  },
  'best-pilates-mat': {
    href: '/guides/best-pilates-mat',
    title: 'Best Pilates Mat: Thickness, Picks and the Yoga Mat Myth',
    category: 'Buying guide',
  },
  'yoga-mat-size': {
    href: '/guides/yoga-mat-size',
    title: 'Yoga Mat Size Guide: Dimensions and 6 Current Examples',
    category: 'Buying guide',
  },
  'yoga-mat-weight': {
    href: '/guides/yoga-mat-weight',
    title: 'Yoga Mat Weight Guide: 7 Current Mats Compared',
    category: 'Buying guide',
  },
  'yoga-mat-alternatives': {
    href: '/guides/yoga-mat-alternatives',
    title: 'Yoga Mat Alternatives: What Actually Replaces a Mat?',
    category: 'Buying guide',
  },

  // Mat head-to-heads
  'yoga-rug-vs-mat': {
    href: '/guides/yoga-rug-vs-mat',
    title: 'Yoga Rug vs Mat: Woven Surface or Engineered Grip?',
    category: 'Comparison',
  },
  'open-cell-vs-closed-cell-yoga-mat': {
    href: '/guides/open-cell-vs-closed-cell-yoga-mat',
    title: 'Open-Cell vs Closed-Cell Yoga Mats: The Real Difference',
    category: 'Comparison',
  },
  'yoga-mat-vs-exercise-mat': {
    href: '/guides/yoga-mat-vs-exercise-mat',
    title: 'Yoga Mat vs Exercise Mat: Choose by Function',
    category: 'Comparison',
  },

  // Living with the mat — care, storage, carrying
  'how-long-does-a-yoga-mat-last': {
    href: '/guides/how-long-does-a-yoga-mat-last',
    title: 'How Long Does a Yoga Mat Last? 4 Tests Before You Replace It',
    category: 'Mat care',
  },
  'yoga-mat-on-carpet': {
    href: '/guides/yoga-mat-on-carpet',
    title: 'Yoga Mat on Carpet: A Stability-First Setup Guide',
    category: 'Mat care',
  },
  'yoga-mat-rack': {
    href: '/guides/yoga-mat-rack',
    title: 'Yoga Mat Rack Guide: Wall Type, Capacity and Mat Compatibility',
    category: 'Mat care',
  },
  'which-side-of-yoga-mat-to-use': {
    href: '/guides/which-side-of-yoga-mat-to-use',
    title: 'Which Side of a Yoga Mat Goes Up? 6 Reliable Clues',
    category: 'Mat care',
  },
  'how-to-use-yoga-mat-strap': {
    href: '/guides/how-to-use-yoga-mat-strap',
    title: 'How to Use a Yoga Mat Strap: 3 Carry Methods',
    category: 'Mat care',
  },

  // Props
  'best-yoga-blanket': {
    href: '/guides/best-yoga-blanket',
    title: 'Best Yoga Blankets: 5 Source-Checked Weaves and Weights',
    category: 'Props',
  },
  'yoga-props': {
    href: '/guides/yoga-props',
    title: 'Yoga Props Guide: What You Need and What Can Wait',
    category: 'Props',
  },
  'yoga-strap': {
    href: '/guides/yoga-strap',
    title: 'Yoga Strap Buying Guide: Length, Buckle and Material',
    category: 'Props',
  },
  'yoga-block-size': {
    href: '/guides/yoga-block-size',
    title: 'Yoga Block Size Guide: 3-Inch vs 4-Inch Dimensions',
    category: 'Props',
  },
  'yoga-wedge': {
    href: '/guides/yoga-wedge',
    title: 'Yoga Wedge Guide: Size, Slope, Foam and Cork Compared',
    category: 'Props',
  },
  'yoga-sandbag': {
    href: '/guides/yoga-sandbag',
    title: 'Yoga Sandbag Guide: Weights, Liners, Fill and Safe Buying',
    category: 'Props',
  },
  'wooden-yoga-block': {
    href: '/guides/wooden-yoga-block',
    title: 'Wooden Yoga Blocks: Construction, Weight and Buying Guide',
    category: 'Props',
  },
  'cork-yoga-block': {
    href: '/guides/cork-yoga-block',
    title: 'Cork Yoga Blocks: Density, Size, Weight and Care',
    category: 'Props',
  },
  'yoga-block-and-strap-set': {
    href: '/guides/yoga-block-and-strap-set',
    title: 'Yoga Block and Strap Sets: What to Check Before Buying',
    category: 'Props',
  },
  'best-yoga-wheel': {
    href: '/guides/best-yoga-wheel',
    title: 'Best Yoga Wheels: 4 Source-Checked Constructions',
    category: 'Props',
  },
  'yoga-gloves': {
    href: '/guides/yoga-gloves',
    title: 'Yoga Gloves Guide: Grip, Fit, Padding and Care',
    category: 'Props',
  },

  // Meditation gear
  'best-meditation-cushion': {
    href: '/guides/best-meditation-cushion',
    title: 'Best Meditation Cushions: 4 Source-Checked Formats',
    category: 'Meditation',
  },
  'meditation-bench': {
    href: '/guides/meditation-bench',
    title: 'Best Meditation Benches: Height, Hinges and Seat Design',
    category: 'Meditation',
  },
  'meditation-room-accessories': {
    href: '/guides/meditation-room-accessories',
    title: 'Meditation Room Accessories: Build a Calm, Practical Space',
    category: 'Meditation',
  },
  'meditation-cushion-set': {
    href: '/guides/meditation-cushion-set',
    title: 'Meditation Cushion Sets: Zafu and Zabuton Buying Guide',
    category: 'Meditation',
  },
  'meditation-chair': {
    href: '/guides/meditation-chair',
    title: 'Meditation Chairs: Floor, Folding and Cross-Legged Formats',
    category: 'Meditation',
  },
  'yoga-eye-pillow': {
    href: '/guides/yoga-eye-pillow',
    title: 'Best Yoga Eye Pillows: Fill, Fabric, Weight and Care',
    category: 'Meditation',
  },

  // Carrying and storing the kit
  'yoga-equipment-storage': {
    href: '/guides/yoga-equipment-storage',
    title: 'Yoga Equipment Storage: Plan Mats, Blocks, Blankets and Bolsters',
    category: 'Accessories',
  },
  'gym-bag-with-yoga-mat-holder': {
    href: '/guides/gym-bag-with-yoga-mat-holder',
    title: 'Gym Bag with Yoga Mat Holder: Fit, Attachment and Packing Guide',
    category: 'Accessories',
  },

  // Clothing
  'yoga-pants-for-men': {
    href: '/guides/yoga-pants-for-men',
    title: 'Yoga Pants for Men: 6 Source-Checked Picks by Fit and Practice',
    category: 'Gear',
  },
  'yoga-clothes-for-men': {
    href: '/guides/yoga-clothes-for-men',
    title: 'Yoga Clothes for Men: What to Wear to Every Type of Class',
    category: 'Gear',
  },

  // Styles and practice resources
  'hatha-vs-vinyasa': {
    href: '/guides/hatha-vs-vinyasa',
    title: 'Hatha vs Vinyasa Yoga: Which Style Fits You Better?',
    category: 'Styles',
  },
  'bedtime-yoga': {
    href: '/guides/bedtime-yoga',
    title: 'Bedtime Yoga: A Gentle 10-Minute Routine to Wind Down',
    category: 'Practice',
  },
  'best-yoga-books': {
    href: '/guides/best-yoga-books',
    title: 'Best Yoga Books: 6 Thoughtful Picks for Practice and Study',
    category: 'Books',
  },
  'best-yoga-app': {
    href: '/guides/best-yoga-app',
    title: 'Best Yoga Apps: 5 Honest Picks for Different Practice Styles',
    category: 'Apps',
  },
}

/**
 * Map related[] content slugs to renderable sidebar links. Drops unknown slugs
 * and the current page, de-dupes by destination, and caps the list.
 */
export function resolveRelated(
  slugs: ReadonlyArray<string> | undefined,
  opts: { exclude?: string; limit?: number } = {},
): RelatedItem[] {
  if (!slugs?.length) return []
  const { exclude, limit = 5 } = opts
  const out: RelatedItem[] = []
  const seen = new Set<string>()
  for (const slug of slugs) {
    if (slug === exclude) continue
    const item = REGISTRY[slug]
    if (!item || seen.has(item.href)) continue
    seen.add(item.href)
    out.push(item)
    if (out.length >= limit) break
  }
  return out
}
