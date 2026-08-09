# Google Analytics — Event Reference

Reference document tracking what Google Analytics (GA4) events exist in the codebase, where they're implemented, and what's still untracked. Update this file whenever tracking is added, changed, or removed.

## Architecture

- **Core dispatcher:** `src/lib/tracking/analytics.ts` — `trackEvent(eventName, parameters)` auto-enriches every event with `trek` (current trek name, via `setTrek`) and `device` (mobile/tablet/desktop), then fans out to both providers below.
- **GA4 sender:** `src/lib/tracking/providers/ga4.ts` — calls `window.gtag('event', eventName, parameters)`.
- **Meta Pixel sender:** `src/lib/tracking/providers/meta.ts` — calls `window.fbq('trackCustom', eventName, parameters)` with the same name/params. **Every GA event is mirrored 1:1 to Meta Pixel.**
- **Script loader:** `src/components/AnalyticsScripts.tsx` — loads gtag.js + `gtag('config', NEXT_PUBLIC_GA_ID)` and Meta Pixel base `PageView`. Skipped on `/studio` routes.
- **Event name registry:** `src/lib/tracking/events.ts` — `AnalyticsEvents` enum.
- **Reusable hooks:** `useScrollTracking.ts` (scroll depth), `useSectionTracking.ts` (IntersectionObserver, fires once per section, threshold 0.1).

## Trek Page Composition

`src/app/(site)/treks/[slug]/page.tsx` renders `TrekAnalyticsContext`, `Navbar`, `TrekSubNav`, `TrekHeroBookCTA`, `TrekDetails` (which renders `EnquiryForm`), `Footer`.

## Event Inventory (Trek Pages)

### Page View
Custom `page_view` tracking was **removed** from `TrekAnalyticsContext.tsx` on 2026-08-05 — it was firing a manual `page_view` event on top of GA4's own automatic `page_view` (Enhanced Measurement → "Page changes based on browser history events"), causing double-counted page views. That GA4 property setting is locked (greyed out, can't be disabled from Admin), so the fix was made in code instead. Page views are now tracked solely by GA4's automatic collection.

`TrekAnalyticsContext.tsx:8-10` still sets ambient `trek` context (`setTrek(trekName)`) on mount, used to tag all other custom events below; cleared on unmount.

### Scroll / Engagement Depth
| Event | Trigger | File:Line | Params |
|---|---|---|---|
| `scroll_25` | ≥25% of page scrolled | `src/lib/tracking/useScrollTracking.ts:19` (invoked from `TrekDetails.tsx:157`) | `trek`, `device` |
| `scroll_50` | ≥50% scrolled | `useScrollTracking.ts:23` | `trek`, `device` |
| `scroll_75` | ≥75% scrolled | `useScrollTracking.ts:27` | `trek`, `device` |

### Section Views (fire once each, via IntersectionObserver)
| Event | Trigger | File:Line | Params |
|---|---|---|---|
| `itinerary_view` | Itinerary section enters viewport | `useSectionTracking.ts:29`; ref at `TrekDetails.tsx:158` | `trek`, `device` |
| `departure_view` | Departure/batches section enters viewport | ref at `TrekDetails.tsx:159` | `trek`, `device` |
| `reviews_view` | Testimonials/reviews section enters viewport | ref at `TrekDetails.tsx:160` | `trek`, `device` |

### CTA Clicks (all fire `cta_click`, differentiated by `cta_name` / `location`)
| cta_name | location | Trigger | File:Line | Extra params |
|---|---|---|---|---|
| `book_trek` | `hero` | Click "Book This Trek" hero button (WhatsApp link) | `TrekHeroBookCTA.tsx:16-20` | — |
| `download_itinerary` | `departure_section` | Click "Download Itinerary" PDF per batch | `TrekDetails.tsx:374` | `departure: batch.date` |
| `secure_spot` | `departure_section` | Click "Secure Spot" WhatsApp link per batch | `TrekDetails.tsx:385` | `channel: 'whatsapp'`, `departure: batch.date` |
| `message_trek_team` | `trek_team_section` | Click "Message Our Trek Team" WhatsApp link | `TrekDetails.tsx:460` | `channel: 'whatsapp'` |
| `inquire_now` | `navbar` | Click "Enquire Now" in navbar | `Navbar.tsx:129` | `channel: 'whatsapp'` |
| `chat` | `sticky_bottom_bar` | Mobile sticky bottom nav "Chat" icon | `Navbar.tsx:188` | `channel: 'whatsapp'` |
| `submit_query` | `footer_form` | Enquiry form submit | `EnquiryForm.tsx:20` | `channel: 'whatsapp'` |

All CTA events also carry base `trek` + `device` enrichment.

### Downloads
- `download_itinerary` (above) is the only file-download tracking point on the trek page.

### Form Submissions
- `EnquiryForm.tsx` `handleSubmit` (lines 17-42): fires `submit_query` at line 20 immediately on submit (before validation), then opens a prefilled WhatsApp chat and shows a confirmation state. No separate `form_submit` event or lead-value param.

## Known Gaps (as of last audit)

- No trek metadata (price, category, difficulty) is sent in any event — only the trek name string via ambient `trek` context. `trek.priceUSD`/`priceINR` and `batch.price` are available in `TrekDetails.tsx` but unused for tracking. **Decision (2026-08-05): intentionally not adding this.** Limited number of treks and stable pricing means price/currency params wouldn't add meaningful decision-making value here — not revisiting unless the catalog or pricing model changes.
- `init()` and `track()` in `analytics.ts` are unused no-op stubs.
- **Untracked interactions:** currency toggle (INR/USD), image gallery, itinerary day expand/collapse, testimonials carousel, FAQ accordion.
- Meta Pixel's own base `PageView` (fired once per route by `AnalyticsScripts.tsx`) is unaffected by the change above and is not trek-specific.
- GA4 property's Enhanced Measurement "Page changes based on browser history events" and "Form interactions" toggles were found locked/greyed out in Admin → Data Streams — could not be disabled at the property level, hence the code-side fix for `page_view` above. `form_start`/`form_submit` (GA4 auto-events, not in our custom event registry) still fire independently of our `submit_query` event and are not deduplicated.

---
*Last updated: 2026-08-05. Update this doc whenever tracking code changes so it stays a reliable source of truth.*
