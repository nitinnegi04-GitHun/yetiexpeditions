import { ArrowRight, MessageCircle, Instagram } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries/aboutPage";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/siteSettings";

export const revalidate = 86400

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
    const year = d?.leftPanel?.expeditionYear ?? '2008'

    // ── Hero ─────────────────────────────────────────────────────────────────────
    const heroBadge = d?.hero?.badge ?? 'IFMGA Certified Expedition Company'
    const heroLine1 = d?.hero?.headlineLine1 ?? 'Born'
    const heroLine2 = d?.hero?.headlineLine2 ?? 'From The'
    const heroLine3 = d?.hero?.headlineLine3 ?? 'Mountain'
    const heroQuote = d?.hero?.openingQuote ?? "We don't sell adventures. We guide lives. The mountain was here before us and it will outlast us — our job is to help you meet it honestly."

    // ── Founding ─────────────────────────────────────────────────────────────────
    const foundingTagline = d?.founding?.tagline ?? 'The Beginning'
    const foundingHeading = d?.founding?.heading ?? 'How It Started'
    const paragraphs: string[] = d?.founding?.paragraphs?.length ? d.founding.paragraphs : [
        'In 2008, Lakpa Rita Sherpa and two fellow IFMGA guides returned from their fourteenth Everest summit and made a decision: the industry needed to change. Operators were cutting corners. Clients were arriving unprepared. People were dying for avoidable reasons.',
        'They founded Yeti Expeditions on three words: Safety. Authenticity. Respect. Not as a tagline — as an operating system.',
        'Sixteen years later, we have guided over 6,200 trekkers across the Himalaya. We have never lost a client. We have turned back on summit day twenty-three times. We are proud of every single one of those decisions.',
    ]

    // ── Stats ────────────────────────────────────────────────────────────────────
    const stats = d?.stats?.length ? d.stats : [
        { value: '847', label: 'Expeditions Led' },
        { value: '6,200+', label: 'Trekkers Guided' },
        { value: '16 YRS', label: 'Zero Fatalities' },
        { value: '100%', label: 'Permit Success Rate' },
    ]

    // ── Philosophy ───────────────────────────────────────────────────────────────
    const philTagline = d?.philosophy?.tagline ?? 'Operating Principles'
    const philHeading = d?.philosophy?.heading ?? 'The Sherpa Code'
    const principles = d?.philosophy?.principles?.length ? d.philosophy.principles : [
        { code: '01', title: 'The Mountain Decides', body: 'No summit is worth a life. We turn back when the mountain demands it — and we train our clients to trust that call. Ego is the most dangerous piece of kit you can carry above 5,000m.' },
        { code: '02', title: 'Oxygen Is Non-Negotiable', body: "Twice-daily SpO2 monitoring isn't a nice-to-have. It's protocol. Every guide carries supplemental oxygen. Every itinerary has built-in acclimatisation. There are no shortcuts above the clouds." },
        { code: '03', title: 'The Sherpa Is Not A Porter', body: 'Our guides are IFMGA-certified mountaineers with decades of high-altitude experience. They read weather, manage altitude, and carry the knowledge of generations. Treat them accordingly.' },
        { code: '04', title: 'Leave Less Than You Found', body: 'Every permit fee funds trail restoration. Every camp is left cleaner than we arrived. We operate at a deficit with the mountain — it has given us everything, we owe it our best effort.' },
    ]

    // ── Guides ───────────────────────────────────────────────────────────────────
    const guidesTagline = d?.guides?.tagline ?? 'The Team'
    const guidesHeading = d?.guides?.heading ?? 'Our Guides'
    const allGuides = d?.guides?.guidesList?.length ? d.guides.guidesList : [
        { guideId: 'GUIDE-001', name: 'Lakpa Rita Sherpa', title: 'Lead Expedition Guide', cert: 'IFMGA Certified', summits: 'Everest ×14', stats: ['VO2 MAX: 58 ml/kg/min', 'SpO2 @ 8000m: 88%', 'Active Since: 1998'] },
        { guideId: 'GUIDE-002', name: 'Dawa Gyalje Sherpa', title: 'High Altitude Specialist', cert: 'WFR Certified', summits: 'Everest ×9 / Lhotse ×6', stats: ['VO2 MAX: 61 ml/kg/min', 'SpO2 @ 8000m: 91%', 'Active Since: 2004'] },
        { guideId: 'GUIDE-003', name: 'Mingma Tshering', title: 'Route & Safety Director', cert: 'IFMGA / WFR', summits: 'Annapurna ×12 / Manaslu ×8', stats: ['VO2 MAX: 59 ml/kg/min', 'SpO2 @ 8000m: 89%', 'Active Since: 2001'] },
    ]
    const guides = allGuides.filter((g: { visible?: boolean }) => g.visible !== false)

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
                        className="absolute inset-0 bg-cover bg-center grayscale brightness-75 contrast-125"
                        style={{ backgroundImage: `url('${panelImageUrl}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute border-l-4 border-primary pl-4 z-10" style={{ top: '40px', left: '24px' }}>
                        <p className="text-white text-xs font-bold uppercase tracking-widest">{city}</p>
                        <p className="text-white/80 text-[10px] uppercase">{country} · {year}</p>
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
                            </blockquote>
                        </div>
                        <div />
                    </div>

                    {/* Right: Image — desktop only */}
                    <div className="hidden md:block md:w-1/2 bg-slate-100 relative overflow-hidden group">
                        <div
                            className="absolute inset-0 bg-cover bg-center grayscale brightness-75 contrast-125 group-hover:grayscale-0 transition-all duration-700"
                            style={{ backgroundImage: `url('${panelImageUrl}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute border-l-4 border-primary pl-4 z-10" style={{ top: '64px', left: '40px' }}>
                            <p className="text-white text-xs font-bold uppercase tracking-widest">{city}</p>
                            <p className="text-white/80 text-[10px] uppercase">{country} · {year}</p>
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
                    <div className="space-y-6 text-sm text-slate-600 leading-relaxed max-w-2xl">
                        {paragraphs.map((para: string, i: number) => (
                            <p key={i}>{para}</p>
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

            {/* ── The Sherpa Code ── */}
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
                    <div className="border-t border-zinc-border">
                        {guides.map((g: {
                            _key?: string; guideId: string; name: string; title: string;
                            cert: string; summits: string; stats: string[]; image?: unknown;
                            instagramHandle?: string; whatsappNumber?: string
                        }, i: number) => {
                            const guideImageUrl = g.image
                                ? urlFor(g.image).width(400).url()
                                : FALLBACK_GUIDE_IMAGE
                            return (
                                <div
                                    key={g._key ?? i}
                                    className="border-b border-zinc-border hover:bg-white transition-colors flex gap-0"
                                >
                                    <div className="w-40 md:w-56 shrink-0 relative overflow-hidden">
                                        <img
                                            src={guideImageUrl}
                                            alt={g.name}
                                            className="w-full h-full object-cover grayscale object-top"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-50/60" />
                                    </div>
                                    <div className="flex-1 px-6 md:px-8 py-8 flex flex-col gap-4">
                                        <div className="flex items-start justify-between gap-4 flex-wrap">
                                            <div>
                                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-1">{g.guideId}</p>
                                                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-slate-900">{g.name}</h3>
                                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">{g.title}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{g.cert}</p>
                                                <p className="text-xs font-bold text-primary">{g.summits}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 flex-wrap">
                                            {(g.stats ?? []).map((stat: string, j: number) => (
                                                <p key={j} className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">{stat}</p>
                                            ))}
                                        </div>
                                        {(g.whatsappNumber || g.instagramHandle) && (
                                            <div className="flex flex-col gap-2 pt-2 border-t border-zinc-border mt-2">
                                                <p className="text-[9px] font-black uppercase tracking-[0.25em] pt-4 text-slate-400">
                                                    Plan your trek directly
                                                </p>
                                                <div className="flex flex-wrap gap-2">
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
