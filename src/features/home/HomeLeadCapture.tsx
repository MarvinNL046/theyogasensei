import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { Section } from '#/components/ui/section'
import { NewsletterCapture } from '#/components/site/newsletter-capture'

/**
 * Closing lead-capture band for the homepage: a dark, textured ensō background
 * (motif on the right, copy + the real newsletter form on the left). Reuses the
 * Convex-wired NewsletterCapture in its onDark form variant. Mirrors the dark
 * band treatment from GuidesCta and the template-1 footer capture.
 */
export function HomeLeadCapture() {
  return (
    <Section tone="dark" padding="lg" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/brand/zen-enso-editorial-dark-bg.webp')",
        }}
      />
      {/* left-weighted scrim so copy stays legible while the ensō shows at right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(15,14,12,.78) 0%, rgba(15,14,12,.5) 42%, rgba(15,14,12,0) 78%)',
        }}
      />
      <Container size="wide" className="relative z-10">
        <div className="max-w-xl py-4 md:py-8">
          <Eyebrow tone="onDark">The weekly email</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-[1.1] tracking-tight text-[color:var(--color-bg)] md:text-[44px]">
            Calm guidance,
            <br />
            <span className="italic text-[color:var(--color-accent-soft)]">
              once a week.
            </span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--color-bg)]/75 md:text-base">
            New guides, honest gear notes, and the one thing I am testing right
            now. No spam — unsubscribe in one click.
          </p>
          <NewsletterCapture
            tone="onDark"
            showHeader={false}
            source="home-lead"
            className="mt-8 max-w-md"
          />
        </div>
      </Container>
    </Section>
  )
}
