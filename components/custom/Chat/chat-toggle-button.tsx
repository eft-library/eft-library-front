"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export default function ChatToggleButton({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className={cn(
        "fixed bottom-10 right-70 z-9999 size-14 rounded-full shadow-lg transition-all duration-300",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "dark:bg-white dark:text-black dark:hover:bg-white/90",
        "dark:shadow-[0_4px_24px_rgba(255,255,255,0.1)]",
        "hover:scale-105 active:scale-95",
        isOpen && "scale-0 opacity-0 pointer-events-none",
      )}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      <MessageCircle className="size-6" />
    </Button>
  );
}
