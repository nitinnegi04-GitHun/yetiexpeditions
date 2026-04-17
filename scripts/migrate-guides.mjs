/**
 * One-time migration: reads embedded guidesList from the aboutPage document,
 * creates standalone Guide documents, then re-wires the aboutPage to reference them.
 *
 * Run once:
 *   node scripts/migrate-guides.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk6qXXPFqNKYWXRuxKXDvOCExnvbhRvv28xHulGtUMcdzXkcSFtW8ERAteNeNZdxlfJv4IWgppETQCBaLI7BWpkh0CKRFek8d3iTN2jFM6ilQxqcStaTbAu2sDLD6xrRKXtfRSU3rkQyZTm86xwPbM6zM0yNFqyc4ZTBkjGvwJuZInxQx4ao',
  useCdn: false,
})

async function run() {
  // 1. Fetch the aboutPage document — use the raw dataset query to get
  //    the old embedded guidesList even though the schema has changed
  const aboutPage = await client.fetch(
    `*[_type == "aboutPage"][0]{ _id, guides }`
  )

  if (!aboutPage) {
    console.error('❌  No aboutPage document found.')
    process.exit(1)
  }

  const embedded = aboutPage.guides?.guidesList ?? []

  if (embedded.length === 0) {
    console.log('ℹ️   No embedded guides found in aboutPage. Nothing to migrate.')
    console.log('    You may have already migrated, or guides were never saved in Sanity.')
    process.exit(0)
  }

  console.log(`Found ${embedded.length} embedded guide(s). Creating Guide documents...\n`)

  const createdRefs = []

  for (const g of embedded) {
    // Build the guide document — only include fields that have values
    const doc = {
      _type: 'guide',
      guideId:          g.guideId   ?? '',
      name:             g.name      ?? '',
      title:            g.title     ?? '',
      cert:             g.cert      ?? '',
      summits:          g.summits   ?? '',
      stats:            g.stats     ?? [],
      order:            99,
    }

    if (g.instagramHandle) doc.instagramHandle = g.instagramHandle
    if (g.whatsappNumber)  doc.whatsappNumber  = g.whatsappNumber
    if (g.image)           doc.image           = g.image  // carry over the image asset ref as-is

    const created = await client.create(doc)
    console.log(`  ✓ Created Guide: ${created.name} (${created._id})`)
    createdRefs.push({ _type: 'reference', _ref: created._id, _key: created._id })
  }

  // 2. Patch the aboutPage guidesList to be the new references
  await client
    .patch(aboutPage._id)
    .set({ 'guides.guidesList': createdRefs })
    .commit()

  console.log(`\n✅  aboutPage.guides.guidesList updated with ${createdRefs.length} reference(s).`)
  console.log('\nNext steps:')
  console.log('  1. Open Sanity Studio → Guide — you should see your guides there.')
  console.log('  2. Open Our Story → Our Guides tab — guides should already be linked.')
  console.log('  3. Go to each Trek → Overview → Trek Lead → pick the relevant guide.')
  console.log('  4. Delete this script once done.')
}

run().catch(err => {
  console.error('Migration failed:', err.message)
  process.exit(1)
})
