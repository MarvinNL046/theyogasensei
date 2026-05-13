/**
 * Cloudflare Images variant registry.
 *
 * Each variant must be created in the Cloudflare Images dashboard with the
 * EXACT name listed here. Cloudflare URL shape:
 *   https://imagedelivery.net/<accountHash>/<imageId>/<variantName>
 *
 * The dimensions below are reference values — Cloudflare crops/resizes
 * server-side based on the dashboard variant config. Keep this file in sync
 * with the dashboard.
 */

export const IMAGE_VARIANTS = {
  /** Pinterest pin — vertical, primary asset on every cluster/pillar. */
  pin: { width: 1000, height: 1500, fit: 'cover' },
  /** Open Graph + Twitter Card — used as og:image fallback. */
  og: { width: 1200, height: 630, fit: 'cover' },
  /** In-page card thumbnails — featured-card grids on home + indexes. */
  card: { width: 800, height: 1067, fit: 'cover' },
  /** Tiny preview — author headshots, inline pose thumbnails. */
  thumb: { width: 400, height: 533, fit: 'cover' },
} as const

export type ImageVariant = keyof typeof IMAGE_VARIANTS

const ACCOUNT_HASH = import.meta.env.VITE_CLOUDFLARE_IMAGES_ACCOUNT_HASH ?? ''

/**
 * Build a Cloudflare Images delivery URL for a given image id + variant.
 * Returns a placeholder path when the account hash is unset — useful for
 * Phase 1 local dev before the CF account is hooked up.
 */
export function buildImageUrl(id: string, variant: ImageVariant): string {
  if (!ACCOUNT_HASH) {
    // Placeholder served from /public/ if it exists; otherwise a 404. Real
    // URLs land once VITE_CLOUDFLARE_IMAGES_ACCOUNT_HASH is set.
    return `/images/${id}-${variant}.placeholder`
  }
  return `https://imagedelivery.net/${ACCOUNT_HASH}/${encodeURIComponent(id)}/${variant}`
}

export function imageDimensions(variant: ImageVariant): {
  width: number
  height: number
} {
  const v = IMAGE_VARIANTS[variant]
  return { width: v.width, height: v.height }
}
