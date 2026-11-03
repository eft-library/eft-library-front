import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo/metadata";

// This entry only redirects; it has no UI to validate for instant navigation.
export const instant = false;

export const metadata = createPageMetadata({
  title: "타르코프 상인",
  description: "타르코프 상인별 구매·교환 아이템과 해금 조건을 확인하세요.",
  path: "/traders",
});

export default function Page() {
  redirect("/traders/prapor");
}
