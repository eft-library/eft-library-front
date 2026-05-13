import { CommunityEditorPage } from "@/features/community/components/community-editor-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "PMC 라운지 글쓰기",
  description: "EFT Library PMC 라운지에 새 게시글을 작성합니다.",
  path: "/community/create",
  noIndex: true,
});

export default function Page() {
  return <CommunityEditorPage />;
}
