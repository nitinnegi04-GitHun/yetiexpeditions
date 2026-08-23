import { ArrowRight, MessageCircle, Instagram, Quote } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import TrackedLink from "@/components/TrackedLink";
import ScrollGrayscaleImage from "@/components/ScrollGrayscaleImage";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/siteSettings";
import type { Metadata } from "next";

export const revalidate = 86400;

const BASE_URL = "https://www.yetiexpeditions.com";
const PAGE_PATH = "/the-base-camp-project-chandigarh";

const YETI_INSTAGRAM_URL = "https://www.instagram.com/yeti.expeditions/";
const SHRUG_LIFE_INSTAGRAM_URL = "https://www.instagram.com/shruglifecf/";

// Same hero video used on the homepage (src/app/page.tsx via HOMEPAGE_QUERY hero.heroVideo)
const HERO_VIDEO_URL =
  "https://cdn.sanity.io/files/qmj04x7n/production/49e3da202222332034b651d78323ae302eb8cee2.mp4";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "The Base Camp Project — Shrug Life × Yeti Expeditions | Chandigarh";
  const description =
    "A Chandigarh community training and travelling together to Everest Base Camp and Annapurna Base Camp. 12 people, one journey — departing Kathmandu 1 October 2026.";
  const url = `${BASE_URL}${PAGE_PATH}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og-image.jpg`],
    },
  };
}

