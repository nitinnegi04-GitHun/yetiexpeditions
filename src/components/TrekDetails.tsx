'use client';

import {
    Shield, Activity, Thermometer, Check, X, Mountain,
    BedDouble, HelpCircle, ArrowRight, MessageCircle
} from "lucide-react";
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
        batches: { date: string; startDate?: string; status: "Open" | "Limited" | "Full"; remaining: number }[];
        included: string[];
        excluded: string[];
        altitudeProfile: { day: number; label: string; altitude: number }[];
        packingList: Record<string, string[]>;
        physicalPrep: { weeks: string; focus: string; description: string }[];
        testimonials: { name: string; location: string; rating: number; text: string; batch: string }[];
        gallery: string[];
        gettingThere: { arrival: string; visa: string; domesticFlight: string };
        accommodationDetails: { location: string; type: string; nights: number; notes: string }[];
        permits: { name: string; cost: string; handledBy: string; notes: string }[];
        faqs: { question: string; answer: string }[];
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
                        <span className="text-2xl md:text-5xl font-black tracking-tighter uppercase break-words md:break-normal">
                            {formatPrice(trek.priceUSD, trek.priceINR)}
                        </span>
                    </div>
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

                        {/* ── Trek Lead Card ── */}
                        {trek.trekLead && (
                            <div className="p-8 md:p-12 border-b border-zinc-border bg-white">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8">Your Trek Lead</h3>
                                <div className="flex items-start gap-2">
                                    {trek.trekLead.imageUrl && (
                                        <img
                                            src={trek.trekLead.imageUrl}
                                            alt={trek.trekLead.name}
                                            className="w-24 h-24 object-cover object-top shrink-0 grayscale"
                                        />
                                    )}
                                    <div className="min-w-0">
                                        <p className="font-black uppercase text-sm tracking-tight leading-tight">{trek.trekLead.name}</p>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">{trek.trekLead.title}</p>
                                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                                            {trek.trekLead.cert && (
                                                <span className="text-[9px] font-black uppercase tracking-widest text-primary">{trek.trekLead.cert}</span>
                                            )}
                                            {trek.trekLead.summits && (
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{trek.trekLead.summits}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {trek.trekLead.quote && (
                                    <blockquote className="mt-6 text-xs text-slate-600 leading-relaxed italic border-l-2 border-primary pl-4">
                                        &ldquo;{trek.trekLead.quote}&rdquo;
                                    </blockquote>
                                )}
                                <a
                                    href={`https://wa.me/${trek.trekLead.whatsappNumber || whatsappNumber}?text=${encodeURIComponent(`Hi ${trek.trekLead.name}! I'm looking at the ${trek.name} Trek and have a few questions. Can we chat?`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 w-full flex items-center justify-center gap-2.5 bg-[#25D366] text-white py-3.5 text-xs font-black uppercase tracking-widest hover:brightness-95 transition-all"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Chat with {trek.trekLead.name.split(' ')[0]} on WhatsApp
                                </a>
                            </div>
                        )}

                        {/* Safety Protocols */}
                        <div className="p-8 md:p-12 border-b border-zinc-border">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8">Safety Protocols</h3>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <Shield className="text-primary w-5 h-5 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-sm uppercase mb-1">WFR Certified Guides</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">Lead guides hold Wilderness First Responder certifications.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Activity className="text-primary w-5 h-5 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-sm uppercase mb-1">Oximetry Checks</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">Twice-daily blood oxygen and pulse monitoring for acclimatization.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Thermometer className="text-primary w-5 h-5 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-sm uppercase mb-1">Oxygen Support</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">Bottled oxygen carried on all high-altitude sections for emergencies.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

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
                            <p className="mt-8 text-[10px] text-slate-400 uppercase leading-relaxed italic">
                                * All participants undergo mandatory fitness vetting before confirmation.
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
                            <ul className="space-y-4">
                                {trek.included.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Excluded */}
                        <div className="p-8 md:p-16 bg-slate-50">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Not Covered</h3>
                            <ul className="space-y-4">
                                {trek.excluded.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-500">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Ask the Expert ── */}
            {trek.trekLead && (
                <section className="border-t border-zinc-border bg-slate-900 text-white">
                    <div className="max-w-[1440px] mx-auto p-8 md:p-16 flex justify-center">
                        <div className="flex flex-col md:flex-row items-left gap-10 md:gap-16 max-w-3xl w-full">
                            {trek.trekLead.imageUrl && (
                                <img
                                    src={trek.trekLead.imageUrl}
                                    alt={trek.trekLead.name}
                                    className="w-full h-80 md:w-80 md:h-[380px] object-cover object-top grayscale opacity-70 shrink-0"
                                />
                            )}
                            {/* Copy + CTA */}
                            <div className="flex flex-col gap-6">
                                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Direct Line</span>
                                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight">
                                    Questions about the route?<br />
                                    <span className="text-slate-400">Ask {trek.trekLead.name.split(' ')[0]} directly.</span>
                                </h2>
                                <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
                                    {trek.trekLead.name} has led this route countless times. Gear concerns, fitness doubts,
                                    altitude worries — message them on WhatsApp and get a straight answer from the field.
                                </p>
                                <div className="flex flex-row gap-3 mt-2">
                                    <a
                                        href={`https://wa.me/${trek.trekLead.whatsappNumber || whatsappNumber}?text=${encodeURIComponent(`Hi ${trek.trekLead.name}! I've been reading about the ${trek.name} Trek. Can you answer a few questions before I commit?`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#25D366] text-white px-4 py-3 text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all duration-200"
                                    >
                                        Message {trek.trekLead.name.split(' ')[0]} on WhatsApp
                                    </a>
                                    <a
                                        href="#enquire"
                                        className="flex-1 inline-flex items-center justify-center gap-2 border border-white/20 text-white px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-200"
                                    >
                                        Send a Written Enquiry
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

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
            <section id="reviews" style={{ scrollMarginTop: '80px' }} className="border-t border-zinc-border bg-slate-50">
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Field Reports</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Trekker Testimonials</h2>
                    <TestimonialsCarousel testimonials={trek.testimonials} />
                </div>
            </section>

            {/* ── Getting There ── */}
            <section id="logistics" style={{ scrollMarginTop: '80px' }} className="border-t border-zinc-border">
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Logistics</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Getting There</h2>
                    <GettingThereCarousel gettingThere={trek.gettingThere} />
                </div>
            </section>

            {/* ── Accommodation Details ── */}
            <section className="border-t border-zinc-border bg-slate-50">
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
