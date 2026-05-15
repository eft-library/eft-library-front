"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { Bot, MessageCircle, Send, Sparkles, Square, X } from "lucide-react";

import { useAppStore } from "@/components/providers/app-store-provider";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";
import type {
  ChatSearchEntry,
  ChatSourceDocument,
  ChatStreamEvent,
  ChatStreamRequest,
} from "@/types/api/chat";
import { ChatMessage, type ChatMessageData } from "./chat-message";

interface ChatWidgetProps {
  searchList: ChatSearchEntry[];
}

type StreamStatus = "idle" | "streaming" | "error";

const storageKey = "eftlibrary_chat_session_id";
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const copyByLocale = {
  ko: {
    askAnything: "AI에게 물어보기",
    title: "EFT Library Assistant",
    online: "퀘스트, 아이템, 지도 정보를 답변합니다",
    streaming: "답변을 작성하는 중",
    introTitle: "무엇을 찾고 있나요?",
    introBody: "퀘스트 진행, 아이템 위치, 지도 정보처럼 궁금한 내용을 물어보세요.",
    placeholder: "질문을 입력하세요",
    close: "채팅 닫기",
    open: "채팅 열기",
    send: "메시지 보내기",
    stop: "응답 중지",
    error: "응답을 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.",
  },
  en: {
    askAnything: "Ask AI",
    title: "EFT Library Assistant",
    online: "Ask about quests, items, and maps",
    streaming: "Writing a response",
    introTitle: "What are you looking for?",
    introBody: "Ask about quest steps, item locations, map details, and more.",
    placeholder: "Type your question",
    close: "Close chat",
    open: "Open chat",
    send: "Send message",
    stop: "Stop response",
    error: "Could not load the response. Please try again.",
  },
  ja: {
    askAnything: "AIに質問",
    title: "EFT Library Assistant",
    online: "クエスト、アイテム、マップ情報を回答します",
    streaming: "回答を作成中",
    introTitle: "何を探していますか？",
    introBody: "クエスト進行、アイテムの場所、マップ情報などを質問できます。",
    placeholder: "質問を入力してください",
    close: "チャットを閉じる",
    open: "チャットを開く",
    send: "メッセージを送信",
    stop: "応答を停止",
    error: "回答を取得できませんでした。しばらくしてからもう一度お試しください。",
  },
} satisfies Record<Locale, Record<string, string>>;

function createMessage(role: ChatMessageData["role"], content: string): ChatMessageData {
  return {
    id: crypto.randomUUID(),
    role,
    content,
  };
}

function getSessionId() {
  const stored = localStorage.getItem(storageKey);

  if (stored && uuidPattern.test(stored)) {
    return stored;
  }

  const sessionId = crypto.randomUUID();
  localStorage.setItem(storageKey, sessionId);
  return sessionId;
}

function parseSseBlock(block: string): ChatStreamEvent | null {
  const data = block
    .split("\n")
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trimStart())
    .join("\n");

  if (!data || data === "[DONE]") {
    return null;
  }

  try {
    return JSON.parse(data) as ChatStreamEvent;
  } catch {
    return null;
  }
}

function updateAssistantMessage(
  messages: ChatMessageData[],
  assistantId: string,
  updater: (message: ChatMessageData) => ChatMessageData,
) {
  return messages.map((message) =>
    message.id === assistantId ? updater(message) : message,
  );
}

