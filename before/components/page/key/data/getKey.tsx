"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import KeyClient from "./keyClient";

export default async function GetKey() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/key");

  if (!data || data.status !== 200) {
    console.error("Failed to fetch key data:", data?.msg || "Unknown error");
    return null;
  }

  return <KeyClient keyList={data.data} />;
}
