export const apiEndpoints = {
  homeMain: "/api/home/v3/main",
  homeMenu: "/api/home/v3/menu-with-autocomplete",
  dashboardAnalysis: "/api/dashboard/v3/analysis",
  newsWipe: "/api/news/v3/wipe",
  hideoutStation: "/api/hideout/v3/get-station",
  roadmap: "/api/roadmap/v3/get-roadmap",
  storyRoadmap: "/api/story/v3/roadmap",
  rngItemList: "/api/minigame/v3/rng-item",
  rngItemAllRank: "/api/minigame/v3/rng-item/all-rank",
  rngItemMyRank: "/api/minigame/v3/rng-item/my-rank",
  rngItemSaveScore: "/api/minigame/v3/rng-item/save",
  progressItem: "/api/progress/v3/progress-item",
  userAdd: "/api/user/v3/add",
  userInfo: "/api/user/v3/user-info",
  userCheckNicknameDuplicate: "/api/user/v3/check-nickname-duplicate",
  userUpdateNickname: "/api/user/v3/update-nickname",
  myPageDefault: "/api/user/v3/my-page/default",
  myPageInfo: "/api/user/v3/my-page/info",
} as const;

export function getItemListEndpoint(itemType: string) {
  return `/api/item/v3/list/${itemType}`;
}

export function getStoryDetailEndpoint(storyId: string) {
  return `/api/story/v3/detail/${storyId}`;
}

export function getBossDetailEndpoint(normalizedName: string) {
  return `/api/boss/v3/detail/${normalizedName}`;
}

export function getPriceSearchEndpoint(page: number, pageSize: number, word: string) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
    word,
  });

  return `/api/price/v3/search?${params.toString()}`;
}

export const priceTopEndpoint = "/api/price/v3/top";

export function getMapOfTarkovDetailEndpoint(normalizedName: string) {
  return `/api/map-of-tarkov/v3/detail/${normalizedName}`;
}

export function getMapDetailEndpoint(normalizedName: string) {
  return `/api/map/v3/detail/${normalizedName}`;
}

export function getHideoutDetailEndpoint(normalizedName: string) {
  return `/api/hideout/v3/detail/${normalizedName}`;
}

export function getItemInfoEndpoint(normalizedName: string) {
  return `/api/item/v3/info/${normalizedName}`;
}

export const questEndpoints = {
  all: "/api/quest/v3/all",
  feed: "/api/quest/v3/feed",
};

export function getQuestDetailEndpoint(normalizedName: string) {
  return `/api/quest/v3/detail/${normalizedName}`;
}

export function getQuestListWithTraderEndpoint(traderNormalizedName: string) {
  return `/api/quest/v3/list-with-trader/${traderNormalizedName}`;
}

export function getMyPagePostsEndpoint(page: number) {
  return `/api/user/v3/my-page/posts?page_num=${page}`;
}

export function getMyPageCommentsEndpoint(page: number) {
  return `/api/user/v3/my-page/comments?page_num=${page}`;
}

export function getMyPageBookmarksEndpoint(page: number) {
  return `/api/user/v3/my-page/bookmarks?page_num=${page}`;
}

export function getMyPageBlocksEndpoint(page: number) {
  return `/api/user/v3/my-page/blocks?page_num=${page}`;
}

export function getMyPageFollowEndpoint(page: number) {
  return `/api/user/v3/my-page/follow?page_num=${page}`;
}

export function getMyPageNotificationsEndpoint(page: number) {
  return `/api/user/v3/my-page/notification?page_num=${page}`;
}
