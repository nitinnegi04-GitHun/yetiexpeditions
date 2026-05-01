'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useScrollGrayscale } from "@/hooks/useScrollGrayscale";
import { useCurrency } from "@/lib/CurrencyContext";
import PriceTooltip from "./PriceTooltip";

function TrekCardBg({ src }: { src: string }) {
    const { ref, filter } = useScrollGrayscale();
    return (
        <div
            ref={ref}
            className="absolute inset-0 bg-cover bg-center brightness-75"
            style={{ backgroundImage: `url(${src})`, filter, transition: 'filter 300ms ease' }}
        />
    );
}

interface Trek {
    id: string;
    name: string;
    slug: string;
    region: string;
    country: string;
    difficulty: string;
    priceUSD: number | null;
    priceINR: number | null;
    duration?: string;
    altitude?: string;
    bannerImageUrl?: string;
    nextBatchRange?: string | null;
    seatsBooked?: number | null;
    totalSeats?: number | null;
}

const FALLBACK_TREKS: Trek[] = [
    { id: "01", name: "Everest Base Camp", slug: "everest-base-camp", region: "Khumbu Region", country: "Nepal", difficulty: "Difficult", priceUSD: 4250, priceINR: 355000 },
    { id: "02", name: "Annapurna Circuit", slug: "annapurna-circuit", region: "Gandaki Province", country: "Nepal", difficulty: "Moderate", priceUSD: 3100, priceINR: 259000 },
    { id: "03", name: "Markha Valley", slug: "markha-valley", region: "Ladakh", country: "India", difficulty: "Moderate", priceUSD: 2850, priceINR: 238000 },
];

