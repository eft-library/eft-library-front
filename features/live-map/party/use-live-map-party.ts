"use client";

import {
  createContext,
  createElement,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession, useSession } from "next-auth/react";
import { apiGet } from "@/lib/api/api-client";
import type { MapDetailResponse } from "@/types/api/map";
import type { PartySnapshotV3 } from "@/types/api/live-map-party";
import { PartyApiError, partyRequest } from "./api";
import { getApiBaseUrl } from "@/lib/config/app-env";
import { PartyRealtimeClient, type PartyRealtimeView } from "./realtime-client";
import { usePartyLocationSharing } from "./use-party-location-sharing";
import type {
  PartyViewMapCommandV3,
  PartyPointCommandV3,
} from "@/types/api/live-map-party";

const EMPTY_PINGS: PartyRealtimeView["pings"] = [];
const EMPTY_VIEW_MAPS: PartyRealtimeView["viewMaps"] = [];
const EMPTY_POSITIONS: PartyRealtimeView["positions"] = [];

function usePartySession() {
  const { data: session, status } = useSession();
  const isAdmin = session?.userInfo?.is_admin === true;
  const token = isAdmin ? session?.accessToken : undefined;
  const account = session?.userInfo?.email ?? session?.user?.email;
  const storageKey = isAdmin && account ? `live-map-party:v3:${account}` : null;
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
  const clearMarkersRef = useRef<(mapId: string) => Promise<void>>(async () => {});
  const viewMapRef = useRef<PartyViewMapCommandV3 | undefined>(undefined);
  const lastViewedMapIdRef = useRef<string | undefined>(undefined);
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
        let id = localStorage.getItem(storageKey);
        const legacyKeys = Object.keys(localStorage).filter((key) =>
          key.startsWith(`${storageKey}:`),
        );
        if (!id) {
          const ids = new Set(
            legacyKeys.map((key) => localStorage.getItem(key)).filter(Boolean),
          );
          if (ids.size === 1) {
            id = [...ids][0]!;
            localStorage.setItem(storageKey, id);
            for (const key of legacyKeys) {
              const password = sessionStorage.getItem(`${key}:${id}:password`);
              if (password !== null)
                sessionStorage.setItem(
                  `${storageKey}:${id}:password`,
                  password,
                );
            }
          }
        }
        // Do not restore obsolete per-map memberships after an explicit leave.
        for (const key of legacyKeys) localStorage.removeItem(key);
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
    client.setViewMap(viewMapRef.current);
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

  // Discard a response if the account or party changed while it was in flight.
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
  clearMarkersRef.current = async (mapId: string) => {
    if (!snapshot || !roomId) return;
    const canDeleteEveryMarker = snapshot.me.role === "owner";
    const markers = snapshot.markers.filter(
      (marker) =>
        marker.map_id === mapId &&
        (canDeleteEveryMarker ||
          marker.created_by_member_id === snapshot.me.id),
    );
    for (const marker of markers) {
      const deleted = await run(
        `/${roomId}/markers/${marker.id}?version=${marker.version}`,
        "DELETE",
      );
      if (!deleted) break;
    }
  };
  const sendPoint = (command: PartyPointCommandV3) => {
    if (clientRef.current?.sendPoint(command)) {
      setError(null);
      return true;
    }
    setError(new PartyApiError(503, "PARTY_REALTIME_UNAVAILABLE"));
    return false;
  };
  const setViewMap = useCallback(
    (command: PartyViewMapCommandV3 | undefined) => {
      const previousMapId = lastViewedMapIdRef.current;
      if (command && previousMapId && previousMapId !== command.map_id) {
        void clearMarkersRef.current(previousMapId);
      }
      if (command) lastViewedMapIdRef.current = command.map_id;
      viewMapRef.current = command;
      clientRef.current?.setViewMap(command);
    },
    [],
  );
  const locationSharing = usePartyLocationSharing({
    roomScope,
    roomId,
    connected,
    sendPoint,
  });
  return {
    ...locationSharing,
    setViewMap,
    viewMaps: view?.viewMaps ?? EMPTY_VIEW_MAPS,
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

const PartyContext = createContext<ReturnType<typeof usePartySession> | null>(
  null,
);

export function LiveMapPartyProvider({ children }: { children: ReactNode }) {
  const value = usePartySession();
  return createElement(PartyContext.Provider, { value }, children);
}

export function useLiveMapParty(normalizedName: string) {
  const party = useContext(PartyContext);
  if (!party) throw new Error("LiveMapPartyProvider is missing");
  const { setPoint, setEditingId, setPlacing, setViewMap } = party;
  useEffect(() => {
    setPoint(null);
    setEditingId(null);
    setPlacing(false);
    return () => setViewMap(undefined);
  }, [normalizedName, setPoint, setEditingId, setPlacing, setViewMap]);
  const mapQuery = useQuery({
    queryKey: ["live-map-party-map", normalizedName],
    queryFn: () =>
      apiGet<MapDetailResponse>(
        `/api/map/v3/detail/${encodeURIComponent(normalizedName)}`,
      ),
    enabled: party.isAdmin && (party.open || !!party.roomId),
    staleTime: 60 * 60 * 1000,
  });
  return {
    ...party,
    mapId: mapQuery.data?.map.id,
    mapError: mapQuery.error,
    mapLoading: mapQuery.isFetching,
    retryMap: () => mapQuery.refetch(),
  };
}

export type LiveMapPartyController = ReturnType<typeof useLiveMapParty>;
