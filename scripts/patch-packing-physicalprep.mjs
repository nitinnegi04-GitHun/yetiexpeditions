/**
 * patch-packing-physicalprep.mjs
 * Patches packingList + physicalPrep onto the two treks that are missing them:
 *   - Everest Base Camp – Heli Return
 *   - Everest Base Camp Via Gokyo Lakes
 *
 * Run: node scripts/patch-packing-physicalprep.mjs
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

// ─────────────────────────────────────────────────────────────────────────────
// SHARED HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function packingCategory(category, items) {
  return { _type: 'object', _key: uuid(), category, items }
}

function physicalPhase(weeks, focus, description) {
  return { _type: 'object', _key: uuid(), weeks, focus, description }
}

// ─────────────────────────────────────────────────────────────────────────────
// EBC HELI RETURN  (Difficult · 13 Days · 5,500m)
// Standard high-altitude Khumbu kit — same demands as EBC Premium.
// No technical pass crossing; helicopter replaces the return trek.
// ─────────────────────────────────────────────────────────────────────────────

const ebcHeliPackingList = [
  packingCategory('Clothing', [
    'Down jacket (–10°C rated)',
    'Waterproof hardshell jacket',
    'Waterproof trousers',
    'Thermal base layers × 2 (top & bottom)',
    'Mid-layer fleece',
    'Trekking trousers × 3',
    'Trekking shirts × 4',
    'Warm hat and sun hat',
    'Balaclava',
    'Liner gloves + insulated outer gloves',
    'Buff / neck gaiter',
    'Trekking socks × 5 pairs',
  ]),
  packingCategory('Footwear', [
    'Waterproof high-ankle trekking boots (fully broken in)',
    'Lightweight camp shoes or sandals',
    'Gaiters',
    'Trekking poles (pair)',
  ]),
  packingCategory('Gear & Equipment', [
    'Trekking backpack 50–60L',
    'Daypack 20–25L',
    'Sleeping bag (–15°C rated)',
    'Headlamp + spare batteries',
    'Sunglasses (UV400 / Category 4)',
    'Water bottles × 2 (1L each)',
    'Water purification tablets or Lifestraw bottle',
    'Dry bags or pack liner',
  ]),
  packingCategory('Health & Hygiene', [
    'Personal first-aid kit',
    'Diamox (acetazolamide) — consult your doctor before the trek',
    'Pulse oximeter',
    'Ibuprofen and paracetamol',
    'Blister kit (Compeed + athletic tape)',
    'Sunscreen SPF 50+',
    'Lip balm SPF 30',
    'Hand sanitiser × 2',
    'Quick-dry towel',
    'Anti-diarrheal and rehydration salts',
  ]),
  packingCategory('Documents & Money', [
    'Passport (valid 6+ months)',
    'Nepal visa (obtained on arrival)',
    'Travel insurance documents with emergency evacuation cover',
    'USD cash for personal expenses, hot water, WiFi, and tips',
    'Passport-size photos (for permits)',
  ]),
]

const ebcHeliPhysicalPrep = [
  physicalPhase(
    '16+ Weeks Out',
    'Aerobic Base',
    'Build cardiovascular foundation with 4–5 weekly sessions: 45-minute runs, cycling, or swimming. Goal: sustain Zone 2 effort (conversational pace) for 60 minutes without stopping. Consistency beats intensity at this stage.',
  ),
  physicalPhase(
    '12 Weeks Out',
    'Loaded Hiking',
    'Begin weekly long hikes with a 10 kg backpack. Start at 10 km, build to 25 km by week 8. Prioritise elevation gain over flat distance — Khumbu trails are relentlessly uphill. If hills aren\'t available, stair climbs with a weighted pack are an excellent substitute.',
  ),
  physicalPhase(
    '8 Weeks Out',
    'Leg Strength & Back-to-Back Days',
    'Introduce strength training: squats, lunges, step-ups, and single-leg deadlifts (3 sets × 12 reps, twice weekly). Add back-to-back hiking days (Sat + Sun) to simulate consecutive days on trail. This is the most important adaptation for avoiding fatigue on Days 9–10 (EBC and Kala Patthar).',
  ),
  physicalPhase(
    '4 Weeks Out',
    'Taper, Gear Test & Medical Check',
    'Reduce volume by 30% while maintaining intensity. Complete one full-day hike (6+ hours) wearing your exact trek boots. Test all gear including headlamp, poles, and sleeping bag. Visit your doctor for a pre-trek check and Diamox prescription if required.',
  ),
]

// ─────────────────────────────────────────────────────────────────────────────
// EBC VIA GOKYO LAKES  (Difficult · 18 Days · 5,500m)
// Khumbu kit with added crampons for Chola Pass (5,420m) crossing.
// Longest trek in the portfolio — sustained endurance is the key differentiator.
// ─────────────────────────────────────────────────────────────────────────────

const ebcGokyoPackingList = [
  packingCategory('Clothing', [
    'Down jacket (–10°C rated)',
    'Waterproof hardshell jacket',
    'Waterproof trousers',
    'Thermal base layers × 2 (top & bottom)',
    'Mid-layer fleece',
    'Trekking trousers × 3',
    'Trekking shirts × 5',
    'Warm hat and sun hat',
    'Balaclava',
    'Liner gloves + insulated outer gloves',
    'Buff / neck gaiter',
    'Trekking socks × 6 pairs',
  ]),
  packingCategory('Footwear', [
    'Waterproof high-ankle trekking boots (fully broken in)',
    'Lightweight camp shoes or sandals',
    'Gaiters (essential for Chola Pass)',
    'Microspikes or crampons (mandatory for Chola Pass glaciated descent)',
    'Trekking poles (pair)',
  ]),
  packingCategory('Gear & Equipment', [
    'Trekking backpack 50–60L',
    'Daypack 20–25L',
    'Sleeping bag (–15°C rated)',
    'Headlamp + spare batteries',
    'Sunglasses (UV400 / Category 4)',
    'Water bottles × 2 (1L each)',
    'Water purification tablets or Lifestraw bottle',
    'Dry bags or pack liner',
    'Lightweight stuff sack for summit days',
  ]),
  packingCategory('Health & Hygiene', [
    'Personal first-aid kit',
    'Diamox (acetazolamide) — consult your doctor before the trek',
    'Pulse oximeter',
    'Ibuprofen and paracetamol',
    'Blister kit (Compeed + athletic tape)',
    'Sunscreen SPF 50+',
    'Lip balm SPF 30',
    'Hand sanitiser × 2',
    'Quick-dry towel',
    'Anti-diarrheal and rehydration salts',
    'Personal prescription medications (18-day supply)',
  ]),
  packingCategory('Documents & Money', [
    'Passport (valid 6+ months)',
    'Nepal visa (obtained on arrival)',
    'Travel insurance with high-altitude trekking and emergency evacuation cover (up to 5,500m)',
    'USD cash for personal expenses, hot water, WiFi, and tips',
    'Passport-size photos (for permits)',
  ]),
]

const ebcGokyoPhysicalPrep = [
  physicalPhase(
    '16+ Weeks Out',
    'Aerobic Base Building',
    'Start with 4–5 cardio sessions per week: running, cycling, swimming, or hiking. The Gokyo trek is 18 days of consecutive effort — your aerobic engine is the most important variable. Build to 75 minutes of Zone 2 (conversational) effort without stopping. Do not skip this phase.',
  ),
  physicalPhase(
    '12 Weeks Out',
    'Loaded Hiking & Elevation',
    'Weekly long hikes with a 10–12 kg pack on hilly terrain. Start at 12 km and build to 28 km by week 8. The Gokyo valley involves continuous elevation gain across several days — prioritise uphill training. Aim for 1,000m+ of ascent per long hike.',
  ),
  physicalPhase(
    '8 Weeks Out',
    'Multi-Day Endurance & Leg Strength',
    'Add back-to-back long hikes (Day 1: 6 hours, Day 2: 5 hours) to train for consecutive high-effort days — the stretch from Gokyo Ri to Chola Pass to EBC is the most demanding in the portfolio. Strength: squats, lunges, step-ups, and single-leg deadlifts twice weekly. Practice early 4 am starts to simulate summit days.',
  ),
  physicalPhase(
    '4 Weeks Out',
    'Chola Pass Specific & Gear Test',
    'If possible, practise a steep descent on loose or icy terrain with crampons/microspikes — the Chola Pass glaciated descent is technical. Complete one full-day hike (7+ hours) in your exact trek boots. Reduce overall volume by 30%. Visit your doctor for a pre-trek medical check, Diamox prescription, and altitude medication plan.',
  ),
]

// ─────────────────────────────────────────────────────────────────────────────
// PATCH
// ─────────────────────────────────────────────────────────────────────────────

const patches = [
  {
    slug: 'everest-base-camp-11-days-helicopter-return',
    label: 'EBC – Heli Return',
    packingList: ebcHeliPackingList,
    physicalPrep: ebcHeliPhysicalPrep,
  },
  {
    slug: 'everest-base-camp-via-gokyo-lakes',
    label: 'EBC Via Gokyo Lakes',
    packingList: ebcGokyoPackingList,
    physicalPrep: ebcGokyoPhysicalPrep,
  },
]

async function main() {
  for (const p of patches) {
    console.log(`\n⏳  Looking up: ${p.label} (${p.slug})`)

    const id = await client.fetch(
      `*[_type == "trek" && slug.current == $slug][0]._id`,
      { slug: p.slug },
    )

    if (!id) {
      console.warn(`⚠️   Not found in Sanity — skipping: ${p.slug}`)
      continue
    }

    await client
      .patch(id)
      .set({ packingList: p.packingList, physicalPrep: p.physicalPrep })
      .commit()

    console.log(`✅  Patched: ${p.label} (_id: ${id})`)
  }

  console.log('\n🎉  All done.')
}

main().catch((err) => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})
