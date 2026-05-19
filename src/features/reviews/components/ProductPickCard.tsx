import { ArrowRight } from 'lucide-react'
import { Badge } from '#/components/ui/badge'
import type { YogaMat } from '#/features/reviews/data/yoga-mats'
import { RatingStars } from './RatingStars'

interface ProductPickCardProps {
  mat: YogaMat
}

export function ProductPickCard({ mat }: ProductPickCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-bg)]">
        <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[color:var(--color-olive)] font-serif text-sm italic leading-none text-[color:var(--color-bg)]">
            {mat.rank}
          </span>
          <Badge variant="soft">{mat.category}</Badge>
        </div>
        <img
          src={mat.image}
          alt={mat.name}
          width={400}
          height={300}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="min-h-12 font-serif text-base leading-snug text-[color:var(--color-ink)]">
          {mat.name}
        </h3>

        <RatingStars rating={mat.rating} />

        <a
          href={mat.affiliateUrl}
          rel="sponsored noopener noreferrer"
          target="_blank"
          className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-[color:var(--color-olive)] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
        >
          View price
          <ArrowRight className="h-3 w-3" strokeWidth={1.75} />
        </a>
      </div>
    </article>
  )
}
