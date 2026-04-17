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

const paragraphs = [
  'It starts, as most things do in the mountains, with trust earned over time.',
  'P.S. Negi has been teaching people to move safely through the high Himalayas for longer than most of our trekkers have been alive — students, corporate teams, institutions. In Kinnaur, where he serves as President of the regional Mountaineering Association, he is not just a guide. He is the custodian of a tradition. Around him, over years, gathered a group of trek leads whose collective expertise spans the great routes of both India and Nepal.',
  'Nitin — his nephew, returning from years in corporate — saw what was missing. Not talent. Not passion. A structure that could carry all of it outward into the world.',
  'Gurdit completed the picture. A trainer of trainers, forged in Nepal\'s trekking corridors, he brought the operational fluency that only comes from having done the work yourself, at every level.',
  'Together they asked a simple question: what if the best guides in the Himalayas owned the platform, instead of just working for one?',
  'The answer is Yeti Expeditions. Rooted in Kinnaur. Active across Nepal and the Indian Himalaya. Built on the belief that expertise shared is expertise multiplied.',
  'Yeti Expeditions exists because the best guides in the Himalayas deserved better than obscurity. Every lead on our roster is a partner — not a hire. They don\'t work for us. We work together. That distinction is the whole point.',
]

const result = await client
  .patch('singleton-about')
  .set({ 'founding.paragraphs': paragraphs })
  .commit()

console.log('✓ Founding story updated:', result._id)
