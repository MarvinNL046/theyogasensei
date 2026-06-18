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
  /** In-body editorial figure — 3:2 landscape, sits between text in articles. */
  inline: { width: 1280, height: 854, fit: 'cover' },
  /** Tiny preview — author headshots, inline pose thumbnails. */
  thumb: { width: 400, height: 533, fit: 'cover' },
} as const

export type ImageVariant = keyof typeof IMAGE_VARIANTS

const ACCOUNT_HASH = import.meta.env.VITE_CLOUDFLARE_IMAGES_ACCOUNT_HASH ?? ''
const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'https://theyogasensei.com'

const LOCAL_FALLBACK_IMAGES: Record<ImageVariant, string> = {
  pin: '/images/brand/review-hero-best-mats.webp',
  og: '/images/brand/article-hero-morning-yoga.webp',
  card: '/images/brand/article-hero-morning-yoga.webp',
  inline: '/images/brand/article-hero-morning-yoga.webp',
  thumb: '/images/brand/avatar-yoga-sensei.webp',
}

function localImagePath(id: string): string | null {
  if (id.startsWith('http://') || id.startsWith('https://')) return id
  if (id.startsWith('/')) return id
  if (id.startsWith('guides/') || id.startsWith('poses/')) {
    // Cache-bust the chair-yoga cluster only. Those pages went live ~1.5h
    // before their image files were added, so Vercel's CDN negatively cached
    // 404s on the bare paths and kept serving them on some edges. A version
    // query is a fresh cache key → guaranteed 200. Bump v if it ever recurs.
    const v = id.includes('chair-yoga') ? '?v=2' : ''
    return `/images/${id}.webp${v}`
  }
  return null
}

/**
 * Build a Cloudflare Images delivery URL for a given image id + variant.
 * Visible page rendering should use root-relative local assets so images work
 * in dev, preview and production before Cloudflare Images is configured.
 * SEO/social metadata can wrap this with buildAbsoluteImageUrl().
 */
export function buildImageUrl(id: string, variant: ImageVariant): string {
  const localPath = localImagePath(id)
  if (localPath) return localPath
  if (!ACCOUNT_HASH) return LOCAL_FALLBACK_IMAGES[variant]
  return `https://imagedelivery.net/${ACCOUNT_HASH}/${encodeURIComponent(id)}/${variant}`
}

export function buildAbsoluteImageUrl(
  id: string,
  variant: ImageVariant,
  siteUrl = SITE_URL,
): string {
  return absLocalWithBase(buildImageUrl(id, variant), siteUrl)
}

function absLocalWithBase(path: string, siteUrl: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${siteUrl.replace(/\/$/, '')}${path}`
}

export function imageDimensions(variant: ImageVariant): {
  width: number
  height: number
} {
  const v = IMAGE_VARIANTS[variant]
  return { width: v.width, height: v.height }
}
