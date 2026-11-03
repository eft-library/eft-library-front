import { isAuthenticationFailure } from "./auth-errors";
import { createHash } from "node:crypto";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import { getApiBaseUrl } from "@/lib/config/app-env";
import type { UserInfoResult } from "./session-recovery";

export const USER_INFO_TTL_MS = 60_000;
export const USER_INFO_RETRY_MS = 30_000;

// Private, process-local and bounded. Never use a shared public fetch cache for
// profiles. Hash the credential so cache keys do not retain bearer token text.
export function createUserInfoLoader(
  fetcher: typeof fetch = fetch,
  now = Date.now,
) {
  const cache = new Map<
    string,
    { promise: Promise<UserInfoResult>; expiresAt: number }
  >();
  return async function load(
    accessToken: string,
    force = false,
  ): Promise<UserInfoResult> {
    const key = createHash("sha256").update(accessToken).digest("hex");
    const existing = cache.get(key);
    if (!force && existing && existing.expiresAt > now())
      return existing.promise;
    if (cache.size >= 500) cache.delete(cache.keys().next().value!);
    const entry = {
      promise: Promise.resolve<UserInfoResult>({ status: "unavailable" }),
      expiresAt: Infinity,
    };
    cache.set(key, entry);
    entry.promise = (async (): Promise<UserInfoResult> => {
      let result: UserInfoResult = { status: "unavailable" };
      try {
        const response = await fetcher(
          `${getApiBaseUrl()}${apiEndpoints.userInfo}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            cache: "no-store",
            signal: AbortSignal.timeout(8000),
          },
        );
        const payload: unknown = await response.json().catch(() => null);
        if (isAuthenticationFailure(response.status, payload)) result = { status: "unauthorized" };
        else if (response.status === 404 && payload && typeof payload === "object" && "detail" in payload && payload.detail === "USER_NOT_FOUND") result = { status: "not-found" };
        else if (response.ok) {
          if (
            payload &&
            typeof payload === "object" &&
            "data" in payload &&
            payload.data &&
            typeof payload.data === "object" &&
            !Array.isArray(payload.data)
          ) {
            result = { status: "ok", data: payload.data };
          }
        }
      } catch {
        /* A temporary outage is not an authentication failure. */
      }
      entry.expiresAt =
        now() +
        (result.status === "ok" || result.status === "not-found"
          ? USER_INFO_TTL_MS
          : result.status === "unavailable"
            ? USER_INFO_RETRY_MS
            : 0);
      return result;
    })();
    return entry.promise;
  };
}

export const loadUserInfo = createUserInfoLoader();
