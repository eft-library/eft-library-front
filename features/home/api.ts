import { apiGet } from "@/lib/api/api-client";
import { staticJsonGet } from "@/lib/api/static-json-client";
import type { HomeMainResponse, HomeMenuResponse, HomePostItem } from "@/types/api/home";

export function getHomeMain() {
  return staticJsonGet<HomeMainResponse>("home", "/static/home/v3/main.json", {
    revalidate: 60 * 60 * 24,
  });
}

export function getHomeMenu() {
  return staticJsonGet<HomeMenuResponse>("home", "/static/home/v3/menu-with-autocomplete.json", {
    revalidate: 60 * 60 * 24,
  });
}

export function getHomePosts() {
  return apiGet<HomePostItem[]>("/api/home/v3/home-posts", {
    revalidate: 60,
  });
}
