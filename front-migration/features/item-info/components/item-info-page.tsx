import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftRight,
  ArrowUpDown,
  Bomb,
  Boxes,
  CheckCircle2,
  Clock,
  Crosshair,
  Droplet,
  Droplets,
  ExternalLink,
  Footprints,
  Gauge,
  Hammer,
  Hand,
  Heart,
  HeartPulse,
  Info,
  LayoutGrid,
  MinusCircle,
  Package,
  RotateCw,
  Scale,
  Settings,
  Shield,
  ShieldMinus,
  ShieldCheck,
  Swords,
  Target,
} from "lucide-react";

import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import type { Locale } from "@/i18n/config";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type {
  ItemInfoResponse,
  ItemHideoutCraft,
  ItemTraderBarter,
  ProtectionZones,
  RelatedHideoutInfo,
  RelatedItemInfo,
  RelatedQuestInfo,
  RelatedTraderInfo,
} from "@/types/api/item-info";

type DetailValue = number | string | null | undefined;

type DetailRow = {
  label: string;
  value: DetailValue | React.ReactNode;
  icon: React.ReactNode;
  suffix?: string;
  show?: boolean;
  wide?: boolean;
};

const LEVEL_COLORS = [
  "#D4A076",
  "#E06A32",
  "#70A568",
  "#4B91A3",
  "#5A5FAA",
  "#914FA3",
];

type DetailGroupProps = {
  title: string;
  icon: React.ReactNode;
  rows?: DetailRow[];
  children?: React.ReactNode;
};

type LocalizedCopy = Record<Locale, string>;

const itemInfoCopy: Record<
  Locale,
  {
    groups: Record<string, string>;
    labels: Record<string, string>;
    units: Record<string, string>;
    fallback: Record<string, string>;
  }
> = {
  ko: {
    groups: {
      basic: "기본 정보",
      info: "정보",
      ammo: "사용 가능 탄약",
      penalty: "패널티",
      usage: "사용 정보",
      questRequirements: "퀘스트 필요",
      traderBarters: "상인 교환으로 획득",
      usedInTraderBarters: "상인 교환 재료로 사용",
      hideoutCrafts: "은신처 제작",
      questRewards: "퀘스트 보상",
      hideoutConstructions: "은신처 건설 필요",
      questCraftUnlockRewards: "퀘스트 제작 해금 보상",
      bossDrops: "보스 드랍/보유",
      compatibleWeapons: "사용 가능한 무기",
      defaultForWeapons: "기본 탄약으로 쓰는 무기",
    },
    labels: {
      classification: "분류",
      parentCategoryDescription: "상위 분류 설명",
      categoryDescription: "세부 분류 설명",
      weight: "무게",
      nameKo: "한국어 이름",
      nameEn: "영어 이름",
      nameJa: "일본어 이름",
      normalizedName: "정규화 이름",
      itemId: "아이템 ID",
      ergonomics: "인체공학",
      horizontalRecoil: "수평 반동",
      verticalRecoil: "수직 반동",
      fireMode: "사격 모드",
      fireRate: "연사 속도",
      caliber: "구경",
      defaultAmmo: "기본 탄약",
      damage: "데미지",
      penetration: "관통력",
      armorDamage: "방어구 데미지",
      accuracy: "정확도",
      recoil: "반동",
      lightBleed: "약한 출혈",
      heavyBleed: "강한 출혈",
      armorEfficiency: "방어구 효율",
      armorClass: "방어구 클래스",
      armorZones: "방어 부위",
      material: "재질",
      durability: "내구도",
      ricochet: "도탄",
      deafening: "청각 차단",
      blindnessProtection: "실명 보호",
      slots: "슬롯",
      internalSize: "내부 크기",
      type: "종류",
      healing: "회복량",
      useTime: "사용 시간",
      energy: "에너지",
      hydration: "수분",
      uses: "사용 횟수",
      painkiller: "진통 지속",
      cures: "치료 효과",
      fuse: "신관",
      fragments: "파편",
      contusionRadius: "충격 반경",
      minExplosionDistance: "최소 폭발 거리",
      maxExplosionDistance: "최대 폭발 거리",
      hitRadius: "타격 반경",
      slashDamage: "베기 데미지",
      stabDamage: "찌르기 데미지",
      ergonomicsPenalty: "인체공학 패널티",
      movementSpeedPenalty: "이동 속도 패널티",
      turnSpeedPenalty: "회전 속도 패널티",
      distanceModifier: "거리 보정",
      maxUses: "최대 사용 횟수",
      detailData: "상세 데이터",
      requireItems: "필요 재료",
      rewardItems: "결과/보상",
      traderLevel: "상인 레벨",
      level: "레벨",
      quantity: "수량",
      requiredQuantity: "필요 수량",
      rewardQuantity: "보상 수량",
      craftDuration: "제작 시간",
      constructionTime: "건설 시간",
      foundInRaid: "인레이드",
      inRaid: "인레이드 필요",
      objective: "목표",
      yes: "예",
      no: "아니오",
    },
    units: {
      seconds: "초",
    },
    fallback: {
      basicOnly: "기본 정보만 제공",
      parentCategory: "{value} 상위 분류에 속하는 아이템입니다.",
      category: "{value} 세부 분류에 속하는 아이템입니다.",
    },
  },
  en: {
    groups: {
      basic: "Basic Info",
      info: "Info",
      ammo: "Allowed Ammo",
      penalty: "Penalties",
      usage: "Usage",
      questRequirements: "Required by Quests",
      traderBarters: "Received from Trader Barters",
      usedInTraderBarters: "Used in Trader Barters",
      hideoutCrafts: "Hideout Crafts",
      questRewards: "Quest Rewards",
      hideoutConstructions: "Hideout Construction",
      questCraftUnlockRewards: "Quest Craft Unlock Rewards",
      bossDrops: "Boss Drops / Inventory",
      compatibleWeapons: "Compatible Weapons",
      defaultForWeapons: "Default Ammo For",
    },
    labels: {
      classification: "Classification",
      parentCategoryDescription: "Parent Category",
      categoryDescription: "Category Detail",
      weight: "Weight",
      nameKo: "Korean Name",
      nameEn: "English Name",
      nameJa: "Japanese Name",
      normalizedName: "Normalized Name",
      itemId: "Item ID",
      ergonomics: "Ergonomics",
      horizontalRecoil: "Horizontal Recoil",
      verticalRecoil: "Vertical Recoil",
      fireMode: "Fire Mode",
      fireRate: "Fire Rate",
      caliber: "Caliber",
      defaultAmmo: "Default Ammo",
      damage: "Damage",
      penetration: "Penetration",
      armorDamage: "Armor Damage",
      accuracy: "Accuracy",
      recoil: "Recoil",
      lightBleed: "Light Bleed",
      heavyBleed: "Heavy Bleed",
      armorEfficiency: "Armor Efficiency",
      armorClass: "Armor Class",
      armorZones: "Armor Zones",
      material: "Material",
      durability: "Durability",
      ricochet: "Ricochet",
      deafening: "Deafening",
      blindnessProtection: "Blindness Protection",
      slots: "Slots",
      internalSize: "Internal Size",
      type: "Type",
      healing: "Healing",
      useTime: "Use Time",
      energy: "Energy",
      hydration: "Hydration",
      uses: "Uses",
      painkiller: "Painkiller",
      cures: "Cures",
      fuse: "Fuse",
      fragments: "Fragments",
      contusionRadius: "Contusion Radius",
      minExplosionDistance: "Min Explosion Distance",
      maxExplosionDistance: "Max Explosion Distance",
      hitRadius: "Hit Radius",
      slashDamage: "Slash Damage",
      stabDamage: "Stab Damage",
      ergonomicsPenalty: "Ergonomics Penalty",
      movementSpeedPenalty: "Movement Speed Penalty",
      turnSpeedPenalty: "Turn Speed Penalty",
      distanceModifier: "Distance Modifier",
      maxUses: "Max Uses",
      detailData: "Detail Data",
      requireItems: "Required Items",
      rewardItems: "Result / Rewards",
      traderLevel: "Trader Level",
      level: "Level",
      quantity: "Quantity",
      requiredQuantity: "Required Quantity",
      rewardQuantity: "Reward Quantity",
      craftDuration: "Craft Duration",
      constructionTime: "Construction Time",
      foundInRaid: "In Raid",
      inRaid: "In Raid Required",
      objective: "Objective",
      yes: "Yes",
      no: "No",
    },
    units: {
      seconds: "sec",
    },
    fallback: {
      basicOnly: "Only basic metadata is available.",
      parentCategory: "This item belongs to the {value} parent category.",
      category: "This item belongs to the {value} category.",
    },
  },
  ja: {
    groups: {
      basic: "基本情報",
      info: "情報",
      ammo: "使用可能な弾薬",
      penalty: "ペナルティ",
      usage: "使用情報",
      questRequirements: "クエスト必要",
      traderBarters: "トレーダー交換で入手",
      usedInTraderBarters: "トレーダー交換素材",
      hideoutCrafts: "隠れ家クラフト",
      questRewards: "クエスト報酬",
      hideoutConstructions: "隠れ家建設必要",
      questCraftUnlockRewards: "クエスト制作アンロック報酬",
      bossDrops: "ボスドロップ/所持",
      compatibleWeapons: "使用可能な武器",
      defaultForWeapons: "標準弾薬として使用する武器",
    },
    labels: {
      classification: "分類",
      parentCategoryDescription: "上位分類",
      categoryDescription: "詳細分類",
      weight: "重量",
      nameKo: "韓国語名",
      nameEn: "英語名",
      nameJa: "日本語名",
      normalizedName: "正規化名",
      itemId: "アイテムID",
      ergonomics: "エルゴノミクス",
      horizontalRecoil: "水平反動",
      verticalRecoil: "垂直反動",
      fireMode: "射撃モード",
      fireRate: "発射速度",
      caliber: "口径",
      defaultAmmo: "標準弾薬",
      damage: "ダメージ",
      penetration: "貫通力",
      armorDamage: "アーマーダメージ",
      accuracy: "精度",
      recoil: "反動",
      lightBleed: "軽出血",
      heavyBleed: "重出血",
      armorEfficiency: "アーマー効率",
      armorClass: "アーマークラス",
      armorZones: "保護部位",
      material: "素材",
      durability: "耐久度",
      ricochet: "跳弾",
      deafening: "聴覚遮断",
      blindnessProtection: "閃光保護",
      slots: "スロット",
      internalSize: "内部サイズ",
      type: "種類",
      healing: "回復量",
      useTime: "使用時間",
      energy: "エネルギー",
      hydration: "水分",
      uses: "使用回数",
      painkiller: "鎮痛持続",
      cures: "治療効果",
      fuse: "信管",
      fragments: "破片",
      contusionRadius: "衝撃半径",
      minExplosionDistance: "最小爆発距離",
      maxExplosionDistance: "最大爆発距離",
      hitRadius: "攻撃範囲",
      slashDamage: "斬撃ダメージ",
      stabDamage: "刺突ダメージ",
      ergonomicsPenalty: "エルゴペナルティ",
      movementSpeedPenalty: "移動速度ペナルティ",
      turnSpeedPenalty: "旋回速度ペナルティ",
      distanceModifier: "距離補正",
      maxUses: "最大使用回数",
      detailData: "詳細データ",
      requireItems: "必要素材",
      rewardItems: "結果/報酬",
      traderLevel: "トレーダーレベル",
      level: "レベル",
      quantity: "数量",
      requiredQuantity: "必要数量",
      rewardQuantity: "報酬数量",
      craftDuration: "制作時間",
      constructionTime: "建設時間",
      foundInRaid: "レイド内",
      inRaid: "レイド内必要",
      objective: "目標",
      yes: "はい",
      no: "いいえ",
    },
    units: {
      seconds: "秒",
    },
    fallback: {
      basicOnly: "基本情報のみ提供されています。",
      parentCategory: "このアイテムは{value}上位分類に属します。",
      category: "このアイテムは{value}分類に属します。",
    },
  },
};

