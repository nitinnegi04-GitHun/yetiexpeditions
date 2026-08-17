'use client';

import { useRef } from "react";
import VideoMuteToggle from "@/components/VideoMuteToggle";

interface TrekHeroBannerProps {
    src: string;
    videoSrc?: string;
}

export default function TrekHeroBannerV2({ src, videoSrc }: TrekHeroBannerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    if (videoSrc) {
        return (
            <>
                <video
                    ref={videoRef}
                    src={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover md:scale-[1.35] grayscale-[55%] brightness-95 contrast-110 trek-hero-mobile-reveal group-hover:grayscale-0 transition-all duration-700"
                />
                <VideoMuteToggle videoRef={videoRef} className="absolute bottom-4 right-4 md:bottom-6 md:right-6" />
            </>
        );
    }

    return (
        <div
            className="absolute inset-0 bg-cover bg-center grayscale-[55%] brightness-95 contrast-110 trek-hero-mobile-reveal group-hover:grayscale-0 transition-all duration-700"
            style={{ backgroundImage: `url(${src})` }}
        />
    );
}
