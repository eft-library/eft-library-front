import React from "react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import useColorValue from "@/hooks/useColorValue";
import { Text, Box } from "@chakra-ui/react";

export default function StimulantText({ effect, itemID, type }) {
  const { blackWhite } = useColorValue();

  const addPlusMinus = (text) => {
    if (typeof text === "number") {
      if (text === 0) return "";
      return text > 0 ? `+${text}` : `${text}`;
    }
    return "";
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
        <Text color={blackWhite} fontWeight={700}>
          -&nbsp;
        </Text>
        <Text fontWeight={600}>{effect.krSkill}</Text>
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
