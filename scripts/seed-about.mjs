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

const aboutData = {
  _id: 'singleton-about',
  _type: 'aboutPage',

  leftPanel: {
    // image: uploaded manually in Studio
    expeditionCity: 'Kathmandu',
    expeditionCountry: 'Nepal',
    expeditionYear: '2008',
  },

  hero: {
    badge: 'IFMGA Certified Expedition Company',
    headlineLine1: 'Born',
    headlineLine2: 'From The',
    headlineLine3: 'Mountain',
    openingQuote: "We don't sell adventures. We guide lives. The mountain was here before us and it will outlast us — our job is to help you meet it honestly.",
  },

  founding: {
    tagline: 'The Beginning',
    heading: 'How It Started',
    paragraphs: [
      'In 2008, Lakpa Rita Sherpa and two fellow IFMGA guides returned from their fourteenth Everest summit and made a decision: the industry needed to change. Operators were cutting corners. Clients were arriving unprepared. People were dying for avoidable reasons.',
      'They founded Yeti Expeditions on three words: Safety. Authenticity. Respect. Not as a tagline — as an operating system.',
      'Sixteen years later, we have guided over 6,200 trekkers across the Himalaya. We have never lost a client. We have turned back on summit day twenty-three times. We are proud of every single one of those decisions.',
    ],
  },

  stats: [
    { _key: 'stat01', value: '847',   label: 'Expeditions Led' },
    { _key: 'stat02', value: '6,200+', label: 'Trekkers Guided' },
    { _key: 'stat03', value: '16 YRS', label: 'Zero Fatalities' },
    { _key: 'stat04', value: '100%',  label: 'Permit Success Rate' },
  ],

  philosophy: {
    tagline: 'Operating Principles',
    heading: 'The Sherpa Code',
    principles: [
      {
        _key: 'ph01',
        code: '01',
        title: 'The Mountain Decides',
        body: 'No summit is worth a life. We turn back when the mountain demands it — and we train our clients to trust that call. Ego is the most dangerous piece of kit you can carry above 5,000m.',
      },
      {
        _key: 'ph02',
        code: '02',
        title: 'Oxygen Is Non-Negotiable',
        body: 'Twice-daily SpO2 monitoring isn\'t a nice-to-have. It\'s protocol. Every guide carries supplemental oxygen. Every itinerary has built-in acclimatisation. There are no shortcuts above the clouds.',
      },
      {
        _key: 'ph03',
        code: '03',
        title: 'The Sherpa Is Not A Porter',
        body: 'Our guides are IFMGA-certified mountaineers with decades of high-altitude experience. They read weather, manage altitude, and carry the knowledge of generations. Treat them accordingly.',
      },
      {
        _key: 'ph04',
        code: '04',
        title: 'Leave Less Than You Found',
        body: 'Every permit fee funds trail restoration. Every camp is left cleaner than we arrived. We operate at a deficit with the mountain — it has given us everything, we owe it our best effort.',
      },
    ],
  },

  guides: {
    tagline: 'The Team',
    heading: 'Our Guides',
    guidesList: [
      {
        _key: 'guide01',
        visible: true,
        guideId: 'GUIDE-001',
        name: 'Lakpa Rita Sherpa',
        title: 'Lead Expedition Guide',
        cert: 'IFMGA Certified',
        summits: 'Everest ×14',
        stats: ['VO2 MAX: 58 ml/kg/min', 'SpO2 @ 8000m: 88%', 'Active Since: 1998'],
        // image: upload manually in Studio
      },
      {
        _key: 'guide02',
        visible: true,
        guideId: 'GUIDE-002',
        name: 'Dawa Gyalje Sherpa',
        title: 'High Altitude Specialist',
        cert: 'WFR Certified',
        summits: 'Everest ×9 / Lhotse ×6',
        stats: ['VO2 MAX: 61 ml/kg/min', 'SpO2 @ 8000m: 91%', 'Active Since: 2004'],
      },
      {
        _key: 'guide03',
        visible: true,
        guideId: 'GUIDE-003',
        name: 'Mingma Tshering',
        title: 'Route & Safety Director',
        cert: 'IFMGA / WFR',
        summits: 'Annapurna ×12 / Manaslu ×8',
        stats: ['VO2 MAX: 59 ml/kg/min', 'SpO2 @ 8000m: 89%', 'Active Since: 2001'],
      },
    ],
  },

  whyYeti: {
    tagline: 'The Difference',
    heading: 'Why Yeti',
    differentiators: [
      { _key: 'wy01', title: 'Group Cap: 8', body: 'Every expedition. Non-negotiable. Quality of experience and safety both degrade past this number at altitude.' },
      { _key: 'wy02', title: 'Fitness Vetting', body: 'Every trekker is assessed before confirmation. We turn people down. It protects them and the group.' },
      { _key: 'wy03', title: '2× Daily SpO2', body: 'Morning and evening oxygen saturation checks from Namche onwards. Data, not guesswork.' },
      { _key: 'wy04', title: 'Evacuation Protocol', body: 'Helicopter rescue pre-authorised. Bottled O2 on all trips above 4,500m. No improvising in an emergency.' },
    ],
  },

  cta: {
    badge: 'Join The Next Expedition',
    headlineLine1: 'The Mountain',
    headlineLine2: 'Is Waiting',
    headlineLine3: 'For You',
    buttons: [
      { _key: 'btn01', text: 'Everest Base Camp', url: '/treks/everest-base-camp' },
      { _key: 'btn02', text: 'Annapurna Circuit', url: '/treks/annapurna-circuit' },
    ],
  },
}

async function run() {
  console.log('Seeding Our Story page...')
  const result = await client.createOrReplace(aboutData)
  console.log('✓ Seeded:', result._id)
}

run().catch((err) => { console.error(err); process.exit(1) })
