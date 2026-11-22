import { Suspense } from "react";
import { KordBreachRoute } from "@/features/kord-breach/route";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "모디파이어",
  description: "모디파이어를 조합하고 시즌 보상과 해금 조건을 확인하세요.",
  path: "/modifiers",
});

export default function Page() {
  return <Suspense fallback={<div aria-busy="true" className="mx-auto min-h-96 max-w-6xl animate-pulse p-6"><div className="h-32 rounded-xl bg-surface-elevated" /></div>}><KordBreachRoute /></Suspense>;
}
