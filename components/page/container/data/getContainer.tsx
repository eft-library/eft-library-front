"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import ContainerClient from "./containerClient";

export default async function GetContainer() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/container");

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch container data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <ContainerClient containerList={data.data} />;
}
