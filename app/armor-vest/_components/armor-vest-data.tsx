"use server";

import { cacheLife } from "next/cache";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import ArmorVestView from "./armor-vest-view";

async function fetchItem() {
  "use cache";
  cacheLife({
    stale: 86400, // 24시간 fresh
    revalidate: 86400, // 24시간 후 재검증
    expire: 604800, // 7일 후 완전 만료
  });

  const res = await fetch(API_ENDPOINTS.GET_ITEM_LIST + "/armor-vest");
  return res.json();
}

export default async function ArmorVestData() {
  const data = await fetchItem();

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch armor vest data:",
      data?.msg || "Unknown error",
    );
    return null;
  }

  return <ArmorVestView armorVestList={data.data} />;
}
