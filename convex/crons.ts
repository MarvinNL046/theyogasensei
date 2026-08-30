import { cronJobs } from 'convex/server'
import { internal } from './_generated/api'

/**
 * Offer refresh cadence.
 *
 * Amazon caps offer caching at one hour, and the read side refuses to serve
 * anything older. Running every 30 minutes means a row is at most ~30 minutes
 * old when a reader loads the page, so a single missed run still leaves the
 * cache inside its legal window instead of blanking every price at once.
 *
 * Cost is trivial: 42 tracked ASINs is five batched GetItems calls per run.
 */
const crons = cronJobs()

crons.interval(
  'refresh amazon offers',
  { minutes: 30 },
  internal.amazon.refreshOffers,
  {},
)

/**
 * Item data — images, titles, parent ASINs and the vended links — carries a
 * one-day TTL rather than the offer hour, so it gets its own daily job. It is
 * also the expensive one: seven Associates tracking IDs means seven passes,
 * paced, which is precisely why it must not ride along with the half-hourly
 * offer refresh.
 */
crons.interval(
  'refresh amazon item data and vended links',
  { hours: 24 },
  internal.amazon.refreshItems,
  {},
)

export default crons
