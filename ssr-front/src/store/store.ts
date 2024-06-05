import { createContext, useContext } from "react";
import { createStore, useStore as useZustandStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";

export interface StoreInterface {
  bossId: string;
  setBossId: (value: string) => void;
  allColumn: Record<string, any>;
  setColumn: (value: Record<string, any>) => void;
  weaponCategory: string;
  setWeaponCategory: (value: string) => void;
  npcId: string;
  setNpcId: (value: string) => void;
  itemFilter: any[];
  setItemFilter: (value: any[]) => void;
}

function getDefaultInitialState() {
  return {
    bossId: "RESHALA",
    allColumn: {},
    weaponCategory: "ALL",
    npcId: "PRAPOR",
    itemFilter: [],
  } as const;
}
