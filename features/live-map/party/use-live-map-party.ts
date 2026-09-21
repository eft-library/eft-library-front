"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession, useSession } from "next-auth/react";
import { apiGet } from "@/lib/api/api-client";
import type { MapDetailResponse } from "@/types/api/map";
import type { PartySnapshotV3 } from "@/types/api/live-map-party";
import { PartyApiError, partyRequest } from "./api";
import { getApiBaseUrl } from "@/lib/config/app-env";
import { PartyRealtimeClient, type PartyRealtimeView } from "./realtime-client";
import type { PartyPointCommandV3 } from "@/types/api/live-map-party";

const EMPTY_PINGS: PartyRealtimeView["pings"] = [];
const EMPTY_POSITIONS: PartyRealtimeView["positions"] = [];

export function useLiveMapParty(normalizedName: string) {
  const { data: session, status } = useSession();
  const isAdmin = session?.userInfo?.is_admin === true;
  const token = isAdmin ? session?.accessToken : undefined;
  const account = session?.userInfo?.email ?? session?.user?.email;
  const storageKey =
    isAdmin && account
      ? `live-map-party:v3:${account}:${normalizedName}`
      : null;
  const [savedRoom, setSavedRoom] = useState<{
    key: string;
    id: string;
  } | null>(null);
  const roomId = savedRoom?.key === storageKey ? savedRoom.id : null;
  const [roomPassword, setRoomPassword] = useState<{
    scope: string;
    value: string;
  } | null>(null);
  const [open, setOpen] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [placementKind, setPlacementKind] = useState<
    "marker" | "ping" | "position"
  >("marker");
  const [point, setPoint] = useState<{
    floor_id: string;
    x: number;
    z: number;
  } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryAt, setRetryAt] = useState(0);
  const queryClient = useQueryClient();
  const clientRef = useRef<PartyRealtimeClient | null>(null);
  const [realtime, setRealtime] = useState<{
    key: string;
    view: PartyRealtimeView;
  } | null>(null);
  const roomScope = `${storageKey}:${roomId}`;
  const view = realtime?.key === roomScope && token ? realtime.view : undefined;
  useEffect(() => {
    if (!roomId || !storageKey) {
      setRoomPassword(null);
      return;
    }
    try {
      const value = sessionStorage.getItem(`${roomScope}:password`);
      setRoomPassword(value === null ? null : { scope: roomScope, value });
    } catch {
      /* Storage may be disabled. */
    }
  }, [roomId, storageKey, roomScope]);

  const roomScopeRef = useRef(roomScope);
  roomScopeRef.current = roomScope;

  useEffect(() => {
    setPlacing(false);
    setPoint(null);
    setEditingId(null);
    setError(null);
    if (!storageKey) {
      setSavedRoom(null);
      return;
    }
    const restore = () => {
      try {
        const id = localStorage.getItem(storageKey);
        setSavedRoom(id ? { key: storageKey, id } : null);
      } catch {
        setSavedRoom(null);
      }
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key !== storageKey && event.key !== null) return;
      restore();
      setPlacing(false);
      setPoint(null);
      setEditingId(null);
    };
    restore();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey]);

  const rememberRoom = useCallback(
    (id: string | null) => {
      roomScopeRef.current = `${storageKey}:${id}`;
      setSavedRoom(storageKey && id ? { key: storageKey, id } : null);
      setPlacing(false);
      setPoint(null);
      setEditingId(null);
      if (storageKey) {
        try {
          if (id) localStorage.setItem(storageKey, id);
          else localStorage.removeItem(storageKey);
        } catch {
          /* Membership still works when browser storage is unavailable. */
        }
      }
    },
    [storageKey],
  );

  const mapQuery = useQuery({
    queryKey: ["live-map-party-map", normalizedName],
    queryFn: () =>
      apiGet<MapDetailResponse>(
        `/api/map/v3/detail/${encodeURIComponent(normalizedName)}`,
      ),
    enabled: isAdmin && (open || !!roomId),
    staleTime: 60 * 60 * 1000,
  });

  useEffect(() => {
    if (!roomId || !account || !token) return;
    const url = new URL(
      `${getApiBaseUrl()}/api/live-map/v3/party/rooms/${encodeURIComponent(roomId)}/ws`,
    );
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    const client = new PartyRealtimeClient({
      url: url.toString(),
      roomId,
      getToken: async () => {
        const latest = await getSession();
        const email = latest?.userInfo?.email ?? latest?.user?.email;
        return email === account && latest?.userInfo?.is_admin === true
          ? latest.accessToken
          : undefined;
      },
      onChange: (next) => {
        if (roomScopeRef.current === roomScope)
          setRealtime({ key: roomScope, view: next });
      },
      onTerminal: (failure) => {
        if (roomScopeRef.current !== roomScope) return;
        setError(new PartyApiError(failure.status, failure.msg));
        rememberRoom(null);
        setOpen(true);
      },
    });
    clientRef.current = client;
    client.start();
    const wake = () => {
      if (document.visibilityState === "visible") client.wake();
    };
    window.addEventListener("online", wake);
    window.addEventListener("focus", wake);
    document.addEventListener("visibilitychange", wake);
    return () => {
      client.dispose();
      if (clientRef.current === client) clientRef.current = null;
      window.removeEventListener("online", wake);
      window.removeEventListener("focus", wake);
      document.removeEventListener("visibilitychange", wake);
    };
  }, [roomId, account, token, roomScope, rememberRoom]);

  useEffect(() => {
    if (!retryAt) return;
    const timer = window.setTimeout(
      () => setRetryAt(0),
      Math.max(0, retryAt - Date.now()),
    );
    return () => window.clearTimeout(timer);
  }, [retryAt]);

  // Discard a response if the user changed accounts or maps while it was in flight.
  async function run(
    path: string,
    method: string,
    body?: unknown,
    result: "snapshot" | "leave" | "refresh" = "refresh",
  ) {
    if (busyRef.current || Date.now() < retryAt || !token) return false;
    busyRef.current = true;
    setBusy(true);
    setError(null);
    const scope = roomScope;
    const client = clientRef.current;
    if (roomId && result !== "leave" && view?.connection !== "connected") {
      setError(new PartyApiError(503, "PARTY_REALTIME_UNAVAILABLE"));
      busyRef.current = false;
      setBusy(false);
      return false;
    }
    if (result === "leave") client?.suspend();
    try {
      const data = await partyRequest<unknown>(path, token, method, body);
      if (scope !== roomScopeRef.current) return false;
      if (result === "leave") {
        client?.dispose();
        rememberRoom(null);
        setRoomPassword(null);
        try {
          sessionStorage.removeItem(`${scope}:password`);
        } catch {
          /* Storage may be disabled. */
        }
      } else if (result === "snapshot") {
        const snapshot = data as PartySnapshotV3;
        if (
          body &&
          typeof body === "object" &&
          "password" in body &&
          typeof body.password === "string"
        ) {
          const passwordScope = `${storageKey}:${snapshot.room.id}`;
          setRoomPassword({ scope: passwordScope, value: body.password });
          try {
            sessionStorage.setItem(`${passwordScope}:password`, body.password);
          } catch {
            /* Keep the in-memory value. */
          }
        }
        if (!roomId) rememberRoom(snapshot.room.id);
        else client?.sync();
      } else {
        client?.sync();
      }
      await queryClient.invalidateQueries({
        queryKey: ["live-map-party-rooms"],
      });
      return true;
    } catch (failure) {
      if (scope !== roomScopeRef.current) return false;
      if (result === "leave") client?.resume();
      const nextError =
        failure instanceof Error ? failure : new Error("NETWORK_ERROR");
      setError(nextError);
      if (nextError instanceof PartyApiError) {
        if (nextError.status === 429)
          setRetryAt(
            Date.now() + Math.max(1, nextError.retryAfter || 60) * 1000,
          );
        if (nextError.code === "MARKER_VERSION_CONFLICT") {
          setEditingId(null);
          setPoint(null);
        }
        if ([403, 404, 409, 410].includes(nextError.status) && roomId) {
          client?.sync();
        }
      }
      return false;
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }

  const snapshot = view?.snapshot;
  const connected = view?.connection === "connected";
  const sendPoint = (command: PartyPointCommandV3) => {
    if (clientRef.current?.sendPoint(command)) {
      setError(null);
      return true;
    }
    setError(new PartyApiError(503, "PARTY_REALTIME_UNAVAILABLE"));
    return false;
  };
  return {
    isAdmin,
    enteredPassword:
      roomPassword?.scope === roomScope ? roomPassword.value : null,
    token,
    status,
    roomId,
    snapshot,
    open,
    setOpen,
    placing,
    placementKind,
    setPlacementKind,
    connected,
    connection: view?.connection ?? "connecting",
    pings: view?.pings ?? EMPTY_PINGS,
    positions: view?.positions ?? EMPTY_POSITIONS,
    sendPoint,
    setPlacing,
    point,
    setPoint,
    editingId,
    setEditingId,
    busy: busy || !!retryAt || !!view?.cooldown,
    error:
      error ??
      (view?.error
        ? new PartyApiError(
            view.error.status,
            view.error.msg,
            view.error.retry_after,
          )
        : null),
    setError,
    run,
    mapId: mapQuery.data?.map.id,
    mapError: mapQuery.error,
    mapLoading: mapQuery.isFetching,
    retryMap: () => mapQuery.refetch(),
    refresh: () => {
      setError(null);
      if (connected) clientRef.current?.sync();
      else clientRef.current?.reconnect();
    },
    loading:
      !!roomId &&
      !snapshot &&
      (view?.connection === "connecting" ||
        view?.connection === "reconnecting"),
    syncing: false,
    nickname: session?.userInfo?.nickname ?? "",
  };
}

export type LiveMapPartyController = ReturnType<typeof useLiveMapParty>;
