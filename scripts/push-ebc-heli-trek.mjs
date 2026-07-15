/**
 * push-ebc-heli-trek.mjs
 * Pushes the "Everest Base Camp – Heli Return" trek into Sanity production.
 * Run: node scripts/push-ebc-heli-trek.mjs
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
  name: 'Everest Base Camp – Heli Return',
  slug: { _type: 'slug', current: 'everest-base-camp-11-days-helicopter-return' },
  region: 'Nepal',
  country: 'Nepal',
  difficulty: 'Difficult',
  duration: '13 Days',
  altitude: '5,500m',
  season: 'MAR-APR, OCT-NOV',
  accommodation: 'TEAHOUSE',
  groupSize: 'MAX 12',
  priceINR: 190500,

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
        'Distance: 6.2 km | Time: 3–4 hours. Early morning departure from Kathmandu to Ramechhap (1–2 am). 20-minute flight to Tenzing-Hillary Airport, Lukla. Trek begins after crew coordination. Meals: Breakfast, lunch, dinner. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '03',
      title: 'Phakding → Namche Bazaar (3,440m)',
      content:
        'Distance: 7.4 km | Time: 6–7 hours. Trail follows Dudh Koshi River through suspension bridges. Pass through villages: Benkar, Chumoa, Monjo, Jorsale. Enter Sagarmatha National Park. First glimpse of Mt. Everest. Steep final ascent to Namche Bazaar. Meals: Three daily meals plus twice-daily tea/coffee. Accommodation: Tea house with attached toilet.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '04',
      title: 'Acclimatization at Namche Bazaar (3,440m)',
      content:
        'Trek time: 3–4 hours. Hike to Everest viewpoint and return. Explore main trading center. Visit shops and market. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '05',
      title: 'Namche → Debuche (3,790m)',
      content:
        'Distance: 10 km | Time: 7–8 hours. Superb views of Mt. Everest, Nuptse, Lhotse, Ama Dablam. Descent to Kayangjuma. Lunch at Phunki Thenga. Pine forest climb to Tengboche. Visit beautiful monastery. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '06',
      title: 'Debuche → Dingboche (4,320m)',
      content:
        'Distance: 11.5 km | Time: 6–7 hours. Cross Pangboche village. Pass chortens and mani walls. Close-up view of Mt. Ama Dablam at lunch stop. Enter Imja Valley. Steep final climb to Dingboche. Meals: Three daily plus tea/coffee. Accommodation: Tea house with attached toilet.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '07',
      title: 'Acclimatization at Dingboche (4,320m)',
      content:
        'Trek time: 3–4 hours. Ridge walk north of village. Views of three of the world\'s six highest peaks: Lhotse, Makalu, Cho Oyu. Panoramic views of Cholatse and Taboche. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '08',
      title: 'Dingboche → Lobuche (4,900m)',
      content:
        'Distance: 8.5 km | Time: 5–6 hours. Pass through valley to Thukla for lunch. Pass memorials of Scott Fischer and Babu Chiri Sherpa. Cross Khumbu Glacier. Summit Thukla Pass. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '09',
      title: 'Lobuche → Everest Base Camp (5,364m) → Gorak Shep (5,140m)',
      content:
        'Distance: 15 km | Time: 7–8 hours. Trek through Khumbu Glacier moraine. Views of north ridge of Everest. Steep climb through Changri Glacier. First glimpse of Kala Patthar and Mt. Pumori. Brief rest at Gorak Shep. Afternoon trek to Everest Base Camp — observe mountaineer tents and climbing routes. Return to Gorak Shep for overnight. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '10',
      title: 'Kala Patthar (5,500m) → Lobuche (4,900m)',
      content:
        'Time: 6–7 hours. Pre-dawn departure; temperature range −10 to −14°C. Ascent through viewpoints for photography. Reach rocky Kala Patthar summit with cairns and prayer flags — mind-blowing Himalayan panorama. Descent to Gorak Shep for rest, then careful descent to Lobuche on rocky terrain. Meals: Three daily plus tea/coffee. Accommodation: Tea house.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '11',
      title: 'Helicopter Flight: Lobuche → Lukla',
      content:
        'Shared helicopter flight from Lobuche to Lukla. Breathtaking aerial views of Everest region — peaks and glacier-carved valleys visible. Accommodation: Tea house in Lukla.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '12',
      title: 'Lukla → Ramechhap → Kathmandu',
      content:
        'Flight from Lukla to Ramechhap. Drive to Kathmandu (6–7 hours with breaks). Optional sightseeing or shopping on arrival. Accommodation: 3-star hotel.',
    },
    {
      _type: 'object',
      _key: uuid(),
      day: '13',
      title: 'Depart Kathmandu',
      content: 'End of package. International departure.',
    },
  ],

  // ── Altitude Profile ─────────────────────────────────────────
  altitudeProfile: [
    { _type: 'object', _key: uuid(), day: 1,  label: 'Kathmandu',        altitude: 1375 },
    { _type: 'object', _key: uuid(), day: 2,  label: 'Phakding',         altitude: 2650 },
    { _type: 'object', _key: uuid(), day: 3,  label: 'Namche Bazaar',    altitude: 3440 },
    { _type: 'object', _key: uuid(), day: 4,  label: 'Namche (accl.)',   altitude: 3440 },
    { _type: 'object', _key: uuid(), day: 5,  label: 'Debuche',          altitude: 3790 },
    { _type: 'object', _key: uuid(), day: 6,  label: 'Dingboche',        altitude: 4320 },
    { _type: 'object', _key: uuid(), day: 7,  label: 'Dingboche (accl.)',altitude: 4320 },
    { _type: 'object', _key: uuid(), day: 8,  label: 'Lobuche',          altitude: 4900 },
    { _type: 'object', _key: uuid(), day: 9,  label: 'EBC / Gorak Shep', altitude: 5364 },
    { _type: 'object', _key: uuid(), day: 10, label: 'Kala Patthar',     altitude: 5500 },
    { _type: 'object', _key: uuid(), day: 11, label: 'Lukla (heli)',      altitude: 2860 },
    { _type: 'object', _key: uuid(), day: 12, label: 'Kathmandu',        altitude: 1375 },
    { _type: 'object', _key: uuid(), day: 13, label: 'Departure',        altitude: 1375 },
  ],

  // ── Included ─────────────────────────────────────────────────
  included: [
    bullet('Two nights Kathmandu accommodation (3-star, twin sharing)'),
    bullet('Airport transfers — arrival and departure'),
    bullet('Internal flights: Ramechhap–Lukla–Ramechhap'),
    bullet('Helicopter: Lobuche to Lukla (shared)'),
    bullet('Tea house accommodation during the trek (twin sharing; attached toilets at select locations)'),
    bullet('All meals during trekking (breakfast, lunch, dinner)'),
    bullet('Twice-daily tea/coffee'),
    bullet('One porter per two trekkers (10 kg baggage limit)'),
    bullet('Sagarmatha National Park and municipality fees'),
    bullet('Licensed local Nepali guide'),
    bullet('Medical kit'),
    bullet('Duffle bag and Yeti Expeditions t-shirt'),
    bullet('Trek completion certificate'),
    bullet('Welcome team dinner in Kathmandu'),
    bullet('2 litres mineral water daily'),
    bullet('Taxi Kathmandu–Ramechhap (if required)'),
  ],

  // ── Excluded ─────────────────────────────────────────────────
  excluded: [
    bullet('International airfares'),
    bullet('Airport taxes and Nepal visa expenses'),
    bullet('All travel and adventure insurance'),
    bullet('Guide and porter tips (customary)'),
    bullet('Personal beverages, snacks, and personal expenses'),
    bullet('Hot water, WiFi, and device-charging fees at tea houses'),
    bullet('Kathmandu lunches and dinners'),
    bullet('Extra Kathmandu nights beyond the package'),
    bullet('Costs arising from unforeseen circumstances (weather, landslides, etc.)'),
    bullet('Medical evacuation charges'),
    bullet('5% GST tax'),
  ],

  // ── Getting There ─────────────────────────────────────────────
  gettingThere: {
    arrival:
      'Fly into Tribhuvan International Airport (KTM), Kathmandu. Arrive before afternoon on Day 1 for rest and preparation. Airport transfer is included.',
    visa:
      'Nepal visa on arrival is available at Tribhuvan International Airport. Cost is approx. USD 30 (15 days) / USD 50 (30 days). Bring passport-size photos.',
    domesticFlight:
      'Flights operate from either Kathmandu (TIA) or Ramechhap (RHP), 130 km east of Kathmandu. Weather and seasons determine the departure airport. Early morning drive to Ramechhap (1–2 am) may be required for Ramechhap-season flights.',
  },

  // ── Accommodation Details ────────────────────────────────────
  accommodationDetails: [
    { _type: 'object', _key: uuid(), location: 'Kathmandu',     type: '3-Star Hotel',  nights: 2, notes: 'Twin sharing, breakfast included' },
    { _type: 'object', _key: uuid(), location: 'Phakding',      type: 'Teahouse',      nights: 1, notes: 'Twin sharing' },
    { _type: 'object', _key: uuid(), location: 'Namche Bazaar', type: 'Teahouse',      nights: 2, notes: 'Attached toilet available' },
    { _type: 'object', _key: uuid(), location: 'Debuche',       type: 'Teahouse',      nights: 1, notes: 'Twin sharing' },
    { _type: 'object', _key: uuid(), location: 'Dingboche',     type: 'Teahouse',      nights: 2, notes: 'Attached toilet available' },
    { _type: 'object', _key: uuid(), location: 'Lobuche',       type: 'Teahouse',      nights: 2, notes: 'Twin sharing' },
    { _type: 'object', _key: uuid(), location: 'Gorak Shep',    type: 'Teahouse',      nights: 1, notes: 'Highest point overnight' },
    { _type: 'object', _key: uuid(), location: 'Lukla',         type: 'Teahouse',      nights: 1, notes: 'After heli flight' },
  ],

  // ── Permits ──────────────────────────────────────────────────
  permits: [
    {
      _type: 'object',
      _key: uuid(),
      name: 'Sagarmatha National Park Entry Permit',
      cost: 'Included',
      handledBy: 'Yeti Expeditions',
      notes: 'Required for all EBC treks',
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
      question: 'Why does the itinerary say 13 days when the trek is marketed as 11 days?',
      answer:
        'The "11 days" refers to active trekking and adventure days. Days 1 and 13 are arrival and departure days in Kathmandu, making the full package 13 days/12 nights.',
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
        '10 kg checked baggage and 5 kg hand baggage are permitted on the Lukla flights. Yeti Expeditions provides a duffle bag; excess luggage can be stored at your Kathmandu hotel.',
    },
    {
      _type: 'object',
      _key: uuid(),
      question: 'What is Acute Mountain Sickness (AMS) and how is it managed?',
      answer:
        'AMS is caused by rapid ascent to high altitude. Symptoms include headache, nausea, and fatigue. Two acclimatisation days (Namche and Dingboche) are built into the itinerary. Our licensed guides carry a medical kit and will monitor everyone daily. The trek leader may halt or reverse ascent if AMS symptoms are detected.',
    },
    {
      _type: 'object',
      _key: uuid(),
      question: 'What is the helicopter return and where does it depart from?',
      answer:
        'On Day 11 you board a shared helicopter from Lobuche (approx. 4,900m) to Lukla. The flight provides breathtaking aerial views of Everest, surrounding peaks, and glacier-carved valleys — a highlight of the entire experience. You then fly or drive back to Kathmandu on Day 12.',
    },
  ],

  // ── SEO ───────────────────────────────────────────────────────
  seo: {
    _type: 'seoFields',
    metaTitle: 'Everest Base Camp Heli Return Trek – 13 Days | Yeti Expeditions',
    metaDescription:
      'Trek to Everest Base Camp (5,364m) and Kala Patthar (5,500m) and fly back by helicopter. 13-day guided trek from Kathmandu with acclimatisation days, all meals, and permits included. From ₹1,90,500.',
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
