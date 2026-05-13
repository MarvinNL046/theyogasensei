import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { affiliateLinks } from '#/content/affiliate-links'

/**
 * Affiliate redirect. Excluded from prerender via vite.config.ts → prerender.filter.
 * Outbound <a href="/go/<slug>"> links must use rel="sponsored nofollow" — that
 * happens at the link emit site (in MDX or in the AffiliateButton component),
 * not here.
 */
export const Route = createFileRoute('/go/$slug')({
  loader: ({ params }) => {
    const target = affiliateLinks[params.slug]
    if (!target) {
      throw notFound()
    }
    throw redirect({ href: target, statusCode: 302 })
  },
  head: () => ({
    meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  }),
  // Component never renders — the loader always throws. Required by the
  // createFileRoute signature.
  component: () => null,
})
