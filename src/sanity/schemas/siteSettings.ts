import { defineType, defineField } from 'sanity'
import { richTextBlock } from './richTextBlock'

// Singleton document — only one instance ever exists
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',

  groups: [
    { name: 'brand',   title: '🎨  Brand & Identity', default: true },
    { name: 'contact', title: '📞  Contact'                         },
    { name: 'social',  title: '🔗  Social Media'                    },
    { name: 'seo',     title: '🔍  SEO'                             },
    { name: 'legal',   title: '⚖️  Legal Pages'                     },
  ],

  fields: [

    // ── BRAND & IDENTITY ──────────────────────────────────────
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      group: 'brand',
      description: 'Upload your primary logo. Used in the Navbar and Footer.',
      options: { hotspot: false },
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      group: 'brand',
      initialValue: 'Yeti Expeditions',
      description: 'Screen reader label for the logo image.',
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'brand',
      initialValue: 'Yeti Expeditions',
    }),
    defineField({
      name: 'siteTagline',
      title: 'Site Tagline',
      type: 'string',
      group: 'brand',
      initialValue: 'High Altitude Logistics',
      description: 'Short descriptor used in metadata and footers.',
    }),

    // ── CONTACT ───────────────────────────────────────────────
    defineField({
      name: 'contactEmail',
      title: 'Primary Email',
      type: 'string',
      group: 'contact',
      description: 'e.g. info@yetiexpeditions.com',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Primary Phone',
      type: 'string',
      group: 'contact',
      description: 'International format. e.g. +977 1 234 5678',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      group: 'contact',
      description: 'Digits only, no + or spaces. e.g. 9779812345678 — used for wa.me links.',
    }),
    defineField({
      name: 'officeAddress',
      title: 'Office Address',
      type: 'text',
      group: 'contact',
      rows: 2,
      description: 'e.g. Thamel, Kathmandu, Nepal',
    }),

    // ── SOCIAL MEDIA ──────────────────────────────────────────
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
      description: 'e.g. https://instagram.com/yetiexpeditions',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'social',
      description: 'e.g. https://linkedin.com/company/yeti-expeditions',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      group: 'social',
      description: 'e.g. https://facebook.com/yetiexpeditions',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
      group: 'social',
      description: 'e.g. https://youtube.com/@yetiexpeditions',
    }),
    defineField({
      name: 'x',
      title: 'X (Twitter) URL',
      type: 'url',
      group: 'social',
      description: 'e.g. https://x.com/yetiexpeditions',
    }),


    // ── SEO ───────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO & Social Sharing',
      type: 'seoFields',
      group: 'seo',
    }),

    // ── LEGAL PAGES ───────────────────────────────────────────
    defineField({ name: 'privacyPolicy',      title: 'Privacy Protocol',    group: 'legal', type: 'array', of: [richTextBlock], description: 'Full content for the /privacy-protocol page.' }),
    defineField({ name: 'termsOfAscent',      title: 'Terms of Ascent',     group: 'legal', type: 'array', of: [richTextBlock], description: 'Full content for the /terms-of-ascent page.' }),
    defineField({ name: 'cookiePolicy',       title: 'Cookie Policy',       group: 'legal', type: 'array', of: [richTextBlock], description: 'Full content for the /cookie-policy page.' }),
    defineField({ name: 'cancellationPolicy', title: 'Cancellation Policy', group: 'legal', type: 'array', of: [richTextBlock], description: 'Full content for the /cancellation-policy page.' }),

  ],

  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
