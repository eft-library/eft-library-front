import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import type { ItemType } from "@/lib/func/itemFilterUtils";

export type AppStateType = {
  npcId: string;
  newItemFilter: ItemType[];
};

export type AppActionsType = {
  setNpcId: (value: string) => void;
  setItemFilter: (value: ItemType[]) => void;
};

export type AppStoreType = AppStateType & AppActionsType;

export const defaultInitState: AppStateType = {
  npcId: "54cb50c76803fa8b248b4571",
  newItemFilter: [],
};

export const createAppStore = (initState: AppStateType = defaultInitState) => {
  return createStore<AppStoreType>()(
    persist(
      (set) =>
        ({
          ...initState,
          setNpcId: (value: string) => set({ npcId: value }),
          setItemFilter: (value: ItemType[]) => set({ newItemFilter: value }),
        } satisfies AppStoreType),
      {
        name: "app-store",
      }
    )
  );
};
