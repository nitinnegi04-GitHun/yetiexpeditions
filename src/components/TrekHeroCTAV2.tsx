'use client'

import { trackCTA } from '@/lib/tracking/analytics'

interface TrekHeroCTAV2Props {
  className?: string
}

// Primary/secondary hero CTA pair for the trek-page flow redesign (v2 only).
export default function TrekHeroCTAV2({ className = '' }: TrekHeroCTAV2Props) {
  function handlePrimaryClick() {
    trackCTA({ cta_name: 'join_fixed_departure', location: 'hero' })
  }

  function handleSecondaryClick() {
    trackCTA({ cta_name: 'plan_private_custom_trek', location: 'hero' })
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <a
        href="#departure-batches"
        onClick={handlePrimaryClick}
        className="inline-block md:w-auto text-center bg-slate-900 text-white px-8 py-3 md:px-10 md:py-3.5 text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors"
      >
        Join a Fixed Departure
      </a>
      {/* TODO: click behavior pending — placeholder scrolls to the enquiry form for now */}
      <a
        href="#enquire"
        onClick={handleSecondaryClick}
        className="inline-block md:w-auto text-center bg-slate-900 text-white px-8 py-3 md:px-10 md:py-3.5 text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors"
      >
        Plan a Private / Custom Trek
      </a>
    </div>
  )
}
