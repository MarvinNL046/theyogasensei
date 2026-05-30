import { Link } from '@tanstack/react-router'
import { buildImageUrl } from '#/lib/images/variants'
import {
  formatGuideDate,
  type GuideCard,
} from '#/features/guides-index/data'

export interface GuideListItemProps {
  guide: GuideCard
}

/** A single guide row — thumbnail + category + title + blurb + meta. */
export function GuideListItem({ guide }: GuideListItemProps) {
  return (
    <li>
      <Link
        to="/guides/$slug"
        params={{ slug: guide.slug }}
        className="group grid items-start gap-6 py-10 md:grid-cols-12 md:gap-8"
      >
        <div className="md:col-span-4">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[color:var(--color-surface)] ring-1 ring-[color:var(--color-border)]">
            <img
              src={buildImageUrl(guide.heroImage, 'card')}
              alt={guide.title}
              width={800}
              height={600}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </div>
        <div className="md:col-span-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent)]">
            {guide.category}
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-tight tracking-tight text-[color:var(--color-ink)] transition group-hover:text-[color:var(--color-accent-deep)] md:text-[28px]">
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
    </li>
  )
}
