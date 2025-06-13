import { API_ENDPOINTS } from "@/lib/config/endpoint";

interface Sitemap {
  id: number;
  update_time: string;
  create_date: string;
  link: string;
  change_freq: string;
  priority: number;
}

export default async function sitemap() {
  const getAllPosts = await fetch(API_ENDPOINTS.GET_ALL_SITEMAP);
  const allPosts = await getAllPosts.json();

  const posts = allPosts.data.map((post: Sitemap) => {
    return {
      url: post.link,
      lastModified: post.update_time,
      changefreq: post.change_freq,
      priority: post.priority,
    };
  });

  return [...posts];
}
