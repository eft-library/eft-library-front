"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import BossClient from "./bossClient";

export default async function GetBoss() {
  const data = await requestData(API_ENDPOINTS.GET_ALL_BOSS);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch boss data:", data?.msg || "Unknown error");
    return null;
  }

  return <BossClient bossList={data.data} />;
}
