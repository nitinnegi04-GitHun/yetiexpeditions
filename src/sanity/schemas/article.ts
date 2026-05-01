import { defineType, defineField } from 'sanity'
import { richTextBlock } from './richTextBlock'

export const article = defineType({
  name: 'article',
  title: 'Journal Article',
  type: 'document',

  groups: [
    { name: 'content', title: '✏️  Content', default: true },
    { name: 'seo',     title: '🔍  SEO'                    },
  ],

  fields: [
    // ── Core ───────────────────────────────────────────────────
    defineField({ name: 'title',    title: 'Title',         type: 'string', group: 'content', validation: Rule => Rule.required() }),
    defineField({ name: 'slug',     title: 'Slug',          type: 'slug',   group: 'content', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'excerpt',  title: 'Excerpt',       type: 'text',   group: 'content', rows: 2, validation: Rule => Rule.required().max(300) }),
    defineField({ name: 'featured', title: 'Featured Article', type: 'boolean', group: 'content', initialValue: false, description: 'Pinned to the top of the journal page' }),
    defineField({ name: 'image',    title: 'Cover Image',   type: 'image',  group: 'content', options: { hotspot: true }, validation: Rule => Rule.required() }),

    // ── Author ─────────────────────────────────────────────────
    defineField({ name: 'author',      title: 'Author Name',  type: 'string', group: 'content', validation: Rule => Rule.required() }),
    defineField({ name: 'authorTitle', title: 'Author Title', type: 'string', group: 'content', description: 'e.g. Lead Expedition Guide · WFR Certified' }),

    // ── Taxonomy & Meta ────────────────────────────────────────
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Expedition Reports', value: 'Expedition Reports' },
          { title: 'Gear & Kit', value: 'Gear & Kit' },
          { title: 'Training', value: 'Training' },
          { title: 'Altitude Science', value: 'Altitude Science' },
          { title: 'Community', value: 'Community' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'tags',     title: 'Tags',         type: 'array',  group: 'content', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'date',     title: 'Publish Date', type: 'date',   group: 'content', validation: Rule => Rule.required() }),
    defineField({ name: 'readTime', title: 'Read Time',    type: 'string', group: 'content', description: 'e.g. 8 min read' }),

    // ── Body ───────────────────────────────────────────────────
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      group: 'content',
      of: [
        richTextBlock,
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
            defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
          ],
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})
