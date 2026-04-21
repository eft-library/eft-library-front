export const apiEndpoints = {
  homeMain: "/api/home/v3/main",
  homeMenu: "/api/home/v3/menu-with-autocomplete",
  newsWipe: "/api/news/v3/wipe",
  userAdd: "/api/user/v3/add",
  userInfo: "/api/user/v3/user-info",
} as const;

export function getItemListEndpoint(itemType: string) {
  return `/api/item/v3/list/${itemType}`;
}
