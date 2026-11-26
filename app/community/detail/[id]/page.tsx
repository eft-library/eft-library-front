import { cache } from "react";
import { getCommunityDetail } from "@/features/community/api";
import { sanitizeCommunityHtml } from "@/features/community/sanitize-html";
import { getCommunityPostUrl } from "@/features/community/utils";
import { CommunityDetailPage } from "@/features/community/components/community-detail-page";
import {
  createPageMetadata,
  fallbackMetadata,
  stripHtml,
  truncateDescription,
} from "@/lib/seo/metadata";

const getPublicPost = cache((id: string) => getCommunityDetail(id, ""));

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const { id } = await params;
    const data = await getPublicPost(id);
    const post = data.post_detail;
    const description = truncateDescription(
      stripHtml(post.contents) || "EFT Library 커뮤니티 게시글입니다.",
    );

    const firstImage = post.thumbnail ? undefined :
      sanitizeCommunityHtml(post.contents).match(/<img\b[^>]*\ssrc="([^"]+)"/i)?.[1];

    return createPageMetadata({
      title: post.title,
      description,
      path: getCommunityPostUrl(post),
      image: post.thumbnail || firstImage?.replaceAll("&amp;", "&"),
    });
  } catch {
    return fallbackMetadata();
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const initialDetail = await getPublicPost(id).catch(() => null);
  return <CommunityDetailPage key={id} id={id} initialDetail={initialDetail} />;
}