const fireModeLabels: Record<string, LocalizedCopy> = {
  single_fire: { ko: "단발", en: "Single fire", ja: "単発" },
  full_auto: { ko: "연사", en: "Full auto", ja: "フルオート" },
  burst_fire: { ko: "점사", en: "Burst fire", ja: "バースト" },
  double_action: { ko: "더블 액션", en: "Double action", ja: "ダブルアクション" },
  double_tap: { ko: "더블 탭", en: "Double tap", ja: "ダブルタップ" },
  semi_auto: { ko: "반자동", en: "Semi auto", ja: "セミオート" },
};

const zoneLabels: Record<keyof ProtectionZones, LocalizedCopy> = {
  head_top: { ko: "머리 상단", en: "Head top", ja: "頭頂部" },
  head_nape: { ko: "목덜미", en: "Nape", ja: "うなじ" },
  head_ears: { ko: "귀", en: "Ears", ja: "耳" },
  head_face: { ko: "얼굴", en: "Face", ja: "顔" },
  head_jaws: { ko: "턱", en: "Jaws", ja: "顎" },
  head_eyes: { ko: "눈", en: "Eyes", ja: "目" },
  thorax_throat: { ko: "목", en: "Throat", ja: "喉" },
  thorax_neck: { ko: "목", en: "Neck", ja: "首" },
  thorax: { ko: "흉부", en: "Thorax", ja: "胸部" },
  upper_back: { ko: "등 상단", en: "Upper back", ja: "上背部" },
  stomach: { ko: "복부", en: "Stomach", ja: "腹部" },
  left_side: { ko: "왼쪽 측면", en: "Left side", ja: "左側面" },
  right_side: { ko: "오른쪽 측면", en: "Right side", ja: "右側面" },
  lower_back: { ko: "등 하단", en: "Lower back", ja: "下背部" },
  groin: { ko: "사타구니", en: "Groin", ja: "鼠径部" },
  buttocks: { ko: "엉덩이", en: "Buttocks", ja: "臀部" },
  left_shoulder: { ko: "왼쪽 어깨", en: "Left shoulder", ja: "左肩" },
  right_shoulder: { ko: "오른쪽 어깨", en: "Right shoulder", ja: "右肩" },
  front_plate: { ko: "전면 플레이트", en: "Front plate", ja: "前面プレート" },
  back_plate: { ko: "후면 플레이트", en: "Back plate", ja: "背面プレート" },
  left_plate: { ko: "왼쪽 플레이트", en: "Left plate", ja: "左プレート" },
  right_plate: { ko: "오른쪽 플레이트", en: "Right plate", ja: "右プレート" },
  side_plate: { ko: "측면 플레이트", en: "Side plate", ja: "側面プレート" },
};

