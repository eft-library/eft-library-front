import { useEffect } from "react";
import { wsStore } from "@/store/wsStore";

export const useWebSocket = (accessToken?: string) => {
  const setNotifications = wsStore((s) => s.setNotifications);
  const setWpfLocation = wsStore((s) => s.setLocation);

  useEffect(() => {
    if (!accessToken) return;

    const ws = new WebSocket(
      `wss://${process.env.NEXT_PUBLIC_REDIS_HOST}/ws?token=${accessToken}`
    );

    ws.onmessage = (event) => {
      const parsed = JSON.parse(event.data);

      switch (parsed.type) {
        case "init":
          setNotifications(parsed.notifications);
          break;

        case "message":
          setNotifications(parsed.data);
          break;

        case "wpf-user":
          setWpfLocation(parsed.payload);
          break;
      }
    };

    return () => ws.close();
  }, [accessToken]);
};
