'use client';

import { useState, useRef } from 'react';
import { Dumbbell } from 'lucide-react';

type PhaseProps = {
    physicalPrep: { weeks: string; focus: string; description: string }[];
};

export default function PhysicalPrepCarousel({ physicalPrep }: PhaseProps) {
    const [index, setIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);

    if (!physicalPrep.length) return null;

    const prev = () => setIndex(i => (i === 0 ? physicalPrep.length - 1 : i - 1));
    const next = () => setIndex(i => (i === physicalPrep.length - 1 ? 0 : i + 1));

    const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
        touchStartX.current = null;
    };

    const phase = physicalPrep[index];

    return (
        <>
            {/* Mobile — swipeable single card */}
            <div className="md:hidden">
                <div className="bg-white p-8 border border-zinc-border min-h-[260px] flex flex-col" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Dumbbell className="text-primary w-4 h-4 shrink-0" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{phase.weeks}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {index + 1} / {physicalPrep.length}
                        </span>
                    </div>
                    <h3 className="font-black uppercase text-base tracking-tight mb-4">{phase.focus}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">{phase.description}</p>
                    <div className="mt-6 text-[10px] font-black uppercase tracking-widest text-slate-200">
                        {(index + 1).toString().padStart(2, '0')}
                    </div>
                </div>
                {/* Controls */}
                <div className="flex items-center justify-between mt-4">
                    <button onClick={prev} className="p-3 border border-zinc-border bg-white hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
                        {physicalPrep.map((_, i) => (
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
                {physicalPrep.map((p, i) => (
                    <div key={i} className={`p-8 md:p-10 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                        <div className="flex items-center gap-3 mb-6">
                            <Dumbbell className="text-primary w-4 h-4 shrink-0" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{p.weeks}</span>
                        </div>
                        <h3 className="font-black uppercase text-base tracking-tight mb-4">{p.focus}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
                        <div className="mt-6 text-[10px] font-black uppercase tracking-widest text-slate-200">
                            {(i + 1).toString().padStart(2, '0')}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
