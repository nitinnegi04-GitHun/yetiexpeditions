import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustMatrix from "@/components/TrustMatrix";
import TrekIndex from "@/components/TrekIndex";
import TrekCalendar from "@/components/TrekCalendar";
import SpecialProjects from "@/components/SpecialProjects";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { HOMEPAGE_QUERY } from "@/sanity/queries/homepage";
import { ALL_TREKS_QUERY } from "@/sanity/queries/trek";

export const revalidate = 86400

export default async function Home() {
  const [data, treksRaw] = await Promise.all([
    client.fetch(HOMEPAGE_QUERY),
    client.fetch(ALL_TREKS_QUERY),
  ])

  // Resolve hero image URL if set in Sanity, otherwise leave undefined
  const heroImageUrl = data?.hero?.heroImage
    ? urlFor(data.hero.heroImage).width(1920).quality(85).url()
    : undefined

  function fmtBatchDate(iso: string) {
    const d = new Date(iso + 'T00:00:00')
    return d.toLocaleString('en-US', { day: '2-digit', month: 'short' }).toUpperCase()
  }

  function getMonthAbbr(iso: string) {
    const d = new Date(iso + 'T00:00:00')
    return d.toLocaleString('en-US', { month: 'short' })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function mapBatchStatus(sanityStatus: string, booked: number, total: number): 'Open' | 'Limited' | 'Full' {
    if (sanityStatus === 'full') return 'Full'
    if ((total - booked) <= 2) return 'Limited'
    return 'Open'
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const treks = (treksRaw ?? []).map((t: any, i: number) => {
    const nextBatch = t.upcomingBatches?.[0] ?? null
    return {
      id: (i + 1).toString().padStart(2, '0'),
      name: t.name ?? '',
      slug: t.slug?.current ?? '',
      region: t.region ?? '',
      country: t.country ?? '',
      difficulty: t.difficulty ?? '',
      price: t.investment ?? '',
      duration: t.duration ?? '',
      altitude: t.altitude ?? '',
      bannerImageUrl: t.bannerImage
        ? urlFor(t.bannerImage).width(900).quality(70).url()
        : '',
      nextBatchRange: nextBatch
        ? `${fmtBatchDate(nextBatch.startDate)} – ${fmtBatchDate(nextBatch.endDate)}`
        : null,
      seatsBooked: nextBatch?.seatsBooked ?? null,
      totalSeats: nextBatch?.totalSeats ?? null,
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calendarTreks = (treksRaw ?? []).map((t: any) => ({
    slug: t.slug?.current ?? '',
    name: t.name ?? '',
    region: t.region ?? '',
    difficulty: t.difficulty ?? '',
    duration: t.duration ?? '',
    altitude: t.altitude ?? '',
    price: t.investment ?? '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    batches: (t.upcomingBatches ?? []).map((b: any) => ({
      month: getMonthAbbr(b.startDate),
      dates: `${fmtBatchDate(b.startDate)} – ${fmtBatchDate(b.endDate)}`,
      status: mapBatchStatus(b.status, b.seatsBooked ?? 0, b.totalSeats ?? 8),
      booked: b.seatsBooked ?? 0,
      capacity: b.totalSeats ?? 8,
    })),
    trekLead: t.trekLead ? {
      name: t.trekLead.name ?? '',
      title: t.trekLead.title ?? '',
      cert: t.trekLead.cert ?? '',
      summits: t.trekLead.summits ?? '',
      stats: t.trekLead.stats ?? [],
      imageUrl: t.trekLead.image ? urlFor(t.trekLead.image).width(200).quality(80).url() : '',
      whatsappNumber: t.trekLead.whatsappNumber ?? '',
      instagramHandle: t.trekLead.instagramHandle ?? '',
    } : null,
  }))

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero data={data?.hero} heroImageUrl={heroImageUrl} />
      <TrustMatrix data={data?.trustMatrix} />
      <TrekIndex treks={treks} />
      <TrekCalendar treks={calendarTreks} />
      <SpecialProjects data={data?.specialProjects} />
      <QuoteSection data={data?.quoteSection} />
      <Footer />
    </main>
  );
}
