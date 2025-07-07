"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import MainView from "./main-view";

export default async function MainData() {
  const data = await requestData(`${API_ENDPOINTS.GET_HOME}`);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch home data:", data?.msg || "Unknown error");
    return null;
  }

  return <MainView homeData={data.data} />;
}
