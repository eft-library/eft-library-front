"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import BossSelectorClient from "./bossSelectorClient";

export default async function GetBossSelector() {
  const data = await requestData(
    `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.bossType}`
  );

  if (!data || data.status !== 200) {
    console.error("Failed to fetch boss data:", data?.msg || "Unknown error");
    return null;
  }

  return <BossSelectorClient bossType={data.data} />;
}
