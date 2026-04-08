import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Special Project',
  type: 'document',
  fields: [
    defineField({
      name: 'projectId',
      title: 'Project ID',
      type: 'string',
      description: 'e.g. 01',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Education', value: 'Education' },
          { title: 'Environment', value: 'Environment' },
          { title: 'Community', value: 'Community' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short punchy line shown under the name',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'stat',
      title: 'Key Stat',
      type: 'string',
      description: 'e.g. "3 Schools"',
    }),
    defineField({
      name: 'statSub',
      title: 'Stat Sub-label',
      type: 'string',
      description: 'e.g. "Built & Funded"',
    }),
    defineField({
      name: 'cta',
      title: 'CTA Label',
      type: 'string',
      initialValue: 'Learn More',
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
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
      subtitle: 'category',
      media: 'image',
    },
  },
})
