"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import WeaponSelectorClient from "./weaponSelectorClient";

export default async function GetWeaponSelector() {
  const data = await requestData(
    `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.weaponType}`
  );

  if (!data || data.status !== 200) {
    console.error("Failed to fetch weapon data:", data?.msg || "Unknown error");
    return null;
  }

  return <WeaponSelectorClient weaponType={data.data} />;
}
