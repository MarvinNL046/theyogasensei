import { Info } from 'lucide-react'
import { Container } from '#/components/ui/container'

export function AffiliateDisclosure() {
  return (
    <section className="bg-[color:var(--color-bg)] pb-8">
      <Container size="wide">
        <p className="flex items-start gap-2 text-xs text-[color:var(--color-ink-muted)]">
          <Info
            className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 opacity-70"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span>
            We may earn a commission when you buy through links on our site.{' '}
            <a
              href="/affiliate-disclosure"
              className="underline underline-offset-2 transition hover:text-[color:var(--color-accent-deep)]"
            >
              Learn more about our review process.
            </a>
          </span>
        </p>
      </Container>
    </section>
  )
}
