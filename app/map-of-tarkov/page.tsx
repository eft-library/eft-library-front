import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 지도",
  description: "Escape from Tarkov 한글 지도, 탈출구, 보스, Transit 정보를 확인할 수 있습니다.",
  path: "/map-of-tarkov",
});

export default function Page() {
  redirect("/map-of-tarkov/interchange");
}
