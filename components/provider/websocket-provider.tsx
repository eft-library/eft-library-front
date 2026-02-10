"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { wsStore } from "@/store/wsStore";
import { NotificationDataTypes } from "@/components/custom/NavBar/nav-bar.types";

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const setNotifications = wsStore((s) => s.setNotifications);
  const setWpfLocation = wsStore((s) => s.setLocation);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!session?.accessToken) return;
    if (wsRef.current) return;

    const ws = new WebSocket(
      `wss://${process.env.NEXT_PUBLIC_REDIS_HOST}/ws?token=${session.accessToken}`,
    );

    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const parsed = JSON.parse(event.data);

      switch (parsed.type) {
        case "init": {
          const initial = parsed.notifications as NotificationDataTypes[];
          setNotifications(initial);
          break;
        }

        case "message": {
          const newNotification = parsed.data as NotificationDataTypes;
          setNotifications((prev = []) => [...prev, newNotification]);
          break;
        }

        case "wpf_location":
          setWpfLocation(parsed.payload);
          break;
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
    };
  }, [session?.accessToken, setNotifications, setWpfLocation]);

  return <>{children}</>;
}
