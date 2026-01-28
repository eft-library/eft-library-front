import { MetadataRoute } from "next";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

interface Data {
  data: SitemapItemAPI[];
}

interface SitemapItemAPI {
  id: number;
  link: string;
  update_time: string;
  change_freq: string;
  priority: number;
  value: string;
  create_date: string;
}

// 1달 = 30일 = 2,592,000초
export const revalidate = 2592000;

export async function generateSitemaps() {
  try {
    const res = await fetch(API_ENDPOINTS.GET_ALL_SITEMAP, {
      next: { revalidate: 2592000 },
    });

    if (!res.ok) {
      console.error("Failed to fetch sitemap data");
      return [];
    }

    const data: Data = await res.json();
    const uniqueValues = Array.from(
      new Set(data.data.map((item) => item.value)),
    );

    return uniqueValues.map((value) => ({ id: value }));
  } catch (error) {
    console.error("Error in generateSitemaps:", error);
    return [];
  }
}

// id를 Promise로 받아서 await 처리
export default async function sitemap({
  id,
}: {
  id: Promise<string>; // Promise 타입으로 변경
}): Promise<MetadataRoute.Sitemap> {
  try {
    // id를 await으로 풀기
    const resolvedId = await id;

    const res = await fetch(API_ENDPOINTS.GET_ALL_SITEMAP, {
      next: { revalidate: 2592000 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch sitemap data");
    }

    const data: Data = await res.json();

    const items = data.data.filter((item) => item.value === resolvedId);

    return items.map((item) => ({
      url: item.link,
      lastModified: new Date(item.update_time),
      changeFrequency: item.change_freq as
        | "always"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "yearly"
        | "never",
      priority: item.priority,
    }));
  } catch (error) {
    console.error(`Error generating sitemap:`, error);
    return [];
  }
}
