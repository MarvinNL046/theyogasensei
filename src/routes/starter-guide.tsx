import { createFileRoute } from '@tanstack/react-router'
import { BookOpenCheck, Footprints, ShoppingBag, Sunrise } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { NewsletterCapture } from '#/components/site/newsletter-capture'

const TITLE = 'Free Yoga for Beginners Starter Guide — The Yoga Sensei'
const DESCRIPTION =
  'Get the free Yoga for Beginners Starter Guide: the gear worth buying, eight foundational poses, and a 10-minute morning routine. Calm, honest, no fluff.'
const URL = 'https://www.theyogasensei.com/starter-guide'
const OG_IMAGE =
  'https://www.theyogasensei.com/images/brand/topic-beginner-yoga.webp'

export const Route = createFileRoute('/starter-guide')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      // Conversion landing page reached from Pinterest, not organic search —
      // keep it out of the index to avoid thin / doorway-page signals.
      { name: 'robots', content: 'noindex, follow' },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:url', content: URL },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:site_name', content: 'The Yoga Sensei' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: OG_IMAGE },
    ],
    links: [{ rel: 'canonical', href: URL }],
  }),
  component: StarterGuidePage,
})

const INSIDE = [
  {
    title: 'The gear worth buying',
    text: 'Seven mats, blocks and straps I actually trust — with who each one is genuinely for, and when the cheap option is the right one.',
    icon: ShoppingBag,
  },
  {
    title: 'Eight foundational poses',
    text: 'Step-by-step, with the common mistakes that trip up beginners — and a clear note on when to skip the pose.',
    icon: Footprints,
  },
  {
    title: 'A 10-minute morning routine',
    text: 'A simple sequence you can do before coffee, plus a two-week plan to make it a habit instead of a chore.',
    icon: Sunrise,
  },
  {
    title: 'Sources you can check',
    text: 'Every health claim is linked to its source — NCCIH, peer-reviewed studies, the CDC. No invented benefits.',
    icon: BookOpenCheck,
  },
] as const

function StarterGuidePage() {
  return (
    <>
      <HeroOptIn />
      <WhatsInside />
      <TrustStrip />
    </>
  )
}

function HeroOptIn() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-bg)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.5]"
        style={{
          backgroundImage:
            "url('/images/brand/japanese-zen-editorial-background.webp')",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(246,241,234,.72) 0%, rgba(246,241,234,.92) 70%, var(--color-bg) 100%)',
        }}
      />
      <Container size="wide" className="relative">
        <div className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          {/* Left — copy + opt-in */}
          <div className="max-w-xl">
            <Eyebrow tone="default">Free PDF guide</Eyebrow>
            <h1 className="mt-5 font-serif text-4xl leading-[1.02] md:text-[56px]">
              Start yoga,{' '}
              <span className="italic text-[color:var(--color-accent)]">
                the calm way.
              </span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-8 text-[color:var(--color-ink-soft)]">
              The Yoga for Beginners Starter Guide is the no-fluff start I wish
              I had: the gear worth buying, eight foundational poses, and a
              10-minute morning routine. Enter your email and it lands in your
              inbox in a minute or two.
            </p>

            <div className="mt-8 max-w-md">
              <NewsletterCapture
                tone="light"
                showHeader={false}
                source="pin:starter-guide"
                leadMagnet="yoga-for-beginners-starter"
              />
            </div>
          </div>

          {/* Right — the guide itself */}
          <div className="mx-auto w-full max-w-sm lg:max-w-md">
            <figure className="overflow-hidden rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-md">
              <img
                src="/images/brand/starter-guide-cover.webp"
                alt="Cover of the free Yoga for Beginners Starter Guide PDF"
                width={1429}
                height={2021}
                className="h-full w-full object-cover"
              />
            </figure>
            <figcaption className="mt-3 text-center text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">
              28 pages · free · no spam
            </figcaption>
          </div>
        </div>
      </Container>
    </section>
  )
}

function WhatsInside() {
  return (
    <section className="bg-[color:var(--color-bg)] pb-16">
      <Container size="wide">
        <div className="border-t border-[color:var(--color-border)] pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink-soft)]">
            What is inside
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight text-[color:var(--color-ink)] md:text-4xl">
            Everything a beginner actually needs — and nothing they don&apos;t.
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {INSIDE.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className={
                    index > 0
                      ? 'lg:border-l lg:border-[color:var(--color-border)] lg:pl-8'
                      : ''
                  }
                >
                  <Icon
                    className="h-9 w-9 text-[color:var(--color-olive)]"
                    strokeWidth={1.35}
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 font-serif text-xl leading-snug text-[color:var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">
                    {item.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="bg-[color:var(--color-bg)] pb-20">
      <Container size="wide">
        <div className="flex flex-col items-center gap-5 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/72 px-6 py-9 text-center shadow-sm sm:flex-row sm:gap-7 sm:text-left">
          <img
            src="/images/team/marvin.webp"
            alt="Portrait of Marvin Smit, founder and editor of The Yoga Sensei"
            width={72}
            height={72}
            className="h-16 w-16 flex-shrink-0 rounded-full border border-[color:var(--color-border)] object-cover"
          />
          <div>
            <p className="text-sm leading-7 text-[color:var(--color-ink-soft)]">
              Written and edited by Marvin Smit — a long-time practitioner, not
              a faceless content team. Every recommendation is researched, every
              claim is sourced, and you can unsubscribe in one click from any
              email.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
