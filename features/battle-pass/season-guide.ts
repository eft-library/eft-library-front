import type { Locale } from "@/i18n/config";

// Editorial guide accompanying the Kord Breach redesign. Scope these rules to
// its season code so they cannot carry over automatically to another season.
export const kordBreachGuide = {
  dailyLimits: [40, 25, 15],
  maps: {
    "Blueprints and technical documentation": ["Interchange", "Factory", "Labyrinth"],
    "Financial documents": ["Customs", "Streets of Tarkov", "Interchange"],
    "Medical documents": ["The Lab", "Ground Zero", "Labyrinth", "Icebreaker"],
    "PMC personnel files": ["Reserve", "Lighthouse", "Icebreaker"],
    "User documentation": ["Ground Zero", "Streets of Tarkov", "The Lab"],
    "Test documentation": ["Shoreline", "Woods", "Icebreaker"],
    "Technical documentation": ["Shoreline", "Woods", "Lighthouse"],
    "Project documentation": ["Factory", "Reserve", "Customs"],
  } as Readonly<Partial<Record<string, readonly string[]>>>,
};

const mapNames: Readonly<Record<string, { ko: string; ja: string }>> = {
  Interchange: { ko: "인터체인지", ja: "インターチェンジ" },
  Factory: { ko: "공장", ja: "ファクトリー" },
  Labyrinth: { ko: "미궁", ja: "ラビリンス" },
  Customs: { ko: "세관", ja: "カスタム" },
  "Streets of Tarkov": { ko: "타르코프 시내", ja: "タルコフ市街地" },
  "The Lab": { ko: "연구소", ja: "ラボ" },
  "Ground Zero": { ko: "그라운드 제로", ja: "グラウンドゼロ" },
  Icebreaker: { ko: "아이스브레이커", ja: "アイスブレーカー" },
  Reserve: { ko: "리저브", ja: "リザーブ" },
  Lighthouse: { ko: "등대", ja: "ライトハウス" },
  Shoreline: { ko: "해안선", ja: "ショアライン" },
  Woods: { ko: "삼림", ja: "ウッズ" },
};

export function documentMapName(value: string, locale: Locale) {
  return locale === "en" ? value : mapNames[value]?.[locale] ?? value;
}

const rewardTypes: Readonly<Record<string, { ko: string; ja: string }>> = {
  Currency: { ko: "화폐", ja: "通貨" },
  "Reward loot container": { ko: "보상 상자", ja: "報酬コンテナ" },
  "Trade offer": { ko: "구매 옵션", ja: "取引オファー" },
  "Tactical clothing": { ko: "전술 의류", ja: "タクティカルウェア" },
  "Hideout customization": { ko: "은신처 꾸미기", ja: "隠れ家カスタマイズ" },
  Dogtag: { ko: "인식표", ja: "ドッグタグ" },
  "PMC Face": { ko: "PMC 얼굴", ja: "PMCの顔" },
  "Mannequin pose": { ko: "마네킹 포즈", ja: "マネキンポーズ" },
  Poster: { ko: "포스터", ja: "ポスター" },
  "PMC Voice": { ko: "PMC 음성", ja: "PMCボイス" },
  "Melee weapon": { ko: "근접 무기", ja: "近接武器" },
  "Main menu background": { ko: "메인 메뉴 배경", ja: "メインメニュー背景" },
};

export function rewardTypeName(value: string, locale: Locale) {
  return locale === "en" ? value : rewardTypes[value]?.[locale] ?? value;
}
