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
  medicalCategory: string;
  ammoCategory: string;
  lootCategory: string;
  hideoutCategory: string;
  eventNum: number;
};

export type AppActionsType = {
  setBossId: (value: string) => void;
  setWeaponCategory: (value: string) => void;
  setKeyCategory: (value: string) => void;
  setNpcId: (value: string) => void;
  setItemFilter: (value: any[]) => void;
  setMedicalCategory: (value: string) => void;
  setAmmoCategory: (value: string) => void;
  setLootCategory: (value: string) => void;
  setHideoutCategory: (value: string) => void;
  setEventNum: (value: number) => void;
};

export type AppStoreType = AppStateType & AppActionsType;

export const defaultInitState: AppStateType = {
  bossId: "RESHALA",
  weaponCategory: "ALL",
  keyCategory: "CUSTOMS",
  npcId: "PRAPOR",
  medicalCategory: "ALL",
  ammoCategory: "ALL",
  lootCategory: "ALL",
  hideoutCategory: "5d388e97081959000a123acf",
  itemFilter: [],
  eventNum: 1,
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
            setMedicalCategory: (value: string) =>
              set({ medicalCategory: value }),
            setAmmoCategory: (value: string) => set({ ammoCategory: value }),
            setLootCategory: (value: string) => set({ lootCategory: value }),
            setHideoutCategory: (value: string) =>
              set({ hideoutCategory: value }),
            setEventNum: (value: number) => set({ eventNum: value }),
          } satisfies AppStoreType),
        {
          name: "app-store",
        }
      )
    )
  );
};
