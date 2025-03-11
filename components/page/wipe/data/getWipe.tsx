"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import WipeClient from "./wipeClient";

export default async function GetWipe() {
  const data = await requestData(API_ENDPOINTS.GET_WIPE);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch wipe data:", data?.msg || "Unknown error");
    return null;
  }

  return <WipeClient wipeList={data.data} />;
}
