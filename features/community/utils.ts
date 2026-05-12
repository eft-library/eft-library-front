import { communityCategories } from "@/lib/constants/community-categories";
import type { Locale } from "@/i18n/config";
import type { CommunityPost, CommunitySideNotice } from "@/types/api/community";

export function getCommunityPostUrl(post: Pick<CommunityPost, "id" | "slug">) {
  return `/community/detail/${post.id}-${post.slug}`;
}

export function getPostIdFromUrlParam(value: string) {
  return value.split("-")[0] ?? value;
}

export function getCategoryLabel(categoryId: string, locale: Locale) {
  return communityCategories.find((category) => category.id === categoryId)?.labels[locale] ?? categoryId;
}

export function getNoticeTitle(notice: CommunitySideNotice, locale: Locale) {
  return notice[`title_${locale}`] ?? notice.title_ko ?? notice.title_en ?? notice.title_ja ?? "Notice";
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatCommunityDate(value?: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function buildPostPreview(post: CommunityPost) {
  return stripHtml(post.contents || post.comment || "").slice(0, 140);
}
