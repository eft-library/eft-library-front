"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import GlassesClient from "./glassesClient";

export default async function GetGlasses() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/glasses");

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch glasses data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <GlassesClient glassesData={data.data} />;
}
