import type { MetadataRoute } from "next";

import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";

interface SitemapApiItem {
  id: number;
  url: string;
  priority: number;
  change_freq: string;
  sitemap_value: string;
  create_time: string;
  update_time: string;
}

const revalidateSeconds = 60 * 60 * 24 * 30;

export const revalidate = 2592000;

function toChangeFrequency(
  value: string,
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  switch (value) {
    case "always":
    case "hourly":
    case "daily":
    case "weekly":
    case "monthly":
    case "yearly":
    case "never":
      return value;
    default:
      return "monthly";
  }
}

async function getSitemapItems() {
  return staticJsonGetWithFallback<SitemapApiItem[]>("search", "/static/search/v3/sitemap.json", {
    apiPath: "/api/search/v3/sitemap",
    revalidate: revalidateSeconds,
  });
}

export async function generateSitemaps() {
  try {
    const items = await getSitemapItems();
    const sitemapValues = Array.from(
      new Set(items.map((item) => item.sitemap_value).filter(Boolean)),
    );

    return sitemapValues.map((value) => ({ id: value }));
  } catch (error) {
    console.error("Error in generateSitemaps:", error);
    return [];
  }
}

export default async function sitemap({
  id,
}: {
  id: string | Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  try {
    const resolvedId = await id;
    const items = await getSitemapItems();

    return items
      .filter((item) => item.sitemap_value === resolvedId)
      .map((item) => ({
        url: item.url,
        lastModified: new Date(item.update_time),
        changeFrequency: toChangeFrequency(item.change_freq),
        priority: item.priority,
      }));
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
