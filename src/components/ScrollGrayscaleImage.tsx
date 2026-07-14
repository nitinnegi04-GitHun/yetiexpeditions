'use client';

import { useState, type CSSProperties } from 'react';
import { useScrollGrayscale } from '@/hooks/useScrollGrayscale';

interface ScrollGrayscaleImageProps {
    src: string;
    alt: string;
    /** Classes on the wrapping div — control position/sizing (e.g. "absolute inset-0"). */
    className?: string;
    /** Inline style on the wrapping div — e.g. a fixed height. */
    style?: CSSProperties;
    /** Scale image to 1.05 on hover. Default true — set false for large hero/banner images. */
    scaleOnHover?: boolean;
    maxGrayscale?: number;
    /** Render as a CSS background-image div instead of an <img> (for full-bleed hero sections). */
    mode?: 'img' | 'bg';
    /** Extra filter functions appended after grayscale/contrast, e.g. "brightness(0.75)". */
    extraFilter?: string;
}

export default function ScrollGrayscaleImage({
    src,
    alt,
    className = '',
    style: wrapperStyle,
    scaleOnHover = true,
    maxGrayscale = 55,
    mode = 'img',
    extraFilter,
}: ScrollGrayscaleImageProps) {
    const { ref, filter } = useScrollGrayscale(maxGrayscale);
    const [hovered, setHovered] = useState(false);

    const baseFilter = hovered ? 'grayscale(0%) contrast(1)' : filter;
    const style: CSSProperties = {
        filter: extraFilter ? `${baseFilter} ${extraFilter}` : baseFilter,
        transform: scaleOnHover ? (hovered ? 'scale(1.05)' : 'scale(1)') : undefined,
        transition: 'filter 400ms ease, transform 500ms ease',
    };

    if (mode === 'bg') {
        return (
            <div
                ref={ref}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                role="img"
                aria-label={alt}
                className={className}
                style={{ ...wrapperStyle, ...style, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
        );
    }

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={className}
            style={wrapperStyle}
        >
            <img src={src} alt={alt} className="w-full h-full object-cover" style={style} />
        </div>
    );
}
