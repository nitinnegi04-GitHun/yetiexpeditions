'use client';

import { useState, useRef } from 'react';

type PackingListProps = {
    packingList: Record<string, string[]>;
};

export default function PackingListCarousel({ packingList }: PackingListProps) {
    const [index, setIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const entries = Object.entries(packingList);

    if (!entries.length) return null;

    const prev = () => setIndex(i => (i === 0 ? entries.length - 1 : i - 1));
    const next = () => setIndex(i => (i === entries.length - 1 ? 0 : i + 1));

    const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
        touchStartX.current = null;
    };

    const [category, items] = entries[index];

    return (
        <>
            {/* Mobile — swipeable single card */}
            <div className="md:hidden">
                <div className="bg-white p-8 border border-zinc-border min-h-[320px] flex flex-col" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">{category}</h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {index + 1} / {entries.length}
                        </span>
                    </div>
                    <ul className="space-y-3 flex-1">
                        {items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-xs text-slate-600">
                                <span className="w-1 h-1 bg-slate-300 shrink-0 mt-1.5" style={{ borderRadius: '50%' }} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Controls */}
                <div className="flex items-center justify-between mt-4">
                    <button onClick={prev} className="p-3 border border-zinc-border bg-white hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
                        {entries.map((_, i) => (
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

            {/* Desktop — original grid */}
            <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-px bg-zinc-border border border-zinc-border">
                {entries.map(([cat, catItems]) => (
                    <div key={cat} className="bg-white p-8">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6">{cat}</h3>
                        <ul className="space-y-3">
                            {catItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-xs text-slate-600">
                                    <span className="w-1 h-1 bg-slate-300 shrink-0 mt-1.5" style={{ borderRadius: '50%' }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
