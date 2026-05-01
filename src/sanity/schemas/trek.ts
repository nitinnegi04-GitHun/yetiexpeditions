import { defineType, defineField } from 'sanity'
import { simpleRichTextBlock } from './richTextBlock'

export const trek = defineType({
  name: 'trek',
  title: 'Trek',
  type: 'document',

  groups: [
    { name: 'overview',    title: '🏔  Overview',      default: true },
    { name: 'departures',  title: '📅  Departures'               },
    { name: 'itinerary',   title: '🗺  Itinerary'                },
    { name: 'includes',    title: '✓  Includes / Excludes'      },
    { name: 'logistics',   title: '🧳  Logistics'                },
    { name: 'preparation', title: '💪  Preparation'              },
    { name: 'social',      title: '⭐  Reviews & Gallery'        },
    { name: 'faqs',        title: '❓  FAQs'                     },
    { name: 'seo',         title: '🔍  SEO'                      },
  ],

  fields: [
    // ── Core identity ──────────────────────────────────────────
    defineField({ name: 'name',          title: 'Trek Name',          type: 'string',  group: 'overview', validation: Rule => Rule.required() }),
    defineField({ name: 'slug',          title: 'Slug',               type: 'slug',    group: 'overview', options: { source: 'name', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'region',        title: 'Region',             type: 'string',  group: 'overview', description: 'e.g. Nepal, India', validation: Rule => Rule.required() }),
    defineField({
      name: 'country', title: 'Country', type: 'string', group: 'overview',
      options: { list: [{ title: 'Nepal', value: 'Nepal' }, { title: 'India', value: 'India' }, { title: 'Bhutan', value: 'Bhutan' }], layout: 'radio' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'difficulty', title: 'Difficulty', type: 'string', group: 'overview',
      options: { list: [{ title: 'Easy', value: 'Easy' }, { title: 'Moderate', value: 'Moderate' }, { title: 'Difficult', value: 'Difficult' }], layout: 'radio' },
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'duration',      title: 'Duration',           type: 'string',  group: 'overview', description: 'e.g. 14 Days', validation: Rule => Rule.required() }),
    defineField({ name: 'altitude',      title: 'Max Altitude',       type: 'string',  group: 'overview', description: 'e.g. 5,364m',  validation: Rule => Rule.required() }),
    defineField({ name: 'season',        title: 'Best Season',        type: 'string',  group: 'overview', description: 'e.g. MAR-MAY', validation: Rule => Rule.required() }),
    defineField({ name: 'accommodation', title: 'Accommodation Type', type: 'string',  group: 'overview', description: 'e.g. TEAHOUSE', validation: Rule => Rule.required() }),
    defineField({ name: 'groupSize',     title: 'Group Size',         type: 'string',  group: 'overview', description: 'e.g. MAX 08',  validation: Rule => Rule.required() }),
    defineField({ name: 'priceUSD', title: 'Price (USD)', type: 'number', group: 'overview', description: 'Enter the numeric price in US Dollars e.g. 3400. Leave blank if not offering USD pricing.', validation: Rule => Rule.positive() }),
    defineField({ name: 'priceINR', title: 'Price (INR)', type: 'number', group: 'overview', description: 'Enter the numeric price in Indian Rupees e.g. 285000. Leave blank if not offering INR pricing.', validation: Rule => Rule.positive() }),
    defineField({ name: 'bannerImage',   title: 'Banner Image',       type: 'image',   group: 'overview', options: { hotspot: true }, description: 'Used when no video is uploaded. Provide either an image or a video (or both — video takes priority).' }),
    defineField({ name: 'bannerVideo',   title: 'Banner Video',       type: 'file',    group: 'overview', options: { accept: 'video/*' }, description: 'Upload an MP4/WebM to autoplay as the banner. If provided, this replaces the banner image.' }),
    defineField({
      name: 'trekLead',
      title: 'Trek Lead',
      type: 'reference',
      to: [{ type: 'guide' }],
      group: 'overview',
      description: 'The primary guide leading this trek. Shown on the homepage calendar and trek page.',
    }),

    // ── Batches / Calendar ─────────────────────────────────────
    defineField({
      name: 'batches',
      title: 'Departure Batches',
      type: 'array',
      group: 'departures',
      of: [{ type: 'calendarBatch' }],
    }),

    // ── Itinerary ──────────────────────────────────────────────
    defineField({
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      group: 'itinerary',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'day', title: 'Day', type: 'string', description: 'e.g. 01' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'content', title: 'Description', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { day: 'day', title: 'title' },
            prepare: ({ day, title }) => ({ title: `Day ${day}: ${title}` }),
          },
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),

    // ── Altitude Profile ───────────────────────────────────────
    defineField({
      name: 'altitudeProfile',
      group: 'itinerary',
      title: 'Altitude Profile',
      description: 'Data points for the altitude chart',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'day', title: 'Day', type: 'number' }),
            defineField({ name: 'label', title: 'Location Label', type: 'string', description: 'e.g. Namche' }),
            defineField({ name: 'altitude', title: 'Altitude (m)', type: 'number' }),
          ],
          preview: {
            select: { day: 'day', label: 'label', altitude: 'altitude' },
            prepare: ({ day, label, altitude }) => ({ title: `Day ${day} — ${label}`, subtitle: `${altitude}m` }),
          },
        },
      ],
    }),

    // ── Included / Excluded ────────────────────────────────────
    defineField({ name: 'included', title: "What's Included", type: 'array', group: 'includes', of: [simpleRichTextBlock] }),
    defineField({ name: 'excluded', title: "What's Excluded", type: 'array', group: 'includes', of: [simpleRichTextBlock] }),

    // ── Safety Protocols ──────────────────────────────────────
    defineField({
      name: 'safetyProtocols',
      title: 'Safety Protocols',
      type: 'array',
      group: 'overview',
      description: 'Shown in the sidebar on the trek page. Add each safety measure as a title + description.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', description: 'e.g. WFR Certified Guides' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
            prepare: ({ title, subtitle }) => ({ title, subtitle }),
          },
        },
      ],
    }),

    // ── Non-Negotiables ───────────────────────────────────────
    defineField({
      name: 'nonNegotiables',
      title: 'Non-Negotiables',
      type: 'array',
      group: 'includes',
      description: 'Important points every trekker must read and acknowledge before booking.',
      of: [simpleRichTextBlock],
    }),

    // ── Packing List ───────────────────────────────────────────
    defineField({
      name: 'packingList',
      group: 'logistics',
      title: 'Packing List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'category', title: 'Category', type: 'string', description: 'e.g. Clothing, Footwear' }),
            defineField({ name: 'items', title: 'Items', type: 'array', of: [{ type: 'string' }] }),
          ],
          preview: {
            select: { category: 'category', items: 'items' },
            prepare: ({ category, items }) => ({ title: category, subtitle: `${items?.length ?? 0} items` }),
          },
        },
      ],
    }),

    // ── Physical Preparation ───────────────────────────────────
    defineField({
      name: 'physicalPrep',
      group: 'preparation',
      title: 'Physical Preparation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'weeks', title: 'Timeframe', type: 'string', description: 'e.g. 16+ Weeks Out' }),
            defineField({ name: 'focus', title: 'Focus Area', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { weeks: 'weeks', focus: 'focus' },
            prepare: ({ weeks, focus }) => ({ title: weeks, subtitle: focus }),
          },
        },
      ],
    }),

    // ── Testimonials ───────────────────────────────────────────
    defineField({
      name: 'testimonials',
      group: 'social',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'location', title: 'Location', type: 'string', description: 'e.g. London, UK' }),
            defineField({ name: 'rating', title: 'Rating (1-5)', type: 'number', initialValue: 5 }),
            defineField({ name: 'text', title: 'Review Text', type: 'text', rows: 3 }),
            defineField({ name: 'batch', title: 'Batch Reference', type: 'string', description: 'e.g. EBC — March 2024' }),
          ],
          preview: {
            select: { name: 'name', location: 'location' },
            prepare: ({ name, location }) => ({ title: name, subtitle: location }),
          },
        },
      ],
    }),

    // ── Gallery ────────────────────────────────────────────────
    defineField({
      name: 'gallery',
      group: 'social',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    // ── Getting There ──────────────────────────────────────────
    defineField({
      name: 'gettingThere',
      group: 'logistics',
      title: 'Getting There',
      type: 'object',
      fields: [
        defineField({ name: 'arrival', title: 'Arrival Info', type: 'text', rows: 2 }),
        defineField({ name: 'visa', title: 'Visa Info', type: 'text', rows: 2 }),
        defineField({ name: 'domesticFlight', title: 'Domestic Flight Info', type: 'text', rows: 2 }),
      ],
    }),

    // ── Accommodation Details ──────────────────────────────────
    defineField({
      name: 'accommodationDetails',
      group: 'logistics',
      title: 'Accommodation Details',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'location', title: 'Location', type: 'string' }),
            defineField({ name: 'type', title: 'Type', type: 'string', description: 'e.g. Teahouse, 3-Star Hotel' }),
            defineField({ name: 'nights', title: 'Nights', type: 'number' }),
            defineField({ name: 'notes', title: 'Notes', type: 'string' }),
          ],
          preview: {
            select: { location: 'location', type: 'type', nights: 'nights' },
            prepare: ({ location, type, nights }) => ({ title: location, subtitle: `${nights} nights — ${type}` }),
          },
        },
      ],
    }),

    // ── Permits ────────────────────────────────────────────────
    defineField({
      name: 'permits',
      group: 'logistics',
      title: 'Permits Required',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Permit Name', type: 'string' }),
            defineField({ name: 'cost', title: 'Cost', type: 'string', description: 'e.g. $30 USD' }),
            defineField({ name: 'handledBy', title: 'Handled By', type: 'string', initialValue: 'Yeti Expeditions' }),
            defineField({ name: 'notes', title: 'Notes', type: 'string' }),
          ],
          preview: {
            select: { name: 'name', cost: 'cost' },
            prepare: ({ name, cost }) => ({ title: name, subtitle: cost }),
          },
        },
      ],
    }),

    // ── FAQs ───────────────────────────────────────────────────
    defineField({
      name: 'faqs',
      group: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { question: 'question' },
            prepare: ({ question }) => ({ title: question }),
          },
        },
      ],
    }),

    // ── SEO ────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seoFields',
      group: 'seo',
    }),

    // ── Related Treks ──────────────────────────────────────────
    defineField({
      name: 'relatedTreks',
      group: 'social',
      title: 'Related Treks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'trek' }] }],
      validation: Rule => Rule.max(3),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'region',
      media: 'bannerImage',
    },
  },
})
