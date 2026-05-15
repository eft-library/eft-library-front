"use client";

import { memo } from "react";
import { Bot, ExternalLink, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils/class-name";
import type { ChatSourceDocument } from "@/types/api/chat";

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant";
  content: string;
  docs?: ChatSourceDocument[];
}

interface ChatMessageProps {
  message: ChatMessageData;
}

function getUniqueDocuments(docs: ChatSourceDocument[] = []) {
  const seen = new Set<string>();

  return docs.filter((doc) => {
    const key = `${doc.domain}:${doc.entity_id}:${doc.entity_name}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function ChatMessageComponent({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const sourceDocs = getUniqueDocuments(message.docs).slice(0, 4);

  return (
    <article className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full border",
          isUser
            ? "border-orange-300 bg-orange-500 text-white shadow-sm dark:border-orange-200/30 dark:bg-orange-300 dark:text-gray-950"
            : "border-gray-200 bg-white text-gray-600 dark:border-white/10 dark:bg-white/10 dark:text-gray-200",
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>

      <div className={cn("min-w-0 max-w-[90%]", isUser && "flex justify-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm font-semibold leading-7 shadow-sm",
            isUser
              ? "rounded-br-md bg-gray-950 text-white dark:bg-white dark:text-gray-950"
              : "rounded-bl-md border border-gray-200 bg-white text-gray-800 dark:border-white/10 dark:bg-[#272b33] dark:text-gray-100",
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none break-words prose-headings:mb-2 prose-headings:mt-4 prose-headings:font-black prose-p:my-2 prose-p:font-semibold prose-ul:my-2 prose-li:my-0 prose-li:font-semibold prose-strong:font-black prose-a:font-bold prose-a:text-orange-600 prose-a:underline-offset-2 hover:prose-a:underline dark:prose-invert dark:prose-a:text-orange-300">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                skipHtml
                components={{
                  a: ({ href = "", children }) => {
                    const isExternal = href.startsWith("http");

                    return (
                      <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                      >
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {message.content || " "}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {!isUser && sourceDocs.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {sourceDocs.map((doc) => {
              const content = (
                <>
                  <span className="truncate">{doc.entity_name}</span>
                  {doc.url ? <ExternalLink className="size-3 shrink-0" /> : null}
                </>
              );

              const className =
                "inline-flex max-w-44 items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-600 hover:border-orange-300 hover:text-orange-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-orange-300/50 dark:hover:text-orange-200";

              return doc.url ? (
                <a
                  key={doc.chunk_id}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <span key={doc.chunk_id} className={className}>
                  {content}
                </span>
              );
            })}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export const ChatMessage = memo(
  ChatMessageComponent,
  (prev, next) => prev.message === next.message,
);
