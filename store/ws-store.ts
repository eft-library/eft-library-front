"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { MyPageNotificationEntry } from "@/types/api/mypage";

interface WsState {
  latestLocation: { value: string; receivedAt: number } | null;
  locationByMap: Record<string, string>;
  notifications: MyPageNotificationEntry[];
  setLocation: (location: string) => void;
  setLocationForMap: (mapKey: string, location: string) => void;
  setNotifications: (
    updater:
      | MyPageNotificationEntry[]
      | ((prev: MyPageNotificationEntry[]) => MyPageNotificationEntry[]),
  ) => void;
  prependNotification: (notification: MyPageNotificationEntry) => void;
}

export const useWsStore = create<WsState>()(
  persist(
    (set) => ({
      latestLocation: null,
      locationByMap: {},
      notifications: [],
      setLocation: (location) =>
        set({ latestLocation: { value: location, receivedAt: Date.now() } }),
      setLocationForMap: (mapKey, location) =>
        set((state) => ({
          locationByMap: {
            ...state.locationByMap,
            [mapKey]: location,
          },
        })),
      setNotifications: (updater) =>
        set((state) => ({
          notifications:
            typeof updater === "function"
              ? updater(state.notifications)
              : updater,
        })),
      prependNotification: (notification) =>
        set((state) => {
          const exists = state.notifications.some(
            (entry) => entry.id === notification.id,
          );

          if (exists) {
            return state;
          }

          return { notifications: [notification, ...state.notifications] };
        }),
    }),
    {
      name: "ws-store",
      partialize: (state) => ({ locationByMap: state.locationByMap }),
    },
  ),
);
