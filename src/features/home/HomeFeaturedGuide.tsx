import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { Section } from '#/components/ui/section'

/**
 * Featured-guide band for the homepage: a dark split section highlighting one
 * flagship guide — copy + CTA on the left, a warm mat photo on the right.
 * Mirrors the template-1 featured band. Deliberately photo-led (not another ensō
 * background) so it reads distinct from the ensō lead-capture band lower down.
 */
export function HomeFeaturedGuide() {
  return (
    <Section tone="dark" padding="lg" className="overflow-hidden">
      <Container size="wide">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <Eyebrow tone="onDark">Featured guide · Yoga mats</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl leading-[1.12] tracking-tight md:text-[42px]">
              The 7 best yoga mats of 2026,
              <br />
              <span className="italic text-[color:var(--color-accent-soft)]">
                honestly compared.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--color-bg)]/75 md:text-base">
              Seven mats ranked by material, grip, cushion and the trade-offs
              most lists skip — researched, never lab-tested, with the right pick
              for travel, sweat, sore knees and everyday home practice.
            </p>
            <Link
              to="/guides/$slug"
              params={{ slug: 'best-yoga-mats-2026' }}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-accent)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-accent-deep)]"
            >
              Read the guide
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl ring-1 ring-black/30">
            <img
              src="/images/brand/review-hero-best-mats.webp"
              alt="A rolled olive yoga mat on a warm wooden studio floor beside an olive branch in a ceramic vase"
              width={1512}
              height={1008}
              loading="lazy"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
