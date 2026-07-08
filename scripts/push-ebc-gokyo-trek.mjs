/**
 * push-ebc-gokyo-trek.mjs
 * Pushes the "Everest Base Camp Via Gokyo Lakes" trek into Sanity production.
 * Run: node scripts/push-ebc-gokyo-trek.mjs
 */

import { createClient } from '@sanity/client'
import { v4 as uuid } from 'uuid'

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk6qXXPFqNKYWXRuxKXDvOCExnvbhRvv28xHulGtUMcdzXkcSFtW8ERAteNeNZdxlfJv4IWgppETQCBaLI7BWpkh0CKRFek8d3iTN2jFM6ilQxqcStaTbAu2sDLD6xrRKXtfRSU3rkQyZTm86xwPbM6zM0yNFqyc4ZTBkjGvwJuZInxQx4ao',
  useCdn: false,
})

// ── Helpers ────────────────────────────────────────────────────────────────

/** Build a portable-text block from a plain string (normal style) */
function block(text) {
  return {
    _type: 'block',
    _key: uuid(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: uuid(), text, marks: [] }],
  }
}

/** Build a portable-text bullet list item */
function bullet(text) {
  return {
    _type: 'block',
    _key: uuid(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: uuid(), text, marks: [] }],
  }
}

// ── Document ───────────────────────────────────────────────────────────────

