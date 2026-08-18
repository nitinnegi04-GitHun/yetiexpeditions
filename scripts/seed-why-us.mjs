/**
 * Patch script — Why Us section only
 * Pushes the current frontend fallback copy (src/components/WhyUs.tsx) into the
 * live singleton-homepage document. Patches just the `whyUs` field — does not
 * touch hero, trustMatrix, whyWeTrek, specialProjects, or quoteSection.
 *
 * Usage: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d ' ') node scripts/seed-why-us.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const whyUs = {
  eyebrow: 'Why Us',
  headline: 'The Difference\nIs In How\nWe Do Things.',
  openingCopy:
    'Anyone can plan a route, book a tea house and get you to the trailhead. For us, that’s only the beginning.\n\nThe quality of a Himalayan journey is shaped by hundreds of small decisions — most of which you should never have to think about.\n\nThat’s where we believe Yeti should make a difference.',
  principlesHeading: 'How That Shows Up On The Trail',
  principles: [
    {
      _key: 'wu01',
      title: 'Personal Attention, By Design',
      description: 'We keep our groups small and maintain a 1:4 guide ratio so our team has the time to know how each trekker is actually doing — not just lead the group from the front.',
      label: '1:4 Guide Ratio · Max 12 Trekkers',
    },
    {
      _key: 'wu02',
      title: 'Prepared, Not Just Experienced',
      description: 'Experience matters. So does knowing what to do with it. Our lead guides are trained in wilderness medicine, and our journeys are designed around thoughtful acclimatization and on-trail monitoring.',
      label: 'WFR · Oximetry · Acclimatization',
    },
    {
      _key: 'wu03',
      title: 'The Details Are Our Job',
      description: 'Permits, stays, transfers, route logistics, coordination and the inevitable changes that come with the mountains — we handle the moving parts so they don’t become your journey.',
    },
    {
      _key: 'wu04',
      title: 'People Before Itineraries',
      description: 'We don’t start with what we want to sell. We start with what might be right for you — even when that means suggesting a different journey.',
    },
  ],
  closingStatement: 'A well-run trek shouldn’t make you notice the logistics. It should give you the freedom to notice everything else.',
  ctaText: 'Our Story',
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('ERROR: SANITY_TOKEN is not set.')
    console.error('Run: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d " ") node scripts/seed-why-us.mjs')
    process.exit(1)
  }

  console.log('Patching Why Us section on singleton-homepage...')

  const result = await client
    .patch('singleton-homepage')
    .set({ whyUs })
    .commit()

  console.log(`✓ Why Us section updated (${result._id})`)
  console.log('Note: image field left blank — upload a real photo manually in Studio (Studio → Homepage → Why Us → Image)')
}

main().catch(err => { console.error(err); process.exit(1) })
