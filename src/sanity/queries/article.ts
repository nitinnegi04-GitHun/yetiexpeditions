import { groq } from 'next-sanity'

export const ALL_ARTICLES_QUERY = groq`
  *[_type == "article"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    tags,
    author,
    authorTitle,
    date,
    readTime,
    featured,
    "image": image.asset->url,
  }
`

export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    tags,
    author,
    authorTitle,
    date,
    readTime,
    featured,
    "image": image.asset->url,
    "body": body[] {
      ...,
      _type == "image" => {
        "imageUrl": asset->url,
        caption,
        alt
      }
    }
  }
`

export const ARTICLE_SLUGS_QUERY = groq`
  *[_type == "article"] { "slug": slug.current }
`
