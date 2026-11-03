// HTTP 409 also describes room and raid conflicts; require an explicit auth code.
export function isAuthenticationFailure(
  httpStatus: number,
  payload: unknown,
): boolean {
  const codes = new Set([
    "AUTH_REQUIRED",
    "LOGIN_REQUIRED",
    "INVALID_TOKEN",
    "TOKEN_EXPIRED",
    "SESSION_EXPIRED",
  ]);
  const body =
    payload && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : {};
  return (
    httpStatus === 401 ||
    body.status === 401 ||
    ((httpStatus === 409 || body.status === 409 || httpStatus === 403) &&
      [body.msg, body.detail, body.code].some(
        (value) => typeof value === "string" && codes.has(value),
      ))
  );
}
