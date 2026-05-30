import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { JapaneseAccent } from '#/components/ui/japanese-accent'

/**
 * Guides-index hero — full-width background photo with a dark gradient and the
 * page intro. Mirrors the "Journal" template treatment, adapted to the real
 * scope (yoga-mat guides).
 */
export function GuidesHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/brand/journal-hero-bg.webp')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/25"
      />
      <JapaneseAccent
        phrase="practice"
        vertical
        tone="onDark"
        className="pointer-events-none absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 xl:block"
      />
      <Container size="wide" className="relative z-10">
        <div className="max-w-2xl py-20 md:py-32">
          <Eyebrow tone="onDark">Guides</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight text-[color:var(--color-bg)] md:text-[56px]">
            Honest yoga mat guides.
            <br />
            <span className="italic text-[color:var(--color-accent-soft)]">
              No hype. Just what works.
            </span>
          </h1>
          <p className="mt-7 max-w-lg text-sm leading-relaxed text-[color:var(--color-bg)]/80 md:text-base">
            Buying guides, comparisons, reviews and care notes — researched and
            written by a long-time practitioner. Start with the mat that fits
            how you actually practise, not the one with the loudest marketing.
          </p>
        </div>
      </Container>
    </section>
  )
}
