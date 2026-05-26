import { createFileRoute } from '@tanstack/react-router'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'Get in touch with Marvin. Corrections, questions, partnerships — one email address, no forms.',
      },
      { property: 'og:title', content: 'Contact — The Yoga Sensei' },
      {
        property: 'og:description',
        content:
          'Get in touch with Marvin. Corrections, questions, partnerships — one email address, no forms.',
      },
      { property: 'og:url', content: 'https://theyogasensei.com/contact' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'The Yoga Sensei' },
      { property: 'og:locale', content: 'en_US' },
    ],
    links: [{ rel: 'canonical', href: 'https://theyogasensei.com/contact' }],
  }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <section className="bg-[color:var(--color-bg)] py-16 md:py-24">
      <Container size="narrow">
        <Eyebrow tone="accent">Contact</Eyebrow>
        <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-[color:var(--color-ink)] md:text-5xl">
          Reach Marvin
        </h1>
        <p className="mt-6 text-base leading-8 text-[color:var(--color-ink-soft)]">
          One inbox, no form. Email works for everything below — corrections get priority and
          usually a same-day reply.
        </p>
        <p className="mt-6 text-lg font-medium text-[color:var(--color-ink)]">
          <a href="mailto:marvin@theyogasensei.com" className="underline underline-offset-4">
            marvin@theyogasensei.com
          </a>
        </p>

        <div className="mt-10 space-y-9 rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm md:p-9">
          <section>
            <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">
              What to email about
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[color:var(--color-ink-soft)]">
              <li>Corrections and factual errors in a guide.</li>
              <li>Questions about a specific mat, block, or piece of gear we have covered.</li>
              <li>Suggestions for future guides.</li>
              <li>Partnership or editorial inquiries.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">
              What not to email about
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">
              Generic SEO outreach, link insertions, or “guest post” pitches. They go straight to
              archive. Please do not.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">
              About reply times
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">
              Replies usually come within one to three days. Corrections get answered first.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-[color:var(--color-ink)]">Mail</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">
              Marvin Smit
              <br />
              The Netherlands
              <br />
              (For postal mail, email first — the address is shared on a per-request basis.)
            </p>
          </section>
        </div>
      </Container>
    </section>
  )
}
