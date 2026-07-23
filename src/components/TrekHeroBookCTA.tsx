'use client'

import { trackEvent } from '@/lib/tracking/analytics'
import { AnalyticsEvents } from '@/lib/tracking/events'

interface TrekHeroBookCTAProps {
  href: string
  target?: '_blank'
  rel?: string
  className: string
  children: React.ReactNode
}

export default function TrekHeroBookCTA({ href, target, rel, className, children }: TrekHeroBookCTAProps) {
  function handleClick() {
    trackEvent(AnalyticsEvents.CTA_CLICK, {
      cta_name: 'book_trek',
      location: 'hero',
      channel: 'whatsapp',
    })
  }

  return (
    <a href={href} target={target} rel={rel} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
