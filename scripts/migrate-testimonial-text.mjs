/**
 * Migration: Convert testimonial review text from a plain string to Portable Text
 * Usage: SANITY_TOKEN=<write-token> node scripts/migrate-testimonial-text.mjs
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

function toBlock(text) {
  const key = Math.random().toString(36).slice(2)
  return {
    _key: key,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{ _key: key + 'c0', _type: 'span', text, marks: [] }],
  }
}

async function run() {
  const testimonials = await client.fetch(`*[_type == "testimonial"]{ _id, name, text }`)
  console.log(`Found ${testimonials.length} testimonial(s)`)

  for (const t of testimonials) {
    if (Array.isArray(t.text)) {
      console.log(`✓ "${t.name}" — already migrated, skipped`)
      continue
    }

    await client.patch(t._id).set({ text: [toBlock(t.text ?? '')] }).commit()
    console.log(`✓ "${t.name}" — migrated`)
  }

  console.log('\nDone.')
}

run().catch(err => { console.error(err); process.exit(1) })
