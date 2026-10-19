"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

/** Recheck on return/navigation and before token expiry; coalesce focus events. */
export function SessionHealthWatcher() {
  const { data: session, status, update } = useSession();
  const pathname = usePathname();
  const updateRef = useRef(update);
  const running = useRef(false);
  const lastCheck = useRef(0);
  useEffect(() => { updateRef.current = update; }, [update]);

  useEffect(() => {
    if (status !== "authenticated" || session?.error === "ReauthenticationRequired") return;
    const check = async () => {
      if (running.current || document.visibilityState === "hidden" || !navigator.onLine || Date.now() - lastCheck.current < 10_000) return;
      running.current = true;
      lastCheck.current = Date.now();
      try { await updateRef.current(); } catch { /* The next focus/online/timer retries. */ }
      finally { running.current = false; }
    };
    void check();
    window.addEventListener("focus", check);
    window.addEventListener("online", check);
    document.addEventListener("visibilitychange", check);
    const transient = Boolean(session?.error);
    const delay = transient ? 30_000 : session?.accessTokenExpires
      ? Math.min(5 * 60_000, Math.max(30_000, session.accessTokenExpires - Date.now() - 60_000)) : undefined;
    const timer = delay === undefined ? undefined : setInterval(check, Math.min(delay, 2_147_483_647));
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", check);
      window.removeEventListener("online", check);
      document.removeEventListener("visibilitychange", check);
    };
  }, [pathname, status, session?.accessTokenExpires, session?.error]);
  return null;
}
