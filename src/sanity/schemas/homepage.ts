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
    { name: 'whyWeTrek',       title: '🧭  Why We Trek'       },
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

    // ── WHY WE TREK ────────────────────────────────────────────────────────────
    defineField({
      name: 'whyWeTrek',
      title: 'Why We Trek Section',
      type: 'object',
      group: 'whyWeTrek',
      description: 'Brand/philosophy section shown between Trust Matrix and the trek listing. An editorial narrative, not a sales block.',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Why We Trek' }),
        defineField({ name: 'headline', title: 'Headline', type: 'string', initialValue: 'Everyone comes to the mountains for a different reason.' }),
        defineField({
          name: 'openingCopy',
          title: 'Opening Copy',
          type: 'text',
          rows: 8,
          description: 'Paragraphs separated by a blank line. Rendered above the pull quote.',
          initialValue:
            'Some come looking for a challenge. Some for time with friends. Some want to step away from routine, while others are drawn by the quiet, the landscape, or simply the idea of seeing what lies beyond the next ridge.\n\nWhat we’ve learnt over the years is that a trek can become much more than the trail itself. What you take back from it is deeply personal.\n\nThat’s also why we don’t believe there is one trek that is right for everyone.',
        }),
        defineField({ name: 'pullQuote', title: 'Pull Quote', type: 'string', description: 'Shown as a large standalone statement — do not repeat this line in the Opening or Explanation copy.', initialValue: 'The mountains are the medium, not the destination. What you carry back with you is the real reason you came.' }),
        defineField({
          name: 'explanationCopy',
          title: 'Explanation Copy',
          type: 'text',
          rows: 10,
          description: 'Paragraphs separated by a blank line. Rendered below the subheading.',
          initialValue:
            'We run fixed departures on a selection of Himalayan journeys we know deeply — our Signature Treks, listed just below. For many people, one of these will be exactly what they are looking for.\n\nBut sometimes it won’t be.\n\nYour experience, fitness, time, interests and even what you’re looking for from the mountains can point towards a very different journey.\n\nTalk to us. Tell us what you have in mind. We’ll help you think it through.\n\nSometimes that might mean joining one of our Signature Treks. Sometimes it might mean designing something around you. And sometimes, the right answer may be a trek we don’t even operate.\n\nWe’re okay with that.',
        }),
        defineField({ name: 'closingStatement', title: 'Closing Statement', type: 'string', description: 'Given visual emphasis at the end of the narrative.', initialValue: 'We’d rather help you find the right journey than sell you the wrong one.' }),
        defineField({ name: 'ctaIntro', title: 'CTA Intro Line', type: 'string', description: 'Bridging sentence introducing the two paths below (browse treks vs. talk to someone).', initialValue: 'From here, you can browse our Signature Treks below, or talk to a trek lead about your own journey.' }),
        defineField({ name: 'viewTreksText', title: '"View Treks" Link Text', type: 'string', description: 'Scrolls down to the Signature Treks listing on this page.', initialValue: 'View Our Treks' }),
        defineField({ name: 'ctaText', title: 'WhatsApp CTA Text', type: 'string', initialValue: 'Speak with a Trek Lead' }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          description: 'A real human Himalayan moment (people on trail, guides, rest stops) — not a landscape hero shot. Optional: the section reads as a centered editorial narrative when left empty, or an asymmetric text/image split when set.',
        }),
      ],
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
        defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3, initialValue: 'There isn’t one right way to do a trek. My job — and Yeti’s — is to help you find the one that’s actually right for you.' }),
        defineField({ name: 'author', title: 'Author Name', type: 'string', initialValue: 'Pradhuman Singh Negi' }),
        defineField({ name: 'authorTitle', title: 'Author Title', type: 'string', initialValue: 'Co-Founder, Yeti Expeditions' }),
        defineField({ name: 'authorPhoto', title: 'Author Photo', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'linkText', title: 'Link Text', type: 'string', initialValue: 'More About Me' }),
        defineField({ name: 'linkUrl', title: 'Link URL', type: 'string', initialValue: '/our-story' }),
      ],
    }),

  ],

  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
})
