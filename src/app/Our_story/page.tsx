import { ArrowRight, MessageCircle, ExternalLink, Instagram } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries/aboutPage";

export const revalidate = 86400

const FALLBACK_LEFT_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4"
const FALLBACK_GUIDE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4"

export default async function AboutPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d: any = await client.fetch(ABOUT_PAGE_QUERY)

    // ── Left Panel ───────────────────────────────────────────────────────────────
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

    // ── Guides (filter hidden) ───────────────────────────────────────────────────
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
            <div className="flex">

                {/* ── Left: Fixed Image Panel ── */}
                <div className="hidden lg:block w-[50%] shrink-0">
                    <div className="sticky top-[60px] h-[calc(100vh-60px)]">
                        <div className="relative w-full h-full overflow-hidden">
                            <img
                                src={panelImageUrl}
                                alt="Yeti Expeditions — High Himalaya"
                                className="w-full h-full object-cover grayscale"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />

                            {/* Vertical text — left edge */}
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
                                <div className="w-px h-16 bg-white/20" />
                                <span
                                    className="text-[9px] font-black uppercase tracking-[0.35em] text-white/30"
                                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                                >
                                    Yeti Expeditions
                                </span>
                                <div className="w-px h-16 bg-white/20" />
                            </div>

                            {/* Bottom-left: Identifier */}
                            <div className="absolute bottom-0 left-0 p-8 md:p-10">
                                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-primary mb-2">
                                    Expedition Identifier
                                </p>
                                <p className="text-3xl font-black uppercase tracking-tighter leading-none text-white">
                                    {city}
                                </p>
                                <p className="text-3xl font-black uppercase tracking-tighter leading-none text-white/30">
                                    {country} · {year}
                                </p>
                            </div>

                            {/* Bottom-right: Stats */}
                            <div className="absolute bottom-0 right-0 p-8 md:p-10 text-right space-y-1.5">
                                {stats.slice(0, 3).map((s: { value: string; label: string }, i: number) => (
                                    <p key={i} className="text-[9px] font-mono text-white/40 uppercase tracking-wider">
                                        {s.label.toUpperCase()}: {s.value}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right: Scrollable Content ── */}
                <div className="w-full lg:w-[50%] flex flex-col border-l border-zinc-border">

                    {/* ── Section 1: Hero ── */}
                    <section className="px-8 md:px-12 pt-16 pb-20 border-b border-zinc-border">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-8">
                            ▪ {heroBadge}
                        </span>
                        <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-10">
                            <span className="text-slate-900">{heroLine1}</span>
                            <br />
                            <span className="text-slate-300">{heroLine2}</span>
                            <br />
                            <span className="text-slate-900">{heroLine3}</span>
                        </h1>
                        <blockquote className="border-l-2 border-primary pl-6">
                            <p className="text-lg md:text-xl font-light italic text-slate-600 leading-relaxed">
                                &ldquo;{heroQuote}&rdquo;
                            </p>
                        </blockquote>
                    </section>

                    {/* ── Section 2: The Founding ── */}
                    <section className="px-8 md:px-12 py-16 border-b border-zinc-border bg-white">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">
                            {foundingTagline}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-10 text-slate-900">
                            {foundingHeading}
                        </h2>
                        <div className="space-y-6 text-sm text-slate-600 leading-relaxed max-w-lg">
                            {paragraphs.map((para: string, i: number) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </section>

                    {/* ── Section 3: By The Numbers ── */}
                    <section className="border-b border-zinc-border bg-slate-50">
                        <div className="px-8 md:px-12 pt-12 pb-6">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-2">
                                Field Data
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900">
                                By The Numbers
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 border-t border-zinc-border">
                            {stats.map((s: { value: string; label: string }, i: number) => (
                                <div
                                    key={i}
                                    className={`p-8 md:p-10 border-zinc-border
                    ${i % 2 === 0 ? 'border-r' : ''}
                    ${i < 2 ? 'border-b' : ''}
                  `}
                                >
                                    <p className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-2">{s.value}</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Section 4: The Sherpa Code ── */}
                    <section className="px-8 md:px-12 py-16 border-b border-zinc-border bg-white">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">
                            {philTagline}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-12 text-slate-900">
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
                    </section>

                    {/* ── Section 5: Our Guides ── */}
                    <section className="border-b border-zinc-border bg-slate-50">
                        <div className="px-8 md:px-12 pt-16 pb-8">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">
                                {guidesTagline}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900">
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
                                        {/* Guide photo */}
                                        <div className="w-40 md:w-56 shrink-0 relative overflow-hidden">
                                            <img
                                                src={guideImageUrl}
                                                alt={g.name}
                                                className="w-full h-full object-cover grayscale object-top"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-50/60" />
                                        </div>

                                        {/* Guide info */}
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

                                            {/* Contact buttons */}
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
                                                                className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-3 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-colors group/wa"
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
                                                                className="inline-flex items-center gap-2 border border-slate-200 text-slate-500 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] hover:border-slate-900 hover:text-slate-900 transition-colors group/ig"
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
                    </section>

                    {/* ── Section 6: Why Yeti ── */}
                    <section className="px-8 md:px-12 py-16 border-b border-zinc-border bg-white">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">
                            {whyTagline}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-10 text-slate-900">
                            {whyHeading}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-border border border-zinc-border">
                            {differentiators.map((item: { title: string; body: string }, i: number) => (
                                <div key={i} className="bg-slate-50 p-7 md:p-8">
                                    <h3 className="font-black uppercase text-sm tracking-tight mb-3 text-primary">{item.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Section 7: CTA ── */}
                    <section className="px-8 md:px-12 py-20 bg-slate-900">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-8">
                            ▪ {ctaBadge}
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-10">
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
                    </section>

                </div>
            </div>
            <Footer />
        </div>
    );
}
