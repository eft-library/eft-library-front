import { SpawnChance } from "@/app/boss/[id]/_components/boss.types";
import { getOtherLocalizedKey } from "./localeFunction";
import { Price, TradeOption } from "@/app/price/_components/price.types";
import { ALL_COLOR } from "../consts/colorConsts";
import DOMPurify from "dompurify";

// ✅ 어제 날짜와 8일 전 날짜 구하는 함수
export const getDefaultDates = () => {
  const end = new Date(); // 오늘
  end.setDate(end.getDate() - 1); // 어제

  const start = new Date(end); // end를 기준으로 복사
  start.setDate(start.getDate() - 7); // 8일 전 (어제 기준 7일 전)

  return { start, end };
};

export const getMethodColor = (method: string) => {
  const colors = {
    GET: "#34d399",
    POST: "#60a5fa",
  };
  return colors[method as keyof typeof colors] || "#9ca3af";
};

export const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()); // 시/분/초 제거
};

// 변동률 계산
export const calcChangeRate = (
  item: Price,
  priceType: string
): { raw: number; formatted: string } => {
  const history =
    priceType === "PVP" ? item.history_by_type.pvp : item.history_by_type.pve;
  const beforeData = history?.[history.length - 1];
  const beforePrice = beforeData ? beforeData.item_price : 0;

  const traderList =
    priceType === "PVP"
      ? item.trader?.pvp_trader ?? []
      : item.trader?.pve_trader ?? [];

  if (traderList.length === 0 || !beforePrice || beforePrice === 0) {
    return { raw: 0, formatted: "+0.00%" };
  }

  const maxPrice = Math.max(...traderList.map((t: TradeOption) => t.price));

  const changeRate = ((maxPrice - beforePrice) / beforePrice) * 100;
  const formattedRate =
    changeRate >= 0
      ? `+${changeRate.toFixed(2)}%`
      : `${changeRate.toFixed(2)}%`;

  return { raw: changeRate, formatted: formattedRate };
};

// 가장 비싼 트레이더 찾는 함수
export const findExpensiveTrader = (traders: TradeOption[]) => {
  if (!traders) return null;
  const filteredTraders = traders.filter(
    (t) => t.trader.npc_id !== "FLEA_MARKET"
  );
  if (filteredTraders.length === 0) return null;
  const resultTrader = filteredTraders.reduce(
    (max, current) => (current.price > max.price ? current : max),
    filteredTraders[0]
  );
  return `${resultTrader.price.toLocaleString()} ₽`;
};

// 플리마켓 가격 찾는 함수
export const findFleaMarketPrice = (traders: TradeOption[]) => {
  if (!traders) return "-";
  const fleaMarket = traders.find((t) => t.trader.npc_id === "FLEA_MARKET");
  return fleaMarket?.price ? `${fleaMarket?.price.toLocaleString()} ₽` : "-";
};

export const node_color = (
  id: string,
  isDarkMode: string | undefined
): string => {
  const colorMap: Record<string, { light: string; dark: string }> = {
    "5935c25fb3acc3127c3d8cd9": {
      light: "from-amber-400 to-orange-500",
      dark: "from-yellow-800 to-orange-900",
    },
    "579dc571d53a0658a154fbec": {
      light: "from-green-400 to-emerald-500",
      dark: "from-green-800 to-emerald-900",
    },
    "638f541a29ffd1183d187f57": {
      light: "from-blue-400 to-indigo-500",
      dark: "from-blue-800 to-indigo-900",
    },
    "6617beeaa9cfa777ca915b7c": {
      light: "from-pink-400 to-rose-500",
      dark: "from-pink-800 to-rose-900",
    },
    "5ac3b934156ae10c4430e83c": {
      light: "from-purple-400 to-violet-500",
      dark: "from-purple-800 to-violet-900",
    },
    "5c0647fdd443bc2504c2d371": {
      light: "from-cyan-400 to-sky-500",
      dark: "from-cyan-800 to-sky-900",
    },
    "656f0f98d80a697f855d34b1": {
      light: "from-teal-400 to-green-500",
      dark: "from-teal-800 to-green-900",
    },
    "54cb50c76803fa8b248b4571": {
      light: "from-lime-400 to-green-500",
      dark: "from-lime-800 to-green-900",
    },
    "54cb57776803fa99248b456e": {
      light: "from-red-400 to-orange-500",
      dark: "from-red-800 to-orange-900",
    },
    "5a7c2eca46aef81a7ca2145d": {
      light: "from-fuchsia-400 to-pink-500",
      dark: "from-fuchsia-800 to-pink-900",
    },
  };

  const defaultColor =
    isDarkMode === "dark"
      ? "from-slate-700 to-slate-900"
      : "from-gray-300 to-gray-400";

  return (
    colorMap[id]?.[isDarkMode === "dark" ? "dark" : "light"] ?? defaultColor
  );
};

