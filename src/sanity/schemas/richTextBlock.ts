/**
 * Shared Portable Text block definitions.
 * Import richTextBlock (full) or simpleRichTextBlock (no headings/blockquote/link)
 * into any schema field's `of` array.
 *
 * Adding a new decorator here auto-applies it everywhere this is used.
 */

import React from 'react'

const TextBackgroundDecorator = ({ children }: { children: React.ReactNode }) =>
  React.createElement('span', {
    style: {
      background: 'linear-gradient(rgba(255,200,0,0.35), rgba(255,200,0,0.35)) no-repeat left center',
      backgroundSize: '100% 75%',
      paddingBottom: '2px',
    },
  }, children)

const UnderlineDrawDecorator = ({ children }: { children: React.ReactNode }) =>
  React.createElement('span', {
    style: { borderBottom: '2px solid #ff4500', paddingBottom: '1px' },
  }, children)

export const richTextDecorators = [
  { title: 'Bold',             value: 'strong'          },
  { title: 'Italic',           value: 'em'              },
  { title: 'Text Background',  value: 'textBackground', component: TextBackgroundDecorator },
  { title: 'Underline Draw',   value: 'underlineDraw',  component: UnderlineDrawDecorator  },
]

/** Full block — article bodies, legal pages, any long-form content */
export const richTextBlock = {
  type: 'block',
  styles: [
    { title: 'Normal',     value: 'normal'     },
    { title: 'Heading 2',  value: 'h2'         },
    { title: 'Heading 3',  value: 'h3'         },
    { title: 'Pull Quote', value: 'blockquote' },
  ],
  lists: [
    { title: 'Bullet',   value: 'bullet' },
    { title: 'Numbered', value: 'number' },
  ],
  marks: {
    decorators: richTextDecorators,
    annotations: [
      {
        title: 'Link',
        name: 'link',
        type: 'object',
        fields: [{ name: 'href', type: 'url', title: 'URL' }],
      },
    ],
  },
}

/** Simple block — non-negotiables, short rich-text fields */
export const simpleRichTextBlock = {
  type: 'block',
  styles: [
    { title: 'Normal',  value: 'normal' },
    { title: 'Heading', value: 'h3'     },
  ],
  lists: [
    { title: 'Bullet',   value: 'bullet' },
    { title: 'Numbered', value: 'number' },
  ],
  marks: {
    decorators: richTextDecorators,
  },
}
