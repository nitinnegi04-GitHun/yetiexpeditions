import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { DuplicateTrekAction } from './src/sanity/actions/duplicateTrek'

export default defineConfig({
  name: 'trekking-website',
  title: 'Trekking Website CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'qmj04x7n',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
  basePath: '/studio',
  document: {
    actions: (prev, { schemaType }) =>
      schemaType === 'trek' ? [...prev, DuplicateTrekAction] : prev,
  },
})
