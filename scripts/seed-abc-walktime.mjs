/**
 * Patch script — Annapurna Base Camp itinerary: Walk Time + Highlight of the Day
 * Walk times are pulled directly from the existing day-by-day description text
 * already in Sanity (e.g. Day 6: "It will take 2 hours to reach Annapurna Base Camp").
 * Patches only itinerary[].walkTime and itinerary[].highlight — day/title/image/content untouched.
 *
 * Usage: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d ' ') node scripts/seed-abc-walktime.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// Pulled from each day's existing description text.
const WALK_TIME = {
  day01: '—',            // Arrival day — no trek
  day02: '—',            // Jeep drive Pokhara → Ghandruk, not a walking day
  day03: '6–7 Hours',
  day04: '6–7 Hours',
  day05: '6–7 Hours',
  day06: '2 Hours',       // Shortest day — reaching ABC
  day07: '7–8 Hours',
  day08: '7 Hours',
  day09: '30 Min',        // Plus a 2–3 hr jeep drive back to Pokhara
  day10: '—',            // Departure day
}

const HIGHLIGHT = {
  day02: 'A scenic jeep drive from Pokhara into the hills, with your first proper views of the Annapurna range as you settle into Ghandruk village.',
  day06: 'The payoff day — and the shortest on the trek. You reach Annapurna Base Camp itself at 4,130m, ringed by a 360° amphitheatre of 7,000m+ peaks.',
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('ERROR: SANITY_TOKEN is not set.')
    console.error('Run: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d " ") node scripts/seed-abc-walktime.mjs')
    process.exit(1)
  }

  const doc = await client.fetch(
    `*[_type == "trek" && slug.current == "annapurna-base-camp"][0]{ _id, itinerary }`
  )
  if (!doc) {
    console.error('ERROR: Annapurna Base Camp trek document not found.')
    process.exit(1)
  }

  const updatedItinerary = doc.itinerary.map((day) => ({
    ...day,
    walkTime: WALK_TIME[day._key] ?? day.walkTime,
    highlight: HIGHLIGHT[day._key] ?? day.highlight,
  }))

  console.log(`Patching itinerary walk times + highlights on ${doc._id}...`)

  const result = await client
    .patch(doc._id)
    .set({ itinerary: updatedItinerary })
    .commit()

  console.log(`✓ Itinerary updated (${result._id})`)
}

main().catch(err => { console.error(err); process.exit(1) })
