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
  npcId: string;
  itemFilter: Item[];
  eventNum: number;
  noticeNum: number;
  patchNotesNum: number;
};

export type AppActionsType = {
  setNpcId: (value: string) => void;
  setItemFilter: (value: Item[]) => void;
  setEventNum: (value: number) => void;
  setNoticeNum: (value: number) => void;
  setPatchNotesNum: (value: number) => void;
};

export type AppStoreType = AppStateType & AppActionsType;

export const defaultInitState: AppStateType = {
  npcId: "54cb50c76803fa8b248b4571",
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
          setNpcId: (value: string) => set({ npcId: value }),
          setItemFilter: (value: Item[]) => set({ itemFilter: value }),
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
