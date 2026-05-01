'use client';

import {
    Shield, Check, X, Mountain, Compass,
    BedDouble, HelpCircle, ArrowRight, AlertTriangle
} from "lucide-react";
import { PortableText } from "@portabletext/react";
import { sharedMarks } from "@/lib/portableTextComponents";
import { useCurrency } from "@/lib/CurrencyContext";
import TestimonialsCarousel from "./TestimonialsCarousel";
import PackingListCarousel from "./PackingListCarousel";
import PhysicalPrepCarousel from "./PhysicalPrepCarousel";
import GettingThereCarousel from "./GettingThereCarousel";
import FAQAccordion from "./FAQAccordion";
import EnquiryForm from "./EnquiryForm";
import AltitudeChart from "./AltitudeChart";
import ItineraryAccordion from "./ItineraryAccordion";
import TrekGallery from "./TrekGallery";
import Link from "next/link";
import PriceTooltip from "./PriceTooltip";

const includedComponents = {
    block: {
        normal: ({ children }: any) => <p className="text-sm text-slate-700 leading-relaxed mb-3">{children}</p>,
        h3: ({ children }: any) => <h3 className="text-xs font-black uppercase tracking-widest mt-6 mb-3 text-slate-900">{children}</h3>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="space-y-4 mb-3">{children}</ul>,
        number: ({ children }: any) => <ol className="space-y-4 mb-3 pl-4 list-decimal">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: any) => (
            <li className="flex items-start gap-4">
                <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{children}</span>
            </li>
        ),
        number: ({ children }: any) => <li className="text-sm text-slate-700">{children}</li>,
    },
    marks: sharedMarks,
};

const excludedComponents = {
    block: {
        normal: ({ children }: any) => <p className="text-sm text-slate-500 leading-relaxed mb-3">{children}</p>,
        h3: ({ children }: any) => <h3 className="text-xs font-black uppercase tracking-widest mt-6 mb-3 text-slate-400">{children}</h3>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="space-y-4 mb-3">{children}</ul>,
        number: ({ children }: any) => <ol className="space-y-4 mb-3 pl-4 list-decimal">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: any) => (
            <li className="flex items-start gap-4">
                <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-500">{children}</span>
            </li>
        ),
        number: ({ children }: any) => <li className="text-sm text-slate-500">{children}</li>,
    },
    marks: sharedMarks,
};

const nonNegotiablesComponents = {
    block: {
        normal: ({ children }: any) => (
            <p className="text-slate-700 leading-relaxed text-base mb-5">{children}</p>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-lg font-black uppercase tracking-tight mt-8 mb-3 text-slate-900">{children}</h3>
        ),
    },
    list: {
        bullet: ({ children }: any) => <ul className="space-y-3 mb-5 pl-2">{children}</ul>,
        number: ({ children }: any) => <ol className="space-y-3 mb-5 pl-4 list-decimal">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: any) => (
            <li className="flex gap-3 text-slate-700 leading-relaxed text-base">
                <AlertTriangle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{children}</span>
            </li>
        ),
        number: ({ children }: any) => (
            <li className="text-slate-700 leading-relaxed text-base">{children}</li>
        ),
    },
    marks: sharedMarks,
};

interface TrekProps {
    whatsappNumber?: string;
    trek: {
        name: string;
        difficulty: string;
        duration: string;
        priceUSD: number | null;
        priceINR: number | null;
        altitude: string;
        season: string;
        accommodation: string;
        groupSize: string;
        itinerary: { day: string; title: string; content: string }[];
        batches: { date: string; startDate?: string; status: "Open" | "Limited" | "Full"; remaining: number; trekLead?: { name: string; summits?: string; imageUrl?: string } | null }[];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        included: any[];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        excluded: any[];
        altitudeProfile: { day: number; label: string; altitude: number }[];
        packingList: Record<string, string[]>;
        physicalPrep: { weeks: string; focus: string; description: string }[];
        testimonials: { name: string; location: string; rating: number; text: string; batch: string }[];
        gallery: string[];
        gettingThere: { arrival: string; visa: string; domesticFlight: string };
        accommodationDetails: { location: string; type: string; nights: number; notes: string }[];
        permits: { name: string; cost: string; handledBy: string; notes: string }[];
        faqs: { question: string; answer: string }[];
        safetyProtocols?: { title: string; description: string }[];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nonNegotiables?: any[];
        relatedTreks?: { name: string; slug: string; duration: string; altitude: string }[];
        trekLead?: {
            name: string;
            title: string;
            cert: string;
            summits: string;
            imageUrl: string;
            whatsappNumber: string;
            quote: string;
        } | null;
    };
}


