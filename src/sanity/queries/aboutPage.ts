import { groq } from 'next-sanity'

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage" && _id == "singleton-about"][0] {
    leftPanel { image, expeditionCity, expeditionCountry },
    coFounder { name, role, bio[] { ..., markDefs[] { ..., _type == "highlight" => { color } } }, quoteAttribution, credentials[] { _key, code, label, sub } },
    hero { badge, headlineLine1, headlineLine2, headlineLine3, openingQuote },
    founding { tagline, heading, paragraphs },
    stats[] { _key, value, label },
    philosophy {
      tagline,
      heading,
      principles[] { _key, code, title, body }
    },
    guides {
      tagline,
      heading,
      guidesList[] { _key, visible, guideId, name, title, cert, summits, stats, image, instagramHandle, whatsappNumber }
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
    }
  }
`
