import { MyPageClient } from "@/features/mypage/components/my-page-client";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "북마크",
  description: "EFT Library에서 북마크한 글을 확인합니다.",
  path: "/mypage/bookmarks",
  noIndex: true,
});

export default function Page() {
  return <MyPageClient section="bookmarks" />;
}
