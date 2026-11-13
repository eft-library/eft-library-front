import { Suspense } from "react";
import { KordBreachRoute } from "@/features/kord-breach/route";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "KORD·BREACH 모디파이어 및 보상",
  description: "KORD·BREACH의 모디파이어를 조합하고 시즌 보상과 해금 조건을 확인하세요.",
  path: "/kord-breach",
});

export default function Page() {
  return <Suspense fallback={<div aria-busy="true" className="mx-auto min-h-96 max-w-6xl animate-pulse p-6"><div className="h-32 rounded-xl bg-surface-elevated" /></div>}><KordBreachRoute /></Suspense>;
}
