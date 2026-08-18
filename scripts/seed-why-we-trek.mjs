/**
 * Patch script — Why We Trek section only
 * Pushes the current frontend fallback copy (src/components/WhyWeTrek.tsx) into the
 * live singleton-homepage document. Patches just the `whyWeTrek` field — does not
 * touch hero, trustMatrix, specialProjects, or quoteSection.
 *
 * Usage: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d ' ') node scripts/seed-why-we-trek.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const whyWeTrek = {
  eyebrow: 'Why We Trek',
  headline: 'Everyone comes to the mountains for a different reason.',
  openingCopy:
    'Some come looking for a challenge. Some for time with friends. Some want to step away from routine, while others are drawn by the quiet, the landscape, or simply the idea of seeing what lies beyond the next ridge.\n\nWhat we’ve learnt over the years is that a trek can become much more than the trail itself. What you take back from it is deeply personal.\n\nThat’s also why we don’t believe there is one trek that is right for everyone.',
  pullQuote: 'The mountains are the medium, not the destination. What you carry back with you is the real reason you came.',
  principlesHeading: 'So, How Do We Help You Find Yours?',
  principles: [
    {
      _key: 'p01',
      title: 'Start With Our Signature Treks',
      description: 'Journeys we know deeply and return to season after season, with fixed departures you can join.',
      ctaLabel: 'see the treks',
      ctaTarget: 'treks',
    },
    {
      _key: 'p02',
      title: 'Or Make The Journey Your Own',
      description: 'Your dates, your group, your pace. We can shape a Himalayan journey around what you’re looking for.',
      ctaLabel: 'tell us what you have in mind',
      ctaTarget: 'whatsapp',
    },
    {
      _key: 'p03',
      title: 'And If You’re Not Sure, Ask Us',
      description: 'Tell us about your experience, fitness, time and what is drawing you to the mountains. We’ll help you think through what might suit you — even if the right answer is a trek we don’t operate.',
      ctaLabel: 'start the conversation',
      ctaTarget: 'whatsapp',
    },
  ],
  closingStatement: 'We’d rather help you find the right journey than sell you the wrong one.',
  primaryCtaText: 'Browse Signature Treks',
  whatsappCtaText: 'Ask a Trek Lead',
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('ERROR: SANITY_TOKEN is not set.')
    console.error('Run: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d " ") node scripts/seed-why-we-trek.mjs')
    process.exit(1)
  }

  console.log('Patching Why We Trek section on singleton-homepage...')

  const result = await client
    .patch('singleton-homepage')
    .setIfMissing({ _type: 'homepage' })
    .set({ whyWeTrek })
    .commit()

  console.log(`✓ Why We Trek section updated (${result._id})`)
  console.log('Note: image field left untouched — upload manually in Studio if needed (Studio → Homepage → Why We Trek → Image)')
}

main().catch(err => { console.error(err); process.exit(1) })
