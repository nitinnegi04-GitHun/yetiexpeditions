import { groq } from 'next-sanity'

// All treks — used by TrekIndex and TrekCalendar components
export const ALL_TREKS_QUERY = groq`
  *[_type == "trek"] | order(name asc) {
    _id,
    name,
    slug,
    bannerImage,
    difficulty,
    duration,
    altitude,
    season,
    investment,
    region,
    country,
    groupSize,
    accommodation,
    "upcomingBatches": batches[status == "open" && startDate > now()] | order(startDate asc)[0..2] {
      batchId, startDate, endDate, price, discountedPrice, seatsBooked, totalSeats, status
    }
  }
`

// Full trek detail — used by /trek/[slug] page
export const TREK_BY_SLUG_QUERY = groq`
  *[_type == "trek" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    bannerImage,
    gallery,
    difficulty,
    duration,
    altitude,
    season,
    investment,
    accommodation,
    groupSize,
    region,
    country,
    itinerary,
    altitudeProfile,
    included,
    excluded,
    packingList,
    physicalPrep,
    testimonials,
    gettingThere,
    accommodationDetails,
    permits,
    faqs,
    "relatedTreks": relatedTreks[]-> {
      name,
      "slug": slug.current,
      duration,
      altitude
    },
    "batches": batches[] | order(startDate asc) {
      batchId, startDate, endDate, price, discountedPrice,
      totalSeats, seatsBooked, status, meetingPoint, notes
    }
  }
`

// Homepage featured / hero — 3 treks with next open batch
export const FEATURED_TREKS_QUERY = groq`
  *[_type == "trek"][0..5] {
    _id,
    name,
    slug,
    bannerImage,
    difficulty,
    duration,
    altitude,
    region,
    investment,
    "nextBatch": batches[status == "open" && startDate > now()] | order(startDate asc)[0] {
      startDate, price, discountedPrice
    }
  }
`

// Minimal slug list — used by generateStaticParams
export const TREK_SLUGS_QUERY = groq`
  *[_type == "trek"] { "slug": slug.current }
`
