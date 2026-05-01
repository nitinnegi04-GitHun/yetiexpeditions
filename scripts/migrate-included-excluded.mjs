/**
 * Migration: Convert trek included/excluded from string arrays to Portable Text
 * Usage: SANITY_TOKEN=<write-token> node scripts/migrate-included-excluded.mjs
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

function toBlock(item) {
  if (item._type === 'block') return item
  const key = item._key ?? Math.random().toString(36).slice(2)
  const text = typeof item === 'string' ? item : String(item)
  return {
    _key: key,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{ _key: key + 'c0', _type: 'span', text, marks: [] }],
  }
}

async function run() {
  const treks = await client.fetch(`*[_type == "trek"]{ _id, name, included, excluded }`)
  console.log(`Found ${treks.length} trek(s)`)

  for (const trek of treks) {
    const patch = {}

    if ((trek.included ?? []).some(b => b._type !== 'block')) {
      patch.included = (trek.included ?? []).map(toBlock)
    }
    if ((trek.excluded ?? []).some(b => b._type !== 'block')) {
      patch.excluded = (trek.excluded ?? []).map(toBlock)
    }

    if (Object.keys(patch).length === 0) {
      console.log(`✓ "${trek.name}" — already migrated, skipped`)
      continue
    }

    await client.patch(trek._id).set(patch).commit()
    console.log(`✓ "${trek.name}" — migrated included(${trek.included?.length ?? 0}) excluded(${trek.excluded?.length ?? 0})`)
  }

  console.log('\nDone.')
}

run().catch(err => { console.error(err); process.exit(1) })
