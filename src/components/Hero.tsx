'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@sanity/client";
import { urlFor } from "@/sanity/image";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'qmj04x7n',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const FALLBACK_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDiHbmYyYGaTh5ARUWejOA5l9Z7E5DgvlQurzssXYqn0QWZD3Vmnp0Cj5WP12qOqtqJU1vQ6mvGfuEpwLkmf2pow3oQBcKucJRSfaCc7L-shf9FL_gTbJ9TQJ2sV5dburhHwpyRWJv1vnefycut3Af6X2nvKG074F1q0eFM4If8D1zhCPLyAfuGfMcZbbkWtXDhizuVVPZEu6taWsO_X0iyCFOt3sgaH4WkSYb4YBgc8Zb3niHk_MC3ZJ1spQ1bTh2dvQbNEUX9oq4"

interface HeroData {
  badge?: string
  headlineLine1?: string
  headlineLine2?: string
  headlineLine3?: string
  subheading?: string
  ctaText?: string
  ctaUrl?: string
  imageCaption?: string
  imageCoordinates?: string
  heroVideo?: {
    asset?: {
      url: string
    }
  }
}

interface HeroProps {
  data?: HeroData
  heroImageUrl?: string
}

export default function Hero({ data, heroImageUrl }: HeroProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [mobileGrayscale, setMobileGrayscale] = useState(70);
  const mobileVideoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sanity
      .fetch(`*[_type == "siteSettings"][0]{ logo }`)
      .then((s: any) => {
        if (s?.logo) setLogoUrl(urlFor(s.logo).height(80).quality(90).url());
      })
      .catch(() => { });
  }, []);

  // Scroll-driven grayscale for mobile: fades to full color as video scrolls out of view
  useEffect(() => {
    const handleScroll = () => {
      if (!mobileVideoRef.current) return;
      const rect = mobileVideoRef.current.getBoundingClientRect();
      const scrolledOut = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolledOut / rect.height);
      setMobileGrayscale(Math.round(70 * (1 - progress)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const badge = data?.badge ?? 'High Altitude Logistics'
  const line1 = data?.headlineLine1 ?? 'Safety.'
  const line2 = data?.headlineLine2 ?? 'Comfort.'
  const line3 = data?.headlineLine3 ?? 'The Himalayas.'
  const subheading = data?.subheading ?? "Experience the world's highest peaks with highly qualified guides and unmatched safety standards."
  const ctaText = data?.ctaText ?? 'View Expeditions'
  const ctaUrl = data?.ctaUrl ?? '/treks'
  const imageCaption = data?.imageCaption ?? 'Mount Everest Base Camp'
  const imageCoords = data?.imageCoordinates ?? '28.0026° N, 86.8528° E'
  const imageUrl = heroImageUrl ?? FALLBACK_IMAGE
  const videoUrl = data?.heroVideo?.asset?.url

  return (
    <>
      {/* Mobile-only image/video — appears ABOVE text on mobile */}
      <div ref={mobileVideoRef} className="md:hidden relative w-full bg-slate-100 overflow-hidden border-b border-zinc-border" style={{ height: '160vw', minHeight: '350px' }}>
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
            style={{ filter: `grayscale(${mobileGrayscale}%)` }}
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center grayscale contrast-125"
            style={{ backgroundImage: `url('${imageUrl}')` }}
          />
        )}

        {/* Subtle dark gradient to ensure text readability */}
        <div className="absolute border-l-4 border-primary pl-4 z-10" style={{ top: '40px', left: '24px' }}>
          <p className="text-white text-xs font-bold uppercase tracking-widest">{imageCaption}</p>
          <p className="text-white/80 text-[10px] uppercase">{imageCoords}</p>
        </div>

        {/* Logo — top right, same height as caption */}
        {logoUrl && (
          <div className="absolute z-10" style={{ top: '40px', right: '24px' }}>
            <img src={logoUrl} alt="Logo" style={{ height: '28px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          </div>
        )}
      </div>

      <section className="w-full border-b border-zinc-border">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row min-h-[80vh]">
          {/* Left Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-between md:justify-center md:min-h-0 px-6 pt-12 pb-8 md:pt-12 md:px-24 md:pb-24 border-b md:border-b-0 md:border-r border-zinc-border" style={{ minHeight: 0 }}>
            <div className="space-y-5 md:space-y-8">
              <span className="inline-block bg-primary text-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                {badge}
              </span>
              <h2 className="text-[15vw] md:text-8xl font-black md:leading-[.88] leading-[1.1] tracking-tighter text-slate-900 md:pt-0 uppercase">
                <span className="text-[90px]">{line1}</span><br />{line2}<br />{line3}
              </h2>
              <p className="text-[20px] italic md:text-lg text-slate-600 leading-relaxed">
                {subheading}
              </p>
              <Link href={ctaUrl} className="inline-block md:w-auto text-center bg-slate-900 text-white px-8 py-4 md:px-10 md:py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors">
                {ctaText}
              </Link>
            </div>
            <div />
          </div>

          {/* Right Image/Video — desktop only */}
          <div className="hidden md:block md:w-1/2 bg-slate-100 relative overflow-hidden group">
            {videoUrl ? (
              <video
                src={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
              />
            ) : (
              <div
                className="absolute inset-0 bg-cover bg-center grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                style={{ backgroundImage: `url('${imageUrl}')` }}
              />
            )}

            {/* Subtle dark gradient to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute border-l-4 border-primary pl-4 z-10" style={{ top: '64px', left: '40px' }}>
              <p className="text-white text-xs font-bold uppercase tracking-widest">{imageCaption}</p>
              <p className="text-white/80 text-[10px] uppercase">{imageCoords}</p>
            </div>

            {/* Logo — top right, same height as caption */}
            {logoUrl && (
              <div className="absolute z-10" style={{ top: '64px', right: '40px' }}>
                <img src={logoUrl} alt="Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
