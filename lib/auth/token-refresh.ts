import type { JWT } from "next-auth/jwt";

const refreshing = new Map<string, Promise<JWT>>();

/** No provider response or token values are written to logs. */
export async function refreshGoogleAccessToken(token: JWT, fetcher: typeof fetch = fetch, now = Date.now()): Promise<JWT> {
  if (!token.refreshToken) return { ...token, error: "ReauthenticationRequired" };
  const key = `${token.refreshToken}:${token.accessToken}`;
  const existing = refreshing.get(key);
  if (existing) return existing;
  const attempt = (async (): Promise<JWT> => {
    const unavailable = (): JWT => ({ ...token, error: "AccessTokenRefreshUnavailable", refreshRetryAt: now + 30_000 });
    try {
      const response = await fetcher("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_ID ?? "",
          client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET ?? "",
          grant_type: "refresh_token",
          refresh_token: token.refreshToken!,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      const data: unknown = await response.json();
      if (!data || typeof data !== "object" || Array.isArray(data)) return unavailable();
      const result = data as Record<string, unknown>;
      if (!response.ok) {
        if (response.status === 400 && result.error === "invalid_grant") {
          return { ...token, error: "ReauthenticationRequired", refreshRetryAt: undefined };
        }
        return unavailable();
      }
      if (typeof result.access_token !== "string" || !result.access_token ||
          typeof result.expires_in !== "number" || !Number.isFinite(result.expires_in) || result.expires_in <= 0) return unavailable();
      return {
        ...token, accessToken: result.access_token,
        accessTokenExpires: now + result.expires_in * 1000,
        refreshToken: typeof result.refresh_token === "string" && result.refresh_token ? result.refresh_token : token.refreshToken,
        error: undefined, refreshRetryAt: now + 30_000,
      };
    } catch {
      return unavailable();
    }
  })();
  refreshing.set(key, attempt);
  try { return await attempt; } finally { refreshing.delete(key); }
}
