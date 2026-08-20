import { Container } from '#/components/ui/container'

const ITEMS = [
  { label: 'Our Top Picks', href: '#top-picks' },
  { label: 'Comparison Table', href: '#comparison-table' },
  { label: 'How We Test', href: '#how-we-test' },
  { label: 'Buying Guide', href: '#buying-guide' },
  { label: 'FAQs', href: '#faqs' },
] as const

export function InThisGuideNav() {
  return (
    <section className="bg-[color:var(--color-bg)] pt-8 md:pt-10">
      <Container size="wide">
        <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-6 py-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
              In this guide:
            </span>

            {ITEMS.map((item, index) => (
              <div key={item.href} className="flex items-center gap-x-6">
                <a
                  href={item.href}
                  className="text-[color:var(--color-ink-soft)] transition hover:text-[color:var(--color-accent-deep)]"
                >
                  {item.label}
                </a>
                {index < ITEMS.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="text-[color:var(--color-border)]"
                  >
                    |
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
