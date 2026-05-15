import { ChatWidget } from "@/features/chat/components/chat-widget";
import type { ChatSearchEntry } from "@/types/api/chat";

export async function ChatData() {
  const searchList: ChatSearchEntry[] = [];

  return <ChatWidget searchList={searchList} />;
}
