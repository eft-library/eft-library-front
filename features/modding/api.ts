import type { ModdingManifest, WeaponList, WeaponSnapshot } from "./types";
import { getApiItem, getApiPresets, getApiWeapons } from "./source-api";

export interface WeaponData {
  source: "static" | "api";
  generation: string;
  snapshot: WeaponSnapshot;
}
function checkCancelled(error: unknown, signal: AbortSignal) {
  signal.throwIfAborted();
  if (error instanceof Error && error.name === "AbortError") throw error;
}

class SnapshotNotFound extends Error {}

async function readJson<T>(
  url: string,
  signal: AbortSignal,
  manifest = false,
): Promise<T> {
  signal.throwIfAborted();
  // Manifest URLs are data, not arbitrary fetch targets.
  if (
    !/^\/static\/modding\/v3\/(?:index\.json|snapshots\/[a-f0-9]{32}\/(?:weapons\.json|weapons\/[a-f0-9]{24}\.json))$/.test(
      url,
    )
  ) {
    throw new Error("Invalid modding snapshot URL");
  }
  const response = await fetch(manifest ? `${url}?t=${Date.now()}` : url, {
    signal,
    cache: manifest ? "no-store" : "default",
  });
  if (response.status === 404) throw new SnapshotNotFound();
  if (!response.ok)
    throw new Error(`Modding request failed: ${response.status}`);
  const envelope: { status: number; msg: string; data: T | null } =
    await response.json();
  if (envelope.status !== 200 || envelope.msg !== "OK" || envelope.data == null)
    throw new Error("Invalid modding response");
  return envelope.data;
}

export async function getManifest(signal: AbortSignal) {
  const data = await readJson<ModdingManifest>(
    "/static/modding/v3/index.json",
    signal,
    true,
  );
  if (
    data.schema_version !== 1 ||
    !/^[a-f0-9]{32}$/.test(data.generation) ||
    !Number.isSafeInteger(data.total) ||
    data.total < 0 ||
    !data.weapons ||
    typeof data.weapons !== "object" ||
    Array.isArray(data.weapons) ||
    Object.keys(data.weapons).length !== data.total
  )
    throw new Error("Invalid modding manifest");
  return data;
}

function validateList(list: WeaponList, manifest: ModdingManifest) {
  if (
    !Number.isSafeInteger(list.total) ||
    list.total < 0 ||
    !Array.isArray(list.weapons) ||
    list.total !== list.weapons.length ||
    list.total !== manifest.total ||
    list.weapons.some((row) => !manifest.weapons[row.item.id]) ||
    new Set(list.weapons.map((row) => row.item.id)).size !== list.total
  )
    throw new Error("Invalid static weapon list");
  return list;
}
function validateSnapshot(snapshot: WeaponSnapshot, id: string) {
  if (
    snapshot.weapon.item.id !== id ||
    snapshot.items[id]?.item.id !== id ||
    snapshot.validation_scope !== "slot_filters_only" ||
    snapshot.composition_type !== "flat_source_list" ||
    snapshot.preset_references.weapon_item_id !== id ||
    snapshot.preset_references.total !==
      snapshot.preset_references.presets.length
  )
    throw new Error("Invalid static weapon snapshot");
  for (const [itemId, detail] of Object.entries(snapshot.items)) {
    if (detail.item.id !== itemId || !Array.isArray(detail.slots))
      throw new Error("Invalid static item");
    for (const slot of detail.slots) {
      const candidates = snapshot.slot_candidates[itemId]?.[slot.slot_id];
      if (
        slot.item_id !== itemId ||
        !candidates ||
        candidates.item_id !== itemId ||
        candidates.slot_id !== slot.slot_id ||
        candidates.validation_scope !== "slot_filters_only" ||
        !Array.isArray(candidates.candidates) ||
        candidates.total !== candidates.candidates.length ||
        candidates.candidates.some((row) => !snapshot.items[row.item.id])
      )
        throw new Error("Incomplete static candidates");
    }
  }
  if (
    snapshot.preset_references.presets.some(
      (preset) =>
        snapshot.presets[preset.item.id]?.preset.item.id !== preset.item.id,
    )
  )
    throw new Error("Incomplete static presets");
  return snapshot;
}
export async function getWeapons(signal: AbortSignal): Promise<{
  manifest: ModdingManifest | null;
  list: WeaponList;
  source: "static" | "api";
}> {
  try {
    let manifest = await getManifest(signal);
    try {
      return {
        manifest,
        list: validateList(
          await readJson<WeaponList>(manifest.weapons_list, signal),
          manifest,
        ),
        source: "static",
      };
    } catch (error) {
      checkCancelled(error, signal);
      if (!(error instanceof SnapshotNotFound)) throw error;
      manifest = await getManifest(signal);
      return {
        manifest,
        list: validateList(
          await readJson<WeaponList>(manifest.weapons_list, signal),
          manifest,
        ),
        source: "static",
      };
    }
  } catch (error) {
    checkCancelled(error, signal);
    return { manifest: null, list: await getApiWeapons(signal), source: "api" };
  }
}
export async function getWeapon(
  manifest: ModdingManifest | null,
  id: string,
  signal: AbortSignal,
): Promise<WeaponData> {
  if (manifest) {
    try {
      let current = manifest;
      const load = async () => {
        const url = current.weapons[id];
        if (!url) throw new Error("Weapon snapshot unavailable");
        return {
          source: "static" as const,
          generation: current.generation,
          snapshot: validateSnapshot(
            await readJson<WeaponSnapshot>(url, signal),
            id,
          ),
        };
      };
      try {
        return await load();
      } catch (error) {
        checkCancelled(error, signal);
        if (!(error instanceof SnapshotNotFound)) throw error;
        current = await getManifest(signal);
        return await load();
      }
    } catch (error) {
      checkCancelled(error, signal);
    }
  }
  signal.throwIfAborted();
  const [item, presets] = await Promise.all([
    getApiItem(id, signal),
    getApiPresets(id, signal),
  ]);
  if (!item.weapon_properties)
    throw new Error("Modding weapon properties missing");
  return {
    source: "api",
    generation: "api",
    snapshot: {
      weapon: {
        item: item.item,
        weapon_properties: item.weapon_properties,
        preset_count: presets.total,
      },
      items: { [id]: item },
      slot_candidates: {},
      preset_references: presets,
      presets: {},
      validation_scope: "slot_filters_only",
      composition_type: "flat_source_list",
    },
  };
}
