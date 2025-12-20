import { NotificationDataTypes } from "@/components/custom/NavBar/nav-bar.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WsState {
  notifications: NotificationDataTypes[];
  location: string;

  setNotifications: (n: NotificationDataTypes[]) => void;
  setLocation: (n: string) => void;
}

export const wsStore = create<WsState>()(
  persist(
    (set) => ({
      notifications: [],
      location: "",

      setNotifications: (n) => set({ notifications: n }),
      setLocation: (n) => set({ location: n }),
    }),
    {
      name: "ws-store",
      partialize: (state) => ({
        location: state.location,
      }),
    }
  )
);
