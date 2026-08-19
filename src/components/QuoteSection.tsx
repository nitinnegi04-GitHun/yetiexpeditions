'use client';

import { Fragment } from "react";
import { Quote, ArrowRight } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import ScrollGrayscaleImage from "@/components/ScrollGrayscaleImage";
import { trackCTA } from "@/lib/tracking/analytics";

interface TimelinePhase {
  phase?: string
  text?: string
  tags?: string[]
}

interface QuoteData {
  eyebrow?: string
  headline?: string
  quote?: string
  author?: string
  authorTitle?: string
  timeline?: TimelinePhase[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authorPhoto?: any
  linkText?: string
  linkUrl?: string
}

const FALLBACK = {
  eyebrow: 'From The Founder',
  headline: 'From The Army\nTo The\nHimalayas.',
}

// MOCK LAYOUT ONLY — phase descriptions pending real biographical details.
// Credentials (pulled from the Our Story page) are all under Army for now until
// we know which phase each one actually belongs to.
const FALLBACK_TIMELINE: TimelinePhase[] = [
  {
    phase: 'Army',
    tags: ['HAWS Instructor', 'SBS Instructor', 'ABVIMAS Instructor', 'Felicitated by Govt. of India, 2022'],
  },
  { phase: 'Post-Army' },
  { phase: 'Current' },
]

// One line per row; the last line is de-emphasized — mirrors the shaded-tail
// treatment used by Why Us's headline.
function HeadlineLines({ text }: { text: string }) {
  const lines = text.split('\n').filter(Boolean)
  return (
    <>
      {lines.map((line, i) => (
        i === lines.length - 1
          ? <span key={i} className="text-white/30">{line}</span>
          : <span key={i}>{line}<br /></span>
      ))}
    </>
  )
}

function FounderTimeline({ timeline }: { timeline: TimelinePhase[] }) {
  return (
    <div className="bg-white/[0.04] border border-white/10 px-5 py-4">
      <div className="grid grid-cols-[92px_1fr] gap-x-4 gap-y-0">
        {timeline.map((t, i) => {
          const isCurrent = i === timeline.length - 1
          const rowBorder = i > 0 ? 'border-t border-white/10' : ''
          return (
            <Fragment key={t.phase ?? i}>
              <span
                className={`font-black uppercase tracking-widest text-xs py-3 ${rowBorder} ${isCurrent ? 'text-white' : 'text-primary'}`}
              >
                {t.phase}
              </span>
              <div className={`flex flex-wrap items-center gap-x-2 gap-y-1.5 py-3 ${rowBorder} text-left`}>
                {t.text && (
                  <span className={`leading-relaxed ${isCurrent ? 'text-white text-sm font-semibold' : 'text-white/60 text-sm'}`}>
                    {t.text}
                  </span>
                )}
                {t.tags?.map((tag) => (
                  <span key={tag} className="text-white/70 text-[10px] font-bold uppercase tracking-widest border border-white/20 px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default function QuoteSection({ data }: { data?: QuoteData }) {
  const eyebrow     = data?.eyebrow     || FALLBACK.eyebrow
  const headline    = data?.headline    || FALLBACK.headline
  const quote       = data?.quote       ?? "There isn’t one right way to do a trek. My job — and Yeti’s — is to help you find the one that’s actually right for you."
  const author      = data?.author      ?? "Pradhuman Singh Negi"
  const authorTitle = data?.authorTitle ?? "Co-Founder, Yeti Expeditions"
  const timeline    = data?.timeline?.length ? data.timeline : FALLBACK_TIMELINE
  const linkText    = data?.linkText    ?? "More About Me"
  const linkUrl     = data?.linkUrl     ?? "/our-story"
  const imageUrl = data?.authorPhoto?.asset ? urlFor(data.authorPhoto).width(1200).quality(80).url() : null

  return (
    <section className="w-full border-t border-zinc-border bg-slate-900">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row gap-10 md:gap-16">
        <div className="md:w-2/5">
          <div className="md:sticky md:top-24">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-3">{eyebrow}</span>
            <h2 className="text-5xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">
              <HeadlineLines text={headline} />
            </h2>
            <div className="relative overflow-hidden mt-8 bg-slate-800" style={{ minHeight: '320px' }}>
              {imageUrl ? (
                <ScrollGrayscaleImage
                  src={imageUrl}
                  alt={author}
                  className="absolute inset-0"
                  scaleOnHover={false}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/20 text-8xl font-black">{author.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="md:w-3/5 md:border-l md:border-white/10 md:pl-16">
          <Quote className="text-primary w-9 h-9 mb-5" />
          <h5 className="text-white text-2xl lg:text-3xl font-light italic leading-snug tracking-tight">
            &ldquo;{quote}&rdquo;
          </h5>
          <div className="mt-8">
            <p className="text-primary font-black uppercase tracking-[0.3em] text-sm">{author}</p>
            <p className="text-slate-500 text-[10px] uppercase mt-1">{authorTitle}</p>
          </div>
          <div className="mt-6">
            <FounderTimeline timeline={timeline} />
          </div>
          <Link
            href={linkUrl}
            onClick={() => trackCTA({ cta_name: 'view_our_story', location: 'quote_section' })}
            className="inline-flex items-center gap-2 text-white/80 text-xs font-black uppercase tracking-widest hover:text-primary hover:gap-3 transition-all group mt-6"
          >
            {linkText}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
