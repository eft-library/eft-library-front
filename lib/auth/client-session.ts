"use client";

import { getSession } from "next-auth/react";

let pending: ReturnType<typeof getSession> | null = null;

// Token lookups for sockets must not tell every other tab to reload its session.
export function getSessionQuietly() {
  if (pending) return pending;
  pending = getSession({ broadcast: false }).finally(() => {
    pending = null;
  });
  return pending;
}
