import { createFileRoute, Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import {
  CheckCircle2,
  Flower2,
  Heart,
  Info,
  Leaf,
  Mountain,
  MoveRight,
  Scale,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
} from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { JapaneseAccent } from '#/components/ui/japanese-accent'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About - The Yoga Sensei' },
      {
        name: 'description',
        content:
          'The Yoga Sensei is an independent yoga editorial run by Marvin Smit. Honest gear guides, calm guidance, and a clear note on how the site is made.',
      },
      { property: 'og:title', content: 'About - The Yoga Sensei' },
      { property: 'og:type', content: 'website' },
    ],
    links: [{ rel: 'canonical', href: 'https://theyogasensei.com/about' }],
  }),
  component: AboutPage,
})

const PILLARS = [
  {
    title: 'Our philosophy',
    text: 'Yoga is not about touching your toes. It is about what you learn on the way down.',
    icon: Leaf,
  },
  {
    title: 'Our mission',
    text: 'To provide honest guidance, practical tools and mindful inspiration for your journey.',
    icon: Mountain,
  },
  {
    title: 'Our promise',
    text: 'No fluff. No hype. Just clear advice, transparent sourcing and recommendations we stand behind.',
    icon: ShieldCheck,
  },
  {
    title: 'Our approach',
    text: 'Evidence-informed. Practice-led. Community-minded. Always student, never perfect.',
    icon: Sprout,
  },
] as const

const BELIEFS = [
  {
    title: 'Honesty First',
    text: 'Recommendations are grounded in publicly verifiable specs and aggregated reviews — never invented testing.',
    icon: CheckCircle2,
  },
  {
    title: 'Quality Over Quantity',
    text: 'Better fewer things, chosen well, that truly support your practice.',
    icon: Scale,
  },
  {
    title: 'Mindful Living',
    text: 'Yoga extends beyond the mat into how you live, work and rest.',
    icon: Flower2,
  },
  {
    title: 'Learn. Practice. Grow.',
    text: 'We are all students. The journey is the practice, and the practice is life.',
    icon: Users,
  },
  {
    title: 'Community Matters',
    text: 'We are here to uplift and inspire a thoughtful community of mindful movers.',
    icon: Heart,
  },
] as const

const VALUES = [
  { value: 'Clear', label: 'Simple guidance without noise' },
  { value: 'Honest', label: 'Transparent recommendations' },
  { value: 'Useful', label: 'Tools that support practice' },
  { value: 'One', label: 'Simple goal: help you grow' },
] as const

function AboutPage() {
  return (
    <>
      <AboutHero />
      <section className="bg-[color:var(--color-bg)] pb-16">
        <Container size="wide">
          <PillarBand />
          <MeetMarvin />
          <OriginSection />
          <BeliefsSection />
          <ImageryDisclosure />
          <CommunityCta />
          <ValuesRow />
        </Container>
      </section>
    </>
  )
}

function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-right-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/brand/review-hero-best-mats.webp')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, var(--color-bg) 0%, rgba(246,241,234,.98) 36%, rgba(246,241,234,.48) 60%, rgba(246,241,234,0) 100%)',
        }}
      />
      <Container size="wide" className="relative">
        <div className="max-w-xl py-14 md:min-h-[470px] md:py-20">
          <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-3 text-xs text-[color:var(--color-ink-muted)]">
            <a href="/" className="transition hover:text-[color:var(--color-ink)]">
              Home
            </a>
            <span aria-hidden="true">›</span>
            <span className="font-medium text-[color:var(--color-ink)]">About</span>
          </nav>

          <Eyebrow tone="accent">About The Yoga Sensei</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-[color:var(--color-ink)] md:text-[64px]">
            Practice over
            <br />
            perfection.
          </h1>
          <p className="mt-7 max-w-md text-base leading-8 text-[color:var(--color-ink-soft)]">
            The Yoga Sensei exists to cut through the noise and help you build a practice that is
            real, sustainable and actually improves your life.
          </p>
          <p className="mt-6 font-serif text-2xl italic text-[color:var(--color-ink)]">The Yoga Sensei</p>
          <div className="mt-8 flex items-center gap-5">
            <img src="/logo/logo-enso.png" alt="" width={58} height={58} className="h-14 w-14 object-contain" />
            <div>
              <JapaneseAccent phrase="practice" tone="soft" size="md" />
              <p className="mt-2 font-serif text-xl text-[color:var(--color-ink)]">Practice. Learn. Grow.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function PillarBand() {
  return (
    <section className="mt-8 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/72 px-6 py-9 shadow-sm md:px-10">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((pillar, index) => (
          <IconPanel key={pillar.title} item={pillar} centered withDivider={index > 0} />
        ))}
      </div>
    </section>
  )
}

