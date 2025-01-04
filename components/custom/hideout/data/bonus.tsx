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
        return "text-white";
      } else if (effect > 0) {
        return "text-SkyBlue";
      } else {
        return "text-SoftRed";
      }
    }
  };

  const BonusItem = ({ bonus }: BonusItem) => {
    return (
      <div className={"flex items-center"}>
        <span className="text-center font-bold text-lg">{bonus.name_kr}</span>
        {checkNoPercent(bonus.name_en) && (
          <span className="text-center font-bold text-lg">
            {bonus.skill_name_kr}
          </span>
        )}
        {bonus.skill_name_kr && (
          <span className="text-center font-bold text-lg">
            &nbsp;{bonus.skill_name_kr}
          </span>
        )}
        {!checkNoPercent(bonus.name_en) && (
          <span
            className={`text-center font-bold text-lg ${checkPlus(
              bonus.value
            )}`}
          >
            &nbsp;{addPlusMinus(bonus.value)}
          </span>
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
