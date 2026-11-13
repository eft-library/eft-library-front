import { apiGet, apiPost } from "@/lib/api/api-client";
import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { getApiBaseUrl } from "@/lib/config/app-env";
import type { PriceSeason } from "@/types/api/price";
import { apiEndpoints, priceSeasonsEndpoint } from "@/lib/config/api-endpoints";
import type {
  KordRewardsResult,
  KordBreachDeleteResult,
  KordBreachModifiersResponse,
  KordBreachPreset,
  KordBreachSaveResult,
  KordBreachSelection,
} from "@/types/api/kord-breach";

export function getKordBreachModifiers() {
  return apiGet<KordBreachModifiersResponse>(apiEndpoints.kordBreachModifiers, { revalidate: 300 });
}

export function getKordBreachPresets(accessToken: string) {
  return authenticatedApiRequest<KordBreachPreset[]>(apiEndpoints.kordBreachPresets, {
    accessToken,
    method: "GET",
    cache: "no-store",
  });
}

export function saveKordBreachPreset(slotNo: number, name: string, modifierIds: string[], accessToken: string) {
  return authenticatedApiRequest<KordBreachSaveResult>(apiEndpoints.kordBreachSavePreset, {
    accessToken,
    method: "POST",
    body: JSON.stringify({ slotNo, name, modifierIds }),
  });
}

export function deleteKordBreachPreset(slotNo: number, accessToken: string) {
  return authenticatedApiRequest<KordBreachDeleteResult>(apiEndpoints.kordBreachDeletePreset, {
    accessToken,
    method: "POST",
    body: JSON.stringify({ slotNo }),
  });
}

export function getRandomKordBreachSelection() {
  return apiPost<Record<string, never>, KordBreachSelection>(apiEndpoints.kordBreachRandom, {});
}

export async function getKordBreachSeasons(signal?: AbortSignal) {
  const seasons = await apiGet<PriceSeason[]>(priceSeasonsEndpoint, {
    cache: "no-store", revalidate: 0, signal,
  });
  if (!Array.isArray(seasons)) throw new Error("Invalid seasons response");
  return seasons;
}

export class KordRewardsUnavailableError extends Error {}

export async function getKordBreachRewards(seasonId: string, signal?: AbortSignal): Promise<KordRewardsResult> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/kord-breach/v3/rewards?season_id=${encodeURIComponent(seasonId)}`,
    { cache: "no-store", signal },
  );
  const payload: { status?: number; msg?: string; data?: KordRewardsResult | null; detail?: string } = await response.json();
  if (response.status === 503 && payload.detail === "KORD_REWARDS_UNAVAILABLE") {
    throw new KordRewardsUnavailableError("Season rewards are not published yet");
  }
  if (!response.ok || payload.status !== 200 || payload.msg !== "OK" || !payload.data || payload.data.season_id !== seasonId) {
    throw new Error("Could not load season rewards");
  }
  return payload.data;
}
