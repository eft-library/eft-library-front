"use client";

import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function StreamingMessage({
  parts,
}: {
  parts: Array<{ type: string; text?: string }>;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground dark:bg-white/10 dark:text-neutral-400">
        <Bot className="size-4" />
      </div>

      <div className="max-w-[75%] rounded-2xl px-4 py-2.5 text-sm font-medium leading-relaxed bg-neutral-100 text-neutral-800 rounded-bl-md dark:bg-white/10 dark:text-neutral-50">
        {parts.map((part, index) => {
          if (part.type !== "text") return null;

          return (
            <ReactMarkdown key={index} remarkPlugins={[remarkGfm]}>
              {part.text ?? ""}
            </ReactMarkdown>
          );
        })}
      </div>
    </div>
  );
}
