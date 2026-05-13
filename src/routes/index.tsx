import { Link, createFileRoute } from '@tanstack/react-router'
import { NewsletterCapture } from '#/components/site/newsletter-capture'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'The Yoga Sensei — gear we test, beginner paths that work' },
      {
        name: 'description',
        content:
          'A curated guide for yoga gear and beginner practice. Tested mats, real testing notes, and step-by-step pose guides reviewed by certified teachers.',
      },
      { property: 'og:title', content: 'The Yoga Sensei' },
      {
        property: 'og:description',
        content:
          'A curated guide for yoga gear and beginner practice. Tested mats, real testing notes, and step-by-step pose guides.',
      },
      { property: 'og:url', content: 'https://theyogasensei.com/' },
      { property: 'og:type', content: 'website' },
    ],
    links: [{ rel: 'canonical', href: 'https://theyogasensei.com/' }],
  }),
  component: HomePage,
})

interface FeatureCard {
  to: '/guides/$slug' | '/poses/$slug'
  params: { slug: string }
  kicker: string
  title: string
  blurb: string
  readingTime: string
}

const FEATURED: Array<FeatureCard> = [
  {
    to: '/guides/$slug',
    params: { slug: 'yoga-for-beginners' },
    kicker: 'Pillar',
    title: 'Yoga for Beginners',
    blurb:
      'Pick a style, get the right mat, learn ten foundational poses, and build a daily practice in thirty days. The complete starter guide.',
    readingTime: '18 min read',
  },
  {
    to: '/poses/$slug',
    params: { slug: 'sun-salutation' },
    kicker: 'Pose guide',
    title: 'Sun Salutation, step by step',
    blurb:
      'Surya Namaskar A in twelve positions. Cues, breath count, common mistakes, and modifications for tight hamstrings or wrist pain.',
    readingTime: '9 min read',
  },
  {
    to: '/guides/$slug',
    params: { slug: 'best-yoga-mats-for-beginners' },
    kicker: 'Gear roundup',
    title: 'Best yoga mats for beginners',
    blurb:
      'Three mats, six weeks of testing each. Best overall pick, best budget option, and one for tight knees. Honest notes on grip, cushion, and break-in time.',
    readingTime: '14 min read',
  },
]

function HomePage() {
  return (
    <>
      <section className="bg-stone-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent-700">
            The Yoga Sensei
          </p>
          <h1 className="font-serif text-4xl leading-tight tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
            Yoga gear we have actually tested. Beginner paths that work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-700">
            The Yoga Sensei is a curated guide for finding the right gear and starting your
            practice. We test what we recommend. Instructional content is reviewed by certified
            yoga teachers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/start-here"
              className="inline-flex items-center rounded-full bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-700"
            >
              Start here
            </Link>
            <Link
              to="/guides/$slug"
              params={{ slug: 'yoga-for-beginners' }}
              className="inline-flex items-center rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 transition hover:border-stone-400"
            >
              Read the beginner guide
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              Start with these
            </h2>
            <p className="mt-2 max-w-prose text-sm text-stone-600">
              Three articles that cover most beginner questions. Read them in any order.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURED.map((card) => (
            <Link
              key={card.params.slug}
              to={card.to}
              params={card.params}
              className="group block rounded-2xl border border-stone-200 bg-white p-6 transition hover:border-accent-300 hover:shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-700">
                {card.kicker}
              </p>
              <h3 className="mt-2 font-serif text-xl font-semibold tracking-tight text-stone-900 group-hover:text-accent-800">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{card.blurb}</p>
              <p className="mt-4 text-xs text-stone-500">{card.readingTime}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <NewsletterCapture
          source="homepage"
          leadMagnet="30-day-beginner-path"
          heading="Get one yoga email a week"
          blurb="New articles, gear notes, and one thing I am testing right now. No filler, no daily blasts. Unsubscribe in one click."
        />
      </section>

      <section className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            What we do not do
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-700">
            We do not give medical advice. We do not claim to be certified yoga teachers — we are
            curators and gear-testers. Therapeutic prescriptions for injuries or conditions live
            with the certified reviewer on the team, not in our editorial.
          </p>
        </div>
      </section>
    </>
  )
}
