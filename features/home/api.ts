import { apiGet } from "@/lib/api/api-client";
import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { HomeMainResponse, HomeMenuResponse, HomePostItem } from "@/types/api/home";

export function getHomeMain() {
  return staticJsonGetWithFallback<HomeMainResponse>("home", "/static/home/v3/main.json", {
    apiPath: apiEndpoints.homeMain,
    revalidate: 60 * 60 * 24,
  });
}

export function getHomeMenu() {
  return staticJsonGetWithFallback<HomeMenuResponse>("home", "/static/home/v3/menu-with-autocomplete.json", {
    apiPath: apiEndpoints.homeMenu,
    revalidate: 60 * 60 * 24,
  });
}

export function getHomePosts() {
  return apiGet<HomePostItem[]>("/api/home/v3/home-posts", {
    revalidate: 60,
  });
}