function MeetMarvin() {
  return (
    <section
      id="meet-marvin"
      aria-labelledby="meet-marvin-heading"
      className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]"
    >
      {/* Portrait — placeholder until Marvin uploads the real one */}
      <figure className="relative mx-auto w-full max-w-sm">
        <div className="overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm">
          <img
            src="/images/team/marvin-portrait-placeholder.svg"
            alt="Portrait of Marvin Smit — placeholder until a real photo is uploaded"
            width={480}
            height={480}
            className="aspect-square h-full w-full object-cover"
          />
        </div>
        <figcaption className="mt-3 text-center text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
          Marvin Smit · Founder &amp; editor
        </figcaption>
      </figure>

      <div>
        <SectionLabel>Meet the founder</SectionLabel>
        <h2
          id="meet-marvin-heading"
          className="mt-4 font-serif text-4xl leading-tight text-[color:var(--color-ink)]"
        >
          Hi, I&apos;m Marvin.
        </h2>
        <div className="mt-6 space-y-4 text-sm leading-7 text-[color:var(--color-ink-soft)]">
          <p>
            I&apos;m 37, based in the Netherlands, and yoga is my practice and my passion. I
            started The Yoga Sensei because the yoga gear corner of the internet had become
            loud, paid, and mostly unhelpful — and I knew I could do something quieter and more
            honest.
          </p>
          <p>
            I&apos;m a long-time practitioner, not a certified instructor. That distinction
            matters: when I write about a pose or a sequence, I&apos;m sharing what helps me as
            a student, not prescribing technique. When I write about gear, I rely on
            publicly available specifications, manufacturer documentation, and aggregated user
            reviews. When I&apos;ve used something myself, I say so plainly. When I haven&apos;t,
            I say that too.
          </p>
          <p>
            Everything published on this site is written and edited by me. No ghostwriters,
            no faceless content team. If you have a question or want to flag something I got
            wrong, write to{' '}
            <a
              href="mailto:info@theyogasensei.com"
              className="text-[color:var(--color-ink)] underline-offset-2 hover:underline"
            >
              info@theyogasensei.com
            </a>
            .
          </p>
        </div>

        <ul className="mt-7 grid gap-3 text-[12px] text-[color:var(--color-ink-soft)] sm:grid-cols-2">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-olive)]" strokeWidth={1.75} />
            <span>Long-time yoga practitioner, not an instructor</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-olive)]" strokeWidth={1.75} />
            <span>Sole author and editor of every published piece</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-olive)]" strokeWidth={1.75} />
            <span>Based in the Netherlands, writing in English</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-olive)]" strokeWidth={1.75} />
            <span>Transparent about sourcing, testing and affiliate links</span>
          </li>
        </ul>
      </div>
    </section>
  )
}

function OriginSection() {
  return (
    <section className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <div>
        <SectionLabel>Why this platform exists</SectionLabel>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-[color:var(--color-ink)]">
          Tired of the noise.
        </h2>
        <div className="mt-6 space-y-4 text-sm leading-7 text-[color:var(--color-ink-soft)]">
          <p>Overwhelming advice. Paid promotions. Copy-paste content.</p>
          <p>
            Too many people get lost in the noise — buying the wrong gear, following shallow
            advice, or thinking they are not flexible enough to even begin.
          </p>
          <p>
            The Yoga Sensei is built differently: calm guidance, useful tools, and honest
            recommendations that respect your time.
          </p>
        </div>
        <a
          href="/mindful-journal"
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-[color:var(--color-olive)] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
        >
          Our story <MoveRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/70 shadow-sm md:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)]">
        <img
          src="/images/aiko-persona/aiko-meditation-back-view-sage-yoga-mat.webp"
          alt="A practitioner seated on a yoga mat in soft morning light"
          width={460}
          height={420}
          className="h-full min-h-72 w-full object-cover"
        />
        <div
          className="flex min-h-72 flex-col justify-center bg-cover bg-right-bottom p-8 md:p-10"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,253,249,.96), rgba(255,253,249,.88)), url('/images/brand/newsletter-bonsai.webp')",
          }}
        >
          <blockquote className="font-serif text-3xl leading-snug text-[color:var(--color-ink)] md:text-[34px]">
            “Yoga is not about becoming someone new. It is about remembering who you already are.”
          </blockquote>
          <div className="mt-7 h-px w-12 bg-[color:var(--color-ink)]" />
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink)]">
            The Yoga Sensei
          </p>
        </div>
      </div>
    </section>
  )
}

function BeliefsSection() {
  return (
    <section className="mt-12 border-t border-[color:var(--color-border)] pt-8">
      <SectionLabel>What we believe</SectionLabel>
      <div className="mt-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {BELIEFS.map((belief, index) => (
          <IconPanel key={belief.title} item={belief} centered withDivider={index > 0} compact />
        ))}
      </div>
    </section>
  )
}

