const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
  GET_ALL_BOSS: baseUrl + "/api/boss/all",
  GET_ALL_KEY: baseUrl + "/api/item/key",
  GET_ALL_MAP: baseUrl + "/api/map/all",
  GET_ALL_RIG: baseUrl + "/api/item/rig",
  GET_ALL_AMMO: baseUrl + "/api/item/ammo",
  GET_ALL_ARM_BAND: baseUrl + "/api/item/arm_band",
  GET_ALL_ARMOR_VEST: baseUrl + "/api/item/armor_vest",
  GET_ALL_BACKPACK: baseUrl + "/api/item/backpack",
  GET_ALL_CONTAINER: baseUrl + "/api/item/container",
  GET_ALL_FACE_COVER: baseUrl + "/api/item/face_cover",
  GET_ALL_GLASSES: baseUrl + "/api/item/glasses",
  GET_ALL_HEADSET: baseUrl + "/api/item/headset",
  GET_ALL_HEAD_WEAR: baseUrl + "/api/item/headwear",
  GET_ALL_STATION: baseUrl + "/api/hideout/get_station",
  GET_ALL_LOOT: baseUrl + "/api/item/loot",
  GET_ALL_MEDICAL: baseUrl + "/api/item/medical",
  GET_ALL_PROVISIONS: baseUrl + "/api/item/provisions",
  GET_ALL_SITEMAP: baseUrl + "/api/search/new_sitemap",
  GET_ALL_QUEST: baseUrl + "/api/quest/all",
  GET_ALL_WEAPON: baseUrl + "/api/item/weapon",
  GET_BOSS: baseUrl + "/api/boss/info",
  GET_COLUMN: baseUrl + "/api/table_column/info",
  GET_EVENT: baseUrl + "/api/event/board",
  GET_EVENT_BY_ID: baseUrl + "/api/event/detail",
  GET_ITEM_FILTER: baseUrl + "/api/item_filter/all",
  GET_MAP: baseUrl + "/api/map/info",
  GET_MAP_OF_TARKOV: baseUrl + "/api/map_of_tarkov/detail",
  GET_ALL_MAP_OF_TARKOV: baseUrl + "/api/map_of_tarkov/all",
  GET_MENU_INFO: baseUrl + "/api/menu/info",
  GET_NAVI_MENU: baseUrl + "/api/menu/navi",
  GET_ALL_SLIDE: baseUrl + "/api/menu/slide",
  GET_NPC: baseUrl + "/api/quest/npc",
  GET_NEWS: baseUrl + "/api/news/news",
  GET_NOTICE: baseUrl + "/api/notice/board",
  GET_NOTICE_BY_ID: baseUrl + "/api/notice/detail",
  GET_PATCH_NOTES: baseUrl + "/api/patch_notes/board",
  GET_PATCH_NOTES_BY_ID: baseUrl + "/api/patch_notes/detail",
  GET_WIPE: baseUrl + "/api/news/wipe",
  GET_QUEST: baseUrl + "/api/quest/detail",
  GET_SEARCH: baseUrl + "/api/search/info",
  GET_SUB_FILTER: baseUrl + "/api/item_filter/sub_info",
  GET_SUB_MAP: baseUrl + "/api/map/sub",
  GET_QUEST_LOADMAP: baseUrl + "/api/roadmap/get_quest",
  GET_PRICE: baseUrl + "/api/price/search",
  GET_TOP_PRICE: baseUrl + "/api/price/top",
};

export const USER_API_ENDPOINTS = {
  ADD_USER: baseUrl + "/api/user/add",
  DELETE_USER: baseUrl + "/api/user/delete",
  GET_USER_QUEST: baseUrl + "/api/user/quest",
  DELETE_USER_QUEST: baseUrl + "/api/user/quest/delete",
  UPDATE_ROADMAP: baseUrl + "/api/roadmap/save_roadmap",
  UPDATE_STATION: baseUrl + "/api/hideout/save_station",
  UPDATE_USER_QUEST: baseUrl + "/api/user/quest/update",
};
