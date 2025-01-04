"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import ArmorVestClient from "./armorVestClient";

export default async function GetArmorVest() {
  const data = await requestData(API_ENDPOINTS.GET_ALL_ARMOR_VEST);

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch armor vest data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <ArmorVestClient armorVestList={data.data} />;
}
