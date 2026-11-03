import { AuthenticatedApiError } from "./auth-client";

// Browser memory only; never persist credentials or cache user data on a CDN.
// Keys include the credential so switching accounts cannot reuse another user.
const reads = new Map<
  string,
  { promise: Promise<unknown>; expiresAt: number }
>();

export function privateRead<T>(
  path: string,
  accessToken: string,
  load: () => Promise<T>,
  ttl = 60_000,
): Promise<T> {
  if (typeof window === "undefined") return load();
  const key = `${accessToken}:${path}`;
  const existing = reads.get(key);
  if (existing && existing.expiresAt > Date.now())
    return existing.promise as Promise<T>;
  if (reads.size >= 100) reads.delete(reads.keys().next().value!);
  const entry = {
    promise: Promise.resolve<unknown>(undefined),
    expiresAt: Infinity,
  };
  reads.set(key, entry);
  entry.promise = Promise.resolve()
    .then(load)
    .then(
      (data) => {
        entry.expiresAt = Date.now() + ttl;
        return data;
      },
      (error: unknown) => {
        if (error instanceof AuthenticatedApiError && error.status === 429) {
          entry.expiresAt = Date.now() + error.retryAfterMs;
        } else if (reads.get(key) === entry) reads.delete(key);
        throw error;
      },
    );
  return entry.promise as Promise<T>;
}

export function invalidatePrivateRead(path: string, accessToken: string) {
  reads.delete(`${accessToken}:${path}`);
}
