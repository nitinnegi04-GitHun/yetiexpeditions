'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const TREKS = [
    {
        slug: "everest-base-camp",
        name: "Everest Base Camp",
        region: "Khumbu, Nepal",
        difficulty: "Difficult",
        duration: "14 Days",
        altitude: "5,364m",
        price: "$4,250",
        batches: [
            { month: "Mar", dates: "15 Mar – 28 Mar 2025", status: "Open" as const, booked: 3, capacity: 8 },
            { month: "Apr", dates: "05 Apr – 18 Apr 2025", status: "Limited" as const, booked: 6, capacity: 8 },
            { month: "May", dates: "12 May – 25 May 2025", status: "Open" as const, booked: 2, capacity: 8 },
            { month: "Oct", dates: "02 Oct – 15 Oct 2025", status: "Open" as const, booked: 4, capacity: 8 },
            { month: "Nov", dates: "05 Nov – 18 Nov 2025", status: "Limited" as const, booked: 7, capacity: 8 },
        ],
    },
    {
        slug: "annapurna-circuit",
        name: "Annapurna Circuit",
        region: "Gandaki, Nepal",
        difficulty: "Moderate",
        duration: "18 Days",
        altitude: "5,416m",
        price: "$3,100",
        batches: [
            { month: "Mar", dates: "10 Mar – 28 Mar 2025", status: "Open" as const, booked: 2, capacity: 8 },
            { month: "Apr", dates: "12 Apr – 30 Apr 2025", status: "Open" as const, booked: 3, capacity: 8 },
            { month: "Oct", dates: "10 Oct – 28 Oct 2025", status: "Open" as const, booked: 1, capacity: 8 },
            { month: "Nov", dates: "03 Nov – 21 Nov 2025", status: "Limited" as const, booked: 7, capacity: 8 },
            { month: "Dec", dates: "01 Dec – 19 Dec 2025", status: "Open" as const, booked: 4, capacity: 8 },
        ],
    },
    {
        slug: "markha-valley",
        name: "Markha Valley",
        region: "Ladakh, India",
        difficulty: "Moderate",
        duration: "12 Days",
        altitude: "5,100m",
        price: "$2,850",
        batches: [
            { month: "Jun", dates: "10 Jun – 22 Jun 2025", status: "Open" as const, booked: 3, capacity: 8 },
            { month: "Jul", dates: "05 Jul – 17 Jul 2025", status: "Open" as const, booked: 5, capacity: 8 },
            { month: "Aug", dates: "02 Aug – 14 Aug 2025", status: "Limited" as const, booked: 7, capacity: 8 },
            { month: "Sep", dates: "06 Sep – 18 Sep 2025", status: "Open" as const, booked: 4, capacity: 8 },
        ],
    },
];

// Build a lookup: month → treks with their matching batch
const getTreksForMonth = (month: string) =>
    TREKS.flatMap(trek => {
        const batch = trek.batches.find(b => b.month === month);
        return batch ? [{ ...trek, activeBatch: batch }] : [];
    });

// Which months have at least one trek
const ACTIVE_MONTHS = new Set(TREKS.flatMap(t => t.batches.map(b => b.month)));

const STATUS_STYLES = {
    Open: "text-green-700 bg-green-50 border-green-200",
    Limited: "text-amber-700 bg-amber-50 border-amber-200",
    Full: "text-red-700 bg-red-50 border-red-200",
};

