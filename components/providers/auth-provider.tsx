"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { SessionHealthWatcher } from "./session-health-watcher";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <SessionHealthWatcher />
      {children}
    </SessionProvider>
  );
}
