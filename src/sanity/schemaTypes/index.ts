import { calendarBatch } from '../schemas/calendarBatch'
import { trek } from '../schemas/trek'
import { article } from '../schemas/article'
import { guide } from '../schemas/guide'
import { project } from '../schemas/project'
import { siteSettings } from '../schemas/siteSettings'

export const schemaTypes = [
  // Object types (embedded, not top-level documents)
  calendarBatch,

  // Document types
  trek,
  article,
  guide,
  project,
  siteSettings,
]
