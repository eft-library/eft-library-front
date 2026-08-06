"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { MyPageNotificationEntry } from "@/types/api/mypage";

interface WsState {
  latestLocation: { value: string; receivedAt: number } | null;
  latestRaidState: { value: RaidState; receivedAt: number } | null;
  latestLogLocation: { value: LogLocation; receivedAt: number } | null;
  locationByMap: Record<string, string>;
  notifications: MyPageNotificationEntry[];
  setLocation: (location: string) => void;
  setRaidState: (raidState: RaidState) => void;
  setLogLocation: (location: LogLocation) => void;
  setLocationForMap: (mapKey: string, location: string) => void;
  setNotifications: (
    updater:
      | MyPageNotificationEntry[]
      | ((prev: MyPageNotificationEntry[]) => MyPageNotificationEntry[]),
  ) => void;
  prependNotification: (notification: MyPageNotificationEntry) => void;
}

export interface RaidState {
  map: string | null;
  started_at: string | null;
  is_active: boolean;
  transit_count: number;
}

export interface LogLocation {
  map: string | null;
  x: number;
  y: number;
  z: number;
  observed_at: string;
}

export const useWsStore = create<WsState>()(
  persist(
    (set) => ({
      latestLocation: null,
      latestRaidState: null,
      latestLogLocation: null,
      locationByMap: {},
      notifications: [],
      setLocation: (location) =>
        set({ latestLocation: { value: location, receivedAt: Date.now() } }),
      setRaidState: (raidState) =>
        set({ latestRaidState: { value: raidState, receivedAt: Date.now() } }),
      setLogLocation: (location) =>
        set({ latestLogLocation: { value: location, receivedAt: Date.now() } }),
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
