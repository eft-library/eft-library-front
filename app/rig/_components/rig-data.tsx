"use server";

import { cacheLife } from "next/cache";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import RigView from "./rig-view";

async function fetchItem() {
  "use cache";
  cacheLife({
    stale: 86400, // 24시간 fresh
    revalidate: 86400, // 24시간 후 재검증
    expire: 604800, // 7일 후 완전 만료
  });

  const res = await fetch(API_ENDPOINTS.GET_ITEM_LIST + "/rig");
  return res.json();
}

export default async function RigData() {
  const data = await fetchItem();

  if (!data || data.status !== 200) {
    console.error("Failed to fetch rig data:", data?.msg || "Unknown error");
    return null;
  }

  return <RigView rig_data={data.data} />;
}
