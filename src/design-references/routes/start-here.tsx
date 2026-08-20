import { Link, createFileRoute } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Flower2,
  Heart,
  Infinity as InfinityIcon,
  Leaf,
  MoveRight,
  Star,
  UserRound,
} from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

export const Route = createFileRoute('/start-here')({
  head: () => ({
    meta: [
      { title: 'Beginner Yoga Roadmap — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Start yoga with a calm beginner roadmap: foundations, consistency, deeper practice, essential guides and beginner-friendly gear.',
      },
      { property: 'og:type', content: 'website' },
    ],
    links: [{ rel: 'canonical', href: 'https://theyogasensei.com/start-here' }],
  }),
  component: StartHerePage,
})

const ROADMAP = [
  {
    number: '1',
    title: 'Foundations',
    period: 'Weeks 1-2',
    icon: UserRound,
    intro: 'Learn the basics and build a strong foundation.',
    points: [
      'Understanding yoga',
      'Basic poses & alignment',
      'Breathing fundamentals',
      'Creating your space',
      '2-3 short practices/week',
    ],
  },
  {
    number: '2',
    title: 'Build Consistency',
    period: 'Weeks 3-6',
    icon: CalendarDays,
    intro: 'Create a habit and explore more movement.',
    points: [
      'Establish a routine',
      'Build strength & flexibility',
      'Explore different styles',
      'Mindfulness basics',
      '3-4 practices/week',
    ],
  },
  {
    number: '3',
    title: 'Deepen Your Practice',
    period: 'Weeks 7-12',
    icon: Flower2,
    intro: 'Deepen your practice and connect mind & body.',
    points: [
      'More challenging poses',
      'Pranayama breathwork',
      'Body awareness',
      'Focus & presence',
      '4-5 practices/week',
    ],
  },
  {
    number: '4',
    title: 'Make It Lifestyle',
    period: 'Ongoing',
    icon: InfinityIcon,
    intro: 'Integrate yoga into your daily life.',
    points: [
      'Advanced variations',
      'Teach & inspire others',
      'Live with intention',
      'Sustain your practice',
      'Yoga as a way of life',
    ],
  },
] as const

const ESSENTIALS = [
  {
    title: 'What Is Yoga?',
    description: 'Understand the history, benefits and philosophy.',
    meta: '5 min read · Guide',
    image: '/images/aiko-persona/aiko-seated-twist-yoga-pose.webp',
  },
  {
    title: 'Essential Yoga Poses for Beginners',
    description: '10 must-know poses to build your foundation.',
    meta: '8 min read · Guide',
    image: '/images/brand/review-hero-best-mats.webp',
  },
  {
    title: 'Breathing 101: Pranayama Basics',
    description: 'Learn simple breathing techniques to calm your body.',
    meta: '6 min read · Guide',
    image: '/images/aiko-persona/aiko-meditation-back-view-sage-yoga-mat.webp',
  },
  {
    title: 'How to Create a Home Yoga Space',
    description: 'Tips to design a space that supports practice.',
    meta: '7 min read · Guide',
    image: '/images/brand/pick-manduka-pro.webp',
  },
  {
    title: 'How Often Should You Practice Yoga?',
    description: 'Find the right frequency for your goals and lifestyle.',
    meta: '6 min read · Guide',
    image: '/images/aiko-persona/aiko-childs-pose-sage-yoga-mat.webp',
  },
] as const

const GEAR = [
  {
    badge: 'Best Mat',
    name: 'Manduka PRO Yoga Mat',
    image: '/images/brand/pick-manduka-pro.webp',
    rating: 4.8,
    price: '$128',
    href: '/reviews/manduka-pro',
  },
  {
    badge: 'Best Block',
    name: 'Cork Yoga Block',
    image: '/images/brand/pick-cork-blocks.webp',
    rating: 4.7,
    price: '$22',
    href: '#',
  },
  {
    badge: 'Best Strap',
    name: 'Yoga Strap',
    image: '/images/brand/pick-cotton-strap.webp',
    rating: 4.6,
    price: '$14',
    href: '#',
  },
  {
    badge: 'Best Bolster',
    name: 'Yoga Bolster',
    image: '/images/brand/pick-studio-bolster.webp',
    rating: 4.8,
    price: '$69',
    href: '#',
  },
] as const

function StartHerePage() {
  return (
    <>
      <StartHero />
      <RoadmapSection />
      <EssentialsSection />
      <GearSection />
      <CommunityCta />
    </>
  )
}

