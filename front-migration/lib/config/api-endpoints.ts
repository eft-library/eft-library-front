export const apiEndpoints = {
  homeMain: "/api/home/v3/main",
  homeMenu: "/api/home/v3/menu-with-autocomplete",
  dashboardAnalysis: "/api/dashboard/v3/analysis",
  newsWipe: "/api/news/v3/wipe",
  hideoutStation: "/api/hideout/v3/get-station",
  hideoutSaveStation: "/api/hideout/v3/save-station",
  hideoutSaveStationItem: "/api/hideout/v3/save-station-item",
  roadmap: "/api/roadmap/v3/get-roadmap",
  roadmapUser: "/api/roadmap/v3/get-user-roadmap",
  roadmapSave: "/api/roadmap/v3/save-roadmap",
  storyRoadmap: "/api/story/v3/roadmap",
  rngItemList: "/api/minigame/v3/rng-item",
  rngItemAllRank: "/api/minigame/v3/rng-item/all-rank",
  rngItemMyRank: "/api/minigame/v3/rng-item/my-rank",
  rngItemSaveScore: "/api/minigame/v3/rng-item/save",
  progressItem: "/api/progress/v3/progress-item",
  userAdd: "/api/user/v3/add",
  userInfo: "/api/user/v3/user-info",
  userDelete: "/api/user/v3/delete",
  userCheckNicknameDuplicate: "/api/user/v3/check-nickname-duplicate",
  userUpdateNickname: "/api/user/v3/update-nickname",
  userReport: "/api/user/v3/report-user",
  userBlock: "/api/user/v3/block-user",
  userUnblock: "/api/user/v3/unblock-user",
  userPenalty: "/api/user/v3/penalty-user",
  myPageDefault: "/api/user/v3/my-page/default",
  myPageInfo: "/api/user/v3/my-page/info",
  communitySidePost: "/api/community/v3/side-post",
  communityUploadImage: "/api/community/v3/upload-image",
  communityDetail: "/api/community/v3/detail",
  communityDetailMetaData: "/api/community/v3/detail-meta-data",
  communityCreatePost: "/api/community/v3/create-posts",
  communityUpdatePost: "/api/community/v3/update-post",
  communityGetUpdatePostDetail: "/api/community/v3/get-update-post-detail",
  communityDeletePostByUser: "/api/community/v3/delete-post-by-user",
  communityDeletePostByAdmin: "/api/community/v3/delete-post-by-admin",
  communityReportPost: "/api/community/v3/report-post",
  communityLikePost: "/api/community/v3/like-post",
  communityDislikePost: "/api/community/v3/dislike-post",
  communityBookmarkPost: "/api/community/v3/bookmark-post",
  communityFollowUser: "/api/community/v3/follow-user",
  communityIncreaseViewCount: "/api/community/v3/increase-view-count",
  commentGet: "/api/comment/v3/get-comments",
  commentInsertParent: "/api/comment/v3/insert-parent-comment",
  commentInsertChild: "/api/comment/v3/insert-child-comment",
  commentLike: "/api/comment/v3/like-comment",
  commentDislike: "/api/comment/v3/dislike-comment",
  commentUpdate: "/api/comment/v3/update-comment",
  commentDeleteByUser: "/api/comment/v3/delete-comment-by-user",
  commentDeleteByAdmin: "/api/comment/v3/delete-comment-by-admin",
  commentReport: "/api/comment/v3/report-comment",
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

export function getCommunityListEndpoint(category: string, page: number) {
  return `/api/community/v3/get/${category}?page_num=${page}`;
}

export function getCommunitySearchEndpoint(page: number, word: string, searchType: string) {
  const params = new URLSearchParams({
    page_num: String(page),
    word,
    search_type: searchType,
  });

  return `/api/community/v3/search?${params.toString()}`;
}
