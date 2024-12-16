import RSS from "rss";
import API_ENDPOINTS from "@/config/endPoints";

async function getFeedData() {
  const response = await fetch(`${API_ENDPOINTS.GET_ALL_QUEST}`);
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

  const allQuests = await getFeedData();
  if (allQuests) {
    allQuests.map((quest: any) => {
      feed.item({
        title: quest.title_kr,
        description: quest.guide,
        url: `https://eftlibrary.com/quest/detail/${quest.id}`,
        date: quest.update_time,
      });
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
