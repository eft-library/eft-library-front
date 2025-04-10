// store.ts
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

interface SubItem {
  value: string;
  kr: string;
  en: string;
}

interface Item {
  value: string;
  kr: string;
  en: string;
  sub: SubItem[];
}

export type AppStateType = {
  weaponCategory: string;
  keyCategory: string;
  npcId: string;
  itemFilter: Item[];
  medicalCategory: string;
  ammoCategory: string;
  lootCategory: string;
  eventNum: number;
  noticeNum: number;
  patchNotesNum: number;
};

export type AppActionsType = {
  setWeaponCategory: (value: string) => void;
  setKeyCategory: (value: string) => void;
  setNpcId: (value: string) => void;
  setItemFilter: (value: Item[]) => void;
  setMedicalCategory: (value: string) => void;
  setAmmoCategory: (value: string) => void;
  setLootCategory: (value: string) => void;
  setEventNum: (value: number) => void;
  setNoticeNum: (value: number) => void;
  setPatchNotesNum: (value: number) => void;
};

export type AppStoreType = AppStateType & AppActionsType;

export const defaultInitState: AppStateType = {
  weaponCategory: "ALL",
  keyCategory: "CUSTOMS",
  npcId: "54cb50c76803fa8b248b4571",
  medicalCategory: "ALL",
  ammoCategory: "ALL",
  lootCategory: "ALL",
  itemFilter: [],
  noticeNum: 1,
  eventNum: 1,
  patchNotesNum: 1,
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
          setItemFilter: (value: Item[]) => set({ itemFilter: value }),
          setMedicalCategory: (value: string) =>
            set({ medicalCategory: value }),
          setAmmoCategory: (value: string) => set({ ammoCategory: value }),
          setLootCategory: (value: string) => set({ lootCategory: value }),
          setEventNum: (value: number) => set({ eventNum: value }),
          setPatchNotesNum: (value: number) => set({ patchNotesNum: value }),
          setNoticeNum: (value: number) => set({ noticeNum: value }),
        } satisfies AppStoreType),
      {
        name: "app-store",
      }
    )
  );
};
