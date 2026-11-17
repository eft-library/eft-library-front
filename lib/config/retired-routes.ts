// Applied to backend-supplied navigation/search entries and sitemap URLs.
export function isRetiredRoute(url: string): boolean {
  let pathname: string;
  try {
    pathname = new URL(url, "https://eftlibrary.com").pathname;
  } catch {
    return false;
  }
  return pathname === "/minigame" || pathname === "/map" || pathname.startsWith("/map/");
}
