import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages compatibility
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable trailing slash for Cloudflare
  trailingSlash: false,
};

export default nextConfig;
