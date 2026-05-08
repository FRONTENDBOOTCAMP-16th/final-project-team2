import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xgiayrmzgokjzwwzivzi.supabase.co',
      },
    ],
  },
};

export default nextConfig;
