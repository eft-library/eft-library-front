import TextSpan from "../../gridContents/textSpan";

interface Bonus {
  value: number;
  name_en: string;
  name_kr: string | null;
  skill_name_en: string | null;
  skill_name_kr: string | null;
}

interface BonusItem {
  bonus: Bonus;
}

interface BonusList {
  bonuses: Bonus[];
}

export default function Bonus({ bonuses }: BonusList) {
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

  const checkPlus = (effect: number | string) => {
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
          <TextSpan size="lg" textColor={checkPlus(bonus.value)}>
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
