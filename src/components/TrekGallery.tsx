'use client';

import { useState } from 'react';
import { useScrollGrayscale } from '@/hooks/useScrollGrayscale';

function GalleryImg({ src, alt }: { src: string; alt: string }) {
    const { ref, filter } = useScrollGrayscale();
    const [hovered, setHovered] = useState(false);
    return (
        <div
            ref={ref}
            className="absolute inset-0 overflow-hidden bg-slate-100"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
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

export default function TrekGallery({ images, trekName }: { images: string[]; trekName: string }) {
    const [expanded, setExpanded] = useState(false);
    const preview = images.slice(0, 3);
    const remaining = images.slice(3);

    return (
        <div>
            {/* ── Desktop: left 60% hero + right 40% stacked two ── */}
            <div className="hidden md:grid grid-cols-5 grid-rows-2 gap-2 h-[540px]">
                <div className="col-span-3 row-span-2 relative">
                    <GalleryImg src={preview[0]} alt={`${trekName} trek photo 1`} />
                </div>
                <div className="col-span-2 relative">
                    <GalleryImg src={preview[1]} alt={`${trekName} trek photo 2`} />
                </div>
                <div className="col-span-2 relative">
                    <GalleryImg src={preview[2]} alt={`${trekName} trek photo 3`} />
                    {!expanded && remaining.length > 0 && (
                        <button
                            onClick={() => setExpanded(true)}
                            className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2 hover:bg-black/65 transition-colors z-10"
                        >
                            <span className="text-white text-4xl font-black tracking-tighter">+{remaining.length}</span>
                            <span className="text-white text-[10px] font-black uppercase tracking-[0.25em]">View All Photos</span>
                        </button>
                    )}
                </div>
            </div>

            {/* ── Mobile: 1 full-width + 2-across row ── */}
            <div className="md:hidden flex flex-col gap-2">
                <div className="relative h-56 w-full">
                    <GalleryImg src={preview[0]} alt={`${trekName} trek photo 1`} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="relative aspect-[4/3]">
                        <GalleryImg src={preview[1]} alt={`${trekName} trek photo 2`} />
                    </div>
                    <div className="relative aspect-[4/3]">
                        <GalleryImg src={preview[2]} alt={`${trekName} trek photo 3`} />
                        {!expanded && remaining.length > 0 && (
                            <button
                                onClick={() => setExpanded(true)}
                                className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-3 hover:bg-black/65 transition-colors z-10"
                            >
                                <span className="text-white text-3xl font-black tracking-tighter">+{remaining.length}</span>
                                <span className="text-white text-[9px] font-black uppercase tracking-[0.2em]">View All</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Expanded remaining images ── */}
            {expanded && remaining.length > 0 && (
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                    {remaining.map((img, i) => (
                        <div key={i} className="relative aspect-[4/3]">
                            <GalleryImg src={img} alt={`${trekName} trek photo ${i + 4}`} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
