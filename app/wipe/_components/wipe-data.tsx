"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import WipeView from "./wipe-view";

export default async function WipeData() {
  const data = await requestData(API_ENDPOINTS.GET_WIPE);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch wipe data:", data?.msg || "Unknown error");
    return null;
  }

  return <WipeView wipeList={data.data} />;
}
