/**
 * Shared Portable Text mark renderers.
 * Spread `sharedMarks` into any PortableTextComponents.marks object.
 *
 * Adding a new mark renderer here auto-applies it everywhere this is used.
 */

export const sharedMarks = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  strong: ({ children }: any) => <strong className="font-black text-slate-900">{children}</strong>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  em: ({ children }: any) => <em className="italic">{children}</em>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  textBackground: ({ children }: any) => <span className="article-text-bg">{children}</span>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  underlineDraw: ({ children }: any) => <span className="article-text-underline">{children}</span>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link: ({ children, value }: any) => (
    <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
      {children}
    </a>
  ),
}
