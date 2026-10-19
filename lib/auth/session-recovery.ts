import type { JWT } from "next-auth/jwt";

export type UserInfoResult =
  | { status: "ok"; data: NonNullable<JWT["userInfo"]> }
  | { status: "unauthorized" | "unavailable" };

/** A user-info 401 is authentication failure, not an upstream outage. */
export async function verifyUserSession(
  token: JWT,
  load: (accessToken: string) => Promise<UserInfoResult>,
  refresh: (token: JWT) => Promise<JWT>,
  now = Date.now(),
  alreadyRefreshed = false,
): Promise<JWT> {
  if (token.error === "ReauthenticationRequired" || !token.accessToken || !token.accessTokenExpires || token.accessTokenExpires <= now) return token;
  let current = token;
  let info = await load(current.accessToken!);
  if (info.status === "unauthorized") {
    if (alreadyRefreshed) return { ...current, accessToken: "", accessTokenExpires: 0, error: "ReauthenticationRequired" };
    if (current.refreshRetryAt && now < current.refreshRetryAt) {
      return { ...current, accessToken: "", accessTokenExpires: 0, error: "AccessTokenRefreshUnavailable" };
    }
    current = await refresh(current);
    if (current.error || !current.accessToken) return { ...current, accessToken: "", accessTokenExpires: 0 };
    info = await load(current.accessToken);
    if (info.status === "unauthorized") return { ...current, accessToken: "", accessTokenExpires: 0, error: "ReauthenticationRequired" };
  }
  if (info.status === "unavailable") return { ...current, error: current.error ?? "UserInfoUnavailable" };
  if (info.status !== "ok") return current;
  return { ...current, userInfo: info.data, nickname: info.data.nickname ?? null,
    error: current.error === "AccessTokenRefreshUnavailable" ? current.error : undefined };
}
