/**
 * DataForSEO research helper for theyogasensei.
 *
 * Reads credentials from .env.local (DATAFORSEO_LOGIN + DATAFORSEO_PASSWORD) —
 * never hardcode them. The file is gitignored.
 *
 * Modes:
 *   npx tsx scripts/seo-research.ts enrich
 *     → pulls real search volume + keyword difficulty + intent for every primary
 *       keyword in keywords.csv (DataForSEO Labs, US/English) and prints a report
 *       comparing them to the CSV's seed estimates. Read-only; does not edit the CSV.
 *
 *   npx tsx scripts/seo-research.ts quickwins <domain>
 *     → lists keywords the domain ranks for in positions 11-20 (page 2 = quick wins),
 *       sorted by search volume. Useful in the GSC measure phase.
 *
 * Cost: each run is a small number of paid DataForSEO requests. Labs is cheap.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const API = 'https://api.dataforseo.com/v3'
const LOCATION_CODE = 2840 // United States
const LANGUAGE_CODE = 'en'

// --- credentials (from .env.local, never committed) -----------------------
function loadEnvLocal(): void {
  const path = resolve(ROOT, '.env.local')
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !(m[1] in process.env)) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  }
}

/** Returns true if `s` is a base64 string that decodes to a "login:password" pair. */
function isBase64LoginToken(s: string): boolean {
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(s) || s.length < 8) return false
  try {
    return Buffer.from(s, 'base64').toString('utf8').includes(':')
  } catch {
    return false
  }
}

function authHeader(): string {
  loadEnvLocal()
  const login = process.env.DATAFORSEO_LOGIN?.trim()
  const password = process.env.DATAFORSEO_PASSWORD?.trim()

  // Accept a ready-made base64 token (as shown in DataForSEO's API Access tab),
  // via DATAFORSEO_BASE64 or pasted into DATAFORSEO_LOGIN by mistake.
  const explicit = process.env.DATAFORSEO_BASE64?.trim()
  if (explicit) return 'Basic ' + explicit
  if (login && isBase64LoginToken(login)) return 'Basic ' + login

  if (!login || !password) {
    console.error(
      'Missing credentials. In .env.local (gitignored) set either:\n' +
        '  DATAFORSEO_LOGIN=your-login   and   DATAFORSEO_PASSWORD=your-password\n' +
        'or the ready-made token:\n  DATAFORSEO_BASE64=<base64 from the API Access tab>',
    )
    process.exit(1)
  }
  return 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64')
}

async function post(endpoint: string, body: unknown): Promise<any> {
  const res = await fetch(`${API}${endpoint}`, {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (json.status_code !== 20000) {
    throw new Error(`DataForSEO ${endpoint}: ${json.status_code} ${json.status_message}`)
  }
  return json
}

// --- csv parsing ----------------------------------------------------------
function parseCsvLine(line: string): Array<string> {
  const out: Array<string> = []
  let cur = ''
  let inQ = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++ } else inQ = !inQ
    } else if (c === ',' && !inQ) { out.push(cur); cur = '' } else cur += c
  }
  out.push(cur)
  return out
}

interface Row { primary: string; csvVol: string; csvKd: string; status: string }

function readKeywords(): Array<Row> {
  const raw = readFileSync(resolve(ROOT, 'keywords.csv'), 'utf8')
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0)
  const header = parseCsvLine(lines[0])
  const idx = (name: string) => header.indexOf(name)
  const iP = idx('primary_keyword'), iV = idx('volume'), iK = idx('kd'), iS = idx('status')
  return lines.slice(1).map((l) => {
    const c = parseCsvLine(l)
    return { primary: c[iP] ?? '', csvVol: c[iV] ?? '', csvKd: c[iK] ?? '', status: c[iS] ?? '' }
  }).filter((r) => r.primary)
}

// --- modes ----------------------------------------------------------------
async function enrich(): Promise<void> {
  const rows = readKeywords()
  const keywords = rows.map((r) => r.primary)
  console.log(`Fetching real volume + KD for ${keywords.length} keywords (US/en)...\n`)

  const json = await post('/dataforseo_labs/google/keyword_overview/live', [
    { keywords, location_code: LOCATION_CODE, language_code: LANGUAGE_CODE },
  ])
  const items: Array<any> = json.tasks?.[0]?.result?.[0]?.items ?? []
  const byKw = new Map<string, any>()
  for (const it of items) byKw.set((it.keyword || '').toLowerCase(), it)

  type Out = Row & { realVol: number | null; realKd: number | null; intent: string }
  const out: Array<Out> = rows.map((r) => {
    const it = byKw.get(r.primary.toLowerCase())
    return {
      ...r,
      realVol: it?.keyword_info?.search_volume ?? null,
      realKd: it?.keyword_properties?.keyword_difficulty ?? null,
      intent: it?.search_intent_info?.main_intent ?? '',
    }
  })

  // opportunity = volume / max(kd,1); higher = better quick win
  const score = (o: Out) => (o.realVol ?? 0) / Math.max(o.realKd ?? 100, 1)
  out.sort((a, b) => score(b) - score(a))

  const pad = (s: string, n: number) => (s + ' '.repeat(n)).slice(0, n)
  console.log(pad('keyword', 38) + pad('status', 9) + pad('vol(csv→real)', 18) + pad('kd(csv→real)', 16) + 'intent')
  console.log('-'.repeat(95))
  for (const o of out) {
    const vol = `${o.csvVol || '?'} → ${o.realVol ?? '—'}`
    const kd = `${o.csvKd || '?'} → ${o.realKd ?? '—'}`
    console.log(pad(o.primary, 38) + pad(o.status, 9) + pad(vol, 18) + pad(kd, 16) + o.intent)
  }
  console.log(`\nSorted by opportunity (real volume ÷ KD). Top rows with status=todo are the best next picks.`)
}

