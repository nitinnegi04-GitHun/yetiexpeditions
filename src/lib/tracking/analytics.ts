import type { AnalyticsEventName, AnalyticsEventPayload, AnalyticsProvider, DeviceType, CTAName, EventLocation, Channel, FilterType } from './types'
import { AnalyticsEvents } from './events'
import { sendToGA4 } from './providers/ga4'
import { sendToMeta } from './providers/meta'

const providers: AnalyticsProvider[] = []

let currentTrek: string | null = null

/** Called once by a trek page so every subsequent event is auto-tagged with it. */
export function setTrek(trek: string | null): void {
  currentTrek = trek
}

function getDevice(): DeviceType {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

export function init(): void {}

export function track(event: AnalyticsEventName, payload?: AnalyticsEventPayload): void {}

export function trackEvent(eventName: AnalyticsEventName, parameters?: AnalyticsEventPayload): void {
  const enrichedParameters: AnalyticsEventPayload = {
    ...parameters,
    trek: currentTrek,
    device: getDevice(),
  }

  console.log(eventName, enrichedParameters)
  sendToGA4(eventName, enrichedParameters)
  sendToMeta(eventName, enrichedParameters)
}

/**
 * Typed wrapper for CTA_CLICK — cta_name/location are restricted to the
 * shared taxonomy in ./types so a new or misspelled value fails to compile
 * instead of silently drifting out of sync with what's registered in GA4.
 */
export function trackCTA(params: {
  cta_name: CTAName
  location: EventLocation
  channel?: Channel
  departure?: string
  trek_name?: string
}): void {
  trackEvent(AnalyticsEvents.CTA_CLICK, params)
}

/** Typed wrapper for FILTER_APPLY — Find Your Trek's Region/Difficulty/Month filters. */
export function trackFilterApply(params: {
  filter_type: FilterType
  filter_value: string
}): void {
  trackEvent(AnalyticsEvents.FILTER_APPLY, params)
}
