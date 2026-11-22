import { cacheLife } from "next/cache";

import { apiGet } from "@/lib/api/api-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import { isRetiredRoute } from "@/lib/config/retired-routes";
import type {
  HomeMainResponse,
  LocalizedName,
  HomeMenuGroup,
  HomeMenuResponse,
  HomePostItem,
} from "@/types/api/home";

const modifiersMenu = {
  url: "/modifiers",
  name_ko: "모디파이어",
  name_en: "Modifiers",
  name_ja: "モディファイア",
};

function renameModifiersLink<T extends LocalizedName & { url: string }>(item: T): T {
  return item.url === "/kord-breach" ? { ...item, ...modifiersMenu } : item;
}

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
              name_ko: "총기 모딩",
              name_en: "Weapon Modding",
              name_ja: "武器カスタム",
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
  return !isRetiredRoute(url);
}

export async function getHomeMain() {
  "use cache";
  cacheLife("hours");

  const response = await apiGet<HomeMainResponse>(apiEndpoints.homeMain, {
    revalidate: 60 * 60,
  });

  return {
    ...response,
    main: response.main.filter((item) => isAvailableHomeRoute(item.url)).map(renameModifiersLink),
    menu: withModdingMenu(withTraderMenu(response.menu)).map((group) => ({
      ...group,
      sub_menus: group.sub_menus.filter((item) =>
        isAvailableHomeRoute(item.url),
      ).map(renameModifiersLink),
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
        ).map(renameModifiersLink),
      }),
    ),
    autocomplete_items: [
      ...response.autocomplete_items.filter((item) => item.url !== "/kord-breach"),
      ...(response.autocomplete_items.some((item) => item.url === modifiersMenu.url)
        ? []
        : [{
            url: modifiersMenu.url,
            autocomplete_text_ko: modifiersMenu.name_ko,
            autocomplete_text_en: modifiersMenu.name_en,
            autocomplete_text_ja: modifiersMenu.name_ja,
          }]),
      ...(response.autocomplete_items.some((item) => item.url === "/modding")
        ? []
        : [
            {
              url: "/modding",
              autocomplete_text_ko: "총기 모딩",
              autocomplete_text_en: "Weapon Modding",
              autocomplete_text_ja: "武器カスタム",
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
