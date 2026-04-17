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

// ── 1. Homepage SEO — via siteSettings ────────────────────────────────────────
const homepageSeo = {
  metaTitle: 'Yeti Expeditions | Expert-Guided Himalayan Treks — EBC, Annapurna, Ladakh',
  metaDescription: 'Small-group guided treks to Everest Base Camp, Annapurna Circuit & Markha Valley Ladakh. WFR-certified guides, max 8 trekkers, 1:4 guide ratio. All permits, meals & accommodation included. From $2,850.',
  noIndex: false,
}

// ── 2. Our Story SEO — via aboutPage ──────────────────────────────────────────
const ourStorySeo = {
  metaTitle: 'Our Story | Yeti Expeditions — Born in the Himalayas',
  metaDescription: 'Yeti Expeditions was founded by P.S. Negi — mountaineering expert and President of Kinnaur Mountaineering Association — alongside Nitin Negi and Gurdit. A platform where every trek lead is a partner, not an employee.',
  noIndex: false,
}

// ── 3. Trek SEO data ──────────────────────────────────────────────────────────
const trekSeoData = {
  // Everest Base Camp
  '1k1puEdMUrHCx9pWhLnP2s': {
    metaTitle: 'Everest Base Camp Trek — 14 Days, 5,364m | Yeti Expeditions',
    metaDescription: 'Guided Everest Base Camp trek: 14 days, reaching 5,364m. From $4,250. Max 8 trekkers. WFR-certified guides. All permits, meals & teahouse accommodation included. Departures year-round from Kathmandu.',
    noIndex: false,
  },
  // Markha Valley
  '1k1puEdMUrHCx9pWhLnPHu': {
    metaTitle: 'Markha Valley Trek Ladakh — 12 Days, 5,100m | Yeti Expeditions',
    metaDescription: 'Guided Markha Valley trek in Ladakh: 12 days, reaching 5,100m across Kongmaru La pass. From $2,850. Max 8 trekkers. WFR-certified guides. All permits, camping & meals included.',
    noIndex: false,
  },
  // Annapurna Circuit
  'RFBFkgmQsAtHdBq5h2SfE1': {
    metaTitle: 'Annapurna Circuit Trek — 18 Days, 5,416m | Yeti Expeditions',
    metaDescription: 'Guided Annapurna Circuit trek: 18 days, crossing Thorong La pass at 5,416m. From $3,100. Max 8 trekkers. WFR-certified guides. All permits, teahouse accommodation & meals included.',
    noIndex: false,
  },
}

async function run() {
  // Patch homepage (siteSettings singleton)
  const settingsDoc = await client.fetch('*[_type == "siteSettings"][0]{ _id }')
  if (settingsDoc?._id) {
    await client.patch(settingsDoc._id).set({ seo: homepageSeo }).commit()
    console.log('✓ Homepage SEO updated:', settingsDoc._id)
  } else {
    console.warn('⚠ siteSettings document not found')
  }

  // Patch Our Story
  await client.patch('singleton-about').set({ seo: ourStorySeo }).commit()
  console.log('✓ Our Story SEO updated')

  // Patch each trek
  for (const [id, seo] of Object.entries(trekSeoData)) {
    await client.patch(id).set({ seo }).commit()
    console.log(`✓ Trek SEO updated: ${id}`)
  }

  console.log('\n✅ All SEO data seeded successfully.')
}

run().catch(err => { console.error(err); process.exit(1) })
