import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    qualities: [75, 100],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  experimental: {
    optimizePackageImports: ["motion", "d3-geo"],
  },
  async redirects() {
    return [
      { source: "/knowledge", destination: "/languages", permanent: true },
      { source: "/developers", destination: "/docs", permanent: true },
      { source: "/foundation", destination: "/dictionaries", permanent: true },
      { source: "/dictionaries/login", destination: "/api/login", permanent: true },
      { source: "/docs/api", destination: "/docs/api-reference", permanent: true },
    ];
  },
};

export default nextConfig;
