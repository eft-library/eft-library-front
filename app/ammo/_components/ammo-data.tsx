"use server";

import { API_ENDPOINTS } from "@/lib/config/endpoint";
import AmmoView from "./ammo-view";
import { cacheLife } from "next/cache";

async function fetchItem() {
  "use cache";
  cacheLife({
    stale: 86400,
    revalidate: 86400,
    expire: 604800,
  });

  const res = await fetch(API_ENDPOINTS.GET_ITEM_LIST + "/ammo");
  return res.json();
}

export default async function AmmoData() {
  const data = await fetchItem();

  if (!data || data.status !== 200) {
    console.error("Failed to fetch ammo data:", data?.msg || "Unknown error");
    return null;
  }

  return <AmmoView ammoList={data.data} />;
}
