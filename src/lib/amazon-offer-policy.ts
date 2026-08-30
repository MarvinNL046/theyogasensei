/**
 * The caching rules the Amazon Creators API imposes on us, in one place.
 *
 * These are not tuning knobs. Amazon's best-practices guide prescribes both
 * numbers, and serving an offer past its window is a compliance failure, not a
 * stale-cache annoyance. They live here — dependency-free — so the Convex
 * query, the cron cadence and the tests all read the same constants.
 */

/** Offers (price, availability) may be cached for at most one hour. */
export const OFFER_TTL_MS = 60 * 60 * 1000

/** Titles, images and vended links may be cached for a day. */
export const ITEM_TTL_MS = 24 * 60 * 60 * 1000

/**
 * May an offer fetched at `fetchedAt` still be shown at `now`?
 *
 * Deliberately strict at the boundary and about nonsense input: an absent or
 * future timestamp is not fresh. The caller's fallback (render no price) is
 * always safe, so when in doubt this returns false.
 */
export function isOfferFresh(
  fetchedAt: number | undefined,
  now: number,
  ttlMs: number = OFFER_TTL_MS,
): fetchedAt is number {
  if (fetchedAt === undefined) return false
  if (!Number.isFinite(fetchedAt)) return false
  const age = now - fetchedAt
  if (age < 0) return false
  return age <= ttlMs
}

/**
 * Does this cached row carry something we are allowed to display as a price?
 * An amount without a display string is not renderable, and a display string
 * without an amount cannot be trusted.
 */
export function hasDisplayablePrice<
  T extends { amount?: number; displayAmount?: string },
>(row: T): row is T & { amount: number; displayAmount: string } {
  return typeof row.amount === 'number' && Boolean(row.displayAmount)
}
