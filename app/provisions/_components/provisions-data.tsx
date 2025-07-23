"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import ProvisionsView from "./provisions-view";

export default async function ProvisionsData() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/provisions");

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch provisions data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <ProvisionsView provisionsList={data.data} />;
}
