// store.ts
import { createStore } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { Item } from "@/types/types";

export type AppStateType = {
  bossId: string;
  weaponCategory: string;
  keyCategory: string;
  npcId: string;
  itemFilter: Item[];
};

export type AppActionsType = {
  setBossId: (value: string) => void;
  setWeaponCategory: (value: string) => void;
  setKeyCategory: (value: string) => void;
  setNpcId: (value: string) => void;
  setItemFilter: (value: any[]) => void;
};

export type AppStoreType = AppStateType & AppActionsType;

export const defaultInitState: AppStateType = {
  bossId: "RESHALA",
  weaponCategory: "ALL",
  keyCategory: "CUSTOMS",
  npcId: "PRAPOR",
  itemFilter: [],
};

export const createAppStore = (initState: AppStateType = defaultInitState) => {
  return createStore<AppStoreType>()(
    devtools(
      persist(
        (set) =>
          ({
            ...initState,
            setBossId: (value: string) => set({ bossId: value }),
            setWeaponCategory: (value: string) =>
              set({ weaponCategory: value }),
            setKeyCategory: (value: string) => set({ keyCategory: value }),
            setNpcId: (value: string) => set({ npcId: value }),
            setItemFilter: (value: any[]) => set({ itemFilter: value }),
          } satisfies AppStoreType),
        {
          name: "app-store",
        }
      )
    )
  );
};
