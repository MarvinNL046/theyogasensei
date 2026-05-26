import { createFileRoute, notFound } from '@tanstack/react-router'
import { affiliateRedirectHeaders } from '#/lib/affiliate-redirect-headers'

/**
 * Explicit /go/ handler so the no-slug affiliate path gets the same defensive
 * noindex/no-store headers as /go/$slug unknown-slug responses.
 */
export const Route = createFileRoute('/go/')({
  loader: () => {
    throw notFound({ headers: affiliateRedirectHeaders })
  },
  head: () => ({
    meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  }),
  headers: () => affiliateRedirectHeaders,
  component: () => null,
})
