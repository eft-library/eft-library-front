import { isAuthenticationFailure } from "./auth-errors";
export type AuthRecoveryState =
  "idle" | "recovering" | "unavailable" | "reauthentication-required";
export type AuthRecoveryResult =
  | { status: "refreshed"; accessToken: string }
  | { status: "unavailable" | "reauthentication-required" };
type Handler = (
  failedToken: string,
  terminal?: boolean,
) => Promise<AuthRecoveryResult>;
let handler: Handler | null = null;
let state: AuthRecoveryState = "idle";
let generation = 0;
let active: { token: string; promise: Promise<AuthRecoveryResult> } | null =
  null;
const listeners = new Set<() => void>();
const recent = new Map<
  string,
  { result: AuthRecoveryResult; expiresAt: number }
>();
export const getAuthRecoveryState = () => state;
export const getServerAuthRecoveryState = (): AuthRecoveryState => "idle";
export function subscribeAuthRecovery(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function setState(next: AuthRecoveryState) {
  if (state !== next) {
    state = next;
    listeners.forEach((listener) => listener());
  }
}
export function resetAuthRecovery(accessToken?: string) {
  if (!accessToken || !recent.has(accessToken)) recent.clear();
  setState("idle");
}
export function registerAuthRecovery(next: Handler) {
  handler = next;
  generation++;
  recent.clear();
  active = null;
  setState("idle");
  return () => {
    if (handler === next) {
      handler = null;
      generation++;
      recent.clear();
      active = null;
      setState("idle");
    }
  };
}
export async function rejectAuthentication(failedToken?: string) {
  setState("reauthentication-required");
  // Persist a confirmed rejection in the signed session too, so a reload does
  // not restore a misleading healthy login from the old cookie.
  if (failedToken && handler) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        handler(failedToken, true),
        new Promise<void>((resolve) => {
          timer = setTimeout(resolve, 12_000);
        }),
      ]);
    } catch {
      /* The local terminal state remains visible. */
    } finally {
      clearTimeout(timer);
    }
  }
}
export function recoverAuthentication(
  failedToken: string,
): Promise<AuthRecoveryResult> {
  if (typeof window === "undefined" || !handler)
    return Promise.resolve({ status: "unavailable" });
  if (state === "reauthentication-required")
    return Promise.resolve({ status: "reauthentication-required" });
  if (active) return active.promise;
  const cached = recent.get(failedToken);
  if (cached && cached.expiresAt > Date.now())
    return Promise.resolve(cached.result);
  const epoch = generation;
  const run = handler;
  setState("recovering");
  const request = {
    token: failedToken,
    promise: Promise.resolve<AuthRecoveryResult>({ status: "unavailable" }),
  };
  active = request;
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<AuthRecoveryResult>((resolve) => {
    timer = setTimeout(() => resolve({ status: "unavailable" }), 12_000);
  });
  request.promise = Promise.race([
    Promise.resolve().then(() => run(failedToken)),
    timeout,
  ])
    .catch((): AuthRecoveryResult => ({ status: "unavailable" }))
    .then((result) => {
      if (epoch !== generation) return { status: "unavailable" } as const;
      if (recent.size >= 20) recent.delete(recent.keys().next().value!);
      recent.set(failedToken, {
        result,
        expiresAt: Date.now() + (result.status === "refreshed" ? 5000 : 30_000),
      });
      if (result.status === "refreshed") {
        recent.set(result.accessToken, {
          result,
          expiresAt: Date.now() + 30_000,
        });
      }
      setState(result.status === "refreshed" ? "idle" : result.status);
      return result;
    })
    .finally(() => {
      clearTimeout(timer);
      if (active === request) active = null;
    });
  return request.promise;
}

async function authFailure(response: Response) {
  let body: unknown;
  try {
    body = await response.clone().json();
  } catch {
    /* Empty error responses still carry an HTTP status. */
  }
  return isAuthenticationFailure(response.status, body);
}
export async function fetchWithAuthRecovery(
  url: string,
  accessToken: string,
  init: RequestInit,
): Promise<Response> {
  if (
    accessToken &&
    typeof window !== "undefined" &&
    state === "reauthentication-required"
  ) {
    return Response.json(
      { status: 401, msg: "LOGIN_REQUIRED", data: null },
      { status: 401 },
    );
  }
  const send = (token: string) => {
    const headers = new Headers(init.headers);
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return fetch(url, { ...init, headers });
  };
  const response = await send(accessToken);
  if (!accessToken || !(await authFailure(response))) return response;
  init.signal?.throwIfAborted();
  const recovered = await recoverAuthentication(accessToken);
  init.signal?.throwIfAborted();
  const safe = ["GET", "HEAD"].includes((init.method ?? "GET").toUpperCase());
  if (recovered.status !== "refreshed" || !safe) return response;
  const retried = await send(recovered.accessToken);
  if (await authFailure(retried))
    await rejectAuthentication(recovered.accessToken);
  return retried;
}
