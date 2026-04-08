import { defineType, defineField } from 'sanity'
import { VisibilityToggle } from '../components/VisibilityToggle'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',

  // Singleton — only one homepage document should ever exist
  // @ts-expect-error __experimental_actions is valid at runtime but missing from Sanity v5 types
  __experimental_actions: ['update', 'publish'],

  groups: [
    { name: 'hero',            title: '🏔  Hero'              },
    { name: 'trustMatrix',     title: '📊  Trust Matrix'      },
    { name: 'specialProjects', title: '🌱  Special Projects'  },
    { name: 'quoteSection',    title: '💬  Quote'             },
  ],

  fields: [

    // ── HERO SECTION ──────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'badge', title: 'Badge Text', type: 'string', description: 'Small label above the headline. e.g. "High Altitude Logistics"', initialValue: 'High Altitude Logistics' }),
        defineField({ name: 'headlineLine1', title: 'Headline — Line 1', type: 'string', initialValue: 'Safety.' }),
        defineField({ name: 'headlineLine2', title: 'Headline — Line 2', type: 'string', initialValue: 'Comfort.' }),
        defineField({ name: 'headlineLine3', title: 'Headline — Line 3', type: 'string', initialValue: 'The Himalayas.' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2, initialValue: 'Experience the world\'s highest peaks with highly qualified guides and unmatched safety standards.' }),
        defineField({ name: 'ctaText', title: 'Button Text', type: 'string', initialValue: 'View Expeditions' }),
        defineField({ name: 'ctaUrl', title: 'Button URL', type: 'string', initialValue: '/treks' }),
        defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'imageCaption', title: 'Image Caption', type: 'string', initialValue: 'Mount Everest Base Camp' }),
        defineField({ name: 'imageCoordinates', title: 'Image Coordinates', type: 'string', initialValue: '28.0026° N, 86.8528° E' }),
        defineField({ name: 'heroVideo', title: 'Hero Video', type: 'file', options: { accept: 'video/*' }, description: 'Upload a video file (MP4, WebM) to play when the user clicks the Play button. Leave empty to use the default.' }),
      ],
    }),

    // ── TRUST MATRIX ──────────────────────────────────────────────────────────
    defineField({
      name: 'trustMatrix',
      title: 'Trust Matrix Stats',
      group: 'trustMatrix',
      description: 'The 4 stat blocks below the hero. Keep exactly 4.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. Guide Ratio' }),
            defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. 1:4' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
          ],
          preview: {
            select: { label: 'label', value: 'value' },
            prepare: ({ label, value }) => ({ title: value, subtitle: label }),
          },
        },
      ],
      validation: Rule => Rule.length(4).error('Must have exactly 4 trust stats'),
    }),

    // ── SPECIAL PROJECTS ──────────────────────────────────────────────────────
    defineField({
      name: 'specialProjects',
      title: 'Special Projects Section',
      type: 'object',
      group: 'specialProjects',
      fields: [
        defineField({ name: 'sectionTagline', title: 'Section Tagline', type: 'string', initialValue: 'Beyond The Trek' }),
        defineField({ name: 'sectionHeading', title: 'Section Heading', type: 'string', initialValue: 'Our Special Projects' }),
        defineField({ name: 'sectionDescription', title: 'Section Description', type: 'text', rows: 2, initialValue: 'We believe the mountains demand more than technical skill. They demand responsibility — to the land, the communities, and the people who live among them.' }),
        defineField({ name: 'footerNote', title: 'Footer Note', type: 'string', initialValue: '1% of every expedition fee is directed to our special projects fund.' }),
        defineField({
          name: 'projects',
          title: 'Projects',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'visible', title: 'Visibility', type: 'boolean', initialValue: true, components: { input: VisibilityToggle } }),
                defineField({ name: 'category', title: 'Category', type: 'string', description: 'e.g. Education, Environment, Community' }),
                defineField({ name: 'name', title: 'Project Name', type: 'string' }),
                defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                defineField({ name: 'stat', title: 'Stat', type: 'string', description: 'e.g. 14 Schools Built' }),
                defineField({ name: 'statSub', title: 'Stat Subtitle', type: 'string', description: 'e.g. across the Khumbu & Annapurna regions' }),
                defineField({ name: 'image', title: 'Project Image', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'Learn More' }),
                defineField({ name: 'ctaUrl', title: 'CTA URL', type: 'string' }),
              ],
              preview: {
                select: { name: 'name', category: 'category', media: 'image' },
                prepare: ({ name, category, media }) => ({ title: name, subtitle: category, media }),
              },
            },
          ],
          validation: Rule => Rule.max(3),
        }),
      ],
    }),

    // ── QUOTE SECTION ─────────────────────────────────────────────────────────
    defineField({
      name: 'quoteSection',
      title: 'Quote Section',
      type: 'object',
      group: 'quoteSection',
      fields: [
        defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3, initialValue: 'The mountains are not a place to conquer, but a place to rediscover what it means to be human under the strict guidance of nature.' }),
        defineField({ name: 'author', title: 'Author Name', type: 'string', initialValue: 'Reinhold Messner' }),
        defineField({ name: 'authorTitle', title: 'Author Title', type: 'string', initialValue: 'Alpine Legend' }),
      ],
    }),

  ],

  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
})
