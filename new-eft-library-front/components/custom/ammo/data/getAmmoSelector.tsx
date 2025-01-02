"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import AmmoSelectorClient from "./ammoSelectorClient";

export default async function GetAmmoSelector() {
  const data = await requestData(
    `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.ammoType}`
  );

  if (!data || data.status !== 200) {
    console.error("Failed to fetch armor data:", data?.msg || "Unknown error");
    return null;
  }

  return <AmmoSelectorClient ammoType={data.data} />;
}
