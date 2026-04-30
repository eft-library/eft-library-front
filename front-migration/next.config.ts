import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/ammo", destination: "/item/ammo", permanent: true },
      { source: "/arm-band", destination: "/item/arm-band", permanent: true },
      { source: "/armor-vest", destination: "/item/armor-vest", permanent: true },
      { source: "/backpack", destination: "/item/backpack", permanent: true },
      { source: "/container", destination: "/item/container", permanent: true },
      { source: "/face-cover", destination: "/item/face-cover", permanent: true },
      { source: "/glasses", destination: "/item/glasses", permanent: true },
      { source: "/head-wear", destination: "/item/headwear", permanent: true },
      { source: "/headwear", destination: "/item/headwear", permanent: true },
      { source: "/headset", destination: "/item/headset", permanent: true },
      { source: "/key", destination: "/item/key", permanent: true },
      { source: "/loot", destination: "/item/loot", permanent: true },
      { source: "/medical", destination: "/item/medical", permanent: true },
      { source: "/provisions", destination: "/item/provisions", permanent: true },
      { source: "/rig", destination: "/item/rig", permanent: true },
      { source: "/weapon", destination: "/item/weapon", permanent: true },
    ];
  },
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
