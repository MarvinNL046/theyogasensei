import { defineEventHandler, setHeaders, setResponseStatus } from 'h3'
import { affiliateRedirectHeaders } from '../../../src/lib/affiliate-redirect-headers'

export default defineEventHandler((event) => {
  setHeaders(event, affiliateRedirectHeaders)
  setResponseStatus(event, 404, 'Affiliate link not found')
  return 'Affiliate link not found'
})
