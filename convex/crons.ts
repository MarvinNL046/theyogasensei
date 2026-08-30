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

export default crons
