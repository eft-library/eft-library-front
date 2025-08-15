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

export async function generateSitemaps() {
  const res = await fetch(API_ENDPOINTS.GET_ALL_SITEMAP);
  const data: Data = await res.json();

  // 중복 없는 value 추출
  const uniqueValues = Array.from(new Set(data.data.map((item) => item.value)));

  // 각 value를 id처럼 사용
  return uniqueValues.map((value) => ({ id: value }));
}

export default async function sitemap({
  id,
}: {
  id: string; // 숫자가 아닌 value 문자열
}): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(API_ENDPOINTS.GET_ALL_SITEMAP);
  const data: Data = await res.json();

  // value가 id와 같은 항목만 필터
  const items = data.data.filter((item) => item.value === id);

  // SitemapItem 형식으로 변환
  return items.map((item) => ({
    url: item.link,
    lastModified: item.update_time,
    changefreq: item.change_freq,
    priority: item.priority,
  }));
}
