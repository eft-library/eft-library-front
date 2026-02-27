"use client";

import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMessage({
  role,
  parts,
}: {
  role: string;
  parts: Array<{ type: string; text?: string }>;
}) {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-primary text-primary-foreground dark:bg-white dark:text-black"
            : "bg-muted text-muted-foreground dark:bg-white/10 dark:text-neutral-400",
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm font-medium leading-relaxed",
          isUser
            ? "bg-neutral-800 text-white rounded-br-md dark:bg-white dark:text-neutral-900 dark:font-semibold"
            : "bg-neutral-100 text-neutral-800 rounded-bl-md dark:bg-white/10 dark:text-neutral-50 dark:font-semibold",
        )}
      >
        {parts.map((part, index) => {
          if (part.type === "text") {
            return (
              <div
                key={index}
                className={cn(
                  "prose prose-sm max-w-none",
                  "prose-headings:font-semibold prose-p:my-1 prose-ul:my-1 prose-li:my-0",
                  isUser
                    ? "prose-headings:text-white prose-p:text-white prose-strong:text-white prose-li:text-white prose-code:text-white/90 prose-code:bg-white/20 dark:prose-headings:text-neutral-900 dark:prose-p:text-neutral-900 dark:prose-strong:text-neutral-900 dark:prose-li:text-neutral-900"
                    : "prose-headings:text-neutral-800 prose-p:text-neutral-800 prose-strong:text-neutral-800 prose-li:text-neutral-800 dark:prose-headings:text-neutral-50 dark:prose-p:text-neutral-50 dark:prose-strong:text-neutral-50 dark:prose-li:text-neutral-50",
                )}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {part.text ?? ""}
                </ReactMarkdown>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