const trek = {
  _type: 'trek',

  // ── Core identity ────────────────────────────────────────────
  name: 'Everest Base Camp Via Gokyo Lakes',
  slug: { _type: 'slug', current: 'everest-base-camp-via-gokyo-lakes' },
  region: 'Nepal',
  country: 'Nepal',
  difficulty: 'Difficult',
  duration: '18 Days',
  altitude: '5,500m',
  season: 'MAR-APR, OCT-NOV',
  accommodation: 'TEAHOUSE',
  groupSize: 'MAX 10',
  priceINR: 125500,

  // ── Itinerary ────────────────────────────────────────────────
  itinerary: [
    {
      _type: 'object',
      _key: uuid(),
      day: '01',
      title: 'Arrive at Kathmandu (1,375m)',
      content:
        'Arrival and hotel transfer. Meet trek leader and team members. Overnight at 3-star hotel with breakfast. Arrive before afternoon for rest and preparation.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '02',
      title: 'Fly to Lukla (2,800m) → Trek to Phakding (2,650m)',
      content:
        'Early morning departure from Kathmandu to Ramechhap (1–2 am if Ramechhap season). 20-minute flight to Tenzing-Hillary Airport, Lukla. Trek begins after crew coordination. Meals: Breakfast, lunch, dinner. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '03',
      title: 'Phakding → Namche Bazaar (3,440m)',
      content:
        'Trail follows Dudh Koshi River through iconic Hillary Suspension Bridge. Pass through Benkar, Chumoa, Monjo, and Jorsale. Enter Sagarmatha National Park. First views of Mt. Everest on the climb to Namche Bazaar — the capital of the Khumbu region. Meals: Three daily meals plus twice-daily tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '04',
      title: 'Acclimatization at Namche Bazaar (3,440m)',
      content:
        'Trek time: 3–4 hours. Hike to Everest Viewpoint for sunrise panorama of Everest, Lhotse, Nuptse, and Ama Dablam. Explore Namche market, Sherpa museum, and local shops. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '05',
      title: 'Namche Bazaar → Mongla (3,970m)',
      content:
        'Climb via Kyangjuma on a ridge trail offering sweeping views of Everest, Ama Dablam, Thamserku, and Kusum Kanguru. Steady ascent through rhododendron and pine forests. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '06',
      title: 'Mongla → Dole (4,038m)',
      content:
        'Follow the Dudh Kosi valley through beautiful forests. Diverge from the classic EBC route and head towards Gokyo valley. Views of Cho Oyu and Gyangchung Kang begin to emerge. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '07',
      title: 'Dole → Macchermo (4,465m)',
      content:
        'Steep uphill climb from Dole. Pass through the small settlements of Lahframa and Luza. Increasing altitude demands a slower pace. Excellent views of Cho Oyu and surrounding peaks. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '08',
      title: 'Macchermo → Gokyo (4,720m)',
      content:
        'Cross the Ngozamba glacier moraine. Reach the first of the Gokyo lakes — Longpongo — before arriving at the stunning turquoise Gokyo Lake and village. Views of Cho Oyu (8,153m), the sixth highest mountain in the world. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '09',
      title: 'Gokyo Ri (5,483m) → Descend to Thangnak (4,700m)',
      content:
        'Pre-dawn start for a steep 2–3 hour climb to Gokyo Ri summit. Breathtaking panorama of four eight-thousanders: Cho Oyu, Everest, Lhotse, and Makalu — widely considered more spectacular than Kala Patthar. Descend to Thangnak for overnight. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '10',
      title: 'Acclimatization at Thangnak (4,700m)',
      content:
        'Rest and acclimatization day to prepare for the high-altitude Chola Pass crossing ahead. Short morning exploration of the surrounding glacier terrain. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '11',
      title: 'Thangnak → Dzongla via Chola Pass (5,420m)',
      content:
        'A long and challenging day. Ascend to Chola Pass (5,420m) on rocky, glaciated terrain — crampons required for the technical descent on the far side. Rewarded with extraordinary views of Cholatse and Ama Dablam. Descend to Dzongla. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '12',
      title: 'Dzongla → Lobuche (4,910m)',
      content:
        'A relatively gentle 3-hour walk mostly at altitude across open terrain. Arrive at Lobuche on the edge of the Khumbu Glacier. Memorials to climbers on the ridge above. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '13',
      title: 'Lobuche → Everest Base Camp (5,364m) → Gorak Shep (5,140m)',
      content:
        'Trek through Khumbu Glacier moraine to Gorak Shep (3 hours). Afternoon trek to Everest Base Camp — observe mountaineer tents, climbing equipment, and the Khumbu Icefall up close. Return to Gorak Shep for overnight. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '14',
      title: 'Kala Patthar (5,500m) → Pheriche (4,243m)',
      content:
        'Pre-dawn departure for Kala Patthar — the highest point of the trek. Sunrise views of the South Col, Hillary\'s Steps, and the complete Everest massif. Descend to Gorak Shep for breakfast, then continue down through Lobuche to Pheriche. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '15',
      title: 'Pheriche → Namche Bazaar (3,440m)',
      content:
        'Long descent day. Pass through Tengboche and visit the famous Tengboche Monastery — the largest in the Khumbu region. Continued descent to Namche Bazaar for overnight. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '16',
      title: 'Namche Bazaar → Lukla (2,860m)',
      content:
        'Long final trekking day. Steep initial descent to Phakding (3 hours), then valley trail back to Lukla. Celebratory dinner with the team. Meals: Three daily plus tea/coffee. Accommodation: Tea house in Lukla.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '17',
      title: 'Lukla → Ramechhap → Kathmandu',
      content:
        'Flight from Lukla to Ramechhap (or Kathmandu direct, weather permitting). Drive to Kathmandu (approx. 4–5 hours from Ramechhap). Evening at leisure for optional sightseeing or shopping. Accommodation: 3-star hotel in Kathmandu.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '18',
      title: 'Depart Kathmandu',
      content: 'End of package. International departure from Tribhuvan International Airport.',
    },
  ],

  // ── Altitude Profile ─────────────────────────────────────────
  altitudeProfile: [
    { _type: 'object', _key: uuid(), day: 1,  label: 'Kathmandu',         altitude: 1375 },
    { _type: 'object', _key: uuid(), day: 2,  label: 'Phakding',          altitude: 2650 },
    { _type: 'object', _key: uuid(), day: 3,  label: 'Namche Bazaar',     altitude: 3440 },
    { _type: 'object', _key: uuid(), day: 4,  label: 'Namche (accl.)',    altitude: 3440 },
    { _type: 'object', _key: uuid(), day: 5,  label: 'Mongla',            altitude: 3970 },
    { _type: 'object', _key: uuid(), day: 6,  label: 'Dole',              altitude: 4038 },
    { _type: 'object', _key: uuid(), day: 7,  label: 'Macchermo',         altitude: 4465 },
    { _type: 'object', _key: uuid(), day: 8,  label: 'Gokyo',             altitude: 4720 },
    { _type: 'object', _key: uuid(), day: 9,  label: 'Gokyo Ri / Thangnak', altitude: 5483 },
    { _type: 'object', _key: uuid(), day: 10, label: 'Thangnak (accl.)',  altitude: 4700 },
    { _type: 'object', _key: uuid(), day: 11, label: 'Chola Pass / Dzongla', altitude: 5420 },
    { _type: 'object', _key: uuid(), day: 12, label: 'Lobuche',           altitude: 4910 },
    { _type: 'object', _key: uuid(), day: 13, label: 'EBC / Gorak Shep',  altitude: 5364 },
    { _type: 'object', _key: uuid(), day: 14, label: 'Kala Patthar',      altitude: 5500 },
    { _type: 'object', _key: uuid(), day: 15, label: 'Namche Bazaar',     altitude: 3440 },
    { _type: 'object', _key: uuid(), day: 16, label: 'Lukla',             altitude: 2860 },
    { _type: 'object', _key: uuid(), day: 17, label: 'Kathmandu',         altitude: 1375 },
    { _type: 'object', _key: uuid(), day: 18, label: 'Departure',         altitude: 1375 },
  ],

  // ── Included ─────────────────────────────────────────────────
  included: [
    bullet('Two nights Kathmandu accommodation (3-star, twin sharing, breakfast included)'),
    bullet('Airport transfers — arrival and departure (private vehicle)'),
    bullet('Internal flights: Ramechhap/Kathmandu–Lukla return'),
    bullet('Tea house accommodation during the trek (twin sharing)'),
    bullet('All meals during trekking (breakfast, lunch, dinner — open menu, no restrictions)'),
    bullet('Twice-daily tea/coffee during trekking'),
    bullet('One porter per two trekkers (10 kg baggage limit)'),
    bullet('Sagarmatha National Park and Khumbu Municipality fees'),
    bullet('Certified Indian trek leader and licensed local Nepali guide'),
    bullet('Medical kit'),
    bullet('Duffle bag and Yeti Expeditions t-shirt'),
    bullet('Trek completion certificate'),
    bullet('Welcome team dinner in Kathmandu'),
  ],

  // ── Excluded ─────────────────────────────────────────────────
  excluded: [
    bullet('International airfares'),
    bullet('Airport taxes and Nepal visa expenses'),
    bullet('All travel, risk, and accident insurance (mandatory)'),
    bullet('Guide and porter tips (customary)'),
    bullet('Personal beverages, snacks, and personal expenses'),
    bullet('Hot water at tea houses'),
    bullet('WiFi and device-charging fees at tea houses'),
    bullet('Kathmandu lunches and dinners'),
    bullet('Extra Kathmandu nights beyond the package'),
    bullet('Costs arising from unforeseen circumstances (weather, landslides, etc.)'),
    bullet('Medical evacuation charges'),
    bullet('5% GST tax'),
    bullet('Taxi Kathmandu–Ramechhap (if required; shared among participants)'),
  ],

  // ── Getting There ─────────────────────────────────────────────
  gettingThere: {
    arrival:
      'Fly into Tribhuvan International Airport (KTM), Kathmandu. Arrive before afternoon on Day 1 for rest and preparation. Airport transfer is included.',
    visa:
      'Nepal visa on arrival is available at Tribhuvan International Airport. Cost is approx. USD 30 (15 days) / USD 50 (30 days). Bring passport-size photos.',
    domesticFlight:
      'Flights operate from either Kathmandu (TIA) or Ramechhap (RHP), 130 km east of Kathmandu. The Civil Aviation Authority routes flights through Ramechhap during peak season. An early morning drive (1–2 am) from Kathmandu may be required. We recommend 1–2 buffer days to account for weather delays. Baggage limit: 10 kg checked + 5 kg hand baggage.',
  },

  // ── Accommodation Details ────────────────────────────────────
  accommodationDetails: [
    { _type: 'object', _key: uuid(), location: 'Kathmandu',     type: '3-Star Hotel', nights: 2, notes: 'Twin sharing, breakfast included (Day 1 & Day 17)' },
    { _type: 'object', _key: uuid(), location: 'Phakding',      type: 'Teahouse',     nights: 1, notes: 'Twin sharing' },
    { _type: 'object', _key: uuid(), location: 'Namche Bazaar', type: 'Teahouse',     nights: 2, notes: 'Acclimatisation stop' },
    { _type: 'object', _key: uuid(), location: 'Mongla',        type: 'Teahouse',     nights: 1, notes: 'Twin sharing' },
    { _type: 'object', _key: uuid(), location: 'Dole',          type: 'Teahouse',     nights: 1, notes: 'Twin sharing' },
    { _type: 'object', _key: uuid(), location: 'Macchermo',     type: 'Teahouse',     nights: 1, notes: 'Twin sharing' },
    { _type: 'object', _key: uuid(), location: 'Gokyo',         type: 'Teahouse',     nights: 1, notes: 'Beside Gokyo Lake' },
    { _type: 'object', _key: uuid(), location: 'Thangnak',      type: 'Teahouse',     nights: 2, notes: 'Acclimatisation stop before Chola Pass' },
    { _type: 'object', _key: uuid(), location: 'Dzongla',       type: 'Teahouse',     nights: 1, notes: 'After Chola Pass crossing' },
    { _type: 'object', _key: uuid(), location: 'Lobuche',       type: 'Teahouse',     nights: 1, notes: 'Twin sharing' },
    { _type: 'object', _key: uuid(), location: 'Gorak Shep',    type: 'Teahouse',     nights: 1, notes: 'Highest overnight — after EBC visit' },
    { _type: 'object', _key: uuid(), location: 'Pheriche',      type: 'Teahouse',     nights: 1, notes: 'After Kala Patthar descent' },
    { _type: 'object', _key: uuid(), location: 'Namche Bazaar', type: 'Teahouse',     nights: 1, notes: 'Descent stop' },
    { _type: 'object', _key: uuid(), location: 'Lukla',         type: 'Teahouse',     nights: 1, notes: 'Final trekking night' },
  ],

  // ── Permits ──────────────────────────────────────────────────
  permits: [
    {
      _type: 'object',
      _key: uuid(),
      name: 'Sagarmatha National Park Entry Permit',
      cost: 'Included',
      handledBy: 'Yeti Expeditions',
      notes: 'Required for all EBC and Gokyo treks',
    },
    {
      _type: 'object',
      _key: uuid(),
      name: 'Khumbu Pasang Lhamu Rural Municipality Fee',
      cost: 'Included',
      handledBy: 'Yeti Expeditions',
      notes: 'Local municipality conservation fee',
    },
    {
      _type: 'object',
      _key: uuid(),
      name: 'TIMS Card (Trekkers Information Management System)',
      cost: 'Included',
      handledBy: 'Yeti Expeditions',
      notes: 'Required for all trekkers in Nepal',
    },
  ],

  // ── FAQs ────────────────────────────────────────────────────
  faqs: [
    {
      _type: 'object',
      _key: uuid(),
      question: 'What makes the Gokyo Lakes route different from the standard EBC route?',
      answer:
        'The Gokyo Lakes route takes you through the stunning Gokyo valley and its series of high-altitude glacial lakes, culminating at Gokyo Ri (5,483m). From the summit you see four eight-thousanders — Cho Oyu, Everest, Lhotse, and Makalu — widely considered more spectacular than the view from Kala Patthar. The route then crosses the Chola Pass (5,420m) to rejoin the classic EBC trail, meaning you experience both iconic destinations in one trek.',
    },
    {
      _type: 'object',
      _key: uuid(),
      question: 'How difficult is the Chola Pass crossing?',
      answer:
        'The Chola Pass (5,420m) is one of the most challenging sections of this trek. The ascent is steep and rocky, and the descent on the far side is glaciated and requires crampons. It is a long day with significant elevation gain and loss. Our guides carry the necessary equipment and will assess conditions on the day; the crossing may be rescheduled if weather is unsuitable.',
    },
    {
      _type: 'object',
      _key: uuid(),
      question: 'Do flights operate from Kathmandu or Ramechhap?',
      answer:
        'Lukla flights operate from either Kathmandu (TIA) or Ramechhap (RHP), 130 km away. During peak season the Civil Aviation Authority of Nepal routes all flights through Ramechhap to reduce congestion. This means a 1–2 am departure from Kathmandu by road. We recommend building 1–2 buffer days in Kathmandu to account for weather delays.',
    },
    {
      _type: 'object',
      _key: uuid(),
      question: 'Is travel insurance mandatory?',
      answer:
        'Yes. Travel insurance covering high-altitude trekking (up to 5,500m) and emergency helicopter evacuation is mandatory for all participants. Please arrange this before arriving in Nepal.',
    },
    {
      _type: 'object',
      _key: uuid(),
      question: 'What is the baggage allowance for the internal flights?',
      answer:
        '10 kg checked baggage and 5 kg hand baggage are permitted on the Lukla flights. Yeti Expeditions provides a duffle bag; excess luggage can be stored at your Kathmandu hotel during the trek.',
    },
    {
      _type: 'object',
      _key: uuid(),
      question: 'What is Acute Mountain Sickness (AMS) and how is it managed?',
      answer:
        'AMS is caused by rapid ascent to high altitude. Symptoms include headache, nausea, and fatigue. Two acclimatisation days (Namche Bazaar and Thangnak) are built into the itinerary. Our licensed guides carry a medical kit and monitor all trekkers daily. The trek leader may halt or reverse ascent if AMS symptoms are detected. A hospital run by the Himalayan Rescue Association is available at Pheriche.',
    },
  ],

  // ── SEO ───────────────────────────────────────────────────────
  seo: {
    _type: 'seoFields',
    metaTitle: 'Everest Base Camp Via Gokyo Lakes Trek – 18 Days | Yeti Expeditions',
    metaDescription:
      'Trek to Gokyo Ri (5,483m), cross the Chola Pass (5,420m), reach Everest Base Camp (5,364m) and Kala Patthar (5,500m). 18-day guided trek from Kathmandu with acclimatisation days, all meals, and permits included. From ₹1,25,500.',
    noIndex: false,
  },
}

// ── Push to Sanity ─────────────────────────────────────────────────────────

async function main() {
  console.log('⏳  Checking for existing document with slug:', trek.slug.current)

  const existing = await client.fetch(
    `*[_type == "trek" && slug.current == $slug][0]._id`,
    { slug: trek.slug.current }
  )

  if (existing) {
    console.log(`⚠️   Found existing trek (_id: ${existing}). Patching instead of creating...`)
    const result = await client.patch(existing).set(trek).commit()
    console.log('✅  Trek patched successfully:', result._id)
  } else {
    const result = await client.create(trek)
    console.log('✅  Trek created successfully:', result._id)
  }
}

main().catch((err) => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})
