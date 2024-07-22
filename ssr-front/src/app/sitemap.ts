import API_ENDPOINTS from "@/config/endPoints";

export default async function sitemap() {
  const getAllPosts = await fetch(API_ENDPOINTS.GET_ALL_SITEMAP);
  const allPosts = await getAllPosts.json();

  const posts = allPosts.data.map((post: string) => {
    return {
      url: post,
      lastModified: new Date().toISOString().split("T")[0],
      priority: 0.7,
      changeFrequency: "daily",
    };
  });

  return [
    {
      url: "https://eftlibrary.com",
      lastModified: new Date().toISOString().split("T")[0],
      priority: 1,
      changeFrequency: "yearly",
    },
    ...posts,
  ];
}
