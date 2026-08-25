/**
 * Buy-box audit for every Amazon destination in src/lib/affiliate-links.ts.
 *
 * Why this exists, separate from verify-affiliate-destinations.ts: that script
 * runs in the build and checks the SHAPE of each link (exact /dp/ASIN form, no
 * frozen tags, no duplicate ASINs). It cannot tell whether the ASIN still sells.
 *
 * On 2026-08-18 the eKO 5mm slug pointed at B078YB99H8 for weeks. The listing
 * was live and reported is_available: true, but carried no buy box at all — no
 * headline offer, so five live guides were sending readers to a page they could
 * not straightforwardly buy from, earning nothing. Nothing in the build caught
 * it. This script is the thing that would have.
 *
 * Usage:
 *   npx tsx scripts/audit-affiliate-stock.ts            # audit every ASIN
 *   npx tsx scripts/audit-affiliate-stock.ts --slug x   # audit one slug
 *   npx tsx scripts/audit-affiliate-stock.ts --json     # machine-readable
 *
 * Exit codes: 0 = all sellable, 1 = at least one FAIL, 2 = only WARNs.
 * Deliberately NOT wired into `pnpm build` — it is a paid network call per ASIN
 * and Amazon stock is not a reason to block a deploy. Run it on a schedule.
 *
 * Cost: one DataForSEO Amazon "product info" request per ASIN (~40 today).
 * Credentials come from .env.local, same as scripts/seo-research.ts.
 *
 * COMPLIANCE: this script prints prices to the OPERATOR's terminal only. Never
 * copy a number from its output into content/ — Associates forbids static
 * prices outside the PA-API, and verify-associates-compliance.ts fails the
 * build on them. Price here is a liveness signal, not publishable data.
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { affiliateLinks } from '../src/lib/affiliate-links'

const ROOT = resolve(import.meta.dirname, '..')
const API = 'https://api.dataforseo.com/v3'
const ASIN_PATH = /^\/dp\/([A-Z0-9]{10})\/?$/
/** Amazon rate-limits hard on bursts; keep concurrency low and polite. */
const CONCURRENCY = 4

type Status = 'OK' | 'WARN' | 'FAIL'

interface Result {
  slug: string
  asin: string
  status: Status
  title: string
  reason: string
}

// --- credentials (from .env.local, never committed) -----------------------
function loadEnvLocal(): void {
  const path = resolve(ROOT, '.env.local')
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!m) continue
    const [, key = '', rawValue = ''] = m
    if (key && !(key in process.env)) {
      process.env[key] = rawValue.replace(/^["']|["']$/g, '')
    }
  }
}

function authHeader(): string {
  loadEnvLocal()
  const explicit = process.env.DATAFORSEO_BASE64?.trim()
  if (explicit) return 'Basic ' + explicit
  const login = process.env.DATAFORSEO_LOGIN?.trim()
  const password = process.env.DATAFORSEO_PASSWORD?.trim()
  if (!login || !password) {
    console.error(
      'Missing credentials. In .env.local set DATAFORSEO_LOGIN + DATAFORSEO_PASSWORD,\n' +
        'or DATAFORSEO_BASE64=<token from the API Access tab>.',
    )
    process.exit(1)
  }
  return 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64')
}

async function fetchAsin(asin: string): Promise<any | null> {
  const res = await fetch(`${API}/merchant/amazon/asin/live/advanced`, {
    method: 'POST',
    headers: {
      Authorization: authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      { asin, language_code: 'en_US', location_name: 'United States' },
    ]),
  })
  const json = await res.json()
  if (json.status_code !== 20000) {
    throw new Error(`DataForSEO ${json.status_code}: ${json.status_message}`)
  }
  // The task carries its own status. A wrong endpoint path returns 20000 at the
  // top level and 40402 on the task — reading only the outer code makes every
  // ASIN look dead. Throwing here turns that into a WARN ("lookup failed"),
  // which is a config problem, not evidence about the listing.
  const task = json.tasks?.[0]
  if (task?.status_code !== 20000) {
    throw new Error(
      `DataForSEO task ${task?.status_code}: ${task?.status_message}`,
    )
  }
  return task.result?.[0]?.items?.[0] ?? null
}

/**
 * The judgement call this script exists to make.
 *
 * `is_available` alone is not enough — B078YB99H8 reported true while having no
 * offer at all. A destination is only genuinely sellable when it has a headline
 * price. Missing price is therefore a FAIL, not a WARN: it is the exact failure
 * mode that went unnoticed for weeks.
 */
