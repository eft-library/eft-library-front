import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "EFT Library PMC 라운지",
  description:
    "Escape from Tarkov 정보, 질문, 공략, PVP/PVE 이야기를 나누는 EFT Library PMC 라운지입니다.",
  path: "/community",
});

export default function Page() {
  redirect("/community/free");
}
