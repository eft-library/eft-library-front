"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

import { useWsStore } from "@/store/ws-store";

interface WebSocketMessage {
  type?: string;
  payload?: string;
}

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setLocation = useWsStore((state) => state.setLocation);
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
        if (parsed.type === "wpf_location" && typeof parsed.payload === "string") {
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
  }, [session?.accessToken, setLocation]);

  return <>{children}</>;
}
