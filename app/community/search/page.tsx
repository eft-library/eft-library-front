import { CommunitySearchPage } from "@/features/community/components/community-search-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "PMC 라운지 검색",
  description: "EFT Library PMC 라운지의 게시글과 댓글을 검색할 수 있습니다.",
  path: "/community/search",
});

export default function Page() {
  return <CommunitySearchPage />;
}
