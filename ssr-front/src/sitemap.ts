// import { MetadataRoute } from "next";

// export const getPosts = () => {
//   return fetch(`${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/blog/posts`, {
//     next: { revalidate: 60 * 10 }, // 10분 캐시
//   })
//     .then((res) => {
//       if (!res.ok) {
//         return Promise.reject();
//       }
//       return res.json();
//     })
//     .catch(() => {
//       return [];
//     });
// };

// const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
//   const posts: any[] = await getPosts();

//   const questSite = posts.map((post) => ({
//     url: `https://miriya.vercel.app/blog/${post.id}`,
//     lastModified: new Date(),
//   }));

//   return [
//     {
//       url: "https://eftlibrary.com",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 1,
//     },
//     {
//       url: "https://eftlibrary.com/armor-vest",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 1,
//     },
//     {
//       url: "https://eftlibrary.com/backpack",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/boss",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/container",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/face-cover",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/headset",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/head-wear",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/hideout",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/key",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/loot",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/map-of-tarkov",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/medical",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/provisions",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/quest",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/rig",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/weapon",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     {
//       url: "https://eftlibrary.com/quest/detail",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 0.8,
//     },
//     ...questSite,
//   ];
// };

// export default Sitemap;
