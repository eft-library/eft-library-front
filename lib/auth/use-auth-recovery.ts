"use client";
import { useSyncExternalStore } from "react";
import {
  getAuthRecoveryState,
  getServerAuthRecoveryState,
  subscribeAuthRecovery,
} from "./auth-recovery";
export function useAuthRecovery() {
  return useSyncExternalStore(
    subscribeAuthRecovery,
    getAuthRecoveryState,
    getServerAuthRecoveryState,
  );
}
