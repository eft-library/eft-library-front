// store.ts
import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import type { ItemType } from "@/lib/func/itemFilterUtils";

export type AppStateType = {
  npcId: string;
  newItemFilter: ItemType[];
  eventNum: number;
  noticeNum: number;
  patchNotesNum: number;
};

export type AppActionsType = {
  setNpcId: (value: string) => void;
  setItemFilter: (value: ItemType[]) => void;
  setEventNum: (value: number) => void;
  setNoticeNum: (value: number) => void;
  setPatchNotesNum: (value: number) => void;
};

export type AppStoreType = AppStateType & AppActionsType;

export const defaultInitState: AppStateType = {
  npcId: "54cb50c76803fa8b248b4571",
  newItemFilter: [],
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
          setItemFilter: (value: ItemType[]) => set({ newItemFilter: value }),
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
