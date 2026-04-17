// Aggregated schema export — used by sanity.config.ts from project root
// (root-level config uses relative paths, not @/ aliases)
import { calendarBatch } from './calendarBatch'
import { trek } from './trek'
import { article } from './article'
import { siteSettings } from './siteSettings'
import { homepage } from './homepage'
import { aboutPage } from './aboutPage'
import { guide } from './guide'
import { seoFields } from './seoFields'
import { testimonial } from './testimonial'

export const schemaTypes = [
  // Object types (embedded)
  calendarBatch,
  seoFields,

  // Document types
  homepage,
  aboutPage,
  trek,
  article,
  siteSettings,
  guide,
  testimonial,
]
