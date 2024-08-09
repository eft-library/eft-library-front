/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.eftlibrary.com", "assets.tarkov.dev"],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: false,
};

export default nextConfig;
