import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

export function GuidesHero() {
  return (
    <section className="bg-[color:var(--color-bg)]">
      <Container size="wide" className="py-8 md:py-12">
        <div className="grid overflow-hidden rounded-[2rem] border border-[color:var(--color-border)] bg-white lg:grid-cols-[1.05fr_.95fr]">
          <div className="flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16">
            <Eyebrow tone="default">Yoga guides</Eyebrow>
            <h1 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.06] tracking-[-0.045em] md:text-[56px]">
              Better choices for your practice.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--color-ink-soft)] md:text-lg">
              Practical buying guides, comparisons and care advice — researched carefully and written without hype or paid rankings.
            </p>
            <Link to="/guides/$slug" params={{ slug: 'how-to-choose-a-yoga-mat' }} className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--color-olive)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--color-olive-deep)]">
              Start with the mat guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative min-h-[330px] bg-[color:var(--color-surface-muted)] lg:m-3 lg:min-h-[500px] lg:rounded-[1.4rem]">
            <img src="/images/brand/journal-hero-bg.webp" alt="Yoga gear arranged for a calm home practice" className="absolute inset-0 h-full w-full object-cover" width={1200} height={800} />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-olive-deep)]/10 to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  )
}
