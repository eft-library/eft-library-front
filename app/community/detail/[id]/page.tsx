import { getCommunityDetail } from "@/features/community/api";
import { CommunityDetailPage } from "@/features/community/components/community-detail-page";
import {
  createPageMetadata,
  fallbackMetadata,
  stripHtml,
  truncateDescription,
} from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const { id } = await params;
    const data = await getCommunityDetail(id, "");
    const post = data.post_detail;
    const description = truncateDescription(
      stripHtml(post.contents) || "EFT Library 커뮤니티 게시글입니다.",
    );

    return createPageMetadata({
      title: post.title,
      description,
      path: `/community/detail/${id}`,
      image: post.thumbnail,
    });
  } catch {
    return fallbackMetadata();
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <CommunityDetailPage id={id} />;
}
