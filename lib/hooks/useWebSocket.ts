import { useEffect } from "react";
import { wsStore } from "@/store/wsStore";
import { NotificationDataTypes } from "@/components/custom/NavBar/nav-bar.types";

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

    return () => ws.close();
  }, [accessToken]);
};
