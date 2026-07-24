import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy routes → canonical URLs (301 permanent)
      { source: '/Our_story', destination: '/our-story', permanent: true },
      { source: '/about', destination: '/our-story', permanent: true },
      { source: '/trek/:slug', destination: '/treks/:slug', permanent: true },
    ]
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },

  async headers() {
    return [
      // Trek pages — cacheable by Cloudflare, revalidated by webhook
      {
        source: '/treks/:path*',
        headers: [
          // s-maxage: how long Cloudflare caches it
          // stale-while-revalidate: Cloudflare serves stale while fetching fresh
          { key: 'Cache-Control', value: 'public, s-maxage=86400, stale-while-revalidate=3600' },
        ],
      },
      // Homepage
      {
        source: '/',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=86400, stale-while-revalidate=3600' },
        ],
      },
      // Static assets — cache aggressively, Next.js hashes filenames
      // (production only: dev chunk filenames aren't reliably content-hashed,
      // so an immutable cache header here would serve stale JS across restarts)
      ...(process.env.NODE_ENV === 'production'
        ? [
            {
              source: '/_next/static/:path*',
              headers: [
                { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
              ],
            },
          ]
        : []),
      // API routes — never cache
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
      // Sanity Studio — never cache
      {
        source: '/studio/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ]
  },
}

export default nextConfig
