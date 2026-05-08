import { MinigameRoute } from "@/features/minigame/route";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 미니게임",
  description: "Escape from Tarkov 아이템을 활용한 EFT Library 미니게임과 랭킹을 플레이할 수 있습니다.",
  path: "/minigame",
});

export default function Page() {
  return <MinigameRoute />;
}
