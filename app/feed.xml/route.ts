import RSS from "rss";

import { getSiteUrl } from "@/lib/config/app-env";
import { getQuestFeed } from "@/features/quest/api";

function buildSiteUrl(path = "") {
  return new URL(path, getSiteUrl()).toString();
}

export async function GET() {
  const siteUrl = getSiteUrl();
  const feed = new RSS({
    title: "eftlibrary",
    description: "eftlibrary",
    generator: "RSS for Node and Next.js",
    feed_url: buildSiteUrl("/feed.xml"),
    site_url: siteUrl,
    copyright: `Copyright ${new Date().getFullYear().toString()}`,
    language: "ko-KR",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const quests = await getQuestFeed();

  quests.forEach((quest) => {
    feed.item({
      title: quest.name_ko || quest.name_en || quest.name_ja,
      description: quest.guide_ko || quest.guide_en || quest.guide_ja || "",
      url: buildSiteUrl(`/quest/detail/${quest.normalized_name}`),
      guid: quest.id,
      date: quest.update_time,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
