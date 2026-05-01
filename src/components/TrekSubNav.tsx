'use client';

import { useEffect, useState, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Itinerary',   href: '#itinerary'        },
  { label: 'Includes',    href: '#included'          },
  { label: 'Protocol',    href: '#non-negotiables'   },
  { label: 'Altitude',    href: '#altitude'          },
  { label: 'Gallery',     href: '#gallery'           },
  { label: 'Reviews',     href: '#reviews'           },
  { label: 'Logistics',   href: '#logistics'         },
  { label: 'Stay',        href: '#accommodation'     },
  { label: 'FAQs',        href: '#faqs'              },
  { label: 'Enquire',     href: '#enquire'           },
];

export default function TrekSubNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive]   = useState('');

  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

  // Show only once #itinerary has scrolled up to the top of the viewport
  useEffect(() => {
    const check = () => {
      const el = document.getElementById('itinerary');
      if (!el) return;
      // top <= 0 means the section has reached/passed the top edge of the viewport
      setVisible(el.getBoundingClientRect().top <= 0);
    };
    // Run once on mount to handle scroll-restore / anchor navigation
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  // Highlight whichever section is currently in view
  useEffect(() => {
    const ids = NAV_ITEMS.map(i => i.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive('#' + e.target.id);
        });
      },
      { rootMargin: '-15% 0px -75% 0px' }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    // Always fixed at the correct position — hidden via opacity only, never transforms.
    // top-0 on mobile (no top navbar), top-16 (64px) on desktop to sit below the sticky navbar.
    <div
      className={`fixed left-0 right-0 top-0 md:top-16 z-[99999] bg-white border-b border-zinc-border shadow-sm transition-opacity duration-300 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ transform: 'translateZ(0)', willChange: 'opacity' }}
    >
      {/* Mobile — up-arrow + two rows of 4 */}
      <div className="md:hidden flex">
        {/* Up arrow — spans both rows */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="w-10 shrink-0 flex flex-col items-center justify-center gap-0.5 border-r border-zinc-border text-slate-400 active:text-primary transition-colors"
        >
          <ChevronUp className="w-3.5 h-3.5" />
          <span className="text-[8px] font-black uppercase tracking-wider">Top</span>
        </button>
        {/* Nav rows */}
        <div className="flex-1 flex flex-col">
          {[NAV_ITEMS.slice(0, 5), NAV_ITEMS.slice(5)].map((row, rowIdx) => (
            <div key={rowIdx} className={`flex ${rowIdx === 0 ? 'border-b border-zinc-border' : ''}`}>
              {row.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex-1 text-center py-2.5 text-[9px] font-black uppercase tracking-wider transition-colors border-b-2 ${
                    active === item.href
                      ? 'border-primary text-primary'
                      : 'border-transparent text-slate-400'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop — original horizontal scrolling strip */}
      <div className="hidden md:block max-w-[1440px] mx-auto px-8 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <nav className="flex items-center min-w-max">
          {NAV_ITEMS.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap border-b-2 transition-colors ${
                active === item.href
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-400 hover:text-slate-900'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
