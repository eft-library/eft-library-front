import TextSpan from "@/components/custom/gridContents/textSpan";
import Link from "next/link";

export const getPlusMinus = (text: number | string) => {
  if (typeof text === "number") {
    if (text === 0) return "0";
    return text > 0 ? `+${text}` : `${text}`;
  }
  return "";
};

export const checkCategory = (newCategory: string, existCategory: string) => {
  return existCategory === "ALL" || existCategory === newCategory;
};

export const getColor = (value: number, mode: "check" | "recoil") => {
  if (value === 0) {
    return "white";
  }

  if (mode === "check") {
    return value > 0 ? "BrightCyan" : "Red";
  } else {
    return value < 0 ? "BrightCyan" : "Red";
  }
};

export const floatToPercent = (value: number) => {
  if (value !== 0) {
    return Math.round(value * 100);
  } else {
    return value;
  }
};

export const checkViewMedical = (
  standard: string,
  itemCatagory: string,
  successCateogry: string
) => {
  return (
    (standard === "ALL" || standard === successCateogry) &&
    itemCatagory === successCateogry
  );
};

interface Effect {
  id: string;
  type: string;
  delay?: number;
  value: number;
  chance: number;
  krSkill: string;
  duration?: number;
  skillName: string;
}

export const filterStimEffects = (effects: Effect[]) => {
  const seen = new Set();
  for (const effect of effects) {
    const key = `${effect.delay}-${effect.duration}`;
    if (!seen.has(key)) {
      seen.add(key);
    } else if (effect.skillName !== "Painkiller") {
      delete effect.delay;
      delete effect.duration;
    }
  }
  return effects;
};

export const checkPlus = (effect: number | string) => {
  if (typeof effect === "number") {
    if (effect == 0) {
      return "white";
    } else if (effect > 0) {
      return "BrightCyan";
    } else {
      return "Red";
    }
  }

  if (typeof effect === "string") {
    switch (effect) {
      case "손 떨림":
        return "Red";
      case "진통제":
        return "BrightCyan";
      default:
        return "white";
    }
  }
};

interface QuestNotes {
  id: string;
  name: string;
  count: number;
  in_raid: boolean;
  name_kr: string;
  url_mapping: string;
}

export const returnQuestText = (note: QuestNotes) => {
  return note.in_raid ? (
    <div className="flex items-center">
      <Link href={`/quest/detail/${note.url_mapping}`} key={note.url_mapping}>
        <TextSpan textColor="GoldenYellow" hoverColor="LightYellow">
          {note.name_kr.substring(0, note.name_kr.indexOf("(")).trim()}
        </TextSpan>
      </Link>
      <TextSpan isCenter={false}>&nbsp;(</TextSpan>
      <TextSpan textColor="SoftPink" isCenter={false}>
        인레이드&nbsp;
      </TextSpan>
      <TextSpan isCenter={false}>{note.count}개 필요)</TextSpan>
    </div>
  ) : (
    <div className="flex items-center ">
      <Link href={`/quest/detail/${note.url_mapping}`} key={note.url_mapping}>
        <TextSpan textColor="GoldenYellow" hoverColor="LightYellow">
          {note.name_kr.substring(0, note.name_kr.indexOf("(")).trim()}
        </TextSpan>
      </Link>
      <TextSpan isCenter={false}>&nbsp;({note.count}개 필요)</TextSpan>
    </div>
  );
};

interface HideoutNotes {
  name: string;
  count: number;
  item_id: string;
  name_kr: string;
  level_id: string;
  master_id: string;
}

export const returnHideOutText = (
  note: HideoutNotes,
  onClickAction: (val: string) => void
) => {
  return (
    <div className="flex items-center">
      <Link
        href={`/hideout?id=${note.level_id}`}
        scroll={false}
        onClick={() => onClickAction(note.master_id)}
      >
        <TextSpan textColor="GoldenYellow" hoverColor="LightYellow">
          {note.name_kr}
        </TextSpan>
      </Link>
      <TextSpan isCenter={false}>({note.count}개 필요)</TextSpan>
    </div>
  );
};

export const checkIdCategory = (id: string, checkId: string) => {
  return id === checkId;
};

export const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = "scale(1.1)";
  e.currentTarget.style.opacity = "0.8";
};

export const handleHoverExit = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = "scale(1)";
  e.currentTarget.style.opacity = "1";
};

export const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
  const list = event.target as HTMLDivElement;
  if (list.scrollTop === 0) {
    list.scrollTop = 1;
  } else if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
    list.scrollTop = list.scrollHeight - list.clientHeight - 1;
  }
};

export const getFirstParagraph = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const firstParagraph = doc.querySelector("p");

  return firstParagraph ? firstParagraph.outerHTML : "";
};

export const getQuestTitle = (title: string, type: "en" | "kr") => {
  if (type === "en") {
    return title.substring(title.indexOf("(")).trim();
  }
  return title.substring(0, title.indexOf("(")).trim();
};
