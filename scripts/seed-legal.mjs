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

// ── Helpers ───────────────────────────────────────────────────────────────────
let keyCounter = 0
const key = () => `k${++keyCounter}`

const h2 = (text) => ({
  _type: 'block', _key: key(), style: 'h2', markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
})

const h3 = (text) => ({
  _type: 'block', _key: key(), style: 'h3', markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
})

const p = (text) => ({
  _type: 'block', _key: key(), style: 'normal', markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
})

const bullet = (text) => ({
  _type: 'block', _key: key(), style: 'normal', markDefs: [],
  listItem: 'bullet', level: 1,
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
})

// ── Privacy Protocol ──────────────────────────────────────────────────────────
const privacyPolicy = [
  p('Yeti Expeditions ("we", "us", "our") is committed to protecting your personal data. This Privacy Protocol explains what information we collect, how we use it, and the choices available to you.'),

  h2('1. Information We Collect'),
  bullet('Identity & contact data: your name, email address, phone number, and nationality submitted via enquiry or booking forms.'),
  bullet('Travel documentation: passport details and visa information required to apply for trekking permits on your behalf.'),
  bullet('Payment data: transaction records processed via our payment provider (Razorpay). We never store card numbers on our servers.'),
  bullet('Health information: fitness level and medical disclosures you provide voluntarily to ensure your safety on trek.'),
  bullet('Technical data: IP address, browser type, pages visited, and session duration collected via analytics tools (Google Analytics).'),

  h2('2. How We Use Your Information'),
  bullet('To process and confirm trek bookings and enquiries.'),
  bullet('To obtain trekking permits from Nepali, Indian, or Bhutanese authorities as required by your itinerary.'),
  bullet('To communicate pre-trek logistics, packing guidance, safety briefings, and itinerary updates.'),
  bullet('To charge or refund payments in accordance with our cancellation policy.'),
  bullet('To send occasional field dispatches and expedition updates (you may unsubscribe at any time).'),
  bullet('To improve our website and service quality through anonymised analytics.'),

  h2('3. Data Sharing'),
  p('We share your data only where necessary:'),
  bullet('Payment processors (Razorpay) for secure transaction handling — subject to their own privacy policy.'),
  bullet('Government permit authorities in Nepal, India, and Bhutan — required by law for trekking permits.'),
  bullet('Logistics partners (accommodation providers, domestic airlines, transport operators) where strictly necessary to fulfil your booking.'),
  p('We do not sell, rent, or trade your personal data to any third party for marketing purposes.'),

  h2('4. Data Retention'),
  p('We retain personal data for as long as is necessary to fulfil the purposes described above and to comply with legal obligations. Booking records are retained for seven years for accounting and regulatory purposes. Personal documents provided for permit applications are deleted within 90 days of trek completion unless otherwise required by law.'),

  h2('5. Data Security'),
  bullet('All data is transmitted over encrypted HTTPS connections.'),
  bullet('Access to personal data is restricted to team members who need it to fulfil your booking.'),
  bullet('Payment data is handled exclusively by PCI-DSS-compliant third-party processors.'),
  p('While we take every reasonable precaution, no system is entirely immune from breach. In the unlikely event of a data incident that affects your rights, we will notify you without undue delay.'),

  h2('6. Your Rights'),
  p('Depending on your jurisdiction you may have the right to:'),
  bullet('Access the personal data we hold about you.'),
  bullet('Request correction of inaccurate data.'),
  bullet('Request deletion of your data ("right to be forgotten"), subject to legal retention requirements.'),
  bullet('Object to or restrict certain processing activities.'),
  bullet('Data portability — receive your data in a structured, machine-readable format.'),
  p('To exercise any of these rights, email us at info@yetiexpeditions.com. EU and UK residents may also lodge a complaint with their local data protection authority.'),

  h2('7. Cookies'),
  p('We use essential cookies for site functionality and analytics cookies to understand visitor behaviour. For full details see our Cookie Policy.'),

  h2('8. Changes to This Policy'),
  p('We may update this Privacy Protocol periodically. The "last updated" date at the top of the page reflects the most recent revision. Continued use of the site following an update constitutes acceptance of the revised policy.'),

  h2('9. Contact'),
  p('Questions or concerns? Reach us at info@yetiexpeditions.com or by post at Yeti Expeditions, Thamel, Kathmandu, Nepal.'),
]

