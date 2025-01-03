"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import WeaponClient from "./weaponClient";

export default async function GetWeapon() {
  const data = await requestData(API_ENDPOINTS.GET_ALL_WEAPON);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch weapon data:", data?.msg || "Unknown error");
    return null;
  }

  return <WeaponClient weapon={data.data} />;
}
