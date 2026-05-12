import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 아이템",
  description: "Escape from Tarkov 무기, 탄약, 방어구, 의료품, 열쇠, 전리품 등 아이템 정보를 확인할 수 있습니다.",
  path: "/item",
});

export default function Page() {
  redirect("/item/weapon");
}
