import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xgiayrmzgokjzwwzivzi.supabase.co",
      },
    ],
  },
  cacheComponents: true,
  /* config options here */
};

export default nextConfig;
