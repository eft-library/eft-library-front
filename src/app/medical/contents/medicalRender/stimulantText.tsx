import React from "react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Text, Box } from "@chakra-ui/react";

export default function StimulantText({ effect, itemID, type }) {
  const addPlusMinus = (text: string | number) => {
    if (typeof text === "number") {
      if (text === 0) return "";
      return text > 0 ? `+${text}` : `${text}`;
    }
    return "";
  };

  const checkSkillColor = (text: string) => {
    const blue = ["진통제", "해독제"];
    const red = ["손 떨림", "터널 효과"];

    if (blue.includes(text)) {
      return ALL_COLOR.LIGHT_BLUE;
    } else if (red.includes(text)) {
      return ALL_COLOR.RED;
    } else {
      return ALL_COLOR.WHITE;
    }
  };

  return (
    <React.Fragment key={effect.krSkill}>
      {effect.delay != null && effect.duration != null && (
        <Text color={ALL_COLOR.LIGHT_YELLO} mt={4} fontWeight={600} ml={4}>
          {itemID === "5ed5166ad380ab312177c100"
            ? `25% 확률 / ${effect.delay}초 지연 / ${effect.duration}초 지속`
            : effect.delay === 0
            ? `${effect.duration}초 지속`
            : `${effect.delay}초 지연 / ${effect.duration}초 지속`}
        </Text>
      )}
      <Box display="flex" ml={4}>
        <Text color={ALL_COLOR.WHITE} fontWeight={700}>
          -&nbsp;
        </Text>
        <Text fontWeight={600} color={checkSkillColor(effect.krSkill)}>
          {effect.krSkill}
        </Text>
        <Text
          fontWeight={600}
          color={type === "buff" ? ALL_COLOR.LIGHT_BLUE : ALL_COLOR.RED}
        >
          &nbsp;{addPlusMinus(effect.value)}
        </Text>
      </Box>
    </React.Fragment>
  );
}
