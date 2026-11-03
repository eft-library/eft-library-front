# Session and request load

- `verifyUserSession` reuses a successful user-info check for 60 seconds using a signed JWT timestamp. Ordinary session reads do not force a profile refresh. Profile edits (`update({ userInfo: ... })` or `update({ refreshUserInfo: true })`) reload from the backend; client profile values are never trusted.
- `loadUserInfo` merges concurrent calls and caches successful results for 60 seconds per hashed credential, capped at 500 process-local entries. Temporary failures, including 429, back off for 30 seconds. This is not a public Next.js fetch cache. The signed timestamp also reduces repeated reads across server workers; simultaneous cold requests across different workers are not globally deduplicated.
- Expired credentials and confirmed authentication failures still follow the existing refresh/reauthentication rules. Other protected backend requests continue to authorize independently. A session read can reuse profile/role information up to 60 seconds old; UI updates when the next session check runs. Explicit local profile edits bypass the cache.
- Proxy routing reads the signed profile and never calls user-info on page/prefetch requests. A legacy token without a verified profile is not treated as a confirmed missing nickname. The auth session endpoint fills it on the next session check.
- A healthy location socket uses the session already in memory. Chat/party session reads coalesce concurrent requests and disable cross-tab broadcasting. Normal session health events coalesce for 60 seconds, transient errors for 30 seconds, with more frequent checks near expiry.
- Roadmap/progress reads reuse browser-only, per-credential results for 60 seconds and invalidate after successful saves. Notifications only merge simultaneous requests, defer to a ready notification/location socket, and never overwrite its live data with an older HTTP response. Cached private reads respect 429 `Retry-After` (30 seconds if absent).
- Authenticated HTTP reads share a single recovery operation with location/chat/party socket authentication failures. Retry only GET/HEAD once; never replay mutations. Handle HTTP/envelope 401 and explicit authentication codes on legacy 409 responses. Ordinary room/raid 409 conflicts and permission-only 403 responses do not force login. Wait for an in-flight health/profile session update before requesting repair.
- Failed refresh or rejection of the repaired credential updates the global login/connection UI. A confirmed rejection is also recorded in the signed session (only if the rejected credential still matches), preventing reload from showing the old credential as healthy. Account changes discard pending recovery results. Temporary outages show recovery status rather than forcing logout.
- The updated backend contract uses 401 for invalid/missing credentials, 503 for authentication outages, and `/user-info` 404 with `USER_NOT_FOUND` for an unregistered user. The last case clears stale profile/credentials and shows a distinct sign-in prompt so the existing sign-in registration flow can recreate the account; it does not trigger token refresh or send the user to nickname-only onboarding. Legacy `200 / FAIL / null` remains a temporary/unclassified failure for compatibility until backend deployment; business FAIL responses are not guessed to mean session expiry. Optional community/chat/party requests omit Authorization for anonymous reads and use the same recovery wrapper for supplied credentials.

Validation with Node 24:

```sh
node script/check-request-dedup.cjs
node script/check-auth-recovery.cjs
node script/check-session-health-browser.cjs
node script/check-auth-recovery-browser.cjs
```

The browser script needs Playwright available and the dev server on port 4000. All authentication and user-data calls in these checks use mocks. No backend contract changes are required. After deployment, compare user-info, notification, roadmap and progress request rates and 429 counts over equal traffic windows. If limits are keyed by a reverse proxy's internal IP, review trusted proxy/client-IP handling separately on the server.
