"use server";

import { cacheLife } from "next/cache";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import Chat from "./chat";

async function fetchData() {
  "use cache";
  cacheLife({
    stale: 86400, // 24시간 fresh
    revalidate: 86400, // 24시간 후 재검증
    expire: 172800, // 2일 후 만료
  });

  const res = await fetch(API_ENDPOINTS.GET_CHAT_SEARCH);
  return res.json();
}

export default async function ChatData() {
  const data = await fetchData();

  if (!data || data.status !== 200) {
    console.error("Failed to fetch chat data:", data?.msg || "Unknown error");
    return null;
  }
  return <Chat searchList={data.data} />;
}
