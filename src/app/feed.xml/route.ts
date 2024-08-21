import RSS from "rss";
import API_ENDPOINTS from "@/config/endPoints";

async function getFeedData() {
  const response = await fetch(
    `${API_ENDPOINTS.GET_BOARD_BY_TYPE}?page=1&page_size=99999999&type=board&issue=false&word=null&search_type=null`
  );
  const res = await response.json();
  return res.data;
}

export async function GET() {
  const feed = new RSS({
    title: "eftlibrary",
    description: "eftlibrary",
    generator: "RSS for Node and Next.js",
    feed_url: "https://www.eftlibrary.kr/feed.xml",
    site_url: "https://www.eftlibrary.com",
    copyright: `Copyright ${new Date().getFullYear().toString()}`,
    language: "ko-KR",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const allPosts = await getFeedData();

  if (allPosts) {
    allPosts.map((post: any) => {
      feed.item({
        title: post.title,
        description: post.contents,
        url: `https://eftlibrary.com/board/${post.type}/${post.id}`,
        date: post.create_time,
      });
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