export function ChatWidget({ searchList }: ChatWidgetProps) {
  const locale = useAppStore((store) => store.uiLocale);
  const copy = copyByLocale[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [status, setStatus] = useState<StreamStatus>("idle");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const sessionIdRef = useRef<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const shouldAutoScroll = useRef(true);

  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const handleScroll = () => {
      shouldAutoScroll.current =
        element.scrollHeight - element.scrollTop - element.clientHeight < 120;
    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (shouldAutoScroll.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, status]);

  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  const suggestions = useMemo(() => {
    const keyword = input.trim().toLowerCase();
    if (!keyword) {
      return [];
    }

    return searchList
      .filter((item) => item.lang === locale)
      .filter((item) => item.value.toLowerCase().includes(keyword))
      .slice(0, 8);
  }, [input, locale, searchList]);

  const visibleMessages = useMemo(() => messages.slice(-80), [messages]);
  const isStreaming = status === "streaming";

  async function sendChatMessage(query: string, assistantId: string) {
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setStatus("streaming");
    setErrorMessage(null);

    const body: ChatStreamRequest = {
      session_id: sessionIdRef.current || getSessionId(),
      query,
      lang: locale,
      rag_limit: 5,
      history_limit: 8,
    };

    try {
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`Chat stream failed: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });

        const blocks = buffer.split(/\n\n/);
        buffer = blocks.pop() ?? "";

        for (const block of blocks) {
          const event = parseSseBlock(block);

          if (!event) {
            continue;
          }

          if (event.type === "docs") {
            setMessages((current) =>
              updateAssistantMessage(current, assistantId, (message) => ({
                ...message,
                docs: event.docs,
              })),
            );
          }

          if (event.type === "token") {
            setMessages((current) =>
              updateAssistantMessage(current, assistantId, (message) => ({
                ...message,
                content: `${message.content}${event.content}`,
              })),
            );
          }

          if (event.type === "error") {
            throw new Error(event.detail || event.message);
          }

          if (event.type === "done") {
            setStatus("idle");
            abortControllerRef.current = null;
            return;
          }
        }

        if (done) {
          break;
        }
      }

      setStatus("idle");
      abortControllerRef.current = null;
    } catch (error) {
      abortControllerRef.current = null;

      if (error instanceof DOMException && error.name === "AbortError") {
        setStatus("idle");
        return;
      }

      setStatus("error");
      setErrorMessage(copy.error);
      setMessages((current) =>
        updateAssistantMessage(current, assistantId, (message) => ({
          ...message,
          content: message.content || copy.error,
        })),
      );
    }
  }

  function handleSubmit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const query = input.trim();

    if (!query || isStreaming) {
      return;
    }

    const userMessage = createMessage("user", query);
    const assistantMessage = createMessage("assistant", "");

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    shouldAutoScroll.current = true;
    void sendChatMessage(query, assistantMessage.id);
  }

  function stopStreaming() {
    abortControllerRef.current?.abort();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "ArrowDown" && showSuggestions && suggestions.length > 0) {
      event.preventDefault();
      setHighlightedIndex((index) => Math.min(index + 1, suggestions.length - 1));
      return;
    }

    if (event.key === "ArrowUp" && showSuggestions && suggestions.length > 0) {
      event.preventDefault();
      setHighlightedIndex((index) => Math.max(index - 1, 0));
      return;
    }

    if (event.key === "Escape") {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
      return;
    }

    if (event.key === "Enter" && !event.shiftKey) {
      if (highlightedIndex >= 0 && showSuggestions && suggestions[highlightedIndex]) {
        event.preventDefault();
        setInput(suggestions[highlightedIndex].value);
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        return;
      }

      event.preventDefault();
      handleSubmit();
    }
  }

  return (
    <>
      <div
        className={cn(
          "fixed right-4 bottom-4 z-[70] flex items-center gap-2 sm:right-6 sm:bottom-6 2xl:right-52 [@media(min-width:1664px)]:right-[calc(max(1rem,calc((100vw-1280px)/2-12rem))+12rem)]",
          isOpen && "pointer-events-none scale-95 opacity-0",
        )}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-black text-gray-900 shadow-lg shadow-gray-950/10 hover:border-orange-300 hover:text-orange-600 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:outline-none dark:border-white/10 dark:bg-[#2a2d35] dark:text-white dark:shadow-black/30 dark:hover:border-orange-300/50 dark:hover:text-orange-200"
          aria-label={copy.open}
        >
          <Sparkles className="size-4 text-orange-500 dark:text-orange-300" />
          <span className="hidden sm:inline">{copy.askAnything}</span>
          <span className="flex size-9 items-center justify-center rounded-full bg-gray-950 text-white group-hover:bg-orange-500 dark:bg-white dark:text-gray-950 dark:group-hover:bg-orange-200">
            <Bot className="size-5" />
          </span>
        </button>
      </div>

      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[68] cursor-default bg-gray-950/10 backdrop-blur-[1px] dark:bg-black/30"
          aria-label={copy.close}
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      <section
        className={cn(
          "fixed right-0 bottom-0 z-[69] flex h-[min(720px,100dvh)] w-full flex-col overflow-hidden border border-gray-200 bg-[#f8fafc] shadow-2xl shadow-gray-950/20 transition duration-200 sm:right-6 sm:bottom-6 sm:h-[min(820px,calc(100dvh-48px))] sm:w-[720px] sm:max-w-[calc(100vw-48px)] sm:rounded-2xl 2xl:right-52 2xl:max-w-[calc(100vw-256px)] [@media(min-width:1664px)]:right-[calc(max(1rem,calc((100vw-1280px)/2-12rem))+12rem)] [@media(min-width:1664px)]:max-w-[calc(100vw-(max(1rem,calc((100vw-1280px)/2-12rem))+13rem))] dark:border-white/10 dark:bg-[#1e2124] dark:shadow-black/50",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
        aria-label={copy.title}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#252932]">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-white dark:bg-orange-200 dark:text-gray-950">
              <Bot className="size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-black text-gray-950 dark:text-white">
                {copy.title}
              </h2>
              <p className="truncate text-xs font-semibold text-gray-500 dark:text-gray-400">
                {isStreaming ? copy.streaming : copy.online}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {isStreaming ? (
              <button
                type="button"
                onClick={stopStreaming}
                className="flex size-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-950 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:outline-none dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label={copy.stop}
              >
                <Square className="size-4 fill-current" />
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex size-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-950 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:outline-none dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label={copy.close}
            >
              <X className="size-4" />
            </button>
          </div>
        </header>

        <div ref={containerRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          {visibleMessages.length === 0 ? (
            <div className="flex min-h-full flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-gray-200 bg-white text-orange-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-orange-200">
                <MessageCircle className="size-7" />
              </div>
              <p className="text-base font-black text-gray-950 dark:text-white">
                {copy.introTitle}
              </p>
              <p className="mt-2 max-w-72 text-sm leading-6 text-gray-500 dark:text-gray-400">
                {copy.introBody}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {visibleMessages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isStreaming && visibleMessages.at(-1)?.role === "assistant" ? (
                <div className="ml-11 flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                  <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:0ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:150ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:300ms]" />
                </div>
              ) : null}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <footer className="shrink-0 border-t border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-[#252932]">
          {errorMessage ? (
            <p className="mb-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200">
              {errorMessage}
            </p>
          ) : null}
          <div className="relative">
            {showSuggestions && suggestions.length > 0 ? (
              <div className="absolute right-0 bottom-full left-0 mb-2 max-h-56 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-xl dark:border-white/10 dark:bg-[#2a2d35]">
                {suggestions.map((item, index) => (
                  <button
                    key={`${item.lang}-${item.value}`}
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      setInput(item.value);
                      setShowSuggestions(false);
                      setHighlightedIndex(-1);
                    }}
                    className={cn(
                      "block w-full truncate px-3 py-2 text-left text-sm font-semibold",
                      highlightedIndex === index
                        ? "bg-orange-50 text-orange-700 dark:bg-orange-300/10 dark:text-orange-200"
                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5",
                    )}
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <label className="sr-only" htmlFor="chat-input">
                {copy.placeholder}
              </label>
              <textarea
                id="chat-input"
                value={input}
                rows={1}
                disabled={isStreaming}
                placeholder={copy.placeholder}
                onChange={(event) => {
                  setInput(event.target.value);
                  setShowSuggestions(true);
                  setHighlightedIndex(-1);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => window.setTimeout(() => setShowSuggestions(false), 120)}
                onKeyDown={handleKeyDown}
                className="max-h-32 min-h-11 flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-950 outline-none placeholder:text-gray-400 focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-300/30 disabled:opacity-60 dark:border-white/10 dark:bg-[#1e2124] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-orange-300/50 dark:focus:bg-[#1e2124]"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-white shadow-sm hover:bg-orange-500 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 dark:bg-orange-200 dark:text-gray-950 dark:hover:bg-orange-300 dark:disabled:bg-white/10 dark:disabled:text-gray-500"
                aria-label={copy.send}
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </footer>
      </section>
    </>
  );
}