const parentCategoryDescriptions: Record<string, string> = {
  Ammo: "탄약과 로켓처럼 무기에 장전해서 사용하는 소모성 전투 아이템입니다.",
  "Armored equipment": "피격 부위를 보호하거나 시야, 청각, 이동 패널티에 영향을 주는 장비입니다.",
  "Barter item": "교환, 제작, 은신처, 판매 가치 확인에 주로 쓰이는 루팅 아이템입니다.",
  Completable: "스토리나 수집형 진행에서 완료 조건으로 쓰이는 기록성 아이템입니다.",
  "Compound item": "내부 공간이나 잠금 구조를 가진 컨테이너 계열 아이템입니다.",
  "Cylinder Magazine": "회전식 탄창 구조를 가진 무기 부품입니다.",
  Equipment: "착용 장비와 주변 장비를 묶는 상위 장비 카테고리입니다.",
  "Essential mod": "총기 작동이나 기본 조립에 필요한 핵심 모딩 부품입니다.",
  "Food and drink": "에너지와 수분 수치를 회복하거나 변화시키는 소비 아이템입니다.",
  "Functional mod": "전술 장비, 손잡이, 가스 블록처럼 성능이나 조작감을 보정하는 부품입니다.",
  "Gear mod": "탄창, 개머리판, 마운트처럼 장비 운용성을 바꾸는 부품입니다.",
  Info: "대화, 안내, 정보성 데이터로 분류되는 아이템입니다.",
  Item: "특수 아이템, 지도, 투척 무기 등 일반 목적 아이템을 포함하는 상위 분류입니다.",
  Key: "잠긴 구역, 방, 컨테이너 접근에 필요한 열쇠 계열 아이템입니다.",
  Lubricant: "연료나 윤활유처럼 은신처와 제작에서 자주 쓰이는 자원 아이템입니다.",
  Magazine: "탄약을 장전하고 무기에 결합하는 탄창 계열 아이템입니다.",
  Meds: "체력 회복, 상태 이상 치료, 버프 효과에 쓰이는 의료 아이템입니다.",
  "Muzzle device": "총구 반동, 소음, 화염 억제에 영향을 주는 총구 부품입니다.",
  "Quest Item": "퀘스트 진행 중 획득하거나 제출하는 목적성 아이템입니다.",
  "Searchable item": "보관 공간을 제공하거나 내부를 탐색할 수 있는 컨테이너성 아이템입니다.",
  Sights: "조준, 배율, 야간/열상 시야를 제공하는 광학 장비입니다.",
  "Special item": "특수 기능, 이벤트, 설치, 수리 등 고유 목적을 가진 아이템입니다.",
  "Special scope": "야간 투시나 열상처럼 특수 시야를 제공하는 조준 장비입니다.",
  "Stackable item": "탄약, 화폐처럼 여러 개를 한 슬롯에 중첩할 수 있는 아이템입니다.",
  Weapon: "탄약을 사용해 전투에 직접 쓰는 무기 카테고리입니다.",
};

const categoryDescriptions: Record<string, string> = {
  Rocket: "로켓 런처 계열 무기에 사용하는 대형 탄약입니다.",
  Armor: "흉부나 복부 등 주요 부위를 보호하는 방어구입니다.",
  "Armor Plate": "플레이트 슬롯에 장착해 방어 성능을 구성하는 장갑판입니다.",
  "Face Cover": "얼굴 부위를 덮는 장비로 일부 보호나 장착 조건에 영향을 줍니다.",
  Headwear: "머리에 착용하는 장비로 방어, 시야, 부착물 호환성이 중요합니다.",
  "Vis. observ. device": "시야 관측과 특수 시야 확보에 쓰이는 장비입니다.",
  Battery: "교환, 제작, 은신처에서 전원 자원으로 자주 쓰이는 아이템입니다.",
  "Building material": "은신처 건설과 업그레이드에 자주 요구되는 자재입니다.",
  Electronics: "전자 부품 계열로 제작, 교환, 은신처 요구사항에 자주 쓰입니다.",
  "Household goods": "생활용품 계열 루팅 아이템으로 교환이나 제작에 쓰입니다.",
  Jewelry: "귀금속 계열 아이템으로 판매 가치와 교환 활용도가 중요한 분류입니다.",
  Lubricant: "윤활유 계열 자원으로 제작이나 은신처에서 활용됩니다.",
  "Medical supplies": "의료 제작이나 교환에 쓰이는 재료성 아이템입니다.",
  Other: "특정 세부 분류에 묶이지 않는 기타 아이템입니다.",
  Tool: "제작, 은신처, 수리와 관련된 공구 계열 아이템입니다.",
  Notes: "기록이나 문서 형태의 수집성 아이템입니다.",
  Tapes: "테이프 형태의 기록성 또는 수집형 아이템입니다.",
  "Common container": "일반 보관 용도의 컨테이너 아이템입니다.",
  "Locking container": "잠금 구조를 가진 보관 컨테이너입니다.",
  "Spring Driven Cylinder": "스프링 구동 방식의 실린더 탄창입니다.",
  "Arm Band": "팔에 착용하는 식별용 장비입니다.",
  "Armored equipment": "방어 성능이 있는 착용 장비입니다.",
  Headphones: "청각 정보와 소리 차단에 영향을 주는 헤드셋입니다.",
  Barrel: "총열 계열 부품으로 명중률, 반동, 총기 호환성에 영향을 줍니다.",
  Handguard: "총열 주변에 장착하며 부착물과 인체공학에 영향을 주는 부품입니다.",
  "Pistol grip": "손잡이 부품으로 인체공학과 조작감에 영향을 줍니다.",
  Receiver: "총기 핵심 구조를 이루는 리시버 부품입니다.",
  Drink: "수분 회복이나 수분 수치 변화에 쓰이는 소비 아이템입니다.",
  Food: "에너지 회복이나 에너지 수치 변화에 쓰이는 소비 아이템입니다.",
  "Auxiliary Mod": "보조 기능을 제공하는 모딩 부품입니다.",
  Bipod: "거치 안정성과 반동 제어에 관련된 부품입니다.",
  "Comb. tact. device": "조명, 레이저 등 복합 전술 기능을 제공하는 장비입니다.",
  Flashlight: "시야 확보와 전술 조명에 쓰이는 부착물입니다.",
  Foregrip: "인체공학과 반동 제어에 영향을 주는 전방 손잡이입니다.",
  "Gas block": "가스 시스템 구성에 필요한 총기 부품입니다.",
  "Charging handle": "장전 조작에 쓰이는 총기 부품입니다.",
  Magazine: "탄약을 담아 무기에 공급하는 탄창입니다.",
  Mount: "조준기나 전술 장비를 결합하기 위한 마운트입니다.",
  Stock: "견착 안정성과 반동, 인체공학에 영향을 주는 개머리판입니다.",
  UBGL: "총열 하부에 장착하는 유탄 발사기 부품입니다.",
  "Dialog Item": "대화나 정보 표시 목적의 아이템입니다.",
  Flyer: "전단지 형태의 정보성 아이템입니다.",
  Info: "정보성 아이템입니다.",
  Knife: "근접 공격에 사용하는 칼 계열 아이템입니다.",
  Map: "지역 정보 확인에 쓰이는 지도 아이템입니다.",
  "Special item": "특수 기능이나 이벤트 목적을 가진 아이템입니다.",
  "Throwable weapon": "던져서 사용하는 무기나 폭발물 계열 아이템입니다.",
  Keycard: "카드 리더 접근에 필요한 키카드입니다.",
  "Mechanical Key": "문이나 잠금 장치를 여는 물리 열쇠입니다.",
  Fuel: "은신처 발전기 등에서 사용하는 연료 아이템입니다.",
  "Cylinder Magazine": "회전식 구조의 탄창입니다.",
  Drug: "상태 이상 치료나 지속 효과를 제공하는 의료 소비 아이템입니다.",
  "Medical item": "특정 상태 이상 치료나 의료 목적의 아이템입니다.",
  Medikit: "체력 회복과 출혈 치료에 쓰이는 의료 키트입니다.",
  Stimulant: "일시적인 능력치 변화나 치료 효과를 제공하는 주사제입니다.",
  "Comb. muzzle device": "여러 총구 기능을 함께 제공하는 복합 총구 장치입니다.",
  Flashhider: "총구 화염을 줄이는 총구 부품입니다.",
  Silencer: "소음과 총구 화염을 억제하는 총구 부품입니다.",
  Loot: "퀘스트 획득 또는 제출 대상으로 쓰이는 루팅 아이템입니다.",
  Backpack: "아이템 보관 공간을 늘리는 가방입니다.",
  "Chest rig": "탄창과 장비를 수납하는 전술 조끼입니다.",
  "Port. container": "휴대 가능한 보관 컨테이너입니다.",
  "Random Loot Container": "내부에서 무작위 루팅이 가능한 컨테이너입니다.",
  "Assault scope": "중거리 전투에 적합한 배율 조준기입니다.",
  "Compact reflex sight": "소형 반사 조준기입니다.",
  Ironsight: "기계식 조준기입니다.",
  "Reflex sight": "빠른 조준에 적합한 반사 조준기입니다.",
  Scope: "배율 조준 기능을 제공하는 광학 장비입니다.",
  "Special scope": "특수 시야 기능을 가진 조준 장비입니다.",
  Compass: "방향 확인에 쓰이는 특수 장비입니다.",
  "Cultist Amulet": "특수 이벤트나 조건과 관련된 아이템입니다.",
  "Mark of the Unheard": "특수 상태나 진행 조건과 관련된 아이템입니다.",
  Multitools: "다목적 공구 계열 아이템입니다.",
  "Planting Kits": "설치나 퀘스트 진행에 쓰이는 키트입니다.",
  "Portable Range Finder": "거리 측정에 쓰이는 특수 장비입니다.",
  "Radio Transmitter": "무선 송신 관련 특수 아이템입니다.",
  Recorder: "기록 장치 계열 특수 아이템입니다.",
  "Repair Kits": "장비 수리와 내구도 복구에 쓰이는 키트입니다.",
  "Night Vision": "야간 시야 확보에 쓰이는 장비입니다.",
  "Thermal Vision": "열상 시야 확보에 쓰이는 장비입니다.",
  Ammo: "총기나 무기에 장전하는 탄약입니다.",
  "Ammo container": "탄약 보관을 위한 컨테이너입니다.",
  Money: "거래와 교환에 쓰이는 화폐 아이템입니다.",
  "Assault carbine": "돌격 카빈 계열 주무기입니다.",
  "Assault rifle": "돌격소총 계열 주무기입니다.",
  "Grenade launcher": "유탄을 발사하는 무기입니다.",
  Handgun: "권총 계열 보조 무기입니다.",
  Machinegun: "지속 사격에 특화된 기관총입니다.",
  "Marksman rifle": "중장거리 정밀 사격에 적합한 지정사수소총입니다.",
  Revolver: "회전식 탄창을 쓰는 권총입니다.",
  "Rocket Launcher": "로켓 탄약을 발사하는 중화기입니다.",
  Shotgun: "산탄이나 슬러그 탄을 사용하는 산탄총입니다.",
  SMG: "근거리 연사에 특화된 기관단총입니다.",
  "Sniper rifle": "장거리 정밀 사격에 특화된 저격소총입니다.",
};

