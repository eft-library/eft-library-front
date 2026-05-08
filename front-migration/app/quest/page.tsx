import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 퀘스트",
  description: "Escape from Tarkov 트레이더별 퀘스트, 목표, 보상, 카파 정보를 확인할 수 있습니다.",
  path: "/quest",
});

export default function Page() {
  redirect("/quest/prapor");
}
