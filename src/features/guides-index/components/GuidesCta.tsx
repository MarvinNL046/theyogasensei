import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { JapaneseAccent } from '#/components/ui/japanese-accent'
import { Section } from '#/components/ui/section'
import { FEATURED_SLUG } from '#/features/guides-index/data'

/** Quiet dark band before the footer. Links point to live routes only. */
export function GuidesCta() {
  return (
    <Section tone="dark" padding="md" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/brand/journal-cta-bg.webp')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/55"
      />
      <JapaneseAccent
        phrase="stillness"
        vertical
        tone="onDark"
        className="pointer-events-none absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 xl:block"
      />
      <Container size="wide" className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="onDark">From the mat</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl leading-[1.1] tracking-tight md:text-[44px]">
            Better practice.
            <br />
            <span className="italic text-[color:var(--color-accent-soft)]">
              Better you.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-[color:var(--color-bg)]/70 md:text-base">
            Honest gear notes and a calm path through the practice. Start where
            you are, not where you think you should be.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/guides/$slug"
              params={{ slug: FEATURED_SLUG }}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-accent)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-accent-deep)]"
            >
              Read the mat guide
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-bg)]/30 px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-soft)]"
            >
              About the method
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}
