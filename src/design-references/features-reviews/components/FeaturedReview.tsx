import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from '#/components/ui/container'
import type { YogaMat } from '#/features/reviews/data/yoga-mats'
import { NewsletterCard } from './NewsletterCard'
import { ScoreSummaryCard } from './ScoreSummaryCard'

interface FeaturedReviewProps {
  mat: YogaMat
  thumbnails?: Array<string>
}

const DEFAULT_THUMBS = [
  '/images/brand/pick-manduka-pro.webp',
  '/images/brand/pick-cork-blocks.webp',
  '/images/brand/pick-studio-bolster.webp',
  '/images/brand/topic-yoga-mats.webp',
]

export function FeaturedReview({ mat, thumbnails = DEFAULT_THUMBS }: FeaturedReviewProps) {
  return (
    <section id="best-overall" className="bg-[color:var(--color-bg)] py-10 md:py-16">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_320px]">
          {/* Main featured card */}
          <div className="grid gap-6 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm md:grid-cols-[0.9fr_1.4fr] md:p-8">
            {/* Left: content */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[color:var(--color-olive)] text-sm font-semibold text-[color:var(--color-bg)]">
                  {mat.rank}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-olive)]">
                  {mat.category}
                </span>
              </div>

              <h2 className="font-serif text-3xl leading-tight tracking-tight text-[color:var(--color-ink)]">
                {mat.name}
              </h2>

              {mat.reviewBlurb ? (
                <p className="mt-4 text-sm leading-7 text-[color:var(--color-ink-soft)]">
                  {mat.reviewBlurb}
                </p>
              ) : null}

              {mat.highlights ? (
                <ul className="mt-6 space-y-3">
                  {mat.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-[color:var(--color-ink-soft)]">
                      <CheckCircle
                        className="mt-0.5 h-4 w-4 flex-shrink-0 fill-[color:var(--color-olive)] text-[color:var(--color-surface)]"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <a
                href={mat.affiliateUrl}
                rel="sponsored noopener noreferrer"
                target="_blank"
                className="mt-7 inline-flex items-center gap-2 rounded-md bg-[color:var(--color-olive)] px-8 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
              >
                Check Price →
              </a>

              <div className="mt-5">
                <a
                  href={`/gear/yoga-mats/${mat.id}`}
                  className="text-sm text-[color:var(--color-ink)] underline-offset-2 hover:underline"
                >
                  Read full review →
                </a>
              </div>
            </div>

            {/* Right: large image + carousel thumbnails */}
            <div>
              <div className="aspect-[4/2.55] overflow-hidden rounded-lg bg-[color:var(--color-bg)] ring-1 ring-[color:var(--color-border)]">
                <img
                  src={mat.image}
                  alt={mat.name}
                  width={800}
                  height={510}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  aria-label="Previous image"
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-ink-muted)] transition hover:text-[color:var(--color-accent-deep)]"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
                </button>

                <ul className="flex flex-1 gap-3 overflow-hidden">
                  {thumbnails.map((src, i) => (
                    <li key={`${src}-${i}`} className="flex-1">
                      <button
                        type="button"
                        className={`block aspect-[5/4] w-full overflow-hidden rounded-md bg-[color:var(--color-bg)] ring-1 transition ${
                          i === 0
                            ? 'ring-[color:var(--color-olive)]'
                            : 'ring-[color:var(--color-border)]'
                        }`}
                      >
                        <img
                          src={src}
                          alt=""
                          width={120}
                          height={96}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  aria-label="Next image"
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-ink-muted)] transition hover:text-[color:var(--color-accent-deep)]"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar — fixed 320px */}
          <aside className="space-y-6">
            <ScoreSummaryCard mat={mat} />
            <NewsletterCard />
          </aside>
        </div>
      </Container>
    </section>
  )
}
