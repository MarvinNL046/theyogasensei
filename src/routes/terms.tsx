import type { ReactNode } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

const LAST_UPDATED = '2026-05-26'

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [
      { title: 'Terms — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Plain-language terms for using The Yoga Sensei. Editorial site, no warranties on third-party products.',
      },
      { property: 'og:title', content: 'Terms — The Yoga Sensei' },
      {
        property: 'og:description',
        content:
          'Plain-language terms for using The Yoga Sensei. Editorial site, no warranties on third-party products.',
      },
      { property: 'og:url', content: 'https://theyogasensei.com/terms' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'The Yoga Sensei' },
      { property: 'og:locale', content: 'en_US' },
    ],
    links: [{ rel: 'canonical', href: 'https://theyogasensei.com/terms' }],
  }),
  component: TermsPage,
})

function TermsPage() {
  return (
    <section className="bg-[color:var(--color-bg)] py-16 md:py-24">
      <Container size="narrow">
        <Eyebrow tone="accent">Terms</Eyebrow>
        <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-[color:var(--color-ink)] md:text-5xl">
          Using this site
        </h1>
        <p className="mt-6 text-base leading-8 text-[color:var(--color-ink-soft)]">
          The Yoga Sensei is an editorial site. Reading guides here is free and comes with the
          terms below. They are short on purpose.
        </p>
        <p className="mt-4 text-sm text-[color:var(--color-ink-muted)]">
          Last updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED}</time>
        </p>

        <div className="mt-10 space-y-9 rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm md:p-9">
          <TermsSection title="What this site is">
            <p>
              The Yoga Sensei publishes guides about yoga gear, beginner practice and related
              topics. Everything is written and edited by Marvin Smit, a long-time practitioner —
              not a certified yoga instructor and not a medical professional. Content is for general
              information only.
            </p>
          </TermsSection>

          <TermsSection title="Not medical or professional advice">
            <p>
              Nothing on this site is medical, physiotherapy, or fitness-instruction advice. If you
              have an injury, a medical condition, or are pregnant, talk to a qualified professional
              before starting or changing a practice. Yoga involves physical activity — practise
              within your limits.
            </p>
          </TermsSection>

          <TermsSection title="No warranty on third-party products">
            <p>
              When this site recommends a product (a mat, a block, a strap, anything), that
              recommendation is based on publicly available specifications, manufacturer
              information, and aggregated user reviews — and where applicable, Marvin&apos;s own use.
              We do not manufacture, sell, or guarantee any third-party product. Warranties,
              returns, and disputes about a product are between you and the seller.
            </p>
          </TermsSection>

          <TermsSection title="Affiliate links">
            <p>
              Some links on this site are affiliate links. If you click one and buy, we may earn a
              commission at no extra cost to you. The full disclosure is on the{' '}
              <Link to="/affiliate-disclosure">affiliate disclosure</Link> page. Commissions never
              decide what gets recommended.
            </p>
          </TermsSection>

          <TermsSection title="User-submitted content">
            <p>
              If you email us a correction, a question, or a suggestion, we may quote it (without
              your email address or any identifying info) in a future article or correction note —
              only if we think it would help other readers. If you do not want to be quoted, just
              say so in the email and we will not.
            </p>
          </TermsSection>

          <TermsSection title="Intellectual property">
            <p>
              The writing, photos, illustrations and visual brand of The Yoga Sensei belong to
              Marvin Smit and may not be republished elsewhere without permission. Short quotes
              with a link back are fine and welcome.
            </p>
          </TermsSection>

          <TermsSection title="Links to other sites">
            <p>
              We link to manufacturer pages, retailers, and external articles where useful. We do
              not control those sites and are not responsible for their content, products, or
              privacy practices.
            </p>
          </TermsSection>

          <TermsSection title="Changes">
            <p>
              These terms can be updated. The “last updated” date will change when they do.
            </p>
          </TermsSection>

          <TermsSection title="Governing law">
            <p>
              This site is operated from the Netherlands by an individual. Any dispute arising from
              your use of this site is governed by the laws of the Netherlands, without regard to
              conflict-of-law principles. Where mandatory EU consumer protections apply, they apply.
            </p>
          </TermsSection>

          <TermsSection title="Contact">
            <p>
              <a href="mailto:marvin@theyogasensei.com">marvin@theyogasensei.com</a>
            </p>
          </TermsSection>
        </div>
      </Container>
    </section>
  )
}

function TermsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3 text-sm leading-7 text-[color:var(--color-ink-soft)] [&_a]:underline [&_a]:underline-offset-4">
      <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">{title}</h2>
      {children}
    </section>
  )
}
