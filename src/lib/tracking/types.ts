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
  | 'join_fixed_departure'
  | 'plan_private_custom_trek'
  | 'secure_spot'
  | 'message_trek_team'
  | 'write_enquiry'
  | 'submit_query'
  | 'download_itinerary'
  | 'browse_treks'
  | 'view_our_story'
  | 'view_trek'
  | 'newsletter_signup'
  | 'follow_instagram'
  | 'chat'

export type EventLocation =
  | 'navbar'
  | 'hero'
  | 'journey_options_section'
  | 'floating_bar'
  | 'departure_section'
  | 'no_departures_card'
  | 'trek_team_section'
  | 'itinerary_section'
  | 'footer_form'
  | 'sticky_bottom_bar'
  | 'why_we_trek'
  | 'why_us'
  | 'quote_section'
  | 'find_your_trek_grid'
  | 'footer'
  | 'base_camp_project_hero'
  | 'base_camp_project_journey_options'
  | 'base_camp_project_cta'

export type Channel = 'whatsapp' | 'instagram'

export type FilterType = 'region' | 'difficulty' | 'month'

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
