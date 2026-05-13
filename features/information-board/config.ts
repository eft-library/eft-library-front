import type { Locale } from "@/i18n/config";
import type { InformationType } from "@/types/api/news";

export type InformationBoardSlug = "notice" | "event" | "patch-notes";

interface LocalizedValue {
  ko: string;
  en: string;
  ja: string;
}

interface BoardConfig {
  informationType: InformationType;
  path: InformationBoardSlug;
  title: LocalizedValue;
  description: LocalizedValue;
}

export const informationBoardConfig: Record<InformationBoardSlug, BoardConfig> =
  {
    notice: {
      informationType: "NOTICE",
      path: "notice",
      title: {
        ko: "공지",
        en: "Notice",
        ja: "お知らせ",
      },
      description: {
        ko: "EFT Library 운영 소식과 서비스 공지를 확인할 수 있습니다.",
        en: "Read EFT Library service updates and official notices.",
        ja: "EFT Library の運営情報と公式のお知らせを確認できます。",
      },
    },
    event: {
      informationType: "EVENT",
      path: "event",
      title: {
        ko: "이벤트",
        en: "Events",
        ja: "イベント",
      },
      description: {
        ko: "Escape from Tarkov 이벤트 정보와 변경 사항을 모아볼 수 있습니다.",
        en: "Browse Escape from Tarkov event updates and gameplay changes.",
        ja: "Escape from Tarkov のイベント情報と変更点を確認できます。",
      },
    },
    "patch-notes": {
      informationType: "PATCH-NOTES",
      path: "patch-notes",
      title: {
        ko: "패치 노트",
        en: "Patch Notes",
        ja: "パッチノート",
      },
      description: {
        ko: "Escape from Tarkov 최신 패치 노트를 빠르게 확인할 수 있습니다.",
        en: "Keep up with the latest Escape from Tarkov patch notes.",
        ja: "Escape from Tarkov の最新パッチノートをすばやく確認できます。",
      },
    },
  };

const informationBoardUiCopy = {
  totalLabel: {
    ko: "전체 게시물",
    en: "Total posts",
    ja: "総投稿数",
  },
  pageLabel: {
    ko: "페이지",
    en: "Page",
    ja: "ページ",
  },
  updatedAtLabel: {
    ko: "업데이트",
    en: "Updated",
    ja: "更新日時",
  },
  noPostsLabel: {
    ko: "표시할 게시물이 없습니다.",
    en: "There are no posts to display.",
    ja: "表示できる投稿がありません。",
  },
  viewDetailLabel: {
    ko: "자세히 보기",
    en: "View detail",
    ja: "詳細を見る",
  },
  previousLabel: {
    ko: "이전",
    en: "Previous",
    ja: "前へ",
  },
  nextLabel: {
    ko: "다음",
    en: "Next",
    ja: "次へ",
  },
  latestPostsLabel: {
    ko: "이전 게시글",
    en: "Related posts",
    ja: "あわせて見る",
  },
  backToListLabel: {
    ko: "목록으로",
    en: "Back to list",
    ja: "一覧へ戻る",
  },
} satisfies Record<string, LocalizedValue>;

export function getInformationBoardPageCopy(
  slug: InformationBoardSlug,
  locale: Locale,
) {
  const config = informationBoardConfig[slug];

  return {
    ...config,
    titleLabel: config.title[locale],
    descriptionLabel: config.description[locale],
    totalLabel: informationBoardUiCopy.totalLabel[locale],
    pageLabel: informationBoardUiCopy.pageLabel[locale],
    updatedAtLabel: informationBoardUiCopy.updatedAtLabel[locale],
    noPostsLabel: informationBoardUiCopy.noPostsLabel[locale],
    viewDetailLabel: informationBoardUiCopy.viewDetailLabel[locale],
    previousLabel: informationBoardUiCopy.previousLabel[locale],
    nextLabel: informationBoardUiCopy.nextLabel[locale],
    latestPostsLabel: informationBoardUiCopy.latestPostsLabel[locale],
    backToListLabel: informationBoardUiCopy.backToListLabel[locale],
  };
}