// ── Terms of Ascent ───────────────────────────────────────────────────────────
keyCounter = 0

const termsOfAscent = [
  p('These Terms of Ascent ("Terms") form the agreement between Yeti Expeditions and every person who books a trek or expedition ("you", "participant"). Please read them carefully before completing a booking.'),

  h2('1. Bookings & Payment'),
  bullet('A non-refundable deposit of 30% of the total trek cost is required to secure your place on a departure.'),
  bullet('The outstanding balance is due 60 days before the confirmed departure date.'),
  bullet('Bookings made within 60 days of departure require full payment at the time of booking.'),
  bullet('Your place is confirmed only when we have received the deposit and issued a written confirmation.'),

  h2('2. Cancellations & Refunds'),
  h3('Cancellations by You'),
  bullet('61 or more days before departure: deposit is forfeited; all other payments are refunded in full.'),
  bullet('31–60 days before departure: 50% of the total trek cost is charged; the remainder is refunded.'),
  bullet('0–30 days before departure: no refund is payable.'),
  p('All cancellations must be submitted in writing to info@yetiexpeditions.com. We strongly recommend comprehensive travel insurance that includes trip cancellation cover.'),

  h3('Cancellations by Yeti Expeditions'),
  p('We reserve the right to cancel a departure if minimum group numbers are not met (minimum 2 participants) or if conditions beyond our control (see Force Majeure) make the trek unsafe or impossible. In such cases you will receive a full refund of all payments made to Yeti Expeditions, excluding any third-party costs already incurred on your behalf (permits, flights, etc.).'),

  h2('3. Health & Fitness Requirements'),
  bullet('All participants must be in good cardiovascular health and capable of sustained mountain hiking for multiple consecutive days.'),
  bullet('You are responsible for honestly disclosing any pre-existing medical conditions, medications, and physical limitations in your booking form.'),
  bullet('Yeti Expeditions reserves the right to refuse participation to any individual whose fitness or health poses a risk to themselves or the group, at any point before or during the trek.'),
  bullet('Altitude sickness is a recognised risk at high elevation. Our WFR-certified trek leads follow strict acclimatisation protocols; however, individual physiological responses to altitude cannot be predicted or guaranteed.'),

  h2('4. Safety & Risk'),
  p('Himalayan trekking involves inherent and serious risks including but not limited to: altitude illness (AMS, HACE, HAPO), adverse weather, river crossings, trail hazards, landslides, wildlife encounters, and remoteness from medical facilities.'),
  bullet('All participants must sign a liability waiver prior to departure.'),
  bullet('Our trek leads hold final authority on safety decisions, including route changes, rest days, and evacuation. Their decisions are not subject to dispute.'),
  bullet('Emergency helicopter evacuation is available. Costs not covered by your travel insurance are your personal responsibility.'),
  bullet('We recommend a minimum insurance cover of USD 100,000 for medical evacuation and repatriation.'),

  h2('5. Our Responsibilities'),
  bullet('To provide competent, safety-certified trek leads with intimate knowledge of the route and current conditions.'),
  bullet('To apply for all necessary trekking and area permits prior to departure.'),
  bullet('To provide the accommodation, meals, and transport described in your confirmed itinerary.'),
  bullet('To modify itineraries where necessary for safety, weather, or logistical reasons. Itinerary changes do not entitle participants to a refund unless we are unable to deliver a comparable alternative.'),

  h2('6. Participant Conduct'),
  p('Yeti Expeditions operates on a foundation of respect — for the mountains, local communities, and fellow trekkers. We reserve the right to remove any participant whose conduct is abusive, reckless, or harmful to others, without refund.'),
  bullet('Follow Leave No Trace principles at all times.'),
  bullet('Respect local customs, religious sites, and community guidelines.'),
  bullet('Comply with all instructions from your trek lead, particularly on safety matters.'),

  h2('7. Force Majeure'),
  p('We are not liable for cancellations, curtailments, or itinerary changes caused by events beyond our reasonable control, including but not limited to: natural disasters (earthquake, flood, avalanche), governmental travel advisories or border closures, pandemics, strikes, or acts of terrorism.'),
  p('In force majeure situations we will make every effort to offer an alternative departure date or trek credit. Monetary refunds in these circumstances are at our discretion and subject to costs already committed.'),

  h2('8. Intellectual Property'),
  p('All content on this website — text, photography, videos, and branding — is the property of Yeti Expeditions and may not be reproduced without written permission.'),

  h2('9. Governing Law & Disputes'),
  p('These Terms are governed by the laws of Nepal. Any dispute shall first be addressed through good-faith negotiation. Unresolved disputes may be referred to binding arbitration in Kathmandu under the rules of the Arbitration Act of Nepal.'),

  h2('10. Contact'),
  p('For questions about these Terms, contact us at info@yetiexpeditions.com or Yeti Expeditions, Thamel, Kathmandu, Nepal.'),
]

