import LegalPageLayout from "@/components/LegalPageLayout";
import { client } from "@/sanity/client";
import { LEGAL_CONTENT_QUERY } from "@/sanity/queries/siteSettings";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Terms of Ascent | Yeti Expeditions",
  description: "Booking conditions, cancellation policy, and participant responsibilities for Yeti Expeditions treks.",
  alternates: { canonical: "https://www.yetiexpeditions.com/terms-of-ascent" },
  robots: { index: true, follow: true },
};

export default async function TermsOfAscentPage() {
  const data = await client.fetch(LEGAL_CONTENT_QUERY);

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms of Ascent"
      content={data?.termsOfAscent ?? null}
      lastUpdated="April 2025"
    />
  );
}
