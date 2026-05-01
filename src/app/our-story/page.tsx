import { ArrowRight, MessageCircle, Instagram } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoFounderModal from "@/components/CoFounderModal";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries/aboutPage";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/siteSettings";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { highlightSweep } from "@/lib/highlightStyle";
import type { Metadata } from "next";

export const revalidate = 86400

const BASE_URL = 'https://www.yetiexpeditions.com'

export async function generateMetadata(): Promise<Metadata> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d: any = await client.fetch(ABOUT_PAGE_QUERY)
  const seo = d?.seo ?? {}
  const title = seo.metaTitle ?? 'Our Story — Yeti Expeditions | Born in the Himalayas'
  const description = seo.metaDescription ?? 'How Yeti Expeditions was founded — by a mountaineering expert, a corporate organiser, and a trek trainer. Rooted in Kinnaur. Active across Nepal and the Indian Himalaya.'
  const url = `${BASE_URL}/our-story`
  const ogImage = seo.ogImageUrl ?? null

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
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

const FALLBACK_LEFT_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4"
const FALLBACK_GUIDE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4"

export default async function AboutPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [d, settings]: [any, any] = await Promise.all([
        client.fetch(ABOUT_PAGE_QUERY),
        client.fetch(SITE_SETTINGS_QUERY),
    ])

    // ── Logo ─────────────────────────────────────────────────────────────────────
    const logoUrl: string = settings?.logo ? urlFor(settings.logo).height(80).quality(90).url() : ''

    // ── Left Panel / Hero Image ───────────────────────────────────────────────────
    const panelImageUrl = d?.leftPanel?.image
        ? urlFor(d.leftPanel.image).width(1200).url()
        : FALLBACK_LEFT_IMAGE
    const city = d?.leftPanel?.expeditionCity ?? 'Kathmandu'
    const country = d?.leftPanel?.expeditionCountry ?? 'Nepal'

    // ── Co-Founder ───────────────────────────────────────────────────────────────
    const coFounder = {
        name: d?.coFounder?.name ?? 'Pradhuman Singh Negi',
        role: d?.coFounder?.role ?? 'Co-Founder & Expedition Director',
        bio: d?.coFounder?.bio ?? null,
        quoteAttribution: d?.coFounder?.quoteAttribution ?? 'Pradhuman Singh Negi, Co-Founder',
        credentials: d?.coFounder?.credentials?.length ? d.coFounder.credentials : [
            { code: 'HAWS', label: 'Instructor · High Altitude Warfare School, Gulmarg', sub: '"The White Devil"' },
            { code: 'SBS', label: 'Instructor · Siachen Battle School', sub: 'Highest Battlefield on Earth' },
            { code: 'ABVIMAS', label: 'Instructor Mountaineering & Skiing · Manali', sub: '8 Years' },
            { code: '2022', label: 'Felicitated by Defence Minister Rajnath Singh', sub: 'Govt. of India' },
        ],
    }

    // ── Hero ─────────────────────────────────────────────────────────────────────
    const heroBadge = d?.hero?.badge ?? 'Active Since 2008. Zero Fatalities.'
    const heroLine1 = d?.hero?.headlineLine1 ?? 'Born'
    const heroLine2 = d?.hero?.headlineLine2 ?? 'From The'
    const heroLine3 = d?.hero?.headlineLine3 ?? 'Mountain'
    const heroQuote = d?.hero?.openingQuote ?? "We don't sell adventures. We guide lives. The mountain was here before us and it will outlast us — our job is to help you meet it honestly."

    // ── Founding ─────────────────────────────────────────────────────────────────
    const foundingTagline = d?.founding?.tagline ?? 'The Beginning'
    const foundingHeading = d?.founding?.heading ?? 'How It Started'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paragraphs: any[] = d?.founding?.paragraphs?.length ? d.founding.paragraphs : [
        'It starts, as most things do in the mountains, with trust earned over time.',
        'P.S. Negi has been teaching people to move safely through the high Himalayas for longer than most of our trekkers have been alive — students, corporate teams, institutions. In Kinnaur, where he serves as President of the regional Mountaineering Association, he is not just a guide. He is the custodian of a tradition. Around him, over years, gathered a group of trek leads whose collective expertise spans the great routes of both India and Nepal.',
        'Nitin — his nephew, returning from years in corporate — saw what was missing. Not talent. Not passion. A structure that could carry all of it outward into the world.',
        'Gurdit completed the picture. A trainer of trainers, forged in Nepal\'s trekking corridors, he brought the operational fluency that only comes from having done the work yourself, at every level.',
        'Together they asked a simple question: what if the best guides in the Himalayas owned the platform, instead of just working for one?',
        'The answer is Yeti Expeditions. Rooted in Kinnaur. Active across Nepal and the Indian Himalaya. Built on the belief that expertise shared is expertise multiplied.',
        'Yeti Expeditions exists because the best guides in the Himalayas deserved better than obscurity. Every lead on our roster is a partner — not a hire. They don\'t work for us. We work together. That distinction is the whole point.',
    ]

    const foundingComponents: PortableTextComponents = {
        marks: {
            strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            highlight: ({ children, value }: { children?: React.ReactNode; value?: any }) => (
                <span style={{
                    ...highlightSweep({ color: value?.color === 'primary' ? 'rgba(244,99,46,0.3)' : 'rgba(255,200,0,0.35)' }),
                }}>
                    {children}
                </span>
            ),
        },
        block: {
            normal: ({ children }) => <p className="text-sm text-slate-600 leading-relaxed">{children}</p>,
        },
    }

    // ── Stats ────────────────────────────────────────────────────────────────────
    const stats = d?.stats?.length ? d.stats : [
        { value: '847', label: 'Expeditions Led' },
        { value: '6,200+', label: 'Trekkers Guided' },
        { value: '16 YRS', label: 'Zero Fatalities' },
        { value: '100%', label: 'Permit Success Rate' },
    ]

    // ── Philosophy ───────────────────────────────────────────────────────────────
    const philTagline = d?.philosophy?.tagline ?? 'Operating Principles'
    const philHeading = d?.philosophy?.heading ?? 'How We Climb'
    const principles = d?.philosophy?.principles?.length ? d.philosophy.principles : [
        { code: '01', title: 'The Mountain Decides', body: 'No summit is worth a life. We turn back when the mountain demands it — and we train our clients to trust that call. Ego is the most dangerous piece of kit you can carry above 5,000m.' },
        { code: '02', title: 'Oxygen Is Non-Negotiable', body: "Twice-daily SpO2 monitoring isn't a nice-to-have. It's protocol. Every guide carries supplemental oxygen. Every itinerary has built-in acclimatisation. There are no shortcuts above the clouds." },
        { code: '03', title: 'The Guide Is Not A Porter', body: 'Our guides are expert mountaineers with decades of high-altitude experience. They read weather, manage altitude, and carry the knowledge of generations. Treat them accordingly.' },
        { code: '04', title: 'Leave Less Than You Found', body: 'Every permit fee funds trail restoration. Every camp is left cleaner than we arrived. We operate at a deficit with the mountain — it has given us everything, we owe it our best effort.' },
    ]

    // ── Guides ───────────────────────────────────────────────────────────────────
    const guidesTagline = d?.guides?.tagline ?? 'The Team'
    const guidesHeading = d?.guides?.heading ?? 'Our Guides'
    const guides = d?.guides?.guidesList?.length ? d.guides.guidesList : [
        { _id: 'GUIDE-001', guideId: 'GUIDE-001', name: 'Lakpa Rita Sherpa', title: 'Lead Expedition Guide', cert: '', summits: 'Everest ×14', stats: ['VO2 MAX: 58 ml/kg/min', 'SpO2 @ 8000m: 88%', 'Active Since: 1998'] },
        { _id: 'GUIDE-002', guideId: 'GUIDE-002', name: 'Dawa Gyalje Sherpa', title: 'High Altitude Specialist', cert: 'WFR Certified', summits: 'Everest ×9 / Lhotse ×6', stats: ['VO2 MAX: 61 ml/kg/min', 'SpO2 @ 8000m: 91%', 'Active Since: 2004'] },
        { _id: 'GUIDE-003', guideId: 'GUIDE-003', name: 'Mingma Tshering', title: 'Route & Safety Director', cert: 'WFR Certified', summits: 'Annapurna ×12 / Manaslu ×8', stats: ['VO2 MAX: 59 ml/kg/min', 'SpO2 @ 8000m: 89%', 'Active Since: 2001'] },
    ]

    // ── The Crew ─────────────────────────────────────────────────────────────
    const crewTagline = d?.crew?.tagline ?? 'Operations'
    const crewHeading = d?.crew?.heading ?? 'The Crew'
    const crewDescription = d?.crew?.description ?? 'Every summit starts at base camp. These are the people who make each expedition operationally flawless — permits, logistics, client care, and everything in between.'
    const allCrew = d?.crew?.crewList?.length ? d.crew.crewList : [
        { memberId: 'OPS-001', name: 'Pemba Dorje Sherpa', role: 'Permits & Logistics Director', domain: 'Govt. Liaison · Route Clearance', note: '18 years navigating Nepal & India expedition permits. Every trekker arrives with paperwork that holds.', image: null },
        { memberId: 'OPS-002', name: 'Sita Rai', role: 'Client Experience Manager', domain: 'Pre-Trek Prep · On-Trip Support', note: 'First voice you hear, last to sign off. Manages every client touchpoint from enquiry to post-trek debrief.', image: null },
        { memberId: 'OPS-003', name: 'Tenzin Wangchuk', role: 'Base Camp & Supply Manager', domain: 'Camp Operations · Equipment', note: 'Runs the field supply chain — tents, rations, medical kit, porter welfare. Nothing moves without Tenzin.', image: null },
    ]
    const crew = allCrew.filter((m: { visible?: boolean }) => m.visible !== false)

    // ── Why Yeti ─────────────────────────────────────────────────────────────────
    const whyTagline = d?.whyYeti?.tagline ?? 'The Difference'
    const whyHeading = d?.whyYeti?.heading ?? 'Why Yeti'
    const differentiators = d?.whyYeti?.differentiators?.length ? d.whyYeti.differentiators : [
        { title: 'Group Cap: 8', body: 'Every expedition. Non-negotiable. Quality of experience and safety both degrade past this number at altitude.' },
        { title: 'Fitness Vetting', body: 'Every trekker is assessed before confirmation. We turn people down. It protects them and the group.' },
        { title: '2× Daily SpO2', body: 'Morning and evening oxygen saturation checks from Namche onwards. Data, not guesswork.' },
        { title: 'Evacuation Protocol', body: 'Helicopter rescue pre-authorised. Bottled O2 on all trips above 4,500m. No improvising in an emergency.' },
    ]

    // ── CTA ──────────────────────────────────────────────────────────────────────
    const ctaBadge = d?.cta?.badge ?? 'Join The Next Expedition'
    const ctaLine1 = d?.cta?.headlineLine1 ?? 'The Mountain'
    const ctaLine2 = d?.cta?.headlineLine2 ?? 'Is Waiting'
    const ctaLine3 = d?.cta?.headlineLine3 ?? 'For You'
    const ctaButtons = d?.cta?.buttons?.length ? d.cta.buttons : [
        { text: 'Everest Base Camp', url: '/treks/everest-base-camp' },
        { text: 'Annapurna Circuit', url: '/treks/annapurna-circuit' },
    ]

    return (
        <div className="bg-white">
            <Navbar />

            {/* ── Hero — same 50/50 split structure as home & trek pages ── */}
            <section className="w-full border-b border-zinc-border">
                {/* Mobile: banner stacked above text */}
                <div className="md:hidden relative w-full bg-slate-100 overflow-hidden border-b border-zinc-border" style={{ height: '160vw', minHeight: '350px' }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center grayscale brightness-90 contrast-110"
                        style={{ backgroundImage: `url('${panelImageUrl}')` }}
                    />
                    <div className="absolute border-l-4 border-primary pl-4 z-10" style={{ top: '40px', left: '24px' }}>
                        <p className="text-white text-xs font-bold uppercase tracking-widest">{city}</p>
                        <p className="text-white/80 text-[10px] uppercase">{country}</p>
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
                                {heroBadge}
                            </span>
                            <h1 className="text-[15vw] md:text-8xl font-black md:leading-[.88] leading-[1.1] tracking-tighter text-slate-900 uppercase">
                                {heroLine1}
                                <br />{heroLine2}
                                <span className="block mt-3 md:mt-4 text-slate-300">{heroLine3}</span>
                            </h1>
                            <blockquote className="border-l-2 border-primary pl-6">
                                <p className="text-[20px] italic md:text-lg text-slate-600 leading-relaxed">
                                    &ldquo;{heroQuote}&rdquo;
                                </p>
                                <CoFounderModal
                                    name={coFounder.name}
                                    role={coFounder.role}
                                    bio={coFounder.bio}
                                    quoteAttribution={coFounder.quoteAttribution}
                                    credentials={coFounder.credentials}
                                />
                            </blockquote>
                        </div>
                        <div />
                    </div>

                    {/* Right: Image — desktop only */}
                    <div className="hidden md:block md:w-1/2 bg-slate-100 relative overflow-hidden group">
                        <div
                            className="absolute inset-0 bg-cover bg-center grayscale brightness-90 contrast-110 group-hover:grayscale-0 transition-all duration-700"
                            style={{ backgroundImage: `url('${panelImageUrl}')` }}
                        />
                        <div className="absolute border-l-4 border-primary pl-4 z-10" style={{ top: '64px', left: '40px' }}>
                            <p className="text-white text-xs font-bold uppercase tracking-widest">{city}</p>
                            <p className="text-white/80 text-[10px] uppercase">{country}</p>
                        </div>
                        {logoUrl && (
                            <div className="absolute z-10" style={{ top: '64px', right: '40px' }}>
                                <img src={logoUrl} alt="Yeti Expeditions" style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── The Founding ── */}
            <section className="border-b border-zinc-border">
                <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-16 md:py-24">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">
                        {foundingTagline}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 text-slate-900">
                        {foundingHeading}
                    </h2>
                    <div className="space-y-6">
                        {paragraphs.map((para: any, i: number) => (
                            typeof para === 'string'
                                ? <p key={i} className="text-sm text-slate-600 leading-relaxed">{para}</p>
                                : <PortableText key={para._key ?? i} value={[para]} components={foundingComponents} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── By The Numbers ── */}
            <section className="border-b border-zinc-border bg-slate-50">
                <div className="max-w-[1440px] mx-auto">
                    <div className="px-8 md:px-16 pt-16 pb-8">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-4">
                            Field Data
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">
                            By The Numbers
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 border-t border-zinc-border">
                        {stats.map((s: { value: string; label: string }, i: number) => (
                            <div
                                key={i}
                                className={`p-8 md:p-12 flex flex-col gap-3 hover:bg-white transition-colors border-zinc-border ${
                                    i === 0 ? 'border-r border-b md:border-b-0' :
                                    i === 1 ? 'border-b md:border-b-0 md:border-r' :
                                    i === 2 ? 'border-r' : ''
                                }`}
                            >
                                <span className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">{s.value}</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How We Climb ── */}
            <section className="border-b border-zinc-border">
                <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-16 md:py-24">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">
                        {philTagline}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-slate-900">
                        {philHeading}
                    </h2>
                    <div className="border-t border-zinc-border">
                        {principles.map((p: { code: string; title: string; body: string }) => (
                            <div key={p.code} className="py-8 border-b border-zinc-border flex gap-8 group">
                                <span className="text-4xl font-black text-slate-100 tracking-tighter shrink-0 transition-colors group-hover:text-primary/20">
                                    {p.code}
                                </span>
                                <div>
                                    <h3 className="font-black uppercase text-base tracking-tight mb-3 text-slate-900">{p.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{p.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Our Guides ── */}
            <section className="border-b border-zinc-border bg-slate-50">
                <div className="max-w-[1440px] mx-auto">
                    <div className="px-8 md:px-16 pt-16 pb-8">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">
                            {guidesTagline}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">
                            {guidesHeading}
                        </h2>
                    </div>
                    <div className="border-t border-zinc-border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-zinc-border">
                        {guides.map((g: {
                            _id?: string; guideId: string; name: string; title: string;
                            cert: string; summits: string; stats: string[]; image?: unknown;
                            instagramHandle?: string; whatsappNumber?: string
                        }, i: number) => {
                            const guideImageUrl = g.image
                                ? urlFor(g.image).width(600).url()
                                : FALLBACK_GUIDE_IMAGE
                            return (
                                <div
                                    key={g._id ?? i}
                                    className="bg-slate-50 hover:bg-white transition-colors flex flex-col group"
                                >
                                    {/* Image — full width, tall aspect ratio */}
                                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/4' }}>
                                        <img
                                            src={guideImageUrl}
                                            alt={g.name}
                                            className="w-full h-full object-cover object-top grayscale brightness-90 contrast-110 group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        <div className="absolute bottom-4 left-4">
                                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-1">{g.guideId}</p>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 p-6 flex flex-col gap-4">
                                        <div>
                                            <h3 className="text-base font-black uppercase tracking-tight text-slate-900">{g.name}</h3>
                                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">{g.title}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{g.cert}</p>
                                            <p className="text-xs font-bold text-primary">{g.summits}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            {(g.stats ?? []).map((stat: string, j: number) => (
                                                <p key={j} className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">{stat}</p>
                                            ))}
                                        </div>
                                        {(g.whatsappNumber || g.instagramHandle) && (
                                            <div className="flex flex-col gap-2 pt-3 border-t border-zinc-border mt-auto">
                                                <div className="flex flex-col gap-2">
                                                    {g.whatsappNumber && (
                                                        <a
                                                            href={`https://wa.me/${g.whatsappNumber}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-3 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-colors"
                                                        >
                                                            <MessageCircle className="w-3 h-3 shrink-0 text-green-500" />
                                                            Chat with {g.name.split(' ')[0]}
                                                        </a>
                                                    )}
                                                    {g.instagramHandle && (
                                                        <a
                                                            href={`https://instagram.com/${g.instagramHandle}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 border border-slate-200 text-slate-500 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] hover:border-slate-900 hover:text-slate-900 transition-colors"
                                                        >
                                                            <Instagram className="w-3 h-3 shrink-0" />
                                                            {g.name.split(' ')[0]} - Instagram ID
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── The Crew ── */}
            <section className="border-b border-zinc-border bg-white">
                <div className="max-w-[1440px] mx-auto">
                    <div className="px-8 md:px-16 pt-16 pb-8">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">
                            {crewTagline}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900">
                            {crewHeading}
                        </h2>
                        <p className="text-sm text-slate-500 mt-4 max-w-xl leading-relaxed">
                            {crewDescription}
                        </p>
                    </div>
                    <div className="border-t border-zinc-border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-zinc-border">
                        {crew.map((member: {
                            _key?: string; memberId: string; name: string; role: string;
                            domain: string; note: string; image?: unknown
                        }, i: number) => {
                            const memberImageUrl = member.image
                                ? urlFor(member.image).width(600).url()
                                : FALLBACK_GUIDE_IMAGE
                            return (
                            <div key={member._key ?? i} className="bg-white hover:bg-slate-50 transition-colors flex flex-col group">
                                {/* Image — square aspect ratio, distinct from guides */}
                                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1/1' }}>
                                    <img
                                        src={memberImageUrl}
                                        alt={member.name}
                                        className="w-full h-full object-cover object-top grayscale brightness-90 contrast-110 group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute bottom-4 left-4">
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">{member.memberId}</p>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-6 flex flex-col gap-3">
                                    <div>
                                        <h3 className="text-base font-black uppercase tracking-tight text-slate-900">{member.name}</h3>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">{member.role}</p>
                                    </div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{member.domain}</p>
                                    <p className="text-xs text-slate-500 leading-relaxed border-l-2 border-primary/30 pl-3">{member.note}</p>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── Why Yeti ── */}
            <section className="border-b border-zinc-border">
                <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-16 md:py-24">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">
                        {whyTagline}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 text-slate-900">
                        {whyHeading}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-border border border-zinc-border">
                        {differentiators.map((item: { title: string; body: string }, i: number) => (
                            <div key={i} className="bg-slate-50 p-8 md:p-10">
                                <h3 className="font-black uppercase text-sm tracking-tight mb-3 text-primary">{item.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="bg-slate-900 pb-20 md:pb-0">
                <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-16 md:py-24">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-8">
                        ▪ {ctaBadge}
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-10">
                        <span className="text-white">{ctaLine1}</span>
                        <br />
                        <span className="text-white/25">{ctaLine2}</span>
                        <br />
                        <span className="text-white">{ctaLine3}</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        {ctaButtons.map((btn: { text: string; url: string }, i: number) => (
                            i === 0 ? (
                                <Link
                                    key={i}
                                    href={btn.url}
                                    className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all group"
                                >
                                    {btn.text}
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            ) : (
                                <Link
                                    key={i}
                                    href={btn.url}
                                    className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all group"
                                >
                                    {btn.text}
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
