"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import AmmoView from "./ammo-view";

export default async function AmmoData() {
  const data = await requestData(`${API_ENDPOINTS.GET_ITEM_LIST}/ammo`);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch ammo data:", data?.msg || "Unknown error");
    return null;
  }

  return <AmmoView ammoList={data.data} />;
}
