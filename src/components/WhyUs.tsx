import { urlFor } from "@/sanity/image";
import ScrollGrayscaleImage from "@/components/ScrollGrayscaleImage";

// Placeholder — shown until a real Yeti photo (guides + trekkers together, not a
// landscape shot) is uploaded in Studio (Homepage → Why Us → Image).
const PLACEHOLDER_IMAGE = "https://lh3.googleusercontent.com/aida/AOfcidW6Gc38U8OOYUBOpPfVS5VhIkLWJy9845TTSkVQPjHI-2pHux-WNn_tQ_bQYLQf0eTxUbO_TrjTbCOYT5_PAKoC6DNxKb_NMsyo365uR0bPBxgGgEX84fqaTV09W0zK6pmk-Ayw9R3QWgc-n7hOCE78UIUkEc_BGQ8uMs0rgMCaLWmUtyki6_E79F8143bh7crPfp8fwVWEukj5lhWaLEYFTqYCoWmjrDfRX7_fVLFSq-B3J3kOGvBygyE"

interface Principle {
  title?: string
  description?: string
  label?: string
}

interface WhyUsData {
  eyebrow?: string
  headline?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any
  openingCopy?: string
  principlesHeading?: string
  principles?: Principle[]
  closingStatement?: string
  ctaText?: string
}

const FALLBACK = {
  eyebrow: 'Why Us',
  headline: 'The Difference\nIs In How\nWe Do Things.',
  openingCopy:
    'Anyone can plan a route, book a tea house and get you to the trailhead. For us, that’s only the beginning.\n\nThe quality of a Himalayan journey is shaped by hundreds of small decisions — most of which you should never have to think about.\n\nThat’s where we believe Yeti should make a difference.',
  principlesHeading: 'How That Shows Up On The Trail',
  principles: [
    {
      title: 'Personal Attention, By Design',
      description: 'We keep our groups small and maintain a 1:4 guide ratio so our team has the time to know how each trekker is actually doing — not just lead the group from the front.',
      label: '1:4 Guide Ratio · Max 12 Trekkers',
    },
    {
      title: 'Prepared, Not Just Experienced',
      description: 'Experience matters. So does knowing what to do with it. Our lead guides are trained in wilderness medicine, and our journeys are designed around thoughtful acclimatization and on-trail monitoring.',
      label: 'WFR · Oximetry · Acclimatization',
    },
    {
      title: 'The Details Are Our Job',
      description: 'Permits, stays, transfers, route logistics, coordination and the inevitable changes that come with the mountains — we handle the moving parts so they don’t become your journey.',
    },
    {
      title: 'People Before Itineraries',
      description: 'We don’t start with what we want to sell. We start with what might be right for you — even when that means suggesting a different journey.',
    },
  ],
  closingStatement: 'A well-run trek shouldn’t make you notice the logistics. It should give you the freedom to notice everything else.',
  ctaText: 'Our Story',
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((para, i) => (
        <p key={i} className="text-slate-600 leading-relaxed text-base mb-4 last:mb-0">{para}</p>
      ))}
    </>
  )
}

// One line per row; the last line is de-emphasized — mirrors the shaded-tail
// treatment used by Why We Trek's SplitHeadline.
function HeadlineLines({ text }: { text: string }) {
  const lines = text.split('\n').filter(Boolean)
  return (
    <>
      {lines.map((line, i) => (
        i === lines.length - 1
          ? <span key={i} className="text-slate-300">{line}</span>
          : <span key={i}>{line}<br /></span>
      ))}
    </>
  )
}

export default function WhyUs({ data }: { data?: WhyUsData }) {
  const eyebrow = data?.eyebrow || FALLBACK.eyebrow
  const headline = data?.headline || FALLBACK.headline
  const imageUrl = data?.image?.asset ? urlFor(data.image).width(1200).quality(80).url() : null
  const openingCopy = data?.openingCopy || FALLBACK.openingCopy
  const principlesHeading = data?.principlesHeading || FALLBACK.principlesHeading
  const principles = data?.principles?.length ? data.principles : FALLBACK.principles
  const closingStatement = data?.closingStatement || FALLBACK.closingStatement
  const ctaText = data?.ctaText || FALLBACK.ctaText

  return (
    <section className="w-full border-t border-zinc-border bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row gap-10 md:gap-16">
        <div className="md:w-2/5">
          <div className="md:sticky md:top-24">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-3">{eyebrow}</span>
            <h2 className="text-5xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              <HeadlineLines text={headline} />
            </h2>
            <div className="relative overflow-hidden mt-8" style={{ minHeight: '320px' }}>
              <ScrollGrayscaleImage
                src={imageUrl ?? PLACEHOLDER_IMAGE}
                alt="Yeti Expeditions guides and trekkers on the trail"
                className="absolute inset-0"
                scaleOnHover={false}
              />
            </div>
          </div>
        </div>

        <div className="md:w-3/5 md:border-l md:border-zinc-border md:pl-16">
          <Paragraphs text={openingCopy} />

          <h3 className="text-slate-900 font-black uppercase tracking-tight text-2xl md:text-3xl leading-tight border-t border-zinc-border pt-8 mb-8 mt-8">
            {principlesHeading}
          </h3>

          <div className="space-y-7 mb-10">
            {principles.map((p, i) => (
              <div key={p.title ?? i} className="flex gap-5">
                <span className="text-3xl md:text-4xl font-black text-primary leading-none shrink-0 tabular-nums">{(i + 1).toString().padStart(2, '0')}</span>
                <div className="pt-1">
                  <p className="text-slate-900 font-black text-base md:text-lg uppercase tracking-tight mb-1.5">
                    {p.title}
                  </p>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    {p.description}
                  </p>
                  {p.label && (
                    <p className="text-primary font-black text-[10px] uppercase tracking-widest mt-2">{p.label}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2.5 my-8">
            <p className="text-lg md:text-xl font-light italic text-slate-700 leading-snug">{closingStatement}</p>
          </div>

          <a
            href="/our-story"
            className="inline-flex items-center gap-1.5 text-primary font-black text-xs uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            {ctaText} →
          </a>
        </div>
      </div>
    </section>
  )
}
