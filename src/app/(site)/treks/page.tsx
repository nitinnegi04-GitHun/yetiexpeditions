import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { client } from '@/sanity/client'
import { ALL_TREKS_QUERY } from '@/sanity/queries/trek'
import TrekListClient from './_components/TrekListClient'

const BASE_URL = 'https://www.yetiexpeditions.com'

export const metadata: Metadata = {
  title: 'All Treks & Expeditions | Yeti Expeditions',
  description:
    'Browse all Himalayan treks offered by Yeti Expeditions — Everest Base Camp, Annapurna Circuit, Markha Valley and more. WFR-certified guides, small groups, all permits included.',
  alternates: { canonical: `${BASE_URL}/treks` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/treks`,
    title: 'All Treks & Expeditions | Yeti Expeditions',
    description:
      'Browse guided Himalayan treks by Yeti Expeditions. Small groups, expert guides, full logistics.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Yeti Expeditions — Himalayan Trek Index' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Treks & Expeditions | Yeti Expeditions',
    description: 'Browse guided Himalayan treks by Yeti Expeditions. Small groups, expert guides, full logistics.',
    images: ['/og-image.jpg'],
  },
}

export const revalidate = 86400

export default async function TreksPage() {
  const treks = await client.fetch(ALL_TREKS_QUERY)

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="border-b border-zinc-border bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-16 md:py-24">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-4">
            All Expeditions
          </span>
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter">
            Trek Index
          </h1>
          <p className="text-slate-500 text-sm mt-4 max-w-xl">
            Every expedition we run — handpicked routes, expert-led, maximum group size of 8.
          </p>
        </div>
      </section>

      {/* Filterable Trek List */}
      <TrekListClient treks={treks} />

      <Footer />
    </main>
  )
}
