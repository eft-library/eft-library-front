"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider refetchInterval={30 * 60} refetchOnWindowFocus>
      {children}
    </SessionProvider>
  );
}
