import { apiGet, apiPost } from "@/lib/api/api-client";
import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type {
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
