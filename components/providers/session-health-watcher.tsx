"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { registerAuthRecovery, resetAuthRecovery, type AuthRecoveryResult } from "@/lib/auth/auth-recovery";

/** Recheck on return/navigation and before token expiry; coalesce focus events. */
export function SessionHealthWatcher() {
  const { data: session, status, update } = useSession();
  const pathname = usePathname();
  const statusRef = useRef(status);
  const running = useRef(false);
  const lastCheck = useRef(0);
  const updateRef = useRef(update);
  useEffect(() => { updateRef.current = update; }, [update]);
  const sessionRef = useRef(session);
  const previousToken = useRef(session?.accessToken);
  const account = session?.userInfo?.email ?? session?.user?.email ?? null;
  useEffect(() => {
    sessionRef.current = session;
    statusRef.current = status;
    if (previousToken.current !== session?.accessToken && !session?.error) resetAuthRecovery(session?.accessToken);
    previousToken.current = session?.accessToken;
  }, [session, status]);
  useEffect(() => {
    if (!account) return;
    return registerAuthRecovery(async (failedToken, terminal): Promise<AuthRecoveryResult> => {
      const initial = sessionRef.current;
      if (initial?.accessToken !== failedToken) return { status: "unavailable" };
      // NextAuth's update() returns undefined while another update is loading.
      // Wait for ordinary health/profile checks before requesting forced repair.
      for (let i = 0; i < 160 && (running.current || statusRef.current === "loading"); i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      if (running.current || statusRef.current === "loading") return { status: "unavailable" };
      const current = sessionRef.current;
      const owner = current?.userInfo?.email ?? current?.user?.email;
      if (owner !== account) return { status: "unavailable" };
      if (current?.accessToken !== failedToken) {
        return current?.accessToken && !current.error && current.accessTokenExpires && current.accessTokenExpires > Date.now()
          ? { status: "refreshed", accessToken: current.accessToken } : { status: "unavailable" };
      }
      const latest = await updateRef.current(terminal ? { rejectAccessToken: failedToken } : { refreshAccessToken: true, failedAccessToken: failedToken });
      const currentAccount = sessionRef.current?.userInfo?.email ?? sessionRef.current?.user?.email;
      const latestAccount = latest?.userInfo?.email ?? latest?.user?.email;
      if (currentAccount !== account || latestAccount !== account) return { status: "unavailable" };
      if (latest?.error === "ReauthenticationRequired" || latest?.error === "UserNotRegistered") return { status: "reauthentication-required" };
      if (!latest?.accessToken || latest.error || !latest.accessTokenExpires || latest.accessTokenExpires <= Date.now()) return { status: "unavailable" };
      return { status: "refreshed", accessToken: latest.accessToken };
    });
  }, [account]);

  useEffect(() => {
    if (status !== "authenticated" || session?.error === "ReauthenticationRequired" || session?.error === "UserNotRegistered") return;
    const check = async () => {
      const now = Date.now();
      const nearExpiry = Boolean(session?.accessTokenExpires && session.accessTokenExpires - now <= 120_000);
      const minimumGap = session?.error ? 30_000 : nearExpiry ? 10_000 : 60_000;
      if (running.current || document.visibilityState === "hidden" || !navigator.onLine || now - lastCheck.current < minimumGap) return;
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
