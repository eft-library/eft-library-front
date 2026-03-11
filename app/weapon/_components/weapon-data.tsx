"use server";

import { cacheLife } from "next/cache";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import WeaponView from "./weapon-view";

async function fetchItem() {
  "use cache";
  cacheLife({
    stale: 86400, // 24시간 fresh
    revalidate: 86400, // 24시간 후 재검증
    expire: 172800, // 2일 후 만료
  });

  const res = await fetch(API_ENDPOINTS.GET_ITEM_LIST + "/weapon-new");
  return res.json();
}

export default async function WeaponData() {
  const data = await fetchItem();

  if (!data || data.status !== 200) {
    console.error("Failed to fetch weapon data:", data?.msg || "Unknown error");
    return null;
  }

  return <WeaponView weaponList={data.data} />;
}
