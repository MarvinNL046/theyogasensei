import { readFileSync, statSync } from 'node:fs'
import { basename, extname } from 'node:path'

/**
 * Upload a local image to Cloudflare Images.
 *
 * Usage:
 *   pnpm tsx scripts/upload-image.ts <path> [custom-id]
 *
 * Example:
 *   pnpm tsx scripts/upload-image.ts ./assets/sun-salutation-hero.jpg poses/sun-salutation-hero
 *
 * Required env:
 *   CLOUDFLARE_ACCOUNT_ID        (the numeric account id from the dashboard URL)
 *   CLOUDFLARE_IMAGES_TOKEN      (API token with Cloudflare Images:Edit)
 *
 * Cloudflare Images custom IDs: must be a path-like string (slashes allowed).
 * Use the convention <category>/<slug>-<purpose>, e.g.:
 *   - pillars/yoga-for-beginners-hero
 *   - pillars/yoga-for-beginners-pin-a
 *   - poses/sun-salutation-hero
 *   - gear/best-yoga-mats-pin-a
 *   - authors/marvin-headshot
 */

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID
const TOKEN = process.env.CLOUDFLARE_IMAGES_TOKEN

function fail(message: string, code = 1): never {
  console.error(message)
  process.exit(code)
}

async function main() {
  const [, , filePath, customId] = process.argv

  if (!filePath) {
    fail(
      'Usage: pnpm tsx scripts/upload-image.ts <path> [custom-id]\n' +
        'Example: pnpm tsx scripts/upload-image.ts ./hero.jpg pillars/yoga-for-beginners-hero',
    )
  }
  if (!ACCOUNT_ID) fail('CLOUDFLARE_ACCOUNT_ID is not set in env.')
  if (!TOKEN) fail('CLOUDFLARE_IMAGES_TOKEN is not set in env.')

  let stat
  try {
    stat = statSync(filePath)
  } catch {
    fail(`File not found: ${filePath}`)
  }
  if (!stat.isFile()) fail(`Not a file: ${filePath}`)

  const ext = extname(filePath).toLowerCase().slice(1)
  if (!['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext)) {
    fail(`Unsupported file extension: .${ext}`)
  }

  const buffer = readFileSync(filePath)
  const blob = new Blob([new Uint8Array(buffer)], {
    type: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
  })
  const id = customId ?? basename(filePath, extname(filePath))

  const form = new FormData()
  form.append('file', blob, basename(filePath))
  form.append('id', id)

  const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: form,
  })

  const body = (await res.json()) as {
    success: boolean
    errors?: Array<{ message: string }>
    result?: { id: string; variants?: Array<string> }
  }

  if (!res.ok || !body.success) {
    fail(
      `Upload failed (HTTP ${res.status}):\n` +
        (body.errors?.map((e) => '  - ' + e.message).join('\n') ??
          JSON.stringify(body)),
    )
  }

  const result = body.result
  console.log(`[upload-image] OK`)
  console.log(`  id:       ${result?.id}`)
  console.log(`  variants: ${result?.variants?.join(', ') ?? '(default only)'}`)
  console.log(`\nUse in frontmatter:`)
  console.log(`  heroImage: ${result?.id}`)
  console.log(`  pin.primaryImage: ${result?.id}`)
}

void main()