export default function TrekIndex({ treks: treksProp }: { treks?: Trek[] }) {
    const allTreks = treksProp?.length ? treksProp : FALLBACK_TREKS;
    const { currency, setCurrency, formatPrice, hasBothPrices } = useCurrency();

    const REGIONS = ["All", ...Array.from(new Set(allTreks.map(t => t.country)))];
    const DIFFICULTIES = ["All", ...Array.from(new Set(allTreks.map(t => t.difficulty)))];

    const [activeRegion, setActiveRegion] = useState("All");
    const [activeDifficulty, setActiveDifficulty] = useState("All");

    const filtered = allTreks.filter(t => {
        const regionMatch = activeRegion === "All" || t.country === activeRegion;
        const difficultyMatch = activeDifficulty === "All" || t.difficulty === activeDifficulty;
        return regionMatch && difficultyMatch;
    });

    const difficultyDesktopClass = (d: string) =>
        d === "Difficult"
            ? "text-white border-primary/30 bg-primary/50"
            : d === "Moderate"
                ? "text-amber-600 border-amber-200 bg-amber-50"
                : "border-zinc-border text-slate-500";


    const filterBtnActiveClass = (type: "region" | "difficulty", value: string) => {
        if (type === "region") return "bg-primary text-white border-primary";
        if (value === "Difficult") return "bg-primary text-white border-primary";
        if (value === "Moderate") return "bg-amber-600 text-white border-amber-600";
        return "bg-slate-900 text-white border-slate-900";
    };

    return (
        <section id="treks" className="w-full py-6 md:py-12 px-6 md:px-12 bg-white">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex justify-between items-start mb-4 md:mb-8 flex-wrap gap-4 md:gap-8">
                    <div>
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-1 md:mb-3">
                            Explore Routes
                        </span>
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Trek Index</h3>
                        <p className="text-slate-500 uppercase text-xs tracking-[0.3em] mt-1 md:mt-2">Current Seasonal Expeditions</p>
                    </div>

                    {/* Filter controls */}
                    <div className="flex flex-col gap-2 md:gap-4">
                        {/* Region filter */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-28">By Region:</span>
                            {REGIONS.map((region) => (
                                <button
                                    key={region}
                                    onClick={() => setActiveRegion(region)}
                                    className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 md:px-4 md:py-2 border transition-colors
                                        ${activeRegion === region
                                            ? filterBtnActiveClass("region", region)
                                            : "border-zinc-border text-slate-500 hover:border-slate-900 hover:text-slate-900"
                                        }`}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>

                        {/* Difficulty filter */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-28">By Difficulty:</span>
                            {DIFFICULTIES.map((difficulty) => (
                                <button
                                    key={difficulty}
                                    onClick={() => setActiveDifficulty(difficulty)}
                                    className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 md:px-4 md:py-2 border transition-colors
                                        ${activeDifficulty === difficulty
                                            ? filterBtnActiveClass("difficulty", difficulty)
                                            : "border-zinc-border text-slate-500 hover:border-slate-900 hover:text-slate-900"
                                        }`}
                                >
                                    {difficulty}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Mobile card grid ── */}
                <div className="md:hidden flex flex-col gap-0 border-t border-zinc-border">
                    {filtered.length === 0 ? (
                        <div className="py-16 text-center border-b border-zinc-border">
                            <p className="text-sm text-slate-400 uppercase tracking-widest font-bold">No expeditions found.</p>
                        </div>
                    ) : (
                        filtered.map((trek) => (
                            <Link
                                key={trek.id}
                                href={`/treks/${trek.slug}`}
                                className="block border-b border-zinc-border"
                            >
                                {/* Top — banner image */}
                                <div
                                    className="relative w-full overflow-hidden bg-slate-800"
                                    style={{ height: '56vw', minHeight: '200px' }}
                                >
                                    {trek.bannerImageUrl && (
                                        <TrekCardBg src={trek.bannerImageUrl} />
                                    )}
                                    {/* Trek name + location — solid bar sized to text */}
                                    <div className="absolute z-10 inline-flex border-l-4 border-primary px-3 py-2" style={{ top: '20px', left: '20px', backgroundColor: 'rgba(24, 24, 26, 0.80)' }}>
                                        <div>
                                            <p className="text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap">{trek.name}</p>
                                            <p className="text-white/80 text-[10px] uppercase whitespace-nowrap">{trek.region}{trek.altitude ? ` | ${trek.altitude}` : ''}</p>
                                        </div>
                                    </div>
                                    {/* Difficulty badge — bottom-left, aligned with name bar */}
                                    <div className={`absolute z-10 px-2 py-1 border text-[9px] font-black uppercase tracking-widest ${difficultyDesktopClass(trek.difficulty)}`} style={{ bottom: '20px', left: '20px' }}>
                                        {trek.difficulty}
                                    </div>
                                    {/* Days — bottom-right of image */}
                                    <div className="absolute z-10 px-3 py-2" style={{ bottom: '20px', right: '20px', backgroundColor: 'rgba(24, 24, 26, 0.80)' }}>
                                        <p className="text-white text-[9px] font-bold uppercase tracking-wides leading-none">{trek.duration || '—'}</p>
                                    </div>
                                </div>

                                {/* Bottom — single info row */}
                                <div className="bg-white border-t border-zinc-border px-4 py-3 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Next Batch</p>
                                            <p className="text-xs font-black uppercase tracking-tight text-slate-900">{trek.nextBatchRange || 'TBA'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Booked</p>
                                            <p className="text-xs font-black uppercase tracking-tight text-slate-900">
                                                {trek.seatsBooked != null && trek.totalSeats != null ? `${trek.seatsBooked} / ${trek.totalSeats}` : '—'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-xs font-bold tracking-tight text-slate-900">
                                            {formatPrice(trek.priceUSD, trek.priceINR)}
                                        </span>
                                        <PriceTooltip />
                                        {/* Mobile inline currency toggle — only shown when both prices exist */}
                                        {hasBothPrices(trek.priceUSD, trek.priceINR) && (
                                            <div className="flex items-center border border-zinc-200 overflow-hidden shrink-0" onClick={(e) => e.preventDefault()}>
                                                <button
                                                    onClick={(e) => { e.preventDefault(); setCurrency('USD'); }}
                                                    className="px-1.5 py-1 text-[8px] font-black uppercase tracking-widest border-none outline-none transition-colors cursor-pointer"
                                                    style={{ background: currency === 'USD' ? '#0f172a' : 'transparent', color: currency === 'USD' ? '#ffffff' : '#94a3b8' }}
                                                >
                                                    $ USD
                                                </button>
                                                <button
                                                    onClick={(e) => { e.preventDefault(); setCurrency('INR'); }}
                                                    className="px-1.5 py-1 text-[8px] font-black uppercase tracking-widest border-none outline-none border-l border-zinc-200 transition-colors cursor-pointer"
                                                    style={{ background: currency === 'INR' ? '#0f172a' : 'transparent', color: currency === 'INR' ? '#ffffff' : '#94a3b8' }}
                                                >
                                                    ₹ INR
                                                </button>
                                            </div>
                                        )}
                                        <ArrowRight className="text-primary w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                {/* ── Desktop list ── */}
                <div className="hidden md:block border-t border-zinc-border">
                    {filtered.length === 0 ? (
                        <div className="py-16 text-center border-b border-zinc-border">
                            <p className="text-sm text-slate-400 uppercase tracking-widest font-bold">No expeditions found for this region.</p>
                        </div>
                    ) : (
                        filtered.map((trek) => (
                            <Link
                                key={trek.id}
                                href={`/treks/${trek.slug}`}
                                className="flex items-center justify-between py-6 px-4 border-b border-zinc-border hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                                <div className="flex items-center gap-8 w-1/2">
                                    <span className="text-primary/40 font-bold">{trek.id}</span>
                                    <div>
                                        <h4 className="text-2xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                                            {trek.name}
                                        </h4>
                                        <p className="text-xs text-slate-400 uppercase tracking-widest">
                                            {trek.region}, {trek.country}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-12">
                                    <span className={`px-4 py-1 border text-[10px] font-bold uppercase tracking-widest ${difficultyDesktopClass(trek.difficulty)}`}>
                                        {trek.difficulty}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xl font-bold tracking-tight">
                                            {formatPrice(trek.priceUSD, trek.priceINR)}
                                        </span>
                                        <PriceTooltip />
                                    </div>
                                    <ArrowRight className="text-slate-300 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                {/* Active filter indicator */}
                {(activeRegion !== "All" || activeDifficulty !== "All") && (
                    <div className="mt-6 flex items-center gap-4 flex-wrap">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                            Showing <span className="text-slate-900 font-black">{filtered.length}</span> expedition{filtered.length !== 1 ? "s" : ""}
                            {activeRegion !== "All" && <> in <span className="text-slate-900 font-black">{activeRegion}</span></>}
                            {activeDifficulty !== "All" && <> · <span className="text-slate-900 font-black">{activeDifficulty}</span></>}
                        </p>
                        <button
                            onClick={() => { setActiveRegion("All"); setActiveDifficulty("All"); }}
                            className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-slate-900 transition-colors border-b border-primary hover:border-slate-900 pb-0.5"
                        >
                            Clear All
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
