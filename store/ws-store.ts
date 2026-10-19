"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { MyPageNotificationEntry } from "@/types/api/mypage";
import type { LocationConnectionStatus, LocationEventMetadata } from "@/lib/websocket/location-client";

interface LocationValue<T> { value: T; receivedAt: number; metadata?: LocationEventMetadata }

interface WsState {
  latestLocation: LocationValue<string> | null;
  latestRaidState: LocationValue<RaidState> | null;
  latestLogLocation: LocationValue<LogLocation> | null;
  locationConnection: LocationConnectionStatus;
  locationConnectionId: string | null;
  locationSession: number;
  autoMapNavigationEvent: string | null;
  autoMapNavigationTime: number;
  setAutoMapNavigationEvent: (event: string | null, time?: number) => void;
  setLocationConnection: (status: LocationConnectionStatus, id?: string) => void;
  resetLocationSession: () => void;
  locationByMap: Record<string, string>;
  notifications: MyPageNotificationEntry[];
  setLocation: (location: string, metadata?: LocationEventMetadata) => void;
  setRaidState: (raidState: RaidState, metadata?: LocationEventMetadata) => void;
  setLogLocation: (location: LogLocation, metadata?: LocationEventMetadata) => void;
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
  session_id?: string | null;
  timer_observed_at?: string | null;
  raid_ends_at?: string | null;
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
      locationConnection: "disabled",
      locationConnectionId: null,
      locationSession: 0,
      autoMapNavigationEvent: null,
      autoMapNavigationTime: -Infinity,
      setAutoMapNavigationEvent: (event, time) => set({ autoMapNavigationEvent: event, autoMapNavigationTime: event === null ? -Infinity : time ?? Date.now() }),
      setLocationConnection: (status, id) => set((state) => ({ locationConnection: status, locationConnectionId: id ?? (status === "ready" || status === "reconnecting" ? state.locationConnectionId : null) })),
      resetLocationSession: () => set((state) => ({ latestLocation: null, latestRaidState: null, latestLogLocation: null, locationByMap: {}, locationSession: state.locationSession + 1, autoMapNavigationEvent: null, autoMapNavigationTime: -Infinity, locationConnectionId: null, locationConnection: "disabled", notifications: [] })),
      setLocation: (location, metadata) =>
        set({ latestLocation: { value: location, receivedAt: Date.now(), metadata }, latestLogLocation: null }),
      setRaidState: (raidState, metadata) =>
        set((state) => {
          const previous = state.latestRaidState?.value;
          const contextChanged = previous && (previous.map !== raidState.map || previous.started_at !== raidState.started_at || (previous.session_id ?? null) !== (raidState.session_id ?? null));
          return { latestRaidState: { value: raidState, receivedAt: Date.now(), metadata }, ...(!raidState.is_active || contextChanged ? { latestLocation: null, latestLogLocation: null, locationByMap: {} } : {}) };
        }),
      setLogLocation: (location, metadata) =>
        set({ latestLogLocation: { value: location, receivedAt: Date.now(), metadata }, latestLocation: null }),
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
