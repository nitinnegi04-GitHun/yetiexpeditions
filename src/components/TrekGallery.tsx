'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollGrayscale } from '@/hooks/useScrollGrayscale';

function GalleryImg({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
    const { ref, filter } = useScrollGrayscale(55);
    const [hovered, setHovered] = useState(false);
    return (
        <div
            ref={ref}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="absolute inset-0 overflow-hidden bg-slate-100 cursor-pointer"
            aria-label={`Open ${alt}`}
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

function Lightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
    const [current, setCurrent] = useState(startIndex);

    const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
    const next = () => setCurrent(i => (i + 1) % images.length);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prev();
            else if (e.key === 'ArrowRight') next();
            else if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, []);

    return createPortal(
        /* Dark backdrop */
        <div className="fixed inset-0 z-[100000] bg-black/85 flex items-center justify-center p-4 md:p-10" onClick={onClose}>
            {/* Close — top-right corner of the screen */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 z-10 bg-zinc-900 hover:bg-primary transition-colors p-2.5 text-white"
                aria-label="Close"
            >
                <X className="w-5 h-5" />
            </button>

            {/* White canvas — the image sits on this, not the dark backdrop */}
            <div className="relative bg-white w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                {/* Counter */}
                <span className="absolute top-4 left-4 z-10 bg-white/90 px-2.5 py-1 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    {current + 1} / {images.length}
                </span>

                {/* Fixed-size stage — image dimensions never shift this box */}
                <div className="relative flex-1 min-h-0 flex items-center justify-center px-6 md:px-20 py-10">
                    <img
                        key={current}
                        src={images[current]}
                        alt={`Photo ${current + 1}`}
                        className="max-w-full max-h-full object-contain select-none"
                    />
                    <button
                        onClick={prev}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-primary transition-colors p-2.5 text-white"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-primary transition-colors p-2.5 text-white"
                        aria-label="Next"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Thumbnail strip — pinned to bottom */}
                <div className="shrink-0 px-4 py-4 flex gap-2 justify-center overflow-x-auto border-t border-zinc-border">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`shrink-0 w-16 h-16 overflow-hidden border-2 transition-colors ${i === current ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-90'}`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
}

export default function TrekGallery({ images, trekName }: { images: string[]; trekName: string }) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const preview = images.slice(0, 3);
    const remaining = images.length - 3;

    return (
        <>
            {/* ── Desktop: left 60% hero + right 40% stacked two ── */}
            <div className="hidden md:grid grid-cols-5 grid-rows-2 gap-2 h-[540px]">
                <div className="col-span-3 row-span-2 relative">
                    <GalleryImg src={preview[0]} alt={`${trekName} trek photo 1`} onClick={() => setLightboxIndex(0)} />
                </div>
                <div className="col-span-2 relative">
                    <GalleryImg src={preview[1]} alt={`${trekName} trek photo 2`} onClick={() => setLightboxIndex(1)} />
                </div>
                <div className="col-span-2 relative">
                    <GalleryImg src={preview[2]} alt={`${trekName} trek photo 3`} onClick={() => setLightboxIndex(2)} />
                    {remaining > 0 && (
                        <button
                            onClick={() => setLightboxIndex(3)}
                            className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2 hover:bg-black/65 transition-colors z-10"
                        >
                            <span className="text-white text-4xl font-black tracking-tighter">+{remaining}</span>
                            <span className="text-white text-[10px] font-black uppercase tracking-[0.25em]">View All Photos</span>
                        </button>
                    )}
                </div>
            </div>

            {/* ── Mobile: 1 full-width + 2-across row ── */}
            <div className="md:hidden flex flex-col gap-2">
                <div className="relative h-56 w-full">
                    <GalleryImg src={preview[0]} alt={`${trekName} trek photo 1`} onClick={() => setLightboxIndex(0)} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="relative aspect-[4/3]">
                        <GalleryImg src={preview[1]} alt={`${trekName} trek photo 2`} onClick={() => setLightboxIndex(1)} />
                    </div>
                    <div className="relative aspect-[4/3]">
                        <GalleryImg src={preview[2]} alt={`${trekName} trek photo 3`} onClick={() => setLightboxIndex(2)} />
                        {remaining > 0 && (
                            <button
                                onClick={() => setLightboxIndex(3)}
                                className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-3 hover:bg-black/65 transition-colors z-10"
                            >
                                <span className="text-white text-3xl font-black tracking-tighter">+{remaining}</span>
                                <span className="text-white text-[9px] font-black uppercase tracking-[0.2em]">View All</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Lightbox ── */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={images}
                    startIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </>
    );
}
