import type { Locale } from "@/i18n/config";

export interface CommunityCategory {
  id: string;
  colorClassName: string;
  labels: Record<Locale, string>;
}

export interface CommunitySearchCategory {
  id: string;
  labels: Record<Locale, string>;
}

export const communityCategories: CommunityCategory[] = [
  {
    id: "all",
    colorClassName: "bg-slate-600",
    labels: { ko: "전체", en: "All", ja: "すべて" },
  },
  {
    id: "issue",
    colorClassName: "bg-rose-600",
    labels: { ko: "이슈", en: "Issue", ja: "イシュー" },
  },
  {
    id: "free",
    colorClassName: "bg-orange-600",
    labels: { ko: "자유", en: "Free", ja: "自由" },
  },
  {
    id: "pvp",
    colorClassName: "bg-red-600",
    labels: { ko: "PVP", en: "PVP", ja: "PVP" },
  },
  {
    id: "pve",
    colorClassName: "bg-green-600",
    labels: { ko: "PVE", en: "PVE", ja: "PVE" },
  },
  {
    id: "info",
    colorClassName: "bg-blue-600",
    labels: { ko: "정보", en: "Info", ja: "情報" },
  },
  {
    id: "question",
    colorClassName: "bg-violet-600",
    labels: { ko: "질문", en: "Question", ja: "質問" },
  },
  {
    id: "humor",
    colorClassName: "bg-amber-500",
    labels: { ko: "유머", en: "Humor", ja: "ユーモア" },
  },
  {
    id: "tip",
    colorClassName: "bg-cyan-600",
    labels: { ko: "공략/팁", en: "Tips", ja: "攻略・ヒント" },
  },
];

export const communitySearchCategories: CommunitySearchCategory[] = [
  { id: "all", labels: { ko: "통합검색", en: "All", ja: "統合検索" } },
  { id: "title", labels: { ko: "제목", en: "Title", ja: "タイトル" } },
  {
    id: "titleContent",
    labels: { ko: "제목+내용", en: "Title+Content", ja: "タイトル+内容" },
  },
  { id: "comment", labels: { ko: "댓글", en: "Comment", ja: "コメント" } },
  { id: "author", labels: { ko: "글쓴이", en: "Author", ja: "投稿者" } },
];
