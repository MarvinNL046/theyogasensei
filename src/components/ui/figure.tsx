import type { ReactNode } from 'react'
import { cn } from '#/lib/utils'
import { Image } from '#/components/ui/image'
import type { ImageVariant } from '#/lib/images/variants'

export interface FigureProps {
  /** Cloudflare Images ID (e.g. "guides/how-to-choose-a-yoga-mat/materials"). */
  id: string
  /** Alt text — required. Screen-readers + SEO. */
  alt: string
  /** Caption shown beneath the image. Should add context, not restate the alt. */
  caption?: ReactNode
  /** Variant — defaults to the in-body editorial 3:2 landscape. */
  variant?: ImageVariant
  /** Set true only for an above-fold figure (rare inside articles). */
  priority?: boolean
  className?: string
}

/**
 * In-body editorial figure: image + optional caption, wrapped in <figure>.
 * CLS-safe (width/height inherited from <Image>). Lives outside .prose so the
 * article's paragraph typography never touches the caption — drop straight into
 * MDX between sections.
 */
export function Figure({
  id,
  alt,
  caption,
  variant = 'inline',
  priority,
  className,
}: FigureProps) {
  return (
    <figure className={cn('not-prose my-8', className)}>
      <div className="overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
        <Image
          id={id}
          variant={variant}
          alt={alt}
          priority={priority}
          className="w-full"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
