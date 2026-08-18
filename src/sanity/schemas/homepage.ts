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
    { name: 'whyUs',           title: '⛰️  Why Us'            },
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
        defineField({ name: 'pullQuote', title: 'Pull Quote', type: 'string', description: 'Shown as a large standalone statement — do not repeat this line in the Opening copy.', initialValue: 'The mountains are the medium, not the destination. What you carry back with you is the real reason you came.' }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          description: 'A real human Himalayan moment (people on trail, guides, rest stops) — not a landscape hero shot. Optional: shown below the headline in the left column when set.',
        }),
        defineField({ name: 'principlesHeading', title: 'Principles Heading', type: 'string', description: 'Subheading introducing the 3 numbered principles below.', initialValue: 'So, How Do We Help You Find Yours?' }),
        defineField({
          name: 'principles',
          title: 'Principles',
          type: 'array',
          description: 'Exactly 3 numbered principles (01, 02, 03), each with an inline text link at the end of its description.',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string', description: 'e.g. Start With Our Signature Treks' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                defineField({ name: 'ctaLabel', title: 'Inline Link Text', type: 'string', description: 'Lowercase, no arrow — e.g. "see the treks". The arrow is added automatically.' }),
                defineField({
                  name: 'ctaTarget',
                  title: 'Inline Link Destination',
                  type: 'string',
                  options: { list: [{ title: 'Scroll to Signature Treks', value: 'treks' }, { title: 'WhatsApp', value: 'whatsapp' }], layout: 'radio' },
                  initialValue: 'whatsapp',
                }),
              ],
              preview: {
                select: { title: 'title', subtitle: 'ctaLabel' },
                prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? `→ ${subtitle}` : undefined }),
              },
            },
          ],
          validation: Rule => Rule.length(3).error('Must have exactly 3 principles'),
          initialValue: [
            {
              title: 'Start With Our Signature Treks',
              description: 'Journeys we know deeply and return to season after season, with fixed departures you can join.',
              ctaLabel: 'see the treks',
              ctaTarget: 'treks',
            },
            {
              title: 'Or Make The Journey Your Own',
              description: 'Your dates, your group, your pace. We can shape a Himalayan journey around what you’re looking for.',
              ctaLabel: 'tell us what you have in mind',
              ctaTarget: 'whatsapp',
            },
            {
              title: 'And If You’re Not Sure, Ask Us',
              description: 'Tell us about your experience, fitness, time and what is drawing you to the mountains. We’ll help you think through what might suit you — even if the right answer is a trek we don’t operate.',
              ctaLabel: 'start the conversation',
              ctaTarget: 'whatsapp',
            },
          ],
        }),
        defineField({ name: 'closingStatement', title: 'Closing Statement', type: 'string', description: 'Given visual emphasis at the end of the narrative, just above the two pathway buttons.', initialValue: 'We’d rather help you find the right journey than sell you the wrong one.' }),
        defineField({ name: 'primaryCtaText', title: 'Primary Button Text', type: 'string', description: 'Scrolls down to the Signature Treks listing on this page.', initialValue: 'Browse Signature Treks' }),
        defineField({ name: 'whatsappCtaText', title: 'WhatsApp Button Text', type: 'string', initialValue: 'Ask a Trek Lead' }),
      ],
    }),

    // ── WHY US ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'whyUs',
      title: 'Why Us Section',
      type: 'object',
      group: 'whyUs',
      description: 'Companion section to Why We Trek, shown after the trek listing. Shows how Yeti\'s philosophy shows up in practice — avoid generic claims like "best service" or "industry-leading".',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Why Us' }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'text',
          rows: 3,
          description: 'One line per row. The last line is shown de-emphasized (light grey).',
          initialValue: 'The Difference\nIs In How\nWe Do Things.',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
          description: 'A real Yeti photo of guides and trekkers together — people, interaction, movement. Avoid a pure landscape shot.',
        }),
        defineField({
          name: 'openingCopy',
          title: 'Opening Copy',
          type: 'text',
          rows: 6,
          description: 'Paragraphs separated by a blank line. Rendered above the principles heading.',
          initialValue:
            'Anyone can plan a route, book a tea house and get you to the trailhead. For us, that’s only the beginning.\n\nThe quality of a Himalayan journey is shaped by hundreds of small decisions — most of which you should never have to think about.\n\nThat’s where we believe Yeti should make a difference.',
        }),
        defineField({ name: 'principlesHeading', title: 'Principles Heading', type: 'string', description: 'Subheading introducing the 4 numbered principles below.', initialValue: 'How That Shows Up On The Trail' }),
        defineField({
          name: 'principles',
          title: 'Principles',
          type: 'array',
          description: 'Exactly 4 numbered principles (01–04), demonstrating how the philosophy shows up in practice.',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Title', type: 'string', description: 'e.g. Personal Attention, By Design' }),
                defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                defineField({ name: 'label', title: 'Supporting Label', type: 'string', description: 'Optional small stat line under the description — e.g. "1:4 Guide Ratio · Max 12 Trekkers". Leave blank if not needed.' }),
              ],
              preview: {
                select: { title: 'title', subtitle: 'label' },
                prepare: ({ title, subtitle }) => ({ title, subtitle }),
              },
            },
          ],
          validation: Rule => Rule.length(4).error('Must have exactly 4 principles'),
          initialValue: [
            {
              title: 'Personal Attention, By Design',
              description: 'We keep our groups small and maintain a 1:4 guide ratio so our team has the time to know how each trekker is actually doing — not just lead the group from the front.',
              label: '1:4 Guide Ratio · Max 12 Trekkers',
            },
            {
              title: 'Prepared, Not Just Experienced',
              description: 'Experience matters. So does knowing what to do with it. Our lead guides are trained in wilderness medicine, and our journeys are designed around thoughtful acclimatization and on-trail monitoring.',
              label: 'WFR · Oximetry · Acclimatization',
            },
            {
              title: 'The Details Are Our Job',
              description: 'Permits, stays, transfers, route logistics, coordination and the inevitable changes that come with the mountains — we handle the moving parts so they don’t become your journey.',
              label: '',
            },
            {
              title: 'People Before Itineraries',
              description: 'We don’t start with what we want to sell. We start with what might be right for you — even when that means suggesting a different journey.',
              label: '',
            },
          ],
        }),
        defineField({ name: 'closingStatement', title: 'Closing Statement', type: 'string', description: 'Given prominent, quote-like visual emphasis at the end of the narrative.', initialValue: 'A well-run trek shouldn’t make you notice the logistics. It should give you the freedom to notice everything else.' }),
        defineField({ name: 'ctaText', title: 'Link Text', type: 'string', description: 'A single subtle text link — not a button. Links to /our-story.', initialValue: 'Our Story' }),
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
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'Small label shown above the headline. e.g. "From The Founder"', initialValue: 'From The Founder' }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'text',
          rows: 3,
          description: 'One line per row. The last line is shown de-emphasized (light). Shown next to the author photo, above the quote.',
          initialValue: 'From The Army\nTo The\nHimalayas.',
        }),
        defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3, initialValue: 'There isn’t one right way to do a trek. My job — and Yeti’s — is to help you find the one that’s actually right for you.' }),
        defineField({ name: 'author', title: 'Author Name', type: 'string', initialValue: 'Pradhuman Singh Negi' }),
        defineField({ name: 'authorTitle', title: 'Author Title', type: 'string', initialValue: 'Co-Founder, Yeti Expeditions' }),
        defineField({
          name: 'timeline',
          title: 'Career Timeline',
          type: 'array',
          description: 'Exactly 3 phases (e.g. Army, Post-Army, Current) shown as a connected timeline below the author title.',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'phase', title: 'Phase Label', type: 'string', description: 'e.g. Army' }),
                defineField({ name: 'text', title: 'Description', type: 'string', description: 'One short line describing this phase.' }),
                defineField({
                  name: 'tags',
                  title: 'Credential Tags',
                  type: 'array',
                  of: [{ type: 'string' }],
                  description: 'Optional short credential tags shown under this phase — e.g. "HAWS Instructor". Leave empty if this phase has none.',
                }),
              ],
              preview: {
                select: { phase: 'phase', text: 'text' },
                prepare: ({ phase, text }) => ({ title: phase, subtitle: text }),
              },
            },
          ],
          validation: Rule => Rule.length(3).error('Must have exactly 3 timeline phases'),
          initialValue: [
            {
              phase: 'Army',
              tags: ['HAWS Instructor', 'SBS Instructor', 'ABVIMAS Instructor', 'Felicitated by Govt. of India, 2022'],
            },
            { phase: 'Post-Army' },
            { phase: 'Current' },
          ],
        }),
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
