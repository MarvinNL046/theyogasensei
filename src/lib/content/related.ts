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
    title: "Sun Salutation: A Step-by-Step Beginner's Guide to Surya Namaskar A",
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
