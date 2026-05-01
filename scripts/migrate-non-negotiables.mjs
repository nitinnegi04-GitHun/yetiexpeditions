/**
 * Migration: Convert trek nonNegotiables from plain string array to Portable Text
 * Usage: SANITY_TOKEN=<write-token> node scripts/migrate-non-negotiables.mjs
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

function toPortableTextBlock(item) {
  // Already a Portable Text block — skip
  if (item._type === 'block') return item

  const key = item._key ?? Math.random().toString(36).slice(2)
  const text = typeof item === 'string' ? item : (item.text ?? String(item))

  return {
    _key: key,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{ _key: key + 'c0', _type: 'span', text, marks: [] }],
  }
}

async function run() {
  const treks = await client.fetch(`*[_type == "trek" && defined(nonNegotiables) && length(nonNegotiables) > 0]{ _id, name, nonNegotiables }`)
  console.log(`Found ${treks.length} trek(s) with nonNegotiables`)

  for (const trek of treks) {
    const oldItems = trek.nonNegotiables ?? []
    const needsMigration = oldItems.some(b => b._type !== 'block')

    if (!needsMigration) {
      console.log(`✓ "${trek.name}" — already Portable Text, skipped`)
      continue
    }

    const newItems = oldItems.map(toPortableTextBlock)
    await client.patch(trek._id).set({ nonNegotiables: newItems }).commit()
    console.log(`✓ "${trek.name}" — migrated ${oldItems.length} item(s)`)
  }

  console.log('\nDone.')
}

run().catch(err => { console.error(err); process.exit(1) })
