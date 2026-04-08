'use client';

import { useRef, useState, useEffect } from 'react';

/**
 * Scroll-driven grayscale effect for mobile only.
 * Attach `ref` to the container element.
 * Apply `filter` to the image element inside it.
 *
 * Starts fully B&W (grayscale 100%) when in view.
 * Fades to full colour as the container scrolls out of view — matching
 * the desktop hover-to-colour behaviour.
 */
export function useScrollGrayscale() {
  const ref = useRef<HTMLDivElement>(null);
  const [grayscale, setGrayscale] = useState(100);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 768) return;
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const scrolledOut = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolledOut / rect.height);
      setGrayscale(Math.round(100 * (1 - progress)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return {
    ref,
    /** Apply this to the <img> or background-image element's `style.filter` */
    filter: `grayscale(${grayscale}%) contrast(1.25)`,
  };
}
