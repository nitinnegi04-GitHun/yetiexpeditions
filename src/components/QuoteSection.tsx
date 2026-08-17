import { Quote, ArrowRight } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/sanity/image";

interface QuoteData {
  quote?: string
  author?: string
  authorTitle?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authorPhoto?: any
  linkText?: string
  linkUrl?: string
}

export default function QuoteSection({ data }: { data?: QuoteData }) {
  const quote       = data?.quote       ?? "There isn’t one right way to do a trek. My job — and Yeti’s — is to help you find the one that’s actually right for you."
  const author      = data?.author      ?? "Pradhuman Singh Negi"
  const authorTitle = data?.authorTitle ?? "Co-Founder, Yeti Expeditions"
  const linkText    = data?.linkText    ?? "More About Me"
  const linkUrl     = data?.linkUrl     ?? "/our-story"
  const smallPhotoUrl = data?.authorPhoto?.asset ? urlFor(data.authorPhoto).width(160).height(160).url() : null
  const largePhotoUrl = data?.authorPhoto?.asset ? urlFor(data.authorPhoto).width(900).quality(85).url() : null

  const dots = (
    <div
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #E4E4E7 1px, transparent 0)", backgroundSize: "40px 40px" }}
    />
  )

  return (
    <section className="w-full bg-slate-900">
      {/* Mobile — unchanged centered layout */}
      <div className="md:hidden py-16 relative overflow-hidden">
        {dots}
        <div className="max-w-[960px] mx-auto px-6 text-center relative z-10">
          <Quote className="text-primary w-12 h-12 mx-auto mb-8" />
          <h5 className="text-white text-3xl font-light italic leading-tight tracking-tight">
            &ldquo;{quote}&rdquo;
          </h5>
          <div className="mt-10 flex flex-col items-center gap-4">
            {smallPhotoUrl ? (
              <img
                src={smallPhotoUrl}
                alt={author}
                className="w-16 h-16 rounded-full object-cover object-top grayscale border border-white/20"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center">
                <span className="text-white/70 text-lg font-black">{author.charAt(0)}</span>
              </div>
            )}
            <div>
              <p className="text-primary font-black uppercase tracking-[0.3em] text-sm">{author}</p>
              <p className="text-slate-500 text-[10px] uppercase mt-1">{authorTitle}</p>
            </div>
            <Link
              href={linkUrl}
              className="inline-flex items-center gap-2 text-white/80 text-xs font-black uppercase tracking-widest hover:text-primary hover:gap-3 transition-all group mt-2"
            >
              {linkText}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop — split screen */}
      <div className="hidden md:flex max-w-[1440px] mx-auto">
        <div className="w-2/5 relative overflow-hidden bg-slate-800 border-r border-white/10" style={{ minHeight: '480px' }}>
          {largePhotoUrl ? (
            <img
              src={largePhotoUrl}
              alt={author}
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/20 text-9xl font-black">{author.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="w-3/5 relative overflow-hidden flex items-center">
          {dots}
          <div className="px-12 lg:px-20 py-20 relative z-10">
            <Quote className="text-primary w-12 h-12 mb-8" />
            <h5 className="text-white text-3xl lg:text-4xl font-light italic leading-tight tracking-tight">
              &ldquo;{quote}&rdquo;
            </h5>
            <div className="mt-10">
              <p className="text-primary font-black uppercase tracking-[0.3em] text-sm">{author}</p>
              <p className="text-slate-500 text-[10px] uppercase mt-1">{authorTitle}</p>
              <Link
                href={linkUrl}
                className="inline-flex items-center gap-2 text-white/80 text-xs font-black uppercase tracking-widest hover:text-primary hover:gap-3 transition-all group mt-6"
              >
                {linkText}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
