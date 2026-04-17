import LegalPageLayout from "@/components/LegalPageLayout";
import { client } from "@/sanity/client";
import { LEGAL_CONTENT_QUERY } from "@/sanity/queries/siteSettings";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Cookie Policy | Yeti Expeditions",
  description: "Information about the cookies Yeti Expeditions uses and how to manage them.",
  alternates: { canonical: "https://www.yetiexpeditions.com/cookie-policy" },
  robots: { index: true, follow: true },
};

export default async function CookiePolicyPage() {
  const data = await client.fetch(LEGAL_CONTENT_QUERY);

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Cookie Policy"
      content={data?.cookiePolicy ?? null}
      lastUpdated="April 2025"
    />
  );
}
