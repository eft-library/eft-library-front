import { getApiBaseUrl } from "@/lib/config/app-env";
import type {
  CandidatePage,
  ItemDetail,
  PresetDetail,
  PresetPage,
  WeaponPage,
} from "./types";

export class ModdingApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ModdingApiError";
  }
}
// Bound background reads when opening a saved build containing many mounted parts.
let activeReads = 0;
const waiting: Array<() => void> = [];
async function readApi<T>(path: string, signal: AbortSignal): Promise<T> {
  signal.throwIfAborted();
  await new Promise<void>((resolve, reject) => {
    const start = () => {
      signal.removeEventListener("abort", abort);
      activeReads++;
      resolve();
    };
    const abort = () => {
      const index = waiting.indexOf(start);
      if (index >= 0) waiting.splice(index, 1);
      reject(signal.reason);
    };
    if (activeReads < 4) start();
    else {
      waiting.push(start);
      signal.addEventListener("abort", abort, { once: true });
    }
  });
  try {
    signal.throwIfAborted();
    const response = await fetch(`${getApiBaseUrl()}/api/modding/v3/${path}`, {
      signal,
      cache: "no-store",
    });
    const payload: {
      status?: number;
      msg?: string;
      data?: T;
      detail?: unknown;
    } = await response.json();
    if (!response.ok)
      throw new ModdingApiError(
        response.status,
        typeof payload.detail === "string"
          ? payload.detail
          : `Modding API: ${response.status}`,
      );
    if (payload.status !== 200 || payload.msg !== "OK" || payload.data == null)
      throw new Error("Invalid modding API response");
    return payload.data;
  } finally {
    activeReads--;
    waiting.shift()?.();
  }
}

type Page = { total: number; page: number; page_size: number };
async function allPages<P extends Page, T>(
  read: (page: number) => Promise<P>,
  rows: (page: P) => T[],
  id: (row: T) => string,
  validate: (page: P) => void = () => {},
): Promise<{ first: P; rows: T[] }> {
  const result: T[] = [];
  const ids = new Set<string>();
  let first: P | undefined;
  for (let page = 1; ; page++) {
    const response = await read(page);
    validate(response);
    const entries = rows(response);
    if (
      !Number.isSafeInteger(response.total) ||
      response.total < 0 ||
      response.page !== page ||
      response.page_size !== 100 ||
      !Array.isArray(entries) ||
      entries.length > 100 ||
      (first && response.total !== first.total)
    )
      throw new Error("Inconsistent modding API pagination");
    first ??= response;
    if (!entries.length && result.length < response.total)
      throw new Error("Incomplete modding API pagination");
    for (const entry of entries) {
      const key = id(entry);
      if (!key || ids.has(key)) throw new Error("Duplicate modding API row");
      ids.add(key);
      result.push(entry);
    }
    if (result.length > response.total)
      throw new Error("Inconsistent modding API total");
    if (result.length === response.total) return { first, rows: result };
  }
}
const encode = encodeURIComponent;
export async function getApiWeapons(signal: AbortSignal) {
  const result = await allPages(
    (page) => readApi<WeaponPage>(`weapons?page=${page}&page_size=100`, signal),
    (page) => page.weapons,
    (row) => row.item.id,
  );
  return { total: result.first.total, weapons: result.rows };
}
export async function getApiItem(id: string, signal: AbortSignal) {
  const item = await readApi<ItemDetail>(`items/${encode(id)}`, signal);
  if (
    item.item.id !== id ||
    !Array.isArray(item.slots) ||
    item.slots.some((slot) => slot.item_id !== id)
  )
    throw new Error("Mismatched modding item");
  return item;
}
export async function getApiCandidates(
  ownerId: string,
  slotId: string,
  signal: AbortSignal,
) {
  const result = await allPages(
    (page) =>
      readApi<CandidatePage>(
        `items/${encode(ownerId)}/slots/${encode(slotId)}/candidates?page=${page}&page_size=100`,
        signal,
      ),
    (page) => page.candidates,
    (row) => row.item.id,
    (page) => {
      if (
        page.item_id !== ownerId ||
        page.slot_id !== slotId ||
        page.validation_scope !== "slot_filters_only"
      )
        throw new Error("Mismatched modding candidates");
    },
  );
  const { page: _page, page_size: _size, ...data } = result.first;
  return { ...data, candidates: result.rows };
}
export async function getApiPresets(weaponId: string, signal: AbortSignal) {
  const result = await allPages(
    (page) =>
      readApi<PresetPage>(
        `weapons/${encode(weaponId)}/presets?page=${page}&page_size=100`,
        signal,
      ),
    (page) => page.presets,
    (row) => row.item.id,
    (page) => {
      if (page.weapon_item_id !== weaponId)
        throw new Error("Mismatched modding presets");
    },
  );
  return {
    weapon_item_id: weaponId,
    total: result.first.total,
    presets: result.rows,
  };
}
export async function getApiPreset(id: string, signal: AbortSignal) {
  const detail = await readApi<PresetDetail>(`presets/${encode(id)}`, signal);
  if (
    detail.preset.item.id !== id ||
    detail.composition_type !== "flat_source_list" ||
    !Array.isArray(detail.components)
  )
    throw new Error("Mismatched modding preset");
  return detail;
}
