import { MyPageClient } from "@/features/mypage/components/my-page-client";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "작성 글",
  description: "EFT Library에서 작성한 글을 확인합니다.",
  path: "/mypage/posts",
  noIndex: true,
});

export default function Page() {
  return <MyPageClient section="posts" />;
}
