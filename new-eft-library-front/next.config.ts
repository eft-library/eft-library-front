import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "image.eftlibrary.com",
      "assets.tarkov.dev",
      "mirrors.creativecommons.org",
    ],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: false,
};

export default nextConfig;
