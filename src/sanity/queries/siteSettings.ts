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
    x
  }
`
