import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './src/sanity/schemas'
import { DuplicateTrekAction } from './src/sanity/actions/duplicateTrek'
import { heicSafeUploadSource } from './src/sanity/assetSources/heicSafeUpload'

export default defineConfig({
  name: 'trekking-website',
  title: 'Trekking Website CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'qmj04x7n',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool(), visionTool(), media()],
  schema: { types: schemaTypes },
  basePath: '/studio',
  document: {
    actions: (prev, { schemaType }) =>
      schemaType === 'trek' ? [...prev, DuplicateTrekAction] : prev,
  },
  form: {
    // Replace the default upload source on every image field with a HEIC-safe one
    // (converts .heic/.heif to .jpg client-side before upload) and disable direct
    // drag-and-drop uploads, which bypass asset sources entirely.
    image: {
      assetSources: (prev) => [heicSafeUploadSource, ...prev.filter((s) => s.name !== 'sanity-default')],
      directUploads: false,
    },
  },
})
