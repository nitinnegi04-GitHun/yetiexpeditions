import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TrekDetailsV2 from '@/components/TrekDetailsV2'
import TrekHeroBannerV2 from '@/components/TrekHeroBannerV2'
import TrekHeroCTAV2 from '@/components/TrekHeroCTAV2'
import TrekAnalyticsContext from '@/components/TrekAnalyticsContext'
import TrekSubNav from '@/components/TrekSubNav'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { TREK_BY_SLUG_QUERY } from '@/sanity/queries/trek'
import { SITE_SETTINGS_QUERY } from '@/sanity/queries/siteSettings'

const SLUG = 'annapurna-base-camp'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatBatchDateRange(startDate: string, endDate: string): string {
  const fmt = (d: string) => {
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

function getDesktopNameSizeClass(name: string): string {
  const firstWord = name.split(' ')[0].length
  const firstWordRem = firstWord <= 6 ? 8 : firstWord <= 8 ? 7 : firstWord <= 10 ? 6 : firstWord <= 13 ? 5 : firstWord <= 17 ? 4 : 3.25

  const totalLen = name.length
  const totalCapRem = totalLen <= 10 ? 8 : totalLen <= 16 ? 6 : totalLen <= 22 ? 5 : totalLen <= 28 ? 4 : totalLen <= 36 ? 3.25 : 2.75

  return remToDesktopNameClass(Math.min(firstWordRem, totalCapRem))
}

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
  const batches = (raw.batches ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const packingList: Record<string, string[]> = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (raw.packingList ?? []).map((p: any) => [p.category, p.items ?? []])
  )

  const gallery: string[] = (raw.gallery ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((img: any) => img?.asset)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((img: any) => urlFor(img).width(1200).url())

  const bannerImage: string = raw.bannerImage?.asset
    ? urlFor(raw.bannerImage).width(1920).quality(80).url()
    : ''

  const bannerVideo: string = raw.bannerVideoUrl ?? ''

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itinerary = (raw.itinerary ?? []).map((step: any) => ({
    ...step,
    imageUrl: step.image?.asset ? urlFor(step.image).width(1200).quality(80).url() : undefined,
  }))

  return {
    name: raw.name ?? '',
    region: raw.region ?? '',
    country: raw.country ?? '',
    difficulty: raw.difficulty ?? '',
    difficultyDescription: raw.difficultyDescription ?? '',
    duration: raw.duration ?? '',
    durationDescription: raw.durationDescription ?? '',
    priceUSD: raw.priceUSD ?? null,
    priceINR: raw.priceINR ?? null,
    batchPricingNote: raw.batchPricingNote ?? '',
    altitude: raw.altitude ?? '',
    altitudeDescription: raw.altitudeDescription ?? '',
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

// Comparison build for the trek-page flow redesign — not linked from site nav, no SEO metadata/schemas.
export const revalidate = 86400

export default async function TrekPageV2() {
  const [raw, settings] = await Promise.all([
    client.fetch(TREK_BY_SLUG_QUERY, { slug: SLUG }),
    client.fetch(SITE_SETTINGS_QUERY),
  ])

  if (!raw) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trek = transformSanityTrek(raw, (settings as any)?.safetyProtocols ?? [])

  const maxTrekkersMatch = trek.groupSize.match(/\d+/)
  const maxTrekkersLabel = maxTrekkersMatch ? `Max ${maxTrekkersMatch[0]} Trekkers` : trek.groupSize
  const desktopNameSizeClass = getDesktopNameSizeClass(trek.name)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logoUrl: string = settings?.logo ? urlFor((settings as any).logo).height(80).quality(90).url() : ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whatsappNumber: string = (settings as any)?.whatsappNumber ?? ''

  return (
    <main className="min-h-screen">
      <TrekAnalyticsContext trekName={trek.name} />
      <Navbar />
      <TrekSubNav />

      {/* Trek Hero — split layout matching home page */}
      <section className="w-full border-b border-zinc-border">
        {/* Mobile: banner stacked above text */}
        <div className="md:hidden relative w-full bg-slate-100 overflow-hidden border-b border-zinc-border" style={{ height: '160vw', minHeight: '350px' }}>
          <TrekHeroBannerV2 src={trek.bannerImage} videoSrc={trek.bannerVideo} />
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
          <div className="w-full md:w-1/2 flex flex-col justify-between md:justify-center md:min-h-0 px-6 pt-8 pb-6 md:pt-12 md:px-24 md:pb-24 border-b md:border-b-0 md:border-r border-zinc-border" style={{ minHeight: 0 }}>
            <div className="space-y-5 md:space-y-8">
              <span className="inline-block bg-primary text-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                Expedition Dispatch
              </span>
              <h1 className={`text-[15vw] ${desktopNameSizeClass} font-black md:leading-[.9] leading-[1.1] tracking-tighter text-slate-900 uppercase`}>
                {trek.name}
                <span className="block mt-3 md:mt-3 text-slate-300">{trek.country}</span>
              </h1>
              <ul className="space-y-2 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-2 md:space-y-0 border-t border-zinc-border pt-4 md:pt-5">
                {[maxTrekkersLabel, 'Handpicked Premium Tea Houses', 'Experienced Trek Leaders', 'Personal Attention Throughout'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm md:text-base font-bold uppercase tracking-wide text-slate-700">
                    <span className="text-primary">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <TrekHeroCTAV2 />
            </div>
            <div />
          </div>

          {/* Right: Image / Video — desktop only */}
          <div className="hidden md:block md:w-1/2 bg-slate-100 relative overflow-hidden group">
            <TrekHeroBannerV2 src={trek.bannerImage} videoSrc={trek.bannerVideo} />
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

      <TrekDetailsV2 trek={trek} whatsappNumber={whatsappNumber} />

      <Footer />
    </main>
  )
}
