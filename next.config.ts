import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // use cache 쓰려고
  cacheComponents: true,
  // cache 설정임 2MB가 최대인데 데이터가 많아서 일단 풀어야 할 듯
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

export default withNextIntl(nextConfig);
