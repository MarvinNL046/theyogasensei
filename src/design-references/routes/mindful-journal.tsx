import { createFileRoute } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import {
  Bookmark,
  CalendarDays,
  CheckCircle2,
  Flower2,
  Heart,
  Leaf,
  Mail,
  MoveRight,
  ShieldCheck,
  ShoppingBag,
  Star,
  Users,
} from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

export const Route = createFileRoute('/mindful-journal')({
  head: () => ({
    meta: [
      { title: 'The Mindful Journal - The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Join The Mindful Journal for calm yoga insights, practical routines, thoughtful recommendations and grounded reflections for your practice.',
      },
      { property: 'og:title', content: 'The Mindful Journal - The Yoga Sensei' },
      { property: 'og:type', content: 'website' },
    ],
    links: [{ rel: 'canonical', href: 'https://theyogasensei.com/mindful-journal' }],
  }),
  component: MindfulJournalPage,
})

const PROMISES = [
  {
    title: 'Weekly insights',
    text: 'Timeless wisdom and fresh perspectives to inspire your practice and life.',
    icon: Leaf,
  },
  {
    title: 'Practical routines',
    text: 'Simple yoga and breathwork you can apply anywhere, anytime.',
    icon: Flower2,
  },
  {
    title: 'Curated recommendations',
    text: 'Honest picks for gear, books and tools that support your journey.',
    icon: ShoppingBag,
  },
  {
    title: 'Philosophy & mindset',
    text: 'Reflections on mindful living, productivity and intentional choices.',
    icon: ShieldCheck,
  },
] as const

const RECEIVE = [
  {
    title: 'Weekly insights',
    text: 'Personal notes, mindfulness reflections and lessons from the mat and beyond.',
    image: '/images/aiko-persona/aiko-meditation-back-view-sage-yoga-mat.webp',
    icon: Mail,
  },
  {
    title: 'Practice & routines',
    text: 'Step-by-step routines, breathwork guides and seasonal practices.',
    image: '/images/brand/pick-manduka-pro.webp',
    icon: CalendarDays,
  },
  {
    title: 'Recommended picks',
    text: 'Carefully selected gear, books, apps and tools that can make a difference.',
    image: '/images/brand/review-hero-best-mats.webp',
    icon: Star,
  },
  {
    title: 'Philosophy & living',
    text: 'Thoughts on simplicity, habits and living with intention.',
    image: '/images/brand/journal-newsletter-bg.webp',
    icon: Users,
  },
] as const

const COMMUNITY = [
  {
    title: 'Like-minded community',
    text: 'Join readers who want to grow through practice, clarity and self-discovery.',
    icon: Users,
  },
  {
    title: 'Replies are welcome',
    text: 'Questions, reflections and practice wins are always part of the conversation.',
    icon: Mail,
  },
  {
    title: 'Members-first resources',
    text: 'Occasional extras, quiet recommendations and early access to new resources.',
    icon: Bookmark,
  },
  {
    title: 'Built on trust',
    text: 'Honest recommendations, no fluff and always your best interest first.',
    icon: Heart,
  },
] as const

const EDITIONS = [
  {
    title: 'Spring Reset: 7 Days of Mindful Movement',
    text: 'A gentle reset to renew your body and mind this season.',
    image: '/images/aiko-persona/aiko-childs-pose-sage-yoga-mat.webp',
    meta: 'Edition preview - 8 min read',
    badge: 'Latest',
  },
  {
    title: 'The Power of Morning Rituals',
    text: 'Simple rituals that set the tone for a calm and productive day.',
    image: '/images/brand/journal-newsletter-bg.webp',
    meta: 'Edition preview - 6 min read',
  },
  {
    title: 'Why Less Is More in Your Practice',
    text: 'Exploring minimalism on and off the mat.',
    image: '/images/brand/newsletter-bonsai.webp',
    meta: 'Edition preview - 7 min read',
  },
  {
    title: 'My Top 5 Yoga Props and How I Use Them',
    text: 'The props worth considering when you want simple support.',
    image: '/images/brand/pick-cork-blocks.webp',
    meta: 'Edition preview - 5 min read',
  },
] as const

