/**
 * Seed script — Everest Base Camp Trek
 * Usage: SANITY_TOKEN=<your-write-token> node scripts/seed-ebc-trek.mjs
 *
 * Get a token at: https://www.sanity.io/manage → project → API → Tokens → Add API token (Editor)
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const ebcTrek = {
  _type: 'trek',
  name: 'Everest Base Camp',
  slug: { _type: 'slug', current: 'everest-base-camp' },
  region: 'Khumbu, Nepal',
  country: 'Nepal',
  difficulty: 'Difficult',
  duration: '14 Days',
  altitude: '5,364m',
  season: 'MAR-MAY · SEP-NOV',
  accommodation: 'TEAHOUSE',
  groupSize: 'MAX 08',
  investment: '$3,400',

  // ── Itinerary ──────────────────────────────────────────────────────────────
  itinerary: [
    {
      _key: 'day01',
      day: '01',
      title: 'Arrive Kathmandu (1,400m)',
      content:
        'Land at Tribhuvan International Airport. Transfer to hotel in Thamel. Team briefing, gear check, and permit processing. Welcome dinner with your expedition crew.',
    },
    {
      _key: 'day02',
      title: 'Fly Kathmandu → Lukla (2,860m) · Trek to Phakding (2,610m)',
      day: '02',
      content:
        'Early morning 30-minute mountain flight to Tenzing-Hillary Airport in Lukla — one of the world\'s most dramatic runways. Begin trekking through rhododendron forests, descending along the Dudh Koshi river to Phakding.',
    },
    {
      _key: 'day03',
      day: '03',
      title: 'Phakding → Namche Bazaar (3,440m)',
      content:
        'Cross suspension bridges over the Dudh Koshi gorge and enter Sagarmatha National Park. A long, steep climb through pine forest rewards you with your first views of Everest over the ridge before descending into Namche.',
    },
    {
      _key: 'day04',
      day: '04',
      title: 'Namche Bazaar — Acclimatisation Day',
      content:
        'Rest day in the Sherpa capital of the world. Optional hike to Everest View Hotel (3,880m) for panoramic views of Everest, Lhotse, and Ama Dablam. Explore the weekend market and the Sherpa Culture Museum.',
    },
    {
      _key: 'day05',
      day: '05',
      title: 'Namche → Tengboche (3,867m)',
      content:
        'The trail rises and falls dramatically, offering constant views of the Everest massif. Visit Tengboche Monastery — the largest Gompa in the Khumbu — set against a stunning mountain backdrop. Evening prayer ceremony.',
    },
    {
      _key: 'day06',
      day: '06',
      title: 'Tengboche → Dingboche (4,360m)',
      content:
        'Descend through birch and juniper forest before crossing the Imja Khola river. The valley widens as vegetation thins and the high-altitude landscape takes over. First night above 4,000m — acclimatisation protocol begins.',
    },
    {
      _key: 'day07',
      day: '07',
      title: 'Dingboche — Acclimatisation Day',
      content:
        'Hike to Nangkartshang Peak (5,090m) for a critical altitude push. Twice-daily oximetry checks by WFR-certified guide. Rest, rehydrate, and acclimatise. Optional visit to the Chhukung valley.',
    },
    {
      _key: 'day08',
      day: '08',
      title: 'Dingboche → Lobuche (4,940m)',
      content:
        'Pass through Dugla, where a series of memorial chortens honour climbers lost on Everest. The trail climbs steeply onto the Khumbu glacier moraine before levelling into Lobuche — a sparse cluster of lodges at the edge of the world.',
    },
    {
      _key: 'day09',
      day: '09',
      title: 'Lobuche → Gorak Shep (5,170m) → Everest Base Camp (5,364m)',
      content:
        'The day everything has been building toward. Trek across rocky glacier to Gorak Shep, drop your bags, and push on to Everest Base Camp. Stand on the ice beside the Khumbu Icefall. Return to Gorak Shep for the night.',
    },
    {
      _key: 'day10',
      day: '10',
      title: 'Gorak Shep → Kala Patthar (5,545m) → Pheriche (4,280m)',
      content:
        'Pre-dawn start for Kala Patthar — the ultimate Everest viewpoint. Watch the sunrise paint the summit gold. Descend all the way to Pheriche, losing 1,265m of altitude. Your body will thank you.',
    },
    {
      _key: 'day11',
      day: '11',
      title: 'Pheriche → Namche Bazaar (3,440m)',
      content:
        'A long descent back through alpine meadows and rhododendron forests to Namche. Legs may ache but morale is high — the hardest is behind you. Hot shower and celebratory raksi optional.',
    },
    {
      _key: 'day12',
      day: '12',
      title: 'Namche → Lukla (2,860m)',
      content:
        'Final day on the trail. Retrace the classic Khumbu path through Phakding and back up to Lukla. Evening in Lukla: final group dinner, photo sharing, and tips for your Sherpa and porter team.',
    },
    {
      _key: 'day13',
      day: '13',
      title: 'Fly Lukla → Kathmandu',
      content:
        'Weather-dependent morning flight back to Kathmandu. Free afternoon to shop for handicrafts in Thamel, visit Boudhanath Stupa, or simply rest. Farewell dinner at a rooftop restaurant.',
    },
    {
      _key: 'day14',
      day: '14',
      title: 'Depart Kathmandu',
      content:
        'Transfer to Tribhuvan International Airport for your onward journey. Expedition complete. The mountains will wait for your return.',
    },
  ],

  // ── Altitude Profile ───────────────────────────────────────────────────────
  altitudeProfile: [
    { _key: 'ap01', day: 1, label: 'Kathmandu', altitude: 1400 },
    { _key: 'ap02', day: 2, label: 'Phakding', altitude: 2610 },
    { _key: 'ap03', day: 3, label: 'Namche', altitude: 3440 },
    { _key: 'ap04', day: 4, label: 'Namche (Acc.)', altitude: 3880 },
    { _key: 'ap05', day: 5, label: 'Tengboche', altitude: 3867 },
    { _key: 'ap06', day: 6, label: 'Dingboche', altitude: 4360 },
    { _key: 'ap07', day: 7, label: 'Nangkartshang', altitude: 5090 },
    { _key: 'ap08', day: 8, label: 'Lobuche', altitude: 4940 },
    { _key: 'ap09', day: 9, label: 'EBC', altitude: 5364 },
    { _key: 'ap10', day: 10, label: 'Kala Patthar', altitude: 5545 },
    { _key: 'ap11', day: 11, label: 'Namche', altitude: 3440 },
    { _key: 'ap12', day: 12, label: 'Lukla', altitude: 2860 },
    { _key: 'ap13', day: 13, label: 'Kathmandu', altitude: 1400 },
    { _key: 'ap14', day: 14, label: 'Departure', altitude: 1400 },
  ],

  // ── Batches ────────────────────────────────────────────────────────────────
  batches: [
    {
      _key: 'ebc-mar-2026-01',
      batchId: 'EBC-MAR-2026-01',
      startDate: '2026-03-15',
      endDate: '2026-03-28',
      price: 285000,
      discountedPrice: 265000,
      totalSeats: 8,
      seatsBooked: 5,
      status: 'open',
      meetingPoint: 'Hotel Yak & Yeti, Kathmandu',
      notes: 'Spring window — best visibility, rhododendrons in bloom.',
    },
    {
      _key: 'ebc-apr-2026-01',
      batchId: 'EBC-APR-2026-01',
      startDate: '2026-04-12',
      endDate: '2026-04-25',
      price: 285000,
      totalSeats: 8,
      seatsBooked: 2,
      status: 'open',
      meetingPoint: 'Hotel Yak & Yeti, Kathmandu',
      notes: 'Peak climbing season. Book early.',
    },
    {
      _key: 'ebc-oct-2026-01',
      batchId: 'EBC-OCT-2026-01',
      startDate: '2026-10-10',
      endDate: '2026-10-23',
      price: 285000,
      totalSeats: 8,
      seatsBooked: 0,
      status: 'open',
      meetingPoint: 'Hotel Yak & Yeti, Kathmandu',
      notes: 'Autumn window — crystal-clear skies after monsoon.',
    },
  ],

  // ── Included ───────────────────────────────────────────────────────────────
  included: [
    'Kathmandu–Lukla–Kathmandu flights (both legs)',
    'All accommodation: 3-star hotel in Kathmandu (2 nights), teahouses on trail (10 nights)',
    'All meals on trek: breakfast, lunch, and dinner',
    'WFR-certified lead guide (1:4 guide-to-trekker ratio)',
    'Experienced Sherpa support team',
    'Licensed porter (1 per 2 trekkers, max 10kg per porter)',
    'Sagarmatha National Park entry permit',
    'TIMS (Trekkers\' Information Management System) card',
    'Pulse oximeter monitoring: twice daily',
    'Group first-aid kit and emergency oxygen cylinder',
    'Airport transfers in Kathmandu',
    'Yeti Expeditions trek briefing kit and route map',
    'Farewell dinner in Kathmandu',
    'Emergency evacuation coordination (heli-evac costs covered by travel insurance)',
  ],

  // ── Excluded ───────────────────────────────────────────────────────────────
  excluded: [
    'International flights to/from Kathmandu',
    'Nepal visa fees (~$50 USD on arrival)',
    'Travel insurance with high-altitude and heli-evac coverage (mandatory)',
    'Personal trekking gear and clothing',
    'Hot showers, phone charging, and WiFi on trail (pay per use, ~$1–3)',
    'Alcoholic and bottled beverages',
    'Tips for guides, Sherpas, and porters (customary; ~$150–200 total)',
    'Meals in Kathmandu (outside included dinners)',
    'Personal medication and altitude sickness drugs (Diamox)',
    'Excess baggage fees on the Lukla flight (over 15kg)',
    'Any expenses arising from early return or trip interruption',
  ],

  // ── Packing List ───────────────────────────────────────────────────────────
  packingList: [
    {
      _key: 'pl-clothing',
      category: 'Clothing',
      items: [
        'Down jacket (–10°C rated minimum)',
        'Waterproof hardshell jacket',
        'Waterproof trousers',
        'Thermal base layer top × 2',
        'Thermal base layer bottom × 2',
        'Mid-layer fleece or softshell',
        'Trekking trousers × 2',
        'Trekking shirts × 3',
        'Warm hat and sun hat',
        'Balaclava',
        'Trekking socks × 5 pairs',
        'Light camp shoes (Crocs/sandals)',
      ],
    },
    {
      _key: 'pl-footwear',
      category: 'Footwear',
      items: [
        'Waterproof trekking boots (broken in)',
        'Lightweight camp shoes',
        'Gaiters (recommended for snow sections)',
        'Trekking poles (pair)',
      ],
    },
    {
      _key: 'pl-gear',
      category: 'Technical Gear',
      items: [
        'Trekking backpack 50–60L',
        'Daypack 20–25L (for summit push)',
        'Sleeping bag (–15°C rated)',
        'Sleeping bag liner',
        'Headlamp + spare batteries',
        'Trekking poles',
        'Sunglasses (UV400 / Category 4)',
        'Water bottles × 2 (1L each)',
        'Water purification tablets or filter',
        'Dry bags or pack liner',
      ],
    },
    {
      _key: 'pl-health',
      category: 'Health & Hygiene',
      items: [
        'Personal first-aid kit',
        'Diamox (acetazolamide) — consult your doctor',
        'Ibuprofen and paracetamol',
        'Blister kit (Compeed, moleskin)',
        'Sunscreen SPF 50+',
        'Lip balm SPF 30',
        'Hand sanitiser × 2',
        'Wet wipes × 3 packs',
        'Biodegradable soap',
        'Personal hygiene supplies',
        'Quick-dry towel',
        'Earplugs (teahouse walls are thin)',
      ],
    },
  ],

  // ── Physical Preparation ───────────────────────────────────────────────────
  physicalPrep: [
    {
      _key: 'pp01',
      weeks: '16+ Weeks Out',
      focus: 'Aerobic Base',
      description:
        'Build your cardiovascular foundation with 4–5 weekly sessions: 45-minute runs, cycling, or swimming. Goal: sustain Zone 2 effort (conversation pace) for 60 minutes without stopping.',
    },
    {
      _key: 'pp02',
      weeks: '12 Weeks Out',
      focus: 'Loaded Hiking',
      description:
        'Begin weekly long hikes with a 10kg backpack. Start at 10km, build to 25km by week 8. Elevation gain is more important than distance — seek hills, use stairs if needed.',
    },
    {
      _key: 'pp03',
      weeks: '8 Weeks Out',
      focus: 'Leg Strength & Endurance',
      description:
        'Introduce strength training: squats, lunges, step-ups, and single-leg deadlifts. Add back-to-back hiking days (Saturday + Sunday) to simulate consecutive days on trail.',
    },
    {
      _key: 'pp04',
      weeks: '4 Weeks Out',
      focus: 'Taper & Gear Test',
      description:
        'Reduce volume by 30%, maintain intensity. Complete one full-day hike in your actual trek boots. Test all gear. Visit your doctor for a pre-trek medical check and Diamox prescription.',
    },
  ],

  // ── Testimonials ───────────────────────────────────────────────────────────
  testimonials: [
    {
      _key: 'test01',
      name: 'James Whitfield',
      location: 'London, UK',
      rating: 5,
      text: 'I\'ve done guided treks with three operators over the years. Yeti Expeditions is on another level. The safety protocols are genuinely reassuring — twice-daily oximetry checks and a guide who clearly knows every rescue scenario. Standing at EBC was the pinnacle of my trekking life.',
      batch: 'EBC — October 2025',
    },
    {
      _key: 'test02',
      name: 'Priya Nair',
      location: 'Bangalore, India',
      rating: 5,
      text: 'As a solo female trekker, I was apprehensive about the group dynamic. The max-8 group policy meant we were an actual team by day 3. Our guide Dawa is a legend. Every logistical detail was handled before I even thought to ask. Will be booking Annapurna next year.',
      batch: 'EBC — April 2025',
    },
    {
      _key: 'test03',
      name: 'Lars Eriksson',
      location: 'Stockholm, Sweden',
      rating: 5,
      text: 'The altitude profile planning was meticulous. We acclimatised properly, nobody had to turn back. Kala Patthar at sunrise with Everest glowing — no photograph captures it. The Yeti team made the impossible feel very possible.',
      batch: 'EBC — March 2025',
    },
  ],

  // ── Getting There ──────────────────────────────────────────────────────────
  gettingThere: {
    arrival:
      'Fly into Tribhuvan International Airport (KTM), Kathmandu. Yeti Expeditions provides a complimentary airport pickup on Day 1. We recommend arriving a day early if your international flight involves a connection, to buffer against delays.',
    visa:
      'Nepal visa on arrival at KTM airport: $30 USD (15 days), $50 USD (30 days), $125 USD (90 days). Bring 1 passport photo and exact USD cash. E-Visa available at nepal.gov.np. No pre-trip visa application required for most nationalities.',
    domesticFlight:
      'Kathmandu → Lukla flight (approx. 35 min) departs Tribhuvan domestic terminal at ~06:30. Flight is weather-dependent; we build a contingency buffer into the itinerary. We handle all bookings — no action required from you.',
  },

  // ── Accommodation Details ──────────────────────────────────────────────────
  accommodationDetails: [
    { _key: 'acc01', location: 'Kathmandu', type: '3-Star Hotel', nights: 2, notes: 'Hotel Yak & Yeti or equivalent. En-suite, hot water, WiFi.' },
    { _key: 'acc02', location: 'Phakding', type: 'Teahouse', nights: 1, notes: 'Twin-share rooms. Shared bathrooms. Charging available.' },
    { _key: 'acc03', location: 'Namche Bazaar', type: 'Teahouse', nights: 2, notes: 'Best teahouses in the Khumbu. Hot showers available.' },
    { _key: 'acc04', location: 'Tengboche', type: 'Teahouse', nights: 1, notes: 'Basic facilities. Stunning monastery views.' },
    { _key: 'acc05', location: 'Dingboche', type: 'Teahouse', nights: 2, notes: 'Yak dung stoves in common room. No hot showers above here.' },
    { _key: 'acc06', location: 'Lobuche', type: 'Teahouse', nights: 1, notes: 'Very basic. Cold conditions — sleeping bag mandatory.' },
    { _key: 'acc07', location: 'Gorak Shep', type: 'Teahouse', nights: 1, notes: 'Highest accommodation on the route. Basic but functional.' },
    { _key: 'acc08', location: 'Pheriche', type: 'Teahouse', nights: 1, notes: 'Home of the Himalayan Rescue Association clinic.' },
    { _key: 'acc09', location: 'Namche Bazaar', type: 'Teahouse', nights: 1, notes: 'Descent stop — same lodge as ascent.' },
    { _key: 'acc10', location: 'Lukla', type: 'Teahouse', nights: 1, notes: 'Final night on trail. Farewell dinner with Sherpa crew.' },
  ],

  // ── Permits ────────────────────────────────────────────────────────────────
  permits: [
    {
      _key: 'perm01',
      name: 'Sagarmatha National Park Entry Permit',
      cost: '$30 USD',
      handledBy: 'Yeti Expeditions',
      notes: 'Required for all trekkers entering the Khumbu/Everest region. Collected at the park entrance checkpoint in Monjo.',
    },
    {
      _key: 'perm02',
      name: 'TIMS Card (Trekkers\' Information Management System)',
      cost: '$20 USD',
      handledBy: 'Yeti Expeditions',
      notes: 'Mandatory trekker registration card. Checked at multiple points on the trail. We process this in Kathmandu on Day 1.',
    },
    {
      _key: 'perm03',
      name: 'Khumbu Pasang Lhamu Rural Municipality Fee',
      cost: '$7 USD',
      handledBy: 'Yeti Expeditions',
      notes: 'Local conservation and community fee collected at the Lukla entry point. Mandatory since 2023.',
    },
  ],

  // ── FAQs ───────────────────────────────────────────────────────────────────
  faqs: [
    {
      _key: 'faq01',
      question: 'Do I need prior trekking experience for EBC?',
      answer:
        'You don\'t need technical mountaineering skills, but you should be comfortable with 5–8 hours of walking per day, consecutive days of hiking, and carrying a 5–10kg daypack. We recommend completing at least two full-day hikes of 20km+ before departure. Our pre-trek fitness vetting process will help confirm your readiness.',
    },
    {
      _key: 'faq02',
      question: 'What happens if I get altitude sickness?',
      answer:
        'Your safety is non-negotiable. Our WFR-certified guide monitors blood oxygen levels twice daily. At any sign of serious AMS (HACE/HAPE), the protocol is immediate descent — no debate. Emergency helicopter evacuation can be arranged within hours. This is why comprehensive travel insurance is mandatory. Diamox is recommended as a preventive measure; consult your doctor before the trek.',
    },
    {
      _key: 'faq03',
      question: 'What is the best time of year to do EBC?',
      answer:
        'We run EBC in two windows: Spring (March–May) and Autumn (September–November). Spring offers rhododendrons in bloom and the excitement of Everest summit season. Autumn brings crystal-clear post-monsoon skies and vibrant colours. We avoid the monsoon (June–August) when trail conditions deteriorate significantly, and winter (December–February) when temperatures drop to –20°C at altitude.',
    },
    {
      _key: 'faq04',
      question: 'How much weight can my porter carry?',
      answer:
        'Each porter carries a maximum of 20kg total (their own gear + your duffel). We allocate one porter per two trekkers, so your duffel allowance is 10kg. Your daypack (carried by you) is separate. We strictly enforce this weight limit — it\'s an ethical standard we hold firmly.',
    },
    {
      _key: 'faq05',
      question: 'Is WiFi available on the trail?',
      answer:
        'Most teahouses offer WiFi for a fee ($2–5 USD per day) up to Namche Bazaar and some beyond. Signal quality degrades at higher altitudes. We recommend purchasing a Ncell SIM card in Kathmandu for 3G coverage up to approximately Dingboche. Above that, bring a journal.',
    },
    {
      _key: 'faq06',
      question: 'Can I do EBC if I\'m vegetarian or have dietary restrictions?',
      answer:
        'Absolutely. Teahouse menus feature excellent vegetarian options — dal bhat, vegetable curry, pasta, soups, and porridge. Vegan options are more limited at high altitude. Please notify us of any allergies or dietary requirements during booking so we can brief the lodges in advance.',
    },
  ],
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('ERROR: SANITY_TOKEN environment variable is not set.')
    console.error('Get a token at: https://www.sanity.io/manage → project qmj04x7n → API → Tokens')
    process.exit(1)
  }

  console.log('Checking for existing EBC trek document...')

  const existing = await client.fetch(
    `*[_type == "trek" && slug.current == "everest-base-camp"][0]._id`
  )

  if (existing) {
    console.log(`Found existing document (${existing}). Patching with latest data...`)
    await client
      .patch(existing)
      .set(ebcTrek)
      .commit()
    console.log(`✓ Updated trek document: ${existing}`)
  } else {
    console.log('No existing document found. Creating new trek...')
    const result = await client.create(ebcTrek)
    console.log(`✓ Created trek document: ${result._id}`)
  }

  console.log('\nDone! View in Sanity Studio at: https://yeti-expeditions.sanity.studio/')
}

main().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
