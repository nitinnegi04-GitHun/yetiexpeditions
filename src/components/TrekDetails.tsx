import {
    Shield, Activity, Thermometer, Check, X, MapPin, Plane, Mountain,
    BedDouble, FileText, Dumbbell, HelpCircle, ArrowRight, Star
} from "lucide-react";
import FAQAccordion from "./FAQAccordion";
import EnquiryForm from "./EnquiryForm";
import AltitudeChart from "./AltitudeChart";
import ItineraryAccordion from "./ItineraryAccordion";
import Link from "next/link";

interface TrekProps {
    trek: {
        name: string;
        difficulty: string;
        duration: string;
        investment: string;
        altitude: string;
        season: string;
        accommodation: string;
        groupSize: string;
        itinerary: { day: string; title: string; content: string }[];
        batches: { date: string; status: "Open" | "Limited" | "Full"; remaining: number }[];
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
    };
}


export default function TrekDetails({ trek }: TrekProps) {
    return (
        <div className="bg-white">

            {/* ── Quick Stats ── */}
            <section className="border-b border-zinc-border bg-slate-50">
                <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4">
                    <div className="p-8 border-r border-zinc-border border-b lg:border-b-0 space-y-1">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Difficulty</p>
                        <p className="text-xl font-bold uppercase tracking-tight">{trek.difficulty}</p>
                    </div>
                    <div className="p-8 lg:border-r border-zinc-border border-b lg:border-b-0 space-y-1">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Duration</p>
                        <p className="text-xl font-bold uppercase tracking-tight">{trek.duration}</p>
                    </div>
                    <div className="p-8 border-r border-zinc-border space-y-1">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Investment</p>
                        <p className="text-xl font-bold uppercase tracking-tight">{trek.investment}</p>
                    </div>
                    <div className="p-8 space-y-1">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Altitude</p>
                        <p className="text-xl font-bold uppercase tracking-tight">{trek.altitude}</p>
                    </div>
                </div>
            </section>

            {/* ── Itinerary + Sidebar ── */}
            <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row">
                {/* Itinerary */}
                <section className="flex-1 p-8 md:p-16 xl:p-24 border-r border-zinc-border">
                    <div className="max-w-2xl">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Timeline</span>
                        <h2 className="text-5xl font-black uppercase tracking-tighter mb-12">The Vertical Itinerary</h2>
                        <ItineraryAccordion steps={trek.itinerary} />
                    </div>
                </section>

                {/* Sidebar */}
                <aside className="w-full xl:w-[480px] bg-slate-50">
                    <div className="sticky top-[88px]">
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
                                {trek.batches.map((batch, index) => (
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
                                        <button className="w-full bg-slate-900 text-white py-3 text-xs font-black uppercase tracking-widest hover:bg-primary transition-colors">
                                            Secure Spot
                                        </button>
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
            <section className="border-t border-zinc-border">
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

            {/* ── Altitude Profile ── */}
            <section className="border-t border-zinc-border bg-slate-50">
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
            <section className="border-t border-zinc-border">
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">On the Ground</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Trek Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {trek.gallery.map((img, i) => (
                            <div
                                key={i}
                                className={`overflow-hidden bg-slate-100 ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                                style={{ aspectRatio: i === 0 ? '16/9' : '4/3' }}
                            >
                                <img
                                    src={img}
                                    alt={`${trek.name} trek photo ${i + 1}`}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="border-t border-zinc-border bg-slate-50">
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Field Reports</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Trekker Testimonials</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-border">
                        {trek.testimonials.map((t, i) => (
                            <div key={i} className="bg-white p-8 md:p-10 flex flex-col gap-6">
                                <div className="flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, s) => (
                                        <Star key={s} className={`w-3.5 h-3.5 ${s < t.rating ? 'text-primary fill-primary' : 'text-slate-200 fill-slate-200'}`} />
                                    ))}
                                </div>
                                <blockquote className="text-sm text-slate-700 leading-relaxed flex-1">
                                    &ldquo;{t.text}&rdquo;
                                </blockquote>
                                <div className="border-t border-zinc-border pt-6">
                                    <p className="font-black uppercase text-sm tracking-tight">{t.name}</p>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">{t.location}</p>
                                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">{t.batch}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Getting There ── */}
            <section className="border-t border-zinc-border">
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Logistics</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Getting There</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-border border border-zinc-border">
                        <div className="bg-white p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-6">
                                <MapPin className="text-primary w-5 h-5 shrink-0" />
                                <h3 className="text-xs font-black uppercase tracking-[0.2em]">Arrival & Transfer</h3>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{trek.gettingThere.arrival}</p>
                        </div>
                        <div className="bg-slate-50 p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="text-primary w-5 h-5 shrink-0" />
                                <h3 className="text-xs font-black uppercase tracking-[0.2em]">Visa</h3>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{trek.gettingThere.visa}</p>
                        </div>
                        <div className="bg-white p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-6">
                                <Plane className="text-primary w-5 h-5 shrink-0" />
                                <h3 className="text-xs font-black uppercase tracking-[0.2em]">Domestic Flight</h3>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{trek.gettingThere.domesticFlight}</p>
                        </div>
                    </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-zinc-border border border-zinc-border">
                        {Object.entries(trek.packingList).map(([category, items]) => (
                            <div key={category} className="bg-white p-8">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6">{category}</h3>
                                <ul className="space-y-3">
                                    {items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-xs text-slate-600">
                                            <span className="w-1 h-1 bg-slate-300 rounded-full shrink-0 mt-1.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Physical Preparation ── */}
            <section className="border-t border-zinc-border">
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Training Protocol</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">Physical Preparation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-zinc-border border border-zinc-border">
                        {trek.physicalPrep.map((phase, i) => (
                            <div key={i} className={`p-8 md:p-10 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <Dumbbell className="text-primary w-4 h-4 shrink-0" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{phase.weeks}</span>
                                </div>
                                <h3 className="font-black uppercase text-base tracking-tight mb-4">{phase.focus}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{phase.description}</p>
                                <div className="mt-6 text-[10px] font-black uppercase tracking-widest text-slate-200">
                                    {(i + 1).toString().padStart(2, '0')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="border-t border-zinc-border bg-slate-50">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-white/10">
                            {trek.relatedTreks.map((rt, i) => (
                                <Link key={i} href={`/treks/${rt.slug}`} className="bg-slate-900 p-8 md:p-10 hover:bg-slate-800 transition-colors group flex flex-col gap-4">
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
            <section className="border-t border-zinc-border">
                <div className="max-w-[1440px] mx-auto p-8 md:p-16">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Custom Dates & Private Groups</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Make an Enquiry</h2>
                    <p className="text-slate-500 text-sm mb-12 max-w-xl">
                        Can't find a batch that suits your schedule? Request a private departure or ask our team anything about {trek.name}.
                    </p>
                    <EnquiryForm trekName={trek.name} />
                </div>
            </section>

        </div>
    );
}
