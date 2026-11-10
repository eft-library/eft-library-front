import { cacheLife } from "next/cache";

import { apiGet } from "@/lib/api/api-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type {
  HomeMainResponse,
  HomeMenuGroup,
  HomeMenuResponse,
  HomePostItem,
} from "@/types/api/home";

const REMOVED_HOME_ROUTES = new Set(["/minigame"]);

function withModdingMenu(groups: HomeMenuGroup[]): HomeMenuGroup[] {
  if (
    groups.some((group) =>
      group.sub_menus.some((item) => item.url === "/modding"),
    )
  )
    return groups;
  return groups.map((group) =>
    group.id !== "ITEM"
      ? group
      : {
          ...group,
          sub_menus: [
            ...group.sub_menus,
            {
              id: "modding",
              parent_group_id: group.id,
              url: "/modding",
              name_ko: "무기 모딩",
              name_en: "Weapon modding",
              name_ja: "武器カスタマイズ",
            },
          ],
        },
  );
}

function withTraderMenu(groups: HomeMenuGroup[]): HomeMenuGroup[] {
  if (
    groups.some((group) =>
      group.sub_menus.some((item) => item.url === "/traders"),
    )
  )
    return groups;
  return groups.map((group) =>
    group.id !== "ITEM"
      ? group
      : {
          ...group,
          sub_menus: [
            ...group.sub_menus,
            {
              id: "traders",
              parent_group_id: group.id,
              url: "/traders",
              name_ko: "상인",
              name_en: "Traders",
              name_ja: "トレーダー",
            },
          ],
        },
  );
}

function isAvailableHomeRoute(url: string) {
  return !REMOVED_HOME_ROUTES.has(url.split(/[?#]/, 1)[0]);
}

export async function getHomeMain() {
  "use cache";
  cacheLife("hours");

  const response = await apiGet<HomeMainResponse>(apiEndpoints.homeMain, {
    revalidate: 60 * 60,
  });

  return {
    ...response,
    main: response.main.filter((item) => isAvailableHomeRoute(item.url)),
    menu: withModdingMenu(withTraderMenu(response.menu)).map((group) => ({
      ...group,
      sub_menus: group.sub_menus.filter((item) =>
        isAvailableHomeRoute(item.url),
      ),
    })),
  };
}

export async function getHomeMenu() {
  "use cache";
  cacheLife("hours");

  const response = await apiGet<HomeMenuResponse>(apiEndpoints.homeMenu, {
    revalidate: 60 * 60,
  });

  return {
    nav_list: withModdingMenu(withTraderMenu(response.nav_list)).map(
      (group) => ({
        ...group,
        sub_menus: group.sub_menus.filter((item) =>
          isAvailableHomeRoute(item.url),
        ),
      }),
    ),
    autocomplete_items: [
      ...response.autocomplete_items,
      ...(response.autocomplete_items.some((item) => item.url === "/modding")
        ? []
        : [
            {
              url: "/modding",
              autocomplete_text_ko: "무기 모딩",
              autocomplete_text_en: "Weapon modding",
              autocomplete_text_ja: "武器カスタマイズ",
            },
          ]),
      ...(response.autocomplete_items.some((item) => item.url === "/traders")
        ? []
        : [
            {
              url: "/traders",
              autocomplete_text_ko: "상인",
              autocomplete_text_en: "Traders",
              autocomplete_text_ja: "トレーダー",
            },
          ]),
    ].filter((item) => isAvailableHomeRoute(item.url)),
  };
}

export function getHomePosts() {
  return apiGet<HomePostItem[]>("/api/home/v3/home-posts", {
    revalidate: 60,
  });
}
