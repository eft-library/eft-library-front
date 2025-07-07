"use server";

import NavBar from "./nav-bar";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

export default async function NavData() {
  const data = await requestData(API_ENDPOINTS.GET_NAVI_MENU);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch header data:", data?.msg || "Unknown error");
    return null;
  }
  return <NavBar navData={data.data} />;
}
