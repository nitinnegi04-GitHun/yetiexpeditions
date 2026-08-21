/**
 * Patch script — Journal content fixes from the SEO/GEO review:
 *  1. Set authorTitle "Travel Blogger" for Aswati's article
 *  2. Split the malformed single-string tags on the Hidden Gems article into
 *     proper separate tag entries (was one 25-keyword string in a 1-item array)
 *
 * Usage: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d ' ') node scripts/fix-journal-author-tags.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const HIDDEN_GEMS_TAGS = [
  'Everest Base Camp Trek', 'Everest Base Camp', 'Everest Trek', 'EBC Trek', 'Nepal Trek',
  'Trekking in Nepal', 'Himalayan Trekking', 'Khumbu Region', 'Lukla', 'Namche Bazaar',
  'Tengboche', 'Dingboche', 'Lobuche', 'Gorakshep', 'Kala Patthar', 'Sagarmatha National Park',
  'Hidden Gems', 'Sherpa Culture', 'Mountain Cafés', 'Himalayan Monasteries', 'Scenic Viewpoints',
  'Trekking Guide', 'Trekking Tips', 'Adventure Travel', 'Mountain Travel', 'Yeti Expeditions',
  'Nepal Adventure', 'Guided Treks',
]

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('ERROR: SANITY_TOKEN is not set.')
    console.error('Run: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d " ") node scripts/fix-journal-author-tags.mjs')
    process.exit(1)
  }

  const aswati = await client.fetch(`*[_type == "article" && author == "Aswati"][0]{ _id, title }`)
  if (aswati) {
    console.log(`Patching authorTitle for "${aswati.title}" (${aswati._id})...`)
    await client.patch(aswati._id).set({ authorTitle: 'Travel Blogger' }).commit()
    console.log('✓ Done')
  } else {
    console.error('ERROR: article authored by "Aswati" not found — skipping.')
  }

  const hiddenGems = await client.fetch(
    `*[_type == "article" && slug.current == "everest-base-camp-trek-hidden-gems-you-shouldnot-miss"][0]{ _id, title }`
  )
  if (hiddenGems) {
    console.log(`Patching tags for "${hiddenGems.title}" (${hiddenGems._id})...`)
    await client.patch(hiddenGems._id).set({ tags: HIDDEN_GEMS_TAGS }).commit()
    console.log('✓ Done')
  } else {
    console.error('ERROR: Hidden Gems article not found — skipping.')
  }
}

main().catch(err => { console.error(err); process.exit(1) })
