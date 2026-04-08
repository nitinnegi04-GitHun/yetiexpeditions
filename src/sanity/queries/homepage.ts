import { groq } from 'next-sanity'

export const HOMEPAGE_QUERY = groq`
  *[_type == "homepage" && _id == "singleton-homepage"][0] {
    hero {
      badge,
      headlineLine1,
      headlineLine2,
      headlineLine3,
      subheading,
      ctaText,
      ctaUrl,
      heroImage,
      imageCaption,
      imageCoordinates,
      heroVideo {
        asset-> {
          url
        }
      }
    },
    trustMatrix[] {
      _key,
      label,
      value,
      description
    },
    specialProjects {
      visible,
      sectionTagline,
      sectionHeading,
      sectionDescription,
      footerNote,
      projects[] {
        _key,
        visible,
        category,
        name,
        tagline,
        description,
        stat,
        statSub,
        image,
        ctaText,
        ctaUrl
      }
    },
    quoteSection {
      quote,
      author,
      authorTitle
    }
  }
`