export default function TrekCalendar() {
    const [selectedMonth, setSelectedMonth] = useState("Mar");
    const treks = getTreksForMonth(selectedMonth);

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
                            const hasTraks = ACTIVE_MONTHS.has(month);
                            const isSelected = selectedMonth === month;
                            return (
                                <button
                                    key={month}
                                    onClick={() => hasTraks && setSelectedMonth(month)}
                                    disabled={!hasTraks}
                                    className={`relative flex flex-col items-center gap-1 px-6 md:px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] border-r border-zinc-border transition-colors flex-1 min-w-[72px]
                                        ${isSelected
                                            ? "bg-slate-900 text-white"
                                            : hasTraks
                                                ? "bg-white text-slate-700 hover:bg-slate-100"
                                                : "bg-slate-50 text-slate-300 cursor-not-allowed"
                                        }`}
                                >
                                    {month}
                                    {hasTraks && (
                                        <span className={`w-1 h-1 rounded-full ${isSelected ? "bg-primary" : "bg-primary/40"}`} />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Trek Cards */}
                <div className="px-6 md:px-12 py-12">
                    {treks.length === 0 ? (
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
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
                                <span className="text-md text-primary " >{treks.length} expedition{treks.length !== 1 ? "s" : ""}</span> departing in {selectedMonth} 2025
                            </p>
                            <div className="flex flex-col border border-zinc-border bg-white shadow-sm">
                                {treks.map((trek, index) => (
                                    <div key={trek.slug} className={`group flex flex-col lg:flex-row items-start lg:items-center justify-between p-5 md:p-6 hover:bg-slate-50 transition-colors ${index !== treks.length - 1 ? "border-b border-zinc-border" : ""}`}>

                                        {/* Left Area: Region, Name, Dates */}
                                        <div className="flex-1 w-full lg:w-auto mb-5 lg:mb-0 lg:pr-8">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <div>
                                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">
                                                        {trek.region}
                                                    </p>
                                                    <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                                                        {trek.name}
                                                    </h3>
                                                </div>
                                                <span className={`lg:hidden shrink-0 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 border ${STATUS_STYLES[trek.activeBatch.status]}`}>
                                                    {trek.activeBatch.status}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 text-slate-600 mt-3 md:mt-2">
                                                <CalendarDays className="w-4 h-4 text-primary shrink-0" />
                                                <span className="text-sm font-bold uppercase tracking-tight truncate">
                                                    {trek.activeBatch.dates}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Middle Area: Stats summary */}
                                        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 md:gap-8 w-full lg:w-auto mb-5 lg:mb-0 lg:px-8 lg:border-l border-zinc-border/50">
                                            <div className="flex items-center gap-2 lg:block">
                                                <p className="lg:hidden text-[9px] font-black uppercase tracking-widest text-slate-400">Dur</p>
                                                <p className="hidden lg:block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Duration</p>
                                                <p className="text-xs font-bold uppercase">{trek.duration}</p>
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-zinc-300 lg:hidden shrink-0"></div>
                                            <div className="flex items-center gap-2 lg:block">
                                                <p className="lg:hidden text-[9px] font-black uppercase tracking-widest text-slate-400">Diff</p>
                                                <p className="hidden lg:block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Difficulty</p>
                                                <p className={`text-xs font-bold uppercase ${trek.difficulty === "Difficult" ? "text-primary" : "text-amber-600"}`}>
                                                    {trek.difficulty}
                                                </p>
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-zinc-300 lg:hidden shrink-0"></div>
                                            <div className="flex items-center gap-2 lg:block">
                                                <p className="lg:hidden text-[9px] font-black uppercase tracking-widest text-slate-400">Alt</p>
                                                <p className="hidden lg:block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Altitude</p>
                                                <p className="text-xs font-bold uppercase">{trek.altitude}</p>
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-zinc-300 lg:hidden shrink-0"></div>
                                            <div className="flex items-center gap-2 lg:block">
                                                <p className="lg:hidden text-[9px] font-black uppercase tracking-widest text-slate-400">Booked</p>
                                                <p className="hidden lg:block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Booked</p>
                                                <p className="text-xs font-bold uppercase">{trek.activeBatch.booked} / {trek.activeBatch.capacity}</p>
                                            </div>
                                        </div>

                                        {/* Right Area: Status (Desktop), Price, CTA */}
                                        <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-4 lg:gap-8 lg:pl-8 lg:border-l border-zinc-border/50 shrink-0 mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-100 lg:border-none">
                                            <span className={`hidden lg:inline-block text-[9px] font-black uppercase tracking-widest px-2.5 py-1 border shrink-0 ${STATUS_STYLES[trek.activeBatch.status]}`}>
                                                {trek.activeBatch.status}
                                            </span>

                                            <div className="flex items-center justify-between w-full lg:w-auto gap-6">
                                                <p className="text-xl font-black tracking-tight">
                                                    {trek.price}
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase ml-1">USD</span>
                                                </p>
                                                <Link
                                                    href={`/treks/${trek.slug}`}
                                                    className="inline-flex items-center justify-center p-3 md:px-5 md:py-3 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors group/link shrink-0"
                                                >
                                                    <span className="hidden md:inline">View</span>
                                                    <ArrowRight className="w-4 h-4 transition-transform md:group-hover/link:translate-x-1 md:ml-2" />
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
