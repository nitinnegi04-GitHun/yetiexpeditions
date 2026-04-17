import { defineType, defineField } from 'sanity'

/**
 * Reusable SEO object — embedded in trek, aboutPage, siteSettings.
 * All fields are optional overrides; pages fall back to auto-generated values.
 */
export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Overrides the auto-generated page title. Ideal length: 50–60 characters. Leave blank to use the default.',
      validation: Rule => Rule.max(60).warning('Over 60 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Overrides the auto-generated description shown in search results. Ideal length: 120–160 characters.',
      validation: Rule => Rule.max(160).warning('Over 160 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image shown when this page is shared on WhatsApp, LinkedIn, Twitter etc. Recommended: 1200×630px.',
      options: { hotspot: false },
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      initialValue: false,
      description: 'Enable to prevent Google from indexing this page. Use only for drafts or internal pages.',
    }),
  ],
  preview: {
    select: { title: 'metaTitle', description: 'metaDescription' },
    prepare: ({ title, description }) => ({
      title: title ?? '(No meta title set — using auto-generated)',
      subtitle: description ?? '',
    }),
  },
})
