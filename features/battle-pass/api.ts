import type { ApiEnvelope } from "@/lib/api/api-client";
import { apiEndpoints, getBattlePassDetailEndpoint } from "@/lib/config/api-endpoints";
import { getApiBaseUrl } from "@/lib/config/app-env";
import type { BattlePassData } from "@/types/api/battle-pass";

async function getBattlePass(path: string) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Battle pass API request failed: ${response.status}`);
  }

  const result = (await response.json()) as ApiEnvelope<BattlePassData>;
  return result.data;
}

export function getActiveBattlePass() {
  return getBattlePass(apiEndpoints.battlePassActive);
}

export function getBattlePassDetail(seasonCode: string) {
  return getBattlePass(getBattlePassDetailEndpoint(seasonCode));
}
