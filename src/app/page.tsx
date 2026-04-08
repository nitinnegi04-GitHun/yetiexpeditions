import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustMatrix from "@/components/TrustMatrix";
import TrekIndex from "@/components/TrekIndex";
import TrekCalendar from "@/components/TrekCalendar";
import SpecialProjects from "@/components/SpecialProjects";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { HOMEPAGE_QUERY } from "@/sanity/queries/homepage";

export const revalidate = 86400

export default async function Home() {
  const data = await client.fetch(HOMEPAGE_QUERY)

  // Resolve hero image URL if set in Sanity, otherwise leave undefined
  const heroImageUrl = data?.hero?.heroImage
    ? urlFor(data.hero.heroImage).width(1920).quality(85).url()
    : undefined

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero data={data?.hero} heroImageUrl={heroImageUrl} />
      <TrustMatrix data={data?.trustMatrix} />
      <TrekIndex />
      <TrekCalendar />
      <SpecialProjects data={data?.specialProjects} />
      <QuoteSection data={data?.quoteSection} />
      <Footer />
    </main>
  );
}
