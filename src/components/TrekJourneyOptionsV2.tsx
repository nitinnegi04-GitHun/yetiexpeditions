'use client';

import { trackEvent } from "@/lib/tracking/analytics";
import { AnalyticsEvents } from "@/lib/tracking/events";

interface TrekJourneyOptionsV2Props {
    trekName: string;
}

const fixedDeparturePoints = [
    "You're travelling solo, as a couple, or with a small number of friends.",
    "You're happy to join a small group of other trekkers.",
    "One of Yeti's planned departure dates works for you.",
    "You prefer the route, stays and logistics to already be thoughtfully planned.",
    "You're looking for the more economical way to do it. Shared logistics generally make fixed departures more cost-efficient than a customised journey.",
];

const customTrekPoints = [
    "You want to travel on your own dates.",
    "You want the pace, itinerary or number of days adjusted around you.",
    "You have specific stay, comfort or travel preferences.",
    "You want a more private/premium experience with your partner, family or friends.",
    "You're a group of 2 or more and want the journey designed around your needs.",
];

// Purely explanatory — not a CTA section. Hardcoded for now; will move to Sanity later.
export default function TrekJourneyOptionsV2({ trekName }: TrekJourneyOptionsV2Props) {
    return (
        <section className="w-full border-b border-zinc-border">
            <div className="max-w-[1440px] mx-auto p-8 md:p-12">
                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-3 block">Your Journey, Your Way</span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                    How Would You Like to Experience {trekName}?
                </h2>
                <p className="text-slate-600 leading-relaxed text-base mb-8">
                    There isn't one right way to do {trekName}. Some trekkers prefer joining a small group on a planned departure. Others want the journey shaped around their own dates, pace or preferences. We offer both.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-border border border-zinc-border">
                    {/* Card 1 — Fixed Departure */}
                    <div className="bg-white p-6 md:p-8 flex flex-col">
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900 mb-4">
                            Join a Fixed Departure
                        </h3>
                        <span className="inline-block bg-slate-900 text-white px-3 py-1.5 text-[12.5px] font-black uppercase tracking-widest mb-3 w-fit">
                            Best suited for you if
                        </span>
                        <ul className="space-y-2 mb-6">
                            {fixedDeparturePoints.map((point) => (
                                <li key={point} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                                    <span className="text-primary font-bold mt-0.5 shrink-0">&#10003;</span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-auto pt-4 border-t border-zinc-border">
                            <p className="text-slate-900 font-bold italic text-sm md:text-base mb-4">
                                You join the journey. We take care of the rest.
                            </p>
                            <div className="border-l-4 border-primary bg-primary/5 p-3 mb-6">
                                <p className="text-sm text-slate-800 font-medium leading-relaxed">
                                    Every departure is led by an experienced trek leader and kept to a comfortable group size — so even on a fixed date, it never feels crowded.
                                </p>
                            </div>
                            <a
                                href="#departure-batches"
                                onClick={() => trackEvent(AnalyticsEvents.CTA_CLICK, { cta_name: 'join_fixed_departure', location: 'journey_options_section' })}
                                className="inline-block bg-primary text-white px-6 py-2.5 text-sm font-bold uppercase tracking-widest hover:bg-black transition-all"
                            >
                                Join a Fixed Departure
                            </a>
                        </div>
                    </div>

                    {/* Card 2 — Custom Trek */}
                    <div className="bg-white p-6 md:p-8 flex flex-col">
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900 mb-4">
                            Customise {trekName}
                        </h3>
                        <span className="inline-block bg-slate-900 text-white px-3 py-1.5 text-[12.5px] font-black uppercase tracking-widest mb-3 w-fit">
                            Best suited for you if
                        </span>
                        <ul className="space-y-2 mb-6">
                            {customTrekPoints.map((point) => (
                                <li key={point} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                                    <span className="text-primary font-bold mt-0.5 shrink-0">&#10003;</span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-auto pt-4 border-t border-zinc-border">
                            <p className="text-slate-900 font-bold italic text-sm md:text-base mb-4">
                                Tell us what you have in mind. We'll shape the journey around you.
                            </p>
                            <div className="border-l-4 border-primary bg-primary/5 p-3 mb-6">
                                <p className="text-sm text-slate-800 font-medium leading-relaxed">
                                    Custom doesn't mean you need a large group. Even if there are just two of you, we can design the journey around how you want to experience {trekName}.
                                </p>
                            </div>
                            {/* TODO: click behavior pending — placeholder scrolls to the enquiry form for now */}
                            <a
                                href="#enquire"
                                onClick={() => trackEvent(AnalyticsEvents.CTA_CLICK, { cta_name: 'plan_private_custom_trek', location: 'journey_options_section' })}
                                className="inline-block bg-primary text-white px-6 py-2.5 text-sm  font-bold uppercase tracking-widest hover:bg-black transition-all"
                            >
                                Plan a Private / Custom Trek
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
