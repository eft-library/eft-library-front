import { MyPageClient } from "@/features/mypage/components/my-page-client";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "작성 댓글",
  description: "EFT Library에서 작성한 댓글을 확인합니다.",
  path: "/mypage/comments",
  noIndex: true,
});

export default function Page() {
  return <MyPageClient section="comments" />;
}
