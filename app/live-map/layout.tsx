import type { ReactNode } from "react";
import { LiveMapPartyProvider } from "@/features/live-map/party/use-live-map-party";
import { LiveMapChatProvider } from "@/features/live-map/chat/use-live-map-chat";

export default function LiveMapLayout({ children }: { children: ReactNode }) {
  return (
    <LiveMapPartyProvider>
      <LiveMapChatProvider>{children}</LiveMapChatProvider>
    </LiveMapPartyProvider>
  );
}
