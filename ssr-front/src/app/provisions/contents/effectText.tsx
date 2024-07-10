import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function EffectText({ text }) {
  const checkPlus = (effect: string | number) => {
    if (typeof effect === "number") {
      if (effect === 0) return ALL_COLOR.WHITE;
      return effect > 0 ? ALL_COLOR.LIGHT_BLUE : ALL_COLOR.RED;
    }

    if (typeof effect === "string") {
      switch (effect) {
        case "손 떨림":
          return ALL_COLOR.RED;
        case "진통제":
          return ALL_COLOR.LIGHT_BLUE;
        default:
          return ALL_COLOR.WHITE;
      }
    }
  };

  const fixStr = (value: string) => {
    const fixList = ["손 떨림", "진통제"];
    return fixList.includes(value) ? value : `${value} :`;
  };

  const addPlusMinus = (text: string | number) => {
    if (typeof text === "number") {
      if (text === 0) return "";
      return text > 0 ? `+${text}` : `${text}`;
    }
    return "";
  };

  return (
    <>
      {text.delay && text.duration ? (
        <Text color={ALL_COLOR.LIGHT_YELLO} mt={4} fontWeight={600}>
          {text.skillName === "Painkiller"
            ? `${text.duration}초 지속`
            : `${text.delay}초 지연 / ${text.duration}초 지속`}
        </Text>
      ) : null}
      <Box display="flex">
        <Text fontWeight={600}>-&nbsp;</Text>
        <Text
          color={checkPlus(text.krSkill)}
          fontWeight={600}
          textAlign="center"
        >
          {fixStr(text.krSkill)}&nbsp;
        </Text>
        <Text color={checkPlus(text.value)} fontWeight={600} textAlign="center">
          {text.skillName === "Painkiller"
            ? ""
            : ` ${addPlusMinus(text.value)}`}
        </Text>
      </Box>
    </>
  );
}
