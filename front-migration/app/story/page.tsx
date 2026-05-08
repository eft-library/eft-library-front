import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 스토리",
  description: "Escape from Tarkov 스토리 진행 흐름, 선행 조건, 목표, 가이드를 확인할 수 있습니다.",
  path: "/story",
});

export default function Page() {
  redirect("/story/roadmap");
}
