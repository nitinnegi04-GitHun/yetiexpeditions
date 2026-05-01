import LegalPageLayout from "@/components/LegalPageLayout";
import { client } from "@/sanity/client";
import { LEGAL_CONTENT_QUERY } from "@/sanity/queries/siteSettings";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Cancellation Policy | Yeti Expeditions",
  description: "Yeti Expeditions cancellation, refund, and rescheduling policy for all trek bookings.",
  alternates: { canonical: "https://www.yetiexpeditions.com/cancellation-policy" },
  robots: { index: true, follow: true },
};

export default async function CancellationPolicyPage() {
  const data = await client.fetch(LEGAL_CONTENT_QUERY);

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Cancellation Policy"
      content={data?.cancellationPolicy ?? null}
      lastUpdated="April 2025"
    />
  );
}
