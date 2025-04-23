"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import RigClient from "./rigClient";

export default async function GetRig() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/rig");

  if (!data || data.status !== 200) {
    console.error("Failed to fetch rig data:", data?.msg || "Unknown error");
    return null;
  }

  return <RigClient rig_data={data.data} />;
}
