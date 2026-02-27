import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import { LLM_ENDPOINTS } from "@/lib/config/endpoint";

export async function POST(req: Request) {
  const body = await req.json();
  const sessionId = body.session_id ?? crypto.randomUUID();
  const lang = body.locale ?? "ko";
  const lastMessage = body.messages.at(-1);
  const query =
    lastMessage.parts.find((p: { type: string }) => p.type === "text")?.text ??
    "";

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const messageId = crypto.randomUUID();
      writer.write({ type: "text-start", id: messageId });

      const resp = await fetch(LLM_ENDPOINTS.STREAM_CHAT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, query, lang }),
      });

      if (!resp.ok) {
        writer.write({
          type: "text-delta",
          id: messageId,
          delta: "오류가 발생했습니다.",
        });
        writer.write({ type: "text-end", id: messageId });
        return;
      }

      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === "token") {
              writer.write({
                type: "text-delta",
                id: messageId,
                delta: data.content,
              });
            }
          } catch {}
        }
      }

      writer.write({ type: "text-end", id: messageId });
    },
  });

  return createUIMessageStreamResponse({ stream });
}
