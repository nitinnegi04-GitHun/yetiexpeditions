'use client';

import { useEffect, useState, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'The Idea',   href: '#idea'     },
  { label: 'Timeline',   href: '#timeline' },
  { label: 'The Cohort', href: '#cohort'   },
  { label: 'Journeys',   href: '#journeys' },
  { label: 'Brands',     href: '#brands'   },
  { label: 'FAQs',       href: '#faqs'     },
];

export default function BaseCampSubNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive]   = useState('');

  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

  // Show only once #idea has scrolled up to the top of the viewport (page has no global navbar)
  useEffect(() => {
    const check = () => {
      const el = document.getElementById('idea');
      if (!el) return;
      setVisible(el.getBoundingClientRect().top <= 0);
    };
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
    <div
      className={`fixed left-0 right-0 top-0 z-[99999] bg-white border-b border-zinc-border shadow-sm transition-opacity duration-300 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ transform: 'translateZ(0)', willChange: 'opacity' }}
    >
      {/* Mobile — up-arrow + single scrolling row */}
      <div className="md:hidden flex">
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="w-10 shrink-0 flex flex-col items-center justify-center gap-0.5 border-r border-zinc-border text-slate-400 active:text-primary transition-colors"
        >
          <ChevronUp className="w-3.5 h-3.5" />
          <span className="text-[8px] font-black uppercase tracking-wider">Top</span>
        </button>
        <div className="flex-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <nav className="flex min-w-max">
            {NAV_ITEMS.map(item => (
              <a
                key={item.href}
                href={item.href}
                className={`px-4 text-center py-2.5 text-[9px] font-black uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                  active === item.href
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-400'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop — horizontal strip */}
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
