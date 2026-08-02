import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpenCheck,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Container } from '#/components/ui/container'
import { HomeLeadCapture } from '#/features/home/HomeLeadCapture'
import { buildImageUrl } from '#/lib/images/variants'
import { listContentSlugs, loadFrontmatter } from '#/lib/mdx/loader'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'The Yoga Sensei — independent yoga guidance' },
      {
        name: 'description',
        content:
          'Research-led yoga practice, pose and gear guidance with clear sources, honest trade-offs and no paid rankings or invented testing.',
      },
      {
        property: 'og:title',
        content: 'The Yoga Sensei — practice with clarity',
      },
      {
        property: 'og:description',
        content: 'Independent guidance for yoga practice, poses and gear.',
      },
      { property: 'og:url', content: 'https://www.theyogasensei.com/' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:image',
        content:
          'https://www.theyogasensei.com/images/brand/home-og-advisor.webp',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: 'https://www.theyogasensei.com/' }],
  }),
  loader: () => ({
    poses: listContentSlugs('poses')
      .slice(0, 6)
      .map((slug) => {
        const { frontmatter: fm } = loadFrontmatter('poses', slug)
        return {
          slug,
          title: fm.title.split(/[:—]/)[0]?.trim() ?? fm.title,
          heroImage: fm.heroImage,
        }
      }),
  }),
  component: HomePage,
})

const topStories = [
  {
    label: 'Best gear',
    title: 'The best yoga mats, organized by how you practise',
    href: '/reviews/best-yoga-mats',
  },
  {
    label: 'Comparison',
    title: 'Cork vs rubber: the grip and care differences',
    href: '/guides/cork-vs-rubber-yoga-mat',
  },
  {
    label: 'Beginner guide',
    title: 'How to start yoga at home without overcomplicating it',
    href: '/guides/yoga-for-beginners',
  },
  {
    label: 'Care',
    title: 'Clean a yoga mat without damaging its surface',
    href: '/guides/how-to-clean-a-yoga-mat',
  },
] as const

const needs = [
  { title: 'Start yoga', note: 'A calm first week', href: '/starter-guide' },
  {
    title: 'Build a routine',
    note: 'Practice that fits real life',
    href: '/practice',
  },
  { title: 'Learn poses', note: 'Cues and variations', href: '/poses' },
  {
    title: 'Choose a mat',
    note: 'Material before marketing',
    href: '/guides/how-to-choose-a-yoga-mat',
  },
  {
    title: 'Support sensitive joints',
    note: 'Cushion without losing stability',
    href: '/guides/best-yoga-mat-for-bad-knees',
  },
  {
    title: 'Create a calm space',
    note: 'Useful meditation setup',
    href: '/guides/meditation-room-accessories',
  },
] as const

const quickPicks = [
  {
    best: 'Best overall guide',
    title: 'Best yoga mats',
    reason: 'Compare grip, cushion and materials',
    tradeoff: 'No single mat suits every practice',
    href: '/reviews/best-yoga-mats',
  },
  {
    best: 'Best for beginners',
    title: 'Beginner yoga mats',
    reason: 'Stable, versatile starting options',
    tradeoff: 'Skip premium features you do not need',
    href: '/guides/best-yoga-mat-for-beginners',
  },
  {
    best: 'Best for sweat',
    title: 'Hot-yoga mats',
    reason: 'Wet grip and cleaning come first',
    tradeoff: 'Absorbent surfaces need more care',
    href: '/guides/best-yoga-mat-for-hot-yoga',
  },
  {
    best: 'Best for knee comfort',
    title: 'Supportive mats',
    reason: 'Balance cushioning and stability',
    tradeoff: 'Thicker is not always steadier',
    href: '/guides/best-yoga-mat-for-bad-knees',
  },
  {
    best: 'Best for packing',
    title: 'Foldable mats',
    reason: 'Thin enough for real travel',
    tradeoff: 'Less floor cushioning',
    href: '/guides/best-foldable-yoga-mat',
  },
] as const

