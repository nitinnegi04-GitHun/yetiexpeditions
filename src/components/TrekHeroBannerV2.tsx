'use client';

interface TrekHeroBannerProps {
    src: string;
    videoSrc?: string;
}

export default function TrekHeroBannerV2({ src, videoSrc }: TrekHeroBannerProps) {
    if (videoSrc) {
        return (
            <video
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover md:scale-[1.35] grayscale-[55%] brightness-95 contrast-110 trek-hero-mobile-reveal group-hover:grayscale-0 transition-all duration-700"
            />
        );
    }

    return (
        <div
            className="absolute inset-0 bg-cover bg-center grayscale-[55%] brightness-95 contrast-110 trek-hero-mobile-reveal group-hover:grayscale-0 transition-all duration-700"
            style={{ backgroundImage: `url(${src})` }}
        />
    );
}
