'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { highlightSweep } from "@/lib/highlightStyle";
import { useCurrency } from "@/lib/CurrencyContext";

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
    trekLead?: TrekLead | null
}

type Trek = {
    slug: string
    name: string
    region: string
    difficulty: string
    duration: string
    altitude: string
    priceUSD: number | null
    priceINR: number | null
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
    const { currency, setCurrency, formatPrice, hasBothPrices } = useCurrency();

    const monthTreks = treks.flatMap(trek => {
        const batch = trek.batches.find(b => b.month === selectedMonth);
        if (!batch) return [];
        const effectiveLead = batch.trekLead ?? trek.trekLead ?? null;
        return [{ ...trek, activeBatch: batch, effectiveLead }];
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
                                <div className="flex items-center gap-3 flex-1 min-w-0 md:justify-center">
                                    <div className="text-left md:text-center">
                                        <div className="inline-block mb-2">
                                            <span className="font-black text-slate-900 uppercase tracking-wide text-[18px] md:text-xl">
                                                TALK TO THE GUIDE.{" "}
                                                <span style={highlightSweep()}>NOT THE SALES TEAM.</span>
                                            </span>
                                            <span
                                                className="block bg-primary"
                                                style={{
                                                    height: '2px',
                                                    width: '0%',
                                                    animation: 'headline-underline 0.6s ease 900ms 1 forwards',
                                                }}
                                            />
                                        </div>
                                        <p className="text-[14px] text-slate-500 leading-relaxed">
                                            Most companies hide their guides behind a sales team. We don&apos;t. <span className="font-bold text-black text-[16px] italic" style={highlightSweep()}>Your trek lead   </span> is your first point of contact — because the best person to answer your questions is the one who&apos;s actually been there.
                                        </p>
                                    </div>
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
                                                {trek.effectiveLead && (
                                                    <div className="flex flex-col gap-2 flex-1 pr-3 border-r border-zinc-border/50">
                                                        {/* Image + Name row */}
                                                        <div className="flex items-center gap-2">
                                                            {trek.effectiveLead.imageUrl && (
                                                                <div className="relative shrink-0" style={{ width: 60, height: 60, minWidth: 60, borderRadius: '50%' }}>
                                                                    <img
                                                                        src={trek.effectiveLead.imageUrl}
                                                                        alt={trek.effectiveLead.name}
                                                                        style={{ width: 60, height: 60, borderRadius: '50%' }}
                                                                        className="object-cover object-top border-2 border-white shadow grayscale brightness-90 contrast-110"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="min-w-0">
                                                                <p className="text-xs font-black uppercase tracking-tight text-slate-900 truncate">{trek.effectiveLead.name}</p>
                                                                {trek.effectiveLead.summits && (
                                                                    <p className="text-[9px] font-bold text-primary uppercase tracking-wider break-words">{trek.effectiveLead.summits}</p>
                                                                )}
                                                                {trek.effectiveLead.quote && (
                                                                    <p className="mt-0.5 text-[8px] text-slate-500 italic leading-relaxed">&ldquo;{trek.effectiveLead.quote}&rdquo;</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* WhatsApp button */}
                                                        {trek.effectiveLead.whatsappNumber && (
                                                            <a
                                                                href={`https://wa.me/${trek.effectiveLead.whatsappNumber}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center justify-center gap-1.5 w-full px-2 py-1.5 text-[8px] font-black uppercase tracking-[0.15em] text-green-700 bg-green-50 border border-green-200"
                                                            >
                                                                <svg className="w-3 h-3 shrink-0 fill-green-700" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                                                Chat with {trek.effectiveLead.name.split(' ')[0]}
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
                                                    <div className="min-w-0">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Diff</p>
                                                        <p className={`text-[10px] font-bold uppercase truncate ${trek.difficulty === "Difficult" ? "text-primary" : "text-amber-600"}`}>{trek.difficulty}</p>
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
                                                {trek.effectiveLead && (
                                                    <>
                                                        {trek.effectiveLead.imageUrl && (
                                                            <div className="relative shrink-0" style={{ width: 72, height: 72, borderRadius: '50%' }}>
                                                                <img
                                                                    src={trek.effectiveLead.imageUrl}
                                                                    alt={trek.effectiveLead.name}
                                                                    style={{ width: 72, height: 72, borderRadius: '50%' }}
                                                                    className="object-cover object-top border-2 border-white shadow grayscale brightness-90 contrast-110"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-xs font-black uppercase tracking-tight text-slate-900 truncate">{trek.effectiveLead.name}</p>
                                                            {trek.effectiveLead.summits && (
                                                                <p className="text-[9px] font-bold text-primary uppercase tracking-wider break-words">{trek.effectiveLead.summits}</p>
                                                            )}
                                                            {trek.effectiveLead.quote && (
                                                                <p className="mt-1.5 border-l-2 border-slate-200 pl-2 text-[10px] text-slate-500 italic leading-relaxed">&ldquo;{trek.effectiveLead.quote}&rdquo;</p>
                                                            )}
                                                            {trek.effectiveLead.whatsappNumber && (
                                                                <a
                                                                    href={`https://wa.me/${trek.effectiveLead.whatsappNumber}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-green-700 bg-green-50 border border-green-200"
                                                                >
                                                                    <svg className="w-3.5 h-3.5 shrink-0 fill-green-700" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                                                    Chat with {trek.effectiveLead.name.split(' ')[0]}
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
                                                    {formatPrice(trek.priceUSD, trek.priceINR)}
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
                                                <div className="flex items-center gap-2">
                                                    <p className="text-xl font-black tracking-tight">
                                                        {formatPrice(trek.priceUSD, trek.priceINR)}
                                                    </p>
                                                    {/* Mobile inline currency toggle — only shown when both prices exist */}
                                                    {hasBothPrices(trek.priceUSD, trek.priceINR) && (
                                                        <button
                                                            onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
                                                            className="text-[8px] font-black uppercase tracking-widest px-1.5 py-1 border border-zinc-300 text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-colors"
                                                        >
                                                            {currency === 'USD' ? '₹' : '$'}
                                                        </button>
                                                    )}
                                                </div>
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
