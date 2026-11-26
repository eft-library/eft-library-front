import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";

import { apiGet } from "@/lib/api/api-client";
import { isRetiredRoute } from "@/lib/config/retired-routes";

interface SitemapApiItem {
  id: number;
  url: string;
  priority: number;
  change_freq: string;
  sitemap_value: string;
  create_time: string;
  update_time: string;
}

const revalidateSeconds = 60 * 60 * 24;

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
  "use cache";
  cacheLife("days");

  return apiGet<SitemapApiItem[]>("/api/search/v3/sitemap", {
    revalidate: revalidateSeconds,
  });
}

export async function generateSitemaps() {
  try {
    const items = await getSitemapItems();
    const sitemapValues = Array.from(
      new Set(items.filter((item) => !isRetiredRoute(item.url)).map((item) => item.sitemap_value).filter(Boolean)),
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
    const modifiersUrl = "https://eftlibrary.com/modifiers";
    const legacyModifiersUrl = "https://eftlibrary.com/kord-breach";
    const hasModifiersUrl = items.some((item) => item.url === modifiersUrl);

    return items
      .filter((item) => {
        if (item.sitemap_value !== resolvedId) {
          return false;
        }

        return !isRetiredRoute(item.url) &&
          !(hasModifiersUrl && item.url === legacyModifiersUrl);
      })
      .map((item) => ({
        url: item.url === legacyModifiersUrl ? modifiersUrl : item.url,
        lastModified: new Date(item.update_time),
        changeFrequency: toChangeFrequency(item.change_freq),
        priority: item.priority,
      }));
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
