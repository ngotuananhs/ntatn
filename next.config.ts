import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove export mode to enable image optimization on Vercel
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    qualities: [75, 85],
  },
};

export default nextConfig;
