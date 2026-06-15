import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { JapaneseAccent } from '#/components/ui/japanese-accent'
import { buildImageUrl } from '#/lib/images/variants'
import { HomeTrustBar } from '#/features/home/HomeTrustBar'
import { HomeTopicGrid } from '#/features/home/HomeTopicGrid'
import { HomeFeaturedGuide } from '#/features/home/HomeFeaturedGuide'
import { HomeTopPicks } from '#/features/home/HomeTopPicks'
import { HomeLeadCapture } from '#/features/home/HomeLeadCapture'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'The Yoga Sensei — calm guidance for a real practice' },
      {
        name: 'description',
        content:
          'Honest yoga gear guides and practice notes from Marvin Smit, a long-time practitioner — grounded in research and aggregated reviews, never invented testing.',
      },
      { property: 'og:title', content: 'The Yoga Sensei' },
      {
        property: 'og:description',
        content:
          'Honest yoga gear guides and practice notes from Marvin Smit, a long-time practitioner — grounded in research and aggregated reviews, never invented testing.',
      },
      { property: 'og:url', content: 'https://www.theyogasensei.com/' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:image',
        content: 'https://www.theyogasensei.com/images/brand/home-og.webp',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'The Yoga Sensei' },
      {
        name: 'twitter:description',
        content:
          'Honest yoga gear guides and practice notes from Marvin Smit, a long-time practitioner — grounded in research and aggregated reviews, never invented testing.',
      },
      {
        name: 'twitter:image',
        content: 'https://www.theyogasensei.com/images/brand/home-og.webp',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://www.theyogasensei.com/' }],
  }),
  component: HomePage,
})

// Hand-curated list of pieces that ACTUALLY exist as MDX in this repo.
// Replace with a listFrontmatter helper once we have enough content to
// justify dynamic iteration.
const LATEST_WRITING = [
  {
    to: '/guides/$slug' as const,
    params: { slug: 'eco-friendly-yoga-mat' },
    eyebrow: 'Affiliate guide · Eco mats',
    title: 'Best Eco-Friendly Yoga Mats: 5 Honest Picks',
    description:
      'A calm material-first guide to natural rubber, cork, PU, latex risk and the greenwashing traps around eco yoga mats.',
    image: 'guides/eco-friendly-yoga-mat/hero',
  },
  {
    to: '/guides/$slug' as const,
    params: { slug: 'best-yoga-mat-for-hot-yoga' },
    eyebrow: 'Affiliate guide · Hot yoga',
    title: 'Best Yoga Mat for Hot Yoga: Grip That Survives Sweat',
    description:
      'A practical hot-yoga buying guide covering wet grip, natural rubber, towel pairings and honest mat trade-offs.',
    image: 'guides/best-yoga-mat-for-hot-yoga/hero',
  },
  {
    to: '/guides/$slug' as const,
    params: { slug: 'best-yoga-mat-for-bad-knees' },
    eyebrow: 'Affiliate guide · Bad knees',
    title: 'Best Yoga Mats for Bad Knees: Cushion vs Stability',
    description:
      'How to balance cushion and stability for sore knees — three honest picks, the real thickness trade-off, and cheaper fixes to try first.',
    image: 'guides/best-yoga-mat-for-bad-knees/hero',
  },
  {
    to: '/guides/$slug' as const,
    params: { slug: 'how-to-choose-a-yoga-mat' },
    eyebrow: 'Pillar guide · Yoga mats',
    title: 'How to Choose a Yoga Mat: A Practical Buying Guide',
    description:
      'A clear, honest framework for choosing the right material, thickness, grip, size and durability without fake testing claims.',
    image: 'guides/how-to-choose-a-yoga-mat/hero',
  },
  {
    to: '/guides/$slug' as const,
    params: { slug: 'cork-vs-rubber-yoga-mat' },
    eyebrow: 'Comparison · Cork vs rubber',
    title: 'Cork vs Rubber Yoga Mat: Which One Fits Your Practice',
    description:
      'A material-first comparison — grip wet vs dry, cushion, weight, durability, latex risk, and which surface suits how you actually practise.',
    image: 'guides/cork-vs-rubber-yoga-mat/hero',
  },
  {
    to: '/guides/$slug' as const,
    params: { slug: 'how-thick-should-a-yoga-mat-be' },
    eyebrow: 'Guide · Mat thickness',
    title: 'How Thick Should a Yoga Mat Be? A Practical Thickness Guide',
    description:
      'A clear breakdown of 3mm, 4–5mm and thicker mats for beginners, hot yoga, pilates, travel and joint comfort.',
    image: 'guides/how-thick-should-a-yoga-mat-be/hero',
  },
  {
    to: '/guides/$slug' as const,
    params: { slug: 'how-to-clean-a-yoga-mat' },
    eyebrow: 'Guide · Mat care',
    title: 'How to Clean a Yoga Mat (Without Damaging It)',
    description:
      'Daily wipe-downs, deep cleans, DIY sprays, and material-specific care for rubber, PVC, cork, polyurethane and TPE mats.',
    image: 'guides/how-to-clean-a-yoga-mat/hero',
  },
  {
    to: '/guides/$slug' as const,
    params: { slug: 'how-to-store-a-yoga-mat' },
    eyebrow: 'Guide · Mat care',
    title: 'How to Store a Yoga Mat So It Lasts (and Stays Fresh)',
    description:
      'Clean and dry it first, roll it practice-side in, keep it out of sun and damp, and skip the storage gear you do not actually need.',
    image: 'guides/how-to-store-a-yoga-mat/hero',
  },
  {
    to: '/guides/$slug' as const,
    params: { slug: 'best-yoga-blocks' },
    eyebrow: 'Accessory · Yoga blocks',
    title: 'Best Yoga Blocks: Foam vs Cork, Honestly Compared',
    description:
      'Foam vs cork compared, with three honest picks for support, balance and budget — plus an honest note on when you do not need one yet.',
    image: 'guides/best-yoga-blocks/hero',
  },
  {
    to: '/guides/$slug' as const,
    params: { slug: 'best-yoga-bolster' },
    eyebrow: 'Accessory · Yoga bolsters',
    title: 'Best Yoga Bolsters: Shapes, Fills and Two Honest Picks',
    description:
      'Rectangular vs round, fill and firmness explained, with two honest picks for restorative practice — and when a stack of blankets does the job instead.',
    image: 'guides/best-yoga-bolster/hero',
  },
  {
    to: '/guides/$slug' as const,
    params: { slug: 'best-yoga-mat-bag' },
    eyebrow: 'Accessory · Bags & carriers',
    title: 'Best Yoga Mat Bags and Carriers: A Practical Guide',
    description:
      'Bag vs sling vs carrier, how to check your mat actually fits, and two honest picks for the commute — including the rolled-diameter trap thick mats hit.',
    image: 'guides/best-yoga-mat-bag/hero',
  },
]

