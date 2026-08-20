import { Link } from '@tanstack/react-router'
import { CheckCircle2, MinusCircle, MoveRight, Star } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import type { ProductReview } from '#/features/reviews/data/manduka-pro'

interface ProductReviewHeroProps {
  data: ProductReview
}

export function ProductReviewHero({ data }: ProductReviewHeroProps) {
  const { title, eyebrow, intro, heroImage, byline, productName } = data

  return (
    <section className="relative overflow-visible bg-[color:var(--color-bg)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-right bg-no-repeat opacity-95"
        style={{ backgroundImage: `url('${heroImage}')` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, var(--color-bg) 0%, rgba(246, 241, 234, .92) 34%, rgba(246, 241, 234, .24) 62%, rgba(246, 241, 234, 0) 100%)',
        }}
      />

      <Container size="wide" className="relative">
        <div className="grid gap-8 py-12 md:min-h-[440px] md:py-16 lg:block">
          <div className="max-w-xl">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center text-xs text-[color:var(--color-ink-muted)]">
                <li>
                  <Link
                    to="/"
                    className="transition hover:text-[color:var(--color-accent-deep)]"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="mx-2 opacity-50">
                  ›
                </li>
                <li>
                  <Link
                    to="/gear"
                    className="transition hover:text-[color:var(--color-accent-deep)]"
                  >
                    Reviews
                  </Link>
                </li>
                <li aria-hidden="true" className="mx-2 opacity-50">
                  ›
                </li>
                <li>{data.category}</li>
                <li aria-hidden="true" className="mx-2 opacity-50">
                  ›
                </li>
                <li
                  aria-current="page"
                  className="text-[color:var(--color-ink)]"
                >
                  {productName} Review
                </li>
              </ol>
            </nav>

            <Eyebrow tone="accent">{eyebrow}</Eyebrow>

            <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-[color:var(--color-ink)] md:text-[58px]">
              {title.line1}
              <br />
              {title.line2}
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-[color:var(--color-ink-soft)]">
              {intro}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <img
                src={byline.avatar}
                alt={byline.author}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover ring-1 ring-[color:var(--color-border)]"
              />
              <div className="text-sm">
                <p className="font-medium text-[color:var(--color-ink)]">
                  By {byline.author}
                </p>
                <p className="mt-0.5 text-xs text-[color:var(--color-ink-muted)]">
                  {byline.date} · {byline.readTime}
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-40 mt-8 self-start lg:absolute lg:right-8 lg:bottom-[-104px] lg:mt-0 lg:w-[320px] xl:w-[360px]">
            <HeroRatingCard data={data} />
          </div>
        </div>
      </Container>
    </section>
  )
}

function HeroRatingCard({ data }: { data: ProductReview }) {
  return (
    <aside className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/92 p-6 shadow-[0_20px_70px_rgba(63,74,53,0.10)] backdrop-blur-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)]">
        Our rating
      </p>
      <div className="mt-3 flex items-end gap-2 font-serif text-[50px] leading-none text-[color:var(--color-ink)]">
        {data.rating.toFixed(1)}
        <span className="mb-1 text-3xl text-[color:var(--color-ink-muted)]">
          /5
        </span>
      </div>
      <div className="mt-3 flex gap-1" aria-label={`${data.rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="h-4 w-4 fill-[color:var(--color-ink)] text-[color:var(--color-ink)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-[color:var(--color-ink-muted)]">
        Based on editorial criteria, not user review counts.
      </p>

      <div className="mt-6 space-y-5">
        <SummaryList title="Pros" items={data.pros} tone="positive" />
        <SummaryList title="Cons" items={data.cons} tone="neutral" />
      </div>

      <a
        href={data.affiliateUrl}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[color:var(--color-olive)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-accent)]"
      >
        {data.priceLabel}
        <MoveRight className="h-4 w-4" aria-hidden="true" />
      </a>
      <p className="mt-3 text-xs text-[color:var(--color-ink-muted)]">
        We may earn a commission.
      </p>
    </aside>
  )
}

function SummaryList({
  title,
  items,
  tone,
}: {
  title: string
  items: Array<string>
  tone: 'positive' | 'neutral'
}) {
  const Icon = tone === 'positive' ? CheckCircle2 : MinusCircle
  return (
    <div>
      <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)]">
        {title}
      </h2>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-xs leading-5 text-[color:var(--color-ink-soft)]"
          >
            <Icon
              className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-olive)]"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
