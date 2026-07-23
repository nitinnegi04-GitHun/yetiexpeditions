export type AnalyticsEventName = string

export interface AnalyticsEventPayload {
  [key: string]: unknown
}

export interface AnalyticsProvider {
  name: string
  init: () => void
  track: (event: AnalyticsEventName, payload?: AnalyticsEventPayload) => void
}

export type CTAName =
  | 'inquire_now'
  | 'book_trek'
  | 'secure_spot'
  | 'message_trek_team'
  | 'submit_query'
  | 'chat'

export type EventLocation =
  | 'navbar'
  | 'hero'
  | 'departure_section'
  | 'trek_team_section'
  | 'footer_form'
  | 'sticky_bottom_bar'

export type Channel = 'whatsapp'

export interface BaseEvent {
  name: AnalyticsEventName
  timestamp: number
}

export interface CTAEvent extends BaseEvent {
  cta: CTAName
  location: EventLocation
  channel?: Channel
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop'
