// Aggregated schema export — used by sanity.config.ts from project root
// (root-level config uses relative paths, not @/ aliases)
import { calendarBatch } from './calendarBatch'
import { trek } from './trek'
import { article } from './article'
import { siteSettings } from './siteSettings'
import { homepage } from './homepage'
import { aboutPage } from './aboutPage'

export const schemaTypes = [
  // Object types (embedded)
  calendarBatch,

  // Document types
  homepage,
  aboutPage,
  trek,
  article,
  siteSettings,
]
