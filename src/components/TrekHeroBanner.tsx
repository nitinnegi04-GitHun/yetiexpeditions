'use client';

interface TrekHeroBannerProps {
    src: string;
    videoSrc?: string;
}

export default function TrekHeroBanner({ src, videoSrc }: TrekHeroBannerProps) {
    if (videoSrc) {
        return (
            <video
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 contrast-125 trek-hero-mobile-reveal group-hover:grayscale-0 transition-all duration-700"
            />
        );
    }

    return (
        <div
            className="absolute inset-0 bg-cover bg-center grayscale brightness-75 contrast-125 trek-hero-mobile-reveal group-hover:grayscale-0 transition-all duration-700"
            style={{ backgroundImage: `url(${src})` }}
        />
    );
}
