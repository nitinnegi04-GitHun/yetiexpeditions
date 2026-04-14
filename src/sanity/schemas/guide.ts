import { defineType, defineField } from 'sanity'

export const guide = defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'guideId',
      title: 'Guide ID',
      type: 'string',
      description: 'e.g. GUIDE-001',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title / Role',
      type: 'string',
      description: 'e.g. Lead Himalayan Guide',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'cert',
      title: 'Certification',
      type: 'string',
      description: 'e.g. IFMGA / AMGA Certified',
    }),
    defineField({
      name: 'summits',
      title: 'Summits',
      type: 'string',
      description: 'e.g. Everest (×3), Lhotse, Makalu',
    }),
    // 3 performance metric strings shown in the about page grid
    defineField({
      name: 'stats',
      title: 'Stats (3 metrics)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Exactly 3 short stat strings, e.g. "14 Seasons", "0 Evacuations", "847 Trekkers"',
      validation: Rule => Rule.length(3),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'International format without + or spaces. e.g. 9779812345678',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Without the @ symbol. e.g. lakparita.sherpa',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first',
      initialValue: 99,
    }),
  ],

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
})
