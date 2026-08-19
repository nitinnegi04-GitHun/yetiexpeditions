import type { AnalyticsEventName } from './types'

export const AnalyticsEvents = {
  PAGE_VIEW: 'page_view',
  SCROLL_25: 'scroll_25',
  SCROLL_50: 'scroll_50',
  SCROLL_75: 'scroll_75',
  ITINERARY_VIEW: 'itinerary_view',
  DEPARTURE_VIEW: 'departure_view',
  REVIEWS_VIEW: 'reviews_view',
  CTA_CLICK: 'cta_click',
  FILTER_APPLY: 'filter_apply',
} as const satisfies Record<string, AnalyticsEventName>

export type AnalyticsEvent = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents]
