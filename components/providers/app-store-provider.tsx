"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore, type StoreApi } from "zustand";

import {
  createAppStore,
  type NavigationState,
  type AppStoreState,
} from "@/store/app-store";

const AppStoreContext = createContext<StoreApi<AppStoreState> | null>(null);

interface AppStoreProviderProps {
  children: ReactNode;
  initialState?: NavigationState;
}

export function AppStoreProvider({
  children,
  initialState,
}: AppStoreProviderProps) {
  const storeRef = useRef<StoreApi<AppStoreState>>(null);

  if (!storeRef.current) {
    storeRef.current = createAppStore(initialState);
  }

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore<T>(selector: (store: AppStoreState) => T): T {
  const appStoreContext = useContext(AppStoreContext);

  if (!appStoreContext) {
    throw new Error("useAppStore must be used within AppStoreProvider");
  }

  return useStore(appStoreContext, selector);
}
