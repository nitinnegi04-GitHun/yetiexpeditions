'use client';

import { useEffect, useState, useCallback } from 'react';
import { trackEvent } from "@/lib/tracking/analytics";
import { AnalyticsEvents } from "@/lib/tracking/events";

// Sticky/floating conversion bar for the trek page (v2 comparison flow only).
// Shows once the reader has scrolled past the Investment Breakdown section,
// hides while the Direct Line or Enquiry sections are in view (both already
// carry their own strong CTA), and reappears everywhere else.
export default function TrekFloatingCTAV2() {
    const [pastInvestment, setPastInvestment] = useState(false);
    const [overlapsOtherCTA, setOverlapsOtherCTA] = useState(false);
    const [nearPageEnd, setNearPageEnd] = useState(false);

    const checkScroll = useCallback(() => {
        const el = document.getElementById('included');
        if (el) setPastInvestment(el.getBoundingClientRect().top <= 0);
        // Also hide near the very bottom of the page (e.g. the footer), so the
        // bar doesn't reappear and cover it once the Enquiry section scrolls out of view.
        setNearPageEnd(window.innerHeight + window.scrollY >= document.body.scrollHeight - 80);
    }, []);

    useEffect(() => {
        checkScroll();
        window.addEventListener('scroll', checkScroll, { passive: true });
        return () => window.removeEventListener('scroll', checkScroll);
    }, [checkScroll]);

    useEffect(() => {
        const ids = ['direct-line', 'enquire'];
        const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        if (els.length === 0) return;

        const intersecting = new Set<string>();
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) intersecting.add(e.target.id);
                    else intersecting.delete(e.target.id);
                });
                setOverlapsOtherCTA(intersecting.size > 0);
            },
            { threshold: 0 }
        );
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    const visible = pastInvestment && !overlapsOtherCTA && !nearPageEnd;

    function handleDepartures() {
        trackEvent(AnalyticsEvents.CTA_CLICK, { cta_name: 'see_upcoming_departures', location: 'floating_bar' });
    }

    function handleCustom() {
        trackEvent(AnalyticsEvents.CTA_CLICK, { cta_name: 'make_trek_your_own', location: 'floating_bar' });
    }

    const buttonClass = "flex-1 md:flex-initial text-center bg-slate-900 text-white px-4 md:px-8 py-3 text-[11px] md:text-xs font-black uppercase tracking-widest hover:bg-primary transition-colors";

    return (
        <div
            className={`fixed inset-x-0 z-[9998] transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            style={{
                bottom: 0,
            }}
        >
            {/* Desktop bar */}
            <div className="hidden md:block bg-white border-t border-zinc-border">
                <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-center gap-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Ready to plan your trek?
                    </span>
                    <div className="flex items-center gap-3">
                        <a href="#departure-batches" onClick={handleDepartures} className={buttonClass}>
                            JOIN A FIXED DEPARTURE
                        </a>
                        <a href="#enquire" onClick={handleCustom} className={buttonClass}>
                            CUSTOMIZE THIS TREK
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile bar — sits directly above the fixed mobile bottom nav bar */}
            <div
                className="md:hidden bg-white border-t border-zinc-border shadow-[0_-2px_8px_rgba(0,0,0,0.08)]"
                style={{
                    position: 'fixed',
                    left: 0,
                    right: 0,
                    bottom: 'calc(var(--mobile-bottom-bar-height) + env(safe-area-inset-bottom, 0px))',
                }}
            >
                <div className="flex items-center gap-2 px-3 py-2.5">
                    <a href="#departure-batches" onClick={handleDepartures} className={buttonClass}>
                        JOIN FIXED DEPARTURE
                    </a>
                    <a href="#enquire" onClick={handleCustom} className={buttonClass}>
                        CUSTOMIZE THIS TREK
                    </a>
                </div>
            </div>
        </div>
    );
}
