'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { trackEvent } from './analytics'
import { AnalyticsEvents } from './events'

export type TrackedSection = 'itinerary' | 'departure' | 'reviews'

const SECTION_EVENTS: Record<TrackedSection, string> = {
  itinerary: AnalyticsEvents.ITINERARY_VIEW,
  departure: AnalyticsEvents.DEPARTURE_VIEW,
  reviews: AnalyticsEvents.REVIEWS_VIEW,
}

export function useSectionTracking<T extends HTMLElement = HTMLDivElement>(
  section: TrackedSection
): RefObject<T | null> {
  const ref = useRef<T | null>(null)
  const fired = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || fired.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          trackEvent(SECTION_EVENTS[section])
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [section])

  return ref
}
