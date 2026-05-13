import { CommunityEditorPage } from "@/features/community/components/community-editor-page";
import { createPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = createPageMetadata({
  title: "PMC 라운지 글 수정",
  description: "EFT Library PMC 라운지 게시글을 수정합니다.",
  path: "/community/update",
  noIndex: true,
});

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <CommunityEditorPage postParam={id} />;
}
