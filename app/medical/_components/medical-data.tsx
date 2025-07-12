"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import MedicalView from "./medical-view";

export default async function MedicalData() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/medical");

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch medical data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <MedicalView medical={data.data} />;
}
