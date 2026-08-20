import { readdir, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import sharp from 'sharp'

/**
 * Convert all PNG/JPG images in /public/images/ subdirectories to WebP.
 *
 * Usage:  pnpm tsx scripts/convert-to-webp.ts
 *
 * - Skips files that already have a .webp sibling (idempotent).
 * - Preserves the original PNG/JPG as a fallback (does not delete).
 * - Quality 82 — visually lossless for photographic content, ~80% smaller.
 */

const ROOTS = [
  'public/images/brand',
  'public/images/aiko-persona',
  'public/images/hero',
] as const

const QUALITY = 82
const SOURCE_EXTS = new Set(['.png', '.jpg', '.jpeg'])

async function convertFile(
  src: string,
): Promise<{ src: string; out: string; saved: number } | null> {
  const ext = extname(src).toLowerCase()
  if (!SOURCE_EXTS.has(ext)) return null

  const out = src.slice(0, -ext.length) + '.webp'

  try {
    await stat(out)
    return null // skip — .webp already exists
  } catch {
    // .webp missing, proceed
  }

  const srcStat = await stat(src)
  await sharp(src).webp({ quality: QUALITY }).toFile(out)
  const outStat = await stat(out)
  const saved = srcStat.size - outStat.size
  return { src, out, saved }
}

async function walk(dir: string): Promise<Array<string>> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: Array<string> = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (entry.isFile()) files.push(full)
  }
  return files
}

async function main() {
  let totalSaved = 0
  let converted = 0
  let skipped = 0

  for (const root of ROOTS) {
    try {
      await stat(root)
    } catch {
      console.log(`skip (missing): ${root}`)
      continue
    }

    const files = await walk(root)
    for (const file of files) {
      const result = await convertFile(file)
      if (result === null) {
        if (SOURCE_EXTS.has(extname(file).toLowerCase())) skipped++
        continue
      }
      converted++
      totalSaved += result.saved
      const savedKb = (result.saved / 1024).toFixed(0)
      const savedPct = (
        (result.saved / (result.saved + (await stat(result.out)).size)) *
        100
      ).toFixed(0)
      console.log(
        `✓ ${result.src}  →  ${result.out}  (-${savedKb} KB, -${savedPct}%)`,
      )
    }
  }

  console.log(
    `\nDone. Converted ${converted}, skipped ${skipped} (already had .webp).`,
  )
  console.log(`Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
