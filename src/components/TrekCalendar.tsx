'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, MessageCircle, Instagram } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type TrekLead = {
    name: string
    title: string
    cert: string
    summits: string
    stats: string[]
    imageUrl: string
    whatsappNumber?: string
    instagramHandle?: string
    quote?: string
}

type Batch = {
    month: string
    dates: string
    status: 'Open' | 'Limited' | 'Full'
    booked: number
    capacity: number
}

type Trek = {
    slug: string
    name: string
    region: string
    difficulty: string
    duration: string
    altitude: string
    price: string
    batches: Batch[]
    trekLead?: TrekLead | null
}

const STATUS_STYLES = {
    Open: "text-green-700 bg-green-50 border-green-200",
    Limited: "text-amber-700 bg-amber-50 border-amber-200",
    Full: "text-red-700 bg-red-50 border-red-200",
};

export default function TrekCalendar({ treks }: { treks: Trek[] }) {
    const activeMonths = new Set(treks.flatMap(t => t.batches.map(b => b.month)));
    const firstActive = MONTHS.find(m => activeMonths.has(m)) ?? "Mar";
    const [selectedMonth, setSelectedMonth] = useState(firstActive);

    const monthTreks = treks.flatMap(trek => {
        const batch = trek.batches.find(b => b.month === selectedMonth);
        return batch ? [{ ...trek, activeBatch: batch }] : [];
    });

    return (
        <section className="w-full border-t border-zinc-border bg-slate-50">
            <div className="max-w-[1440px] mx-auto">

                {/* Section Header */}
                <div className="px-6 md:px-12 pt-16 pb-10 border-b border-zinc-border">
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-3">
                        Trek Calendar
                    </span>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                            Plan by<br />
                            <span className="text-slate-300">Season</span>
                        </h2>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                            Select a month to see all available departures. Batch sizes are capped at 8 — early booking is advised.
                        </p>
                    </div>
                </div>

                {/* Month Selector */}
                <div className="border-b border-zinc-border overflow-x-auto">
                    <div className="flex min-w-max">
                        {MONTHS.map((month) => {
                            const hasTreks = activeMonths.has(month);
                            const isSelected = selectedMonth === month;
                            return (
                                <button
                                    key={month}
                                    onClick={() => hasTreks && setSelectedMonth(month)}
                                    disabled={!hasTreks}
                                    className={`relative flex flex-col items-center gap-1 px-6 md:px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] border-r border-zinc-border transition-colors flex-1 min-w-[72px]
                                        ${isSelected
                                            ? "bg-slate-900 text-white"
                                            : hasTreks
                                                ? "bg-white text-slate-700 hover:bg-slate-100"
                                                : "bg-slate-50 text-slate-300 cursor-not-allowed"
                                        }`}
                                >
                                    {month}
                                    {hasTreks && (
                                        <span className={`w-1 h-1 rounded-full ${isSelected ? "bg-primary" : "bg-primary/40"}`} />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Trek Cards */}
                <div className="px-6 md:px-12 pt-6 pb-12">
                    {monthTreks.length === 0 ? (
                        <div className="py-20 flex flex-col items-center gap-4 text-center">
                            <CalendarDays className="w-10 h-10 text-slate-200" />
                            <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                                No departures scheduled for {selectedMonth}
                            </p>
                            <p className="text-xs text-slate-400 max-w-xs">
                                Our expedition season runs Mar–May and Oct–Dec for Himalayan treks, Jun–Sep for Ladakh.
                            </p>
                        </div>
                    ) : (
                        <>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                                <span className="text-md text-primary">{monthTreks.length} expedition{monthTreks.length !== 1 ? "s" : ""}</span> departing in {selectedMonth} 2025
                            </p>

                            {/* Editorial nudge strip */}
                            <div className="border border-zinc-border bg-white px-4 md:px-6 py-3 md:py-4 flex items-center gap-4 mb-4">
                                <div className="w-0.5 self-stretch bg-primary shrink-0" />
                                <div className="flex items-center gap-3 flex-1 min-w-0 md:justify-center">
                                    <MessageCircle className="nudge-icon w-4 h-4 md:w-5 md:h-5 shrink-0 text-slate-400" />
                                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed text-left md:text-center">
                                        <span className="nudge-highlight font-black text-slate-900 uppercase tracking-wide">Skip the sales pitch.</span>{" "}
                                        Every question about a trek is best answered by the person who&apos;s actually done it — talk to your Trail Expert directly, not our sales team, before you decide.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col border border-zinc-border bg-white shadow-sm">
                                {monthTreks.map((trek, index) => (
                                    <div key={trek.slug} className={`group hover:bg-slate-50 transition-colors ${index !== monthTreks.length - 1 ? "border-b border-zinc-border" : ""}`}>
                                        {/* ── Desktop: 3-col grid ── Mobile: stacked card ── */}
                                        <div className="trek-card-row items-stretch p-5 md:p-6 lg:p-0">

                                            {/* Col 1 — Region, Name, Dates */}
                                            <div className="flex flex-col justify-center min-w-0 lg:px-6 lg:py-6 mb-3 lg:mb-0">
                                                <div className="flex items-start justify-between gap-4 mb-2">
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-[9px] lg:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">{trek.region}</p>
                                                        <h3 className="text-xl lg:text-lg font-black uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">{trek.name}</h3>
                                                    </div>
                                                    <span className={`lg:hidden shrink-0 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 border ${STATUS_STYLES[trek.activeBatch.status]}`}>
                                                        {trek.activeBatch.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <CalendarDays className="w-3.5 h-3.5 text-primary shrink-0" />
                                                    <span className="text-xs font-bold uppercase tracking-tight">{trek.activeBatch.dates}</span>
                                                </div>
                                            </div>

                                            {/* Mobile middle row: Trail Expert + Stats side by side, full width */}
                                            <div className="lg:hidden flex flex-row w-full gap-0 border-t border-zinc-border/50 pt-3 mb-3">
                                                {/* Trail Expert — left half */}
                                                {trek.trekLead && (
                                                    <div className="flex flex-col gap-2 flex-1 pr-3 border-r border-zinc-border/50">
                                                        {/* Image + Name row */}
                                                        <div className="flex items-center gap-2">
                                                            {trek.trekLead.imageUrl && (
                                                                <div className="relative shrink-0" style={{ width: 60, height: 60, minWidth: 60, borderRadius: '50%' }}>
                                                                    <img
                                                                        src={trek.trekLead.imageUrl}
                                                                        alt={trek.trekLead.name}
                                                                        style={{ width: 60, height: 60, borderRadius: '50%' }}
                                                                        className="object-cover object-top border-2 border-white shadow"
                                                                    />
                                                                    <div className="absolute inset-0" style={{ borderRadius: '50%', backgroundColor: 'rgba(100,100,100,0.25)' }} />
                                                                </div>
                                                            )}
                                                            <div className="min-w-0">
                                                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Your Direct Contact</p>
                                                                <p className="text-xs font-black uppercase tracking-tight text-slate-900 truncate">{trek.trekLead.name}</p>
                                                                {trek.trekLead.summits && (
                                                                    <p className="text-[9px] font-bold text-primary uppercase tracking-wider break-words">{trek.trekLead.summits}</p>
                                                                )}
                                                                {trek.trekLead.quote && (
                                                                    <p className="mt-0.5 text-[8px] text-slate-500 italic leading-relaxed">&ldquo;{trek.trekLead.quote}&rdquo;</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* Chat button — full width row below */}
                                                        {trek.trekLead.whatsappNumber && (
                                                            <a
                                                                href={`https://wa.me/${trek.trekLead.whatsappNumber}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center justify-center gap-1 w-full bg-slate-900 text-white px-2 py-1.5 text-[8px] font-black uppercase tracking-[0.15em] hover:bg-primary transition-colors"
                                                            >
                                                                <MessageCircle className="w-2.5 h-2.5 text-green-400 shrink-0" />
                                                                Chat with {trek.trekLead.name.split(' ')[0]}
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                                {/* Stats — right half */}
                                                <div className="flex flex-wrap gap-x-3 gap-y-1 flex-1 pl-3 content-start">
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Dur</p>
                                                        <p className="text-xs font-bold uppercase">{trek.duration}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Diff</p>
                                                        <p className={`text-xs font-bold uppercase ${trek.difficulty === "Difficult" ? "text-primary" : "text-amber-600"}`}>{trek.difficulty}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Alt</p>
                                                        <p className="text-xs font-bold uppercase">{trek.altitude}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Seats</p>
                                                        <p className="text-xs font-bold uppercase">{trek.activeBatch.booked}/{trek.activeBatch.capacity}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Col 2 — Trail Expert (desktop only) */}
                                            <div className="flex max-lg:hidden items-center gap-3 overflow-hidden px-6 border-l border-zinc-border/50">
                                                {trek.trekLead && (
                                                    <>
                                                        {trek.trekLead.imageUrl && (
                                                            <div className="relative shrink-0" style={{ width: 100, height: 100, borderRadius: '50%' }}>
                                                                <img
                                                                    src={trek.trekLead.imageUrl}
                                                                    alt={trek.trekLead.name}
                                                                    style={{ width: 100, height: 100, borderRadius: '50%' }}
                                                                    className="object-cover object-top border-2 border-white shadow"
                                                                />
                                                                <div className="absolute inset-0" style={{ borderRadius: '50%', backgroundColor: 'rgba(109, 106, 106, 0.25)' }} />
                                                            </div>
                                                        )}
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary mb-0.5">Your Direct Contact</p>
                                                            <p className="text-xs font-black uppercase tracking-tight text-slate-900 truncate">{trek.trekLead.name}</p>
                                                            {trek.trekLead.summits && (
                                                                <p className="text-[9px] font-bold text-primary uppercase tracking-wider break-words">{trek.trekLead.summits}</p>
                                                            )}
                                                            {trek.trekLead.quote && (
                                                                <p className="mt-1 text-[9px] text-slate-500 italic leading-relaxed">&ldquo;{trek.trekLead.quote}&rdquo;</p>
                                                            )}
                                                            {trek.trekLead.whatsappNumber && (
                                                                <a
                                                                    href={`https://wa.me/${trek.trekLead.whatsappNumber}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="mt-2 inline-flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] hover:bg-primary transition-colors"
                                                                >
                                                                    <MessageCircle className="w-3 h-3 text-green-400 shrink-0" />
                                                                    Chat with {trek.trekLead.name.split(' ')[0]}
                                                                </a>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            {/* Col 3 — Stats + Price + CTA in single row — desktop only */}
                                            <div className="flex max-lg:hidden items-center gap-6 justify-end pl-6 pr-6 border-l border-zinc-border/50">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Duration</p>
                                                    <p className="text-xs font-bold uppercase">{trek.duration}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Difficulty</p>
                                                    <p className={`text-xs font-bold uppercase ${trek.difficulty === "Difficult" ? "text-primary" : "text-amber-600"}`}>{trek.difficulty}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Altitude</p>
                                                    <p className="text-xs font-bold uppercase">{trek.altitude}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Booked</p>
                                                    <p className="text-xs font-bold uppercase">{trek.activeBatch.booked} / {trek.activeBatch.capacity}</p>
                                                </div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border shrink-0 ${STATUS_STYLES[trek.activeBatch.status]}`}>
                                                    {trek.activeBatch.status}
                                                </span>
                                                <p className="text-xl font-black tracking-tight shrink-0">
                                                    {trek.price}
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase ml-1">USD</span>
                                                </p>
                                                <Link
                                                    href={`/treks/${trek.slug}`}
                                                    className="inline-flex items-center px-5 py-3 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors group/link shrink-0"
                                                >
                                                    View
                                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                                                </Link>
                                            </div>

                                            {/* Mobile bottom row: Price + CTA */}
                                            <div className="lg:hidden flex items-center justify-between w-full border-t border-zinc-border/50 pt-3">
                                                <p className="text-xl font-black tracking-tight">
                                                    {trek.price}
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase ml-1">USD</span>
                                                </p>
                                                <Link
                                                    href={`/treks/${trek.slug}`}
                                                    className="inline-flex items-center gap-2 px-5 py-3 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors group/link shrink-0"
                                                >
                                                    View
                                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

            </div>
        </section>
    );
}
