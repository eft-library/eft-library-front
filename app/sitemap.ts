import { API_ENDPOINTS } from "@/lib/config/endpoint";

interface Sitemap {
  id: number;
  update_time: string;
  create_date: string;
  link: string;
  change_freq: string;
  priority: number;
}

function formatLastMod(dateStr: string): string {
  // 마이크로초(.)가 포함되어 있으면 자르고, 없으면 그대로 반환
  const dotIndex = dateStr.indexOf(".");
  if (dotIndex === -1) return dateStr;
  // 초 뒤부터 시간대까지 남기기 (ex: "2025-06-14T07:13:14+09:00")
  // 마이크로초 이후로는 버림
  // +09:00 같은 timezone까지 포함하도록 추출
  const prefix = dateStr.substring(0, dotIndex);
  const timezone = dateStr.substring(dateStr.indexOf("+"));
  return prefix + timezone;
}

export default async function sitemap() {
  const getAllPosts = await fetch(API_ENDPOINTS.GET_ALL_SITEMAP);
  const allPosts = await getAllPosts.json();

  const posts = allPosts.data.map((post: Sitemap) => {
    return {
      url: post.link,
      lastModified: formatLastMod(post.update_time),
      changeFrequency: post.change_freq,
      priority: post.priority,
    };
  });

  return [...posts];
}