const practice = [
  {
    title: 'Morning yoga',
    image: '/images/brand/article-hero-morning-yoga.webp',
    href: '/guides/morning-yoga-routine',
  },
  {
    title: 'Yoga for beginners',
    image: '/images/guides/yoga-for-beginners/hero.webp',
    href: '/guides/yoga-for-beginners',
  },
  {
    title: 'Chair yoga',
    image: '/images/guides/chair-yoga-for-seniors/hero.webp',
    href: '/guides/chair-yoga-for-seniors',
  },
] as const

function SectionHead({
  kicker,
  title,
  href,
  link = 'Explore all',
}: {
  kicker: string
  title: string
  href?: string
  link?: string
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
          {kicker}
        </p>
        <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight tracking-[-0.035em] md:text-[42px]">
          {title}
        </h2>
      </div>
      {href ? (
        <Link
          to={href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-olive-deep)]"
        >
          {link}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  )
}

function HomePage() {
  const { poses } = Route.useLoaderData()
  return (
    <>
      <section className="bg-[color:var(--color-bg)]">
        <Container size="wide" className="py-7 md:py-10">
          <div className="grid gap-5 lg:grid-cols-[1.55fr_.8fr_.72fr]">
            <a
              href="/guides/yoga-for-beginners"
              className="group relative min-h-[520px] overflow-hidden rounded-[1.8rem] bg-[color:var(--color-olive-deep)]"
            >
              <img
                src="/images/guides/yoga-for-beginners/hero.webp"
                alt="A calm home yoga practice in natural light"
                width={1200}
                height={900}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#122b24]/95 via-[#122b24]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">
                  The starting point
                </p>
                <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-[1.05] tracking-[-0.04em] md:text-5xl">
                  Start yoga with a plan you can actually keep.
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                  A practical first routine, foundational poses and the setup
                  choices that matter—without turning day one into a shopping
                  list.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  Start the beginner guide <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href="/guides/how-to-choose-a-yoga-mat"
                className="group overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-white"
              >
                <img
                  src="/images/guides/how-to-choose-a-yoga-mat/materials.webp"
                  alt="Yoga mat material samples"
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
                    Gear decision
                  </p>
                  <h2 className="mt-2 font-serif text-2xl leading-tight">
                    Choose a mat by material, not hype.
                  </h2>
                </div>
              </a>
              <a
                href="/guides/morning-yoga-routine"
                className="group overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-white"
              >
                <img
                  src="/images/brand/article-hero-morning-yoga.webp"
                  alt="Morning yoga practice"
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
                    10-minute practice
                  </p>
                  <h2 className="mt-2 font-serif text-2xl leading-tight">
                    A quieter way to start the morning.
                  </h2>
                </div>
              </a>
            </div>
            <aside className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
                Top stories
              </p>
              <ol className="mt-4">
                {topStories.map((story, index) => (
                  <li
                    key={story.href}
                    className="border-t border-[color:var(--color-border)] first:border-0"
                  >
                    <a
                      href={story.href}
                      className="group grid grid-cols-[2rem_1fr] gap-3 py-5"
                    >
                      <span className="font-serif text-xl text-[color:var(--color-accent)]">
                        {index + 1}
                      </span>
                      <span>
                        <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
                          {story.label}
                        </span>
                        <span className="mt-1 block font-serif text-lg leading-snug group-hover:text-[color:var(--color-olive)]">
                          {story.title}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-y border-[color:var(--color-border)] bg-white">
        <Container size="wide">
          <div className="grid grid-cols-2 divide-x divide-y divide-[color:var(--color-border)] md:grid-cols-4 md:divide-y-0">
            {[
              [ShieldCheck, 'Independent', 'No paid rankings'],
              [BookOpenCheck, 'Source-aware', 'Primary sources first'],
              [Scale, 'Trade-offs shown', 'Best for and skip if'],
              [Sparkles, 'Human edited', 'No invented testing'],
            ].map(([Icon, title, note]) => {
              const I = Icon as typeof ShieldCheck
              return (
                <div
                  key={title as string}
                  className="flex gap-3 px-4 py-6 md:px-6"
                >
                  <I className="h-5 w-5 shrink-0 text-[color:var(--color-olive)]" />
                  <span>
                    <strong className="block text-xs">{title as string}</strong>
                    <span className="mt-1 block text-[11px] text-[color:var(--color-ink-muted)]">
                      {note as string}
                    </span>
                  </span>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="bg-[color:var(--color-bg)] py-16 md:py-24">
        <Container size="wide">
          <SectionHead
            kicker="Find your next step"
            title="What do you need help with?"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {needs.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-center gap-5 rounded-2xl border border-[color:var(--color-border)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[color:var(--color-olive-soft)]"
              >
                <span className="font-serif text-2xl text-[color:var(--color-accent)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block font-serif text-xl group-hover:text-[color:var(--color-olive)]">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm text-[color:var(--color-ink-muted)]">
                    {item.note}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[color:var(--color-olive-deep)] py-16 text-white md:py-24">
        <Container size="wide">
          <SectionHead
            kicker="Quick picks"
            title="Find the right gear for your practice."
            href="/best"
            link="Explore best gear"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {quickPicks.map((pick) => (
              <a
                key={pick.href}
                href={pick.href}
                className="rounded-2xl bg-white/8 p-6 ring-1 ring-white/15 transition hover:-translate-y-1 hover:bg-white/12"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-accent-soft)]">
                  {pick.best}
                </span>
                <h3 className="mt-3 font-serif text-2xl">{pick.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/75">
                  {pick.reason}
                </p>
                <p className="mt-4 border-t border-white/15 pt-4 text-xs leading-relaxed text-white/55">
                  <strong className="text-white/75">Trade-off:</strong>{' '}
                  {pick.tradeoff}
                </p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[color:var(--color-bg)] py-16 md:py-24">
        <Container size="wide">
          <SectionHead
            kicker="Practice"
            title="Build a practice that fits real life."
            href="/practice"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {practice.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-white"
              >
                <img
                  src={item.image}
                  alt=""
                  className="aspect-[3/2] w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="font-serif text-2xl group-hover:text-[color:var(--color-olive)]">
                    {item.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[color:var(--color-ink-muted)]">
                    Open guide <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {poses.length ? (
        <section className="bg-[color:var(--color-surface-muted)] py-16 md:py-24">
          <Container size="wide">
            <SectionHead
              kicker="Pose library"
              title="Learn the foundations, one pose at a time."
              href="/poses"
            />
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {poses.map((pose) => (
                <Link
                  key={pose.slug}
                  to="/poses/$slug"
                  params={{ slug: pose.slug }}
                  className="group"
                >
                  <div className="overflow-hidden rounded-2xl bg-white">
                    <img
                      src={buildImageUrl(pose.heroImage, 'card')}
                      alt={pose.title}
                      className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="mt-3 font-serif text-lg leading-snug group-hover:text-[color:var(--color-olive)]">
                    {pose.title}
                  </h3>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-[color:var(--color-bg)] py-16 md:py-24">
        <Container size="wide">
          <div className="grid overflow-hidden rounded-[2rem] border border-[color:var(--color-border)] bg-white lg:grid-cols-[.8fr_1.2fr]">
            <div className="bg-[color:var(--color-surface-muted)] p-8 md:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
                Why trust us
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">
                Useful advice should show its work.
              </h2>
              <p className="mt-5 leading-relaxed text-[color:var(--color-ink-soft)]">
                See exactly how we separate official specifications, independent
                evidence, practitioner observation and editorial inference.
              </p>
              <Link
                to="/how-we-research"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-olive)] px-5 py-3 text-sm font-semibold text-white"
              >
                How we research <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2">
              {[
                [
                  'Sources checked',
                  'We begin with primary and authoritative documentation.',
                ],
                [
                  'No invented testing',
                  'Research-only reviews are labelled as such.',
                ],
                [
                  'Relationships disclosed',
                  'Commercial links never purchase a ranking.',
                ],
                [
                  'Changes documented',
                  'Meaningful corrections and updates stay visible.',
                ],
              ].map(([title, note]) => (
                <div
                  key={title}
                  className="border-b border-r border-[color:var(--color-border)] p-8 md:p-10"
                >
                  <h3 className="font-serif text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <HomeLeadCapture />
    </>
  )
}
