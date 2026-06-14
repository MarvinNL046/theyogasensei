import { Link } from '@tanstack/react-router'
import { buildImageUrl } from '#/lib/images/variants'
import {
  formatGuideDate,
  type GuideCard,
} from '#/features/guides-index/data'

export interface FeaturedGuideProps {
  guide: GuideCard
}

/** Large featured guide block — pillar at the top of the unfiltered view. */
export function FeaturedGuide({ guide }: FeaturedGuideProps) {
  return (
    <article className="mb-14">
      <Link
        to="/guides/$slug"
        params={{ slug: guide.slug }}
        className="group block"
      >
        <div className="aspect-[3/2] overflow-hidden rounded-3xl bg-[color:var(--color-surface)] ring-1 ring-[color:var(--color-border)]">
          <img
            src={buildImageUrl(guide.heroImage, 'inline')}
            alt={guide.title}
            width={1280}
            height={854}
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="mt-7">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
            Start here · {guide.category}
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-[1.15] tracking-tight transition group-hover:[--color-heading:var(--color-accent-deep)] md:text-[36px]">
            {guide.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-[15px]">
            {guide.description}
          </p>
          <p className="mt-5 text-xs text-[color:var(--color-ink-muted)]">
            By {guide.authorName}
            <span className="mx-2 opacity-40">·</span>
            {formatGuideDate(guide.publishedAt)}
            <span className="mx-2 opacity-40">·</span>
            {guide.readingTime} min read
          </p>
        </div>
      </Link>
    </article>
  )
}
