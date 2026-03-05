"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ChatToggleButton from "./chat-toggle-button";
import ChatMessage from "./chat-message";
import { llmI18N } from "@/lib/consts/i18nConsts";
import StreamingMessage from "./streaming-message";
import { SearchData } from "../NavBar/nav-bar.types";
import Downshift from "downshift";
import Highlighter from "react-highlight-words";

export default function Chat({ searchList }: { searchList: SearchData[] }) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const shouldAutoScroll = useRef(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const threshold = 100;
      const isNearBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
      shouldAutoScroll.current = isNearBottom;
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    if (shouldAutoScroll.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const visibleMessages = useMemo(() => messages.slice(-80), [messages]);
  const lastMessage = visibleMessages.at(-1);

  const stableMessages = useMemo(() => {
    if (lastMessage?.role === "assistant" && isLoading) {
      return visibleMessages.slice(0, -1);
    }
    return visibleMessages;
  }, [visibleMessages, lastMessage, isLoading]);

  // 자동완성 후보: 현재 locale + input 포함 항목
  const suggestions = useMemo(() => {
    if (!input.trim()) return [];
    return searchList
      .filter((item) => item.lang === localeKey)
      .filter((item) => item.value.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 8); // 최대 8개
  }, [searchList, input, localeKey]);
  return (
    <>
      <ChatToggleButton onClick={() => setIsOpen(true)} isOpen={isOpen} />

      {isOpen && (
        <div
          className="fixed inset-0 z-9998"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed bottom-6 right-6 z-9999 flex flex-col overflow-hidden rounded-2xl border shadow-2xl transition-all duration-300 ease-out",
          "bg-card text-card-foreground border-border",
          "dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]",
          "w-300 h-220",
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
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto min-h-0 dark:bg-neutral-950"
        >
          <div className="flex flex-col gap-4 p-5">
            {visibleMessages.length === 0 && (
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
            {stableMessages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                parts={message.parts as Array<{ type: string; text?: string }>}
              />
            ))}
            {lastMessage?.role === "assistant" && isLoading && (
              <StreamingMessage
                parts={
                  lastMessage.parts as Array<{ type: string; text?: string }>
                }
              />
            )}
            {isLoading &&
              messages.length > 0 &&
              messages.at(-1)?.role === "user" && (
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
        </div>

        {/* Input with Autocomplete */}
        <div className="border-t bg-card dark:bg-neutral-900 dark:border-neutral-800">
          <Downshift
            inputValue={input}
            onInputValueChange={(value) => setInput(value)}
            onChange={(selection) => {
              if (selection) setInput(selection.value);
            }}
            itemToString={(item) => (item ? item.value : "")}
            // 선택 후 드롭다운 닫기
            stateReducer={(state, changes) => {
              switch (changes.type) {
                case Downshift.stateChangeTypes.keyDownEnter:
                case Downshift.stateChangeTypes.clickItem:
                  return {
                    ...changes,
                    isOpen: false,
                    highlightedIndex: -1,
                  };
                default:
                  return changes;
              }
            }}
          >
            {({
              getInputProps,
              getItemProps,
              getMenuProps,
              getRootProps,
              isOpen,
              highlightedIndex,
            }) => (
              <div className="relative" {...getRootProps()}>
                {/* 자동완성 드롭다운 - input 위쪽으로 */}
                {isOpen && suggestions.length > 0 && (
                  <div
                    {...getMenuProps()}
                    className="absolute bottom-full left-0 right-0 mb-1 max-h-52 overflow-auto rounded-xl border bg-white shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
                  >
                    {suggestions.map((item, index) => (
                      <div
                        key={`${item.lang}-${item.value}-${item.page_value}`}
                        {...getItemProps({ item, index })}
                        className={cn(
                          "cursor-pointer px-4 py-2.5 text-sm font-medium",
                          highlightedIndex === index
                            ? "bg-neutral-100 dark:bg-neutral-700"
                            : "text-neutral-900 dark:text-neutral-100",
                        )}
                      >
                        <Highlighter
                          highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-0.5 rounded"
                          searchWords={[input]}
                          autoEscape
                          textToHighlight={item.value}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Input 영역 */}
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 px-4 py-3"
                >
                  <input
                    {...getInputProps({
                      placeholder: llmI18N.typeMessage[localeKey],
                      disabled: isLoading,
                      onKeyDown: (e) => {
                        // 드롭다운 열려있을 때 Enter는 자동완성 선택, 닫혀있을 때 전송
                        if (e.key === "Enter" && !isOpen) {
                          handleSubmit(e as unknown as React.FormEvent);
                        }
                      },
                      className:
                        "flex-1 bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400 disabled:opacity-50 dark:text-white dark:placeholder:text-neutral-500",
                    })}
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
            )}
          </Downshift>
        </div>
      </div>
    </>
  );
}
