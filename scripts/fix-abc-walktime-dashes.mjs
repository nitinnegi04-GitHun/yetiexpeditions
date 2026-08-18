/**
 * Fix-up — removes the literal "—" placeholder from Annapurna Base Camp's
 * non-walking days (arrival, the Day 2 jeep drive, departure) so the frontend's
 * `{step.walkTime && ...}` guard correctly hides the Walk Time line instead of
 * rendering a bare dash.
 *
 * Usage: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d ' ') node scripts/fix-abc-walktime-dashes.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const NO_WALK_DAYS = new Set(['day01', 'day02', 'day10'])

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('ERROR: SANITY_TOKEN is not set.')
    console.error('Run: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d " ") node scripts/fix-abc-walktime-dashes.mjs')
    process.exit(1)
  }

  const doc = await client.fetch(
    `*[_type == "trek" && slug.current == "annapurna-base-camp"][0]{ _id, itinerary }`
  )
  if (!doc) {
    console.error('ERROR: Annapurna Base Camp trek document not found.')
    process.exit(1)
  }

  const updatedItinerary = doc.itinerary.map((day) => {
    if (!NO_WALK_DAYS.has(day._key)) return day
    const { walkTime, ...rest } = day
    return rest
  })

  console.log(`Removing placeholder dashes from ${doc._id}...`)

  const result = await client
    .patch(doc._id)
    .set({ itinerary: updatedItinerary })
    .commit()

  console.log(`✓ Done (${result._id})`)
}

main().catch(err => { console.error(err); process.exit(1) })
