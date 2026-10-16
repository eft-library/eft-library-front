"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiGet } from "@/lib/api/api-client";
import { useWsStore } from "@/store/ws-store";
import type { LiveMapDetailResponse } from "@/types/api/live-map";
import type { MapDetailResponse } from "@/types/api/map";
import type { PartyPointCommandV3 } from "@/types/api/live-map-party";
import {
  findFloorForLocation,
  parseWhereText,
  type LiveMapLocation,
} from "../components/live-map-utils";

export function usePartyLocationSharing({
  roomScope,
  roomId,
  connected,
  sendPoint,
}: {
  roomScope: string;
  roomId: string | null;
  connected: boolean;
  sendPoint: (command: PartyPointCommandV3) => boolean;
}) {
  const queryClient = useQueryClient();
  const latest = useWsStore((state) => state.latestLocation);
  const log = useWsStore((state) => state.latestLogLocation);
  const raid = useWsStore((state) => state.latestRaidState);
  const [viewedMapName, setViewedMapName] = useState<string | null>(null);
  const actualMapName = viewedMapName;
  const [locationIssue, setLocationIssue] = useState<
    "unknown-map" | "map-unavailable" | null
  >(null);
  const [localPosition, setLocalPosition] = useState<{
    scope: string;
    mapName: string;
    location: LiveMapLocation;
    receivedAt: number;
  } | null>(null);
  const scopeRef = useRef(roomScope);
  scopeRef.current = roomScope;
  const sourceRef = useRef(actualMapName);
  sourceRef.current = actualMapName;
  const sequence = useRef(0);
  const sendRef = useRef(sendPoint);
  sendRef.current = sendPoint;

  useEffect(() => {
    setLocationIssue(null);
    setLocalPosition(null);
  }, [roomScope]);
  useEffect(() => {
    setLocationIssue(null);
  }, [actualMapName]);
  async function sharePosition(
    mapName: string | null,
    location: LiveMapLocation,
    persistent: boolean,
    requireSelectedMap: boolean,
    replayed = false,
    observedAt = Date.now(),
  ) {
    if (!roomId) return;
    if (!mapName) {
      setLocationIssue("unknown-map");
      return;
    }
    const scope = roomScope;
    const request = ++sequence.current;
    setLocalPosition({ scope, mapName, location, receivedAt: observedAt });
    // Restored observations may be shown locally, but are not new party positions.
    if (!connected || replayed) return;
    try {
      const [detail, map] = await Promise.all([
        queryClient.fetchQuery({
          queryKey: ["party-location-floors", mapName],
          queryFn: () =>
            apiGet<LiveMapDetailResponse>(
              `/api/live-map/v3/detail/${encodeURIComponent(mapName)}`,
            ),
          staleTime: 60 * 60 * 1000,
        }),
        queryClient.fetchQuery({
          queryKey: ["live-map-party-map", mapName],
          queryFn: () =>
            apiGet<MapDetailResponse>(
              `/api/map/v3/detail/${encodeURIComponent(mapName)}`,
            ),
          staleTime: 60 * 60 * 1000,
        }),
      ]);
      if (
        scope !== scopeRef.current ||
        request !== sequence.current ||
        (requireSelectedMap && sourceRef.current !== mapName)
      )
        return;
      const floor = findFloorForLocation(detail.floors, location);
      if (!floor) {
        setLocationIssue("map-unavailable");
        return;
      }
      sendRef.current({
        type: "position",
        map_id: map.map.id,
        floor_id: floor.id,
        x: location.x,
        z: location.z,
        ...(persistent
          ? { yaw: ((location.yaw % 360) + 360) % 360, persistent: true }
          : {}),
        request_id: crypto.randomUUID(),
      });
      setLocationIssue(null);
    } catch {
      if (scope === scopeRef.current && request === sequence.current)
        setLocationIssue("map-unavailable");
    }
  }
  const shareLocation = (text: string) => {
    const parsed = parseWhereText(text);
    if (parsed) void sharePosition(actualMapName, parsed, true, true);
  };
  const shareRef = useRef(shareLocation);
  shareRef.current = shareLocation;
  const logRef = useRef(sharePosition);
  logRef.current = sharePosition;
  const previous = useRef(latest?.metadata?.replayed ? null : latest);
  useEffect(() => {
    if (!latest) { setLocalPosition(null); return; }
    if (previous.current === latest) return;
    previous.current = latest;
    if (latest.metadata?.replayed) {
      if (raid?.value.map && raid.value.map !== actualMapName) return;
      const parsed = parseWhereText(latest.value);
      if (parsed) void logRef.current(actualMapName, parsed, true, true, true, latest.metadata.publishedAt ?? latest.receivedAt);
    } else shareRef.current(latest.value);
  }, [latest, actualMapName, raid?.value.map]);
  const previousLog = useRef(log?.metadata?.replayed ? null : log);
  useEffect(() => {
    if (!log || previousLog.current === log) return;
    previousLog.current = log;
    const time = Date.parse(log.value.observed_at);
    if (!log.value.map || !Number.isFinite(time) || Date.now() - time > 30000)
      return;
    void logRef.current(log.value.map, { ...log.value, yaw: 0 }, false, false, log.metadata?.replayed, time);
  }, [log]);

  return {
    actualMapName,
    locationIssue,
    localPosition: localPosition?.scope === roomScope ? localPosition : null,
    setViewedMapName,
    shareLocation,
  };
}
