/**
 * Patch script — SEO metadata for the 2 treks that had no override in Sanity
 * (Manaslu Circuit, Khopra Danda), bringing them up to the same hand-written
 * quality as the other 7 treks. Copy pulled from each trek's real itinerary
 * (Larkya La Pass, Khopra Ridge, Khayer Lake) — no fabricated details.
 * Patches only trek.seo.metaTitle / trek.seo.metaDescription for these 2 documents.
 *
 * Usage: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d ' ') node scripts/seed-trek-seo-manaslu-khopra.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const UPDATES = {
  'manaslut-circuit': {
    metaTitle: 'Manaslu Circuit Trek | 15 Days | Yeti Expeditions',
    metaDescription:
      'Circle the 8th-highest mountain on Earth through the restricted Manaslu region, crossing Larkya La Pass (5,106m). 15-day guided trek from Kathmandu with acclimatisation days, all permits, meals and guides included. From $1,250.',
  },
  'khopra-danda-ridge': {
    metaTitle: 'Khopra Danda Ridge Trek | 10 Days | Yeti Expeditions',
    metaDescription:
      'Trek to Khopra Ridge (4,500m) and sacred Khayer Lake — a quieter alternative to Annapurna Base Camp with sweeping Dhaulagiri and Annapurna views. 10-day guided trek from Pokhara with all permits and meals included. From ₹55,500.',
  },
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('ERROR: SANITY_TOKEN is not set.')
    console.error('Run: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d " ") node scripts/seed-trek-seo-manaslu-khopra.mjs')
    process.exit(1)
  }

  for (const [slug, seo] of Object.entries(UPDATES)) {
    const doc = await client.fetch(`*[_type == "trek" && slug.current == $slug][0]{ _id, name }`, { slug })
    if (!doc) {
      console.error(`ERROR: trek with slug "${slug}" not found — skipping.`)
      continue
    }

    console.log(`Patching SEO for ${doc.name} (${doc._id})...`)
    await client
      .patch(doc._id)
      .set({
        'seo.metaTitle': seo.metaTitle,
        'seo.metaDescription': seo.metaDescription,
      })
      .commit()
    console.log(`✓ Done`)
  }
}

main().catch(err => { console.error(err); process.exit(1) })
