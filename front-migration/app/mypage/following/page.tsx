import { MyPageClient } from "@/features/mypage/components/my-page-client";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "팔로우",
  description: "EFT Library에서 팔로우한 사용자를 확인합니다.",
  path: "/mypage/following",
  noIndex: true,
});

export default function Page() {
  return <MyPageClient section="following" />;
}
