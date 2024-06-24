const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const API_ENDPOINTS = {
  GET_YOUTUBE: baseUrl + "/api/news/youtube",
  GET_NAVI_MENU: baseUrl + "/api/menu/navi",
  GET_MENU_INFO: baseUrl + "/api/menu/info",
  GET_ALL_MAP: baseUrl + "/api/map/all",
  GET_MAP: baseUrl + "/api/map/info",
  GET_SUB_MAP: baseUrl + "/api/map/sub",
  GET_NPC: baseUrl + "/api/quest/npc",
  GET_ALL_QUEST: baseUrl + "/api/quest/all",
  GET_QUEST: baseUrl + "/api/quest/detail",
  GET_ALL_WEAPON: baseUrl + "/api/weapon/all",
  GET_ALL_BOSS: baseUrl + "/api/boss/all",
  GET_MAP_OF_TARKOV: baseUrl + "/api/map_of_tarkov/detail",
  GET_SEARCH: baseUrl + "/api/search/info",
  GET_ALL_COLUMN: baseUrl + "/api/table_column/all",
  GET_COLUMN: baseUrl + "/api/table_column/info",
  GET_ITEM_FILTER: baseUrl + "/api/item_filter/all",
  GET_ALL_HEADSET: baseUrl + "/api/item/headset",
  GET_ALL_HEAD_WEAR: baseUrl + "/api/item/head_wear",
  GET_ALL_ARMOR_VEST: baseUrl + "/api/item/armor_vest",
  GET_ALL_RIG: baseUrl + "/api/item/rig",
  GET_ALL_BACKPACK: baseUrl + "/api/item/backpack",
  GET_ALL_CONTAINER: baseUrl + "/api/item/container",
  GET_ALL_KEY: baseUrl + "/api/item/key",
  GET_ALL_FOOD_DRINK: baseUrl + "/api/item/food_drink",
  GET_ALL_MEDICAL: baseUrl + "/api/item/medical",
  GET_ALL_AMMO: baseUrl + "/api/item/ammo",
  GET_ALL_LOOT: baseUrl + "/api/item/loot",
};

export default API_ENDPOINTS;
