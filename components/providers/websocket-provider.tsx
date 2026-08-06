"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

import { normalizeNotificationMessage } from "@/lib/utils/notification";
import { useWsStore, type LogLocation, type RaidState } from "@/store/ws-store";
import type { MyPageNotificationEntry } from "@/types/api/mypage";

interface WebSocketMessage {
  type?: string;
  payload?: unknown;
  data?: unknown;
  notifications?: unknown;
}

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setLocation = useWsStore((state) => state.setLocation);
  const setRaidState = useWsStore((state) => state.setRaidState);
  const setLogLocation = useWsStore((state) => state.setLogLocation);
  const setNotifications = useWsStore((state) => state.setNotifications);
  const prependNotification = useWsStore((state) => state.prependNotification);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!session?.accessToken || !process.env.NEXT_PUBLIC_REDIS_HOST) {
      return;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    const ws = new WebSocket(
      `wss://${process.env.NEXT_PUBLIC_REDIS_HOST}/ws?token=${session.accessToken}`,
    );
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data) as WebSocketMessage;

        if (parsed.type === "init" && Array.isArray(parsed.notifications)) {
          const notifications = parsed.notifications
            .map(normalizeNotificationMessage)
            .filter((entry): entry is MyPageNotificationEntry => Boolean(entry));

          setNotifications(notifications);
          return;
        }

        if (parsed.type === "message" || parsed.type === "notification") {
          const notification = normalizeNotificationMessage(
            parsed.data ?? parsed.payload,
          );

          if (notification) {
            prependNotification(notification);
          }

          return;
        }

        if (
          parsed.type === "wpf_location" &&
          typeof parsed.payload === "string"
        ) {
          setLocation(parsed.payload);
          return;
        }

        if (parsed.type === "wpf_raid_state" && isRaidState(parsed.payload)) {
          setRaidState(parsed.payload);
          return;
        }

        if (parsed.type === "wpf_log_location" && isLogLocation(parsed.payload)) {
          setLogLocation(parsed.payload);
        }
      } catch {
        // Ignore non-JSON keepalive or malformed websocket messages.
      }
    };

    const pingInterval = window.setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send("ping");
      }
    }, 30000);

    return () => {
      window.clearInterval(pingInterval);
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
      wsRef.current = null;
    };
  }, [prependNotification, session?.accessToken, setLocation, setLogLocation, setNotifications, setRaidState]);

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
