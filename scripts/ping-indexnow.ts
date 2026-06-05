import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { scanMdxEntries } from './scan-mdx-slugs'

const HOST = 'www.theyogasensei.com'
const KEY_FILE = join(process.cwd(), 'public', 'indexnow-key.txt')

interface IndexNowPayload {
  host: string
  key: string
  keyLocation: string
  urlList: Array<string>
}

async function main() {
  let key: string
  try {
    key = readFileSync(KEY_FILE, 'utf8').trim()
  } catch {
    console.warn(
      `[ping-indexnow] no key file at ${KEY_FILE} — skipping (set up an IndexNow key first)`,
    )
    return
  }

  const siteUrl = process.env.SITE_URL ?? `https://${HOST}`
  const entries = scanMdxEntries()
  const urlList = [
    `${siteUrl}/`,
    `${siteUrl}/about`,
    `${siteUrl}/start-here`,
    ...entries.map((e) => `${siteUrl}${e.routePath}`),
  ]

  const payload: IndexNowPayload = {
    host: HOST,
    key,
    keyLocation: `${siteUrl}/indexnow-key.txt`,
    urlList,
  }

  try {
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.status === 200 || res.status === 202) {
      console.log(`[ping-indexnow] OK — submitted ${urlList.length} URL(s)`)
    } else {
      console.error(
        `[ping-indexnow] FAIL — IndexNow returned ${res.status}: ${await res.text()}`,
      )
      process.exit(1)
    }
  } catch (err) {
    console.error(
      `[ping-indexnow] FAIL — ${err instanceof Error ? err.message : err}`,
    )
    process.exit(1)
  }
}

void main()