function StartHero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{
          backgroundImage: "url('/images/brand/review-hero-best-mats.webp')",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, var(--color-bg) 0%, rgba(246,241,234,.96) 34%, rgba(246,241,234,.34) 62%, rgba(246,241,234,0) 100%)',
        }}
      />
      <Container size="wide" className="relative">
        <div className="max-w-xl py-12 md:min-h-[430px] md:py-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center text-xs text-[color:var(--color-ink-muted)]">
              <li>
                <Link
                  to="/"
                  className="transition hover:text-[color:var(--color-accent-deep)]"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="mx-2 opacity-50">
                ›
              </li>
              <li>Start Here</li>
              <li aria-hidden="true" className="mx-2 opacity-50">
                ›
              </li>
              <li aria-current="page" className="text-[color:var(--color-ink)]">
                Beginner Roadmap
              </li>
            </ol>
          </nav>

          <Eyebrow tone="accent">Start here</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-[color:var(--color-ink)] md:text-[64px]">
            Your Beginner
            <br />
            Yoga Roadmap
          </h1>
          <p className="mt-7 max-w-md text-base leading-8 text-[color:var(--color-ink-soft)]">
            A clear, simple path to help you build a consistent practice, step
            by step. No experience needed, just a willingness to begin.
          </p>

          <div className="mt-9 grid max-w-lg grid-cols-3 gap-6">
            <HeroPoint
              icon={Leaf}
              title="Beginner Friendly"
              text="No experience needed."
            />
            <HeroPoint
              icon={Clock3}
              title="Progress at Your Pace"
              text="Small steps, lasting change."
            />
            <HeroPoint
              icon={Heart}
              title="Practice with Purpose"
              text="For body, mind & life."
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

