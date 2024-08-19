// store.ts
import { createStore } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { Item, UserProfile } from "@/types/types";

export type AppStateType = {
  weaponCategory: string;
  keyCategory: string;
  npcId: string;
  itemFilter: Item[];
  medicalCategory: string;
  ammoCategory: string;
  lootCategory: string;
  hideoutCategory: string;
  eventNum: number;
  patchNotesNum: number;
  user: UserProfile;
};

export type AppActionsType = {
  setWeaponCategory: (value: string) => void;
  setKeyCategory: (value: string) => void;
  setNpcId: (value: string) => void;
  setItemFilter: (value: any[]) => void;
  setMedicalCategory: (value: string) => void;
  setAmmoCategory: (value: string) => void;
  setLootCategory: (value: string) => void;
  setHideoutCategory: (value: string) => void;
  setEventNum: (value: number) => void;
  setPatchNotesNum: (value: number) => void;
  setUser: (value: UserProfile) => void;
};

export type AppStoreType = AppStateType & AppActionsType;

export const defaultInitState: AppStateType = {
  weaponCategory: "ALL",
  keyCategory: "CUSTOMS",
  npcId: "PRAPOR",
  medicalCategory: "ALL",
  ammoCategory: "ALL",
  lootCategory: "ALL",
  hideoutCategory: "5d388e97081959000a123acf",
  itemFilter: [],
  eventNum: 1,
  patchNotesNum: 1,
  user: null,
};

export const createAppStore = (initState: AppStateType = defaultInitState) => {
  return createStore<AppStoreType>()(
    persist(
      (set) =>
        ({
          ...initState,
          setWeaponCategory: (value: string) => set({ weaponCategory: value }),
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
          setPatchNotesNum: (value: number) => set({ patchNotesNum: value }),
          setUser: (value: UserProfile) => set({ user: value }),
        } satisfies AppStoreType),
      {
        name: "app-store",
      }
    )
  );
};
