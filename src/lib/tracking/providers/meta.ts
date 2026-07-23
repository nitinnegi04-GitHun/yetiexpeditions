import type { AnalyticsEventName, AnalyticsEventPayload, AnalyticsProvider } from '../types'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export function sendToMeta(eventName: AnalyticsEventName, parameters?: AnalyticsEventPayload): void {
  try {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
    window.fbq('trackCustom', eventName, parameters)
  } catch {
    // Meta Pixel unavailable or blocked — fail silently, never crash the app
  }
}

export const metaProvider: AnalyticsProvider = {
  name: 'meta',
  init: () => {},
  track: (event, payload) => sendToMeta(event, payload),
}
