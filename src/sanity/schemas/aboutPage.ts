import { defineType, defineField } from 'sanity'
import { VisibilityToggle } from '../components/VisibilityToggle'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Our Story',
  type: 'document',

  // Singleton — only one document should ever exist
  // @ts-expect-error __experimental_actions is valid at runtime but missing from Sanity v5 types
  __experimental_actions: ['update', 'publish'],

  groups: [
    { name: 'leftPanel', title: '📷  Left Panel' },
    { name: 'coFounder', title: '🎖  Co-Founder' },
    { name: 'hero', title: '🏔  Hero' },
    { name: 'founding', title: '📖  The Founding' },
    { name: 'stats', title: '📊  By The Numbers' },
    { name: 'philosophy', title: '⚙️  How We Climb' },
    { name: 'guides', title: '🧗  Our Guides' },
    { name: 'crew', title: '⚙️  The Crew' },
    { name: 'whyYeti', title: '✓  Why Yeti' },
    { name: 'cta', title: '🎯  CTA' },
  ],

  fields: [

    // ── LEFT PANEL (sticky image) ──────────────────────────────────────────────
    defineField({
      name: 'leftPanel',
      title: 'Left Image Panel',
      type: 'object',
      group: 'leftPanel',
      fields: [
        defineField({ name: 'image', title: 'Panel Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'expeditionCity', title: 'Designation', type: 'string', initialValue: 'Kathmandu' }),
        defineField({ name: 'expeditionCountry', title: 'Tag', type: 'string', initialValue: 'Nepal' }),
      ],
    }),

    // ── CO-FOUNDER ────────────────────────────────────────────────────────────
    defineField({
      name: 'coFounder',
      title: 'Co-Founder',
      type: 'object',
      group: 'coFounder',
      fields: [
        defineField({ name: 'name', title: 'Full Name', type: 'string', initialValue: 'Pradhuman Singh Negi' }),
        defineField({ name: 'role', title: 'Role', type: 'string', initialValue: 'Co-Founder & Expedition Director' }),
        defineField({
          name: 'bio',
          title: 'Bio',
          type: 'array',
          description: 'Supports bold, italic, and highlight colour.',
          of: [
            {
              type: 'block',
              styles: [{ title: 'Normal', value: 'normal' }],
              lists: [],
              marks: {
                decorators: [
                  { title: 'Bold', value: 'strong' },
                  { title: 'Italic', value: 'em' },
                ],
                annotations: [
                  {
                    name: 'highlight',
                    type: 'object',
                    title: 'Highlight Colour',
                    fields: [
                      {
                        name: 'color',
                        title: 'Colour',
                        type: 'string',
                        options: {
                          list: [
                            { title: 'Red (Brand)', value: 'text-primary' },
                            { title: 'Dark', value: 'text-slate-900' },
                            { title: 'Muted', value: 'text-slate-400' },
                          ],
                          layout: 'radio',
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
        }),
        defineField({ name: 'quoteAttribution', title: 'Quote Attribution Line', type: 'string', initialValue: 'Pradhuman Singh Negi, Co-Founder', description: 'Shown below the hero quote, e.g. "Pradhuman Singh Negi, Co-Founder"' }),
        defineField({
          name: 'credentials',
          title: 'Credentials',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'code', title: 'Code / Year', type: 'string', description: 'e.g. HAWS, SBS, 2022' }),
                defineField({ name: 'label', title: 'Label', type: 'string' }),
                defineField({ name: 'sub', title: 'Sub-text', type: 'string' }),
              ],
              preview: {
                select: { code: 'code', label: 'label' },
                prepare: ({ code, label }) => ({ title: `${code} — ${label}` }),
              },
            },
          ],
        }),
      ],
    }),

    // ── SECTION 1: HERO ───────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero — Born From The Mountain',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'badge', title: 'Badge Text', type: 'string', initialValue: 'IFMGA Certified Expedition Company' }),
        defineField({ name: 'headlineLine1', title: 'Headline — Line 1', type: 'string', initialValue: 'Born' }),
        defineField({ name: 'headlineLine2', title: 'Headline — Line 2', type: 'string', initialValue: 'From The' }),
        defineField({ name: 'headlineLine3', title: 'Headline — Line 3', type: 'string', initialValue: 'Mountain' }),
        defineField({ name: 'openingQuote', title: 'Opening Quote', type: 'text', rows: 3, initialValue: 'We don\'t sell adventures. We guide lives. The mountain was here before us and it will outlast us — our job is to help you meet it honestly.' }),
      ],
    }),

    // ── SECTION 2: THE FOUNDING ───────────────────────────────────────────────
    defineField({
      name: 'founding',
      title: 'The Founding',
      type: 'object',
      group: 'founding',
      fields: [
        defineField({ name: 'tagline', title: 'Tagline', type: 'string', initialValue: 'The Beginning' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'How It Started' }),
        defineField({
          name: 'paragraphs',
          title: 'Story Paragraphs',
          description: 'Each entry is one paragraph of the founding story.',
          type: 'array',
          of: [{ type: 'text' }],
        }),
      ],
    }),

    // ── SECTION 3: BY THE NUMBERS ─────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'By The Numbers — Stats',
      group: 'stats',
      description: 'Keep exactly 4 stats.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. 847 or 6,200+' }),
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. Expeditions Led' }),
          ],
          preview: {
            select: { value: 'value', label: 'label' },
            prepare: ({ value, label }) => ({ title: value, subtitle: label }),
          },
        },
      ],
      validation: Rule => Rule.length(4).error('Must have exactly 4 stats'),
    }),

    // ── SECTION 4: THE SHERPA CODE ────────────────────────────────────────────
    defineField({
      name: 'philosophy',
      title: 'How We Climb',
      type: 'object',
      group: 'philosophy',
      fields: [
        defineField({ name: 'tagline', title: 'Tagline', type: 'string', initialValue: 'Operating Principles' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'The How We Climb' }),
        defineField({
          name: 'principles',
          title: 'Principles',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'code', title: 'Number', type: 'string', description: 'e.g. 01, 02' }),
                defineField({ name: 'title', title: 'Principle Title', type: 'string' }),
                defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 3 }),
              ],
              preview: {
                select: { code: 'code', title: 'title' },
                prepare: ({ code, title }) => ({ title: `${code} — ${title}` }),
              },
            },
          ],
        }),
      ],
    }),

    // ── SECTION 5: OUR GUIDES ─────────────────────────────────────────────────
    defineField({
      name: 'guides',
      title: 'Our Guides',
      type: 'object',
      group: 'guides',
      fields: [
        defineField({ name: 'tagline', title: 'Tagline', type: 'string', initialValue: 'The Team' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Our Guides' }),
        defineField({
          name: 'guidesList',
          title: 'Guides',
          description: 'Pick guides from the Guide documents. Order here controls display order. Remove a guide from this list to hide them.',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'guide' }] }],
        }),
      ],
    }),

    // ── SECTION 5b: THE CREW ──────────────────────────────────────────────────
    defineField({
      name: 'crew',
      title: 'The Crew',
      type: 'object',
      group: 'crew',
      fields: [
        defineField({ name: 'tagline', title: 'Tagline', type: 'string', initialValue: 'Operations' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'The Crew' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2, initialValue: 'Every summit starts at base camp. These are the people who make each expedition operationally flawless — permits, logistics, client care, and everything in between.' }),
        defineField({
          name: 'crewList',
          title: 'Crew Members',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'visible', title: 'Visibility', type: 'boolean', initialValue: true, components: { input: VisibilityToggle } }),
                defineField({ name: 'memberId', title: 'Member ID', type: 'string', description: 'e.g. OPS-001' }),
                defineField({ name: 'name', title: 'Full Name', type: 'string' }),
                defineField({ name: 'role', title: 'Role', type: 'string', description: 'e.g. Permits & Logistics Director' }),
                defineField({ name: 'domain', title: 'Domain', type: 'string', description: 'Short descriptor. e.g. Govt. Liaison · Route Clearance' }),
                defineField({ name: 'note', title: 'Note', type: 'text', rows: 2, description: 'One-liner about their contribution' }),
                defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
              ],
              preview: {
                select: { name: 'name', role: 'role', media: 'image', visible: 'visible' },
                prepare: ({ name, role, media, visible }) => ({
                  title: `${visible === false ? '○ ' : '● '}${name}`,
                  subtitle: role,
                  media,
                }),
              },
            },
          ],
        }),
      ],
    }),

    // ── SECTION 6: WHY YETI ───────────────────────────────────────────────────
    defineField({
      name: 'whyYeti',
      title: 'Why Yeti',
      type: 'object',
      group: 'whyYeti',
      fields: [
        defineField({ name: 'tagline', title: 'Tagline', type: 'string', initialValue: 'The Difference' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Why Yeti' }),
        defineField({
          name: 'differentiators',
          title: 'Differentiators',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string', description: 'e.g. Group Cap: 8' }),
                defineField({ name: 'body', title: 'Body', type: 'text', rows: 2 }),
              ],
              preview: {
                select: { title: 'title' },
                prepare: ({ title }) => ({ title }),
              },
            },
          ],
          validation: Rule => Rule.length(4).error('Must have exactly 4 differentiators'),
        }),
      ],
    }),

    // ── SECTION 7: CTA ────────────────────────────────────────────────────────
    defineField({
      name: 'cta',
      title: 'CTA — The Mountain Is Waiting',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({ name: 'badge', title: 'Badge Text', type: 'string', initialValue: 'Join The Next Expedition' }),
        defineField({ name: 'headlineLine1', title: 'Headline — Line 1', type: 'string', initialValue: 'The Mountain' }),
        defineField({ name: 'headlineLine2', title: 'Headline — Line 2', type: 'string', initialValue: 'Is Waiting' }),
        defineField({ name: 'headlineLine3', title: 'Headline — Line 3', type: 'string', initialValue: 'For You' }),
        defineField({
          name: 'buttons',
          title: 'CTA Buttons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'text', title: 'Button Text', type: 'string' }),
                defineField({ name: 'url', title: 'Button URL', type: 'string' }),
              ],
              preview: {
                select: { text: 'text', url: 'url' },
                prepare: ({ text, url }) => ({ title: text, subtitle: url }),
              },
            },
          ],
        }),
      ],
    }),

  ],

  preview: {
    prepare: () => ({ title: 'Our Story' }),
  },
})
