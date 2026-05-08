import { MyPageClient } from "@/features/mypage/components/my-page-client";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "마이페이지",
  description: "EFT Library 내 활동과 계정 정보를 확인합니다.",
  path: "/mypage",
  noIndex: true,
});

export default function Page() {
  return <MyPageClient section="profile" />;
}
