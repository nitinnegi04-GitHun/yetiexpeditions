import type { AnalyticsEventName, AnalyticsEventPayload, AnalyticsProvider } from '../types'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function sendToGA4(eventName: AnalyticsEventName, parameters?: AnalyticsEventPayload): void {
  try {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    window.gtag('event', eventName, parameters)
  } catch {
    // GA4 unavailable or blocked — fail silently, never crash the app
  }
}

export const ga4Provider: AnalyticsProvider = {
  name: 'ga4',
  init: () => {},
  track: (event, payload) => sendToGA4(event, payload),
}
