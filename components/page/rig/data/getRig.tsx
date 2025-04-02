"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import RigClient from "./rigClient";

interface GetRig {
  isClass: boolean;
}

export default async function GetRig({ isClass = true }: GetRig) {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/rig");

  if (!data || data.status !== 200) {
    console.error("Failed to fetch rig data:", data?.msg || "Unknown error");
    return null;
  }

  return <RigClient isClass={isClass} rig_data={data.data} />;
}
