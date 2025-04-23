"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import MedicalClient from "./medicalClient";

export default async function GetMedical() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/medical");

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch medical data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <MedicalClient medical={data.data} />;
}
