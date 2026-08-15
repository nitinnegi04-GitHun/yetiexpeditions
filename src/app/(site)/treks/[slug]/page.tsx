import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TrekDetails from '@/components/TrekDetails'
import TrekHeroBanner from '@/components/TrekHeroBanner'
import TrekHeroBookCTA from '@/components/TrekHeroBookCTA'
import TrekAnalyticsContext from '@/components/TrekAnalyticsContext'
import TrekSubNav from '@/components/TrekSubNav'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { TREK_BY_SLUG_QUERY, TREK_SLUGS_QUERY } from '@/sanity/queries/trek'
import { SITE_SETTINGS_QUERY } from '@/sanity/queries/siteSettings'

const BASE_URL = 'https://www.yetiexpeditions.com'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function portableTextToPlain(blocks: any[]): string {
  return (blocks ?? [])
    .map((block) => (block?.children ?? []).map((span: { text?: string }) => span.text ?? '').join(''))
    .join(' ')
    .trim()
}

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

function remToDesktopNameClass(rem: number): string {
  switch (rem) {
    case 8: return 'md:text-[8rem]'
    case 7: return 'md:text-[7rem]'
    case 6: return 'md:text-[6rem]'
    case 5: return 'md:text-[5rem]'
    case 4: return 'md:text-[4rem]'
    case 3.25: return 'md:text-[3.25rem]'
    default: return 'md:text-[2.75rem]'
  }
}

/**
 * Desktop-only trek name size: sized off the first word's length so it fills the row,
 * then capped by the full name's length so long names (more words to wrap) don't grow
 * tall enough to push the CTA below the fold.
 */
