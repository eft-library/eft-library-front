import { KordBreachRoute } from "@/features/kord-breach/route";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "KORD·BREACH 모디파이어",
  description: "KORD·BREACH의 공통 및 개인 모디파이어를 조합하고 프리셋으로 저장하세요.",
  path: "/kord-breach",
});

export default function Page() {
  return <KordBreachRoute />;
}
