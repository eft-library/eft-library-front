import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import useColorValue from "@/hooks/useColorValue";
import type { BonusList } from "@/types/types";

export default function Bonus({ bonuses }: BonusList) {
  const { blackWhite } = useColorValue();

  const addPlusMinus = (text) => {
    if (typeof text === "number") {
      if (text === 0) return "0";
      return text > 0 ? `+${text}` : `${text}`;
    }
    return "";
  };

  const checkPlus = (effect: number | string) => {
    if (typeof effect === "number") {
      if (effect == 0) {
        return blackWhite;
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
        {bonus.skill_name_kr && (
          <Text fontWeight={600}>{bonus.skill_name_kr}</Text>
        )}
        <Text fontWeight={600} color={checkPlus(bonus.value)}>
          &nbsp;{addPlusMinus(bonus.value)}
        </Text>
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
