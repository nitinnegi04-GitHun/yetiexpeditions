'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const TREKS = [
    { id: "01", name: "Everest Base Camp", slug: "everest-base-camp", region: "Khumbu Region", country: "Nepal", difficulty: "Difficult", price: "$4,250" },
    { id: "02", name: "Annapurna Circuit", slug: "annapurna-circuit", region: "Gandaki Province", country: "Nepal", difficulty: "Moderate", price: "$3,100" },
    { id: "03", name: "Markha Valley", slug: "markha-valley", region: "Ladakh", country: "India", difficulty: "Moderate", price: "$2,850" },
];

const REGIONS = ["All", ...Array.from(new Set(TREKS.map(t => t.country)))];
const DIFFICULTIES = ["All", ...Array.from(new Set(TREKS.map(t => t.difficulty)))];

export default function TrekIndex() {
    const [activeRegion, setActiveRegion] = useState("All");
    const [activeDifficulty, setActiveDifficulty] = useState("All");

    const filtered = TREKS.filter(t => {
        const regionMatch = activeRegion === "All" || t.country === activeRegion;
        const difficultyMatch = activeDifficulty === "All" || t.difficulty === activeDifficulty;
        return regionMatch && difficultyMatch;
    });

    return (
        <section id="treks" className="w-full py-12 px-6 md:px-12 bg-white">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex justify-between items-start mb-8 flex-wrap gap-8">
                    <div>
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-3">
                            Explore Routes
                        </span>
                        <h3 className="text-5xl font-black uppercase tracking-tighter">Trek Index</h3>
                        <p className="text-slate-500 uppercase text-xs tracking-[0.3em] mt-2">Current Seasonal Expeditions</p>
                    </div>

                    {/* Filter controls */}
                    <div className="flex flex-col gap-4">
                        {/* Region filter */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-28">
                                By Region:
                            </span>
                            {REGIONS.map((region) => (
                                <button
                                    key={region}
                                    onClick={() => setActiveRegion(region)}
                                    className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 border transition-colors
                                        ${activeRegion === region
                                            ? "bg-primary text-white border-primary"
                                            : "border-zinc-border text-slate-500 hover:border-slate-900 hover:text-slate-900"
                                        }`}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>

                        {/* Difficulty filter */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-28">
                                By Difficulty:
                            </span>
                            {DIFFICULTIES.map((difficulty) => (
                                <button
                                    key={difficulty}
                                    onClick={() => setActiveDifficulty(difficulty)}
                                    className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 border transition-colors
                                        ${activeDifficulty === difficulty
                                            ? difficulty === "Difficult"
                                                ? "bg-primary text-white border-primary"
                                                : difficulty === "Moderate"
                                                    ? "bg-amber-600 text-white border-amber-600"
                                                    : "bg-slate-900 text-white border-slate-900"
                                            : "border-zinc-border text-slate-500 hover:border-slate-900 hover:text-slate-900"
                                        }`}
                                >
                                    {difficulty}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-border">
                    {filtered.length === 0 ? (
                        <div className="py-16 text-center border-b border-zinc-border">
                            <p className="text-sm text-slate-400 uppercase tracking-widest font-bold">No expeditions found for this region.</p>
                        </div>
                    ) : (
                        filtered.map((trek) => (
                            <Link
                                key={trek.id}
                                href={`/treks/${trek.slug}`}
                                className="flex flex-col md:flex-row items-start md:items-center justify-between py-6 px-4 border-b border-zinc-border hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                                <div className="flex items-center gap-8 w-full md:w-1/2">
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
                                <div className="flex items-center gap-12 mt-6 md:mt-0">
                                    <span className={`px-4 py-1 border text-[10px] font-bold uppercase tracking-widest
                                        ${trek.difficulty === "Difficult"
                                            ? "text-primary border-primary/30 bg-primary/5"
                                            : trek.difficulty === "Moderate"
                                                ? "text-amber-600 border-amber-200 bg-amber-50"
                                                : "border-zinc-border text-slate-500"
                                        }`}>
                                        {trek.difficulty}
                                    </span>
                                    <span className="text-xl font-bold tracking-tight">
                                        {trek.price} <span className="text-[10px] text-slate-400 uppercase">USD</span>
                                    </span>
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
