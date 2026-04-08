import type { ReactNode } from 'react'

// Isolate the Sanity Studio from the root layout.
// The root layout injects fonts, JSON-LD, and body classes that break Studio's
// own HTML/CSS initialisation and interfere with its EventSource listeners.
export default function StudioLayout({ children }: { children: ReactNode }) {
  return children
}
