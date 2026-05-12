"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

import { normalizeNotificationMessage } from "@/lib/utils/notification";
import { useWsStore } from "@/store/ws-store";
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
  }, [prependNotification, session?.accessToken, setLocation, setNotifications]);

  return <>{children}</>;
}
