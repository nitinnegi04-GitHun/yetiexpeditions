'use client';

import { useState, useRef } from 'react';
import { MapPin, FileText, Plane } from 'lucide-react';

type GettingThereProps = {
    gettingThere: { arrival: string; visa: string; domesticFlight: string };
};

const CARDS = [
    { key: 'arrival',        label: 'Arrival & Transfer', Icon: MapPin  },
    { key: 'visa',           label: 'Visa',               Icon: FileText },
    { key: 'domesticFlight', label: 'Domestic Flight',    Icon: Plane    },
] as const;

export default function GettingThereCarousel({ gettingThere }: GettingThereProps) {
    const [index, setIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);

    const prev = () => setIndex(i => (i === 0 ? CARDS.length - 1 : i - 1));
    const next = () => setIndex(i => (i === CARDS.length - 1 ? 0 : i + 1));

    const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
        touchStartX.current = null;
    };

    const { label, Icon } = CARDS[index];
    const text = gettingThere[CARDS[index].key];

    return (
        <>
            {/* Mobile — swipeable single card */}
            <div className="md:hidden">
                <div
                    className="bg-white p-8 border border-zinc-border min-h-[200px] flex flex-col"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Icon className="text-primary w-5 h-5 shrink-0" />
                            <h3 className="text-xs font-black uppercase tracking-[0.2em]">{label}</h3>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {index + 1} / {CARDS.length}
                        </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">{text}</p>
                </div>
                {/* Controls */}
                <div className="flex items-center justify-between mt-4">
                    <button onClick={prev} className="p-3 border border-zinc-border bg-white hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex gap-1.5">
                        {CARDS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className="w-1.5 h-1.5 transition-colors"
                                style={{ borderRadius: '50%', backgroundColor: i === index ? 'var(--primary)' : '#e4e4e7' }}
                            />
                        ))}
                    </div>
                    <button onClick={next} className="p-3 border border-zinc-border bg-white hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Desktop — original 3-column grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-px bg-zinc-border border border-zinc-border">
                <div className="bg-white p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <MapPin className="text-primary w-5 h-5 shrink-0" />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em]">Arrival & Transfer</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{gettingThere.arrival}</p>
                </div>
                <div className="bg-slate-50 p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <FileText className="text-primary w-5 h-5 shrink-0" />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em]">Visa</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{gettingThere.visa}</p>
                </div>
                <div className="bg-white p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <Plane className="text-primary w-5 h-5 shrink-0" />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em]">Domestic Flight</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{gettingThere.domesticFlight}</p>
                </div>
            </div>
        </>
    );
}
