import { Link } from '@tanstack/react-router'
import { Container } from '#/components/ui/container'

export function PolicyPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string
  title: string
  intro: string
  sections: Array<{ title: string; body: string }>
}) {
  return (
    <>
      <section className="border-b border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)]">
        <Container size="default" className="py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.06] tracking-[-0.04em] md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
            {intro}
          </p>
          <p className="mt-6 text-xs font-medium text-[color:var(--color-ink-muted)]">
            Last reviewed August 2, 2026
          </p>
        </Container>
      </section>
      <section className="bg-[color:var(--color-bg)]">
        <Container size="default" className="py-16 md:py-24">
          <div className="max-w-3xl space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-serif text-3xl text-[color:var(--color-ink)]">
                  {section.title}
                </h2>
                <p className="mt-4 whitespace-pre-line text-base leading-8 text-[color:var(--color-ink-soft)]">
                  {section.body}
                </p>
              </section>
            ))}
            <aside className="rounded-2xl border border-[color:var(--color-border)] bg-white p-7">
              <h2 className="font-serif text-2xl">Questions or corrections?</h2>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                If a claim, specification or link seems outdated, tell us what
                you found. We review specific corrections and document
                meaningful changes.
              </p>
              <Link
                to="/contact"
                className="mt-5 inline-flex rounded-full bg-[color:var(--color-olive)] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Contact The Yoga Sensei
              </Link>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
