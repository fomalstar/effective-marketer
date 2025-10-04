import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    domains: ["effectivemarketer.com"],
  },
  eslint: {
    dirs: ["src"],
  },
};

export default nextConfig;
