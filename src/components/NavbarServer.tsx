import Navbar from './Navbar'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { SITE_SETTINGS_QUERY } from '@/sanity/queries/siteSettings'

export default async function NavbarServer() {
  const s = await client.fetch(SITE_SETTINGS_QUERY) ?? {}

  const logoUrl = s?.logo
    ? urlFor(s.logo).height(64).quality(90).url()
    : undefined

  return (
    <Navbar
      logoUrl={logoUrl}
      logoAlt={s?.logoAlt}
      siteName={s?.siteName}
    />
  )
}
