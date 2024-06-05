// store.ts
import { createStore } from "zustand";
import { persist, devtools } from "zustand/middleware";

export type AppStateType = {
  bossId: string;
  allColumn: Record<string, any>;
  weaponCategory: string;
  npcId: string;
  itemFilter: any[];
};

export type AppActionsType = {
  setBossId: (value: string) => void;
  setColumn: (value: Record<string, any>) => void;
  setWeaponCategory: (value: string) => void;
  setNpcId: (value: string) => void;
  setItemFilter: (value: any[]) => void;
};

type ObjectType = {
  [key: string]: any;
};

export type AppStoreType = AppStateType & AppActionsType;

export const defaultInitState: AppStateType = {
  bossId: "RESHALA",
  allColumn: {},
  weaponCategory: "ALL",
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
            setColumn: (value: ObjectType) => set({ allColumn: value }),
            setWeaponCategory: (value: string) =>
              set({ weaponCategory: value }),
            setNpcId: (value: string) => set({ npcId: value }),
            setItemFilter: (value: any[]) => set({ itemFilter: value }),
          } satisfies AppStoreType),
        {
          name: "app-store",
          skipHydration: true,
        }
      )
    )
  );
};