function MindfulJournalPage() {
  return (
    <>
      <JournalHero />
      <section
        className="bg-[color:var(--color-bg)] pb-16"
        style={{ paddingTop: 'clamp(3rem, 4vw, 4rem)' }}
      >
        <Container size="wide">
          <PromiseBand />
          <ReceiveSection />
          <CommunitySection />
          <RecentEditions />
          <BottomSignup />
        </Container>
      </section>
    </>
  )
}

function JournalHero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-right-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/brand/journal-hero-bg.webp')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, var(--color-bg) 0%, rgba(246,241,234,.98) 34%, rgba(246,241,234,.48) 58%, rgba(246,241,234,0) 100%)',
        }}
      />
      <Container size="wide" className="relative">
        <div className="max-w-xl py-14 md:min-h-[430px] md:py-20">
          <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-3 text-xs text-[color:var(--color-ink-muted)]">
            <a href="/" className="transition hover:text-[color:var(--color-ink)]">
              Home
            </a>
            <span aria-hidden="true">›</span>
            <span className="font-medium text-[color:var(--color-ink)]">The Mindful Journal</span>
          </nav>

          <Eyebrow tone="accent">The Mindful Journal</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-[color:var(--color-ink)] md:text-[64px]">
            Thoughtful insights.
            <br />
            Meaningful practice.
          </h1>
          <p className="mt-7 max-w-md text-base leading-8 text-[color:var(--color-ink-soft)]">
            Join The Mindful Journal, our weekly letter with mindful insights, yoga wisdom,
            practical routines and curated recommendations to help you live and practice well.
          </p>
          <SignupForm id="hero-journal-email" className="mt-8 max-w-lg" buttonLabel="Join the journey" />
        </div>
      </Container>
    </section>
  )
}

function PromiseBand() {
  return (
    <section className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/72 px-6 py-8 shadow-sm md:px-10">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {PROMISES.map((item) => (
          <IconBlock key={item.title} item={item} centered />
        ))}
      </div>
    </section>
  )
}

function ReceiveSection() {
  return (
    <section className="mt-12 grid gap-9 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div>
        <SectionLabel>What you'll receive</SectionLabel>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-[color:var(--color-ink)]">
          A weekly letter to support your growth
        </h2>
        <p className="mt-5 text-sm leading-7 text-[color:var(--color-ink-soft)]">
          Each edition is designed to inform, inspire and guide you toward a more mindful,
          balanced and purposeful life.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {RECEIVE.map((item) => (
          <ReceiveCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  )
}

function CommunitySection() {
  return (
    <section className="mt-12 border-y border-[color:var(--color-border)] py-9">
      <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div>
          <SectionLabel>More than a newsletter</SectionLabel>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-[color:var(--color-ink)]">
            A mindful community
          </h2>
          <p className="mt-5 text-sm leading-7 text-[color:var(--color-ink-soft)]">
            The Mindful Journal is more than an email. It is a space for like-minded people to
            grow, connect and support each other.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COMMUNITY.map((item) => (
            <IconBlock key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RecentEditions() {
  return (
    <section className="mt-9">
      <div className="flex items-end justify-between gap-4">
        <div>
          <SectionLabel>Recent editions</SectionLabel>
          <h2 className="mt-3 font-serif text-4xl text-[color:var(--color-ink)]">Explore the Journal</h2>
        </div>
        <a
          href="/guides"
          className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink)] md:inline-flex"
        >
          View all archives <MoveRight className="h-4 w-4" />
        </a>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_270px]">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {EDITIONS.map((item) => (
            <EditionCard key={item.title} item={item} />
          ))}
        </div>
        <AuthorNote />
      </div>
    </section>
  )
}

function BottomSignup() {
  return (
    <section
      className="mt-10 overflow-hidden rounded-md bg-[color:var(--color-olive-deep)] bg-cover bg-left-center p-6 text-[color:var(--color-bg)] md:p-9"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(37,45,34,.36), rgba(37,45,34,.92) 34%, rgba(37,45,34,.98)), url('/images/brand/journal-cta-bg.webp')",
      }}
    >
      <div className="ml-auto max-w-3xl">
        <h2 className="font-serif text-3xl leading-tight md:text-4xl">
          Ready to bring more mindfulness into your inbox?
        </h2>
        <p className="mt-3 text-sm leading-6 text-[color:var(--color-bg)]/74">
          Join The Mindful Journal and receive your first letter this week.
        </p>
        <SignupForm
          id="bottom-journal-email"
          className="mt-5 max-w-2xl"
          buttonLabel="Join the journey"
          dark
        />
      </div>
    </section>
  )
}

