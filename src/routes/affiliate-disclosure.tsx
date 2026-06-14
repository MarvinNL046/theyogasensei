import { createFileRoute } from '@tanstack/react-router'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

export const Route = createFileRoute('/affiliate-disclosure')({
  head: () => ({
    meta: [
      { title: 'Affiliate Disclosure — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'How affiliate partnerships work on The Yoga Sensei: what we may earn, how links are marked, and what never changes our editorial judgement.',
      },
      { property: 'og:title', content: 'Affiliate Disclosure — The Yoga Sensei' },
      {
        property: 'og:description',
        content:
          'How affiliate partnerships work on The Yoga Sensei: what we may earn, how links are marked, and what never changes our editorial judgement.',
      },
      { property: 'og:url', content: 'https://www.theyogasensei.com/affiliate-disclosure' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://www.theyogasensei.com/images/brand/article-hero-morning-yoga.webp' },
      { property: 'og:site_name', content: 'The Yoga Sensei' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: 'https://www.theyogasensei.com/images/brand/article-hero-morning-yoga.webp' },
    ],
    links: [
      { rel: 'canonical', href: 'https://www.theyogasensei.com/affiliate-disclosure' },
    ],
  }),
  component: AffiliateDisclosurePage,
})

function AffiliateDisclosurePage() {
  return (
    <section className="bg-[color:var(--color-bg)] py-16 md:py-24">
      <Container size="narrow">
        <Eyebrow tone="default">Affiliate disclosure</Eyebrow>
        <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight md:text-5xl">
          How affiliate links work on The Yoga Sensei
        </h1>
        <p className="mt-6 text-base leading-8 text-[color:var(--color-ink-soft)]">
          The Yoga Sensei is an independent editorial site. Some future gear
          guides may include affiliate links. If you click one of those links and
          buy something, we may earn a commission at no extra cost to you.
        </p>

        <div className="mt-10 space-y-9 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm md:p-9">
          <section>
            <h2 className="font-serif text-2xl">
              Current status
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">
              At launch, the site may publish informational guides before any
              affiliate links are active. When a page does contain affiliate
              links, the page will say so clearly near the top and the links will
              be marked with <code>rel="sponsored nofollow"</code>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl">
              Programs we may use
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">
              The Yoga Sensei may participate in retailer affiliate programs
              where relevant, including Amazon Associates if approved and active.
              When a specific program is used, the affected page will include the
              required program disclosure language near the relevant links.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl">
              What commissions do not change
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[color:var(--color-ink-soft)]">
              <li>We do not invent product testing, prices, ratings, or review counts.</li>
              <li>We do not call something “tested” unless Marvin has actually tested it.</li>
              <li>We do not recommend a product only because it has a commission.</li>
              <li>We prefer clear “who this is for / who should skip it” guidance over hype.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl">
              How recommendations are made
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">
              Product coverage is based on publicly available specifications,
              manufacturer guidance, transparent sourcing, and aggregated user
              feedback. When personal use is part of a recommendation, we state
              that plainly. When it is not, we say that too.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl">
              Questions or corrections
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">
              If you notice an unclear disclosure or an outdated affiliate link,
              email <a href="mailto:hello@theyogasensei.com" className="underline underline-offset-4">hello@theyogasensei.com</a>.
              See also our{' '}
              <a href="/privacy" className="underline underline-offset-4">privacy policy</a>{' '}
              and{' '}
              <a href="/terms" className="underline underline-offset-4">terms</a>.
            </p>
          </section>
        </div>
      </Container>
    </section>
  )
}