async function quickwins(domain: string): Promise<void> {
  if (!domain) { console.error('Usage: quickwins <domain>'); process.exit(1) }
  console.log(`Ranked keywords for ${domain} in positions 11-20 (page-2 quick wins)...\n`)
  const json = await post('/dataforseo_labs/google/ranked_keywords/live', [
    {
      target: domain,
      location_code: LOCATION_CODE,
      language_code: LANGUAGE_CODE,
      limit: 1000,
      filters: [
        ['ranked_serp_element.serp_item.rank_absolute', '>=', 11],
        'and',
        ['ranked_serp_element.serp_item.rank_absolute', '<=', 20],
      ],
      order_by: ['keyword_data.keyword_info.search_volume,desc'],
    },
  ])
  const items: Array<any> = json.tasks?.[0]?.result?.[0]?.items ?? []
  const pad = (s: string, n: number) => (s + ' '.repeat(n)).slice(0, n)
  console.log(pad('keyword', 44) + pad('pos', 6) + pad('vol', 9) + 'url')
  console.log('-'.repeat(95))
  for (const it of items) {
    const kw = it.keyword_data?.keyword ?? ''
    const pos = it.ranked_serp_element?.serp_item?.rank_absolute ?? ''
    const vol = it.keyword_data?.keyword_info?.search_volume ?? ''
    const url = it.ranked_serp_element?.serp_item?.relative_url ?? it.ranked_serp_element?.serp_item?.url ?? ''
    console.log(pad(kw, 44) + pad(String(pos), 6) + pad(String(vol), 9) + url)
  }
  if (items.length === 0) console.log('(no page-2 keywords yet — normal for a young site)')
  else console.log(`\n${items.length} page-2 keywords. These are the closest to page 1 — best targets to strengthen.`)
}

