import { apiGet } from "@/lib/api/api-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { HomeMainResponse, HomeMenuResponse } from "@/types/api/home";

export function getHomeMain() {
  return apiGet<HomeMainResponse>(apiEndpoints.homeMain, { revalidate: 60 * 10 });
}

export function getHomeMenu() {
  return apiGet<HomeMenuResponse>(apiEndpoints.homeMenu, {
    revalidate: 60 * 30,
  });
}
