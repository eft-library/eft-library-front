"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import NewsView from "./NewsView";

export default async function NewsData() {
  const data = await requestData(
    `${API_ENDPOINTS.GET_DYNAMIC_INFO}/${COLUMN_KEY.news}`
  );

  if (!data || data.status !== 200) {
    console.error("Failed to fetch news data:", data?.msg || "Unknown error");
    return null;
  }

  return <NewsView news={data.data} />;
}
