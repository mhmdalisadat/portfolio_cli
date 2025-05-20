import type { NextConfig } from "next";

const nextConfig = {
  transpilePackages: ["shiki"],
  experimental: {
    largePageDataBytes: 128,
  },
  typescript: {
    // Enable TypeScript checking during build
    ignoreBuildErrors: false,
  },
} as NextConfig;

export default nextConfig;
