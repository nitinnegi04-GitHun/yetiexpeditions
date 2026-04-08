/**
 * Seed script — Homepage
 * Pulls exact data from frontend components:
 *   - Hero.tsx
 *   - TrustMatrix.tsx
 *   - SpecialProjects.tsx
 *   - QuoteSection.tsx
 *
 * Usage: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d ' ') node scripts/seed-homepage.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const homepage = {
  _type: 'homepage',
  _id: 'singleton-homepage', // fixed ID ensures only one homepage doc ever exists

  // ── Hero (from Hero.tsx) ───────────────────────────────────────────────────
  hero: {
    badge: 'High Altitude Logistics',
    headlineLine1: 'Safety.',
    headlineLine2: 'Comfort.',
    headlineLine3: 'The Himalayas.',
    subheading: "Experience the world's highest peaks with highly qualified guides and unmatched safety standards.",
    ctaText: 'View Expeditions',
    ctaUrl: '/treks',
    imageCaption: 'Mount Everest Base Camp',
    imageCoordinates: '28.0026° N, 86.8528° E',
    // heroImage: upload manually in Studio — external Google URL can't be imported via API
  },

  // ── Trust Matrix (from TrustMatrix.tsx) ───────────────────────────────────
  trustMatrix: [
    { _key: 'tm01', label: 'Guide Ratio',  value: '1:4',   description: 'Industry leading safety supervision for every trekker.' },
    { _key: 'tm02', label: 'Certification', value: 'WFR',   description: 'Wilderness First Responder certified lead guides.' },
    { _key: 'tm03', label: 'Group Limit',  value: 'MAX 8', description: 'Small groups ensure personalized care and flexibility.' },
    { _key: 'tm04', label: 'Experience',   value: '15YR+', description: 'Decades of navigating the world\'s most difficult terrain.' },
  ],

  // ── Special Projects (from SpecialProjects.tsx) ───────────────────────────
  specialProjects: {
    sectionTagline: 'Beyond The Trek',
    sectionHeading: 'Our Special Projects',
    sectionDescription: 'We believe the mountains demand more than technical skill. They demand responsibility — to the land, the communities, and the people who live among them.',
    footerNote: '1% of every expedition fee is directed to our special projects fund.',
    projects: [
      {
        _key: 'sp01',
        category: 'Education',
        name: 'Schools Above The Clouds',
        tagline: 'Learning at altitude.',
        description: 'Partnering with local Sherpa communities to fund and construct classrooms in villages above 3,500m — places where children walk four hours each way just to learn. Every expedition booking contributes directly to this fund.',
        stat: '14 Schools Built',
        statSub: 'across the Khumbu & Annapurna regions',
        ctaText: 'Learn More',
        ctaUrl: '#',
      },
      {
        _key: 'sp02',
        category: 'Environment',
        name: 'Zero Trace Initiative',
        tagline: 'The mountain gives. We give back.',
        description: 'Our guides lead seasonal clean-up expeditions on the most heavily trafficked routes. We have removed over 4,200kg of waste from the Everest corridor alone since 2016 — oxygen canisters, abandoned tents, and years of negligence.',
        stat: '4,200 kg Removed',
        statSub: 'from Himalayan trails since 2016',
        ctaText: 'Learn More',
        ctaUrl: '#',
      },
      {
        _key: 'sp03',
        category: 'Community',
        name: 'Sherpa Legacy Fund',
        tagline: 'Honouring those who carry us up.',
        description: 'High-altitude guiding is one of the most dangerous professions on earth. Our legacy fund provides long-term healthcare, accident insurance, and higher-education scholarships for the families of every guide and porter we work with.',
        stat: '320+ Families',
        statSub: 'supported through the legacy fund',
        ctaText: 'Learn More',
        ctaUrl: '#',
      },
    ],
  },

  // ── Quote Section (from QuoteSection.tsx) ─────────────────────────────────
  quoteSection: {
    quote: 'The mountains are not a place to conquer, but a place to rediscover what it means to be human under the strict guidance of nature.',
    author: 'Reinhold Messner',
    authorTitle: 'Alpine Legend',
  },
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('ERROR: SANITY_TOKEN is not set.')
    console.error('Run: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d " ") node scripts/seed-homepage.mjs')
    process.exit(1)
  }

  console.log('Seeding homepage...')

  // createOrReplace: always writes to the fixed singleton ID
  const result = await client.createOrReplace(homepage)
  console.log(`✓ Homepage document upserted (${result._id})`)
  console.log('\nView at: https://yeti-expeditions.sanity.studio/structure/homepage')
  console.log('Note: Upload the hero image manually in Studio (Studio → Homepage → Hero → Hero Image)')
}

main().catch(err => { console.error(err); process.exit(1) })
