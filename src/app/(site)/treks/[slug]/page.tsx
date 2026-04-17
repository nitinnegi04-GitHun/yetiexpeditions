import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TrekDetails from '@/components/TrekDetails'
import TrekHeroBanner from '@/components/TrekHeroBanner'
import TrekSubNav from '@/components/TrekSubNav'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { TREK_BY_SLUG_QUERY, TREK_SLUGS_QUERY } from '@/sanity/queries/trek'
import { SITE_SETTINGS_QUERY } from '@/sanity/queries/siteSettings'

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
      startDate: b.startDate,
      endDate: b.endDate,
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

  // Banner video → direct Sanity CDN URL (autoplay, takes priority over image)
  const bannerVideo: string = raw.bannerVideoUrl ?? ''

  return {
    name: raw.name ?? '',
    region: raw.region ?? '',
    country: raw.country ?? '',
    difficulty: raw.difficulty ?? '',
    duration: raw.duration ?? '',
    priceUSD: raw.priceUSD ?? null,
    priceINR: raw.priceINR ?? null,
    altitude: raw.altitude ?? '',
    season: raw.season ?? '',
    accommodation: raw.accommodation ?? '',
    groupSize: raw.groupSize ?? '',
    bannerImage,
    bannerVideo,
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
    trekLead: raw.trekLead ?? null,
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
  const url = `${BASE_URL}/treks/${slug}`

  // Sanity SEO overrides take priority; fall back to auto-generated values
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (raw as any).seo ?? {}
  const title = seo.metaTitle ?? `${trek.name} Trek — ${trek.duration}, ${trek.altitude} | Yeti Expeditions`
  const description = seo.metaDescription ?? `Guided ${trek.name} trek: ${trek.duration}, reaching ${trek.altitude}. From $${trek.priceUSD?.toLocaleString('en-US') ?? '—'}. ${trek.groupSize} trekkers. WFR-certified guides. All permits, meals & accommodation included.`
  const ogImage = seo.ogImageUrl ?? trek.bannerImage

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: `${trek.name} Trek — Yeti Expeditions` }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
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
    description: `Guided ${trek.name} trek: ${trek.duration}, reaching ${trek.altitude}. From $${trek.priceUSD?.toLocaleString('en-US') ?? '—'}.`,
    url,
    touristType: 'Adventure Travelers',
    itinerary: trek.itinerary.map((day: any) => ({
      '@type': 'TouristAttraction',
      name: day.title,
      description: day.content,
    })),
    offers: {
      '@type': 'Offer',
      price: trek.priceUSD ?? 0,
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
      startDate: batch.startDate,
      endDate: batch.endDate,
      location: {
        '@type': 'Place',
        name: trek.region,
        address: { '@type': 'PostalAddress', addressCountry: trek.country },
      },
      remainingAttendeeCapacity: batch.remaining,
      organizer: { '@type': 'TravelAgency', name: 'Yeti Expeditions', url: BASE_URL },
      offers: {
        '@type': 'Offer',
        price: trek.priceUSD ?? 0,
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

  const avgRating = trek.testimonials.length
    ? (trek.testimonials.reduce((sum: number, t: any) => sum + (t.rating ?? 5), 0) / trek.testimonials.length).toFixed(1)
    : '5.0'

  const reviewSchema = trek.testimonials.length
    ? {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${trek.name} Trek`,
      description: `Guided ${trek.name} trek by Yeti Expeditions`,
      url,
      provider: { '@type': 'TravelAgency', name: 'Yeti Expeditions', url: BASE_URL },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating,
        bestRating: '5',
        worstRating: '1',
        ratingCount: trek.testimonials.length,
      },
      review: trek.testimonials.map((t: any) => ({
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: t.rating ?? 5, bestRating: 5 },
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
  const [raw, settings] = await Promise.all([
    client.fetch(TREK_BY_SLUG_QUERY, { slug }),
    client.fetch(SITE_SETTINGS_QUERY),
  ])

  if (!raw) notFound()

  const trek = transformSanityTrek(raw)
  const schemas = buildTrekSchemas(trek, slug)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logoUrl: string = settings?.logo ? urlFor((settings as any).logo).height(80).quality(90).url() : ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whatsappNumber: string = (settings as any)?.whatsappNumber ?? ''

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Navbar />
      <TrekSubNav />

      {/* Trek Hero — split layout matching home page */}
      <section className="w-full border-b border-zinc-border">
        {/* Mobile: banner stacked above text */}
        <div className="md:hidden relative w-full bg-slate-100 overflow-hidden border-b border-zinc-border" style={{ height: '160vw', minHeight: '350px' }}>
          <TrekHeroBanner src={trek.bannerImage} videoSrc={trek.bannerVideo} />
          <div className="absolute border-l-4 border-primary pl-4 z-10" style={{ top: '40px', left: '24px' }}>
            <p className="text-white text-xs font-bold uppercase tracking-widest">{trek.region}</p>
            <p className="text-white/80 text-[10px] uppercase">{trek.country}</p>
          </div>
          {logoUrl && (
            <div className="absolute z-10" style={{ top: '40px', right: '24px' }}>
              <img src={logoUrl} alt="Yeti Expeditions" style={{ height: '28px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
          )}
        </div>

        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:min-h-[80vh]">
          {/* Left: Text */}
          <div className="w-full md:w-1/2 flex flex-col justify-between md:justify-center px-6 pt-12 pb-8 md:pt-12 md:px-24 md:pb-24 border-b md:border-b-0 md:border-r border-zinc-border">
            <div className="space-y-5 md:space-y-8">
              <span className="inline-block bg-primary text-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                Expedition Dispatch
              </span>
              <h1 className="text-[15vw] md:text-8xl font-black md:leading-[.88] leading-[1.1] tracking-tighter text-slate-900 uppercase">
                {trek.name}
                <span className="block mt-3 md:mt-4 text-slate-300">{trek.country}</span>
              </h1>
              <p className="text-[20px] italic md:text-lg text-slate-600 leading-relaxed">
                {trek.difficulty} &middot; {trek.duration} &middot; {trek.altitude}
              </p>
              <a
                href={whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I'd like to book the ${trek.name} Trek. Please share more details.`)}` : '#enquire'}
                target={whatsappNumber ? '_blank' : undefined}
                rel={whatsappNumber ? 'noopener noreferrer' : undefined}
                className="inline-block md:w-auto text-center bg-slate-900 text-white px-8 py-4 md:px-10 md:py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors"
              >
                Book This Trek
              </a>
            </div>
            <div />
          </div>

          {/* Right: Image / Video — desktop only */}
          <div className="hidden md:block md:w-1/2 bg-slate-100 relative overflow-hidden group">
            <TrekHeroBanner src={trek.bannerImage} videoSrc={trek.bannerVideo} />
            <div className="absolute border-l-4 border-primary pl-4 z-10" style={{ top: '64px', left: '40px' }}>
              <p className="text-white text-xs font-bold uppercase tracking-widest">{trek.region}</p>
              <p className="text-white/80 text-[10px] uppercase">{trek.country}</p>
            </div>
            {logoUrl && (
              <div className="absolute z-10" style={{ top: '64px', right: '40px' }}>
                <img src={logoUrl} alt="Yeti Expeditions" style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </div>
            )}
          </div>
        </div>
      </section>

      <TrekDetails trek={trek} whatsappNumber={whatsappNumber} />

      <Footer />

      {/* ── Sticky mobile bottom bar ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t border-zinc-border">
        <a
          href="#enquire"
          className="flex-1 flex items-center justify-center bg-white text-slate-900 py-4 text-[11px] font-black uppercase tracking-widest border-r border-zinc-border hover:bg-slate-50 transition-colors"
        >
          Book This Trek
        </a>
        <a
          href={trek.trekLead?.whatsappNumber
            ? `https://wa.me/${trek.trekLead.whatsappNumber}?text=${encodeURIComponent(`Hi ${trek.trekLead.name}! I'm interested in the ${trek.name} Trek. Can we chat?`)}`
            : whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I'm interested in the ${trek.name} Trek.`)}` : '#enquire'
          }
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 text-[11px] font-black uppercase tracking-widest hover:brightness-95 transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {trek.trekLead ? `Chat with ${trek.trekLead.name.split(' ')[0]}` : 'WhatsApp Us'}
        </a>
      </div>

      {/* Enables automatic revalidation when content changes in Sanity */}
    </main>
  )
}
