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
    whyWeTrek {
      eyebrow,
      headline,
      openingCopy,
      pullQuote,
      image,
      principlesHeading,
      principles[] {
        title,
        description,
        ctaLabel,
        ctaTarget
      },
      closingStatement,
      primaryCtaText,
      whatsappCtaText
    },
    whyUs {
      eyebrow,
      headline,
      image,
      openingCopy,
      principlesHeading,
      principles[] {
        title,
        description,
        label
      },
      closingStatement,
      ctaText
    },
    specialProjects {
      visible,
      sectionTagline,
      sectionHeading,
      sectionDescription,
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
      eyebrow,
      headline,
      quote,
      author,
      authorTitle,
      timeline[] {
        phase,
        text,
        tags
      },
      authorPhoto,
      linkText,
      linkUrl
    }
  }
`
