import { getApiBaseUrl } from "@/lib/config/app-env";
import type { CalculationRequest, CalculationResult } from "./statistics-types";
import type { StoredContent } from "./builds/types";

export function calculationInput(content: StoredContent): CalculationRequest {
  return {
    weapon_item_id: content.weapon_item_id,
    nodes: content.nodes.map(({ node_id, item_id, parent_node_id, slot_id, attributes }) => ({
      node_id, item_id, parent_node_id: parent_node_id ?? null, slot_id: slot_id ?? null, attributes: attributes ?? null,
    })),
    ammo_item_id: null,
  };
}
export async function calculateStatistics(input: CalculationRequest, signal: AbortSignal): Promise<CalculationResult> {
  const response = await fetch(`${getApiBaseUrl()}/api/modding/v3/calculate`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input), cache: "no-store", signal,
  });
  const payload: { status?: number; msg?: string; data?: CalculationResult; detail?: unknown } = await response.json();
  if (!response.ok || payload.status !== 200 || payload.msg !== "OK" || !payload.data)
    throw new Error(typeof payload.detail === "string" ? payload.detail : `Statistics API: ${response.status}`);
  return payload.data;
}
