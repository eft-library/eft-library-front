"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import HeaderClient from "./headerClient";

export default async function Header() {
  const data = await requestData(API_ENDPOINTS.GET_NAVI_MENU);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch header data:", data?.msg || "Unknown error");
    return null;
  }

  return <HeaderClient headerData={data.data} />;
}
