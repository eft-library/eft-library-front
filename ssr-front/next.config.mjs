/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "poeynus.synology.me",
      "assets.tarkov.dev",
      "poeynus.synology.meundefined",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
