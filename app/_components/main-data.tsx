import { cacheLife } from "next/cache";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import MainView from "./main-view";

async function fetchData() {
  "use cache";
  cacheLife({
    stale: 86400, // 24시간 fresh
    revalidate: 86400, // 24시간 후 재검증
    expire: 172800, // 2일 후 만료
  });

  const res = await fetch(API_ENDPOINTS.GET_HOME);
  return res.json();
}

export default async function MainData() {
  const data = await fetchData();

  if (!data || data.status !== 200) {
    console.error("Failed to fetch home data:", data?.msg || "Unknown error");
    return null;
  }

  return <MainView homeData={data.data} />;
}
