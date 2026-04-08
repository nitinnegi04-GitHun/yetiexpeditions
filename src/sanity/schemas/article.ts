import { defineType, defineField } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Journal Article',
  type: 'document',

  groups: [
    { name: 'content',  title: '✏️  Content',  default: true },
    { name: 'taxonomy', title: '🏷  Taxonomy'               },
    { name: 'author',   title: '👤  Author'                 },
    { name: 'meta',     title: '⚙️  Meta'                   },
  ],

  fields: [
    // ── Core ───────────────────────────────────────────────────
    defineField({ name: 'title',    title: 'Title',         type: 'string', group: 'content', validation: Rule => Rule.required() }),
    defineField({ name: 'slug',     title: 'Slug',          type: 'slug',   group: 'content', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'excerpt',  title: 'Excerpt',       type: 'text',   group: 'content', rows: 2, validation: Rule => Rule.required().max(300) }),
    defineField({ name: 'featured', title: 'Featured Article', type: 'boolean', group: 'content', initialValue: false, description: 'Pinned to the top of the journal page' }),
    defineField({ name: 'image',    title: 'Cover Image',   type: 'image',  group: 'content', options: { hotspot: true }, validation: Rule => Rule.required() }),

    // ── Taxonomy ───────────────────────────────────────────────
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'taxonomy',
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
    defineField({ name: 'tags', title: 'Tags', type: 'array', group: 'taxonomy', of: [{ type: 'string' }], options: { layout: 'tags' } }),

    // ── Author ─────────────────────────────────────────────────
    defineField({ name: 'author',      title: 'Author Name',  type: 'string', group: 'author', validation: Rule => Rule.required() }),
    defineField({ name: 'authorTitle', title: 'Author Title', type: 'string', group: 'author', description: 'e.g. Lead Expedition Guide · IFMGA Certified' }),

    // ── Meta ───────────────────────────────────────────────────
    defineField({ name: 'date',     title: 'Publish Date', type: 'date',   group: 'meta', validation: Rule => Rule.required() }),
    defineField({ name: 'readTime', title: 'Read Time',    type: 'string', group: 'meta', description: 'e.g. 8 min read' }),

    // ── Body ───────────────────────────────────────────────────
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'paragraph',
          title: 'Paragraph',
          fields: [
            defineField({ name: 'type', type: 'string', hidden: true, initialValue: 'p' }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 4 }),
          ],
          preview: { select: { text: 'text' }, prepare: ({ text }) => ({ title: text?.slice(0, 80) }) },
        },
        {
          type: 'object',
          name: 'heading',
          title: 'Heading (H2)',
          fields: [
            defineField({ name: 'type', type: 'string', hidden: true, initialValue: 'h2' }),
            defineField({ name: 'text', title: 'Heading Text', type: 'string' }),
          ],
          preview: { select: { text: 'text' }, prepare: ({ text }) => ({ title: `H2: ${text}` }) },
        },
        {
          type: 'object',
          name: 'quote',
          title: 'Pull Quote',
          fields: [
            defineField({ name: 'type', type: 'string', hidden: true, initialValue: 'quote' }),
            defineField({ name: 'text', title: 'Quote Text', type: 'text', rows: 2 }),
            defineField({ name: 'attribution', title: 'Attribution', type: 'string', description: 'Optional source name' }),
          ],
          preview: { select: { text: 'text' }, prepare: ({ text }) => ({ title: `"${text?.slice(0, 60)}"` }) },
        },
        {
          type: 'object',
          name: 'articleImage',
          title: 'Image',
          fields: [
            defineField({ name: 'type', type: 'string', hidden: true, initialValue: 'image' }),
            defineField({ name: 'src', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
          preview: { select: { media: 'src', caption: 'caption' }, prepare: ({ media, caption }) => ({ title: caption ?? 'Image', media }) },
        },
        {
          type: 'object',
          name: 'divider',
          title: 'Divider',
          fields: [
            defineField({ name: 'type', type: 'string', hidden: true, initialValue: 'divider' }),
          ],
          preview: { prepare: () => ({ title: '— Divider —' }) },
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
