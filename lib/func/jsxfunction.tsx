// import { SpawnChance } from "@/components/page/boss/data/bossTypes";
// import type { StimEffect } from "@/components/page/provisions/data/provisionsTypes";
// import { getOtherLocalizedKey } from "./localeFunction";
// import TextSpan from "@/components/custom/gridContents/textSpan";
// import { ALL_COLOR } from "../consts/colorConsts";

import { SpawnChance } from "@/app/boss/[id]/_components/boss.types";
import { getOtherLocalizedKey } from "./localeFunction";

export const noReturnSkill = [
  "Painkiller",
  "HandsTremor",
  "Removeallbloodlosses",
  "QuantumTunnelling",
  "Pain",
  "Antidote",
];

export const checkSkillPlus = (skill_name_en: string) => {
  switch (skill_name_en) {
    case "HandsTremor":
      return "text-red-400";
    case "QuantumTunnelling":
      return "text-red-400";
    case "Painkiller":
      return "text-green-400";
    case "Removeallbloodlosses":
      return "text-green-400";
    case "Pain":
      return "text-green-400";
    case "Antidote":
      return "text-green-400";
    default:
      return "text-gray-900";
  }
};

export const checkValuePlus = (effect: number) => {
  if (effect == 0) {
    return "text-gray-900";
  } else if (effect > 0) {
    return "text-green-400";
  } else {
    return "text-red-400";
  }
};

export const getPlusMinus = (text: number) => {
  if (text === 0) return "0";
  return text > 0 ? ` +${text}` : `${text}`;
};

// export const highlightMatchedText = (text: string, keyword: string) => {
//   if (keyword.length < 2)
//     return (
//       <span className="text-white font-bold hover:text-GoldenYellow">
//         {text}
//       </span>
//     );

//   const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//   const regex = new RegExp(`(${safeKeyword})`, "gi");
//   const parts = text.split(regex);

//   return (
//     <>
//       {parts.map((part, index) =>
//         part.toLowerCase() === keyword.toLowerCase() ? (
//           <span
//             key={index}
//             className="text-GoldenYellow font-bold hover:text-GoldenYellow"
//           >
//             {part}
//           </span>
//         ) : (
//           <span
//             key={index}
//             className="text-white font-bold hover:text-GoldenYellow"
//           >
//             {part}
//           </span>
//         )
//       )}
//     </>
//   );
// };

// export const hasMatchInList = (list: any[], searchWord: string): boolean => {
//   if (searchWord.length < 1) return true;

//   const safeWord = searchWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//   const regex = new RegExp(safeWord, "i");

//   return list.some(
//     (item) =>
//       regex.test(item.name_en) ||
//       regex.test(item.name_ko) ||
//       regex.test(item.name_ja || item.name_ko)
//   );
// };
// export const filteringData = (
//   userSearch: string,
//   name_en: string,
//   name_ko: string,
//   name_ja: string
// ) => {
//   if (userSearch.length < 2) {
//     return true;
//   }
//   const safeWord = userSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//   const regex = new RegExp(safeWord, "i");

//   return regex.test(name_en) || regex.test(name_ko) || regex.test(name_ja);
// };

// export const getColor = (value: number, mode: "check" | "recoil") => {
//   if (value === 0) {
//     return "white";
//   }

//   if (mode === "check") {
//     return value > 0 ? "BrightCyan" : "Red";
//   } else {
//     return value < 0 ? "BrightCyan" : "Red";
//   }
// };

// export const floatToPercent = (value: number) => {
//   if (value !== 0) {
//     return Math.round(value * 100);
//   } else {
//     return value;
//   }
// };

// export const filterStimEffects = (effects: StimEffect[]) => {
//   const seen = new Set();
//   for (const effect of effects) {
//     const key = `${effect.delay}-${effect.duration}`;
//     if (!seen.has(key)) {
//       seen.add(key);
//     } else if (effect.skill_name_en !== "Painkiller") {
//       delete effect.delay;
//       delete effect.duration;
//     }
//   }
//   return effects;
// };

// export const checkPlus = (effect: number | string | null) => {
//   if (effect === null) {
//     return "white";
//   }

//   if (typeof effect === "number") {
//     if (effect == 0) {
//       return "white";
//     } else if (effect > 0) {
//       return "BrightCyan";
//     } else {
//       return "Red";
//     }
//   }

//   if (typeof effect === "string") {
//     switch (effect) {
//       case "손 떨림":
//         return "Red";
//       case "진통제":
//         return "BrightCyan";
//       default:
//         return "white";
//     }
//   }
// };

// export const checkIdCategory = (id: string, checkId: string) => {
//   return id === checkId;
// };

// export const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
//   e.currentTarget.style.transform = "scale(1.1)";
//   e.currentTarget.style.opacity = "0.8";
// };

// export const handleHoverExit = (e: React.MouseEvent<HTMLDivElement>) => {
//   e.currentTarget.style.transform = "scale(1)";
//   e.currentTarget.style.opacity = "1";
// };

// export const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
//   const list = event.target as HTMLDivElement;
//   if (list.scrollTop === 0) {
//     list.scrollTop = 1;
//   } else if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
//     list.scrollTop = list.scrollHeight - list.clientHeight - 1;
//   }
// };

// export const getFirstParagraph = (htmlString: string) => {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlString, "text/html");

//   const firstParagraph = doc.querySelector("p");

//   return firstParagraph ? firstParagraph.outerHTML : "";
// };

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

// export const drugText = (label: string, value: number, positive: boolean) => {
//   return (
//     <div className={"flex mb-[4px]"}>
//       <TextSpan isCenter={false}>{label} :&nbsp;</TextSpan>
//       <TextSpan isCenter={false} textColor={positive ? "BrightCyan" : "Red"}>
//         {value}
//       </TextSpan>
//     </div>
//   );
// };
// export const getMaxSuffix = (id: number | string, completeList?: string[]) => {
//   let level: number;

//   if (typeof id === "number") {
//     level = id;
//   } else if (completeList) {
//     const filteredList = completeList
//       .filter((item) => item.startsWith(id + "-"))
//       .map((item) => parseInt(item.split("-")[1], 10));
//     level = filteredList.length > 0 ? Math.max(...filteredList) : -1;
//   } else {
//     level = parseInt(id.split("-")[1], 10);
//   }

//   switch (level) {
//     case 1:
//       return ALL_COLOR.SandyOchre;
//     case 2:
//       return ALL_COLOR.BurningOrange;
//     case 3:
//       return ALL_COLOR.OliveTeal;
//     case 4:
//       return ALL_COLOR.CobaltBlue;
//     case 5:
//       return ALL_COLOR.IndigoViolet;
//     case 6:
//       return ALL_COLOR.RoyalPurple;
//     default:
//       return ALL_COLOR.SoftAlloy;
//   }
// };

// export const changeTime = (sec: number | undefined) => {
//   if (!sec) return `${0} M`;

//   const hours = Math.floor(sec / 3600);
//   const minutes = Math.floor((sec % 3600) / 60);

//   if (hours > 0 && minutes > 0) {
//     return `${hours} H ${minutes} M`;
//   } else if (hours > 0) {
//     return `${hours} H`;
//   } else {
//     return `${minutes} M`;
//   }
// };
