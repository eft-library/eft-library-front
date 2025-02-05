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
  GET_ALL_COLUMN: baseUrl + "/api/table_column/all",
  GET_ALL_CONTAINER: baseUrl + "/api/item/container",
  GET_ALL_FACE_COVER: baseUrl + "/api/item/face_cover",
  GET_ALL_GLASSES: baseUrl + "/api/item/glasses",
  GET_ALL_HEADSET: baseUrl + "/api/item/headset",
  GET_ALL_HEAD_WEAR: baseUrl + "/api/item/headwear",
  GET_ALL_HIDEOUT: baseUrl + "/api/hideout/all",
  GET_ALL_ITEM: baseUrl + "/api/item/all",
  GET_ALL_LOOT: baseUrl + "/api/item/loot",
  GET_ALL_MEDICAL: baseUrl + "/api/item/medical",
  GET_ALL_PROVISIONS: baseUrl + "/api/item/provisions",
  GET_ALL_SITEMAP: baseUrl + "/api/search/new_sitemap",
  GET_ALL_QUEST: baseUrl + "/api/quest/all",
  GET_ALL_WEAPON: baseUrl + "/api/item/weapon",
  GET_BOSS: baseUrl + "/api/boss/info",
  GET_BOARD_BY_TYPE: baseUrl + "/api/board",
  GET_BOARD_TYPE: baseUrl + "/api/board/all/categories",
  GET_COMMENTS_BY_BOARD_ID: baseUrl + "/api/comment/all",
  GET_COLUMN: baseUrl + "/api/table_column/info",
  GET_EVENT: baseUrl + "/api/event/board",
  GET_EVENT_BY_ID: baseUrl + "/api/event/detail",
  GET_ITEM_FILTER: baseUrl + "/api/item_filter/all",
  GET_ISSUE_COMMENT_BY_ID: baseUrl + "/api/comment/issue_comment",
  GET_ISSUE_COMMENT_PAGE: baseUrl + "/api/comment/issue_comment_page",
  GET_MAP: baseUrl + "/api/map/info",
  GET_MAP_OF_TARKOV: baseUrl + "/api/map_of_tarkov/detail",
  GET_ALL_MAP_OF_TARKOV: baseUrl + "/api/map_of_tarkov/all",
  GET_MENU_INFO: baseUrl + "/api/menu/info",
  GET_NAVI_MENU: baseUrl + "/api/menu/navi",
  GET_NPC: baseUrl + "/api/quest/npc",
  GET_NEWS: baseUrl + "/api/news/news",
  GET_NOTICE: baseUrl + "/api/notice/board",
  GET_NOTICE_BY_ID: baseUrl + "/api/notice/detail",
  GET_PATCH_NOTES: baseUrl + "/api/patch_notes/board",
  GET_PATCH_NOTES_BY_ID: baseUrl + "/api/patch_notes/detail",
  GET_POPUP: baseUrl + "/api/news/popup",
  GET_QUEST: baseUrl + "/api/quest/detail",
  GET_SEARCH: baseUrl + "/api/search/info",
  GET_SUB_FILTER: baseUrl + "/api/item_filter/sub_info",
  GET_SUB_MAP: baseUrl + "/api/map/sub",
  GET_WEAPON: baseUrl + "/api/weapon/info",
  UPLOAD_BOARD_IMAGE: baseUrl + "/api/board/upload_image",
  GET_USER_POST_DETAIL: baseUrl + "/api/user/post_detail",
  GET_USER_COMMENT_DETAIL: baseUrl + "/api/user/comment_detail",
  GET_QUEST_LOADMAP: baseUrl + "/api/roadmap/get_quest",
  GET_PRICE: baseUrl + "/api/price/search",
};

export const USER_API_ENDPOINTS = {
  ADD_USER: baseUrl + "/api/user/add",
  CHANGE_USER_NICKNAME: baseUrl + "/api/user/nickname/change",
  DELETE_USER: baseUrl + "/api/user/delete",
  CHANGE_USER_ICON: baseUrl + "/api/user/icon/change",
  GET_USER_INFO: baseUrl + "/api/user/get",
  GET_USER_QUEST: baseUrl + "/api/user/quest",
  DELETE_USER_QUEST: baseUrl + "/api/user/quest/delete",
  UPDATE_ROADMAP: baseUrl + "/api/roadmap/save_roadmap",
  UPDATE_USER_QUEST: baseUrl + "/api/user/quest/update",
  ADD_POST: baseUrl + "/api/board/add",
  UPDATE_POST: baseUrl + "/api/board/update",
  UPDATE_COMMENT: baseUrl + "/api/comment/update",
  ADD_COMMENT: baseUrl + "/api/comment/add",
  DELETE_COMMENT: baseUrl + "/api/comment/delete",
  LIKE_OR_DIS_COMMENT: baseUrl + "/api/comment/like_or_dis",
  CHANGE_LIKE: baseUrl + "/api/board/like",
  IS_LIKE_POST: baseUrl + "/api/board/user/like",
  GET_USER_POST: baseUrl + "/api/board/user/write",
  REPORT_POST: baseUrl + "/api/board/report",
  DELETE_POST: baseUrl + "/api/board/delete",
  REPORT_COMMENT: baseUrl + "/api/comment/report",
  BAN_USER: baseUrl + "/api/user/ban",
  ADD_BOARD_VIEW_COUNT: baseUrl + "/api/board/view",
};
