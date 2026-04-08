import { redirect } from 'next/navigation'

// Old hardcoded route — permanently redirect to the Sanity-powered route
export default async function TrekRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  redirect(`/treks/${slug}`)
}
