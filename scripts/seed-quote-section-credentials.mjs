/**
 * Patch script — Quote Section eyebrow + credentials only
 * Pushes the new "From The Founder" eyebrow and founder credentials
 * (src/components/QuoteSection.tsx) into the live singleton-homepage document.
 * Patches only quoteSection.eyebrow and quoteSection.credentials — does not touch
 * quote, author, authorTitle, authorPhoto, linkText, or linkUrl.
 *
 * Usage: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d ' ') node scripts/seed-quote-section-credentials.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const eyebrow = 'From The Founder'
const credentials = [
  'HAWS Instructor',
  'SBS Instructor',
  'ABVIMAS Instructor',
  'Felicitated by Govt. of India, 2022',
]

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('ERROR: SANITY_TOKEN is not set.')
    console.error('Run: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d " ") node scripts/seed-quote-section-credentials.mjs')
    process.exit(1)
  }

  console.log('Patching Quote Section eyebrow + credentials on singleton-homepage...')

  const result = await client
    .patch('singleton-homepage')
    .set({
      'quoteSection.eyebrow': eyebrow,
      'quoteSection.credentials': credentials,
    })
    .commit()

  console.log(`✓ Quote Section updated (${result._id})`)
}

main().catch(err => { console.error(err); process.exit(1) })
