import { MyPageClient } from "@/features/mypage/components/my-page-client";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "차단한 사용자",
  description: "EFT Library에서 차단한 사용자를 확인합니다.",
  path: "/mypage/blocked",
  noIndex: true,
});

export default function Page() {
  return <MyPageClient section="blocked" />;
}
