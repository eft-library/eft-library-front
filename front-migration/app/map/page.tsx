import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 3D 지도",
  description: "Escape from Tarkov 3D 지도와 아이템 스폰 위치 정보를 확인할 수 있습니다.",
  path: "/map",
});

export default function Page() {
  redirect("/map/factory");
}
