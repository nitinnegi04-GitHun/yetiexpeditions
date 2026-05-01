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
    priceUSD,
    priceINR,
    region,
    country,
    groupSize,
    accommodation,
    "upcomingBatches": batches[status == "open" && startDate > now()] | order(startDate asc)[0..11] {
      batchId, startDate, endDate, price, discountedPrice, seatsBooked, totalSeats, status,
      "trekLead": trekLead-> { name, title, cert, summits, stats, image, whatsappNumber, instagramHandle, quote }
    },
    "trekLead": trekLead-> {
      name,
      title,
      cert,
      summits,
      stats,
      image,
      whatsappNumber,
      instagramHandle,
      quote
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
    "bannerVideoUrl": bannerVideo.asset->url,
    gallery,
    difficulty,
    duration,
    altitude,
    season,
    priceUSD,
    priceINR,
    accommodation,
    groupSize,
    region,
    country,
    itinerary,
    altitudeProfile,
    safetyProtocols,
    included,
    excluded,
    nonNegotiables,
    packingList,
    physicalPrep,
    "trekLead": trekLead-> {
      name,
      title,
      cert,
      summits,
      "imageUrl": image.asset->url,
      whatsappNumber,
      quote
    },
    "testimonials": *[_type == "testimonial" && trek._ref == ^._id] | order(_createdAt desc) {
      name, location, rating, text, batch
    },
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
      totalSeats, seatsBooked, status, meetingPoint, notes,
      "trekLead": trekLead-> { name, title, cert, summits, "imageUrl": image.asset->url, whatsappNumber, quote }
    },
    "seo": seo {
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url,
      noIndex
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
    priceUSD,
    priceINR,
    "nextBatch": batches[status == "open" && startDate > now()] | order(startDate asc)[0] {
      startDate, price, discountedPrice
    }
  }
`

// All testimonials — used by homepage testimonials section
export const ALL_TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    name, location, rating, text, batch
  }
`

// Minimal slug list — used by generateStaticParams
export const TREK_SLUGS_QUERY = groq`
  *[_type == "trek"] { "slug": slug.current, "updatedAt": _updatedAt }
`
