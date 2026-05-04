"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WsState {
  location: string;
  setLocation: (location: string) => void;
}

export const useWsStore = create<WsState>()(
  persist(
    (set) => ({
      location: "",
      setLocation: (location) => set({ location }),
    }),
    {
      name: "ws-store",
      partialize: (state) => ({ location: state.location }),
    },
  ),
);
