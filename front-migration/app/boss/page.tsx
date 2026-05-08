import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 보스",
  description: "Escape from Tarkov 보스의 스폰 위치, 스폰 확률, 체력, 추종자, 전리품 정보를 확인할 수 있습니다.",
  path: "/boss",
});

export default function Page() {
  redirect("/boss/killa");
}