function HomePage() {
  return (
    <>
      {/* ============================================================
          HERO — calm wordmark + single primary CTA
          ============================================================ */}
      <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-right bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/brand/home-og.webp')",
            backgroundSize: 'auto 100%',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--color-bg) 0%, rgba(246,241,234,.97) 32%, rgba(246,241,234,.55) 48%, rgba(246,241,234,0) 62%)',
          }}
        />
        <Container size="wide" className="relative">
          <div className="max-w-xl py-24 md:py-32">
            <JapaneseAccent phrase="presence" size="md" className="block" />
            <h1 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight md:text-[56px]">
              Calm guidance for a real yoga practice.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[color:var(--color-ink-muted)] md:text-[17px]">
              Honest gear notes and pose guides from a long-time practitioner.
              No invented testing, no fake rankings — just research, real use
              cases, and clear writing.
            </p>
            <Link
              to="/guides/$slug"
              params={{ slug: 'how-to-choose-a-yoga-mat' }}
              className="mt-9 inline-flex items-center gap-2 rounded-sm bg-[color:var(--color-olive)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
            >
              Read the yoga mat guide
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </Container>
      </section>

      {/* ============================================================
          TRUST BAR — quiet credibility strip under the hero
          ============================================================ */}
      <HomeTrustBar />

      {/* ============================================================
          TOPIC GRID — browse-by-category, deep-links to /guides?category=
          ============================================================ */}
      <HomeTopicGrid />

      {/* ============================================================
          FEATURED GUIDE — dark split band highlighting the flagship roundup
          ============================================================ */}
      <HomeFeaturedGuide />

      {/* ============================================================
          TOP PICKS — editorial-scored mat recommendations -> reviews
          ============================================================ */}
      <HomeTopPicks />

      {/* ============================================================
          LATEST WRITING — hand-curated list of pieces that exist
          ============================================================ */}
      <section className="bg-[color:var(--color-bg)] py-16 md:py-24">
        <Container size="wide">
          <Eyebrow tone="default">Latest writing</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight tracking-tight md:text-[40px]">
            Start with the yoga mat buying guide.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--color-ink-muted)]">
            We publish slowly. Everything on this site is written and edited by
            Marvin — no ghostwriters, no faceless content team.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {LATEST_WRITING.map((post) => (
              <article
                key={post.params.slug}
                className="group overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] transition hover:border-[color:var(--color-accent)]/40"
              >
                <Link to={post.to} params={post.params} className="block">
                  <img
                    src={buildImageUrl(post.image, 'card')}
                    alt={post.title}
                    loading="lazy"
                    width={800}
                    height={1067}
                    className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </Link>
                <div className="p-8">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                    {post.eyebrow}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl leading-snug">
                    <Link
                      to={post.to}
                      params={post.params}
                      className="transition group-hover:text-[color:var(--color-accent-deep)]"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                    {post.description}
                  </p>
                  <Link
                    to={post.to}
                    params={post.params}
                    className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)] transition hover:text-[color:var(--color-accent)]"
                  >
                    Read
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 rounded-sm border border-[color:var(--color-olive)] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-olive)] transition hover:bg-[color:var(--color-olive)] hover:text-[color:var(--color-bg)]"
            >
              View all guides
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </Container>
      </section>

      {/* ============================================================
          ABOUT TEASER — single line of trust, link to about page
          ============================================================ */}
      <section className="bg-[color:var(--color-surface)]">
        <Container size="wide">
          <div className="flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
            <div className="max-w-xl">
              <Eyebrow tone="default">Who writes this</Eyebrow>
              <h2 className="mt-4 font-serif text-2xl leading-tight tracking-tight md:text-[32px]">
                Written by Marvin Smit. Long-time practitioner, not a certified instructor.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
                Read the about page for the methodology, the AI-imagery
                disclosure, and how you can reach me.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-sm border border-[color:var(--color-olive)] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-olive)] transition hover:bg-[color:var(--color-olive)] hover:text-[color:var(--color-bg)]"
            >
              About the author
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </Container>
      </section>

      {/* ============================================================
          LEAD CAPTURE — dark ensō band, closing the homepage
          ============================================================ */}
      <HomeLeadCapture />
    </>
  )
}
