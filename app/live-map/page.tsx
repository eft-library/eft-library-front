import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Live Map",
  description: "Escape from Tarkov 실시간 위치 지도를 제공합니다.",
  path: "/live-map",
});

export default function Page() {
  redirect("/live-map/customs");
}
