import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { ChatStreamRequest } from "@/types/api/chat";

const chatApiBaseUrl =
  process.env.NEXT_PUBLIC_CHAT_API_URL || "https://back.eftlibrary.com";

export async function POST(request: Request) {
  const body = (await request.json()) as ChatStreamRequest;

  const upstream = await fetch(`${chatApiBaseUrl}${apiEndpoints.chatStream}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!upstream.ok || !upstream.body) {
    return Response.json(
      {
        message: `Chat stream request failed: ${upstream.status}`,
      },
      { status: upstream.status || 502 },
    );
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "Cache-Control": "no-cache, no-transform",
      "Content-Type":
        upstream.headers.get("Content-Type") || "text/event-stream; charset=utf-8",
    },
  });
}