function getDesktopNameSizeClass(name: string): string {
  const firstWord = name.split(' ')[0].length
  const firstWordRem = firstWord <= 6 ? 8 : firstWord <= 8 ? 7 : firstWord <= 10 ? 6 : firstWord <= 13 ? 5 : firstWord <= 17 ? 4 : 3.25

  const totalLen = name.length
  const totalCapRem = totalLen <= 10 ? 8 : totalLen <= 16 ? 6 : totalLen <= 22 ? 5 : totalLen <= 28 ? 4 : totalLen <= 36 ? 3.25 : 2.75

  return remToDesktopNameClass(Math.min(firstWordRem, totalCapRem))
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
function transformSanityTrek(raw: any, safetyProtocols: { title: string; description: string }[]) {
  // Batches: Sanity → TrekDetails format
  const batches = (raw.batches ?? []).map(
    (b: any) => ({
      date: formatBatchDateRange(b.startDate, b.endDate),
      startDate: b.startDate,
      endDate: b.endDate,
      status: deriveBatchStatus(b.status, b.totalSeats, b.seatsBooked),
      remaining: b.totalSeats - b.seatsBooked,
      totalSeats: b.totalSeats,
      price: b.discountedPrice ?? b.price ?? null,
      trekLead: b.trekLead ?? null,
    })
  )

  // Packing list: array of {category, items} → Record<string, string[]>
  const packingList: Record<string, string[]> = Object.fromEntries(
    (raw.packingList ?? []).map((p: any) => [p.category, p.items ?? []])
  )

  // Gallery: Sanity image objects → URL strings (skip entries with no uploaded asset)
  const gallery: string[] = (raw.gallery ?? [])
    .filter((img: any) => img?.asset)
    .map((img: any) => urlFor(img).width(1200).url())

  // Banner image → URL string (used in hero background)
  const bannerImage: string = raw.bannerImage?.asset
    ? urlFor(raw.bannerImage).width(1920).quality(80).url()
    : ''

  // Banner video → direct Sanity CDN URL (autoplay, takes priority over image)
  const bannerVideo: string = raw.bannerVideoUrl ?? ''

  // Itinerary: resolve each day's image to a URL
  const itinerary = (raw.itinerary ?? []).map((step: any) => ({
    ...step,
    imageUrl: step.image?.asset ? urlFor(step.image).width(1200).quality(80).url() : undefined,
  }))

  return {
    name: raw.name ?? '',
    region: raw.region ?? '',
    country: raw.country ?? '',
    difficulty: raw.difficulty ?? '',
    duration: raw.duration ?? '',
    priceUSD: raw.priceUSD ?? null,
    priceINR: raw.priceINR ?? null,
    batchPricingNote: raw.batchPricingNote ?? '',
    altitude: raw.altitude ?? '',
    season: raw.season ?? '',
    accommodation: raw.accommodation ?? '',
    groupSize: raw.groupSize ?? '',
    bannerImage,
    bannerVideo,
    overview: raw.overview ?? [],
    itinerary,
    itineraryPdfUrl: raw.itineraryPdfUrl ?? '',
    batches,
    trekLead: raw.trekLead ?? null,
    safetyProtocols,
    included: raw.included ?? [],
    excluded: raw.excluded ?? [],
    nonNegotiables: raw.nonNegotiables ?? [],
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

  const trek = transformSanityTrek(raw, [])
  const url = `${BASE_URL}/treks/${slug}`

  // Sanity SEO overrides take priority; fall back to auto-generated values
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (raw as any).seo ?? {}
  const title = seo.metaTitle ?? `${trek.name} Trek — ${trek.duration}, ${trek.altitude} | Yeti Expeditions`
  const description = seo.metaDescription ?? `Guided ${trek.name} trek: ${trek.duration}, reaching ${trek.altitude}. From $${trek.priceUSD?.toLocaleString('en-US') ?? '—'}. ${trek.groupSize} trekkers. MOI or equivalent certified guides. All permits, meals & accommodation included.`
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
      description: portableTextToPlain(day.content),
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

  const leads = new Map<string, any>()
  if (trek.trekLead?.name) leads.set(trek.trekLead.name, trek.trekLead)
  trek.batches.forEach((b: any) => { if (b.trekLead?.name) leads.set(b.trekLead.name, b.trekLead) })

  const personSchemas = Array.from(leads.values()).map((lead: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: lead.name,
    jobTitle: lead.title,
    description: [lead.cert, lead.summits].filter(Boolean).join('; '),
    image: lead.imageUrl,
    worksFor: { '@type': 'TravelAgency', name: 'Yeti Expeditions', url: BASE_URL },
  }))

  const howToSchema = trek.physicalPrep.length
    ? {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to Train for the ${trek.name} Trek`,
      description: `Physical preparation timeline for the ${trek.name} trek.`,
      step: trek.physicalPrep.map((p: any) => ({
        '@type': 'HowToStep',
        name: `${p.weeks}: ${p.focus}`,
        text: p.description,
      })),
    }
    : null

  return [touristTripSchema, breadcrumbSchema, faqSchema, reviewSchema, howToSchema, ...personSchemas].filter(Boolean)
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trek = transformSanityTrek(raw, (settings as any)?.safetyProtocols ?? [])
  const schemas = buildTrekSchemas(trek, slug)

  const maxTrekkersMatch = trek.groupSize.match(/\d+/)
  const maxTrekkersLabel = maxTrekkersMatch ? `Max ${maxTrekkersMatch[0]} Trekkers` : trek.groupSize
  const desktopNameSizeClass = getDesktopNameSizeClass(trek.name)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logoUrl: string = settings?.logo ? urlFor((settings as any).logo).height(80).quality(90).url() : ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whatsappNumber: string = (settings as any)?.whatsappNumber ?? ''

  return (
    <main className="min-h-screen">
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <TrekAnalyticsContext trekName={trek.name} />
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
          <div className="w-full md:w-1/2 flex flex-col justify-between md:justify-center px-6 pt-8 pb-6 md:pt-10 md:px-24 md:pb-10 border-b md:border-b-0 md:border-r border-zinc-border">
            <div className="space-y-3 md:space-y-4">
              <span className="inline-block bg-primary text-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                Expedition Dispatch
              </span>
              <h1 className={`text-[15vw] ${desktopNameSizeClass} font-black md:leading-[.9] leading-[1.1] tracking-tighter text-slate-900 uppercase`}>
                {trek.name}
                <span className="block mt-3 md:mt-3 text-slate-300">{trek.country}</span>
              </h1>
              <ul className="space-y-1.5 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-1.5 md:space-y-0 border-t border-zinc-border pt-3 md:pt-4">
                {[maxTrekkersLabel, 'Handpicked Premium Tea Houses', 'Experienced Trek Leaders', 'Personal Attention Throughout'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[11px] md:text-xs font-bold uppercase tracking-wide text-slate-700">
                    <span className="text-primary">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <TrekHeroBookCTA
                href={whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I'd like to book the ${trek.name} Trek. Please share more details.`)}` : '#enquire'}
                target={whatsappNumber ? '_blank' : undefined}
                rel={whatsappNumber ? 'noopener noreferrer' : undefined}
                className="inline-block md:w-auto text-center bg-slate-900 text-white px-8 py-3 md:px-10 md:py-3.5 text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors"
              >
                Book This Trek
              </TrekHeroBookCTA>
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

      {/* Enables automatic revalidation when content changes in Sanity */}
    </main>
  )
}
