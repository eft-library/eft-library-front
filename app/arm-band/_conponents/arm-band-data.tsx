"use server";

import { API_ENDPOINTS } from "@/lib/config/endpoint";
import ArmBandView from "./arm-band-view";
import { cacheLife } from "next/cache";

async function fetchItem() {
  "use cache";
  cacheLife({
    stale: 86400, // 24시간 fresh
    revalidate: 86400, // 24시간 후 재검증
    expire: 172800, // 2일 후 만료
  });

  const res = await fetch(API_ENDPOINTS.GET_ITEM_LIST + "/arm-band");
  return res.json();
}

export default async function ArmBandData() {
  const data = await fetchItem();

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch arm band data:",
      data?.msg || "Unknown error",
    );
    return null;
  }

  return <ArmBandView armBandList={data.data} />;
}
