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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googlesyndication.com https://*.googletagmanager.com https://*.google.com https://*.google-analytics.com https://googleads.g.doubleclick.net https://static.cloudflareinsights.com;",
              "connect-src 'self' https://*.google.com https://*.google-analytics.com https://*.doubleclick.net https://*.googlesyndication.com https://cloudflareinsights.com;",
              "frame-src 'self' https://*.google.com https://*.doubleclick.net https://googleads.g.doubleclick.net;",
              "img-src 'self' data: https: blob:;",
              "style-src 'self' 'unsafe-inline';",
              "font-src 'self' data:;",
            ].join(" "),
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "run-ad-auction=*",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
