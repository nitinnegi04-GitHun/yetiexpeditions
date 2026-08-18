import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustMatrix from "@/components/TrustMatrix";
import WhyWeTrek from "@/components/WhyWeTrek";
import TrekIndex from "@/components/TrekIndex";
import WhyUs from "@/components/WhyUs";
import SpecialProjects from "@/components/SpecialProjects";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { HOMEPAGE_QUERY } from "@/sanity/queries/homepage";
import { ALL_TREKS_QUERY, ALL_TESTIMONIALS_QUERY } from "@/sanity/queries/trek";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/siteSettings";
import type { Metadata } from "next";

const BASE_URL = "https://www.yetiexpeditions.com";

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings: any = await client.fetch(SITE_SETTINGS_QUERY)
  const seo = settings?.seo ?? {}

  const title = seo.metaTitle ?? "Yeti Expeditions | Expert-Guided Himalayan Treks — EBC, Annapurna, Ladakh"
  const description = seo.metaDescription ?? "Expert-guided treks to Everest Base Camp, Annapurna Circuit and Markha Valley. MOI or equivalent certified guides, max 12 trekkers, all permits included."
  const ogImage = seo.ogImageUrl ?? null

  return {
    title,
    description,
    alternates: { canonical: BASE_URL },
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url: BASE_URL,
      title,
      description,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: "Yeti Expeditions — Guided Himalayan Treks" }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Yeti Expeditions — Guided Himalayan Treks" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : ["/og-image.jpg"],
    },
  }
}

export default async function Home() {
  const [data, treksRaw, testimonialsRaw, settings] = await Promise.all([
    client.fetch(HOMEPAGE_QUERY),
    client.fetch(ALL_TREKS_QUERY),
    client.fetch(ALL_TESTIMONIALS_QUERY),
    client.fetch(SITE_SETTINGS_QUERY),
  ])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whatsappNumber: string = (settings as any)?.whatsappNumber ?? ''

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
  const treks = (treksRaw ?? []).map((t: any, i: number) => {
    const nextBatch = t.upcomingBatches?.[0] ?? null
    return {
      id: (i + 1).toString().padStart(2, '0'),
      name: t.name ?? '',
      slug: t.slug?.current ?? '',
      region: t.region ?? '',
      country: t.country ?? '',
      difficulty: t.difficulty ?? '',
      priceUSD: t.priceUSD ?? null,
      priceINR: t.priceINR ?? null,
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
      availableMonths: Array.from(
        new Set((t.upcomingBatches ?? []).map((b: any) => getMonthAbbr(b.startDate)))
      ),
    }
  })

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Yeti Expeditions',
    url: BASE_URL,
    publisher: { '@type': 'Organization', name: 'Yeti Expeditions', url: BASE_URL },
  }

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Navbar />
      <Hero data={data?.hero} heroImageUrl={heroImageUrl} />
      <TrustMatrix data={data?.trustMatrix} />
      <WhyWeTrek data={data?.whyWeTrek} whatsappNumber={whatsappNumber} />
      <TrekIndex treks={treks} />
      <WhyUs data={data?.whyUs} />
      {testimonialsRaw?.length > 0 && (
        <section className="border-t border-zinc-border bg-slate-50">
          <div className="max-w-[1440px] mx-auto p-8 md:p-16">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-3 block">Real Journeys, Real Words</span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-12">
              Trekker<br /><span className="text-slate-300">Testimonials</span>
            </h2>
            <TestimonialsCarousel testimonials={testimonialsRaw} />
          </div>
        </section>
      )}
      <SpecialProjects data={data?.specialProjects} />
      <QuoteSection data={data?.quoteSection} />
      <Footer />
    </main>
  );
}
