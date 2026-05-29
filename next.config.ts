import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xgiayrmzgokjzwwzivzi.supabase.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

export default withBundleAnalyzer(nextConfig)
