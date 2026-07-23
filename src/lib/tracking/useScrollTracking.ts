'use client'

import { useEffect, useRef } from 'react'
import { trackEvent } from './analytics'
import { AnalyticsEvents } from './events'

export function useScrollTracking(): void {
  const fired = useRef({ 25: false, 50: false, 75: false })

  useEffect(() => {
    function handleScroll() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollableHeight <= 0) return

      const scrolledPercent = (window.scrollY / scrollableHeight) * 100

      if (!fired.current[25] && scrolledPercent >= 25) {
        fired.current[25] = true
        trackEvent(AnalyticsEvents.SCROLL_25)
      }
      if (!fired.current[50] && scrolledPercent >= 50) {
        fired.current[50] = true
        trackEvent(AnalyticsEvents.SCROLL_50)
      }
      if (!fired.current[75] && scrolledPercent >= 75) {
        fired.current[75] = true
        trackEvent(AnalyticsEvents.SCROLL_75)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}
