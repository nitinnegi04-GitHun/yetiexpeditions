import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TrekDetails from '@/components/TrekDetails'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { TREK_BY_SLUG_QUERY, TREK_SLUGS_QUERY } from '@/sanity/queries/trek'

const BASE_URL = 'https://www.yetiexpeditions.com'

interface PageProps {
  params: Promise<{ slug: string }>
}

// ── Data transformation helpers ─────────────────────────────────────────────

/** Format a Sanity date string "YYYY-MM-DD" → "15 MAR - 28 MAR 2025" */
function formatBatchDateRange(startDate: string, endDate: string): string {
  const fmt = (d: string) => {
    // Append T00:00:00 to avoid UTC offset shifting the day
    const date = new Date(d + 'T00:00:00')
    const day = date.getDate().toString().padStart(2, '0')
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
    return `${day} ${month}`
  }
  const year = new Date(endDate + 'T00:00:00').getFullYear()
  return `${fmt(startDate)} - ${fmt(endDate)} ${year}`
}

/** Map Sanity batch status + seat count → frontend status */
function deriveBatchStatus(
  sanityStatus: string,
  totalSeats: number,
  seatsBooked: number
): 'Open' | 'Limited' | 'Full' {
  const remaining = totalSeats - seatsBooked
  if (sanityStatus === 'full' || remaining <= 0) return 'Full'
  if (remaining <= 2 || remaining / totalSeats < 0.25) return 'Limited'
  return 'Open'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformSanityTrek(raw: any) {
  // Batches: Sanity → TrekDetails format
  const batches = (raw.batches ?? []).map(
    (b: any) => ({
      date: formatBatchDateRange(b.startDate, b.endDate),
      status: deriveBatchStatus(b.status, b.totalSeats, b.seatsBooked),
      remaining: b.totalSeats - b.seatsBooked,
    })
  )

  // Packing list: array of {category, items} → Record<string, string[]>
  const packingList: Record<string, string[]> = Object.fromEntries(
    (raw.packingList ?? []).map((p: any) => [p.category, p.items ?? []])
  )

  // Gallery: Sanity image objects → URL strings
  const gallery: string[] = (raw.gallery ?? []).map((img: any) =>
    urlFor(img).width(1200).url()
  )

  // Banner image → URL string (used in hero background)
  const bannerImage: string = raw.bannerImage
    ? urlFor(raw.bannerImage).width(1920).quality(80).url()
    : ''

  return {
    name: raw.name ?? '',
    difficulty: raw.difficulty ?? '',
    duration: raw.duration ?? '',
    investment: raw.investment ?? '',
    altitude: raw.altitude ?? '',
    season: raw.season ?? '',
    accommodation: raw.accommodation ?? '',
    groupSize: raw.groupSize ?? '',
    bannerImage,
    itinerary: raw.itinerary ?? [],
    batches,
    included: raw.included ?? [],
    excluded: raw.excluded ?? [],
    altitudeProfile: raw.altitudeProfile ?? [],
    packingList,
    physicalPrep: raw.physicalPrep ?? [],
    testimonials: raw.testimonials ?? [],
    gallery,
    gettingThere: raw.gettingThere ?? { arrival: '', visa: '', domesticFlight: '' },
    accommodationDetails: raw.accommodationDetails ?? [],
    permits: raw.permits ?? [],
    faqs: raw.faqs ?? [],
    relatedTreks: raw.relatedTreks ?? [],
  }
}

// ── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const treks: { slug: string }[] = await client.fetch(TREK_SLUGS_QUERY)
  return treks.map(t => ({ slug: t.slug }))
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const raw = await client.fetch(TREK_BY_SLUG_QUERY, { slug })
  if (!raw) return {}

  const trek = transformSanityTrek(raw)
  const title = `${trek.name} Trek — ${trek.duration}, ${trek.altitude} | Yeti Expeditions`
  const description = `Guided ${trek.name} trek: ${trek.duration}, reaching ${trek.altitude}. From ${trek.investment}. ${trek.groupSize} trekkers. WFR-certified guides. All permits, meals & accommodation included.`
  const url = `${BASE_URL}/treks/${slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: trek.bannerImage
        ? [{ url: trek.bannerImage, width: 1200, height: 630, alt: `${trek.name} Trek — Yeti Expeditions` }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: trek.bannerImage ? [trek.bannerImage] : [],
    },
  }
}

// ── JSON-LD structured data ──────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildTrekSchemas(trek: ReturnType<typeof transformSanityTrek>, slug: string) {
  const url = `${BASE_URL}/treks/${slug}`

  const touristTripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: `${trek.name} Trek`,
    description: `Guided ${trek.name} trek: ${trek.duration}, reaching ${trek.altitude}. From ${trek.investment}.`,
    url,
    touristType: 'Adventure Travelers',
    itinerary: trek.itinerary.map((day: any) => ({
      '@type': 'TouristAttraction',
      name: day.title,
      description: day.content,
    })),
    offers: {
      '@type': 'Offer',
      price: trek.investment.replace(/[^0-9]/g, ''),
      priceCurrency: 'USD',
      url,
      availability: 'https://schema.org/InStock',
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Yeti Expeditions',
      url: BASE_URL,
    },
    subjectOf: trek.batches.map((batch: any) => ({
      '@type': 'Event',
      name: `${trek.name} Trek — ${batch.date}`,
      eventStatus: 'https://schema.org/EventScheduled',
      remainingAttendeeCapacity: batch.remaining,
      organizer: { '@type': 'TravelAgency', name: 'Yeti Expeditions', url: BASE_URL },
      offers: {
        '@type': 'Offer',
        price: trek.investment.replace(/[^0-9]/g, ''),
        priceCurrency: 'USD',
        url,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Treks', item: `${BASE_URL}/treks` },
      { '@type': 'ListItem', position: 3, name: trek.name, item: url },
    ],
  }

  const faqSchema = trek.faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: trek.faqs.map((faq: any) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null

  const reviewSchema = trek.testimonials.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${trek.name} Trek`,
        description: `Guided ${trek.name} trek by Yeti Expeditions`,
        url,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
          ratingCount: trek.testimonials.length,
        },
        review: trek.testimonials.map((t: any) => ({
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5 },
          author: { '@type': 'Person', name: t.name },
          reviewBody: t.text,
          datePublished: t.batch,
        })),
      }
    : null

  return [touristTripSchema, breadcrumbSchema, faqSchema, reviewSchema].filter(Boolean)
}

// ── Page ─────────────────────────────────────────────────────────────────────

// Revalidate every 24h as a safety net; Sanity webhook triggers on-demand revalidation on publish
export const revalidate = 86400

export default async function TrekPage({ params }: PageProps) {
  const { slug } = await params
  const raw = await client.fetch(TREK_BY_SLUG_QUERY, { slug })

  if (!raw) notFound()

  const trek = transformSanityTrek(raw)
  const schemas = buildTrekSchemas(trek, slug)

  return (
    <main className="min-h-screen">
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Navbar />

      {/* Trek Hero */}
      <section className="relative h-[70vh] w-full -mt-[88px]">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale brightness-75 transition-all duration-700 hover:grayscale-0"
          style={{ backgroundImage: `url(${trek.bannerImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 max-w-[1440px] mx-auto p-8 md:p-16 flex flex-col items-start gap-4">
          <span className="bg-primary text-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
            Expedition Dispatch
          </span>
          <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter">
            {trek.name}
          </h1>
        </div>
      </section>

      <TrekDetails trek={trek} />

      <Footer />

      {/* Enables automatic revalidation when content changes in Sanity */}
    </main>
  )
}
