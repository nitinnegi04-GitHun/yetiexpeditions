'use client'

import { useEffect } from 'react'
import { setTrek, trackEvent } from '@/lib/tracking/analytics'
import { AnalyticsEvents } from '@/lib/tracking/events'

export default function TrekAnalyticsContext({ trekName }: { trekName: string }) {
  useEffect(() => {
    setTrek(trekName)
    trackEvent(AnalyticsEvents.PAGE_VIEW)
    return () => setTrek(null)
  }, [trekName])

  return null
}
