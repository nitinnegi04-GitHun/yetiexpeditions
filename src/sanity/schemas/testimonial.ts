import { defineField, defineType } from 'sanity'
import { simpleRichTextBlock } from './richTextBlock'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Trekker Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. London, UK',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: "The trekker's photo, shown alongside their review.",
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      initialValue: 5,
      validation: Rule => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'array',
      of: [simpleRichTextBlock],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'batch',
      title: 'Batch Reference',
      type: 'string',
      description: 'e.g. EBC — March 2024',
    }),
    defineField({
      name: 'trek',
      title: 'Trek',
      type: 'reference',
      to: [{ type: 'trek' }],
      description: 'Which trek is this testimonial for?',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'batch',
      trek: 'trek.name',
      media: 'photo',
    },
    prepare: ({ title, subtitle, trek, media }) => ({
      title,
      subtitle: [trek, subtitle].filter(Boolean).join(' · '),
      media,
    }),
  },
  orderings: [
    {
      title: 'Trek Name',
      name: 'trekAsc',
      by: [{ field: 'trek.name', direction: 'asc' }],
    },
    {
      title: 'Newest First',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
})
