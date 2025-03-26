"use client";

import TextSpan from "@/components/custom/gridContents/textSpan";
import type { BonusItem, BonusList } from "./stationType";

export default function DetailBonus({ bonuses }: BonusList) {
  console.log(bonuses);
  const checkNoPercent = (value: string) => {
    const noPercentList = [
      "Unlocks armor repair via repair kits",
      "Unlocks equipment modification",
      "Unlocks weapon repair via repair kits",
    ];
    return noPercentList.includes(value);
  };

  const addPlusMinus = (text: string | number) => {
    if (typeof text === "number") {
      if (text === 0) {
        return "0";
      } else if (text > 1) {
        return `+${text}`;
      }
      return text > 0
        ? `+${Math.round(text * 100)} %`
        : `${Math.round(text * 100)} %`;
    }
    return "";
  };

  const checkPlus = (effect: number | string, name_en: string) => {
    const reverseList = [
      "Negative effects removal rate",
      "Insurance return time",
      "Flea market fee",
      "Reduces armor repair cost using repair kits",
      "Reduces weapon repair cost using repair kits",
      "Scav cooldown timer",
    ];

    if (reverseList.includes(name_en)) {
      if (typeof effect === "number") {
        if (effect == 0) {
          return "white";
        } else if (effect < 0) {
          return "SkyBlue";
        } else {
          return "SoftRed";
        }
      }
    }

    if (typeof effect === "number") {
      if (effect == 0) {
        return "white";
      } else if (effect > 0) {
        return "SkyBlue";
      } else {
        return "SoftRed";
      }
    }
  };

  const BonusItem = ({ bonus }: BonusItem) => {
    return (
      <div className={"flex items-center"}>
        <TextSpan size="lg">{bonus.name_kr}</TextSpan>
        {checkNoPercent(bonus.name_en) && (
          <TextSpan size="lg">{bonus.skill_name_kr}</TextSpan>
        )}
        {bonus.skill_name_kr && (
          <TextSpan size="lg">&nbsp;{bonus.skill_name_kr}</TextSpan>
        )}
        {!checkNoPercent(bonus.name_en) && (
          <TextSpan size="lg" textColor={checkPlus(bonus.value, bonus.name_en)}>
            &nbsp;{addPlusMinus(bonus.value)}
          </TextSpan>
        )}
      </div>
    );
  };

  return (
    bonuses.length > 0 && (
      <>
        {bonuses.map((bonus, index) => (
          <BonusItem key={index} bonus={bonus} />
        ))}
      </>
    )
  );
}
