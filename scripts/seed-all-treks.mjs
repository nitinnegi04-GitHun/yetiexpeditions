/**
 * Seed script — All Treks (EBC + Annapurna Circuit + Markha Valley)
 * Pulled from: TrekIndex.tsx, TrekCalendar.tsx, trek/[slug]/page.tsx
 *
 * Usage: SANITY_TOKEN=<editor-token> node scripts/seed-all-treks.mjs
 * Token:  grep SANITY_WRITE_TOKEN .env.local
 *
 * Idempotent: patches existing docs, creates missing ones.
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// ─────────────────────────────────────────────────────────────────────────────
// 1. EVEREST BASE CAMP
// Source: trek/[slug]/page.tsx (hardcoded), TrekIndex, TrekCalendar
// ─────────────────────────────────────────────────────────────────────────────
const ebc = {
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
  investment: '$4,250',

  batches: [
    { _key: 'ebc-mar-2026-01', batchId: 'EBC-MAR-2026-01', startDate: '2026-03-15', endDate: '2026-03-28', price: 355000, totalSeats: 8, seatsBooked: 3, status: 'open', meetingPoint: 'Hotel Yak & Yeti, Kathmandu', notes: 'Spring window — rhododendrons in bloom.' },
    { _key: 'ebc-apr-2026-01', batchId: 'EBC-APR-2026-01', startDate: '2026-04-05', endDate: '2026-04-18', price: 355000, totalSeats: 8, seatsBooked: 6, status: 'open', meetingPoint: 'Hotel Yak & Yeti, Kathmandu', notes: 'Peak climbing season.' },
    { _key: 'ebc-may-2026-01', batchId: 'EBC-MAY-2026-01', startDate: '2026-05-12', endDate: '2026-05-25', price: 355000, totalSeats: 8, seatsBooked: 2, status: 'open', meetingPoint: 'Hotel Yak & Yeti, Kathmandu' },
    { _key: 'ebc-oct-2026-01', batchId: 'EBC-OCT-2026-01', startDate: '2026-10-02', endDate: '2026-10-15', price: 355000, totalSeats: 8, seatsBooked: 4, status: 'open', meetingPoint: 'Hotel Yak & Yeti, Kathmandu', notes: 'Autumn window — crystal-clear skies.' },
    { _key: 'ebc-nov-2026-01', batchId: 'EBC-NOV-2026-01', startDate: '2026-11-05', endDate: '2026-11-18', price: 355000, totalSeats: 8, seatsBooked: 7, status: 'open', meetingPoint: 'Hotel Yak & Yeti, Kathmandu' },
  ],

  itinerary: [
    { _key: 'day01', day: '01', title: 'Arrive Kathmandu (1,400m)', content: 'Land at Tribhuvan International Airport. Transfer to hotel in Thamel. Team briefing, gear check, and permit processing. Welcome dinner with your expedition crew.' },
    { _key: 'day02', day: '02', title: 'Fly Kathmandu → Lukla (2,860m) · Trek to Phakding (2,610m)', content: 'Early morning 35-minute mountain flight to Tenzing-Hillary Airport in Lukla. Begin trekking through rhododendron forests, descending along the Dudh Koshi river to Phakding.' },
    { _key: 'day03', day: '03', title: 'Phakding → Namche Bazaar (3,440m)', content: 'Cross suspension bridges over the Dudh Koshi gorge and enter Sagarmatha National Park. A long, steep climb through pine forest rewards you with your first views of Everest over the ridge.' },
    { _key: 'day04', day: '04', title: 'Namche Bazaar — Acclimatisation Day', content: 'Rest day in the Sherpa capital. Optional hike to Everest View Hotel (3,880m) for panoramic views of Everest, Lhotse, and Ama Dablam. Explore the weekend market and Sherpa Culture Museum.' },
    { _key: 'day05', day: '05', title: 'Namche → Tengboche (3,867m)', content: 'The trail rises and falls dramatically, offering constant views of the Everest massif. Visit Tengboche Monastery — the largest Gompa in the Khumbu. Evening prayer ceremony.' },
    { _key: 'day06', day: '06', title: 'Tengboche → Dingboche (4,360m)', content: 'Descend through birch and juniper forest before crossing the Imja Khola river. The valley widens as vegetation thins and the high-altitude landscape takes over.' },
    { _key: 'day07', day: '07', title: 'Dingboche — Acclimatisation Day', content: 'Hike to Nangkartshang Peak (5,090m) for a critical altitude push. Twice-daily oximetry checks by WFR-certified guide. Rest and rehydrate.' },
    { _key: 'day08', day: '08', title: 'Dingboche → Lobuche (4,940m)', content: 'Pass through Dugla, where memorial chortens honour climbers lost on Everest. The trail climbs onto the Khumbu glacier moraine before levelling into Lobuche.' },
    { _key: 'day09', day: '09', title: 'Lobuche → Gorak Shep (5,170m) → Everest Base Camp (5,364m)', content: 'Trek across rocky glacier to Gorak Shep, drop your bags, and push on to Everest Base Camp. Stand beside the Khumbu Icefall. Return to Gorak Shep for the night.' },
    { _key: 'day10', day: '10', title: 'Gorak Shep → Kala Patthar (5,545m) → Pheriche (4,280m)', content: 'Pre-dawn start for Kala Patthar — the ultimate Everest viewpoint. Watch the sunrise paint the summit gold. Descend all the way to Pheriche, losing 1,265m of altitude.' },
    { _key: 'day11', day: '11', title: 'Pheriche → Namche Bazaar (3,440m)', content: 'A long descent back through alpine meadows and rhododendron forests to Namche. Legs may ache but morale is high.' },
    { _key: 'day12', day: '12', title: 'Namche → Lukla (2,860m)', content: 'Final day on the trail. Retrace the classic Khumbu path through Phakding and back up to Lukla. Evening farewell dinner with your Sherpa crew.' },
    { _key: 'day13', day: '13', title: 'Fly Lukla → Kathmandu', content: 'Weather-dependent morning flight back to Kathmandu. Free afternoon to explore Thamel or visit Boudhanath Stupa. Farewell dinner at a rooftop restaurant.' },
    { _key: 'day14', day: '14', title: 'Depart Kathmandu', content: 'Transfer to Tribhuvan International Airport for your onward journey. Expedition complete.' },
  ],

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

  included: [
    'Kathmandu–Lukla–Kathmandu flights (both legs)',
    'All accommodation: 3-star hotel in Kathmandu (2 nights), teahouses on trail (10 nights)',
    'All meals on trek: breakfast, lunch, and dinner',
    'WFR-certified lead guide (1:4 guide-to-trekker ratio)',
    'Experienced Sherpa support team',
    'Licensed porter (1 per 2 trekkers, max 10kg per porter)',
    'Sagarmatha National Park entry permit',
    'TIMS card',
    'Pulse oximeter monitoring: twice daily',
    'Group first-aid kit and emergency oxygen cylinder',
    'Airport transfers in Kathmandu',
    'Farewell dinner in Kathmandu',
  ],

  excluded: [
    'International flights to/from Kathmandu',
    'Nepal visa fees (~$50 USD on arrival)',
    'Travel insurance with high-altitude and heli-evac coverage (mandatory)',
    'Personal trekking gear and clothing',
    'Hot showers, phone charging, and WiFi on trail (pay per use)',
    'Alcoholic and bottled beverages',
    'Tips for guides, Sherpas, and porters (~$150–200 total)',
    'Personal medication and altitude sickness drugs (Diamox)',
  ],

  packingList: [
    { _key: 'pl-clothing', category: 'Clothing', items: ['Down jacket (–10°C rated)', 'Waterproof hardshell jacket', 'Waterproof trousers', 'Thermal base layers × 2', 'Mid-layer fleece', 'Trekking trousers × 2', 'Trekking shirts × 3', 'Warm hat and sun hat', 'Balaclava', 'Trekking socks × 5 pairs'] },
    { _key: 'pl-footwear', category: 'Footwear', items: ['Waterproof trekking boots (broken in)', 'Lightweight camp shoes', 'Gaiters', 'Trekking poles (pair)'] },
    { _key: 'pl-gear', category: 'Technical Gear', items: ['Trekking backpack 50–60L', 'Daypack 20–25L', 'Sleeping bag (–15°C rated)', 'Headlamp + spare batteries', 'Sunglasses (UV400 / Category 4)', 'Water bottles × 2 (1L each)', 'Water purification tablets'] },
    { _key: 'pl-health', category: 'Health & Hygiene', items: ['Personal first-aid kit', 'Diamox (acetazolamide) — consult your doctor', 'Ibuprofen and paracetamol', 'Blister kit', 'Sunscreen SPF 50+', 'Lip balm SPF 30', 'Hand sanitiser × 2', 'Quick-dry towel'] },
  ],

  physicalPrep: [
    { _key: 'pp01', weeks: '16+ Weeks Out', focus: 'Aerobic Base', description: 'Build cardiovascular foundation with 4–5 weekly sessions: 45-minute runs, cycling, or swimming. Goal: sustain Zone 2 effort for 60 minutes without stopping.' },
    { _key: 'pp02', weeks: '12 Weeks Out', focus: 'Loaded Hiking', description: 'Begin weekly long hikes with a 10kg backpack. Start at 10km, build to 25km by week 8. Elevation gain is more important than distance.' },
    { _key: 'pp03', weeks: '8 Weeks Out', focus: 'Leg Strength & Endurance', description: 'Introduce strength training: squats, lunges, step-ups, and single-leg deadlifts. Add back-to-back hiking days to simulate consecutive days on trail.' },
    { _key: 'pp04', weeks: '4 Weeks Out', focus: 'Taper & Gear Test', description: 'Reduce volume by 30%, maintain intensity. Complete one full-day hike in your trek boots. Test all gear. Visit your doctor for a pre-trek medical check and Diamox prescription.' },
  ],

  testimonials: [
    { _key: 'test01', name: 'James Whitfield', location: 'London, UK', rating: 5, text: 'Standing at EBC was the pinnacle of my trekking life. The safety protocols are genuinely reassuring — twice-daily oximetry checks and a guide who clearly knows every rescue scenario.', batch: 'EBC — October 2025' },
    { _key: 'test02', name: 'Priya Nair', location: 'Bangalore, India', rating: 5, text: 'The max-8 group policy meant we were an actual team by day 3. Our guide Dawa is a legend. Every logistical detail was handled before I even thought to ask.', batch: 'EBC — April 2025' },
    { _key: 'test03', name: 'Lars Eriksson', location: 'Stockholm, Sweden', rating: 5, text: 'The altitude profile planning was meticulous. We acclimatised properly, nobody had to turn back. Kala Patthar at sunrise with Everest glowing — no photograph captures it.', batch: 'EBC — March 2025' },
  ],

  gettingThere: {
    arrival: 'Fly into Tribhuvan International Airport (KTM), Kathmandu. Yeti Expeditions provides a complimentary airport pickup on Day 1. Recommend arriving a day early if your flight involves a connection.',
    visa: 'Nepal visa on arrival at KTM airport: $30 USD (15 days), $50 USD (30 days). Bring 1 passport photo and exact USD cash. E-Visa available at nepal.gov.np.',
    domesticFlight: 'Kathmandu → Lukla flight (approx. 35 min) departs Tribhuvan domestic terminal at ~06:30. Flight is weather-dependent. We handle all bookings.',
  },

  accommodationDetails: [
    { _key: 'acc01', location: 'Kathmandu', type: '3-Star Hotel', nights: 2, notes: 'Hotel Yak & Yeti or equivalent. En-suite, hot water, WiFi.' },
    { _key: 'acc02', location: 'Phakding', type: 'Teahouse', nights: 1, notes: 'Twin-share rooms. Shared bathrooms. Charging available.' },
    { _key: 'acc03', location: 'Namche Bazaar', type: 'Teahouse', nights: 2, notes: 'Best teahouses in the Khumbu. Hot showers available.' },
    { _key: 'acc04', location: 'Tengboche', type: 'Teahouse', nights: 1, notes: 'Basic facilities. Stunning monastery views.' },
    { _key: 'acc05', location: 'Dingboche', type: 'Teahouse', nights: 2, notes: 'Yak dung stoves in common room. No hot showers above here.' },
    { _key: 'acc06', location: 'Lobuche', type: 'Teahouse', nights: 1, notes: 'Very basic. Cold conditions — sleeping bag mandatory.' },
    { _key: 'acc07', location: 'Gorak Shep', type: 'Teahouse', nights: 1, notes: 'Highest accommodation on the route.' },
    { _key: 'acc08', location: 'Pheriche', type: 'Teahouse', nights: 1, notes: 'Home of the Himalayan Rescue Association clinic.' },
    { _key: 'acc09', location: 'Namche Bazaar', type: 'Teahouse', nights: 1, notes: 'Descent stop — same lodge as ascent.' },
    { _key: 'acc10', location: 'Lukla', type: 'Teahouse', nights: 1, notes: 'Final night on trail. Farewell dinner with Sherpa crew.' },
  ],

  permits: [
    { _key: 'perm01', name: 'Sagarmatha National Park Entry Permit', cost: '$30 USD', handledBy: 'Yeti Expeditions', notes: 'Required for all trekkers entering the Khumbu/Everest region.' },
    { _key: 'perm02', name: 'TIMS Card', cost: '$20 USD', handledBy: 'Yeti Expeditions', notes: 'Mandatory trekker registration card. Processed in Kathmandu on Day 1.' },
    { _key: 'perm03', name: 'Khumbu Pasang Lhamu Rural Municipality Fee', cost: '$7 USD', handledBy: 'Yeti Expeditions', notes: 'Local conservation fee collected at the Lukla entry point.' },
  ],

  faqs: [
    { _key: 'faq01', question: 'Do I need prior trekking experience for EBC?', answer: 'You don\'t need technical mountaineering skills, but you should be comfortable with 5–8 hours of walking per day. We recommend completing at least two full-day hikes of 20km+ before departure.' },
    { _key: 'faq02', question: 'What happens if I get altitude sickness?', answer: 'Your safety is non-negotiable. Our WFR-certified guide monitors blood oxygen levels twice daily. At any sign of serious AMS, the protocol is immediate descent. Emergency helicopter evacuation can be arranged within hours.' },
    { _key: 'faq03', question: 'What is the best time of year to do EBC?', answer: 'We run EBC in two windows: Spring (March–May) and Autumn (September–November). Spring offers rhododendrons in bloom. Autumn brings crystal-clear post-monsoon skies.' },
    { _key: 'faq04', question: 'Is WiFi available on the trail?', answer: 'Most teahouses offer WiFi for a fee ($2–5 USD per day) up to Namche Bazaar. Signal degrades at higher altitudes. We recommend a Ncell SIM card for 3G coverage up to approximately Dingboche.' },
    { _key: 'faq05', question: 'Can I do EBC if I\'m vegetarian?', answer: 'Absolutely. Teahouse menus feature excellent vegetarian options — dal bhat, vegetable curry, pasta, soups, and porridge. Please notify us of any dietary requirements during booking.' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ANNAPURNA CIRCUIT
// Source: TrekIndex.tsx, TrekCalendar.tsx
// ─────────────────────────────────────────────────────────────────────────────
const annapurna = {
  _type: 'trek',
  name: 'Annapurna Circuit',
  slug: { _type: 'slug', current: 'annapurna-circuit' },
  region: 'Gandaki Province, Nepal',
  country: 'Nepal',
  difficulty: 'Moderate',
  duration: '18 Days',
  altitude: '5,416m',
  season: 'MAR-MAY · OCT-DEC',
  accommodation: 'TEAHOUSE',
  groupSize: 'MAX 08',
  investment: '$3,100',

  batches: [
    { _key: 'ac-mar-2026-01', batchId: 'AC-MAR-2026-01', startDate: '2026-03-10', endDate: '2026-03-28', price: 260000, totalSeats: 8, seatsBooked: 2, status: 'open', meetingPoint: 'Hotel Pokhara Grande, Pokhara', notes: 'Spring window — rhododendron forests in full bloom.' },
    { _key: 'ac-apr-2026-01', batchId: 'AC-APR-2026-01', startDate: '2026-04-12', endDate: '2026-04-30', price: 260000, totalSeats: 8, seatsBooked: 3, status: 'open', meetingPoint: 'Hotel Pokhara Grande, Pokhara' },
    { _key: 'ac-oct-2026-01', batchId: 'AC-OCT-2026-01', startDate: '2026-10-10', endDate: '2026-10-28', price: 260000, totalSeats: 8, seatsBooked: 1, status: 'open', meetingPoint: 'Hotel Pokhara Grande, Pokhara', notes: 'Autumn — best visibility for Thorong La.' },
    { _key: 'ac-nov-2026-01', batchId: 'AC-NOV-2026-01', startDate: '2026-11-03', endDate: '2026-11-21', price: 260000, totalSeats: 8, seatsBooked: 7, status: 'open', meetingPoint: 'Hotel Pokhara Grande, Pokhara' },
    { _key: 'ac-dec-2026-01', batchId: 'AC-DEC-2026-01', startDate: '2026-12-01', endDate: '2026-12-19', price: 260000, totalSeats: 8, seatsBooked: 4, status: 'open', meetingPoint: 'Hotel Pokhara Grande, Pokhara', notes: 'Cold but uncrowded. Thorong La may have snow.' },
  ],

  itinerary: [
    { _key: 'day01', day: '01', title: 'Arrive Kathmandu (1,400m)', content: 'Arrive at Tribhuvan International Airport. Transfer to hotel. Permit processing, team briefing, and gear check. Welcome dinner.' },
    { _key: 'day02', day: '02', title: 'Drive Kathmandu → Besisahar (760m)', content: 'Scenic 6–7 hour drive through the Trisuli River valley to Besisahar, the starting point of the Annapurna Circuit. Overnight in guesthouse.' },
    { _key: 'day03', day: '03', title: 'Besisahar → Bahundanda (1,310m)', content: 'Trek through terraced farmland and riverside trails. Cross suspension bridges over the Marsyangdi River. The landscape transitions from subtropical to temperate.' },
    { _key: 'day04', day: '04', title: 'Bahundanda → Chamje (1,430m)', content: 'Descend steeply then climb through dense forest. Enter the narrow Marsyangdi gorge. Pass through traditional Gurung villages with views of waterfalls cascading from above.' },
    { _key: 'day05', day: '05', title: 'Chamje → Dharapani (1,860m)', content: 'Cross the Marsyangdi multiple times on suspension bridges. Enter the Manang District. Stunning views of Lamjung Himal and Manaslu. First views of the Annapurna peaks.' },
    { _key: 'day06', day: '06', title: 'Dharapani → Chame (2,710m)', content: 'Trek through apple orchards and pine forests. Pass through the villages of Bagarchap and Danaque. Excellent views of Lamjung Himal. Soak in natural hot springs near Chame.' },
    { _key: 'day07', day: '07', title: 'Chame → Pisang (3,300m)', content: 'Pass through a steep-sided gorge with towering rock faces. The iconic curved forest wall of Paungda Danda appears. First dramatic views of Annapurna II (7,937m).' },
    { _key: 'day08', day: '08', title: 'Pisang → Manang (3,519m)', content: 'Choice of upper or lower route. Upper route via Ghyaru and Ngawal offers spectacular views of the Annapurna Range, Gangapurna, and Tilicho Peak. Manang is a major acclimatisation stop.' },
    { _key: 'day09', day: '09', title: 'Manang — Acclimatisation Day', content: 'Rest day at 3,519m. Hike to Ice Lake (4,600m) for views of Annapurna III and Gangapurna. Visit Gangapurna Lake. Altitude medicine lecture by HRA doctor in the evening.' },
    { _key: 'day10', day: '10', title: 'Manang → Yak Kharka (4,018m)', content: 'Gradual ascent through open yak pastures. Views improve dramatically. Sparse vegetation as you enter the high-altitude zone. Thorong La is now clearly visible ahead.' },
    { _key: 'day11', day: '11', title: 'Yak Kharka → Thorong Phedi (4,450m)', content: 'Short but important stage — arriving early to rest before the big day. Thorong Phedi sits at the base of the famous Thorong La pass. Early dinner and 3am wake-up call.' },
    { _key: 'day12', day: '12', title: 'Thorong La Pass (5,416m) → Muktinath (3,800m)', content: 'The highlight of the circuit. Depart at 4am to cross Thorong La, the highest point of the trek at 5,416m. Rewarded with unparalleled views. Descend 1,600m to the sacred temple town of Muktinath.' },
    { _key: 'day13', day: '13', title: 'Muktinath → Marpha (2,670m)', content: 'Trek through the dramatic Kali Gandaki gorge — the world\'s deepest valley. Pass through Kagbeni and Jomsom. The landscape transforms to a near-desert plateau with dramatic canyon walls. Marpha is famous for its apple brandy.' },
    { _key: 'day14', day: '14', title: 'Marpha → Kalopani (2,530m)', content: 'Continue south through the Kali Gandaki valley. Views of Dhaulagiri (8,167m) and Nilgiri (7,061m) dominate. Pass through Tukuche and Larjung. Overnight in the scenic village of Kalopani.' },
    { _key: 'day15', day: '15', title: 'Kalopani → Tatopani (1,190m)', content: 'Long descent through subtropical vegetation. Views of Annapurna South and Hiunchuli. Arrive at Tatopani, famous for its natural hot spring baths — a well-earned reward after 14 days of trekking.' },
    { _key: 'day16', day: '16', title: 'Tatopani → Ghorepani (2,860m)', content: 'Challenging climb through rhododendron forests. The forest canopy closes overhead. Arrive in Ghorepani, perfectly positioned for the iconic Poon Hill sunrise.' },
    { _key: 'day17', day: '17', title: 'Poon Hill (3,210m) Sunrise → Drive to Pokhara', content: 'Pre-dawn hike to Poon Hill for one of Nepal\'s most celebrated views — the full Annapurna and Dhaulagiri ranges at sunrise. Descend to Nayapul and drive to Pokhara (2 hrs). Farewell dinner lakeside.' },
    { _key: 'day18', day: '18', title: 'Fly/Drive Pokhara → Kathmandu · Depart', content: 'Morning flight or drive back to Kathmandu. Transfer to Tribhuvan International Airport for departure. Expedition complete.' },
  ],

  altitudeProfile: [
    { _key: 'ap01', day: 1, label: 'Kathmandu', altitude: 1400 },
    { _key: 'ap02', day: 2, label: 'Besisahar', altitude: 760 },
    { _key: 'ap03', day: 3, label: 'Bahundanda', altitude: 1310 },
    { _key: 'ap04', day: 4, label: 'Chamje', altitude: 1430 },
    { _key: 'ap05', day: 5, label: 'Dharapani', altitude: 1860 },
    { _key: 'ap06', day: 6, label: 'Chame', altitude: 2710 },
    { _key: 'ap07', day: 7, label: 'Pisang', altitude: 3300 },
    { _key: 'ap08', day: 8, label: 'Manang', altitude: 3519 },
    { _key: 'ap09', day: 9, label: 'Ice Lake (Acc.)', altitude: 4600 },
    { _key: 'ap10', day: 10, label: 'Yak Kharka', altitude: 4018 },
    { _key: 'ap11', day: 11, label: 'Thorong Phedi', altitude: 4450 },
    { _key: 'ap12', day: 12, label: 'Thorong La', altitude: 5416 },
    { _key: 'ap13', day: 13, label: 'Marpha', altitude: 2670 },
    { _key: 'ap14', day: 14, label: 'Kalopani', altitude: 2530 },
    { _key: 'ap15', day: 15, label: 'Tatopani', altitude: 1190 },
    { _key: 'ap16', day: 16, label: 'Ghorepani', altitude: 2860 },
    { _key: 'ap17', day: 17, label: 'Pokhara', altitude: 800 },
    { _key: 'ap18', day: 18, label: 'Kathmandu', altitude: 1400 },
  ],

  included: [
    'All accommodation: hotel in Kathmandu (1 night), guesthouses/teahouses on trek (16 nights), hotel in Pokhara (1 night)',
    'All meals on trek: breakfast, lunch, and dinner',
    'WFR-certified lead guide (1:4 guide-to-trekker ratio)',
    'Experienced support team',
    'Licensed porter (1 per 2 trekkers, max 10kg per porter)',
    'Annapurna Conservation Area Permit (ACAP)',
    'TIMS card',
    'Pulse oximeter monitoring: twice daily above 3,000m',
    'Group first-aid kit',
    'Pokhara–Kathmandu flight or bus on final day',
    'All ground transportation (Kathmandu–Besisahar)',
    'Farewell dinner in Pokhara',
  ],

  excluded: [
    'International flights to/from Kathmandu',
    'Nepal visa fees (~$50 USD on arrival)',
    'Travel insurance (mandatory)',
    'Personal trekking gear and clothing',
    'Hot showers, phone charging, and WiFi on trail (pay per use)',
    'Alcoholic and bottled beverages',
    'Tips for guides and porters (~$120–180 total)',
    'Personal medication',
  ],

  packingList: [
    { _key: 'pl-clothing', category: 'Clothing', items: ['Down jacket (–10°C rated)', 'Waterproof hardshell jacket', 'Thermal base layers × 2', 'Fleece mid-layer', 'Trekking trousers × 2', 'Trekking shirts × 3', 'Warm hat and sun hat', 'Light gloves and heavy gloves', 'Trekking socks × 5 pairs'] },
    { _key: 'pl-footwear', category: 'Footwear', items: ['Waterproof trekking boots (broken in)', 'Lightweight sandals for evenings', 'Gaiters (for Thorong La snow)', 'Trekking poles'] },
    { _key: 'pl-gear', category: 'Technical Gear', items: ['Trekking backpack 50–60L', 'Daypack 20–25L', 'Sleeping bag (–10°C rated)', 'Headlamp + spare batteries', 'Sunglasses (UV400)', 'Water bottles × 2 (1L each)', 'Water purification tablets'] },
    { _key: 'pl-health', category: 'Health & Hygiene', items: ['Personal first-aid kit', 'Diamox (consult doctor)', 'Ibuprofen and paracetamol', 'Blister kit', 'Sunscreen SPF 50+', 'Hand sanitiser', 'Quick-dry towel'] },
  ],

  physicalPrep: [
    { _key: 'pp01', weeks: '16+ Weeks Out', focus: 'Aerobic Base', description: 'Build cardiovascular foundation with 4–5 weekly sessions. The Annapurna Circuit is long — daily mileage matters as much as altitude.' },
    { _key: 'pp02', weeks: '12 Weeks Out', focus: 'Loaded Hiking', description: 'Begin weekly long hikes with 8–10kg pack. Build to 25km per day. Focus on descents — the 1,600m drop from Thorong La to Muktinath is knee-intensive.' },
    { _key: 'pp03', weeks: '8 Weeks Out', focus: 'Endurance & Back-to-Back Days', description: 'Add consecutive hiking days (Sat + Sun) to simulate multi-day trekking. Introduce lunges, step-ups, and core work.' },
    { _key: 'pp04', weeks: '4 Weeks Out', focus: 'Taper & Gear Test', description: 'Reduce volume by 30%. Test all gear on a full-day hike. Medical check and Diamox prescription from your doctor.' },
  ],

  testimonials: [
    { _key: 'test01', name: 'Sophie Laurent', location: 'Lyon, France', rating: 5, text: 'Crossing Thorong La at dawn with the whole Himalayas spread out below us — I still get emotional thinking about it. Yeti\'s preparation and acclimatisation schedule meant everyone in our group made it over.', batch: 'Annapurna Circuit — November 2025' },
    { _key: 'test02', name: 'Rohan Mehta', location: 'Mumbai, India', rating: 5, text: 'The variety of landscapes in 18 days is staggering — subtropical gorges to high desert plateau to rhododendron forest. Our guide\'s knowledge of local culture and history added so much depth.', batch: 'Annapurna Circuit — October 2025' },
    { _key: 'test03', name: 'Emma Thornton', location: 'Auckland, NZ', rating: 5, text: 'I was nervous about the altitude but the twice-daily oximetry checks and steady acclimatisation schedule gave me confidence. The Poon Hill sunrise on the last morning was the perfect ending.', batch: 'Annapurna Circuit — April 2025' },
  ],

  gettingThere: {
    arrival: 'Fly into Tribhuvan International Airport (KTM), Kathmandu. Yeti Expeditions provides airport pickup on Day 1. The trek begins with a drive to Besisahar — no domestic flight required.',
    visa: 'Nepal visa on arrival at KTM airport: $30 USD (15 days), $50 USD (30 days). Bring 1 passport photo and exact USD cash.',
    domesticFlight: 'No domestic flight required at the start. On the final day, we fly or drive from Pokhara to Kathmandu (45-min flight or 6-hr drive). We handle all bookings.',
  },

  accommodationDetails: [
    { _key: 'acc01', location: 'Kathmandu', type: '3-Star Hotel', nights: 1, notes: 'En-suite, hot water, WiFi.' },
    { _key: 'acc02', location: 'Besisahar to Chame', type: 'Teahouse', nights: 4, notes: 'Basic but comfortable guesthouses. Shared bathrooms.' },
    { _key: 'acc03', location: 'Pisang to Manang', type: 'Teahouse', nights: 3, notes: 'Manang has the best teahouses. Common room with wood stove.' },
    { _key: 'acc04', location: 'Yak Kharka to Muktinath', type: 'Teahouse', nights: 3, notes: 'Very basic above 4,000m. Sleeping bag mandatory.' },
    { _key: 'acc05', location: 'Marpha to Tatopani', type: 'Teahouse', nights: 3, notes: 'Improving standards as you descend. Natural hot springs at Tatopani.' },
    { _key: 'acc06', location: 'Ghorepani', type: 'Teahouse', nights: 1, notes: 'Well-developed village with good lodges.' },
    { _key: 'acc07', location: 'Pokhara', type: '3-Star Hotel', nights: 1, notes: 'Lakeside hotel with mountain views. Hot shower, WiFi.' },
  ],

  permits: [
    { _key: 'perm01', name: 'Annapurna Conservation Area Permit (ACAP)', cost: '$30 USD', handledBy: 'Yeti Expeditions', notes: 'Required for entry into the Annapurna Conservation Area.' },
    { _key: 'perm02', name: 'TIMS Card', cost: '$20 USD', handledBy: 'Yeti Expeditions', notes: 'Trekkers\' Information Management System card. Processed in Kathmandu.' },
  ],

  faqs: [
    { _key: 'faq01', question: 'Is the Annapurna Circuit harder than EBC?', answer: 'The Annapurna Circuit is longer (18 days vs 14) but the maximum altitude is similar (5,416m vs 5,364m). The Circuit is rated Moderate because the acclimatisation profile is more gradual and the daily distances are generally shorter.' },
    { _key: 'faq02', question: 'What is Thorong La like?', answer: 'Thorong La (5,416m) is a high mountain pass — the dramatic centrepiece of the circuit. You start at 4am and climb for 4–5 hours before a long descent to Muktinath. It is physically demanding but not technically difficult. With good acclimatisation, most trekkers complete it without issue.' },
    { _key: 'faq03', question: 'Is the circuit affected by roads now?', answer: 'Roads have been built on parts of the lower circuit, which is why our itinerary starts from Besisahar via jeep. The upper circuit from Chame onwards remains a true trekking trail with zero vehicle traffic — this is where the magic is.' },
    { _key: 'faq04', question: 'What is the best time to do the Circuit?', answer: 'Spring (March–May) and Autumn (October–December). Spring has flowers and lush trails. Autumn has the clearest skies. December is cold but beautiful and very uncrowded. We avoid the June–September monsoon.' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. MARKHA VALLEY
// Source: TrekIndex.tsx, TrekCalendar.tsx
// ─────────────────────────────────────────────────────────────────────────────
const markha = {
  _type: 'trek',
  name: 'Markha Valley',
  slug: { _type: 'slug', current: 'markha-valley' },
  region: 'Ladakh, India',
  country: 'India',
  difficulty: 'Moderate',
  duration: '12 Days',
  altitude: '5,100m',
  season: 'JUN-SEP',
  accommodation: 'HOMESTAY',
  groupSize: 'MAX 08',
  investment: '$2,850',

  batches: [
    { _key: 'mv-jun-2026-01', batchId: 'MV-JUN-2026-01', startDate: '2026-06-10', endDate: '2026-06-22', price: 238000, totalSeats: 8, seatsBooked: 3, status: 'open', meetingPoint: 'Hotel Ladakh Palace, Leh', notes: 'Early summer — wildflowers blooming, fewer trekkers.' },
    { _key: 'mv-jul-2026-01', batchId: 'MV-JUL-2026-01', startDate: '2026-07-05', endDate: '2026-07-17', price: 238000, totalSeats: 8, seatsBooked: 5, status: 'open', meetingPoint: 'Hotel Ladakh Palace, Leh' },
    { _key: 'mv-aug-2026-01', batchId: 'MV-AUG-2026-01', startDate: '2026-08-02', endDate: '2026-08-14', price: 238000, totalSeats: 8, seatsBooked: 7, status: 'open', meetingPoint: 'Hotel Ladakh Palace, Leh', notes: 'Peak season. Book well in advance.' },
    { _key: 'mv-sep-2026-01', batchId: 'MV-SEP-2026-01', startDate: '2026-09-06', endDate: '2026-09-18', price: 238000, totalSeats: 8, seatsBooked: 4, status: 'open', meetingPoint: 'Hotel Ladakh Palace, Leh', notes: 'Late season — clear skies, golden light, fewer crowds.' },
  ],

  itinerary: [
    { _key: 'day01', day: '01', title: 'Arrive Leh (3,524m) — Rest Day', content: 'Fly into Kushok Bakula Rimpochhe Airport (LEH). Mandatory rest day for acclimatisation at 3,524m. Hotel transfer, welcome briefing, and a gentle evening stroll through Leh Market. No exertion.' },
    { _key: 'day02', day: '02', title: 'Leh — Acclimatisation Day', content: 'Second acclimatisation day. Visit Leh Palace, Shanti Stupa, and Namgyal Tsemo Monastery — all gentle walks at existing altitude. Gear check and final permit processing. Twice-daily oximetry checks begin.' },
    { _key: 'day03', day: '03', title: 'Drive Leh → Chilling (3,000m) · Trek to Skiu (3,380m)', content: 'Drive down the Zanskar river valley to Chilling (1.5 hrs). Cross the Zanskar River on a traditional bridge and enter the Markha Valley. Trek along the river through dramatic canyon walls to Skiu. First homestay night.' },
    { _key: 'day04', day: '04', title: 'Skiu → Markha Village (3,700m)', content: 'Trek up the valley, crossing the Markha River multiple times — river crossings are part of the adventure. Pass ancient ruins, mani walls, and isolated farmsteads. Views of Kang Yatze (6,400m) ahead.' },
    { _key: 'day05', day: '05', title: 'Markha → Hankar (4,060m)', content: 'The valley narrows. Dramatic cliff-face ruins of a dzong (fortress) overlook the trail. Open landscapes of the upper valley begin. Views of the Kang Yatze massif become increasingly dramatic. Overnight in Hankar homestay.' },
    { _key: 'day06', day: '06', title: 'Hankar — Acclimatisation Day + Kang Yatze Base Camp Hike', content: 'Acclimatisation day at 4,060m. Optional hike toward Kang Yatze I Base Camp (4,900m) for an altitude push and stunning views. Twice-daily oximetry. Rest in preparation for Kongmaru La.' },
    { _key: 'day07', day: '07', title: 'Hankar → Nimaling (4,700m)', content: 'Trek across open high-altitude meadows to Nimaling, the summer grazing ground of Markha Valley herders. Vast plateau at 4,700m ringed by 6,000m+ peaks. Kang Yatze dominates the skyline. Camping or basic tented accommodation.' },
    { _key: 'day08', day: '08', title: 'Nimaling → Kongmaru La (5,100m) → Chokstet (3,650m)', content: 'The high point of the trek. Ascend to Kongmaru La (5,100m) in the morning light for 360-degree views including Karakoram ranges on clear days. Long descent through dramatic ridgeline to Chokstet village.' },
    { _key: 'day09', day: '09', title: 'Chokstet → Shang Sumdo (3,800m)', content: 'Trek through the Indus valley landscape. Stark and beautiful high desert terrain. Marmots, eagles, and the occasional snow leopard track. Arrive at Shang Sumdo — the end of the valley.' },
    { _key: 'day10', day: '10', title: 'Drive Shang Sumdo → Leh', content: 'Drive back to Leh via Hemis Monastery — the largest and most colourful monastery in Ladakh. Arrive mid-afternoon. Hot shower, rest, and optional celebration dinner in Leh.' },
    { _key: 'day11', day: '11', title: 'Leh — Rest & Explore', content: 'Free day in Leh. Visit Hemis National Park (snow leopard territory), Stok Palace Museum, or the weekly Friday market. Last chance for Ladakhi handicraft shopping. Farewell dinner.' },
    { _key: 'day12', day: '12', title: 'Depart Leh', content: 'Transfer to Kushok Bakula Rimpochhe Airport for your onward journey. Expedition complete.' },
  ],

  altitudeProfile: [
    { _key: 'ap01', day: 1, label: 'Leh', altitude: 3524 },
    { _key: 'ap02', day: 2, label: 'Leh (Acc.)', altitude: 3524 },
    { _key: 'ap03', day: 3, label: 'Skiu', altitude: 3380 },
    { _key: 'ap04', day: 4, label: 'Markha', altitude: 3700 },
    { _key: 'ap05', day: 5, label: 'Hankar', altitude: 4060 },
    { _key: 'ap06', day: 6, label: 'Kang Yatze BC', altitude: 4900 },
    { _key: 'ap07', day: 7, label: 'Nimaling', altitude: 4700 },
    { _key: 'ap08', day: 8, label: 'Kongmaru La', altitude: 5100 },
    { _key: 'ap09', day: 9, label: 'Shang Sumdo', altitude: 3800 },
    { _key: 'ap10', day: 10, label: 'Leh', altitude: 3524 },
    { _key: 'ap11', day: 11, label: 'Leh', altitude: 3524 },
    { _key: 'ap12', day: 12, label: 'Departure', altitude: 3524 },
  ],

  included: [
    'All accommodation: hotel in Leh (3 nights), village homestays on trek (6 nights), camp at Nimaling (1 night)',
    'All meals on trek: breakfast, lunch, and dinner',
    'WFR-certified lead guide',
    'Local Ladakhi support guide',
    'Licensed horse handler and horses for luggage',
    'Inner Line Permit for Markha Valley',
    'Hemis National Park entry fee',
    'Pulse oximeter monitoring: twice daily from Day 1',
    'Group first-aid kit',
    'All ground transportation in Ladakh',
    'Farewell dinner in Leh',
  ],

  excluded: [
    'Flights to/from Leh (book early — Leh flights are limited and expensive)',
    'Travel insurance with high-altitude coverage (mandatory)',
    'Personal trekking gear and clothing',
    'Alcoholic and bottled beverages',
    'Tips for guides and horse handlers (~$100–150 total)',
    'Personal medication',
    'Anything not listed under Included',
  ],

  packingList: [
    { _key: 'pl-clothing', category: 'Clothing', items: ['Down jacket (–5°C rated)', 'Waterproof hardshell jacket', 'Thermal base layers × 2', 'Fleece mid-layer', 'Trekking trousers × 2', 'Sun shirt × 2 (UPF 50+)', 'Warm hat and wide-brim sun hat', 'Light gloves', 'Trekking socks × 5 pairs'] },
    { _key: 'pl-footwear', category: 'Footwear', items: ['Waterproof trekking boots (broken in)', 'Lightweight sandals for homestay evenings', 'Gaiters (for Kongmaru La)', 'Trekking poles'] },
    { _key: 'pl-gear', category: 'Technical Gear', items: ['Trekking backpack 50–60L', 'Daypack 20–25L', 'Sleeping bag (–10°C rated)', 'Sleeping bag liner', 'Headlamp + spare batteries', 'Sunglasses (high UV protection)', 'Water bottles × 2 (1L each)', 'Water purification tablets'] },
    { _key: 'pl-health', category: 'Health & Hygiene', items: ['Personal first-aid kit', 'Diamox (consult doctor — important given Leh\'s starting altitude)', 'Ibuprofen and paracetamol', 'Blister kit', 'Sunscreen SPF 50+ (Ladakh UV is intense)', 'Lip balm SPF 30', 'Wet wipes × 3 packs', 'Hand sanitiser × 2'] },
  ],

  physicalPrep: [
    { _key: 'pp01', weeks: '16+ Weeks Out', focus: 'Aerobic Base', description: 'Build aerobic base with 4–5 sessions per week. Ladakh\'s starting altitude (3,524m) means your body starts working hard from Day 1 — fitness matters more here than on Nepal treks.' },
    { _key: 'pp02', weeks: '12 Weeks Out', focus: 'Loaded Hiking', description: 'Weekly long hikes with 8–10kg pack. Build to 20km. The Markha Valley has technical river crossings — practice your balance and footwork on uneven terrain.' },
    { _key: 'pp03', weeks: '8 Weeks Out', focus: 'Strength & River Crossings', description: 'Single-leg balance exercises, lateral lunges, and ankle stability work. The valley has 15+ river crossings — ankle strength is critical.' },
    { _key: 'pp04', weeks: '4 Weeks Out', focus: 'Taper & Altitude Prep', description: 'Reduce volume. Medical check-up mandatory. Start Diamox 2 days before flying to Leh and continue for the first 3 days as a prophylactic — this is more important here than on Himalayan treks due to the abrupt altitude gain on arrival.' },
  ],

  testimonials: [
    { _key: 'test01', name: 'Anika Bose', location: 'Delhi, India', rating: 5, text: 'The homestay experience in Markha Valley is unlike anything I\'ve done. Eating tsampa and butter tea with a Ladakhi family after a day\'s trekking, watching the stars with no light pollution — this is what travel should be.', batch: 'Markha Valley — September 2025' },
    { _key: 'test02', name: 'Tom Hargreaves', location: 'Bristol, UK', rating: 5, text: 'The Kongmaru La crossing on Day 8 broke me in the best possible way. The views from 5,100m into the Indus valley — Karakoram on one side, Zanskar on the other — I\'ve never felt so small or so alive.', batch: 'Markha Valley — August 2025' },
    { _key: 'test03', name: 'Yuki Tanaka', location: 'Tokyo, Japan', rating: 5, text: 'Two mandatory acclimatisation days in Leh felt frustrating at first. By Day 5 at 4,060m, I understood exactly why. Not a single person in our group had to descend early. The preparation is meticulous.', batch: 'Markha Valley — July 2025' },
  ],

  gettingThere: {
    arrival: 'Fly into Kushok Bakula Rimpochhe Airport (LEH), Leh. Flights operate from Delhi (1 hr), Mumbai (2 hrs), and a few other Indian cities. Book flights early — Leh capacity is limited. Yeti Expeditions provides airport pickup.',
    visa: 'Indian e-Visa for most nationalities. Apply at indianvisaonline.gov.in at least 4 days before travel. Some nationalities require a traditional visa from the Indian embassy. An Inner Line Permit (ILP) for Markha Valley is included in your trek fee and handled by us.',
    domesticFlight: 'All Leh transportation is handled by Yeti Expeditions once you land. The trek begins with a drive to Chilling (1.5 hrs from Leh). Note: Leh flights are frequently delayed or cancelled by weather — build a buffer day before any international connection.',
  },

  accommodationDetails: [
    { _key: 'acc01', location: 'Leh', type: '3-Star Hotel', nights: 3, notes: 'Full acclimatisation protocol. En-suite rooms, hot water, WiFi.' },
    { _key: 'acc02', location: 'Skiu', type: 'Village Homestay', nights: 1, notes: 'Traditional Ladakhi stone house. Shared outdoor bathroom. Meals with host family.' },
    { _key: 'acc03', location: 'Markha Village', type: 'Village Homestay', nights: 1, notes: 'Largest village in the valley. Best homestay facilities on the route.' },
    { _key: 'acc04', location: 'Hankar', type: 'Village Homestay', nights: 2, notes: 'Small village, basic but warm homestays. Stunning dzong views.' },
    { _key: 'acc05', location: 'Nimaling', type: 'Tent Camp', nights: 1, notes: 'Summer herder camp. No permanent structures. Sleeping bags mandatory.' },
    { _key: 'acc06', location: 'Chokstet', type: 'Village Homestay', nights: 1, notes: 'Post-pass descent stop. Basic facilities.' },
    { _key: 'acc07', location: 'Shang Sumdo', type: 'Village Homestay', nights: 1, notes: 'Final night on trail before drive back to Leh.' },
  ],

  permits: [
    { _key: 'perm01', name: 'Inner Line Permit (ILP)', cost: 'Included', handledBy: 'Yeti Expeditions', notes: 'Required for all foreign nationals trekking in restricted areas of Ladakh.' },
    { _key: 'perm02', name: 'Hemis National Park Entry Fee', cost: '₹200 Indian / $25 Foreign', handledBy: 'Yeti Expeditions', notes: 'Collected at the park entry checkpoint. Supports snow leopard conservation.' },
  ],

  faqs: [
    { _key: 'faq01', question: 'Why does Ladakh need two acclimatisation days when Nepal treks only need one?', answer: 'Leh sits at 3,524m and you arrive by plane — your body goes from sea level to 3,524m in about 3 hours. This is much more abrupt than the Nepal approach (you fly to 2,860m at Lukla and walk up from there). Two mandatory rest days reduce AMS risk significantly.' },
    { _key: 'faq02', question: 'What are the river crossings like?', answer: 'The Markha Valley has 15+ crossings of the Markha River. Most are knee-deep or less and are crossed with trekking poles. In July–August (peak snowmelt), some crossings can be thigh-deep and fast-moving. Our guides assess each crossing before proceeding. Waterproof sandals or gaiters are recommended.' },
    { _key: 'faq03', question: 'What is a homestay like in Ladakh?', answer: 'Ladakhi homestays are traditional stone houses with thick walls that stay warm despite the harsh climate. You sleep on mattresses on the floor in shared rooms (we arrange single-sex rooms where possible). Meals are cooked by the host family — expect dal, rice, vegetable curry, chapati, and thukpa (noodle soup). This is genuinely one of the best parts of the trek.' },
    { _key: 'faq04', question: 'Is the Markha Valley trek suitable for beginners?', answer: 'It is Moderate, not Easy. The two-day Leh acclimatisation protocol makes it accessible, but you need reasonable fitness. The daily distances are shorter than EBC but the terrain is more technical. If you\'ve done a multi-day hike with a pack before, you\'re likely ready.' },
    { _key: 'faq05', question: 'What wildlife might I see?', answer: 'Hemis National Park has the highest density of snow leopards in the world, though sightings require luck and patience. You\'re likely to see Himalayan marmots, bharal (blue sheep), Tibetan wolves, lammergeier vultures, golden eagles, and red foxes. Snow leopard tracks are commonly spotted on the trail.' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Upsert helper
// ─────────────────────────────────────────────────────────────────────────────
async function upsert(trek) {
  const slug = trek.slug.current
  const existing = await client.fetch(
    `*[_type == "trek" && slug.current == $slug][0]._id`,
    { slug }
  )

  if (existing) {
    await client.patch(existing).set(trek).commit()
    console.log(`✓ Updated: ${trek.name} (${existing})`)
  } else {
    const result = await client.create(trek)
    console.log(`✓ Created: ${trek.name} (${result._id})`)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('ERROR: SANITY_TOKEN is not set.')
    console.error('Run: SANITY_TOKEN=$(grep SANITY_WRITE_TOKEN .env.local | cut -d= -f2 | tr -d " ") node scripts/seed-all-treks.mjs')
    process.exit(1)
  }

  console.log('Seeding all treks...\n')
  await upsert(ebc)
  await upsert(annapurna)
  await upsert(markha)
  console.log('\nDone! View at: https://yeti-expeditions.sanity.studio/')
}

main().catch(err => { console.error(err); process.exit(1) })
