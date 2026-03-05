"use client";

import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { memo } from "react";

type MessagePart = {
  type: string;
  text?: string;
};

type ChatMessageProps = {
  role: string;
  parts: MessagePart[];
};

type MarkdownProps = {
  children: string;
};

export const Markdown = memo(
  function Markdown({ children }: MarkdownProps) {
    return (
      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>
        {children}
      </ReactMarkdown>
    );
  },
  (prev, next) => prev.children === next.children,
);

function ChatMessage({ role, parts }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar */}
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

      {/* Message Bubble */}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm font-medium leading-relaxed",
          isUser
            ? "bg-neutral-800 text-white rounded-br-md dark:bg-white dark:text-neutral-900 dark:font-semibold"
            : "bg-neutral-100 text-neutral-800 rounded-bl-md dark:bg-white/10 dark:text-neutral-50 dark:font-semibold",
        )}
      >
        {parts.map((part, index) => {
          if (part.type !== "text") return null;

          const text = part.text ?? "";

          return (
            <div
              key={index}
              className={cn(
                "prose prose-sm max-w-none",
                "prose-headings:font-semibold prose-p:my-1 prose-ul:my-1 prose-li:my-0",
                isUser
                  ? `
prose-headings:text-white 
prose-p:text-white 
prose-strong:text-white 
prose-li:text-white 
prose-code:text-white/90 
prose-code:bg-white/20
prose-a:text-white
dark:prose-headings:text-neutral-900 
dark:prose-p:text-neutral-900 
dark:prose-strong:text-neutral-900 
dark:prose-li:text-neutral-900
dark:prose-a:text-neutral-900
dark:prose-code:text-neutral-50
dark:prose-code:bg-white/10
`
                  : `
prose-headings:text-neutral-800 
prose-p:text-neutral-800 
prose-strong:text-neutral-800 
prose-li:text-neutral-800
prose-a:text-neutral-800
prose-td:text-neutral-800
prose-th:text-neutral-800
dark:prose-headings:text-neutral-50 
dark:prose-p:text-neutral-50 
dark:prose-strong:text-neutral-50 
dark:prose-li:text-neutral-50
dark:prose-a:text-neutral-50
dark:prose-td:text-neutral-50
dark:prose-th:text-neutral-50
dark:prose-code:text-neutral-50
dark:prose-code:bg-white/10
`,
              )}
            >
              {isUser ? (
                <span className="text-white dark:text-black">{text}</span>
              ) : (
                <Markdown>{text}</Markdown>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(
  ChatMessage,
  (prev, next) => prev.role === next.role && prev.parts === next.parts,
);
