import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qmj04x7n',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk6qXXPFqNKYWXRuxKXDvOCExnvbhRvv28xHulGtUMcdzXkcSFtW8ERAteNeNZdxlfJv4IWgppETQCBaLI7BWpkh0CKRFek8d3iTN2jFM6ilQxqcStaTbAu2sDLD6xrRKXtfRSU3rkQyZTm86xwPbM6zM0yNFqyc4ZTBkjGvwJuZInxQx4ao',
  useCdn: false,
})

const nonNegotiables = [
  'Weather plays a very big role in the running of this trek. Flights to Lukla are a fair-weather friend. A cloud covering a mountain ridge can shut down the entire airport! Hence, we suggest keeping a day or two in Kathmandu as a buffer for your return international flight. If in extreme case, you miss your international flight from Kathmandu or internal flights, we will render all assistance, but cannot be held liable for any extra cost incurred.',
  'Kindly ensure that you arrive at Kathmandu before afternoon so you can rest well.',
  'Please note that only at Gorakshep the drinking water is not provided by the tea houses. You will have to buy the packed mineral water bottles.',
  'The Lukla flights can either be from Kathmandu or Ramechhap. If the airport is changed to Ramechhap, which is around 130km from Kathmandu, we will have to leave very early in the morning.',
  'Fares for Internal flights (Kathmandu/Ramechhap – Lukla) and Permits are different for SAARC nationals and foreign nationals. Website price is for Indian Nationals. Final price for the trek for foreign nationals will vary. Carrying baggage limit for Kathmandu/Ramechhap-Lukla flight sector is 10kg and the hand baggage limit is 5kg.',
  'It is mandatory to get yourself a travel, risk and accident insurance.',
  'Please note that there is a culture of tipping the guide and porters in Nepal and they expect it after the end of the trek.',
  'At Tea houses, there will be mainly common toilets on sharing basis and attached bathroom in some places, blankets are provided and running water is available. Majority of tea houses have cold showers, some provide hot water at an additional cost. Some tea houses have electricity where you can charge your appliances (mobile phones & cameras) at an additional cost.',
  'Please note that while we endeavor to assist all our clients in achieving their goals, there may be times your leader makes the decision to either delay or stop your ascent based on your medical conditions and AMS symptoms.',
]

const trek = await client.fetch(`*[_type == "trek" && slug.current == "everest-base-camp"][0]{ _id, name }`)

if (!trek) {
  console.error('Trek not found. Check the slug — expected "everest-base-camp".')
  process.exit(1)
}

console.log(`Patching: ${trek.name} (${trek._id})`)

await client.patch(trek._id).set({ nonNegotiables }).commit()

console.log('Done. Non-Negotiables added successfully.')
