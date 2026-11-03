import type { StaticJsonEnvelope } from "@/lib/api/static-json-client";
import { apiGet } from "@/lib/api/api-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type {
  TraderList,
  TraderManifest,
  TraderMode,
  TraderOffers,
  TraderOffersPage,
} from "@/types/api/trader";

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

interface TraderData<T> {
  data: T;
  source: "static" | "api";
}

async function tryTraderJson<T>(
  path: string | undefined,
  signal?: AbortSignal,
): Promise<T | null> {
  if (!path) return null;
  try {
    return await getTraderJson<T>(path, signal);
  } catch {
    // Switching trader/mode cancels requests; cancellation must not start API work.
    signal?.throwIfAborted();
    return null;
  }
}

export function getTraderManifest(signal?: AbortSignal) {
  return tryTraderJson<TraderManifest>("/static/trader/v3/index.json", signal);
}

export async function getTraderList(
  mode: TraderMode,
  path: string | undefined,
  seasonId: string | null,
  signal?: AbortSignal,
): Promise<TraderData<TraderList>> {
  const snapshot = await tryTraderJson<TraderList>(path, signal);
  if (snapshot) return { data: snapshot, source: "static" };
  const params = new URLSearchParams({ game_mode: mode });
  if (seasonId) params.set("season_id", seasonId);
  const data = await apiGet<TraderList>(
    `${apiEndpoints.traderList}?${params}`,
    { signal, cache: "no-store", revalidate: 0 },
  );
  return { data, source: "api" };
}

export async function getTraderOffers(
  mode: TraderMode,
  traderId: string,
  seasonId: string | null,
  path: string | undefined,
  signal?: AbortSignal,
): Promise<TraderData<TraderOffers>> {
  const snapshot = await tryTraderJson<TraderOffers>(path, signal);
  if (snapshot) return { data: snapshot, source: "static" };
  const params = new URLSearchParams({
    game_mode: mode,
    trader_id: traderId,
    page_size: "500",
  });
  if (seasonId) params.set("season_id", seasonId);
  const readPage = (page: number) => {
    params.set("page", String(page));
    return apiGet<TraderOffersPage>(`${apiEndpoints.traderOffers}?${params}`, {
      signal,
      cache: "no-store",
      revalidate: 0,
    });
  };
  const first = await readPage(1);
  // Use the resolved season for all subsequent pages, including when the
  // manifest is missing and the API selected the current season itself.
  if (first.season_id) params.set("season_id", first.season_id);
  const offers = [...first.offers];
  let page = 1;
  while (offers.length < first.total) {
    const next = await readPage(++page);
    if (!next.offers.length)
      throw new Error("Trader API returned an incomplete offer list");
    offers.push(...next.offers);
  }
  return {
    source: "api",
    data: {
      game_mode: first.game_mode,
      season_id: first.season_id,
      trader_id: traderId,
      total: first.total,
      offers,
    },
  };
}
