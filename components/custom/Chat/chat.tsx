"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { DefaultChatTransport, UIMessage } from "ai";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatToggleButton from "./chat-toggle-button";
import ChatMessage from "./chat-message";
import { llmI18N } from "@/lib/consts/i18nConsts";

export default function Chat() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    let sessionId = localStorage.getItem("chat_session_id");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("chat_session_id", sessionId);
    }
    sessionIdRef.current = sessionId;
  }, []);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ messages, body, headers }) => ({
          body: {
            ...body,
            messages,
            session_id: sessionIdRef.current,
            locale: localeKey,
          },
          headers,
        }),
      }),
    [localeKey],
  );

  const { messages, sendMessage, status } = useChat({ transport });
  const isLoading = status === "streaming" || status === "submitted";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <>
      <ChatToggleButton onClick={() => setIsOpen(true)} isOpen={isOpen} />

      <div
        className={cn(
          "fixed bottom-6 right-6 z-9999 flex flex-col overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300 ease-out",
          "bg-card text-card-foreground border-border",
          "dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]",
          "w-125 h-155",
          "max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:h-full max-sm:rounded-none",
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4 bg-card dark:bg-neutral-900 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground dark:bg-white dark:text-black">
              <Bot className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                {llmI18N.aiAssistant[localeKey]}
              </h3>
              <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {isLoading
                  ? llmI18N.typing[localeKey]
                  : llmI18N.online[localeKey]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="size-8 rounded-full text-muted-foreground hover:text-foreground dark:hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="min-h-0 flex-1 dark:bg-neutral-950">
          <div className="flex flex-col gap-4 p-5">
            {messages.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted dark:bg-white/6">
                  <MessageCircle className="size-6 text-muted-foreground dark:text-neutral-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-800 dark:text-white">
                    {llmI18N.howCanIHelp[localeKey]}
                  </p>
                  <p className="mt-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {llmI18N.moreDetailsHelpFriendly[localeKey]}
                  </p>
                </div>
              </div>
            )}
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                parts={message.parts as Array<{ type: string; text?: string }>}
              />
            ))}
            {isLoading &&
              messages.length > 0 &&
              messages[messages.length - 1].role === "user" && (
                <div className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground dark:bg-white/10 dark:text-neutral-400">
                    <Bot className="size-4" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-muted px-4 py-3 dark:bg-white/6">
                    <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 dark:bg-neutral-500 [animation-delay:0ms]" />
                    <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 dark:bg-neutral-500 [animation-delay:150ms]" />
                    <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 dark:bg-neutral-500 [animation-delay:300ms]" />
                  </div>
                </div>
              )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t px-4 py-3 bg-card dark:bg-neutral-900 dark:border-neutral-800"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={llmI18N.typeMessage[localeKey]}
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400 disabled:opacity-50 dark:text-white dark:placeholder:text-neutral-500"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="size-9 shrink-0 rounded-full dark:bg-white dark:text-black dark:hover:bg-white/90 dark:disabled:bg-neutral-700 dark:disabled:text-neutral-500"
            aria-label={llmI18N.sendMessage[localeKey]}
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
