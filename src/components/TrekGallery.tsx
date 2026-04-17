'use client';

import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollGrayscale } from '@/hooks/useScrollGrayscale';

function GalleryImg({ src, alt }: { src: string; alt: string }) {
    const { ref, filter } = useScrollGrayscale();
    return (
        <div ref={ref} className="w-full h-full overflow-hidden bg-slate-100">
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                style={{ filter, transition: 'filter 300ms ease, transform 500ms ease' }}
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

    return (
        /* Backdrop — click to close */
        <div
            className="fixed inset-0 z-[100000] bg-black/80 flex items-center justify-center p-4 md:p-10"
            onClick={onClose}
        >
            {/* Popup — stop propagation so clicks inside don't close */}
            <div
                className="relative bg-zinc-900 w-full max-w-4xl flex flex-col max-h-[90vh]"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 shrink-0">
                    <span className="text-white/50 text-[10px] font-black uppercase tracking-widest">
                        {current + 1} / {images.length}
                    </span>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white hover:bg-white/10 transition-colors p-1.5"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Image + side arrows */}
                <div className="relative flex items-center justify-center bg-black min-h-0 flex-1">
                    <img
                        key={current}
                        src={images[current]}
                        alt={`Photo ${current + 1}`}
                        className="max-h-[65vh] max-w-full object-contain select-none"
                    />
                    <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 transition-colors p-2 text-white"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 transition-colors p-2 text-white"
                        aria-label="Next"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Thumbnail strip */}
                <div className="shrink-0 px-4 py-3 flex gap-2 overflow-x-auto border-t border-white/10">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`shrink-0 w-12 h-12 overflow-hidden border-2 transition-colors ${i === current ? 'border-primary' : 'border-transparent opacity-40 hover:opacity-80'}`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
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
                <div className="col-span-3 row-span-2">
                    <GalleryImg src={preview[0]} alt={`${trekName} trek photo 1`} />
                </div>
                <div className="col-span-2">
                    <GalleryImg src={preview[1]} alt={`${trekName} trek photo 2`} />
                </div>
                <div className="col-span-2 relative">
                    <GalleryImg src={preview[2]} alt={`${trekName} trek photo 3`} />
                    <button
                        onClick={() => setLightboxIndex(3)}
                        className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2 hover:bg-black/65 transition-colors"
                    >
                        <span className="text-white text-4xl font-black tracking-tighter">+{remaining}</span>
                        <span className="text-white text-[10px] font-black uppercase tracking-[0.25em]">View All Photos</span>
                    </button>
                </div>
            </div>

            {/* ── Mobile: 1 full-width + 2-across row ── */}
            <div className="md:hidden flex flex-col gap-2">
                <div className="h-56 w-full">
                    <GalleryImg src={preview[0]} alt={`${trekName} trek photo 1`} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-[4/3]">
                        <GalleryImg src={preview[1]} alt={`${trekName} trek photo 2`} />
                    </div>
                    <div className="aspect-[4/3] relative">
                        <GalleryImg src={preview[2]} alt={`${trekName} trek photo 3`} />
                        <button
                            onClick={() => setLightboxIndex(3)}
                            className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-3 hover:bg-black/65 transition-colors"
                        >
                            <span className="text-white text-3xl font-black tracking-tighter">+{remaining}</span>
                            <span className="text-white text-[9px] font-black uppercase tracking-[0.2em]">View All</span>
                        </button>
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