function RoadmapSection() {
  return (
    <section className="bg-[color:var(--color-bg)] py-16 md:py-20">
      <Container size="wide">
        <div className="text-center">
          <Eyebrow tone="accent">The 4 Step Roadmap</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-[color:var(--color-ink)] md:text-5xl">
            Build Your Practice. Transform Your Life.
          </h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">
            Follow the path below to build confidence, consistency and
            connection.
          </p>
        </div>

        <div className="relative mt-12 grid gap-10 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-6 hidden border-t border-dotted border-[color:var(--color-border)] lg:block"
          />
          {ROADMAP.map((step) => (
            <RoadmapStep key={step.number} step={step} />
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/64 px-8 py-5 text-center shadow-sm">
          <p className="font-serif text-xl text-[color:var(--color-ink)]">
            There is no rush. Your only goal is progress, not perfection.
          </p>
          <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">
            Show up, be kind to yourself, and enjoy the journey.
          </p>
        </div>
      </Container>
    </section>
  )
}

function RoadmapStep({ step }: { step: (typeof ROADMAP)[number] }) {
  const Icon = step.icon
  return (
    <article className="relative text-center">
      <div className="relative z-10 mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-olive)] text-sm font-semibold text-[color:var(--color-bg)]">
        {step.number}
      </div>
      <h3 className="mt-5 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
        {step.title}
      </h3>
      <p className="mt-1 text-xs text-[color:var(--color-ink-muted)]">
        {step.period}
      </p>
      <div className="mx-auto mt-7 flex h-20 w-20 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/70">
        <Icon
          className="h-9 w-9 text-[color:var(--color-olive)]"
          strokeWidth={1.35}
        />
      </div>
      <p className="mx-auto mt-7 max-w-[13rem] text-sm leading-6 text-[color:var(--color-ink-soft)]">
        {step.intro}
      </p>
      <ul className="mx-auto mt-5 max-w-[13rem] space-y-2 text-left text-xs leading-5 text-[color:var(--color-ink-soft)]">
        {step.points.map((point) => (
          <li key={point} className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--color-olive)]" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

function EssentialsSection() {
  return (
    <section className="bg-[color:var(--color-bg)] pb-14">
      <Container size="wide">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow tone="accent">Learn the essentials</Eyebrow>
            <h2 className="mt-3 font-serif text-4xl text-[color:var(--color-ink)]">
              Start with the Basics
            </h2>
          </div>
          <a
            href="/guides"
            className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink)] md:inline-flex"
          >
            View all guides <MoveRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {ESSENTIALS.map((item) => (
            <a
              key={item.title}
              href="#"
              className="overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/72 transition hover:-translate-y-0.5"
            >
              <img
                src={item.image}
                alt=""
                width={260}
                height={170}
                className="h-36 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="font-serif text-xl leading-tight text-[color:var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 min-h-16 text-sm leading-6 text-[color:var(--color-ink-soft)]">
                  {item.description}
                </p>
                <p className="mt-5 text-xs text-[color:var(--color-ink-muted)]">
                  {item.meta}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}

function GearSection() {
  return (
    <section className="bg-[color:var(--color-bg)] pb-14">
      <Container size="wide">
        <div className="grid gap-5 lg:grid-cols-[390px_minmax(0,1fr)]">
          <section
            className="overflow-hidden rounded-md border border-[color:var(--color-border)] bg-cover bg-left-bottom p-8 md:p-10"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,253,249,.94), rgba(255,253,249,.72)), url('/images/brand/newsletter-bonsai.webp')",
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
              Recommended for beginners
            </p>
            <h2 className="mt-4 max-w-[16rem] font-serif text-4xl leading-tight text-[color:var(--color-ink)]">
              Gear That Supports Your Journey
            </h2>
            <p className="mt-5 max-w-[18rem] text-sm leading-7 text-[color:var(--color-ink-soft)]">
              Quality tools can support comfort, consistency and confidence as
              you begin.
            </p>
            <a
              href="/gear"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-[color:var(--color-olive)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-bg)]"
            >
              See beginner gear <MoveRight className="h-4 w-4" />
            </a>
          </section>

          <div className="relative">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {GEAR.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/76 transition hover:-translate-y-0.5"
                >
                  <img
                    src={item.image}
                    alt=""
                    width={220}
                    height={150}
                    className="h-32 w-full object-cover"
                  />
                  <div className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
                      {item.badge}
                    </p>
                    <h3 className="mt-2 min-h-10 font-sans text-sm font-semibold leading-5 text-[color:var(--color-ink)]">
                      {item.name}
                    </h3>
                    <Stars rating={item.rating} className="mt-3" />
                    <p className="mt-3 text-sm text-[color:var(--color-ink)]">
                      {item.price}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-ink)]">
                      View review <MoveRight className="h-3 w-3" />
                    </p>
                  </div>
                </a>
              ))}
            </div>
            <button
              aria-label="Next beginner gear"
              className="absolute -right-12 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-ink)] xl:inline-flex"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

function CommunityCta() {
  return (
    <section className="bg-[color:var(--color-bg)] pb-16">
      <Container size="wide">
        <div
          className="grid overflow-hidden rounded-md bg-[color:var(--color-olive-deep)] bg-cover bg-left-center text-[color:var(--color-bg)] md:grid-cols-[340px_minmax(0,1fr)]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(37,45,34,.22), rgba(37,45,34,.92) 38%, rgba(37,45,34,.96)), url('/images/brand/minimal-dark-enso-philosophy-bg.webp')",
          }}
        >
          <div className="min-h-[190px]" />
          <div className="p-8 md:p-10">
            <p className="text-sm text-[color:var(--color-bg)]/70">
              You do not have to figure it out alone.
            </p>
            <h2 className="mt-2 font-serif text-4xl leading-tight">
              We are here to guide you.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-bg)]/78">
              Join our community for weekly tips, routines and inspiration.
            </p>
            <form className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
              <label htmlFor="start-email" className="sr-only">
                Email address
              </label>
              <input
                id="start-email"
                type="email"
                placeholder="Your email address"
                className="h-12 flex-1 rounded-md border border-[color:var(--color-bg)]/10 bg-[color:var(--color-bg)] px-4 text-sm text-[color:var(--color-ink)] outline-none"
              />
              <button
                type="submit"
                className="h-12 rounded-md border border-[color:var(--color-bg)]/50 px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-bg)]"
              >
                Join free
              </button>
              <p className="self-center text-xs text-[color:var(--color-bg)]/60">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}

function HeroPoint({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon
  title: string
  text: string
}) {
  return (
    <div className="border-l border-[color:var(--color-border)] pl-5 first:border-l-0 first:pl-0">
      <Icon
        className="h-8 w-8 text-[color:var(--color-olive)]"
        strokeWidth={1.4}
      />
      <h2 className="mt-4 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink)]">
        {title}
      </h2>
      <p className="mt-2 text-xs leading-5 text-[color:var(--color-ink-soft)]">
        {text}
      </p>
    </div>
  )
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span
      className={['inline-flex items-center gap-0.5', className]
        .filter(Boolean)
        .join(' ')}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={[
            'h-3 w-3',
            index < Math.round(rating)
              ? 'fill-[color:var(--color-ink)] text-[color:var(--color-ink)]'
              : 'text-[color:var(--color-border)]',
          ].join(' ')}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
      <span className="ml-1 text-xs tabular-nums text-[color:var(--color-ink)]">
        {rating.toFixed(1)}
      </span>
    </span>
  )
}