// ── Cookie Policy ─────────────────────────────────────────────────────────────
keyCounter = 0

const cookiePolicy = [
  p('This Cookie Policy explains how Yeti Expeditions uses cookies and similar tracking technologies on www.yetiexpeditions.com. By using our site, you consent to the use of cookies as described below.'),

  h2('1. What Are Cookies?'),
  p('Cookies are small text files placed on your device (computer, tablet, or mobile phone) when you visit a website. They allow the site to recognise your device on subsequent visits, remember your preferences, and understand how you interact with content.'),

  h2('2. Cookies We Use'),
  h3('Essential Cookies'),
  p('These cookies are strictly necessary for the website to function. They enable core features such as page navigation and access to secure areas. The site cannot function properly without these cookies and they cannot be disabled.'),
  bullet('Session management cookies that expire when you close your browser.'),
  bullet('Security cookies that help protect against cross-site request forgery.'),

  h3('Analytics Cookies'),
  p('We use Google Analytics to understand how visitors use our site — which pages are visited most, where visitors come from, and how long they stay. This helps us improve content and user experience. The data collected is anonymised and aggregated; it does not identify you personally.'),
  bullet('_ga — distinguishes unique users. Expires after 2 years.'),
  bullet('_gid — distinguishes unique users. Expires after 24 hours.'),
  bullet('_gat — throttles request rate. Expires after 1 minute.'),

  h3('Preference Cookies'),
  p('These cookies remember choices you make (such as partially completed enquiry form data) to improve your experience on return visits. They expire at the end of your browser session.'),

  h2('3. Third-Party Cookies'),
  p('Some cookies are set by third-party services embedded on our site:'),
  bullet('Google Analytics — behavioural analytics (see above).'),
  bullet('Razorpay — payment processing. These cookies are set only on the checkout flow and are governed by Razorpay\'s own cookie policy.'),
  bullet('Embedded maps or video players (if present) may set their own cookies subject to the respective provider\'s policies.'),

  h2('4. Managing Cookies'),
  p('You can control and delete cookies through your browser settings. Most browsers allow you to:'),
  bullet('View cookies currently stored on your device.'),
  bullet('Block all or specific cookies from being set.'),
  bullet('Delete cookies when you close the browser or at any time.'),
  p('Please note that disabling essential cookies will impair the functionality of this site. For instructions on managing cookies in your specific browser, visit the browser\'s help documentation.'),

  h2('5. Opting Out of Analytics'),
  p('To opt out of Google Analytics tracking across all websites, install the Google Analytics Opt-out Browser Add-on available at tools.google.com/dlpage/gaoptout. Alternatively, most modern browsers include a "Do Not Track" setting that we respect.'),

  h2('6. Changes to This Policy'),
  p('We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. The "last updated" date on this page indicates when the policy was last revised. Continued use of the site after an update constitutes your acceptance of the changes.'),

  h2('7. Contact'),
  p('For any questions about how we use cookies, please contact us at info@yetiexpeditions.com.'),
]

// ── Seed ──────────────────────────────────────────────────────────────────────
async function run() {
  const settingsDoc = await client.fetch('*[_type == "siteSettings"][0]{ _id }')
  if (!settingsDoc?._id) {
    console.error('⚠  siteSettings document not found — open the Studio and save it once first.')
    process.exit(1)
  }

  await client.patch(settingsDoc._id).set({
    privacyPolicy,
    termsOfAscent,
    cookiePolicy,
  }).commit()

  console.log('✅  Legal content seeded successfully to siteSettings:', settingsDoc._id)
}

run().catch(err => { console.error(err); process.exit(1) })
