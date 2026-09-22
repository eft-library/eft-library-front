import type { ReactNode } from "react";
import { LiveMapPartyProvider } from "@/features/live-map/party/use-live-map-party";

export default function LiveMapLayout({ children }: { children: ReactNode }) {
  return <LiveMapPartyProvider>{children}</LiveMapPartyProvider>;
}
