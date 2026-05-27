import { createStore } from "zustand";
import { persist } from "zustand/middleware";

import type { Locale } from "@/i18n/config";

export interface NavigationState {
  activeCommunityCategory: string;
  uiLocale: Locale;
}

export interface NavigationActions {
  setActiveCommunityCategory: (value: string) => void;
  setUiLocale: (value: Locale) => void;
  resetNavigationState: () => void;
}

export type AppStoreState = NavigationState & NavigationActions;

export const defaultNavigationState: NavigationState = {
  activeCommunityCategory: "all",
  uiLocale: "ko",
};

export function createAppStore(
  initState: NavigationState = defaultNavigationState,
) {
  return createStore<AppStoreState>()(
    persist(
      (set) => ({
        ...initState,
        setActiveCommunityCategory: (value: string) =>
          set({ activeCommunityCategory: value }),
        resetNavigationState: () => set(defaultNavigationState),
        setUiLocale: (value: "ko" | "en" | "ja") => set({ uiLocale: value }),
      }),
      {
        name: "eft-library-front-migration-store",
        partialize: (state) => ({
          activeCommunityCategory: state.activeCommunityCategory,
          uiLocale: state.uiLocale,
        }),
      },
    ),
  );
}
