'use client';

import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { sharedMarks } from '@/lib/portableTextComponents';
import { useScrollGrayscale } from '@/hooks/useScrollGrayscale';

interface Step {
    day: string;
    title: string;
    content: PortableTextBlock[];
    imageUrl?: string;
    walkTime?: string;
    highlight?: string;
}

function ItineraryImage({ src, alt }: { src: string; alt: string }) {
    const { ref, filter } = useScrollGrayscale(55);
    const [hovered, setHovered] = useState(false);
    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative w-full aspect-[16/9] overflow-hidden bg-slate-100 mb-4"
        >
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                style={{
                    filter: hovered ? 'grayscale(0%) contrast(1)' : filter,
                    transform: hovered ? 'scale(1.05)' : 'scale(1)',
                    transition: 'filter 400ms ease, transform 500ms ease',
                }}
            />
        </div>
    );
}

const contentComponents = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    block: {
        normal: ({ children }: any) => <p className="mb-3 last:mb-0">{children}</p>,
        h3: ({ children }: any) => <h3 className="text-xs font-black uppercase tracking-widest mt-4 mb-2 text-slate-900">{children}</h3>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="space-y-1.5 mb-3 pl-4 list-disc">{children}</ul>,
        number: ({ children }: any) => <ol className="space-y-1.5 mb-3 pl-4 list-decimal">{children}</ol>,
    },
    marks: sharedMarks,
};

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
                            <span className={`flex-1 flex items-center gap-2 text-base font-black uppercase tracking-tight transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-700'}`}>
                                {step.title}
                                {step.highlight && (
                                    <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" aria-label="Highlight day" />
                                )}
                            </span>

                            {/* Walk time + day label + chevron */}
                            <div className="flex items-center gap-4 shrink-0">
                                {step.walkTime && (
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hidden md:block">
                                        {step.walkTime} Walk
                                    </span>
                                )}
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
                                <div className="flex-1 border-l-2 border-primary/20 pl-5">
                                    {step.walkTime && (
                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 md:hidden">
                                            {step.walkTime} Walk
                                        </p>
                                    )}
                                    {step.highlight && (
                                        <div className="bg-primary/5 border-l-2 border-primary pl-4 py-3 mb-4">
                                            <p className="text-primary text-[9px] font-black uppercase tracking-[0.2em] mb-1">Highlight of the Day</p>
                                            <p className="text-slate-700 text-sm leading-relaxed">{step.highlight}</p>
                                        </div>
                                    )}
                                    {step.imageUrl && (
                                        <ItineraryImage src={step.imageUrl} alt={`Day ${step.day}: ${step.title}`} />
                                    )}
                                    <div className="text-slate-600 leading-relaxed text-sm">
                                        <PortableText value={step.content} components={contentComponents} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
