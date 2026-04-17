import { groq } from 'next-sanity'

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    logo,
    logoAlt,
    siteName,
    siteTagline,
    contactEmail,
    contactPhone,
    whatsappNumber,
    officeAddress,
    instagram,
    linkedin,
    facebook,
    youtube,
    x,
    "seo": seo {
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url,
      noIndex
    }
  }
`

export const LEGAL_CONTENT_QUERY = groq`
  *[_type == "siteSettings"][0] {
    privacyPolicy,
    termsOfAscent,
    cookiePolicy
  }
`