function getLocalizedName(
  item: Pick<ItemInfoResponse, "name_en" | "name_ko" | "name_ja">,
  locale: Locale,
) {
  const localized = pickLocalizedField(
    item as unknown as Record<string, unknown>,
    locale,
    "name",
  );

  return typeof localized === "string" && localized ? localized : item.name_en;
}

function translate(copy: LocalizedCopy | undefined, locale: Locale, fallback: string) {
  return copy?.[locale] ?? fallback;
}

function template(value: string, text: string) {
  return text.replace("{value}", value);
}

function getCategoryDescription(category: string | null, locale: Locale) {
  if (!category) {
    return null;
  }

  if (locale === "ko") {
    return categoryDescriptions[category] ?? template(category, itemInfoCopy.ko.fallback.category);
  }

  return template(category, itemInfoCopy[locale].fallback.category);
}

function getParentCategoryDescription(parentCategory: string | null, locale: Locale) {
  if (!parentCategory) {
    return null;
  }

  if (locale === "ko") {
    return (
      parentCategoryDescriptions[parentCategory] ??
      template(parentCategory, itemInfoCopy.ko.fallback.parentCategory)
    );
  }

  return template(parentCategory, itemInfoCopy[locale].fallback.parentCategory);
}

function formatValue(value: DetailValue, suffix = "") {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  const text =
    typeof value === "number" ? new Intl.NumberFormat("en-US").format(value) : value;

  return suffix ? `${text} ${suffix}` : text;
}

function hasValue(value: DetailValue | React.ReactNode) {
  if (value === null || value === undefined || value === "") {
    return false;
  }

  return true;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex max-w-full items-center rounded-md border border-slate-200 bg-white px-2.5 py-1 text-sm font-semibold text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
      {children}
    </span>
  );
}

