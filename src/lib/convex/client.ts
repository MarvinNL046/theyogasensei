import { ConvexReactClient } from 'convex/react'

const PLACEHOLDER_URL = 'https://placeholder.convex.cloud'

const convexUrl = import.meta.env.VITE_CONVEX_URL ?? ''

export const isConvexConfigured = Boolean(convexUrl)

/**
 * Single ConvexReactClient instance for the whole app.
 *
 * If VITE_CONVEX_URL is unset (Phase 1 before `pnpm convex dev`), we
 * construct the client with a syntactically-valid placeholder URL. That
 * keeps <ConvexProvider> mounted (so useConvex() hooks don't blow up) but
 * any actual mutation call will fail. NewsletterCapture checks
 * `isConvexConfigured` and falls back to its simulated-submit path.
 */
export const convex = new ConvexReactClient(convexUrl || PLACEHOLDER_URL)
