import { cn } from '#/lib/utils'
import {
  buildImageUrl,
  imageDimensions,
  type ImageVariant,
} from '#/lib/images/variants'

export interface ImageProps {
  /** Cloudflare Images ID (e.g. "poses/sun-salutation-hero"). */
  id: string
  /** Variant — must match a name in IMAGE_VARIANTS. */
  variant: ImageVariant
  /** Alt text — required. Screen-readers + SEO. */
  alt: string
  /**
   * Set true for the LCP image on a route (hero, above-fold). Sets
   * loading="eager" + fetchPriority="high". Defaults to lazy below-fold.
   */
  priority?: boolean
  className?: string
}

/**
 * Cloudflare Images-backed <img>. Emits width/height for CLS prevention,
 * loading + fetchPriority for LCP control, and the right delivery URL.
 *
 * Phase 1: URL falls back to a placeholder path if
 * VITE_CLOUDFLARE_IMAGES_ACCOUNT_HASH is unset. The page still renders;
 * the image just 404s until the account is hooked up.
 */
export function Image({ id, variant, alt, priority, className }: ImageProps) {
  const src = buildImageUrl(id, variant)
  const { width, height } = imageDimensions(variant)
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={cn('h-auto max-w-full', className)}
    />
  )
}
