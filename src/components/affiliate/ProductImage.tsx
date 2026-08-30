import { useEffect, useState } from 'react'
import { convex, isConvexConfigured } from '#/lib/convex/client'
import { api } from '../../../convex/_generated/api'
import { asinForSlug } from '#/lib/affiliate-asins'
import { cn } from '#/lib/utils'

/**
 * Product thumbnail that upgrades to the real Amazon photo when one is
 * available, and otherwise shows the local editorial image.
 *
 * WHY THIS EXISTS. Until 2026-08-30 we had no licensed source of product
 * photography, so cards used our own generated imagery: on-brand, but a
 * generic mat standing in for a named product. Creators API access provides
 * the actual listing photo for the exact ASIN the reader will land on, which
 * is both more honest and more useful.
 *
 * TWO RULES THIS COMPONENT KEEPS:
 *  - Amazon images must be served from Amazon's CDN. We store the URL, never
 *    the bytes, and never rehost or proxy them.
 *  - The local image is the one that paints first, so the card is never empty
 *    and never shifts. The API photo replaces it only after it has fully
 *    decoded, which means a failed or slow fetch degrades to exactly the
 *    rendering we had before.
 */
export interface ProductImageProps {
  /** Affiliate slug; must exist in src/lib/affiliate-asins.ts */
  slug: string
  /** Local editorial image. Always rendered first, and kept if no API photo. */
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

interface ApiImage {
  url: string
  width?: number
  height?: number
}

/** One round trip per slug per page, however many cards ask for it. */
const cache = new Map<string, Promise<ApiImage | null>>()

function loadImage(slug: string): Promise<ApiImage | null> {
  const hit = cache.get(slug)
  if (hit) return hit

  const request = (
    convex.query(api.amazonOffers.getImagesBySlugs, {
      slugs: [slug],
    }) as Promise<Record<string, ApiImage>>
  )
    .then((images) => images[slug] ?? null)
    .catch(() => null)

  cache.set(slug, request)
  return request
}

/** Resolves once the browser has the bytes, so the swap cannot show a gap. */
function preload(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject(new Error('image failed to load'))
    img.src = url
  })
}

export function ProductImage({
  slug,
  src,
  alt,
  width = 800,
  height = 600,
  className,
}: ProductImageProps) {
  const [apiSrc, setApiSrc] = useState<string | null>(null)

  useEffect(() => {
    if (!isConvexConfigured || !asinForSlug(slug)) return

    let cancelled = false
    loadImage(slug)
      .then(async (image) => {
        if (!image || cancelled) return
        await preload(image.url)
        if (!cancelled) setApiSrc(image.url)
      })
      .catch(() => {
        // Offline, cold cache, or a dead image URL. Keep the local image.
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <img
      src={apiSrc ?? src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={cn(
        'aspect-[4/3] w-full',
        // Local editorial images are shot to fill the box, so they keep the
        // cover behaviour they have always had. Amazon listing photos are
        // product-on-white and would be cropped by cover, so they are fitted
        // instead — with a white ground so the letterboxing reads as a
        // deliberate product shot rather than a rendering fault.
        apiSrc ? 'bg-white object-contain p-2' : 'object-cover',
        className,
      )}
    />
  )
}

export default ProductImage
