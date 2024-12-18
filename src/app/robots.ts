import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/user/",
    },
    sitemap: "https://eftlibrary.com/sitemap.xml",
    host: `Daum-Site-Verification: ${process.env.NEXT_PUBLIC_DAUM_PIN}`,
  };
}