function waLink(number: string | null, text: string) {
  const digits = (number ?? "").replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

const timeline: { date: string; label: string; body: string }[] = [
  { date: "29 AUG", label: "Q&A at Shrug Life", body: "In-person session at Shrug Life, Chandigarh — EBC vs ABC, fitness, altitude, logistics, equipment and cost." },
  { date: "SEP", label: "Preparation Sessions", body: "Structured training sessions in Chandigarh to get every cohort trek-ready." },
  { date: "1 OCT", label: "Journey Starts", body: "Both cohorts begin their journey from Kathmandu." },
];

const faqs = [
  { question: "Do I need to be a Shrug Life member to join?", answer: "No. The Base Camp Project is open to anyone from Chandigarh — Shrug Life membership is not required." },
  { question: "Is this a fitness competition?", answer: "No. It is not a selection of the \"12 fittest people.\" The cohorts are small, close-knit groups training and travelling together — not a competition." },
  { question: "How do I choose between EBC and ABC?", answer: "Everest Base Camp is the 15-day flagship journey. Annapurna Base Camp is a 10-day option for a shorter time and lower investment commitment. Both are covered in detail at the 29 August Q&A." },
  { question: "What does the ₹1,11,900 / ₹69,500 cover?", answer: "Both prices are all-inclusive. Full cost breakdowns for both journeys will be walked through at the Shrug Life Q&A on 29 August." },
  { question: "How is the free spot in each cohort decided?", answer: "One participant in the EBC cohort and one in the ABC cohort will trek for free. A lucky draw will be held from the final 12 confirmed participants in each batch." },
  { question: "What about fitness prep, altitude and acclimatisation?", answer: "Shrug Life leads fitness and preparation training through September; Yeti Expeditions handles altitude, acclimatisation planning, safety and on-ground logistics. Both are covered at the Q&A." },
];

export default async function BaseCampProjectPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings: any = await client.fetch(SITE_SETTINGS_QUERY);

  const yetiLogoUrl: string = settings?.logo ? urlFor(settings.logo).height(80).quality(90).url() : "";
  const whatsappNumber: string | null = settings?.whatsappNumber ?? null;
  const instagramUrl: string | null = settings?.instagram ?? null;

  const heroWaText = "Hi! I'd like to know more about The Base Camp Project.";
  const ebcWaText = "Hi! I'm interested in the Everest Base Camp journey — The Base Camp Project.";
  const abcWaText = "Hi! I'm interested in the Annapurna Base Camp journey — The Base Camp Project.";
  const ctaWaText = "Hi! I'd like to join The Base Camp Project.";

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "The Base Camp Project",
    description:
      "A Chandigarh community initiative by Shrug Life and Yeti Expeditions — cohorts of 12 travelling together to Everest Base Camp and Annapurna Base Camp.",
    startDate: "2026-10-01",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: "Kathmandu, Nepal" },
    organizer: [
      { "@type": "Organization", name: "Yeti Expeditions", url: BASE_URL },
      { "@type": "Organization", name: "Shrug Life" },
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Everest Base Camp — 15 Days",
        price: "111900",
        priceCurrency: "INR",
        url: `${BASE_URL}${PAGE_PATH}`,
      },
      {
        "@type": "Offer",
        name: "Annapurna Base Camp — 10 Days",
        price: "69500",
        priceCurrency: "INR",
        url: `${BASE_URL}${PAGE_PATH}`,
      },
    ],
  };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      {/* ── Hero — same 50/50 split structure as home & trek pages ── */}
      <section className="w-full border-b border-zinc-border">
        {/* Mobile: banner stacked above text */}
        <div className="md:hidden relative w-full bg-slate-100 overflow-hidden border-b border-zinc-border" style={{ height: "160vw", minHeight: "350px" }}>
          <video
            src={HERO_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute border-l-4 border-primary pl-4 z-10" style={{ top: "40px", left: "24px" }}>
            <p className="text-white text-xs font-bold uppercase tracking-widest">Base Camp Project</p>
            <p className="text-white/80 text-[10px] uppercase">Chandigarh Cohort</p>
          </div>
          <div className="absolute z-10 flex items-center gap-3" style={{ top: "40px", right: "24px" }}>
            <TrackedLink href={SHRUG_LIFE_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" ctaName="follow_instagram" location="base_camp_project_brand_mention" channel="instagram">
              <img src="/ShrugLife%20Transparent%20Logo.png" alt="Shrug Life" style={{ height: "26px", width: "auto", objectFit: "contain" }} />
            </TrackedLink>
            {yetiLogoUrl && (
              <TrackedLink href={YETI_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" ctaName="follow_instagram" location="base_camp_project_brand_mention" channel="instagram">
                <img src={yetiLogoUrl} alt="Yeti Expeditions" style={{ height: "24px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              </TrackedLink>
            )}
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:min-h-[80vh]">
          {/* Left: Text */}
          <div className="w-full md:w-1/2 flex flex-col justify-between md:justify-center px-6 pt-12 pb-8 md:pt-12 md:px-24 md:pb-24 border-b md:border-b-0 md:border-r border-zinc-border">
            <div className="space-y-5 md:space-y-8">
              <span className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                <TrackedLink href={SHRUG_LIFE_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" ctaName="follow_instagram" location="base_camp_project_brand_mention" channel="instagram" className="hover:underline">
                  Shrug Life
                </TrackedLink>
                ×
                <TrackedLink href={YETI_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" ctaName="follow_instagram" location="base_camp_project_brand_mention" channel="instagram" className="hover:underline">
                  Yeti Expeditions
                </TrackedLink>
              </span>
              <h1 className="text-[15vw] md:text-8xl font-black md:leading-[.88] leading-[1.1] tracking-tighter text-slate-900 uppercase">
                The Base
                <br />Camp
                <span className="block mt-3 md:mt-4 text-slate-300">Project</span>
              </h1>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5 text-base md:text-lg text-slate-700 leading-snug">
                  <span className="text-primary font-black shrink-0">—</span>
                  <span>Everest Base Camp <span className="text-slate-400">or</span> Annapurna Base Camp</span>
                </li>
                <li className="flex items-start gap-2.5 text-base md:text-lg text-slate-700 leading-snug">
                  <span className="text-primary font-black shrink-0">—</span>
                  <span>Kathmandu, 1 Oct 2026 &nbsp;•&nbsp; 12 people, one journey</span>
                </li>
                <li className="flex items-start gap-2.5 text-base md:text-lg leading-snug">
                  <span className="text-primary font-black shrink-0">—</span>
                  <span className="font-black text-primary">1 seat in every cohort of 12 goes free</span>
                </li>
              </ul>
              <TrackedLink
                href={waLink(whatsappNumber, heroWaText)}
                target="_blank"
                rel="noopener noreferrer"
                ctaName="chat"
                location="base_camp_project_hero"
                channel="whatsapp"
                className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 md:px-10 md:py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0 text-green-500" />
                Join on WhatsApp
              </TrackedLink>
            </div>
            <div />
          </div>

          {/* Right Image — desktop only */}
          <div className="hidden md:block md:w-1/2 bg-slate-100 relative overflow-hidden group">
            <video
              src={HERO_VIDEO_URL}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover grayscale-[55%] brightness-95 contrast-110 group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute border-l-4 border-primary pl-4 z-10" style={{ top: "64px", left: "40px" }}>
              <p className="text-white text-xs font-bold uppercase tracking-widest">Base Camp Project</p>
              <p className="text-white/80 text-[10px] uppercase">Chandigarh Cohort</p>
            </div>
            <div className="absolute z-10 flex items-center gap-4" style={{ top: "64px", right: "40px" }}>
              <TrackedLink href={SHRUG_LIFE_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" ctaName="follow_instagram" location="base_camp_project_brand_mention" channel="instagram">
                <img src="/ShrugLife%20Transparent%20Logo.png" alt="Shrug Life" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
              </TrackedLink>
              {yetiLogoUrl && (
                <TrackedLink href={YETI_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" ctaName="follow_instagram" location="base_camp_project_brand_mention" channel="instagram">
                  <img src={yetiLogoUrl} alt="Yeti Expeditions" style={{ height: "34px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                </TrackedLink>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── The Idea ── */}
      <section className="w-full border-b border-zinc-border bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-24 flex flex-col md:flex-row gap-10 md:gap-16">
          <div className="md:w-2/5">
            <div className="md:sticky md:top-24">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-3">
                The Idea
              </span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
                One Community.
                <br />One Climb.
              </h2>
              <div className="relative overflow-hidden mt-8" style={{ minHeight: "320px" }}>
                <ScrollGrayscaleImage
                  src="https://cdn.sanity.io/images/qmj04x7n/production/f3aed359067bd57cda8ac049da5b758516c6e1b6-3024x4032.jpg"
                  alt="The Base Camp Project — Chandigarh cohort"
                  className="absolute inset-0"
                  scaleOnHover={false}
                />
              </div>
            </div>
          </div>

          <div className="md:w-3/5 md:border-l md:border-zinc-border md:pl-16">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-10">
              The Base Camp Project isn&rsquo;t a talent hunt for the 12 fittest athletes — it&rsquo;s an idea born out of pure passion. Twelve everyday people, sharing one dream: to stand at the foot of the world&rsquo;s great peaks, Everest Base Camp or Annapurna Base Camp, and finally make it real. Born right here in Chandigarh, brought to life by two homegrown brands — Shrug Life and Yeti Expeditions.
            </p>

            <h3 className="text-slate-900 font-black uppercase tracking-tight text-2xl md:text-3xl leading-tight border-t border-zinc-border pt-8 mb-8">
              Here&rsquo;s What That Means
            </h3>

            <div className="space-y-9 mb-10">
              <div className="flex gap-5">
                <span className="text-3xl md:text-4xl font-black text-primary leading-none shrink-0 tabular-nums">01</span>
                <div className="pt-1">
                  <p className="text-slate-900 font-black text-base md:text-lg uppercase tracking-tight mb-1.5">What This Is</p>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    A Chandigarh community coming together to train, travel and experience Base Camp together. Open to anyone in Chandigarh — not only Shrug Life members. Whichever journey you choose, everyone moves through the same arc: Chandigarh → Preparation → Community → Kathmandu → Himalayas → Base Camp. You don&rsquo;t sign up alone — you train, travel and summit as one of twelve.
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <span className="text-3xl md:text-4xl font-black text-primary leading-none shrink-0 tabular-nums">02</span>
                <div className="pt-1">
                  <p className="text-slate-900 font-black text-base md:text-lg uppercase tracking-tight mb-1.5">What This Isn&rsquo;t</p>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    Not a fitness competition. Not a selection of the &ldquo;12 fittest people.&rdquo; Not a trekking package being promoted through a gym. There is no strength test to pass and no leaderboard to climb — just a cohort of 12 preparing for the same mountain together, at whatever fitness level they&rsquo;re starting from.
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <span className="text-3xl md:text-4xl font-black text-primary leading-none shrink-0 tabular-nums">03</span>
                <div className="pt-1">
                  <p className="text-slate-900 font-black text-base md:text-lg uppercase tracking-tight mb-1.5">Who&rsquo;s Behind It</p>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    Everest Base Camp creates the aspiration. Annapurna Base Camp gives people another way to participate. Shrug Life creates the community and the preparation. Yeti Expeditions makes the Himalayan journey happen — from training in Chandigarh to standing at Base Camp. Two Chandigarh-born brands, one shared project.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-900 font-bold text-lg leading-relaxed border-l-4 border-primary pl-4 my-8">
              &ldquo;A Chandigarh community coming together for a Himalayan adventure — created by{" "}
              <TrackedLink href={SHRUG_LIFE_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" ctaName="follow_instagram" location="base_camp_project_brand_mention" channel="instagram" className="underline decoration-primary/40 hover:decoration-primary">
                Shrug Life
              </TrackedLink>{" "}
              and{" "}
              <TrackedLink href={YETI_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" ctaName="follow_instagram" location="base_camp_project_brand_mention" channel="instagram" className="underline decoration-primary/40 hover:decoration-primary">
                Yeti Expeditions
              </TrackedLink>
              .&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── Timeline / The Journey ── */}
      <section className="w-full border-b border-zinc-border bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-24 flex flex-col md:flex-row gap-10 md:gap-16">
          <div className="md:w-2/5">
            <div className="md:sticky md:top-24">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-3">
                How It Unfolds
              </span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
                The Timeline
              </h2>
              <div className="relative overflow-hidden mt-8" style={{ minHeight: "320px" }}>
                <ScrollGrayscaleImage
                  src="https://cdn.sanity.io/images/qmj04x7n/production/3af390ebca09bd1f9746b8de3300a425dd9b513f-4032x3024.jpg"
                  alt="The Base Camp Project — the journey ahead"
                  className="absolute inset-0"
                  scaleOnHover={false}
                />
              </div>
            </div>
          </div>

          <div className="md:w-3/5 md:border-l md:border-zinc-border md:pl-16">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-10">
              From the Q&amp;A to Base Camp — everything the cohort does together, in order.
            </p>

            <h3 className="text-slate-900 font-black uppercase tracking-tight text-2xl md:text-3xl leading-tight border-t border-zinc-border pt-8 mb-8">
              What Happens When
            </h3>

            <div className="space-y-9">
              {timeline.map((t, i) => (
                <div key={i} className="flex gap-5">
                  <span className="text-3xl md:text-4xl font-black text-primary leading-none shrink-0 tabular-nums">{(i + 1).toString().padStart(2, "0")}</span>
                  <div className="pt-1">
                    <p className="text-slate-900 font-black text-base md:text-lg uppercase tracking-tight mb-1.5">
                      {t.label} <span className="text-primary">— {t.date}</span>
                    </p>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The Cohort — why this exists, from Gurdit ── */}
      <section className="w-full border-b border-zinc-border bg-slate-900">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col md:flex-row gap-10 md:gap-16">
          <div className="md:w-2/5">
            <div className="md:sticky md:top-24">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-3">
                The Cohort
              </span>
              <h2 className="text-5xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                12 People.
                <br /><span className="text-white/30">One Journey.</span>
              </h2>
              <div className="relative overflow-hidden mt-8 bg-slate-800" style={{ minHeight: "320px" }}>
                <ScrollGrayscaleImage
                  src="https://cdn.sanity.io/images/qmj04x7n/production/5769e336ef5c92749d43d02fc5a4a57ba46bda7d-4284x5712.jpg"
                  alt="Gurdit Singh, Co-Founder, Yeti Expeditions"
                  className="absolute inset-0"
                  scaleOnHover={false}
                />
              </div>
            </div>
          </div>

          <div className="md:w-3/5 md:border-l md:border-white/10 md:pl-16">
            <Quote className="text-primary w-9 h-9 mb-5" />
            <h5 className="text-white text-2xl lg:text-3xl font-light italic leading-snug tracking-tight">
              &ldquo;I&rsquo;ve spent the last eight years in this industry, leading expeditions across Nepal and India. But every time I came back home, I noticed the same thing — Chandigarh is full of people who take their fitness seriously. The gyms are packed every morning. People train hard. And almost none of them had ever done a trek. The fitness was here. The mountains weren&rsquo;t. That gap is where The Base Camp Project came from — bring twelve of us together from this city, train right here, and stand at Base Camp as one group.&rdquo;
            </h5>
            <div className="mt-8">
              <p className="text-primary font-black uppercase tracking-[0.3em] text-sm">Gurdit Singh</p>
              <p className="text-slate-500 text-[10px] uppercase mt-1">
                Co-Founder,{" "}
                <TrackedLink href={YETI_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" ctaName="follow_instagram" location="base_camp_project_brand_mention" channel="instagram" className="hover:text-primary transition-colors">
                  Yeti Expeditions
                </TrackedLink>
              </p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mt-8 max-w-xl">
              12 represents travelling as a small, close-knit cohort — not a selection of the strongest or fittest. Every group trains, prepares and climbs together.
            </p>
          </div>
        </div>
      </section>

      {/* ── Choose Your Journey ── */}
      <section className="border-b border-zinc-border bg-slate-50">
        {/* Intro — full screen on desktop, incentive highlighted here */}
        <div className="px-8 md:px-16 py-20 md:py-28 border-b border-zinc-border">
          <div className="max-w-[1440px] mx-auto w-full">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">
              Two Ways In
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-slate-900">
              Choose Your Journey
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-12">
              Both journeys leave from Kathmandu on the same day, with the same cohort spirit. Everest Base Camp is the longer, harder, more iconic climb. Annapurna Base Camp is the shorter, gentler way in — a proper Himalayan trek without the same time or altitude commitment. Pick the one that matches where you are today, not where you think you should be.
            </p>
            <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 bg-primary text-white px-6 py-5">
              <span className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none whitespace-nowrap">
                1 In 12 Treks Free
              </span>
              <span className="text-xs md:text-sm font-medium leading-snug border-t sm:border-t-0 sm:border-l border-white/30 pt-3 sm:pt-0 sm:pl-6 max-w-sm">
                One fully sponsored spot in the EBC cohort, one in the ABC cohort. A lucky draw will be held from the final 12 confirmed participants in each batch.
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-border border border-zinc-border">
            <div className="bg-white p-8 md:p-12 flex flex-col gap-6">
              <span className="inline-block bg-primary text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                Flagship
              </span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900">
                Everest Base Camp
              </h3>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Kathmandu · 1 Oct 2026 · 15 Days</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Max Altitude</p>
                  <p className="text-sm font-bold text-slate-900">5,364m</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Difficulty</p>
                  <p className="text-sm font-bold text-slate-900">Difficult</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Group Size</p>
                  <p className="text-sm font-bold text-slate-900">Max 12</p>
                </div>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed border-t border-zinc-border pt-6">
                <span className="font-bold text-slate-900">Recommended for:</span> trekkers with some prior hiking or endurance training who want the full Everest experience and are ready to commit to a longer, tougher climb and the September prep sessions.
              </p>

              <div className="flex items-end justify-between gap-4 border-t border-zinc-border pt-6">
                <div>
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">&#8377;1,11,900</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Per Person · All Inclusive</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">1 Fully Sponsored</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Free Spot</p>
                </div>
              </div>

              <TrackedLink
                href={waLink(whatsappNumber, ebcWaText)}
                target="_blank"
                rel="noopener noreferrer"
                ctaName="chat"
                location="base_camp_project_journey_options"
                channel="whatsapp"
                className="mt-auto w-full inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-5 text-sm md:text-base font-black uppercase tracking-[0.15em] hover:bg-primary transition-colors"
              >
                <MessageCircle className="w-5 h-5 shrink-0 text-green-500" />
                I&rsquo;m In — EBC
              </TrackedLink>
            </div>
            <div className="bg-white p-8 md:p-12 flex flex-col gap-6">
              <span className="inline-block border border-slate-200 text-slate-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                Second Option
              </span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900">
                Annapurna Base Camp
              </h3>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Kathmandu · 1 Oct 2026 · 10 Days</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Max Altitude</p>
                  <p className="text-sm font-bold text-slate-900">4,130m</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Difficulty</p>
                  <p className="text-sm font-bold text-slate-900">Moderate</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Group Size</p>
                  <p className="text-sm font-bold text-slate-900">Max 12</p>
                </div>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed border-t border-zinc-border pt-6">
                <span className="font-bold text-slate-900">Recommended for:</span> first-time Himalayan trekkers who want a proper high-altitude experience on a well-established teahouse route, without the longer time or altitude commitment of EBC.
              </p>

              <div className="flex items-end justify-between gap-4 border-t border-zinc-border pt-6">
                <div>
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">&#8377;69,500</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Per Person · All Inclusive</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">1 Fully Sponsored</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Free Spot</p>
                </div>
              </div>

              <TrackedLink
                href={waLink(whatsappNumber, abcWaText)}
                target="_blank"
                rel="noopener noreferrer"
                ctaName="chat"
                location="base_camp_project_journey_options"
                channel="whatsapp"
                className="mt-auto w-full inline-flex items-center justify-center gap-3 border-2 border-slate-900 text-slate-900 px-8 py-5 text-sm md:text-base font-black uppercase tracking-[0.15em] hover:bg-slate-900 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5 shrink-0 text-green-500" />
                I&rsquo;m In — ABC
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── Two Homegrown Chandigarh Brands ── */}
      <section className="border-b border-zinc-border">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-16 md:py-24">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">
            Born In Chandigarh
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-slate-900">
            Two Homegrown Brands
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-border border border-zinc-border">
            <div className="bg-slate-50 p-8 md:p-12 flex flex-col gap-6">
              <TrackedLink href={SHRUG_LIFE_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" ctaName="follow_instagram" location="base_camp_project_brand_mention" channel="instagram" className="w-fit">
                <img src="/ShrugLife%20Transparent%20Logo.png" alt="Shrug Life" style={{ height: "56px", width: "auto", objectFit: "contain" }} />
              </TrackedLink>
              <h3 className="font-black uppercase text-lg tracking-tight text-slate-900">
                <TrackedLink href={SHRUG_LIFE_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" ctaName="follow_instagram" location="base_camp_project_brand_mention" channel="instagram" className="hover:text-primary transition-colors">
                  Shrug Life
                </TrackedLink>
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                A CrossFit box in Chandigarh — functional fitness, strength training and a community that shows up every single day. For The Base Camp Project, it&rsquo;s the training ground.
              </p>
              <div className="space-y-6 mt-2">
                <div className="flex gap-4">
                  <span className="text-2xl font-black text-primary leading-none shrink-0 tabular-nums">01</span>
                  <div>
                    <p className="text-slate-900 font-black text-sm uppercase tracking-tight mb-1">Training &amp; Programming</p>
                    <p className="text-slate-600 text-sm leading-relaxed">Structured strength and conditioning through September, built specifically to get the cohort trek-ready — legs, lungs and a body that can carry a pack for multiple days.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl font-black text-primary leading-none shrink-0 tabular-nums">02</span>
                  <div>
                    <p className="text-slate-900 font-black text-sm uppercase tracking-tight mb-1">Community</p>
                    <p className="text-slate-600 text-sm leading-relaxed">The gym is where the twelve get to know each other before they ever set foot in Nepal — training together builds the trust a cohort needs on the trail.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl font-black text-primary leading-none shrink-0 tabular-nums">03</span>
                  <div>
                    <p className="text-slate-900 font-black text-sm uppercase tracking-tight mb-1">Home Base</p>
                    <p className="text-slate-600 text-sm leading-relaxed">Every session, every check-in, every prep milestone happens out of Shrug Life, Chandigarh — the anchor for the whole project.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 md:p-12 flex flex-col gap-6">
              <TrackedLink href={YETI_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" ctaName="follow_instagram" location="base_camp_project_brand_mention" channel="instagram" className="w-fit">
                {yetiLogoUrl ? (
                  <img src={yetiLogoUrl} alt="Yeti Expeditions" style={{ height: "56px", width: "auto", objectFit: "contain" }} />
                ) : (
                  <span className="font-black uppercase text-2xl tracking-tighter text-slate-900">Yeti Expeditions</span>
                )}
              </TrackedLink>
              <h3 className="font-black uppercase text-lg tracking-tight text-slate-900">
                <TrackedLink href={YETI_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" ctaName="follow_instagram" location="base_camp_project_brand_mention" channel="instagram" className="hover:text-primary transition-colors">
                  Yeti Expeditions
                </TrackedLink>
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                A Himalayan trekking operator rooted in Kinnaur, active across Nepal and the Indian Himalaya — the team that turns training into an actual expedition.
              </p>
              <div className="space-y-6 mt-2">
                <div className="flex gap-4">
                  <span className="text-2xl font-black text-primary leading-none shrink-0 tabular-nums">01</span>
                  <div>
                    <p className="text-slate-900 font-black text-sm uppercase tracking-tight mb-1">Route &amp; Safety</p>
                    <p className="text-slate-600 text-sm leading-relaxed">Certified guides, permits, twice-daily SpO2 monitoring and pre-authorised evacuation protocols on every trek above altitude.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl font-black text-primary leading-none shrink-0 tabular-nums">02</span>
                  <div>
                    <p className="text-slate-900 font-black text-sm uppercase tracking-tight mb-1">Logistics</p>
                    <p className="text-slate-600 text-sm leading-relaxed">Flights, teahouses, permits, food and porters — everything between Kathmandu and Base Camp is planned and managed end to end.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl font-black text-primary leading-none shrink-0 tabular-nums">03</span>
                  <div>
                    <p className="text-slate-900 font-black text-sm uppercase tracking-tight mb-1">Track Record</p>
                    <p className="text-slate-600 text-sm leading-relaxed">16 years active, 200+ expeditions led, zero fatalities — the same standards this cohort trains under apply here.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-b border-zinc-border bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-16 md:py-24">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">
            Questions
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-slate-900">
            FAQ
          </h2>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-slate-900 pb-20 md:pb-0">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-16 md:py-24">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-8">
            ▪ Join The Cohort
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-10">
            <span className="text-white">Chandigarh,</span>
            <br />
            <span className="text-white/25">This One</span>
            <br />
            <span className="text-white">Is For You</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <TrackedLink
              href={waLink(whatsappNumber, ctaWaText)}
              target="_blank"
              rel="noopener noreferrer"
              ctaName="chat"
              location="base_camp_project_cta"
              channel="whatsapp"
              className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all group"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              Join on WhatsApp
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </TrackedLink>
            {instagramUrl && (
              <TrackedLink
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaName="follow_instagram"
                location="base_camp_project_cta"
                channel="instagram"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all group"
              >
                <Instagram className="w-3.5 h-3.5 shrink-0" />
                Follow The Journey
              </TrackedLink>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