function DetailCard({
  item,
  itemName,
  children,
}: {
  item: ItemInfoResponse;
  itemName: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700/70 dark:bg-[#252830]">
      <div className="px-4 pb-2 pt-6 text-center sm:px-6">
        <div className="mx-auto mb-2 flex h-40 w-40 items-center justify-center rounded-xl bg-slate-100 p-2 dark:bg-slate-800/70">
          <div className="relative h-36 w-36">
            <Image
              src={item.image}
              alt={itemName}
              fill
              sizes="144px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
      <div className="space-y-5 px-4 pb-6 sm:px-6">{children}</div>
    </section>
  );
}

function DetailGroup({ title, icon, rows = [], children }: DetailGroupProps) {
  const visibleRows = rows.filter((row) => row.show !== false && hasValue(row.value));

  if (visibleRows.length === 0 && !children) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-orange-500 dark:text-orange-300">{icon}</span>
        <h2 className="text-sm font-semibold text-orange-600 dark:text-orange-300 sm:text-base">
          {title}
        </h2>
      </div>

      {visibleRows.length > 0 ? (
        <div className="space-y-2">
          {visibleRows.map((row) => (
            <div
              key={row.label}
              className={`rounded-lg bg-slate-100/80 px-3 py-2 transition-colors hover:bg-slate-200/80 dark:bg-slate-800/55 dark:hover:bg-slate-800 ${
                row.wide
                  ? "space-y-2"
                  : "flex items-center justify-between gap-3"
              }`}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="shrink-0">{row.icon}</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 sm:text-base">
                  {row.label}
                </span>
              </div>
              <div
                className={
                  row.wide
                    ? "text-sm leading-6 text-slate-700 dark:text-slate-200"
                    : "min-w-0 shrink-0 text-right"
                }
              >
                {typeof row.value === "string" || typeof row.value === "number" ? (
                  row.wide ? (
                    formatValue(row.value, row.suffix)
                  ) : (
                    <Badge>{formatValue(row.value, row.suffix)}</Badge>
                  )
                ) : (
                  row.value
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {children}
    </div>
  );
}

function ChipList({ values }: { values: string[] }) {
  if (values.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-end gap-1">
      {values.map((value) => (
        <Badge key={value}>{value}</Badge>
      ))}
    </div>
  );
}

function RelatedItemCard({ item, locale }: { item: RelatedItemInfo; locale: Locale }) {
  const name = getLocalizedName(item, locale);

  return (
    <Link
      href={`/item/info/${item.normalized_name}`}
      target="_blank"
      rel="noreferrer"
      className="group flex w-48 max-w-full flex-col items-center justify-center rounded-lg bg-slate-100/80 p-2.5 text-center transition-colors hover:bg-slate-200/90 dark:bg-slate-800/55 dark:hover:bg-slate-800"
    >
      <div className="relative h-20 w-20">
        <Image
          src={item.image}
          alt={name}
          fill
          sizes="80px"
          className="object-contain"
        />
      </div>
      <div className="mt-2 flex min-h-10 max-w-full items-start gap-1 text-sm font-bold leading-tight text-slate-900 dark:text-slate-100">
        <span className="line-clamp-3 min-w-0 break-words [overflow-wrap:anywhere]">
          {name}
        </span>
        <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-50 transition group-hover:opacity-100" />
      </div>
    </Link>
  );
}

function getEntityName(
  entity:
    | RelatedItemInfo
    | RelatedQuestInfo
    | RelatedTraderInfo
    | RelatedHideoutInfo,
  locale: Locale,
) {
  return getLocalizedName(entity, locale);
}

function QuestLink({ quest, locale }: { quest: RelatedQuestInfo; locale: Locale }) {
  return (
    <Link
      href={`/quest/detail/${quest.normalized_name}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-w-0 items-center gap-1 font-semibold text-orange-600 hover:text-orange-500 dark:text-orange-300 dark:hover:text-orange-200"
    >
      <span className="truncate">{getEntityName(quest, locale)}</span>
      <ExternalLink className="h-3.5 w-3.5" />
    </Link>
  );
}

function getLevelColor(level: number | null | undefined) {
  if (!level) {
    return "#94a3b8";
  }

  return LEVEL_COLORS[Math.max(0, level - 1) % LEVEL_COLORS.length];
}

function HideoutPill({
  hideout,
  locale,
  levelLabel,
}: {
  hideout: RelatedHideoutInfo;
  locale: Locale;
  levelLabel: string;
}) {
  const name = getEntityName(hideout, locale);
  const color = getLevelColor(hideout.level);
  const icon = getStationSVG(hideout.id, 42, 42, color) ?? (
    <Hammer className="h-8 w-8" style={{ color }} />
  );
  const content = (
    <span className="inline-flex min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-orange-400/30 dark:hover:bg-orange-400/10">
      <span className="shrink-0">{icon}</span>
      <span className="min-w-0">
        <span className="block truncate">{name}</span>
        {hideout.level ? (
          <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
            {levelLabel} {formatValue(hideout.level)}
          </span>
        ) : null}
      </span>
    </span>
  );

  if (!hideout.normalized_name) {
    return content;
  }

  return (
    <Link
      href={`/hideout/${hideout.normalized_name}`}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </Link>
  );
}

function EntityPill({
  image,
  name,
  meta,
}: {
  image?: string | null;
  name: string;
  meta?: string;
}) {
  return (
    <span className="inline-flex min-w-0 max-w-full items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-sm font-semibold text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
      {image ? (
        <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full">
          <Image src={image} alt={name} fill sizes="20px" className="object-cover" />
        </span>
      ) : null}
      <span className="truncate">{name}</span>
      {meta ? <span className="shrink-0 text-xs opacity-65">{meta}</span> : null}
    </span>
  );
}

function RaidRequiredBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-200">
      <ShieldCheck className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

function getLocalizedObjectiveDescription(
  objective: {
    description_en: string | null;
    description_ko: string | null;
    description_ja: string | null;
  },
  locale: Locale,
) {
  const localized = pickLocalizedField(
    objective as unknown as Record<string, unknown>,
    locale,
    "description",
  );

  return typeof localized === "string" && localized
    ? localized
    : objective.description_en ?? "";
}

function ItemLine({
  entry,
  locale,
}: {
  entry: { id: string; quantity: number; item: RelatedItemInfo };
  locale: Locale;
}) {
  const name = getEntityName(entry.item, locale);

  return (
    <Link
      href={`/item/info/${entry.item.normalized_name}`}
      target="_blank"
      rel="noreferrer"
      className="group flex min-w-0 items-center gap-2 rounded-lg bg-slate-100/80 px-2 py-2 text-sm transition hover:bg-slate-200/80 dark:bg-slate-800/55 dark:hover:bg-slate-800"
    >
      <span className="relative h-9 w-9 shrink-0">
        <Image
          src={entry.item.image}
          alt={name}
          fill
          sizes="36px"
          className="object-contain"
        />
      </span>
      <span className="min-w-0 flex-1 break-words font-medium leading-snug text-slate-800 [overflow-wrap:anywhere] dark:text-slate-100">
        {name}
      </span>
      <Badge>x{formatValue(entry.quantity)}</Badge>
    </Link>
  );
}

function ItemLineList({
  title,
  items,
  locale,
}: {
  title: string;
  items?: Array<{ id: string; quantity: number; item: RelatedItemInfo }>;
  locale: Locale;
}) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <div className="grid gap-2">
        {items.map((entry) => (
          <ItemLine key={entry.id} entry={entry} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function RelationSection({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  if (count === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-700/70 dark:bg-[#252830]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Info className="h-4 w-4 shrink-0 text-orange-500 dark:text-orange-300" />
          <h2 className="truncate text-sm font-semibold text-orange-600 dark:text-orange-300 sm:text-base">
            {title}
          </h2>
        </div>
        <Badge>{formatValue(count)}</Badge>
      </div>
      <div className="grid gap-3 md:grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
        {children}
      </div>
    </section>
  );
}

function CompactRelationRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-0 space-y-3 rounded-lg bg-slate-100/80 px-3 py-3 dark:bg-slate-800/55">
      {children}
    </div>
  );
}

function RelationGrid({
  items,
  locale,
}: {
  items: RelatedItemInfo[];
  locale: Locale;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
      {items.map((entry) => (
        <RelatedItemCard key={entry.id} item={entry} locale={locale} />
      ))}
    </div>
  );
}

function formatSecondsToDuration(totalSeconds: number | null | undefined, locale: Locale) {
  if (!totalSeconds || totalSeconds <= 0) {
    return locale === "en" ? "Instant" : locale === "ja" ? "即時" : "즉시";
  }

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (locale === "en") {
    return [
      days > 0 ? `${days}d` : null,
      hours > 0 ? `${hours}h` : null,
      minutes > 0 ? `${minutes}m` : null,
      seconds > 0 || (days === 0 && hours === 0 && minutes === 0) ? `${seconds}s` : null,
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (locale === "ja") {
    return [
      days > 0 ? `${days}日` : null,
      hours > 0 ? `${hours}時間` : null,
      minutes > 0 ? `${minutes}分` : null,
      seconds > 0 || (days === 0 && hours === 0 && minutes === 0) ? `${seconds}秒` : null,
    ]
      .filter(Boolean)
      .join(" ");
  }

  return [
    days > 0 ? `${days}일` : null,
    hours > 0 ? `${hours}시간` : null,
    minutes > 0 ? `${minutes}분` : null,
    seconds > 0 || (days === 0 && hours === 0 && minutes === 0) ? `${seconds}초` : null,
  ]
    .filter(Boolean)
    .join(" ");
}

function BarterRow({
  barter,
  copy,
  locale,
  mode,
}: {
  barter: ItemTraderBarter;
  copy: (typeof itemInfoCopy)[Locale];
  locale: Locale;
  mode: "reward" | "require";
}) {
  return (
    <CompactRelationRow>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <EntityPill
          image={barter.trader.image}
          name={getEntityName(barter.trader, locale)}
          meta={
            barter.trader_level
              ? `${copy.labels.traderLevel} ${formatValue(barter.trader_level)}`
              : undefined
          }
        />
        <Badge>
          {mode === "reward" ? copy.labels.rewardQuantity : copy.labels.requiredQuantity}:{" "}
          {formatValue(
            mode === "reward" ? barter.reward_quantity : barter.require_quantity,
          )}
        </Badge>
      </div>
      <ItemLineList
        title={mode === "reward" ? copy.labels.requireItems : copy.labels.rewardItems}
        items={mode === "reward" ? barter.require_items : barter.reward_items}
        locale={locale}
      />
    </CompactRelationRow>
  );
}

function HideoutCraftRow({
  craft,
  copy,
  locale,
}: {
  craft: ItemHideoutCraft;
  copy: (typeof itemInfoCopy)[Locale];
  locale: Locale;
}) {
  return (
    <CompactRelationRow>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <HideoutPill hideout={craft.hideout} locale={locale} levelLabel={copy.labels.level} />
        <div className="flex flex-wrap gap-1">
          <Badge>
            {copy.labels.craftDuration}: {formatSecondsToDuration(craft.duration, locale)}
          </Badge>
          <Badge>
            {copy.labels.rewardQuantity}: {formatValue(craft.reward_quantity)}
          </Badge>
        </div>
      </div>
      <ItemLineList title={copy.labels.requireItems} items={craft.require_items} locale={locale} />
      <ItemLineList title={copy.labels.rewardItems} items={craft.reward_items} locale={locale} />
    </CompactRelationRow>
  );
}

function AmmoEfficiencyPanel({
  values,
}: {
  values: Array<{ label: string; value: DetailValue }>;
}) {
  const getToneClass = (value: DetailValue) => {
    if (typeof value !== "number") {
      return "border-slate-200 bg-white text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";
    }

    if (value >= 6) {
      return "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-100";
    }

    if (value >= 5) {
      return "border-lime-200 bg-lime-50 text-lime-900 dark:border-lime-400/30 dark:bg-lime-400/15 dark:text-lime-100";
    }

    if (value >= 4) {
      return "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-400/30 dark:bg-yellow-400/15 dark:text-yellow-100";
    }

    if (value >= 3) {
      return "border-orange-200 bg-orange-50 text-orange-900 dark:border-orange-400/30 dark:bg-orange-400/15 dark:text-orange-100";
    }

    return "border-red-200 bg-red-50 text-red-900 dark:border-red-400/30 dark:bg-red-400/15 dark:text-red-100";
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
      {values.map((item) => (
        <div
          key={item.label}
          className={`rounded-lg border px-2 py-3 text-center shadow-sm ${getToneClass(
            item.value,
          )}`}
        >
          <p className="text-xs font-medium opacity-75">
            {item.label}
          </p>
          <p className="mt-1 text-lg font-semibold">
            {formatValue(item.value)}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ItemInfoPage({
  item,
  locale,
}: {
  item: ItemInfoResponse;
  locale: Locale;
}) {
  const itemName = getLocalizedName(item, locale);
  const copy = itemInfoCopy[locale];
  const activeFireModes = item.weapon_info
    ? Object.entries(item.weapon_info.fire_modes)
        .filter(([, enabled]) => enabled)
        .map(([mode]) => translate(fireModeLabels[mode], locale, mode))
    : [];
  const activeZones = item.protection_info
    ? Object.entries(item.protection_info.zones)
        .filter(([, enabled]) => enabled)
        .map(([zone]) =>
          translate(zoneLabels[zone as keyof ProtectionZones], locale, zone),
        )
    : [];
  const questRequirements = item.quest_requirements ?? [];
  const traderBarters = item.trader_barters ?? [];
  const usedInTraderBarters = item.used_in_trader_barters ?? [];
  const hideoutCrafts = item.hideout_crafts ?? [];
  const questRewards = item.quest_rewards ?? [];
  const hideoutConstructions = item.hideout_constructions ?? [];
  const questCraftUnlockRewards = item.quest_craft_unlock_rewards ?? [];
  const bossDrops = item.boss_drops ?? [];
  const compatibleWeapons = item.compatible_weapons ?? [];
  const defaultForWeapons = item.default_for_weapons ?? [];

  return (
    <main className="min-h-screen bg-gray-50 text-black dark:bg-[#1e2124] dark:text-white">
      <div className="container mx-auto max-w-7xl space-y-6 px-4 py-4 sm:space-y-8 sm:py-8">
        <div className="mb-6 text-center md:mb-8">
          <div className="mb-4 flex items-center justify-center">
            <h1 className="text-3xl font-bold md:text-4xl">{itemName}</h1>
          </div>
        </div>

        <DetailCard item={item} itemName={itemName}>
          <DetailGroup
            title={copy.groups.basic}
            icon={<Info className="h-4 w-4" />}
            rows={[
              {
                label: copy.labels.classification,
                value: (
                  <div className="flex flex-wrap justify-end gap-1">
                    {item.parent_category ? <Badge>{item.parent_category}</Badge> : null}
                    {item.category ? <Badge>{item.category}</Badge> : null}
                  </div>
                ),
                icon: <Package className="h-4 w-4 text-orange-500" />,
                show: Boolean(item.parent_category || item.category),
              },
              {
                label: copy.labels.weight,
                value: item.weight,
                suffix: "kg",
                icon: <Scale className="h-4 w-4 text-gray-500" />,
              },
            ]}
          />

          {item.weapon_info ? (
            <DetailGroup
              title={copy.groups.info}
              icon={<Info className="h-4 w-4" />}
              rows={[
                {
                  label: copy.labels.ergonomics,
                  value: item.weapon_info.ergonomics,
                  icon: <Hand className="h-4 w-4 text-green-500" />,
                },
                {
                  label: copy.labels.horizontalRecoil,
                  value: item.weapon_info.recoil_horizontal,
                  icon: <ArrowLeftRight className="h-4 w-4 text-blue-500" />,
                },
                {
                  label: copy.labels.verticalRecoil,
                  value: item.weapon_info.recoil_vertical,
                  icon: <ArrowUpDown className="h-4 w-4 text-red-500" />,
                },
                {
                  label: copy.labels.fireMode,
                  value: <ChipList values={activeFireModes} />,
                  icon: <Settings className="h-4 w-4 text-purple-500" />,
                  show: activeFireModes.length > 0,
                },
                {
                  label: copy.labels.fireRate,
                  value: item.weapon_info.fire_rate,
                  icon: <Gauge className="h-4 w-4 text-orange-500" />,
                },
                {
                  label: copy.labels.caliber,
                  value: item.weapon_info.caliber,
                  icon: <Crosshair className="h-4 w-4 text-yellow-500" />,
                },
                {
                  label: copy.labels.defaultAmmo,
                  value: item.weapon_info.default_ammo ? (
                    <RelatedItemCard item={item.weapon_info.default_ammo} locale={locale} />
                  ) : null,
                  icon: <Crosshair className="h-4 w-4 text-yellow-500" />,
                  show: Boolean(item.weapon_info.default_ammo),
                },
              ]}
            >
              {item.weapon_info.allowed_ammo.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Crosshair className="h-4 w-4 text-orange-500" />
                    <h3 className="text-sm font-semibold text-orange-600 dark:text-orange-300 sm:text-base">
                      {copy.groups.ammo}
                    </h3>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
                    {item.weapon_info.allowed_ammo.map((ammo) => (
                      <RelatedItemCard key={ammo.id} item={ammo} locale={locale} />
                    ))}
                  </div>
                </div>
              ) : null}
            </DetailGroup>
          ) : null}

          {item.ammo_info ? (
            <DetailGroup
              title={copy.groups.info}
              icon={<Info className="h-4 w-4" />}
              rows={[
                {
                  label: copy.labels.damage,
                  value: item.ammo_info.damage,
                  icon: <Crosshair className="h-4 w-4 text-red-500" />,
                },
                {
                  label: copy.labels.penetration,
                  value: item.ammo_info.penetration_power,
                  icon: <Target className="h-4 w-4 text-blue-500" />,
                },
                {
                  label: copy.labels.armorDamage,
                  value: item.ammo_info.armor_damage,
                  suffix: "%",
                  icon: <ShieldMinus className="h-4 w-4 text-orange-500" />,
                },
                {
                  label: copy.labels.accuracy,
                  value: item.ammo_info.accuracy_modifier,
                  icon: <Target className="h-4 w-4 text-purple-500" />,
                },
                {
                  label: copy.labels.recoil,
                  value: item.ammo_info.recoil_modifier,
                  icon: <Gauge className="h-4 w-4 text-green-500" />,
                },
                {
                  label: copy.labels.lightBleed,
                  value: item.ammo_info.light_bleed_modifier,
                  suffix: "%",
                  icon: <Droplet className="h-4 w-4 text-red-500" />,
                },
                {
                  label: copy.labels.heavyBleed,
                  value: item.ammo_info.heavy_bleed_modifier,
                  suffix: "%",
                  icon: <Droplets className="h-4 w-4 text-red-700" />,
                },
                {
                  label: copy.labels.armorEfficiency,
                  value: item.ammo_info.efficiency ? (
                    <AmmoEfficiencyPanel
                      values={[
                        { label: "Class 1", value: item.ammo_info.efficiency.value_1 },
                        { label: "Class 2", value: item.ammo_info.efficiency.value_2 },
                        { label: "Class 3", value: item.ammo_info.efficiency.value_3 },
                        { label: "Class 4", value: item.ammo_info.efficiency.value_4 },
                        { label: "Class 5", value: item.ammo_info.efficiency.value_5 },
                        { label: "Class 6", value: item.ammo_info.efficiency.value_6 },
                      ]}
                    />
                  ) : null,
                  icon: <Shield className="h-4 w-4 text-green-500" />,
                  show: Boolean(item.ammo_info.efficiency),
                  wide: true,
                },
              ]}
            />
          ) : null}

          {item.protection_info ? (
            <DetailGroup
              title={copy.groups.info}
              icon={<Info className="h-4 w-4" />}
              rows={[
                {
                  label: copy.labels.armorClass,
                  value: item.protection_info.armor_class,
                  icon: <Shield className="h-4 w-4 text-green-500" />,
                },
                {
                  label: copy.labels.armorZones,
                  value: <ChipList values={activeZones} />,
                  icon: <Shield className="h-4 w-4 text-blue-500" />,
                  show: activeZones.length > 0,
                },
                {
                  label: copy.labels.material,
                  value: item.protection_info.material,
                  icon: <Package className="h-4 w-4 text-red-500" />,
                },
                {
                  label: copy.labels.durability,
                  value: item.protection_info.durability,
                  icon: <HeartPulse className="h-4 w-4 text-purple-500" />,
                },
                {
                  label: copy.labels.ricochet,
                  value: item.protection_info.ricochet_y,
                  icon: <RotateCw className="h-4 w-4 text-yellow-500" />,
                },
                {
                  label: copy.labels.deafening,
                  value: item.protection_info.deafening,
                  icon: <Shield className="h-4 w-4 text-slate-500" />,
                },
                {
                  label: copy.labels.blindnessProtection,
                  value: item.protection_info.blindness_protection,
                  suffix: "%",
                  icon: <Shield className="h-4 w-4 text-cyan-500" />,
                },
              ]}
            />
          ) : null}

          {item.storage_info ? (
            <DetailGroup
              title={copy.groups.info}
              icon={<Info className="h-4 w-4" />}
              rows={[
                {
                  label: copy.labels.slots,
                  value: item.storage_info.capacity,
                  icon: <Boxes className="h-4 w-4 text-blue-500" />,
                },
                {
                  label: copy.labels.internalSize,
                  value: (
                    <ChipList
                      values={item.storage_info.grids.map(
                        (grid) => `${grid.width} X ${grid.height}`,
                      )}
                    />
                  ),
                  icon: <LayoutGrid className="h-4 w-4 text-purple-500" />,
                  show: item.storage_info.grids.length > 0,
                },
                {
                  label: copy.labels.type,
                  value: item.storage_info.storage_type,
                  icon: <Package className="h-4 w-4 text-orange-500" />,
                },
              ]}
            />
          ) : null}

          {item.consumable_info ? (
            <DetailGroup
              title={copy.groups.info}
              icon={<Heart className="h-4 w-4" />}
              rows={[
                {
                  label: copy.labels.healing,
                  value: item.consumable_info.hitpoints,
                  icon: <Heart className="h-4 w-4 text-red-500" />,
                },
                {
                  label: copy.labels.useTime,
                  value: item.consumable_info.use_time,
                  suffix: copy.units.seconds,
                  icon: <Clock className="h-4 w-4 text-blue-500" />,
                },
                {
                  label: copy.labels.energy,
                  value: item.consumable_info.energy,
                  icon: <Gauge className="h-4 w-4 text-orange-500" />,
                },
                {
                  label: copy.labels.hydration,
                  value: item.consumable_info.hydration,
                  icon: <Droplet className="h-4 w-4 text-sky-500" />,
                },
                {
                  label: copy.labels.uses,
                  value: item.consumable_info.units,
                  icon: <Package className="h-4 w-4 text-purple-500" />,
                },
                {
                  label: copy.labels.painkiller,
                  value: item.consumable_info.painkiller_duration,
                  suffix: copy.units.seconds,
                  icon: <HeartPulse className="h-4 w-4 text-green-500" />,
                },
                {
                  label: copy.labels.cures,
                  value: (
                    <ChipList
                      values={item.consumable_info.cures.map((cure) => `✓ ${cure}`)}
                    />
                  ),
                  icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
                  show: item.consumable_info.cures.length > 0,
                },
              ]}
            >
              {item.consumable_info.stim_effects.length > 0 ? (
                <div className="space-y-2">
                  {item.consumable_info.stim_effects.map((effect) => (
                    <div
                      key={effect.effect_index}
                      className="rounded-lg bg-slate-100/80 px-3 py-2 dark:bg-slate-800/55"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {effect.effect_type ?? `Effect ${effect.effect_index + 1}`}
                        </span>
                        <Badge>{formatValue(effect.value)}</Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge>Delay {formatValue(effect.delay, copy.units.seconds)}</Badge>
                        <Badge>
                          Duration {formatValue(effect.duration, copy.units.seconds)}
                        </Badge>
                        {effect.skill_name ? <Badge>{effect.skill_name}</Badge> : null}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </DetailGroup>
          ) : null}

          {item.throwable_info ? (
            <DetailGroup
              title={copy.groups.info}
              icon={<Info className="h-4 w-4" />}
              rows={[
                {
                  label: copy.labels.type,
                  value: item.throwable_info.throwable_type,
                  icon: <Bomb className="h-4 w-4 text-orange-500" />,
                },
                {
                  label: copy.labels.fuse,
                  value: item.throwable_info.fuse,
                  suffix: copy.units.seconds,
                  icon: <Clock className="h-4 w-4 text-blue-500" />,
                },
                {
                  label: copy.labels.fragments,
                  value: item.throwable_info.fragments,
                  icon: <Bomb className="h-4 w-4 text-red-500" />,
                },
                {
                  label: copy.labels.contusionRadius,
                  value: item.throwable_info.contusion_radius,
                  suffix: "m",
                  icon: <Gauge className="h-4 w-4 text-purple-500" />,
                },
                {
                  label: copy.labels.minExplosionDistance,
                  value: item.throwable_info.min_explosion_distance,
                  suffix: "m",
                  icon: <Target className="h-4 w-4 text-green-500" />,
                },
                {
                  label: copy.labels.maxExplosionDistance,
                  value: item.throwable_info.max_explosion_distance,
                  suffix: "m",
                  icon: <Target className="h-4 w-4 text-red-500" />,
                },
              ]}
            />
          ) : null}

          {item.melee_info ? (
            <DetailGroup
              title={copy.groups.info}
              icon={<Info className="h-4 w-4" />}
              rows={[
                {
                  label: copy.labels.hitRadius,
                  value: item.melee_info.hit_radius,
                  icon: <Swords className="h-4 w-4 text-blue-500" />,
                },
                {
                  label: copy.labels.slashDamage,
                  value: item.melee_info.slash_damage,
                  icon: <Swords className="h-4 w-4 text-red-500" />,
                },
                {
                  label: copy.labels.stabDamage,
                  value: item.melee_info.stab_damage,
                  icon: <Swords className="h-4 w-4 text-orange-500" />,
                },
              ]}
            />
          ) : null}

          {item.penalties ? (
            <DetailGroup
              title={copy.groups.penalty}
              icon={<Info className="h-4 w-4" />}
              rows={[
                {
                  label: copy.labels.ergonomicsPenalty,
                  value: item.penalties.ergonomics_penalty,
                  icon: <MinusCircle className="h-4 w-4 text-red-500" />,
                },
                {
                  label: copy.labels.movementSpeedPenalty,
                  value: item.penalties.movement_speed_penalty,
                  suffix: "%",
                  icon: <Footprints className="h-4 w-4 text-red-500" />,
                },
                {
                  label: copy.labels.turnSpeedPenalty,
                  value: item.penalties.turn_speed_penalty,
                  suffix: "%",
                  icon: <RotateCw className="h-4 w-4 text-red-500" />,
                },
                {
                  label: copy.labels.distanceModifier,
                  value: item.penalties.distance_modifier,
                  icon: <Target className="h-4 w-4 text-blue-500" />,
                },
              ]}
            />
          ) : null}

          {item.usage_info ? (
            <DetailGroup
              title={copy.groups.usage}
              icon={<Info className="h-4 w-4" />}
              rows={[
                {
                  label: copy.labels.maxUses,
                  value: item.usage_info.max_uses,
                  icon: <Package className="h-4 w-4 text-purple-500" />,
                },
              ]}
            />
          ) : null}

        </DetailCard>

        <RelationSection
          title={copy.groups.questRequirements}
          count={questRequirements.length}
        >
          {questRequirements.map((entry) => (
            <CompactRelationRow key={`${entry.quest.id}-${entry.objective?.objective_id ?? "objective"}`}>
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                <div className="min-w-0 max-w-full">
                  <QuestLink quest={entry.quest} locale={locale} />
                </div>
                {entry.trader ? (
                  <EntityPill
                    image={entry.trader.image}
                    name={getEntityName(entry.trader, locale)}
                  />
                ) : null}
              </div>
              {entry.objective ? (
                <div className="max-w-2xl rounded-lg border border-slate-200 bg-white/80 p-3 text-sm leading-6 text-slate-700 dark:border-slate-700/60 dark:bg-slate-900/40 dark:text-slate-200">
                  {entry.objective.description_ko ||
                  entry.objective.description_en ||
                  entry.objective.description_ja ? (
                    <p className="font-medium">
                      {getLocalizedObjectiveDescription(entry.objective, locale)}
                    </p>
                  ) : null}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {entry.objective.count ? (
                      <Badge>
                        {copy.labels.quantity}: {formatValue(entry.objective.count)}
                      </Badge>
                    ) : null}
                    {entry.objective.found_in_raid ? (
                      <RaidRequiredBadge label={copy.labels.foundInRaid} />
                    ) : null}
                  </div>
                </div>
              ) : null}
            </CompactRelationRow>
          ))}
        </RelationSection>

        <RelationSection title={copy.groups.traderBarters} count={traderBarters.length}>
          {traderBarters.map((barter) => (
            <BarterRow
              key={barter.barter_id}
              barter={barter}
              copy={copy}
              locale={locale}
              mode="reward"
            />
          ))}
        </RelationSection>

        <RelationSection
          title={copy.groups.usedInTraderBarters}
          count={usedInTraderBarters.length}
        >
          {usedInTraderBarters.map((barter) => (
            <BarterRow
              key={barter.barter_id}
              barter={barter}
              copy={copy}
              locale={locale}
              mode="require"
            />
          ))}
        </RelationSection>

        <RelationSection title={copy.groups.hideoutCrafts} count={hideoutCrafts.length}>
          {hideoutCrafts.map((craft) => (
            <HideoutCraftRow
              key={craft.craft_id}
              craft={craft}
              copy={copy}
              locale={locale}
            />
          ))}
        </RelationSection>

        <RelationSection title={copy.groups.questRewards} count={questRewards.length}>
          {questRewards.map((reward) => (
            <CompactRelationRow
              key={`${reward.quest.id}-${reward.reward_type}-${reward.offer_id ?? reward.quantity ?? "reward"}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <QuestLink quest={reward.quest} locale={locale} />
                {reward.trader ? (
                  <EntityPill
                    image={reward.trader.image}
                    name={getEntityName(reward.trader, locale)}
                  />
                ) : null}
              </div>
              <div className="flex flex-wrap gap-1">
                {reward.quantity ? (
                  <Badge>
                    {copy.labels.quantity}: {formatValue(reward.quantity)}
                  </Badge>
                ) : null}
                {reward.level ? <Badge>LL{formatValue(reward.level)}</Badge> : null}
              </div>
            </CompactRelationRow>
          ))}
        </RelationSection>

        <RelationSection
          title={copy.groups.hideoutConstructions}
          count={hideoutConstructions.length}
        >
          {hideoutConstructions.map((construction) => (
            <CompactRelationRow key={construction.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <HideoutPill
                  hideout={construction.hideout}
                  locale={locale}
                  levelLabel={copy.labels.level}
                />
                <Badge>
                  {copy.labels.quantity}: {formatValue(construction.quantity)}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                <Badge>
                  {copy.labels.constructionTime}:{" "}
                  {formatSecondsToDuration(construction.construction_time, locale)}
                </Badge>
                <Badge>
                  {copy.labels.inRaid}:{" "}
                  {construction.in_raid ? copy.labels.yes : copy.labels.no}
                </Badge>
              </div>
            </CompactRelationRow>
          ))}
        </RelationSection>

        <RelationSection
          title={copy.groups.questCraftUnlockRewards}
          count={questCraftUnlockRewards.length}
        >
          {questCraftUnlockRewards.map((reward) => (
            <CompactRelationRow key={`${reward.quest.id}-${reward.station_level ?? reward.level ?? "unlock"}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <QuestLink quest={reward.quest} locale={locale} />
                {reward.trader ? (
                  <EntityPill
                    image={reward.trader.image}
                    name={getEntityName(reward.trader, locale)}
                  />
                ) : null}
              </div>
              <div className="flex flex-wrap gap-1">
                {reward.station_level ? (
                  <Badge>
                    {copy.labels.level}: {formatValue(reward.station_level)}
                  </Badge>
                ) : null}
                {reward.level ? <Badge>LL{formatValue(reward.level)}</Badge> : null}
              </div>
            </CompactRelationRow>
          ))}
        </RelationSection>

        <RelationSection title={copy.groups.bossDrops} count={bossDrops.length}>
          {bossDrops.map((drop) => (
            <CompactRelationRow key={drop.boss.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <EntityPill
                  image={drop.boss.image}
                  name={getEntityName(drop.boss, locale)}
                />
                {drop.quantity ? (
                  <Badge>
                    {copy.labels.quantity}: {formatValue(drop.quantity)}
                  </Badge>
                ) : null}
              </div>
            </CompactRelationRow>
          ))}
        </RelationSection>

        <RelationSection title={copy.groups.compatibleWeapons} count={compatibleWeapons.length}>
          <RelationGrid items={compatibleWeapons} locale={locale} />
        </RelationSection>

        <RelationSection title={copy.groups.defaultForWeapons} count={defaultForWeapons.length}>
          <RelationGrid items={defaultForWeapons} locale={locale} />
        </RelationSection>
      </div>
    </main>
  );
}