export default function TrekDetails({ trek, whatsappNumber = '' }: TrekProps) {
    const { currency, setCurrency, formatPrice, hasBothPrices } = useCurrency();

    return (
        <div className="bg-white">

            {/* ── Quick Stats ── */}
            <section className="w-full border-b border-zinc-border bg-slate-50">
                <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4">
                    {[
                        { label: 'Difficulty', value: trek.difficulty },
                        { label: 'Duration', value: trek.duration },
                        { label: 'Altitude', value: trek.altitude },
                    ].map((stat, index) => (
                        <div
                            key={stat.label}
                            className={`p-6 md:p-12 flex flex-col gap-3 group hover:bg-white transition-colors border-zinc-border ${index === 0 ? 'border-r border-b md:border-b-0' :
                                index === 1 ? 'border-b md:border-b-0 md:border-r' : 'border-b md:border-b-0 md:border-r'
                                }`}
                        >
                            <span className="text-primary font-bold uppercase text-[10px] md:text-xs tracking-widest">{stat.label}</span>
                            <span className="text-2xl md:text-5xl font-black tracking-tighter uppercase break-words md:break-normal">{stat.value}</span>
                        </div>
                    ))}
                    {/* Investment stat — currency-aware */}
                    <div className="p-6 md:p-12 flex flex-col gap-3 group hover:bg-white transition-colors border-zinc-border">
                        <div className="flex items-center gap-2">
                            <span className="text-primary font-bold uppercase text-[10px] md:text-xs tracking-widest">Investment</span>
                            {/* Mobile inline currency toggle — only shown when both prices exist */}
                            {hasBothPrices(trek.priceUSD, trek.priceINR) && (
                                <button
                                    onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
                                    className="md:hidden text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 border border-zinc-300 text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-colors"
                                >
                                    {currency === 'USD' ? '₹' : '$'}
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl md:text-5xl font-black tracking-tighter uppercase break-words md:break-normal">
                                {formatPrice(trek.priceUSD, trek.priceINR)}
                            </span>
                            <PriceTooltip />
                        </div>
                    </div>
                </div>
                {/* Option 2 — slim footnote under the stats bar */}
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-3 border-t border-zinc-border/50">
                    <p className="text-[11px] text-primary font-bold uppercase tracking-widest  italic">* Price applies to batches of 5 or more trekkers. Smaller groups available on request — pricing varies.</p>
                </div>
            </section>

            {/* ── Itinerary + Sidebar ── */}
            <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row">
                {/* Itinerary */}
                <section id="itinerary" style={{ scrollMarginTop: '80px' }} className="flex-1 p-8 md:p-16 xl:p-24 border-r border-zinc-border">
                    <div className="max-w-2xl">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Timeline</span>
                        <h2 className="text-5xl font-black uppercase tracking-tighter mb-12">The Vertical Itinerary</h2>
                        <ItineraryAccordion steps={trek.itinerary} />
                    </div>
                </section>

                {/* Sidebar */}
                <aside className="w-full xl:w-[480px] bg-slate-50">
                    <div className="xl:sticky xl:top-[112px] z-[0]">

                        {/* Safety Protocols */}
                        {trek.safetyProtocols && trek.safetyProtocols.length > 0 && (
                            <div className="p-8 md:p-12 border-b border-zinc-border">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8">Safety Protocols</h3>
                                <div className="space-y-8">
                                    {trek.safetyProtocols.map((protocol, i) => (
                                        <div key={i} className="flex gap-4">
                                            <Shield className="text-primary w-5 h-5 shrink-0" />
                                            <div>
                                                <h4 className="font-bold text-sm uppercase mb-1">{protocol.title}</h4>
                                                <p className="text-xs text-slate-500 leading-relaxed">{protocol.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Upcoming Batches */}
                        <div className="p-8 md:p-12">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8">Upcoming Batches</h3>
                            <div className="space-y-4">
                                {trek.batches.filter(batch => !batch.startDate || new Date(batch.startDate) >= new Date()).map((batch, index) => (
                                    <div key={index} className="bg-white border border-zinc-border p-5 flex flex-col gap-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-sm uppercase">{batch.date}</p>
                                                <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${batch.status === "Open" ? "text-green-600" : "text-amber-600"}`}>
                                                    Status: {batch.status}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold uppercase text-slate-400">Availability</p>
                                                <p className="text-xs font-bold">{batch.remaining} / {trek.groupSize}</p>
                                            </div>
                                        </div>
                                        {batch.trekLead && (
                                            <div className="border-t border-zinc-border pt-3 flex items-center gap-2.5">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-1.5 mb-0.5">
                                                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                                                        </span>
                                                        <p className="special-departure-shimmer text-[9px] font-black uppercase tracking-[0.25em]">Special Departure</p>
                                                    </div>
                                                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Led by</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {batch.trekLead.imageUrl ? (
                                                        <img
                                                            src={batch.trekLead.imageUrl}
                                                            alt={batch.trekLead.name}
                                                            className="w-8 h-8 rounded-full object-cover object-top grayscale border border-zinc-200 shrink-0"
                                                        />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 flex items-center justify-center">
                                                            <span className="text-[11px] font-black text-slate-500">{batch.trekLead.name.charAt(0)}</span>
                                                        </div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-black uppercase tracking-tight text-slate-900 leading-tight">{batch.trekLead.name}</p>
                                                        {batch.trekLead.summits && (
                                                            <p className="text-[9px] font-bold uppercase tracking-wider text-primary leading-tight mt-0.5">{batch.trekLead.summits}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <a
                                            href={whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I'd like to secure a spot for the ${trek.name} Trek — ${batch.date}. Please confirm availability.`)}` : '#enquire'}
                                            target={whatsappNumber ? '_blank' : undefined}
                                            rel={whatsappNumber ? 'noopener noreferrer' : undefined}
                                            className="w-full block text-center bg-slate-900 text-white py-3 text-xs font-black uppercase tracking-widest hover:bg-primary transition-colors"
                                        >
                                            Secure Spot
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-2 text-[10px] text-primary font-bold uppercase leading-relaxed italic">
                                * Prices listed apply to groups of 5+ trekkers. Smaller groups available on request.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>

            {/* ── What's Included / Excluded ── */}
            <section id="included" style={{ scrollMarginTop: '80px' }} className="border-t border-zinc-border">
                <div className="max-w-[1440px] mx-auto">
                    <div className="p-8 md:p-16 border-b border-zinc-border">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Investment Breakdown</span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">What's Included</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Included */}
                        <div className="p-8 md:p-16 border-r border-zinc-border">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-green-600 mb-8">Covered in Your Fee</h3>
                            <PortableText value={trek.included} components={includedComponents} />
                        </div>
                        {/* Excluded */}
                        <div className="p-8 md:p-16 bg-slate-50">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Not Covered</h3>
                            <PortableText value={trek.excluded} components={excludedComponents} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Non-Negotiables ── */}
            {trek.nonNegotiables && trek.nonNegotiables.length > 0 && (
                <section id="non-negotiables" style={{ scrollMarginTop: '80px' }} className="border-t border-zinc-border">
                    <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Expedition Protocol</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Non-Negotiables</h2>
                        <div>
                            <PortableText value={trek.nonNegotiables} components={nonNegotiablesComponents} />
                        </div>
                    </div>
                </section>
            )}

            {/* ── Direct Line ── */}
            <section className="border-t border-zinc-border bg-slate-900 text-white">
                <div className="max-w-[1440px] mx-auto px-8 py-16 md:py-24 flex flex-col items-center text-center">

                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[16px] mb-5 block">Direct Line</span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-6 max-w-2xl">
                        Not our sales team.<br />
                        <span className="text-slate-400">Our trail experts.</span>
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-xl">
                        When you message us, you reach trek leads who have walked this exact route — not a call centre.
                        Gear doubts, fitness questions, altitude concerns — you get a straight answer from people who have been there, done the acclimatisation, and brought every group back safely.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href={whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I've been reading about the ${trek.name} Trek and have a few questions. Can I speak with someone from your trek team?`)}` : '#enquire'}
                            target={whatsappNumber ? '_blank' : undefined}
                            rel={whatsappNumber ? 'noopener noreferrer' : undefined}
                            className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] text-white px-8 py-3.5 text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all duration-200"
                        >
                            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            Message Our Trek Team
                        </a>
                        <a
                            href="#enquire"
                            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-3.5 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-200"
                        >
                            Send a Written Enquiry
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Altitude Profile ── */}
            <section id="altitude" className="border-t border-zinc-border bg-slate-50" style={{ scrollMarginTop: '80px', position: 'relative', zIndex: 0, transform: 'translateZ(0)' }}>
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
                        <div>
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Elevation Map</span>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Altitude Profile</h2>
                        </div>
                        <div className="flex items-center gap-6 text-xs text-slate-500 uppercase font-bold tracking-wider">
                            <span>Max: <span className="text-slate-900">{trek.altitude}</span></span>
                            <Mountain className="w-4 h-4 text-primary" />
                        </div>
                    </div>
                    <div className="bg-white border border-zinc-border p-4 md:p-8">
                        <AltitudeChart data={trek.altitudeProfile} maxAltitude={trek.altitude} />
                    </div>
                </div>
            </section>

            {/* ── Photo Gallery ── */}
            <section id="gallery" className="border-t border-zinc-border" style={{ scrollMarginTop: '80px', position: 'relative', zIndex: 0, transform: 'translateZ(0)' }}>
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">On the Ground</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Trek Gallery</h2>
                    <TrekGallery images={trek.gallery} trekName={trek.name} />
                </div>
            </section>

            {/* ── Testimonials ── */}
            {trek.testimonials?.length > 0 && (
                <section id="reviews" style={{ scrollMarginTop: '80px' }} className="border-t border-zinc-border bg-slate-50">
                    <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Field Reports</span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Trekker Testimonials</h2>
                        <TestimonialsCarousel testimonials={trek.testimonials} />
                    </div>
                </section>
            )}

            {/* ── Getting There ── */}
            <section id="logistics" style={{ scrollMarginTop: '80px' }} className="border-t border-zinc-border">
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Logistics</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Getting There</h2>
                    <GettingThereCarousel gettingThere={trek.gettingThere} />
                </div>
            </section>

            {/* ── Accommodation Details ── */}
            <section id="accommodation" style={{ scrollMarginTop: '80px' }} className="border-t border-zinc-border bg-slate-50">
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Where You Sleep</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Accommodation</h2>
                    <div className="border border-zinc-border bg-white">
                        {/* Header */}
                        <div className="grid grid-cols-12 border-b border-zinc-border bg-slate-900 text-white">
                            <div className="col-span-3 p-3 md:p-4 text-[10px] font-black uppercase tracking-widest">Location</div>
                            <div className="col-span-3 p-3 md:p-4 text-[10px] font-black uppercase tracking-widest">Type</div>
                            <div className="col-span-2 p-3 md:p-4 text-[10px] font-black uppercase tracking-widest">Nights</div>
                            <div className="col-span-4 p-3 md:p-4 text-[10px] font-black uppercase tracking-widest">Notes</div>
                        </div>
                        {trek.accommodationDetails.map((acc, i) => (
                            <div key={i} className={`grid grid-cols-12 border-b border-zinc-border last:border-0 ${i % 2 === 1 ? 'bg-slate-50' : 'bg-white'}`}>
                                <div className="col-span-3 p-3 md:p-5 flex items-center gap-2">
                                    <BedDouble className="w-3.5 h-3.5 text-primary shrink-0 hidden sm:block" />
                                    <span className="font-bold text-xs md:text-sm uppercase tracking-tight">{acc.location}</span>
                                </div>
                                <div className="col-span-3 p-3 md:p-5 flex items-center">
                                    <span className="text-xs md:text-sm text-slate-600">{acc.type}</span>
                                </div>
                                <div className="col-span-2 p-3 md:p-5 flex items-center">
                                    <span className="text-xs md:text-sm font-bold">{acc.nights}</span>
                                </div>
                                <div className="col-span-4 p-3 md:p-5 flex items-center">
                                    <span className="text-xs text-slate-500">{acc.notes}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Permits & Regulations ── */}
            <section className="border-t border-zinc-border">
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Paperwork</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Permits & Regulations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-border border border-zinc-border">
                        {trek.permits.map((p, i) => (
                            <div key={i} className="bg-white p-8 md:p-10">
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <h3 className="font-black uppercase text-sm tracking-tight leading-snug">{p.name}</h3>
                                    <span className="text-primary font-black text-sm shrink-0">{p.cost}</span>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed mb-4">{p.notes}</p>
                                <div className="flex items-center gap-2">
                                    <Check className="w-3 h-3 text-green-600" />
                                    <span className="text-[10px] font-black uppercase tracking-wider text-green-600">Handled by {p.handledBy}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Packing List ── */}
            <section className="border-t border-zinc-border bg-slate-50">
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Gear Guide</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Packing List</h2>
                    <PackingListCarousel packingList={trek.packingList} />
                </div>
            </section>

            {/* ── Physical Preparation ── */}
            <section className="border-t border-zinc-border">
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Training Protocol</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Physical Preparation</h2>
                    <PhysicalPrepCarousel physicalPrep={trek.physicalPrep} />
                </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faqs" style={{ scrollMarginTop: '80px' }} className="border-t border-zinc-border bg-slate-50">
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <div className="flex items-end gap-4 mb-12">
                        <div>
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Common Questions</span>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">FAQ</h2>
                        </div>
                        <HelpCircle className="text-slate-200 w-10 h-10 mb-1.5" />
                    </div>
                    <FAQAccordion faqs={trek.faqs} />
                </div>
            </section>

            {/* ── Trek Comparison CTA ── */}
            {trek.relatedTreks && trek.relatedTreks.length > 0 && (
                <section className="border-t border-zinc-border bg-slate-900 text-white">
                    <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Explore More</span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Compare Expeditions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                            {trek.relatedTreks.map((rt, i) => (
                                <Link key={i} href={`/treks/${rt.slug}`} className="bg-slate-900 border border-white/10 -mt-px -ml-px p-8 md:p-10 hover:bg-slate-800 transition-colors group flex flex-col gap-4">
                                    <h3 className="font-black uppercase text-lg tracking-tight">{rt.name}</h3>
                                    <div className="flex gap-6 text-xs text-slate-400 uppercase font-bold">
                                        <span>{rt.duration}</span>
                                        <span>{rt.altitude}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest mt-auto">
                                        View Trek <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Enquiry Form ── */}
            <section id="enquire" style={{ scrollMarginTop: '80px' }} className="border-t border-zinc-border">
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Custom Dates & Private Groups</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Make an Enquiry</h2>
                    <p className="text-slate-500 text-sm mb-12 max-w-xl">
                        Can't find a batch that suits your schedule? Request a private departure or ask our team anything about {trek.name}.
                    </p>
                    <EnquiryForm trekName={trek.name} whatsappNumber={whatsappNumber} />
                </div>
            </section>

        </div>
    );
}
