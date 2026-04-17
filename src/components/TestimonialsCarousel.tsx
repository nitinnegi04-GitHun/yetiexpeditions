'use client';

import { useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

type Testimonial = {
    name: string;
    location: string;
    rating: number;
    text: string;
    batch: string;
};

function TestimonialCard({ t }: { t: Testimonial }) {
    return (
        <div className="bg-white p-8 md:p-10 flex flex-col gap-6 h-full">
            <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s < t.rating ? 'text-primary fill-primary' : 'text-slate-200 fill-slate-200'}`} />
                ))}
            </div>
            <blockquote className="text-sm text-slate-700 leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
            </blockquote>
            <div className="border-t border-zinc-border pt-6">
                <p className="font-black uppercase text-sm tracking-tight">{t.name}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">{t.location}</p>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">{t.batch}</p>
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
                    className="bg-white p-8 flex flex-col gap-6 border border-zinc-border"
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
