"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bot, MessageCircle, Sparkles } from "lucide-react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { llmI18N } from "@/lib/consts/i18nConsts";

export default function ChatToggleButton({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-[9999] flex items-center gap-3 transition-all duration-300",
        isOpen && "scale-0 opacity-0 pointer-events-none",
      )}
    >
      {/* 펫말 (말풍선) */}
      <div className="relative animate-bounce-subtle">
        <div className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white px-4 py-2 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
          <Sparkles className="size-4 text-yellow-500" />
          <span className="text-sm font-bold whitespace-nowrap">
            {llmI18N.askAnything[localeKey]}
          </span>
        </div>
        {/* 말풍선 꼬리 */}
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white dark:border-l-zinc-800" />
      </div>

      {/* 채팅 버튼 */}
      <Button
        onClick={onClick}
        size="icon"
        className={cn(
          "size-14 rounded-full shadow-lg transition-all duration-300",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "dark:bg-white dark:text-black dark:hover:bg-white/90",
          "dark:shadow-[0_4px_24px_rgba(255,255,255,0.1)]",
          "hover:scale-105 active:scale-95",
          "ring-4 ring-primary/20 dark:ring-white/20",
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <Bot className="size-6" />
      </Button>
    </div>
  );
}
