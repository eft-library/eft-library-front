"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import AmmoClient from "./ammoClient";

export default async function GetAmmo() {
  const data = await requestData(`${API_ENDPOINTS.GET_ITEM_LIST}/ammo`);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch ammo data:", data?.msg || "Unknown error");
    return null;
  }

  return <AmmoClient ammoList={data.data} />;
}
