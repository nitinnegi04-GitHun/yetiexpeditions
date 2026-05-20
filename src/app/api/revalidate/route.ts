import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const CF_API = 'https://api.cloudflare.com/client/v4'

async function purgeCloudflare(urls: string[]) {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID
  const token = process.env.CLOUDFLARE_API_TOKEN

  if (!zoneId || !token) return // skip if not configured

  await fetch(`${CF_API}/zones/${zoneId}/purge_cache`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ files: urls }),
  })
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await req.json()
  // Sanity sends the document at the top level; some webhook configs wrap it under `result`
  const doc = body?.result ?? body
  const slug = doc?.slug?.current
  const type = doc?._type
  const BASE_URL = 'https://www.yetiexpeditions.com'

  // Always revalidate homepage and listing pages
  const pathsToRevalidate = ['/', '/treks', '/journal', '/our-story']

  if (slug) {
    if (type === 'article') {
      pathsToRevalidate.push(`/journal/${slug}`)
    } else if (type === 'trek') {
      pathsToRevalidate.push(`/treks/${slug}`)
    } else {
      pathsToRevalidate.push(`/treks/${slug}`, `/journal/${slug}`)
    }
  }

  // 1. Revalidate Next.js ISR cache
  for (const path of pathsToRevalidate) {
    revalidatePath(path)
  }

  // 2. Purge Cloudflare edge cache for the same URLs
  const urlsToPurge = pathsToRevalidate.map(p => `${BASE_URL}${p}`)
  await purgeCloudflare(urlsToPurge)

  return NextResponse.json({ revalidated: true, type, slug, purged: urlsToPurge })
}
