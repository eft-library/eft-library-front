import { apiGet } from "@/lib/api/api-client";
import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { HomeMainResponse, HomeMenuResponse, HomePostItem } from "@/types/api/home";

const REMOVED_HOME_ROUTES = new Set(["/minigame"]);

function isAvailableHomeRoute(url: string) {
  return !REMOVED_HOME_ROUTES.has(url.split(/[?#]/, 1)[0]);
}

export async function getHomeMain() {
  const response = await staticJsonGetWithFallback<HomeMainResponse>(
    "home",
    "/static/home/v3/main.json",
    {
      apiPath: apiEndpoints.homeMain,
      revalidate: 60 * 60 * 24,
    },
  );

  return {
    ...response,
    main: response.main.filter((item) => isAvailableHomeRoute(item.url)),
    menu: response.menu.map((group) => ({
      ...group,
      sub_menus: group.sub_menus.filter((item) =>
        isAvailableHomeRoute(item.url)
      ),
    })),
  };
}

export async function getHomeMenu() {
  const response = await staticJsonGetWithFallback<HomeMenuResponse>(
    "home",
    "/static/home/v3/menu-with-autocomplete.json",
    {
      apiPath: apiEndpoints.homeMenu,
      revalidate: 60 * 60 * 24,
    },
  );

  return {
    nav_list: response.nav_list.map((group) => ({
      ...group,
      sub_menus: group.sub_menus.filter((item) =>
        isAvailableHomeRoute(item.url)
      ),
    })),
    autocomplete_items: response.autocomplete_items.filter((item) =>
      isAvailableHomeRoute(item.url)
    ),
  };
}

export function getHomePosts() {
  return apiGet<HomePostItem[]>("/api/home/v3/home-posts", {
    revalidate: 60,
  });
}
