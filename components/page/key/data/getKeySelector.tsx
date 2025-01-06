"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import KeySelectorClient from "./keySelectorClient";

export default async function GetKeySelector() {
  const data = await requestData(
    `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.keyType}`
  );

  if (!data || data.status !== 200) {
    console.error("Failed to fetch key data:", data?.msg || "Unknown error");
    return null;
  }

  return <KeySelectorClient keyType={data.data} />;
}