export const returnBadgeColor = (routeLink: string) => {
  switch (routeLink) {
    case "/notice":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "/patch-notes":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "/event":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
};

export const getEffectivenessColor = (value: number) => {
  if (value === 0) {
    return "dark:bg-red-900 dark:border-red-700 dark:text-red-300bg-red-100 border-red-300 text-red-700";
  } else if (value <= 2) {
    return "dark:bg-orange-900 dark:border-orange-700 dark:text-orange-300 bg-orange-100 border-orange-300 text-orange-700";
  } else if (value <= 4) {
    return "dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-300 bg-yellow-100 border-yellow-300 text-yellow-700";
  } else {
    return "dark:bg-green-900 dark:border-green-700 dark:text-green-300 bg-green-100 border-green-300 text-green-700";
  }
};

export const getPlusMinus = (text: number) => {
  if (text === 0) return "0";
  return text > 0 ? ` +${text}` : `${text}`;
};

export const getFirstParagraph = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const firstParagraph = doc.querySelector("p");

  return firstParagraph ? firstParagraph.outerHTML : "";
};

export const groupAndSummarizeChances = (
  spawnChances: SpawnChance[],
  localeKey: string
) => {
  const grouped = new Map<string, number[]>();

  for (const spawn of spawnChances) {
    const list = grouped.get(spawn[getOtherLocalizedKey(localeKey)]) ?? [];
    list.push(spawn.spawnChance);
    grouped.set(spawn[getOtherLocalizedKey(localeKey)], list);
  }
  const summarized = Array.from(grouped.entries()).map(([name_en, chances]) => {
    const min = Math.min(...chances);
    const max = Math.max(...chances);
    return { name_en, min, max };
  });

  return summarized;
};

export const groupSpawnAreas = (spawnChances: SpawnChance[]) => {
  const seen = new Set<string>();
  const uniqueList: typeof spawnChances = [];

  for (const item of spawnChances) {
    if (!seen.has(item.name_en)) {
      seen.add(item.name_en);
      uniqueList.push(item);
    }
  }

  return uniqueList;
};

export const getMaxSuffix = (id: number | string, completeList?: string[]) => {
  let level: number;

  if (typeof id === "number") {
    level = id;
  } else if (completeList) {
    const filteredList = completeList
      .filter((item) => item.startsWith(id + "-"))
      .map((item) => parseInt(item.split("-")[1], 10));
    level = filteredList.length > 0 ? Math.max(...filteredList) : -1;
  } else {
    level = parseInt(id.split("-")[1], 10);
  }

  switch (level) {
    case 1:
      return ALL_COLOR.SandyOchre;
    case 2:
      return ALL_COLOR.BurningOrange;
    case 3:
      return ALL_COLOR.OliveTeal;
    case 4:
      return ALL_COLOR.CobaltBlue;
    case 5:
      return ALL_COLOR.IndigoViolet;
    case 6:
      return ALL_COLOR.RoyalPurple;
    default:
      return ALL_COLOR.SoftAlloy;
  }
};

export const getMaxSuffixNumber = (
  id: number | string,
  completeList?: string[]
) => {
  let level: number;

  if (typeof id === "number") {
    level = id;
  } else if (completeList) {
    const filteredList = completeList
      .filter((item) => item.startsWith(id + "-"))
      .map((item) => parseInt(item.split("-")[1], 10));
    level = filteredList.length > 0 ? Math.max(...filteredList) : 0;
  } else {
    level = parseInt(id.split("-")[1], 10);
  }

  return level;
};

export const changeTime = (sec: number | undefined) => {
  if (!sec) return `${0} M`;

  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);

  if (hours > 0 && minutes > 0) {
    return `${hours} H ${minutes} M`;
  } else if (hours > 0) {
    return `${hours} H`;
  } else {
    return `${minutes} M`;
  }
};

export const purifyHtml = (html: string) => {
  const convertCustomStylesToStyleAttr = (html: string) => {
    // containerstyle -> style 변환
    html = html.replace(/containerstyle="([^"]*)"/g, 'style="$1"');
    // wrapperstyle 제거 (필요하면 래퍼 div 등에 적용 가능)
    html = html.replace(/wrapperstyle="[^"]*"/g, "");
    return html;
  };

  return DOMPurify.sanitize(convertCustomStylesToStyleAttr(html), {
    FORBID_TAGS: ["script"], // <script> 태그 제거
    FORBID_ATTR: ["on*"],
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });
};
