import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.eftlibrary.com" },
      { protocol: "https", hostname: "assets.tarkov.dev" },
      { protocol: "https", hostname: "mirrors.creativecommons.org" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/(.*)", // 모든 경로에 헤더 적용
        headers: [
          {
            key: "Permissions-Policy",
            value: "run-ad-auction=*", // run-ad-auction 허용
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