function serializeCsvCell(s: string): string {
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/** Fetch real volume + KD per keyword, with a google_ads volume fallback for gaps. */
async function fetchMetrics(keywords: Array<string>): Promise<Map<string, { vol: number | null; kd: number | null; intent: string }>> {
  const out = new Map<string, { vol: number | null; kd: number | null; intent: string }>()
  const ov = await post('/dataforseo_labs/google/keyword_overview/live', [
    { keywords, location_code: LOCATION_CODE, language_code: LANGUAGE_CODE },
  ])
  for (const it of ov.tasks?.[0]?.result?.[0]?.items ?? []) {
    out.set((it.keyword || '').toLowerCase(), {
      vol: it.keyword_info?.search_volume ?? null,
      kd: it.keyword_properties?.keyword_difficulty ?? null,
      intent: it.search_intent_info?.main_intent ?? '',
    })
  }
  // Fallback: keywords with no volume → google_ads search_volume (different source).
  const missing = keywords.filter((k) => (out.get(k.toLowerCase())?.vol ?? null) === null)
  if (missing.length) {
    try {
      const sv = await post('/keywords_data/google_ads/search_volume/live', [
        { keywords: missing, location_code: LOCATION_CODE, language_code: LANGUAGE_CODE },
      ])
      for (const it of sv.tasks?.[0]?.result ?? []) {
        const key = (it.keyword || '').toLowerCase()
        const prev = out.get(key) ?? { vol: null, kd: null, intent: '' }
        if (it.search_volume != null) out.set(key, { ...prev, vol: it.search_volume })
      }
    } catch (e: any) {
      console.warn(`  (google_ads fallback skipped: ${e.message})`)
    }
  }
  return out
}

async function update(): Promise<void> {
  const path = resolve(ROOT, 'keywords.csv')
  const raw = readFileSync(path, 'utf8')
  const lines = raw.split(/\r?\n/)
  const nonEmpty = lines.filter((l) => l.trim().length > 0)
  const header = parseCsvLine(nonEmpty[0])
  const iP = header.indexOf('primary_keyword'), iV = header.indexOf('volume'), iK = header.indexOf('kd')

  const keywords = nonEmpty.slice(1).map((l) => parseCsvLine(l)[iP]).filter(Boolean)
  console.log(`Fetching real volume + KD for ${keywords.length} keywords (with google_ads fallback)...`)
  const m = await fetchMetrics(keywords)

  let updated = 0
  const stillMissing: Array<string> = []
  const outLines = lines.map((line) => {
    if (!line.trim() || line === nonEmpty[0]) return line
    const cells = parseCsvLine(line)
    const kw = (cells[iP] || '').toLowerCase()
    const data = m.get(kw)
    if (!data) { if (cells[iP]) stillMissing.push(cells[iP]); return line }
    if (data.vol != null) cells[iV] = String(data.vol)
    if (data.kd != null) cells[iK] = String(data.kd)
    if (data.vol == null && data.kd == null && cells[iP]) stillMissing.push(cells[iP])
    if (data.vol != null || data.kd != null) updated++
    return cells.map(serializeCsvCell).join(',')
  })

  writeFileSync(path, outLines.join('\n'))
  console.log(`✓ Updated volume/kd for ${updated} rows in keywords.csv.`)
  if (stillMissing.length) console.log(`  No data for: ${stillMissing.join(', ')} (kept existing values).`)
}

async function whoami(): Promise<void> {
  loadEnvLocal()
  const has = (k: string) => (process.env[k]?.trim() ? 'set' : 'empty')
  const loginVal = process.env.DATAFORSEO_LOGIN?.trim() ?? ''
  const src = process.env.DATAFORSEO_BASE64?.trim()
    ? 'DATAFORSEO_BASE64'
    : loginVal && isBase64LoginToken(loginVal)
      ? 'DATAFORSEO_LOGIN (looks like base64 token)'
      : process.env.DATAFORSEO_PASSWORD?.trim()
        ? 'LOGIN + PASSWORD'
        : 'NONE'
  console.log(`env: DATAFORSEO_BASE64=${has('DATAFORSEO_BASE64')}, DATAFORSEO_LOGIN=${has('DATAFORSEO_LOGIN')}, DATAFORSEO_PASSWORD=${has('DATAFORSEO_PASSWORD')}`)
  console.log(`auth source chosen: ${src}`)
  const token = authHeader().slice(6)
  let colon = false, at = false, parts = 0
  try {
    const d = Buffer.from(token, 'base64').toString('utf8')
    colon = d.includes(':'); at = d.includes('@'); parts = d.split(':').length
  } catch { /* not base64 */ }
  console.log(`token length: ${token.length} | decodes to "login:password"? colon=${colon} @=${at} segments=${parts}`)
  console.log('Calling /appendix/user_data to validate the account...\n')
  const res = await fetch(`${API}/appendix/user_data`, { headers: { Authorization: authHeader() } })
  const json = await res.json()
  if (json.status_code === 20000) {
    const r = json.tasks?.[0]?.result?.[0]
    console.log('✓ AUTH OK')
    console.log(`  login: ${r?.login}`)
    console.log(`  balance: ${r?.money?.balance} ${r?.money?.currency ?? ''}`)
    console.log(`  Labs API access: ${r?.rates ? 'account active' : 'check subscription'}`)
  } else {
    console.log(`✗ AUTH FAILED: ${json.status_code} ${json.status_message}`)
    console.log('  → The login/password value is wrong or the API is not enabled. Re-copy from the API Access tab.')
  }
}

async function probe(): Promise<void> {
  const endpoints = [
    '/dataforseo_labs/google/keyword_overview/live',
    '/dataforseo_labs/google/bulk_keyword_difficulty/live',
    '/dataforseo_labs/google/search_intent/live',
    '/keywords_data/google_ads/search_volume/live',
    '/dataforseo_labs/google/ranked_keywords/live',
  ]
  const body = (ep: string) =>
    ep.includes('ranked_keywords')
      ? [{ target: 'theyogasensei.com', location_code: LOCATION_CODE, language_code: LANGUAGE_CODE, limit: 1 }]
      : [{ keywords: ['yoga mat'], location_code: LOCATION_CODE, language_code: LANGUAGE_CODE }]
  for (const ep of endpoints) {
    try {
      const res = await fetch(`${API}${ep}`, {
        method: 'POST',
        headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body(ep)),
      })
      const json = await res.json()
      const cost = json.tasks?.[0]?.cost ?? json.cost ?? '?'
      console.log(`${json.status_code === 20000 ? '✓' : '✗'} ${json.status_code}  cost:${cost}  ${ep}`)
    } catch (e: any) {
      console.log(`✗ ERR  ${ep}  ${e.message}`)
    }
  }
}

const [mode, arg] = process.argv.slice(2)
const run =
  mode === 'quickwins' ? quickwins(arg)
  : mode === 'whoami' ? whoami()
  : mode === 'probe' ? probe()
  : mode === 'update' ? update()
  : enrich()
run.catch((e) => { console.error(e.message || e); process.exit(1) })
