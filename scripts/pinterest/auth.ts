/**
 * Pinterest OAuth — one-time authorisation for the pin-posting pipeline.
 *
 * Prerequisites (once, by the operator):
 *   1. App on developers.pinterest.com with Trial (later Standard) access.
 *   2. Redirect URI `http://localhost:8976/callback` added to the app.
 *   3. In `.env.local`:  PINTEREST_APP_ID=...  PINTEREST_APP_SECRET=...
 *
 * Run:  npx tsx scripts/pinterest/auth.ts
 * It opens the Pinterest consent page, catches the code on localhost:8976,
 * exchanges it for tokens and writes them to scripts/pinterest/.token.json
 * (gitignored). post-pins.ts refreshes the token on every run afterwards.
 */
import { createServer } from 'node:http'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { execSync } from 'node:child_process'

const ROOT = resolve(import.meta.dirname, '../..')
const TOKEN_FILE = resolve(import.meta.dirname, '.token.json')
const REDIRECT = 'http://localhost:8976/callback'
const SCOPES = 'boards:read,boards:write,pins:read,pins:write'

const env = Object.fromEntries(
  readFileSync(resolve(ROOT, '.env.local'), 'utf8')
    .split(/\r?\n/)
    .filter((l) => l.includes('=') && !l.startsWith('#'))
    .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]),
)
const APP_ID = env.PINTEREST_APP_ID
const APP_SECRET = env.PINTEREST_APP_SECRET
if (!APP_ID || !APP_SECRET) {
  console.error('PINTEREST_APP_ID / PINTEREST_APP_SECRET missing in .env.local')
  process.exit(1)
}

const authUrl =
  `https://www.pinterest.com/oauth/?client_id=${APP_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT)}` +
  `&response_type=code&scope=${encodeURIComponent(SCOPES)}`

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost:8976')
  if (url.pathname !== '/callback') {
    res.writeHead(404).end()
    return
  }
  const code = url.searchParams.get('code')
  if (!code) {
    res.writeHead(400).end('Missing ?code')
    return
  }
  try {
    const tokenRes = await fetch('https://api.pinterest.com/v5/oauth/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${APP_ID}:${APP_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT,
        continuous_refresh: 'true',
      }),
    })
    const json = (await tokenRes.json()) as Record<string, unknown>
    if (!tokenRes.ok || !json.access_token) {
      throw new Error(`token exchange failed: ${tokenRes.status} ${JSON.stringify(json)}`)
    }
    writeFileSync(
      TOKEN_FILE,
      JSON.stringify(
        {
          access_token: json.access_token,
          refresh_token: json.refresh_token,
          obtained_at: new Date().toISOString(),
        },
        null,
        2,
      ),
    )
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<h1>Pinterest gekoppeld.</h1><p>Je kunt dit venster sluiten.</p>')
    console.log(`Tokens opgeslagen in ${TOKEN_FILE}`)
  } catch (err) {
    res.writeHead(500).end(String(err))
    console.error(err)
    process.exitCode = 1
  } finally {
    server.close()
  }
})

server.listen(8976, () => {
  console.log('Open deze URL en geef toestemming:\n\n' + authUrl + '\n')
  try {
    execSync(`start "" "${authUrl}"`, { shell: 'cmd.exe' })
  } catch {
    /* opening the browser is best-effort; the URL is printed above */
  }
})
