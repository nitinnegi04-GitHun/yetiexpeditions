'use client';

import { useEffect, useState, useCallback } from 'react';
import { MessageCircle } from 'lucide-react';
import { trackCTA } from '@/lib/tracking/analytics';

const QNA_WA_TEXT = "Hi, I saw the Base Camp Project and would like to attend the Q&A at Shrug Life on 29 Aug.";

interface BaseCampFloatingWhatsAppProps {
  whatsappNumber: string | null;
}

// Floating CTA that tracks scroll position. Desktop: icon-only pill that
// expands to show the label on hover. Mobile: label always visible (no
// hover), pinned above BaseCampBottomNav's fixed bar so the two don't overlap.
export default function BaseCampFloatingWhatsApp({ whatsappNumber }: BaseCampFloatingWhatsAppProps) {
  const [visible, setVisible] = useState(false);
  const [nearPageEnd, setNearPageEnd] = useState(false);

  const checkScroll = useCallback(() => {
    setVisible(window.scrollY > 600);
    setNearPageEnd(window.innerHeight + window.scrollY >= document.body.scrollHeight - 200);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  const digits = (whatsappNumber ?? '').replace(/[^0-9]/g, '');
  const href = `https://wa.me/${digits}?text=${encodeURIComponent(QNA_WA_TEXT)}`;
  const shown = visible && !nearPageEnd;

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCTA({ cta_name: 'chat', location: 'base_camp_project_floating', channel: 'whatsapp' })}
        className={`hidden md:flex fixed bottom-8 right-8 z-[9997] items-center gap-3 bg-white text-slate-900 pl-4 pr-5 py-4 rounded-full border border-zinc-border shadow-lg hover:shadow-xl transition-all duration-300 ${
          shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
        aria-label="RSVP for the 29 Aug Q&A on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 shrink-0 text-green-500" />
        <span className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.15em]">
          RSVP for the 29 Aug Q&amp;A
        </span>
      </a>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCTA({ cta_name: 'chat', location: 'base_camp_project_floating', channel: 'whatsapp' })}
        className={`md:hidden fixed right-4 z-[9997] flex items-center gap-2 bg-white text-slate-900 pl-3.5 pr-4 py-3 rounded-full border border-zinc-border shadow-lg transition-all duration-300 ${
          shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
        style={{ bottom: 'calc(var(--mobile-bottom-bar-height) + 12px + env(safe-area-inset-bottom, 0px))' }}
        aria-label="RSVP for the 29 Aug Q&A on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 shrink-0 text-green-500" />
        <span className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.15em]">
          RSVP for 29 Aug
        </span>
      </a>
    </>
  );
}
