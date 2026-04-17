import { groq } from 'next-sanity'

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage" && _id == "singleton-about"][0] {
    leftPanel { image, expeditionCity, expeditionCountry },
    coFounder { name, role, bio[] { ..., markDefs[] { ..., _type == "highlight" => { color } } }, quoteAttribution, credentials[] { _key, code, label, sub } },
    hero { badge, headlineLine1, headlineLine2, headlineLine3, openingQuote },
    founding { tagline, heading, paragraphs[] { ..., markDefs[] { ..., _type == "highlight" => { color } } } },
    stats[] { _key, value, label },
    philosophy {
      tagline,
      heading,
      principles[] { _key, code, title, body }
    },
    guides {
      tagline,
      heading,
      guidesList[]-> { _id, guideId, name, title, cert, summits, stats, image, instagramHandle, whatsappNumber }
    },
    crew {
      tagline,
      heading,
      description,
      crewList[] { _key, visible, memberId, name, role, domain, note, image }
    },
    whyYeti {
      tagline,
      heading,
      differentiators[] { _key, title, body }
    },
    cta {
      badge,
      headlineLine1,
      headlineLine2,
      headlineLine3,
      buttons[] { _key, text, url }
    },
    "seo": seo {
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url,
      noIndex
    }
  }
`
