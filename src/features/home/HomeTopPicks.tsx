import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { RatingStars } from '#/components/reviews/RatingStars'
import { MAT_PICKS } from '#/features/reviews/data'

const PICKS = MAT_PICKS.slice(0, 5)

type PickLink =
  | { to: '/reviews/manduka-pro' }
  | { to: '/reviews/jade' }
  | { to: '/reviews/gaiam' }
  | { to: '/reviews/best-yoga-mats' }

const pickHref = (pick: { detailPath?: string }): PickLink =>
  pick.detailPath === '/reviews/manduka-pro'
    ? { to: '/reviews/manduka-pro' }
    : pick.detailPath === '/reviews/jade'
      ? { to: '/reviews/jade' }
      : pick.detailPath === '/reviews/gaiam'
        ? { to: '/reviews/gaiam' }
        : { to: '/reviews/best-yoga-mats' }

/**
 * Top-picks rail on the homepage: our editorial-scored mat recommendations,
 * linking through to the redesigned review pages. Sits between the featured
 * band and the latest-writing list.
 */
export function HomeTopPicks() {
  return (
    <section className="bg-[color:var(--color-surface-muted)] py-16 md:py-24">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow tone="default">Top picks</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-[40px]">
              Our top recommendations.
            </h2>
          </div>
          <Link
            to="/reviews/best-yoga-mats"
            className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-deep)] transition hover:text-[color:var(--color-accent)]"
          >
            View all reviews
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {PICKS.map((pick) => (
            <li key={pick.name}>
              <Link {...pickHref(pick)} className="group block">
                <div className="overflow-hidden rounded-sm bg-[color:var(--color-surface)] ring-1 ring-[color:var(--color-border)]">
                  <img
                    src={pick.image}
                    alt={`${pick.name} yoga mat`}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                  {pick.badge}
                </p>
                <p className="mt-1 font-serif text-lg leading-snug text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)]">
                  {pick.name}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <RatingStars score={pick.overall} size={13} />
                  <span className="text-xs font-medium text-[color:var(--color-ink)]">
                    {pick.overall.toFixed(1)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