function ImageryDisclosure() {
  return (
    <section
      id="about-imagery"
      aria-labelledby="about-imagery-heading"
      className="mt-12 overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/72 shadow-sm"
    >
      <div className="grid gap-0 md:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)]">
        <div className="p-7 md:p-10">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-[color:var(--color-olive)]" strokeWidth={1.5} aria-hidden="true" />
            <SectionLabel>About our imagery</SectionLabel>
          </div>
          <h2
            id="about-imagery-heading"
            className="mt-4 font-serif text-3xl leading-tight text-[color:var(--color-ink)] md:text-4xl"
          >
            Meet Aiko, our visual brand character.
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[color:var(--color-ink-soft)]">
            <p>
              Many of the people-in-practice images on this site feature{' '}
              <strong className="text-[color:var(--color-ink)]">Aiko</strong> — a recurring
              fictional character generated with AI. She represents the calm, focused practice
              The Yoga Sensei stands for, but she is not a real person, a certified teacher,
              or a product reviewer.
            </p>
            <p>
              Aiko is a visual brand anchor. She is never used to endorse a product, give
              an opinion, or appear as the author of any article — every piece of writing on
              this site is by Marvin (above). When an Aiko image illustrates a pose or
              practice, it is checked for anatomical accuracy before it goes live; anything
              that misrepresents alignment is rejected or redrawn.
            </p>
            <p className="text-xs text-[color:var(--color-ink-muted)]">
              If you ever see an image where this distinction feels unclear, or a pose that
              looks off,{' '}
              <a
                href="mailto:info@theyogasensei.com"
                className="text-[color:var(--color-ink-soft)] underline-offset-2 hover:underline"
              >
                let us know
              </a>{' '}
              — we will fix it.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-soft)]">
            <span className="inline-flex items-center gap-2">
              <Info className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              AI-generated · disclosed sitewide
            </span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <Link
              to="/affiliate-disclosure"
              className="underline-offset-2 hover:text-[color:var(--color-ink)] hover:underline"
            >
              See affiliate disclosure
            </Link>
          </div>
        </div>

        {/* Right column — Aiko reference image. Conscious choice: the
            disclosure card itself is the one place where showing Aiko
            alongside the explanation is unambiguous. */}
        <div
          className="relative min-h-64 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/aiko-persona/aiko-meditation-back-view-sage-yoga-mat.webp')",
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-x-0 bottom-0 px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-bg)]"
            style={{
              background:
                'linear-gradient(0deg, rgba(31,31,28,.78) 0%, rgba(31,31,28,0) 100%)',
            }}
          >
            Aiko · AI-generated visual character
          </div>
        </div>
      </div>
    </section>
  )
}

function CommunityCta() {
  return (
    <section
      className="mt-10 overflow-hidden rounded-md bg-[color:var(--color-olive-deep)] bg-cover bg-left-center p-6 text-[color:var(--color-bg)] md:p-9"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(37,45,34,.18), rgba(37,45,34,.9) 36%, rgba(37,45,34,.98)), url('/images/brand/journal-cta-bg.webp')",
      }}
    >
      <div className="ml-auto max-w-3xl">
        <Eyebrow tone="onDark">Join our community</Eyebrow>
        <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
          You do not have to figure it out alone.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[color:var(--color-bg)]/76">
          Get weekly mindful insights, practical routines and honest recommendations to support
          your practice and your life.
        </p>
        <form className="mt-6 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <label htmlFor="about-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="about-newsletter-email"
            type="email"
            placeholder="Your email address"
            className="h-12 flex-1 rounded-md border border-[color:var(--color-bg)]/15 bg-[color:var(--color-bg)] px-4 text-sm text-[color:var(--color-ink)] outline-none placeholder:text-[color:var(--color-ink-muted)]"
          />
          <button
            type="submit"
            className="h-12 rounded-md border border-[color:var(--color-bg)]/50 px-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-bg)]/10"
          >
            Join the journey
          </button>
        </form>
        <p className="mt-3 flex items-center gap-2 text-xs text-[color:var(--color-bg)]/70">
          <CheckCircle2 className="h-4 w-4" strokeWidth={1.6} />
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}

function ValuesRow() {
  return (
    <section className="mt-8 border-b border-[color:var(--color-border)] pb-9">
      <SectionLabel>Experience &amp; values</SectionLabel>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((item, index) => (
          <div
            key={item.value}
            className={[
              'text-center',
              index > 0 ? 'lg:border-l lg:border-[color:var(--color-border)]' : '',
            ].join(' ')}
          >
            <p className="font-serif text-4xl leading-none text-[color:var(--color-ink)]">{item.value}</p>
            <p className="mt-3 text-sm text-[color:var(--color-ink-soft)]">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function IconPanel({
  item,
  centered = false,
  withDivider = false,
  compact = false,
}: {
  item: { title: string; text: string; icon: LucideIcon }
  centered?: boolean
  withDivider?: boolean
  compact?: boolean
}) {
  const Icon = item.icon

  return (
    <div
      className={[
        centered ? 'text-center' : '',
        withDivider ? 'lg:border-l lg:border-[color:var(--color-border)] lg:pl-8' : '',
      ].join(' ')}
    >
      <Icon className={['h-10 w-10 text-[color:var(--color-olive)]', centered ? 'mx-auto' : ''].join(' ')} strokeWidth={1.35} />
      <h3 className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink)]">
        {item.title}
      </h3>
      <p
        className={[
          'mx-auto mt-3 text-sm leading-6 text-[color:var(--color-ink-soft)]',
          compact ? 'max-w-40' : 'max-w-52',
        ].join(' ')}
      >
        {item.text}
      </p>
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
