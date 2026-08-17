'use client';

import { useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { sharedMarks } from '@/lib/portableTextComponents';

type Testimonial = {
    name: string;
    location: string;
    rating: number;
    text: PortableTextBlock[];
    batch: string;
    imageUrl?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const testimonialTextComponents = {
    block: {
        normal: ({ children }: any) => <p className="mb-2 last:mb-0">{children}</p>,
    },
    marks: sharedMarks,
};

function TestimonialCard({ t }: { t: Testimonial }) {
    return (
        <div className="bg-white px-5 py-8 md:p-10 flex flex-col gap-6 h-full">
            <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s < t.rating ? 'text-primary fill-primary' : 'text-slate-200 fill-slate-200'}`} />
                ))}
            </div>
            <blockquote className="text-sm text-slate-700 leading-relaxed flex-1">
                <PortableText value={t.text} components={testimonialTextComponents} />
            </blockquote>
            <div className="border-t border-zinc-border pt-6 flex items-center gap-4">
                {t.imageUrl ? (
                    <img
                        src={t.imageUrl}
                        alt={t.name}
                        className="w-18 h-18 rounded-full object-cover object-top shrink-0 border border-zinc-200"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0 flex items-center justify-center">
                        <span className="text-[11px] font-black text-slate-500">{t.name.charAt(0)}</span>
                    </div>
                )}
                <div>
                    <p className="font-black uppercase text-sm tracking-tight">{t.name}</p>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">{t.location} | {t.batch} </p>

                </div>
            </div>
        </div>
    );
}

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
    const [index, setIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);

    if (!testimonials.length) return null;

    const PER_PAGE = 3;
    const totalPages = Math.ceil(testimonials.length / PER_PAGE);
    const desktopPage = Math.floor(index / PER_PAGE);

    const prev = () => setIndex(i => (i === 0 ? testimonials.length - 1 : i - 1));
    const next = () => setIndex(i => (i === testimonials.length - 1 ? 0 : i + 1));

    const prevPage = () => setIndex(desktopPage === 0 ? (totalPages - 1) * PER_PAGE : (desktopPage - 1) * PER_PAGE);
    const nextPage = () => setIndex(desktopPage === totalPages - 1 ? 0 : (desktopPage + 1) * PER_PAGE);

    const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
        touchStartX.current = null;
    };

    const visibleDesktop = testimonials.slice(desktopPage * PER_PAGE, desktopPage * PER_PAGE + PER_PAGE);

    return (
        <>
            {/* Mobile — swipeable single card */}
            <div className="md:hidden relative">
                <div
                    className="bg-white border border-zinc-border"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <TestimonialCard t={testimonials[index]} />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <button onClick={prev} className="p-2 border border-zinc-border bg-white hover:bg-slate-50 transition-colors">
                        <ChevronLeft className="w-4 h-4 text-slate-700" />
                    </button>
                    <div className="flex gap-1.5">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className="w-1.5 h-1.5 transition-colors"
                                style={{ borderRadius: '50%', backgroundColor: i === index ? 'var(--primary)' : '#e4e4e7' }}
                            />
                        ))}
                    </div>
                    <button onClick={next} className="p-2 border border-zinc-border bg-white hover:bg-slate-50 transition-colors">
                        <ChevronRight className="w-4 h-4 text-slate-700" />
                    </button>
                </div>
            </div>

            {/* Desktop — 3-up carousel */}
            <div className="hidden md:block">
                <div className="grid grid-cols-3 gap-px bg-zinc-border">
                    {visibleDesktop.map((t, i) => (
                        <TestimonialCard key={i} t={t} />
                    ))}
                    {/* Fill empty slots so the grid always has 3 columns */}
                    {visibleDesktop.length < PER_PAGE && Array.from({ length: PER_PAGE - visibleDesktop.length }).map((_, i) => (
                        <div key={`empty-${i}`} className="bg-white" />
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6">
                        <button onClick={prevPage} className="p-2 border border-zinc-border bg-white hover:bg-slate-50 transition-colors">
                            <ChevronLeft className="w-4 h-4 text-slate-700" />
                        </button>
                        <div className="flex gap-1.5">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIndex(i * PER_PAGE)}
                                    className="w-1.5 h-1.5 transition-colors"
                                    style={{ borderRadius: '50%', backgroundColor: i === desktopPage ? 'var(--primary)' : '#e4e4e7' }}
                                />
                            ))}
                        </div>
                        <button onClick={nextPage} className="p-2 border border-zinc-border bg-white hover:bg-slate-50 transition-colors">
                            <ChevronRight className="w-4 h-4 text-slate-700" />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
