import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://www.yetiexpeditions.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Yeti Expeditions | Expert-Guided Himalayan Treks — EBC, Annapurna, Ladakh",
    template: "%s | Yeti Expeditions",
  },
  description:
    "Expert-guided treks to Everest Base Camp (14 days, $3,400), Annapurna Circuit (18 days, $3,100) and Markha Valley, Ladakh (12 days, $2,850). WFR-certified guides, max 8 trekkers, 1:4 guide ratio. Small-group Himalayan expeditions with Swiss-standard safety.",
  keywords: [
    "Everest Base Camp trek",
    "Annapurna Circuit trek",
    "Markha Valley trek Ladakh",
    "guided Himalayan treks",
    "Nepal trekking company",
    "small group Himalayan expeditions",
    "EBC trek operator",
    "high altitude trekking Nepal",
    "WFR certified trekking guides",
  ],
  authors: [{ name: "Yeti Expeditions" }],
  creator: "Yeti Expeditions",
  publisher: "Yeti Expeditions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Yeti Expeditions",
    title: "Yeti Expeditions | Expert-Guided Himalayan Treks",
    description:
      "WFR-certified guides. Max 8 trekkers. Everest Base Camp, Annapurna Circuit & Markha Valley Ladakh. From $2,850.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yeti Expeditions — Guided Himalayan Treks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeti Expeditions | Expert-Guided Himalayan Treks",
    description:
      "WFR-certified guides. Max 8 trekkers. Everest Base Camp, Annapurna Circuit & Markha Valley. From $2,850.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "TravelAgency"],
  name: "Yeti Expeditions",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Premium guided trekking operator specialising in Himalayan expeditions. WFR-certified guides, maximum 8 trekkers per group, 1:4 guide-to-trekker ratio.",
  foundingLocation: {
    "@type": "Place",
    name: "Kathmandu, Nepal",
  },
  areaServed: ["Nepal", "India", "Himalayas"],
  knowsAbout: [
    "Himalayan trekking",
    "Everest Base Camp trek",
    "Annapurna Circuit trek",
    "High altitude safety",
    "Wilderness First Response",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@yetiexpeditions.com",
      availableLanguage: ["English"],
    },
  ],
  location: [
    {
      "@type": "Place",
      name: "Kathmandu Office",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Thamel, Kathmandu",
        addressCountry: "NP",
      },
    },
    {
      "@type": "Place",
      name: "Leh Office",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Leh",
        addressRegion: "Ladakh",
        addressCountry: "IN",
      },
    },
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${publicSans.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
