'use client';

import { useScrollGrayscale } from '@/hooks/useScrollGrayscale';

function GalleryImg({ src, alt, large }: { src: string; alt: string; large: boolean }) {
    const { ref, filter } = useScrollGrayscale();
    return (
        <div
            ref={ref}
            className={`overflow-hidden bg-slate-100 ${large ? 'col-span-2 row-span-2' : ''}`}
            style={{ aspectRatio: large ? '16/9' : '4/3' }}
        >
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-all duration-500 hover:grayscale-0"
                style={{ filter, transition: 'filter 300ms ease' }}
            />
        </div>
    );
}

export default function TrekGallery({ images, trekName }: { images: string[]; trekName: string }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {images.map((img, i) => (
                <GalleryImg
                    key={i}
                    src={img}
                    alt={`${trekName} trek photo ${i + 1}`}
                    large={i === 0}
                />
            ))}
        </div>
    );
}
