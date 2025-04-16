"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import NewsClient from "./newsClient";

export default async function News() {
  const data = await requestData(
    `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.news}`
  );

  if (!data || data.status !== 200) {
    console.error("Failed to fetch news data:", data?.msg || "Unknown error");
    return null;
  }

  return <NewsClient news={data.data} />;
}
