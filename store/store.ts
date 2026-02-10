import { createStore } from "zustand";
import { persist } from "zustand/middleware";

export type AppStateType = {
  pageCategory: string;
};

export type AppActionsType = {
  setPageCategory: (value: string) => void;
};

export type AppStoreType = AppStateType & AppActionsType;

export const defaultInitState: AppStateType = {
  pageCategory: "issue",
};

export const createAppStore = (initState: AppStateType = defaultInitState) => {
  return createStore<AppStoreType>()(
    persist(
      (set) =>
        ({
          ...initState,
          setPageCategory: (value: string) => set({ pageCategory: value }),
        }) satisfies AppStoreType,
      {
        name: "app-store",
      },
    ),
  );
};
