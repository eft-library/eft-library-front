const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
  GET_HOME: baseUrl + "/api/home/home",
  GET_ITEM_LIST: baseUrl + "/api/item/list",
  GET_MAP_OF_TARKOV: baseUrl + "/api/map_of_tarkov/detail",
  GET_ALL_KEY: baseUrl + "/api/item/key",
  GET_ALL_STATION: baseUrl + "/api/hideout/get_station",
  GET_ALL_SITEMAP: baseUrl + "/api/search/new_sitemap",
  GET_ALL_QUEST: baseUrl + "/api/quest/all",
  GET_QUEST_BY_NPC: baseUrl + "/api/quest/list-with-trader",
  GET_ALL_DETAIL_QUEST: baseUrl + "/api/quest/feed",
  GET_BOSS: baseUrl + "/api/boss/info",
  GET_DYNAMIC_INFO: baseUrl + "/api/dynamic_info/info",
  GET_EVENT: baseUrl + "/api/event/board",
  GET_EVENT_BY_ID: baseUrl + "/api/event/detail",
  GET_ITEM_FILTER: baseUrl + "/api/item_filter/all",
  GET_ITEM_DETAIL: baseUrl + "/api/item/detail",
  GET_MAP: baseUrl + "/api/map/info",
  GET_MENU_INFO: baseUrl + "/api/menu/info",
  GET_NAVI_MENU: baseUrl + "/api/menu/navi",
  GET_NAVI_WITH_SEARCH: baseUrl + "/api/menu/menu-wtih-search",
  GET_ALL_SLIDE: baseUrl + "/api/menu/slide",
  GET_NPC: baseUrl + "/api/quest/npc",
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
  GET_MAP_OF_TARKOV_SELECTOR: baseUrl + "/api/map_of_tarkov/selector",
  GET_MAP_OF_TARKOV_MAP: baseUrl + "/api/map_of_tarkov/info",
  GET_MAP_OF_TARKOV_EXTRACTIONS: baseUrl + "/api/map_of_tarkov/extraction",
  GET_MAP_OF_TARKOV_TRANSITS: baseUrl + "/api/map_of_tarkov/transits",
  GET_MAP_OF_TARKOV_BOSS: baseUrl + "/api/map_of_tarkov/boss",
  GET_MAP_OF_TARKOV_FIND_INFO: baseUrl + "/api/map_of_tarkov/find",
  GET_DASHBOARD_ANALYSIS: baseUrl + "/api/dashboard/analysis",
};

export const USER_API_ENDPOINTS = {
  ADD_USER: baseUrl + "/api/user/add",
  DELETE_USER: baseUrl + "/api/user/delete",
  GET_USER_QUEST: baseUrl + "/api/planner/quest",
  DELETE_USER_QUEST: baseUrl + "/api/planner/quest/delete",
  UPDATE_ROADMAP: baseUrl + "/api/roadmap/save_roadmap",
  UPDATE_STATION: baseUrl + "/api/hideout/save_station",
  UPDATE_USER_QUEST: baseUrl + "/api/planner/quest/update",
};
