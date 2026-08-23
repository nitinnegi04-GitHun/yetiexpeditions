'use client';

import { useCallback } from 'react';
import { ChevronUp, Instagram, MessageCircle } from 'lucide-react';
import { trackCTA } from '@/lib/tracking/analytics';

const YETI_INSTAGRAM_URL = 'https://www.instagram.com/yeti.expeditions/';
const SHRUG_LIFE_INSTAGRAM_URL = 'https://www.instagram.com/shruglifecf/';

interface BaseCampBottomNavProps {
  whatsappNumber: string | null;
}

export default function BaseCampBottomNav({ whatsappNumber }: BaseCampBottomNavProps) {
  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

  const digits = (whatsappNumber ?? '').replace(/[^0-9]/g, '');
  const whatsappHref = `https://wa.me/${digits}?text=${encodeURIComponent("Hi! I'd like to know more about The Base Camp Project.")}`;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-zinc-border shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-[99999]"
      style={{ height: 'var(--mobile-bottom-bar-height)' }}
    >
      <div className="flex items-end justify-between h-full px-4 pb-1.5">
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center gap-1 w-16 text-slate-500 active:text-primary transition-colors"
        >
          <ChevronUp size={22} />
          <span className="text-[9px] font-semibold uppercase tracking-wider">Top</span>
        </button>

        <a
          href={SHRUG_LIFE_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTA({ cta_name: 'follow_instagram', location: 'base_camp_project_brand_mention', channel: 'instagram' })}
          className="flex flex-col items-center gap-1 w-16 text-slate-500 active:text-primary transition-colors"
        >
          <Instagram size={20} />
          <span className="text-[9px] font-semibold uppercase tracking-wider whitespace-nowrap">Shrug Life</span>
        </a>

        <a
          href={YETI_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTA({ cta_name: 'follow_instagram', location: 'base_camp_project_brand_mention', channel: 'instagram' })}
          className="flex flex-col items-center gap-1 w-16 text-slate-500 active:text-primary transition-colors"
        >
          <Instagram size={20} />
          <span className="text-[9px] font-semibold uppercase tracking-wider whitespace-nowrap">Yeti Exp.</span>
        </a>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTA({ cta_name: 'chat', location: 'sticky_bottom_bar', channel: 'whatsapp' })}
          className="flex flex-col items-center gap-1 w-16 text-slate-500 active:text-primary transition-colors"
        >
          <MessageCircle size={20} color="#10b981" />
          <span className="text-[9px] font-semibold uppercase tracking-wider">Chat</span>
        </a>
      </div>
    </div>
  );
}
