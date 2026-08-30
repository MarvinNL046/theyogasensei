import fs from 'node:fs/promises'

const HOST = 'www.theyogasensei.com'
const KEY = 'bf6f2de6ebd18e60da59de6cce38ef06'
const SITE_URL = `https://${HOST}`
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const production = process.env.VERCEL_ENV === 'production'
const forced = process.argv.includes('--force')

if (!production && !forced) {
  console.log('[indexnow] skipped: not a production deployment (use --force for a manual run)')
  process.exit(0)
}

async function fetchXml(url) {
  const response = await fetch(url, { headers: { 'User-Agent': 'indexnow-submit/2.0' } })
  if (!response.ok) throw new Error(`Could not fetch ${url}: HTTP ${response.status}`)
  return response.text()
}

function locations(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => match[1].replaceAll('&amp;', '&'))
}

async function sitemapUrls(url, seen = new Set()) {
  if (seen.has(url)) return []
  seen.add(url)
  const xml = await fetchXml(url)
  const urls = locations(xml)
  const nested = urls.filter((item) => /sitemap[^/]*\.xml(?:$|\?)/i.test(item))
  if (!nested.length) return urls.filter((item) => item.startsWith(SITE_URL))
  return (await Promise.all(nested.map((item) => sitemapUrls(item, seen)))).flat()
}

const keyFile = new URL(`../public/${KEY}.txt`, import.meta.url)
const deployedKey = (await fs.readFile(keyFile, 'utf8')).trim()
if (deployedKey !== KEY) throw new Error('IndexNow key file does not match the configured key')

const candidates = [`${SITE_URL}/sitemap-index.xml`, `${SITE_URL}/sitemap.xml`]
let urls
for (const sitemap of candidates) {
  try {
    urls = await sitemapUrls(sitemap)
    if (urls.length) break
  } catch (error) {
    if (sitemap === candidates.at(-1)) throw error
  }
}

urls = [...new Set(urls)]
if (!urls.length) throw new Error('No same-host URLs found in the live sitemap')

for (let index = 0; index < urls.length; index += 10_000) {
  const urlList = urls.slice(index, index + 10_000)
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList }),
  })
  if (![200, 202].includes(response.status)) {
    throw new Error(`IndexNow rejected batch ${index / 10_000 + 1}: HTTP ${response.status} ${await response.text()}`)
  }
}

console.log(`[indexnow] submitted ${urls.length} URL(s) for ${HOST}`)