function judge(item: any | null): { status: Status; reason: string } {
  if (!item)
    return {
      status: 'FAIL',
      reason: 'no product returned — ASIN dead or wrong marketplace',
    }

  const price = item.price_from ?? item.price
  if (price == null) {
    return {
      status: 'FAIL',
      reason:
        'no buy box — listing has no headline offer, so a click earns nothing',
    }
  }
  if (item.is_available === false) {
    return { status: 'FAIL', reason: 'marked unavailable' }
  }
  const title = String(item.title ?? '')
  if (!title)
    return { status: 'WARN', reason: 'no title returned — check by hand' }

  return {
    status: 'OK',
    reason: `buy box present (${price} ${item.currency ?? ''})`.trim(),
  }
}

async function mapLimit<T, TResult>(
  items: Array<T>,
  limit: number,
  fn: (item: T) => Promise<TResult>,
): Promise<Array<TResult>> {
  const out: Array<TResult> = new Array(items.length)
  let next = 0
  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (next < items.length) {
        const i = next++
        const item = items[i]
        if (item === undefined) continue
        out[i] = await fn(item)
      }
    },
  )
  await Promise.all(workers)
  return out
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const asJson = args.includes('--json')
  const slugFilter = args.includes('--slug')
    ? args[args.indexOf('--slug') + 1]
    : null

  const targets: Array<{ slug: string; asin: string }> = []
  const skipped: Array<string> = []

  for (const [slug, rawUrl] of Object.entries(affiliateLinks)) {
    if (slugFilter && slug !== slugFilter) continue
    let url: URL
    try {
      url = new URL(rawUrl)
    } catch {
      skipped.push(`${slug}: unparseable URL`)
      continue
    }
    const host = url.hostname.toLowerCase()
    const isAmazon =
      host === 'amazon.com' ||
      host.startsWith('amazon.') ||
      host.includes('.amazon.')
    if (!isAmazon) {
      skipped.push(`${slug}: not an Amazon destination (${host})`)
      continue
    }
    const m = url.pathname.match(ASIN_PATH)
    if (!m) {
      skipped.push(`${slug}: not in /dp/ASIN form`)
      continue
    }
    targets.push({ slug, asin: m[1] ?? '' })
  }

  if (!targets.length) {
    console.error(
      slugFilter
        ? `No Amazon destination found for slug "${slugFilter}".`
        : 'No Amazon destinations found.',
    )
    process.exit(1)
  }

  if (!asJson)
    console.log(`Auditing ${targets.length} Amazon destination(s)...\n`)

  const results = await mapLimit(
    targets,
    CONCURRENCY,
    async ({ slug, asin }): Promise<Result> => {
      try {
        const item = await fetchAsin(asin)
        const { status, reason } = judge(item)
        return {
          slug,
          asin,
          status,
          title: String(item?.title ?? '').slice(0, 60),
          reason,
        }
      } catch (err) {
        // A transport failure is not evidence the listing is dead. Say so plainly
        // rather than reporting a false FAIL that sends someone chasing a ghost.
        return {
          slug,
          asin,
          status: 'WARN',
          title: '',
          reason: `lookup failed: ${err instanceof Error ? err.message : String(err)}`,
        }
      }
    },
  )

  const fails = results.filter((r) => r.status === 'FAIL')
  const warns = results.filter((r) => r.status === 'WARN')

  if (asJson) {
    console.log(
      JSON.stringify(
        { results, skipped, fails: fails.length, warns: warns.length },
        null,
        2,
      ),
    )
  } else {
    for (const r of results.sort(
      (a, b) =>
        a.status.localeCompare(b.status) || a.slug.localeCompare(b.slug),
    )) {
      const mark =
        r.status === 'OK' ? 'ok  ' : r.status === 'WARN' ? 'WARN' : 'FAIL'
      console.log(`${mark}  ${r.slug.padEnd(28)} ${r.asin}  ${r.reason}`)
      if (r.status !== 'OK' && r.title) console.log(`      ${r.title}`)
    }
    if (skipped.length) {
      console.log(`\nSkipped (not auditable here):`)
      for (const s of skipped) console.log(`  - ${s}`)
    }
    console.log(
      `\n${results.length} audited — ${results.length - fails.length - warns.length} ok, ${warns.length} warn, ${fails.length} fail`,
    )
    if (fails.length) {
      console.log(
        `\nTo fix a FAIL: find a live sibling ASIN under the same parent, confirm its\n` +
          `specs match what the copy claims, then repoint the slug in\n` +
          `src/lib/affiliate-links.ts with a comment saying what you checked.\n` +
          `Check whether any page names a colour or size before you swap.`,
      )
    }
  }

  // Let Node close DataForSEO's HTTP handles cleanly. A synchronous
  // process.exit() can abort libuv while undici is still releasing a Windows
  // socket, producing UV_HANDLE_CLOSING after a successful audit.
  process.exitCode = fails.length ? 1 : warns.length ? 2 : 0
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
