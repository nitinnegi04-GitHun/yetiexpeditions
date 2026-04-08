'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Step {
    day: string;
    title: string;
    content: string;
}

export default function ItineraryAccordion({ steps }: { steps: Step[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="border-t border-zinc-100">
            {steps.map((step, index) => {
                const isOpen = openIndex === index;
                return (
                    <div key={index} className="border-b border-zinc-100 group">
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="w-full flex items-center gap-6 md:gap-8 py-6 text-left hover:bg-slate-50/60 transition-colors px-0 cursor-pointer"
                            style={{ touchAction: 'manipulation' }}
                        >
                            {/* Day number */}
                            <span className={`text-3xl font-black tracking-tighter shrink-0 transition-colors w-12 ${isOpen ? 'text-primary' : 'text-slate-200 group-hover:text-slate-300'}`}>
                                {(index + 1).toString().padStart(2, '0')}
                            </span>

                            {/* Title */}
                            <span className={`flex-1 text-base font-black uppercase tracking-tight transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-700'}`}>
                                {step.title}
                            </span>

                            {/* Day label + chevron */}
                            <div className="flex items-center gap-4 shrink-0">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hidden sm:block">
                                    Day {step.day}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : 'text-slate-300'}`}
                                />
                            </div>
                        </button>

                        {/* Collapsible content */}
                        {isOpen && (
                            <div className="flex gap-6 md:gap-8 pb-6">
                                <div className="w-12 shrink-0" />
                                <p className="text-slate-600 leading-relaxed text-sm flex-1 border-l-2 border-primary/20 pl-5">
                                    {step.content}
                                </p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
