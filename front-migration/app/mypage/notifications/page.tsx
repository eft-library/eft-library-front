import { MyPageClient } from "@/features/mypage/components/my-page-client";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "알림",
  description: "EFT Library 알림을 확인합니다.",
  path: "/mypage/notifications",
  noIndex: true,
});

export default function Page() {
  return <MyPageClient section="notifications" />;
}
