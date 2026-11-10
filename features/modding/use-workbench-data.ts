"use client";
import { useEffect } from "react";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getApiCandidates,
  getApiItem,
  getApiPreset,
  ModdingApiError,
} from "./source-api";
import type { WeaponSnapshot } from "./types";

export function useWorkbenchData(
  base: WeaponSnapshot,
  source: "static" | "api",
  mountedIds: string[],
  ownerId: string | undefined,
  slotId: string | undefined,
  presetId: string,
  tab: "build" | "presets",
) {
  const live = source === "api";
  const client = useQueryClient();
  const preset = useQuery({
    queryKey: ["modding", "api", "preset", presetId],
    queryFn: ({ signal }) => getApiPreset(presetId, signal),
    enabled: live && tab === "presets" && !!presetId,
    staleTime: 5 * 60_000,
    gcTime: 5 * 60_000,
    retry: false,
  });
  const ids = [
    ...new Set([
      base.weapon.item.id,
      ...mountedIds,
      ...(live && tab === "presets"
        ? (preset.data?.components
            .filter((component) => component.item.slot_count > 0)
            .map((component) => component.item.id) ?? [])
        : []),
    ]),
  ].sort();
  const details = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["modding", "api", "item", id],
      queryFn: ({ signal }: { signal: AbortSignal }) => getApiItem(id, signal),
      enabled: live,
      initialData: live ? base.items[id] : undefined,
      staleTime: 5 * 60_000,
      gcTime: 5 * 60_000,
      retry: false,
    })),
  });
  const items = { ...base.items };
  if (live)
    for (const detail of details)
      if (detail.data) items[detail.data.item.id] = detail.data;
  const validSlot =
    !!ownerId &&
    !!slotId &&
    items[ownerId]?.slots.some((slot) => slot.slot_id === slotId);
  const candidates = useQuery({
    queryKey: ["modding", "api", "candidates", ownerId, slotId],
    queryFn: ({ signal }) => getApiCandidates(ownerId!, slotId!, signal),
    enabled: live && tab === "build" && validSlot,
    staleTime: 5 * 60_000,
    gcTime: 5 * 60_000,
    retry: false,
  });
  useEffect(() => {
    if (
      live &&
      ownerId &&
      candidates.error instanceof ModdingApiError &&
      candidates.error.status === 404
    ) {
      // A source update may have removed the slot. Refresh its owning definition.
      void client.invalidateQueries({
        queryKey: ["modding", "api", "item", ownerId],
      });
    }
  }, [live, ownerId, candidates.error, client]);
  const snapshot: WeaponSnapshot = live
    ? {
        ...base,
        items,
        slot_candidates:
          candidates.data && ownerId && slotId
            ? { [ownerId]: { [slotId]: candidates.data } }
            : {},
        presets: preset.data
          ? { [preset.data.preset.item.id]: preset.data }
          : {},
      }
    : base;
  const itemErrors = live ? details.filter((detail) => detail.isError) : [];
  return {
    snapshot,
    candidatesLoading:
      live && tab === "build" && validSlot && candidates.isPending,
    candidatesError: live && tab === "build" ? candidates.error : null,
    presetLoading: live && tab === "presets" && !!presetId && preset.isPending,
    presetError: live && tab === "presets" ? preset.error : null,
    itemsLoading: live && details.some((detail) => detail.isPending),
    itemError: itemErrors[0]?.error,
    retryItems: () => {
      for (const detail of itemErrors) void detail.refetch();
    },
    retryCandidates: () => void candidates.refetch(),
    retryPreset: () => void preset.refetch(),
  };
}
