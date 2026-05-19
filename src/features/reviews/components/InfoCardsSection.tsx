import { BookOpen, ClipboardCheck, Plus } from 'lucide-react'
import { Container } from '#/components/ui/container'

const FAQS = [
  'What is the best yoga mat overall?',
  'How often should I replace my yoga mat?',
  'What is the best material for a yoga mat?',
] as const

export function InfoCardsSection() {
  return (
    <section className="bg-[color:var(--color-bg)] pb-12 md:pb-16">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <article
            id="how-we-test"
            className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-3">
              <ClipboardCheck
                className="h-5 w-5 text-[color:var(--color-olive)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
                How we test
              </h3>
            </div>
            <p className="text-sm leading-6 text-[color:var(--color-ink-soft)]">
              We put every mat through real-world testing over several weeks. Each mat is evaluated
              based on grip, comfort, durability, weight, material quality and value.
            </p>
            <a
              href="/how-we-test"
              className="mt-5 inline-block text-sm text-[color:var(--color-ink)] underline-offset-2 hover:underline"
            >
              Our full testing process →
            </a>
          </article>

          <article
            id="buying-guide"
            className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-3">
              <BookOpen
                className="h-5 w-5 text-[color:var(--color-olive)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
                Buying guide
              </h3>
            </div>
            <p className="text-sm leading-6 text-[color:var(--color-ink-soft)]">
              Not sure what mat is right for you? Our buying guide breaks down everything you need
              to know before you choose.
            </p>
            <a
              href="/buying-guide"
              className="mt-5 inline-block text-sm text-[color:var(--color-ink)] underline-offset-2 hover:underline"
            >
              Read the buying guide →
            </a>
          </article>

          <article
            id="faqs"
            className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm"
          >
            <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
              Frequently asked questions
            </h3>
            <div className="divide-y divide-[color:var(--color-border)]">
              {FAQS.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled
                  className="flex w-full items-center justify-between gap-4 py-3 text-left text-sm text-[color:var(--color-ink-soft)]"
                >
                  <span>{q}</span>
                  <Plus
                    className="h-4 w-4 flex-shrink-0 text-[color:var(--color-ink-muted)]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
            <a
              href="/faqs/yoga-mats"
              className="mt-3 inline-block text-sm text-[color:var(--color-ink)] underline-offset-2 hover:underline"
            >
              View all FAQs →
            </a>
          </article>
        </div>
      </Container>
    </section>
  )
}
