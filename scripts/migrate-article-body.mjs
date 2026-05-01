/**
 * Migration: Convert article body from custom block objects to Portable Text
 * Usage: SANITY_TOKEN=<write-token> node scripts/migrate-article-body.mjs
 *
 * Old format: array of { _type: "paragraph"|"heading"|"quote"|"articleImage"|"divider", ... }
 * New format: Portable Text blocks ({ _type: "block", style, children, markDefs })
 */

import { createClient } from '@sanity/client'

const token = process.env.SANITY_TOKEN || process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Set SANITY_TOKEN env var'); process.exit(1) }

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

function toPortableTextBlock(block) {
  // Already a Portable Text block — leave as-is
  if (block._type === 'block') return block

  const key = block._key ?? Math.random().toString(36).slice(2)

  if (block._type === 'paragraph') {
    return {
      _key: key,
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [{ _key: key + 'c0', _type: 'span', text: block.text ?? '', marks: [] }],
    }
  }

  if (block._type === 'heading') {
    const style = block.type === 'h2' ? 'h2' : block.type === 'h3' ? 'h3' : 'h2'
    return {
      _key: key,
      _type: 'block',
      style,
      markDefs: [],
      children: [{ _key: key + 'c0', _type: 'span', text: block.text ?? '', marks: [] }],
    }
  }

  if (block._type === 'quote') {
    return {
      _key: key,
      _type: 'block',
      style: 'blockquote',
      markDefs: [],
      children: [{ _key: key + 'c0', _type: 'span', text: block.text ?? '', marks: [] }],
    }
  }

  if (block._type === 'articleImage') {
    // Preserve the image reference so the asset URL still resolves
    return {
      _key: key,
      _type: 'image',
      asset: block.src?.asset ?? null,
      caption: block.caption ?? '',
      alt: block.caption ?? '',
    }
  }

  if (block._type === 'divider') {
    // Render as an em-dash separator paragraph
    return {
      _key: key,
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [{ _key: key + 'c0', _type: 'span', text: '* * *', marks: [] }],
    }
  }

  // Unknown type — log and skip
  console.warn(`  ⚠️  Unknown block type "${block._type}" — skipped`)
  return null
}

async function run() {
  const articles = await client.fetch(`*[_type == "article"]{ _id, title, body }`)
  console.log(`Found ${articles.length} article(s)`)

  for (const article of articles) {
    const oldBody = article.body ?? []
    const needsMigration = oldBody.some(b => b._type !== 'block' && b._type !== 'image')

    if (!needsMigration) {
      console.log(`✓ "${article.title}" — already Portable Text, skipped`)
      continue
    }

    const newBody = oldBody.map(toPortableTextBlock).filter(Boolean)

    await client.patch(article._id).set({ body: newBody }).commit()
    console.log(`✓ "${article.title}" — migrated ${oldBody.length} → ${newBody.length} blocks`)
  }

  console.log('\nDone.')
}

run().catch(err => { console.error(err); process.exit(1) })
