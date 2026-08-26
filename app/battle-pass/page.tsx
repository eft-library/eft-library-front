import { Suspense } from "react";

import { BattlePassRoute } from "@/features/battle-pass/route";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "배틀패스 보상",
  description: "Escape from Tarkov 배틀패스 보상과 교환에 필요한 문서를 확인하세요.",
  path: "/battle-pass",
});

export default function Page() {
  return (
    <Suspense fallback={<BattlePassLoading />}>
      <BattlePassRoute />
    </Suspense>
  );
}

function BattlePassLoading() {
  return (
    <main className="mx-auto min-h-[70vh] w-full max-w-[1440px] px-4 py-10 sm:px-7 lg:px-16 lg:py-14">
      <div className="h-40 animate-pulse rounded-xl border border-line bg-surface" />
      <div className="mt-7 grid animate-pulse grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-16 rounded-lg border border-line bg-surface" />
        ))}
      </div>
      <span className="sr-only">배틀패스를 불러오는 중...</span>
    </main>
  );
}
