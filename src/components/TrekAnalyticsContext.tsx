'use client'

import { useEffect } from 'react'
import { setTrek } from '@/lib/tracking/analytics'

export default function TrekAnalyticsContext({ trekName }: { trekName: string }) {
  useEffect(() => {
    setTrek(trekName)
    return () => setTrek(null)
  }, [trekName])

  return null
}
