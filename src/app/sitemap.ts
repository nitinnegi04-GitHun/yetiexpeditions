import { MetadataRoute } from "next";

const BASE_URL = "https://www.yetiexpeditions.com";

const treks = [
  "everest-base-camp",
  "annapurna-circuit",
  "markha-valley",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const trekUrls = treks.map((slug) => ({
    url: `${BASE_URL}/trek/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...trekUrls,
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
