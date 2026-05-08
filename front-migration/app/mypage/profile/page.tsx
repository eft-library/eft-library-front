import { MyPageClient } from "@/features/mypage/components/my-page-client";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "마이페이지 프로필",
  description: "EFT Library 프로필 정보를 확인합니다.",
  path: "/mypage/profile",
  noIndex: true,
});

export default function Page() {
  return <MyPageClient section="profile" />;
}
