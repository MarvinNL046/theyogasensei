/**
 * Pinterest pin-poster — works through docs/pinterest-posting-queue.md.
 *
 * Reads the tiered folder order below (mirrors the queue doc), parses each
 * folder's `_pins.md` (pin file, title, description, target URL), and posts
 * the next unposted pins via the Pinterest v5 API. Images are referenced by
 * their live site URL (public/ is deployed), so no upload is needed.
 *
 * Spread rule: one pin per folder per run, rotating through the queue from
 * where the previous run stopped — so a run of 2 never dumps a whole folder.
 *
 * Run:   npx tsx scripts/pinterest/post-pins.ts [--count 2] [--dry-run]
 * Needs: scripts/pinterest/.token.json (from auth.ts) and PINTEREST_BOARD_ID
 *        in .env.local (find ids with:  npx tsx scripts/pinterest/post-pins.ts --boards).
 * State: scripts/pinterest/.posted.json (gitignored) records what went out.
 *
 * NOTE while the app only has Trial access: created pins are sandbox-only
 * (visible to the account itself, not to other users). Real distribution
 * needs Standard access — same script, no changes.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '../..')
const PIN_ROOT = resolve(ROOT, 'public/images/pins')
const TOKEN_FILE = resolve(import.meta.dirname, '.token.json')
const STATE_FILE = resolve(import.meta.dirname, '.posted.json')
const SITE = 'https://www.theyogasensei.com'

// Queue order — mirror of docs/pinterest-posting-queue.md. Tier 1 first.
const QUEUE = [
  // Tier 1
  'ai-yoga-mat-towel',
  'best-yoga-mat-towel',
  'best-yoga-mats',
  'best-yoga-mats-bold',
  'best-yoga-mats-2026',
  'ai-review-manduka',
  'manduka-yoga-mat',
  'ai-review-jade',
  'jade-yoga-mat',
  'ai-review-lululemon',
  'lululemon-yoga-mat',
  'manduka-vs-lululemon-yoga-mat',
  // Tier 2
  'best-yoga-mat-for-hot-yoga',
  'best-yoga-mat-for-hot-yoga-bold',
  'best-non-slip-yoga-mat',
  'best-yoga-mat-for-bad-knees',
  'ai-budget-beginners',
  'best-yoga-mat-for-beginners',
  'alo-yoga-mat',
  'ai-alo-vs-lululemon',
  'ai-liforme',
  'ai-manduka-grp',
  'gaiam-yoga-mat',
  'ai-review-gaiam',
  'retrospec-solana-yoga-mat',
  'cork-vs-rubber-yoga-mat',
  'ai-cork-vs-rubber',
  'eco-friendly-yoga-mat',
  'eco-friendly-yoga-mat-bold',
  'ai-yoga-blocks',
  'best-yoga-blocks',
  'ai-yoga-bolster',
  'best-yoga-bolster',
  'ai-mat-bag',
  'best-yoga-mat-bag',
  'ai-yoga-knee-pads',
  'ai-pilates-mat',
  'ai-pilates-grip-socks',
  'ai-foldable-yoga-mat',
  // Tier 3 — supporting how-tos and chair yoga
  'how-to-choose-a-yoga-mat',
  'how-thick-should-a-yoga-mat-be',
  'how-to-clean-a-yoga-mat',
  'ai-clean-mat',
  'how-to-clean-lululemon-yoga-mat',
  'how-to-store-a-yoga-mat',
  'chair-yoga-for-seniors',
  'chair-yoga-for-beginners',
  'free-chair-yoga-for-seniors',
  'printable-chair-yoga-for-seniors',
  // Poses last — browse intent, keeps the board alive only
  'childs-pose',
  'cobra-pose',
  'downward-facing-dog',
  'pigeon-pose',
  'sun-salutation',
  'sun-salutation-b',
  'sun-salutation-c',
  'warrior-ii',
  'morning-yoga-routine',
  'starter-guide',
]

type Pin = { folder: string; file: string; title: string; description: string; link: string }
type State = { posted: string[]; cursor: number }

const env = Object.fromEntries(
  readFileSync(resolve(ROOT, '.env.local'), 'utf8')
    .split(/\r?\n/)
    .filter((l) => l.includes('=') && !l.startsWith('#'))
    .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]),
)

function parsePinsMd(folder: string): Pin[] {
  const path = resolve(PIN_ROOT, folder, '_pins.md')
  if (!existsSync(path)) return []
  const md = readFileSync(path, 'utf8')
  const linkMatch = md.match(/\*\*Target URL[^:]*:\*\*\s*(\S+)/)
  const link = linkMatch?.[1] ?? ''
  const pins: Pin[] = []
  const sections = md.split(/^## /m).slice(1)
  for (const section of sections) {
    // Two _pins.md dialects: AI folders head sections with `01-name.png`,
    // generated folders head with `01-name` and carry an `**Image:**` line.
    const heading = section.match(/^([\w.-]+)/)?.[1]
    const imageLine = section.match(/\*\*Image:\*\*\s*`?([^\s`]+)`?/)?.[1]
    const file = imageLine ? imageLine.split('/').pop()! : heading?.endsWith('.png') ? heading : `${heading}.png`
    const sectionLink = section.match(/\*\*Link:\*\*\s*(\S+)/)?.[1]
    const title = section.match(/\*\*Pin title:\*\*\s*(.+)/)?.[1]?.trim()
    const description = section.match(/\*\*Pin description:\*\*\s*([\s\S]+?)(?:\n\s*-\s*\*\*|\n\s*\n|\n##|$)/)?.[1]?.replace(/\s+/g, ' ').trim()
    const pinLink = sectionLink ?? link
    if (file && title && description && pinLink && existsSync(resolve(PIN_ROOT, folder, file))) {
      pins.push({ folder, file, title, description, link: pinLink })
    }
  }
  return pins
}

async function api(pathname: string, init: RequestInit = {}) {
  const token = JSON.parse(readFileSync(TOKEN_FILE, 'utf8'))
  const res = await fetch(`https://api.pinterest.com/v5${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${pathname}: ${res.status} ${JSON.stringify(json)}`)
  return json
}

async function refreshToken() {
  const token = JSON.parse(readFileSync(TOKEN_FILE, 'utf8'))
  if (!token.refresh_token) return
  const res = await fetch('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${env.PINTEREST_APP_ID}:${env.PINTEREST_APP_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: token.refresh_token }),
  })
  const json = (await res.json()) as Record<string, unknown>
  if (res.ok && json.access_token) {
    writeFileSync(
      TOKEN_FILE,
      JSON.stringify(
        {
          access_token: json.access_token,
          refresh_token: json.refresh_token ?? token.refresh_token,
          obtained_at: new Date().toISOString(),
        },
        null,
        2,
      ),
    )
  }
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const count = Number(args[args.indexOf('--count') + 1]) || 2

  if (!existsSync(TOKEN_FILE) && !dryRun) {
    console.error('Geen token — draai eerst: npx tsx scripts/pinterest/auth.ts')
    process.exit(1)
  }
  if (!dryRun) await refreshToken()

  if (args.includes('--boards')) {
    const boards = await api('/boards')
    for (const b of boards.items ?? []) console.log(`${b.id}  ${b.name}`)
    return
  }

  const boardId = env.PINTEREST_BOARD_ID
  if (!boardId && !dryRun) {
    console.error('PINTEREST_BOARD_ID mist in .env.local (lijst: --boards)')
    process.exit(1)
  }

  const state: State = existsSync(STATE_FILE)
    ? JSON.parse(readFileSync(STATE_FILE, 'utf8'))
    : { posted: [], cursor: 0 }

  let postedThisRun = 0
  const startCursor = state.cursor
  for (let step = 0; step < QUEUE.length && postedThisRun < count; step++) {
    const idx = (startCursor + step) % QUEUE.length
    const folder = QUEUE[idx]
    const next = parsePinsMd(folder).find((p) => !state.posted.includes(`${p.folder}/${p.file}`))
    if (!next) continue

    const imageUrl = `${SITE}/images/pins/${next.folder}/${next.file}`
    if (dryRun) {
      console.log(`[dry-run] ${next.folder}/${next.file}\n  titel: ${next.title}\n  link:  ${next.link}\n  beeld: ${imageUrl}`)
    } else {
      await api('/pins', {
        method: 'POST',
        body: JSON.stringify({
          board_id: boardId,
          title: next.title.slice(0, 100),
          description: next.description.slice(0, 800),
          link: next.link,
          alt_text: next.title.slice(0, 500),
          media_source: { source_type: 'image_url', url: imageUrl },
        }),
      })
      console.log(`Gepost: ${next.folder}/${next.file} -> ${next.link}`)
    }
    state.posted.push(`${next.folder}/${next.file}`)
    state.cursor = (idx + 1) % QUEUE.length
    postedThisRun++
  }

  if (!dryRun) writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
  console.log(`${dryRun ? 'Zou posten' : 'Gepost'}: ${postedThisRun} pin(s). Totaal geregistreerd: ${state.posted.length}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
