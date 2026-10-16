"use client";

import { useEffect, useRef } from "react";
import { getSession, useSession } from "next-auth/react";

import { LocationEventCursor, LocationRealtimeClient } from "@/lib/websocket/location-client";
import { normalizeNotificationMessage } from "@/lib/utils/notification";
import { useWsStore, type LogLocation, type RaidState } from "@/store/ws-store";
import type { MyPageNotificationEntry } from "@/types/api/mypage";

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const account = session?.userInfo?.email ?? session?.user?.email ?? null;
  const token = session?.accessToken;
  const previousAccount = useRef<string | null | undefined>(undefined);
  const cursorRef = useRef(new LocationEventCursor());

  useEffect(() => {
    if (status === "loading" || previousAccount.current === account) return;
    previousAccount.current = account;
    cursorRef.current = new LocationEventCursor();
    useWsStore.getState().resetLocationSession();
  }, [account, status]);

  useEffect(() => {
    const host = process.env.NEXT_PUBLIC_REDIS_HOST;
    if (!account || !token || !host) {
      useWsStore.getState().setLocationConnection("disabled");
      return;
    }
    const client = new LocationRealtimeClient({
      host,
      getToken: async () => {
        const latest = await getSession();
        const latestAccount = latest?.userInfo?.email ?? latest?.user?.email;
        return latestAccount === account ? latest?.accessToken : undefined;
      },
      onStatus: (next, id) => useWsStore.getState().setLocationConnection(next, id),
      onMessage: (parsed) => {
        const store = useWsStore.getState();
        if (parsed.type === "init" && Array.isArray(parsed.notifications)) {
          store.setNotifications(parsed.notifications.map(normalizeNotificationMessage).filter((entry): entry is MyPageNotificationEntry => Boolean(entry)));
          return;
        }
        if (parsed.type === "message" || parsed.type === "notification") {
          const notification = normalizeNotificationMessage(parsed.data ?? parsed.payload);
          if (notification) store.prependNotification(notification);
          return;
        }
        const valid = (parsed.type === "wpf_location" && typeof parsed.payload === "string") ||
          (parsed.type === "wpf_raid_state" && isRaidState(parsed.payload)) ||
          (parsed.type === "wpf_log_location" && isLogLocation(parsed.payload));
        if (!valid) return;
        const metadata = cursorRef.current.accept(parsed);
        if (!metadata) return;
        if (metadata.replayed && parsed.type !== "wpf_raid_state" && store.latestRaidState?.value.is_active === false) return;
        if (parsed.type === "wpf_location" && typeof parsed.payload === "string") store.setLocation(parsed.payload, metadata);
        else if (parsed.type === "wpf_raid_state" && isRaidState(parsed.payload)) store.setRaidState(parsed.payload, metadata);
        else if (parsed.type === "wpf_log_location" && isLogLocation(parsed.payload)) store.setLogLocation(parsed.payload, metadata);
      },
    });
    client.start();
    const wake = () => { if (document.visibilityState === "visible") client.wake(); };
    window.addEventListener("online", wake);
    window.addEventListener("focus", wake);
    document.addEventListener("visibilitychange", wake);
    return () => {
      client.dispose();
      window.removeEventListener("online", wake);
      window.removeEventListener("focus", wake);
      document.removeEventListener("visibilitychange", wake);
    };
  }, [account, token]);

  return <>{children}</>;
}

function isLogLocation(value: unknown): value is LogLocation {
  if (!value || typeof value !== "object") {
    return false;
  }

  const location = value as Record<string, unknown>;
  return (
    (typeof location.map === "string" || location.map === null) &&
    typeof location.x === "number" &&
    typeof location.y === "number" &&
    typeof location.z === "number" &&
    typeof location.observed_at === "string"
  );
}

function isRaidState(value: unknown): value is RaidState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const state = value as Record<string, unknown>;
  return (
    (typeof state.map === "string" || state.map === null) &&
    (typeof state.started_at === "string" || state.started_at === null) &&
    typeof state.is_active === "boolean" &&
    typeof state.transit_count === "number"
  );
}