function SignupForm({
  id,
  buttonLabel,
  className,
  dark = false,
}: {
  id: string
  buttonLabel: string
  className?: string
  dark?: boolean
}) {
  return (
    <div className={className}>
      <form className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          type="email"
          placeholder="Your email address"
          className="h-12 flex-1 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 text-sm text-[color:var(--color-ink)] outline-none transition placeholder:text-[color:var(--color-ink-muted)] focus:border-[color:var(--color-olive)]"
        />
        <button
          type="submit"
          className={[
            'h-12 rounded-md px-7 text-[11px] font-semibold uppercase tracking-[0.16em] transition',
            dark
              ? 'border border-[color:var(--color-bg)]/50 bg-[color:var(--color-bg)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-bg)]/88'
              : 'bg-[color:var(--color-olive)] text-[color:var(--color-bg)] hover:bg-[color:var(--color-olive-deep)]',
          ].join(' ')}
        >
          {buttonLabel}
        </button>
      </form>
      <p
        className={[
          'mt-3 flex items-center gap-2 text-xs',
          dark ? 'text-[color:var(--color-bg)]/72' : 'text-[color:var(--color-ink-soft)]',
        ].join(' ')}
      >
        <CheckCircle2 className="h-4 w-4" strokeWidth={1.6} />
        No spam. Unsubscribe anytime.
      </p>
    </div>
  )
}

function ReceiveCard({ item }: { item: (typeof RECEIVE)[number] }) {
  const Icon = item.icon

  return (
    <article className="overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/72 shadow-sm">
      <div className="relative">
        <img src={item.image} alt="" width={360} height={250} className="h-40 w-full object-cover" />
        <span className="absolute -bottom-5 left-5 flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-[color:var(--color-olive)]">
          <Icon className="h-5 w-5" strokeWidth={1.45} />
        </span>
      </div>
      <div className="p-5 pt-8">
        <h3 className="font-serif text-xl leading-snug text-[color:var(--color-ink)]">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-[color:var(--color-ink-soft)]">{item.text}</p>
      </div>
    </article>
  )
}

function EditionCard({ item }: { item: (typeof EDITIONS)[number] }) {
  return (
    <article className="overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/72 shadow-sm">
      <div className="relative">
        <img src={item.image} alt="" width={340} height={220} className="h-36 w-full object-cover" />
        {'badge' in item ? (
          <span className="absolute left-3 top-3 rounded-sm bg-[color:var(--color-olive)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-bg)]">
            {item.badge}
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl leading-snug text-[color:var(--color-ink)]">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-[color:var(--color-ink-soft)]">{item.text}</p>
        <p className="mt-5 text-xs text-[color:var(--color-ink-muted)]">{item.meta}</p>
      </div>
    </article>
  )
}

function AuthorNote() {
  return (
    <aside className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/72 p-7 shadow-sm">
      <img
        src="/images/brand/avatar-yoga-sensei.webp"
        alt="The Yoga Sensei"
        width={106}
        height={106}
        className="h-24 w-24 rounded-full object-cover grayscale"
      />
      <h3 className="mt-7 font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
        A letter from
        <br />
        The Yoga Sensei
      </h3>
      <p className="mt-4 text-sm leading-7 text-[color:var(--color-ink-soft)]">
        I created The Mindful Journal to share what I have learned through years of practice,
        teaching and life.
      </p>
      <p className="mt-4 text-sm leading-7 text-[color:var(--color-ink-soft)]">
        My hope is that these letters bring clarity, encouragement and practical value to your
        journey.
      </p>
      <p className="mt-5 font-serif text-2xl italic text-[color:var(--color-ink)]">The Yoga Sensei</p>
    </aside>
  )
}

function IconBlock({
  item,
  centered = false,
}: {
  item: { title: string; text: string; icon: LucideIcon }
  centered?: boolean
}) {
  const Icon = item.icon

  return (
    <div className={centered ? 'text-center' : ''}>
      <Icon
        className={[
          'h-10 w-10 text-[color:var(--color-olive)]',
          centered ? 'mx-auto' : '',
        ].join(' ')}
        strokeWidth={1.35}
      />
      <h3 className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink)]">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[color:var(--color-ink-soft)]">{item.text}</p>
    </div>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink-soft)]">
      {children}
    </p>
  )
}
