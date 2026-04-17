import LegalPageLayout from "@/components/LegalPageLayout";
import { client } from "@/sanity/client";
import { LEGAL_CONTENT_QUERY } from "@/sanity/queries/siteSettings";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Privacy Protocol | Yeti Expeditions",
  description: "How Yeti Expeditions collects, uses, and protects your personal data.",
  alternates: { canonical: "https://www.yetiexpeditions.com/privacy-protocol" },
  robots: { index: true, follow: true },
};

export default async function PrivacyProtocolPage() {
  const data = await client.fetch(LEGAL_CONTENT_QUERY);

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Protocol"
      content={data?.privacyPolicy ?? null}
      lastUpdated="April 2025"
    />
  );
}
