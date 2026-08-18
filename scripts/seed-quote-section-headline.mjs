/**
 * Patch script — Quote Section headline only
 * Pushes the new headline (src/components/QuoteSection.tsx) into the live
 * singleton-homepage document. Patches only quoteSection.headline — does not
 * touch eyebrow, quote, author, authorTitle, timeline, authorPhoto, linkText, or linkUrl.
 *
 * Usage: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d ' ') node scripts/seed-quote-section-headline.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const headline = 'From The Army\nTo The\nHimalayas.'

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('ERROR: SANITY_TOKEN is not set.')
    console.error('Run: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d " ") node scripts/seed-quote-section-headline.mjs')
    process.exit(1)
  }

  console.log('Patching Quote Section headline on singleton-homepage...')

  const result = await client
    .patch('singleton-homepage')
    .set({ 'quoteSection.headline': headline })
    .commit()

  console.log(`✓ Quote Section headline updated (${result._id})`)
}

main().catch(err => { console.error(err); process.exit(1) })
