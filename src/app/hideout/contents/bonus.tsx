import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { BonusList } from "@/types/types";

export default function Bonus({ bonuses }: BonusList) {
  const checkNoPercent = (value: string) => {
    const noPercentList = [
      "Unlocks armor repair via repair kits",
      "Unlocks equipment modification",
      "Unlocks weapon repair via repair kits",
    ];
    if (noPercentList.includes(value)) {
      return true;
    }
    return false;
  };

  const addPlusMinus = (text) => {
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
        return ALL_COLOR.WHITE;
      } else if (effect > 0) {
        return ALL_COLOR.HIDE_BLUE;
      } else {
        return ALL_COLOR.HIDE_RED;
      }
    }
  };

  const BonusItem = ({ bonus }) => {
    return (
      <Box display={"flex"} alignItems={"center"}>
        <Text fontWeight={600}>{bonus.name_kr}</Text>
        {checkNoPercent(bonus.name_en) && (
          <Text fontWeight={600}>{bonus.skill_name_kr}</Text>
        )}
        {bonus.skill_name_kr && (
          <Text fontWeight={600}>&nbsp;{bonus.skill_name_kr}</Text>
        )}
        {!checkNoPercent(bonus.name_en) && (
          <Text fontWeight={600} color={checkPlus(bonus.value)}>
            &nbsp;{addPlusMinus(bonus.value)}
          </Text>
        )}
      </Box>
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
