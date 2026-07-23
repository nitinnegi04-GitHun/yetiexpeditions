import type { AnalyticsEventName, AnalyticsEventPayload, AnalyticsProvider, DeviceType } from './types'
import { sendToGA4 } from './providers/ga4'

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
}
