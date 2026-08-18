import { Quote } from "lucide-react";
import { urlFor } from "@/sanity/image";
import ScrollGrayscaleImage from "@/components/ScrollGrayscaleImage";

interface Principle {
  title?: string
  description?: string
  ctaLabel?: string
  ctaTarget?: 'treks' | 'whatsapp'
}

interface WhyWeTrekData {
  eyebrow?: string
  headline?: string
  openingCopy?: string
  pullQuote?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any
  principlesHeading?: string
  principles?: Principle[]
  closingStatement?: string
  primaryCtaText?: string
  whatsappCtaText?: string
}

const FALLBACK = {
  eyebrow: 'Why We Trek',
  headline: 'Everyone comes to the mountains for a different reason.',
  openingCopy:
    'Some come looking for a challenge. Some for time with friends. Some want to step away from routine, while others are drawn by the quiet, the landscape, or simply the idea of seeing what lies beyond the next ridge.\n\nWhat we’ve learnt over the years is that a trek can become much more than the trail itself. What you take back from it is deeply personal.\n\nThat’s also why we don’t believe there is one trek that is right for everyone.',
  pullQuote: 'The mountains are the medium, not the destination. What you carry back with you is the real reason you came.',
  principlesHeading: 'So, How Do We Help You Find Yours?',
  principles: [
    {
      title: 'Start With Our Signature Treks',
      description: 'Journeys we know deeply and return to season after season, with fixed departures you can join.',
      ctaLabel: 'see the treks',
      ctaTarget: 'treks' as const,
    },
    {
      title: 'Or Make The Journey Your Own',
      description: 'Your dates, your group, your pace. We can shape a Himalayan journey around what you’re looking for.',
      ctaLabel: 'tell us what you have in mind',
      ctaTarget: 'whatsapp' as const,
    },
    {
      title: 'And If You’re Not Sure, Ask Us',
      description: 'Tell us about your experience, fitness, time and what is drawing you to the mountains. We’ll help you think through what might suit you — even if the right answer is a trek we don’t operate.',
      ctaLabel: 'start the conversation',
      ctaTarget: 'whatsapp' as const,
    },
  ],
  closingStatement: 'We’d rather help you find the right journey than sell you the wrong one.',
  primaryCtaText: 'Browse Signature Treks',
  whatsappCtaText: 'Ask a Trek Lead',
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

// Same two-line, light-shaded-second-half treatment used by the Special Projects heading.
function SplitHeadline({ text }: { text: string }) {
  const words = text.split(' ')
  if (words.length < 2) return <>{text}</>
  const splitAt = Math.ceil(words.length / 2)
  return (
    <>
      {words.slice(0, splitAt).join(' ')}
      <br />
      <span className="text-slate-300">{words.slice(splitAt).join(' ')}</span>
    </>
  )
}

export default function WhyWeTrek({ data, whatsappNumber = '' }: { data?: WhyWeTrekData; whatsappNumber?: string }) {
  const eyebrow = data?.eyebrow || FALLBACK.eyebrow
  const headline = data?.headline || FALLBACK.headline
  const openingCopy = data?.openingCopy || FALLBACK.openingCopy
  const pullQuote = data?.pullQuote || FALLBACK.pullQuote
  const imageUrl = data?.image?.asset ? urlFor(data.image).width(1200).quality(80).url() : null
  const principlesHeading = data?.principlesHeading || FALLBACK.principlesHeading
  const principles = data?.principles?.length ? data.principles : FALLBACK.principles
  const closingStatement = data?.closingStatement || FALLBACK.closingStatement
  const primaryCtaText = data?.primaryCtaText || FALLBACK.primaryCtaText
  const whatsappCtaText = data?.whatsappCtaText || FALLBACK.whatsappCtaText

  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'd like some advice on finding the right Himalayan trek for me.")}`
    : '#enquire'

  const body = (
    <>
      <Paragraphs text={openingCopy} />

      <div className="flex items-start gap-2.5 my-8">
        <Quote className="text-primary w-4 h-4 shrink-0 mt-1.5" />
        <p className="text-lg md:text-xl font-light italic text-slate-700 leading-snug">{pullQuote}</p>
      </div>

      <h3 className="text-slate-900 font-black uppercase tracking-tight text-2xl md:text-3xl leading-tight border-t border-zinc-border pt-8 mb-8">
        {principlesHeading}
      </h3>

      <div className="space-y-7 mb-10 ">
        {principles.map((p, i) => (
          <div key={p.title ?? i} className="flex gap-5">
            <span className="text-3xl md:text-4xl font-black text-primary leading-none shrink-0 tabular-nums">{(i + 1).toString().padStart(2, '0')}</span>
            <div className="pt-1">
              <p className="text-slate-900 font-black text-base md:text-lg uppercase tracking-tight mb-1.5">
                {p.title}
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {p.description}{' '}
                <a
                  href={p.ctaTarget === 'treks' ? '#treks' : whatsappHref}
                  target={p.ctaTarget !== 'treks' && whatsappNumber ? '_blank' : undefined}
                  rel={p.ctaTarget !== 'treks' && whatsappNumber ? 'noopener noreferrer' : undefined}
                  className="text-primary font-semibold underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors whitespace-nowrap"
                >
                  {p.ctaLabel} →
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-slate-900 font-bold text-lg leading-relaxed border-l-4 border-primary pl-4 my-8">
        {closingStatement}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href="#treks"
          className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-primary transition-colors"
        >
          {primaryCtaText} ↓
        </a>

        <a
          href={whatsappHref}
          target={whatsappNumber ? '_blank' : undefined}
          rel={whatsappNumber ? 'noopener noreferrer' : undefined}
          className="inline-flex flex-col items-start gap-0.5 bg-[#25D366] text-white px-6 py-3 hover:brightness-110 transition-all"
        >
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest">
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            {whatsappCtaText} →
          </span>
        </a>
      </div>
    </>
  )

  return (
    <section className="w-full border-t border-zinc-border bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row gap-10 md:gap-16">
        <div className="md:w-2/5">
          <div className="md:sticky md:top-24">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-3">{eyebrow}</span>
            <h2 className="text-5xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              <SplitHeadline text={headline} />
            </h2>
            {imageUrl && (
              <div className="relative overflow-hidden mt-8" style={{ minHeight: '320px' }}>
                <ScrollGrayscaleImage
                  src={imageUrl}
                  alt="Trekkers on the trail with Yeti Expeditions"
                  className="absolute inset-0"
                  scaleOnHover={false}
                />
              </div>
            )}
          </div>
        </div>
        <div className="md:w-3/5 md:border-l md:border-zinc-border md:pl-16">
          {body}
        </div>
      </div>
    </section>
  )
}
