import type { StaticJsonEnvelope } from "@/lib/api/static-json-client";

export const TRADER_REFRESH_MS = 5 * 60 * 1000;

// The mutable manifest must bypass browser/CDN caches. All other paths are
// immutable snapshots selected from this manifest, never constructed by date.
export async function getTraderJson<T>(
  path: string,
  signal?: AbortSignal,
): Promise<T> {
  if (
    !path.startsWith("/static/trader/v3/") ||
    path.includes("..") ||
    path.includes("?")
  ) {
    throw new Error("Invalid trader snapshot path");
  }
  const manifest = path.endsWith("/index.json");
  const response = await fetch(manifest ? `${path}?t=${Date.now()}` : path, {
    signal,
    cache: manifest ? "no-store" : "default",
  });
  if (!response.ok) throw new Error(`Trader JSON: ${response.status}`);
  const payload: StaticJsonEnvelope<T> = await response.json();
  if (payload.status !== 200 || payload.msg !== "OK" || payload.data === null) {
    throw new Error("Invalid trader JSON response");
  }
  return payload.data;
}
