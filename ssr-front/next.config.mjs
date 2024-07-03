/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tarkovlibrary.com", "assets.tarkov.dev"],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
