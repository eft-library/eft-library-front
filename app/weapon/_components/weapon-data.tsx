"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import WeaponView from "./weapon-view";

export default async function WeaponData() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/weapon");

  if (!data || data.status !== 200) {
    console.error("Failed to fetch weapon data:", data?.msg || "Unknown error");
    return null;
  }

  return <WeaponView weapon={data.data} />;
}
