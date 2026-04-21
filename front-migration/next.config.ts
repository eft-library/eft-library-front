import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  cacheComponents: true,
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: true,
  },
  cacheHandler:
    require.resolve("next/dist/server/lib/incremental-cache/file-system-cache.js"),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.eftlibrary.com" },
      { protocol: "https", hostname: "assets.tarkov.dev" },
      { protocol: "https", hostname: "mirrors.creativecommons.org" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: false,
};

export default nextConfig;
