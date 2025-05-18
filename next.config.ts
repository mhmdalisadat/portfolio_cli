import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["shiki"],
    largePageDataBytes: 128,
  },
};

export default nextConfig;
