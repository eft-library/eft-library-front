import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import type { ItemType } from "@/lib/func/itemFilterUtils";

export type AppStateType = {
  npcId: string;
  newItemFilter: ItemType[];
  pageCategory: string;
};

export type AppActionsType = {
  setNpcId: (value: string) => void;
  setItemFilter: (value: ItemType[]) => void;
  setPageCategory: (value: string) => void;
};

export type AppStoreType = AppStateType & AppActionsType;

export const defaultInitState: AppStateType = {
  npcId: "54cb50c76803fa8b248b4571",
  newItemFilter: [],
  pageCategory: "issue",
};

export const createAppStore = (initState: AppStateType = defaultInitState) => {
  return createStore<AppStoreType>()(
    persist(
      (set) =>
        ({
          ...initState,
          setNpcId: (value: string) => set({ npcId: value }),
          setItemFilter: (value: ItemType[]) => set({ newItemFilter: value }),
          setPageCategory: (value: string) => set({ pageCategory: value }),
        } satisfies AppStoreType),
      {
        name: "app-store",
      }
    )
  );
};
