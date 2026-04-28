import type { Locale } from "@/i18n/config";

export interface NavigationCopy {
  brandSubtitle: string;
  status: string;
  languageLabel: string;
  browseSections: string;
  searchPlaceholder: string;
  noSearchResults: string;
  login: string;
  logout: string;
  myPage: string;
  guestLabel: string;
  themeToggle: string;
}

export interface FooterCopy {
  title: string;
  description: string;
}

export interface HomeCopy {
  recommendationFeature: string;
  event: string;
  comingSoon: string;
  patchNotes: string;
  tarkovInfo: string;
  notice: string;
  recentPosts: string;
  noNotice: string;
  noPosts: string;
}

export interface WipeCopy {
  title: string;
  description: string;
  version: string;
  start: string;
  end: string;
  days: string;
  active: string;
  completed: string;
  total: string;
}

interface UICopy {
  navigation: NavigationCopy;
  footer: FooterCopy;
  home: HomeCopy;
  wipe: WipeCopy;
}

const uiCopyByLocale: Record<Locale, UICopy> = {
  ko: {
    navigation: {
      brandSubtitle: "Escape from Tarkov Guide Hub",
      status: "지도, 퀘스트, 아이템, 커뮤니티 정보를 한곳에서 확인할 수 있습니다.",
      languageLabel: "언어",
      browseSections: "섹션 둘러보기",
      searchPlaceholder: "검색...",
      noSearchResults: "검색 결과가 없습니다.",
      login: "로그인",
      logout: "로그아웃",
      myPage: "내 정보",
      guestLabel: "게스트",
      themeToggle: "테마 전환",
    },
    footer: {
      title: "EFT Library Front Migration",
      description:
        "공통 셸과 V3 API 레이어를 먼저 정리한 뒤, 화면 단위로 안전하게 이전합니다.",
    },
    home: {
      recommendationFeature: "추천 기능",
      event: "이벤트",
      comingSoon: "업데이트 예정",
      patchNotes: "패치 노트",
      tarkovInfo: "타르코프 정보",
      notice: "공지",
      recentPosts: "최근 게시물",
      noNotice: "현재 공지 항목이 없습니다.",
      noPosts: "아직 노출할 게시물이 없습니다.",
    },
    wipe: {
      title: "타르코프 초기화",
      description: "Escape from Tarkov 시즌 초기화 이력과 현재 시즌 기간을 확인할 수 있습니다.",
      version: "버전",
      start: "시작",
      end: "종료",
      days: "일",
      active: "Active",
      completed: "Completed",
      total: "전체 시즌",
    },
  },
  en: {
    navigation: {
      brandSubtitle: "Escape from Tarkov Guide Hub",
      status: "Browse maps, quests, items and community information in one place.",
      languageLabel: "Language",
      browseSections: "Browse Sections",
      searchPlaceholder: "Search...",
      noSearchResults: "No results found.",
      login: "Log in",
      logout: "Log out",
      myPage: "My page",
      guestLabel: "Guest",
      themeToggle: "Toggle theme",
    },
    footer: {
      title: "EFT Library Front Migration",
      description:
        "We are stabilizing the shared shell and V3 API layer before migrating each screen.",
    },
    home: {
      recommendationFeature: "Recommended",
      event: "Events",
      comingSoon: "Coming Soon",
      patchNotes: "Patch Notes",
      tarkovInfo: "Tarkov Info",
      notice: "Notice",
      recentPosts: "Recent Posts",
      noNotice: "There are no notice items right now.",
      noPosts: "There are no recent posts yet.",
    },
    wipe: {
      title: "Tarkov Wipe",
      description: "Review Escape from Tarkov wipe history and the duration of the current season.",
      version: "Version",
      start: "Start",
      end: "End",
      days: "Days",
      active: "Active",
      completed: "Completed",
      total: "Total seasons",
    },
  },
  ja: {
    navigation: {
      brandSubtitle: "Escape from Tarkov Guide Hub",
      status: "マップ、クエスト、アイテム、コミュニティ情報を一か所で確認できます。",
      languageLabel: "言語",
      browseSections: "セクションを見る",
      searchPlaceholder: "検索...",
      noSearchResults: "検索結果がありません。",
      login: "ログイン",
      logout: "ログアウト",
      myPage: "マイページ",
      guestLabel: "ゲスト",
      themeToggle: "テーマ切替",
    },
    footer: {
      title: "EFT Library Front Migration",
      description:
        "共通シェルとV3 APIレイヤーを先に整えてから、画面単位で安全に移行しています。",
    },
    home: {
      recommendationFeature: "おすすめ機能",
      event: "イベント",
      comingSoon: "アップデート予定",
      patchNotes: "パッチノート",
      tarkovInfo: "タルコフ情報",
      notice: "お知らせ",
      recentPosts: "最近の投稿",
      noNotice: "現在表示できるお知らせはありません。",
      noPosts: "まだ表示できる投稿がありません。",
    },
    wipe: {
      title: "タルコフワイプ",
      description: "Escape from Tarkovのワイプ履歴と現在シーズンの期間を確認できます。",
      version: "バージョン",
      start: "開始",
      end: "終了",
      days: "日",
      active: "Active",
      completed: "Completed",
      total: "総シーズン数",
    },
  },
};

export function getUICopy(locale: Locale): UICopy {
  return uiCopyByLocale[locale];
}
