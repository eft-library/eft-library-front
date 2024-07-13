import { getServerSideSitemapIndex } from "next-sitemap";

export async function GET() {
  // url 목록 불러오기
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/search/sitemap"
  );
  const data = await response.json();
  const urls: string[] = data.data; // 응답 데이터를 JSON으로 파싱하여 string[] 타입으로 변환

  return getServerSideSitemapIndex(urls);
}
