import API_ENDPOINTS from "@/config/endPoints";

export default async function sitemap() {
  const getAllPosts = await fetch(API_ENDPOINTS.GET_ALL_SITEMAP);
  const allPosts = await getAllPosts.json();

  const posts = allPosts.data.map((post: string) => {
    return {
      url: post,
      lastModified: new Date(),
    };
  });

  return [
    {
      url: "https://eftlibrary.com",
      lastModified: new Date(),
    },
    ...posts,
  ];
}
