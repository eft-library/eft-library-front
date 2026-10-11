import { LiveMapChatApiError } from "./api";

/** The cookie must be issued by the same host that receives the WebSocket. */
export async function ensureChatGuestSession(socketUrl: string) {
  const endpoint = new URL(socketUrl);
  endpoint.protocol = endpoint.protocol === "wss:" ? "https:" : "http:";
  endpoint.pathname = endpoint.pathname.replace(/\/ws$/, "/guest-session");
  endpoint.search = "";
  const issue = async () => {
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (response.ok) return;
    let payload: { msg?: string; data?: { retry_after?: number } | null } = {};
    try { payload = await response.json(); } catch { /* Keep the HTTP error. */ }
    const retry = Number(payload.data?.retry_after ?? response.headers.get("Retry-After"));
    throw new LiveMapChatApiError(response.status, payload.msg ?? "CHAT_GUEST_SESSION_UNAVAILABLE", Number.isFinite(retry) ? retry : 0);
  };
  // Serialize first issuance across tabs without storing or reading the HttpOnly token.
  if (navigator.locks) {
    await navigator.locks.request(`chat-guest-session:${endpoint.origin}`, issue);
  } else {
    await issue();
  }
}
